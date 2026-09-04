"use client";

import { useEffect, useState } from "react";
import {
  getAdminProfile,
  changeAdminPassword,
  requestAdminPasswordVerification,
  type AdminUser,
} from "@/lib/api";
import { Key, UserCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<AdminUser | null>(null);
  const [verificationToken, setVerificationToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    getAdminProfile()
      .then(setProfile)
      .catch((err) => console.error("Could not load profile:", err));
  }, []);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (newPassword !== confirmPassword) {
      setFeedback({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    if (!verificationToken.trim()) {
      setFeedback({ type: "error", text: "Request a verification email and enter its token first." });
      return;
    }

    setLoading(true);

    try {
      await changeAdminPassword(verificationToken.trim(), newPassword);
      setFeedback({ type: "success", text: "Password changed successfully!" });
      setVerificationToken("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to change password. Check your verification token.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSendVerification() {
    setFeedback(null);
    setSendingVerification(true);
    try {
      await requestAdminPasswordVerification();
      setFeedback({ type: "success", text: "A verification token was sent to your admin email." });
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Could not send the verification email.",
      });
    } finally {
      setSendingVerification(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <UserCheck size={20} className="text-amber-500" />
          <span>Admin Profile Info</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Administrator Name</p>
            <p className="font-bold text-slate-800 mt-0.5">
              {profile?.fullName || "Liyon Lanka Administrator"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
            <p className="font-bold text-slate-800 mt-0.5">
              {profile?.email || "admin@liyonlanka.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Key size={20} className="text-amber-500" />
          <span>Change Security Password</span>
        </h2>
        <p className="text-sm text-slate-500">
          Request a verification token by email, then use it to set your new password. Your current password is not required.
        </p>

        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Email Verification Token *
            </label>
            <input
              type="text"
              required
              value={verificationToken}
              onChange={(e) => setVerificationToken(e.target.value)}
              placeholder="Paste the token from your email"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              New Password * (Min 6 characters)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSendVerification}
              disabled={sendingVerification}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition shadow-sm disabled:opacity-50"
            >
              {sendingVerification ? "Sending Email..." : "Email Verification Token"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl text-sm transition shadow-sm disabled:opacity-50"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

