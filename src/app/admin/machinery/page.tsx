"use client";

import { useEffect, useState } from "react";
import {
  getAdminMachinery,
  createAdminMachinery,
  updateAdminMachinery,
  deleteAdminMachinery,
  uploadAdminImage,
  imageUrl,
  type Machinery,
} from "@/lib/api";
import { Plus, Edit2, Trash2, Truck, X, Upload } from "lucide-react";

export default function AdminMachineryPage() {
  const [machinery, setMachinery] = useState<Machinery[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMachinery, setEditingMachinery] = useState<Partial<Machinery> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadMachinery();
  }, []);

  function loadMachinery() {
    setLoading(true);
    getAdminMachinery()
      .then(setMachinery)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleOpenAdd() {
    setEditingMachinery(null);
    setModalOpen(true);
  }

  function handleOpenEdit(m: Machinery) {
    setEditingMachinery(m);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this machinery item?")) return;
    try {
      await deleteAdminMachinery(id);
      showToast("Machinery deleted successfully");
      loadMachinery();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete machinery");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    try {
      showToast("Uploading image...");
      const res = await uploadAdminImage(e.target.files[0]);
      setEditingMachinery((prev) => ({
        ...(prev || { name: "" }),
        imageUrl: res.url,
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
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const brand = (form.elements.namedItem("brand") as HTMLInputElement).value;
    const model = (form.elements.namedItem("model") as HTMLInputElement).value;
    const capacity = (form.elements.namedItem("capacity") as HTMLInputElement).value;
    const img = (form.elements.namedItem("imageUrl") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
    const active = (form.elements.namedItem("active") as HTMLInputElement).checked;

    const payload: Partial<Machinery> = {
      name,
      brand,
      model,
      capacity,
      imageUrl: img,
      description,
      active,
    };

    try {
      if (editingMachinery?.id) {
        await updateAdminMachinery(editingMachinery.id, payload);
        showToast("Machinery updated successfully!");
      } else {
        await createAdminMachinery(payload);
        showToast("Machinery created successfully!");
      }
      setModalOpen(false);
      loadMachinery();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to save machinery.");
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
          <h2 className="font-bold text-slate-900 text-sm">Heavy Machinery & Equipment Fleet</h2>
          <p className="text-xs text-slate-500">Manage plant equipment and leasing inventory.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Add Machinery
        </button>
      </div>

      {/* Machinery Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Equipment Name</th>
                <th className="px-6 py-4">Brand / Model</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading machinery fleet...
                  </td>
                </tr>
              ) : machinery.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No machinery in fleet. Add your first machine!
                  </td>
                </tr>
              ) : (
                machinery.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        {m.imageUrl ? (
                          <img
                            src={imageUrl(m.imageUrl)}
                            alt={m.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Truck size={18} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-bold text-slate-900">{m.name}</td>
                    <td className="px-6 py-3 text-slate-600">
                      {m.brand || "—"} {m.model ? `/ ${m.model}` : ""}
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-700">{m.capacity || "—"}</td>
                    <td className="px-6 py-3">
                      {m.active !== false ? (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-500 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
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
                {editingMachinery ? "Edit Machinery" : "Add Machinery"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Equipment / Machine Name *
                </label>
                <input
                  name="name"
                  defaultValue={editingMachinery?.name || ""}
                  required
                  placeholder="e.g., Hydraulic Excavator 320D"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Brand
                  </label>
                  <input
                    name="brand"
                    defaultValue={editingMachinery?.brand || ""}
                    placeholder="e.g. Caterpillar, Komatsu"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                    Model
                  </label>
                  <input
                    name="model"
                    defaultValue={editingMachinery?.model || ""}
                    placeholder="e.g. PC200-8"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Capacity / Operating Weight
                </label>
                <input
                  name="capacity"
                  defaultValue={editingMachinery?.capacity || ""}
                  placeholder="e.g., 20 Tons / 1.2 m³ Bucket"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    name="imageUrl"
                    value={editingMachinery?.imageUrl || ""}
                    onChange={(e) =>
                      setEditingMachinery((prev) => ({ ...(prev || {} as Machinery), imageUrl: e.target.value }))
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
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingMachinery?.description || ""}
                  rows={2}
                  placeholder="Technical specifications or suitability..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={editingMachinery?.active ?? true}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <span>Active (Available in Fleet)</span>
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
                  {submitting ? "Saving..." : "Save Machinery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

