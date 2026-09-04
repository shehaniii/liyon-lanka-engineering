"use client";

import { useEffect, useState } from "react";
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  uploadAdminImage,
  imageUrl,
  type Project,
} from "@/lib/api";
import { Plus, Edit2, Trash2, Search, Star, Image as ImageIcon, X, Upload } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  function loadProjects() {
    setLoading(true);
    getAdminProjects()
      .then(setProjects)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleOpenAdd() {
    setEditingProject(null);
    setModalOpen(true);
  }

  function handleOpenEdit(p: Project) {
    setEditingProject(p);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteAdminProject(id);
      showToast("Project deleted successfully");
      loadProjects();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete project");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, field: "coverImageUrl") {
    if (!e.target.files || !e.target.files[0]) return;
    try {
      showToast("Uploading image...");
      const res = await uploadAdminImage(e.target.files[0]);
      setEditingProject((prev) => ({
        ...(prev || { title: "", description: "", category: "", featured: false }),
        [field]: res.url,
      }));
      showToast("Image uploaded!");
    } catch {
      showToast("Could not upload image");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value;
    const client = (form.elements.namedItem("client") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const completionDate = (form.elements.namedItem("completionDate") as HTMLInputElement).value || undefined;
    const coverImageUrl = (form.elements.namedItem("coverImageUrl") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
    const featured = (form.elements.namedItem("featured") as HTMLInputElement).checked;
    const active = (form.elements.namedItem("active") as HTMLInputElement).checked;

    const payload: Partial<Project> = {
      title,
      category,
      client,
      location,
      completionDate,
      coverImageUrl,
      description,
      featured,
      active,
    };

    try {
      if (editingProject?.id) {
        await updateAdminProject(editingProject.id, payload);
        showToast("Project updated successfully!");
      } else {
        await createAdminProject(payload);
        showToast("Project created successfully!");
      }
      setModalOpen(false);
      loadProjects();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold">
          {toast}
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Title & Category</th>
                <th className="px-6 py-4">Client & Location</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading projects...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No projects found. Add your first project!
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        {p.coverImageUrl ? (
                          <img
                            src={imageUrl(p.coverImageUrl)}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <p className="font-bold text-slate-900">{p.title}</p>
                      <span className="inline-block px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-600 rounded-md mt-0.5">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      <p className="font-medium">{p.client || "—"}</p>
                      <p className="text-xs text-slate-400">{p.location || "—"}</p>
                    </td>
                    <td className="px-6 py-3">
                      {p.featured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <Star size={12} className="fill-amber-500 text-amber-500" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {p.active !== false ? (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-500 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
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
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingProject ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Project Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingProject?.title || ""}
                  required
                  placeholder="e.g., Highway Flyover Project"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Category *
                  </label>
                  <input
                    name="category"
                    defaultValue={editingProject?.category || ""}
                    required
                    placeholder="e.g. Infrastructure, Commercial"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Client
                  </label>
                  <input
                    name="client"
                    defaultValue={editingProject?.client || ""}
                    placeholder="Client or Ministry Name"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    defaultValue={editingProject?.location || ""}
                    placeholder="Colombo, Sri Lanka"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    name="completionDate"
                    defaultValue={editingProject?.completionDate || ""}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    name="coverImageUrl"
                    value={editingProject?.coverImageUrl || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...(prev || {} as Project), coverImageUrl: e.target.value }))
                    }
                    placeholder="/uploads/images/..."
                    className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                  />
                  <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl cursor-pointer font-semibold text-xs flex items-center gap-1 text-slate-700">
                    <Upload size={14} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "coverImageUrl")}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={editingProject?.description || ""}
                  rows={3}
                  required
                  placeholder="Detailed description of the construction project..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingProject?.featured ?? false}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Featured on Home Page</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={editingProject?.active ?? true}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Active (Publicly Visible)</span>
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
                  {submitting ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

