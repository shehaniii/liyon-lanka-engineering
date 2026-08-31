"use client";

import { useEffect, useState } from "react";
import {
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
  uploadAdminImage,
  imageUrl,
  type WebsiteService,
} from "@/lib/api";
import { Plus, Edit2, Trash2, Wrench, X, Upload } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<WebsiteService[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<WebsiteService> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  function loadServices() {
    setLoading(true);
    getAdminServices()
      .then(setServices)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleOpenAdd() {
    setEditingService(null);
    setModalOpen(true);
  }

  function handleOpenEdit(s: WebsiteService) {
    setEditingService(s);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteAdminService(id);
      showToast("Service deleted successfully");
      loadServices();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete service");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    try {
      showToast("Uploading image...");
      const res = await uploadAdminImage(e.target.files[0]);
      setEditingService((prev) => ({
        ...(prev || { title: "", description: "" }),
        imageUrl: res.fileUrl,
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
    const icon = (form.elements.namedItem("icon") as HTMLInputElement).value;
    const displayOrder = parseInt((form.elements.namedItem("displayOrder") as HTMLInputElement).value, 10) || 0;
    const img = (form.elements.namedItem("imageUrl") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
    const active = (form.elements.namedItem("active") as HTMLInputElement).checked;

    const payload: Partial<WebsiteService> = {
      title,
      icon,
      displayOrder,
      imageUrl: img,
      description,
      active,
    };

    try {
      if (editingService?.id) {
        await updateAdminService(editingService.id, payload);
        showToast("Service updated successfully!");
      } else {
        await createAdminService(payload);
        showToast("Service created successfully!");
      }
      setModalOpen(false);
      loadServices();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to save service.");
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
          <h2 className="font-bold text-slate-900 text-sm">Engineering Capabilities</h2>
          <p className="text-xs text-slate-500">Manage service offerings shown across the public website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Thumbnail</th>
                <th className="px-6 py-4">Service Title</th>
                <th className="px-6 py-4">Display Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No services found. Add your first service!
                  </td>
                </tr>
              ) : (
                services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        {s.imageUrl ? (
                          <img
                            src={imageUrl(s.imageUrl)}
                            alt={s.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Wrench size={18} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <p className="font-bold text-slate-900">{s.title}</p>
                      <p className="text-xs text-slate-400 truncate max-w-sm">{s.description}</p>
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-700">{s.displayOrder || 0}</td>
                    <td className="px-6 py-3">
                      {s.active !== false ? (
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
                        onClick={() => handleOpenEdit(s)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
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
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingService ? "Edit Service" : "Add Service"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Service Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingService?.title || ""}
                  required
                  placeholder="e.g., Heavy Earthmoving & Excavation"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Icon Name
                  </label>
                  <input
                    name="icon"
                    defaultValue={editingService?.icon || ""}
                    placeholder="e.g. wrench, building"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    defaultValue={editingService?.displayOrder || 0}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    name="imageUrl"
                    value={editingService?.imageUrl || ""}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...(prev || {} as WebsiteService), imageUrl: e.target.value }))
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
                      onChange={handleImageUpload}
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
                  defaultValue={editingService?.description || ""}
                  rows={3}
                  required
                  placeholder="Describe your capabilities for this service..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={editingService?.active ?? true}
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
                  {submitting ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

