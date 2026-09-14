"use client";

import Link from "next/link";
import { Suspense } from "react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { resetAdminPassword } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(token ? null : "This reset link is invalid or expired.");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z\d]/.test(password)) {
      setError("Use at least 12 characters with uppercase, lowercase, a number, and a symbol.");
      return;
    }

    setLoading(true);
    try {
      await resetAdminPassword(token, password);
      setSuccess(true);
      setTimeout(() => router.push("/admin/login"), 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "This reset link is invalid or expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-slate-700/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 mb-3 shadow-lg shadow-amber-500/30">
            <ShieldCheck size={36} />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Reset your password</h1>
          <p className="text-slate-500 text-sm mt-2">Choose a new secure password for your admin account.</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex gap-2"><AlertCircle size={18} className="shrink-0" /><span>{error}</span></div>}
        {success && <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex gap-2"><CheckCircle2 size={18} className="shrink-0" /><span>Password reset successfully. Redirecting to login...</span></div>}

        {!success && token && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">New Password
              <div className="relative mt-1"><Lock size={18} className="absolute left-3.5 top-3 text-slate-400" /><input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" /></div>
            </label>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Confirm New Password
              <div className="relative mt-1"><Lock size={18} className="absolute left-3.5 top-3 text-slate-400" /><input type="password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" /></div>
            </label>
            <button disabled={loading} className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition disabled:opacity-50">{loading ? "Resetting..." : "Reset Password"}</button>
          </form>
        )}

        <Link href="/admin/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-700 transition"><ArrowLeft size={16} /> Back to Login</Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
