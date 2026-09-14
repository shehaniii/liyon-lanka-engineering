"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { requestAdminPasswordReset } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await requestAdminPasswordReset(email);
    } finally {
      setSubmitted(true);
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
          <h1 className="text-2xl font-black text-slate-900">Forgot your password?</h1>
          <p className="text-slate-500 text-sm mt-2">Enter your admin email address and we will send you a password reset link.</p>
        </div>

        {submitted ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
            If an account exists for this email address, a password reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Admin Email Address
              <div className="relative mt-1">
                <Mail size={18} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your admin email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </label>
            <button disabled={loading} className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50">
              <span>{loading ? "Sending..." : "Send Reset Link"}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        <Link href="/admin/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-700 transition">
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </div>
  );
}
