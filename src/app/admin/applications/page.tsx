"use client";

import { useEffect, useState } from "react";
import {
  getAdminApplications,
  updateAdminApplicationStatus,
  deleteAdminApplication,
  imageUrl,
  type JobApplication,
} from "@/lib/api";
import { RefreshCw, Eye, Trash2, Download, X, Mail, Phone, Calendar } from "lucide-react";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  function loadApplications() {
    setLoading(true);
    getAdminApplications()
      .then(setApplications)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleStatusChange(id: number, status: string) {
    try {
      await updateAdminApplicationStatus(id, status);
      showToast("Application status updated!");
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to update status");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this candidate application?")) return;
    try {
      await deleteAdminApplication(id);
      showToast("Application deleted");
      loadApplications();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete application");
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
          <h2 className="font-bold text-slate-900 text-sm">Job Applications Pipeline</h2>
          <p className="text-xs text-slate-500">Review candidate submissions, cover notes, and downloaded CVs.</p>
        </div>
        <button
          onClick={loadApplications}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Position Applied</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4">CV / Resume</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                applications.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3 font-bold text-slate-900">{a.fullName}</td>
                    <td className="px-6 py-3 font-medium text-amber-800">
                      {a.career ? a.career.title : "General Application"}
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-600">
                      <p>{a.email}</p>
                      <p className="text-slate-400">{a.phone || "—"}</p>
                    </td>
                    <td className="px-6 py-3">
                      {a.cvUrl ? (
                        <a
                          href={imageUrl(a.cvUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg"
                        >
                          <Download size={13} /> View CV
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs">No CV</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button
                        onClick={() => setSelectedApp(a)}
                        title="View Details"
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        title="Delete"
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

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Candidate Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{selectedApp.fullName}</h4>
                    <p className="text-xs text-amber-700 font-semibold mt-0.5">
                      {selectedApp.career ? selectedApp.career.title : "General Position"}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800">
                    {selectedApp.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Mail size={13} className="text-slate-400" />
                    <span>{selectedApp.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} className="text-slate-400" />
                    <span>{selectedApp.phone}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" />
                    <span>Submitted: {selectedApp.appliedAt ? new Date(selectedApp.appliedAt).toLocaleString() : "—"}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Cover Note / Letter
                </label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-xs max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedApp.coverLetter || "No cover letter provided."}
                </div>
              </div>

              {selectedApp.cvUrl && (
                <div className="pt-2">
                  <a
                    href={imageUrl(selectedApp.cvUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                  >
                    <Download size={16} />
                    <span>Download / View Resume (CV)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

