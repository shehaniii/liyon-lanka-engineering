"use client";

import { useEffect, useState } from "react";
import {
  getAdminCareers,
  createAdminCareer,
  updateAdminCareer,
  deleteAdminCareer,
  type Career,
} from "@/lib/api";
import { Plus, Edit2, Trash2, MapPin, Clock, X } from "lucide-react";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Partial<Career> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadCareers();
  }, []);

  function loadCareers() {
    setLoading(true);
    getAdminCareers()
      .then(setCareers)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleOpenAdd() {
    setEditingCareer(null);
    setModalOpen(true);
  }

  function handleOpenEdit(c: Career) {
    setEditingCareer(c);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this vacancy?")) return;
    try {
      await deleteAdminCareer(id);
      showToast("Vacancy deleted successfully");
      loadCareers();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete vacancy");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const department = (form.elements.namedItem("department") as HTMLInputElement).value;
    const employmentType = (form.elements.namedItem("employmentType") as HTMLSelectElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const closingDate = (form.elements.namedItem("closingDate") as HTMLInputElement).value || undefined;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
    const requirements = (form.elements.namedItem("requirements") as HTMLTextAreaElement).value;
    const active = (form.elements.namedItem("active") as HTMLInputElement).checked;

    const payload: Partial<Career> = {
      title,
      department,
      employmentType,
      location,
      closingDate,
      description,
      requirements,
      active,
    };

    try {
      if (editingCareer?.id) {
        await updateAdminCareer(editingCareer.id, payload);
        showToast("Vacancy updated successfully!");
      } else {
        await createAdminCareer(payload);
        showToast("Vacancy posted successfully!");
      }
      setModalOpen(false);
      loadCareers();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to save career vacancy.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="font-bold text-slate-900 text-sm">Careers & Job Openings</h2>
          <p className="text-xs text-slate-500">Publish open vacancies and job requirements.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Post Vacancy
        </button>
      </div>

      {/* Careers Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Type & Location</th>
                <th className="px-6 py-4">Closing Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading vacancies...
                  </td>
                </tr>
              ) : careers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No active vacancies posted.
                  </td>
                </tr>
              ) : (
                careers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3 font-bold text-slate-900">{c.title}</td>
                    <td className="px-6 py-3 text-slate-600">{c.department || "General"}</td>
                    <td className="px-6 py-3 text-slate-600">
                      <span className="inline-block px-2 py-0.5 text-xs bg-slate-100 rounded-md font-semibold">
                        {c.employmentType || "Full-time"}
                      </span>
                      <span className="text-xs text-slate-400 block mt-0.5 flex items-center gap-1">
                        <MapPin size={11} /> {c.location || "Colombo"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-600 font-medium flex items-center gap-1 mt-3">
                      <Clock size={12} className="text-slate-400" />
                      <span>{c.closingDate || "Open Until Filled"}</span>
                    </td>
                    <td className="px-6 py-3">
                      {c.active !== false ? (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          Open
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-500 rounded-full">
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingCareer ? "Edit Vacancy" : "Post Vacancy"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Job Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingCareer?.title || ""}
                  required
                  placeholder="e.g., Senior Civil Engineer"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Department
                  </label>
                  <input
                    name="department"
                    defaultValue={editingCareer?.department || ""}
                    placeholder="e.g., Structural Engineering"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Employment Type
                  </label>
                  <select
                    name="employmentType"
                    defaultValue={editingCareer?.employmentType || "Full-time"}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    defaultValue={editingCareer?.location || ""}
                    placeholder="Colombo / Site"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Closing Date
                  </label>
                  <input
                    type="date"
                    name="closingDate"
                    defaultValue={editingCareer?.closingDate || ""}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingCareer?.description || ""}
                  rows={3}
                  required
                  placeholder="Responsibilities and day-to-day role overview..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Requirements & Qualifications
                </label>
                <textarea
                  name="requirements"
                  defaultValue={editingCareer?.requirements || ""}
                  rows={3}
                  placeholder="Degree, experience level, certifications..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={editingCareer?.active ?? true}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Active (Accepting Applications)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl shadow transition disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

