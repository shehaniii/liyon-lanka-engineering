"use client";

import { useEffect, useState } from "react";
import { getAdminMessages, deleteAdminMessage, type ContactMessage } from "@/lib/api";
import { RefreshCw, Eye, Trash2, Mail, MailCheck, X } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  function loadMessages() {
    setLoading(true);
    getAdminMessages()
      .then(setMessages)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteAdminMessage(id);
      showToast("Message deleted");
      if (selectedMsg?.id === id) setSelectedMsg(null);
      loadMessages();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete message");
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
          <h2 className="font-bold text-slate-900 text-sm">Customer Inquiries Inbox</h2>
          <p className="text-xs text-slate-500">Messages sent via the public contact us form.</p>
        </div>
        <button
          onClick={loadMessages}
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
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Subject & Preview</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Loading messages...
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Inbox is empty. No messages yet.
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => setSelectedMsg(m)}
                  >
                    <td className="px-6 py-3 font-bold text-slate-900">{m.name}</td>
                    <td className="px-6 py-3">
                      <p className="font-semibold text-slate-800">{m.subject || "General Inquiry"}</p>
                      <p className="text-xs text-slate-400 truncate max-w-xs">{m.message}</p>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-600">
                      <p>{m.email}</p>
                      <p className="text-slate-400">{m.phone || "—"}</p>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-3 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedMsg(m)}
                        title="Read Message"
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
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

      {/* Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Inquiry Message</h3>
              <button onClick={() => setSelectedMsg(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h4 className="font-bold text-slate-900 text-base">
                  {selectedMsg.subject || "General Inquiry"}
                </h4>
                <p className="text-xs text-slate-500">
                  From: <strong className="text-slate-800">{selectedMsg.name}</strong> ({selectedMsg.email})
                </p>
                {selectedMsg.phone && (
                  <p className="text-xs text-slate-500">Phone: {selectedMsg.phone}</p>
                )}
                {selectedMsg.createdAt && (
                  <p className="text-xs text-slate-400">
                    Received: {new Date(selectedMsg.createdAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase mb-1">
                  Message Body
                </label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedMsg.message}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(
                    selectedMsg.subject || "Inquiry to Liyon Lanka Engineering"
                  )}`}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow transition"
                >
                  <MailCheck size={16} /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

