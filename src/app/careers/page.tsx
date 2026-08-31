"use client";

import { useEffect, useState } from "react";
import { getCareers, uploadCv, submitJobApplication, type Career } from "@/lib/api";
import { Briefcase, MapPin, Clock, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    getCareers()
      .then((data) => setCareers(data || []))
      .catch(() => setCareers([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCareer) return;

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const coverLetter = (form.elements.namedItem("coverLetter") as HTMLTextAreaElement).value;
    const cvInput = form.elements.namedItem("cv") as HTMLInputElement;

    if (!cvInput.files || !cvInput.files[0]) {
      setStatusMessage({ type: "error", text: "Please select a CV/Resume file to upload." });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      // 1. Upload CV file
      const uploadRes = await uploadCv(cvInput.files[0]);

      // 2. Submit application
      await submitJobApplication({
        careerId: selectedCareer.id,
        fullName,
        email,
        phone,
        coverLetter,
        cvUrl: uploadRes.fileUrl,
      });

      setStatusMessage({
        type: "success",
        text: "Your application and CV were submitted successfully! Our recruitment team will be in touch.",
      });
      form.reset();
      setSelectedCareer(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit application.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Briefcase size={14} />
            <span>Join Our Engineering Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Career Opportunities</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Build your career with Liyon Lanka Engineering. Work on impactful construction projects across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Status Toast/Alert */}
      {statusMessage && (
        <div className="max-w-4xl mx-auto px-6 mt-6">
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {statusMessage.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="flex-1">{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-700">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Careers List */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="space-y-6">
          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading open career vacancies...</div>
          ) : careers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-2">
              <Briefcase size={36} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-700">No Open Positions Currently</h3>
              <p className="text-xs text-slate-400">
                We do not have any active vacancies at this moment. Please check back regularly!
              </p>
            </div>
          ) : (
            careers.map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900">{job.title}</h2>
                    {job.employmentType && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {job.employmentType}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                    {job.department && <span>{job.department}</span>}
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {job.location}
                      </span>
                    )}
                    {job.closingDate && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock size={13} /> Closing: {job.closingDate}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pt-2">{job.description}</p>
                  {job.requirements && (
                    <p className="text-xs text-slate-500 font-medium pt-1">
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCareer(job)}
                  className="shrink-0 px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl shadow-md shadow-amber-500/20 text-sm transition"
                >
                  Apply Now
                </button>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Application Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Submit Job Application</h3>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">{selectedCareer.title}</p>
              </div>
              <button onClick={() => setSelectedCareer(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  name="fullName"
                  required
                  placeholder="e.g. John Perera"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    name="phone"
                    required
                    placeholder="+94 77 123 4567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Upload Resume / CV (PDF or DOC) *
                </label>
                <div className="relative">
                  <input
                    name="cv"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-100 file:text-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Cover Note / Message
                </label>
                <textarea
                  name="coverLetter"
                  rows={3}
                  placeholder="Tell us why you are a great fit for this position..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCareer(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {submitting ? "Uploading & Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
