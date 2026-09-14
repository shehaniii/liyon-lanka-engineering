"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin, getAdminProfile, setAdminAuth } from "@/lib/api";
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await adminLogin(email, password);
      localStorage.setItem("liyon_admin_token", res.token);

      // Fetch profile
      let profile = { fullName: "Administrator", email };
      try {
        const userProfile = await getAdminProfile();
        if (userProfile) profile = userProfile;
      } catch {
        // use fallback
      }

      setAdminAuth(res.token, profile);
      router.push("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed. Please check credentials.";
      setError(msg);
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
          <h1 className="text-2xl font-black text-slate-900">Liyon Lanka Engineering</h1>
          <p className="text-slate-500 text-sm mt-1">Management & Admin Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
          >
            <span>{loading ? "Signing In..." : "Sign In to Admin Portal"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-5 text-center">
          <a href="/admin/forgot-password" className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

