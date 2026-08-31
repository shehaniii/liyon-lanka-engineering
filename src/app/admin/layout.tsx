"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  HardHat,
  Wrench,
  Truck,
  Briefcase,
  FileText,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  User,
} from "lucide-react";
import { getAdminToken, getStoredAdminUser, clearAdminAuth, type AdminUser } from "@/lib/api";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Projects", href: "/admin/projects", icon: HardHat },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "Machinery Fleet", href: "/admin/machinery", icon: Truck },
  { name: "Careers & Jobs", href: "/admin/careers", icon: Briefcase },
  { name: "Job Applications", href: "/admin/applications", icon: FileText },
  { name: "Contact Messages", href: "/admin/messages", icon: Mail },
  { name: "Security & Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Don't guard the login page
    if (pathname === "/admin/login") return;

    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    const user = getStoredAdminUser();
    if (user) setAdminUser(user);
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted) return null;

  function handleLogout() {
    clearAdminAuth();
    router.push("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        {/* Brand */}
        <div className="h-16 flex items-center gap-3 px-6 bg-slate-900/60 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
            L
          </div>
          <div>
            <h2 className="font-bold text-white text-sm tracking-wide leading-tight">Liyon Lanka</h2>
            <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-sm font-medium">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  isActive
                    ? "bg-amber-500/15 text-amber-400 font-bold"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-amber-400" : "text-slate-400"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                <User size={16} />
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-semibold text-white truncate">
                  {adminUser?.fullName || "Administrator"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {adminUser?.email || "admin@liyonlanka.com"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 capitalize">
              {pathname === "/admin" ? "Dashboard" : pathname.replace("/admin/", "").replace("-", " ")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-slate-600 hover:text-amber-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-400 transition bg-slate-50"
            >
              <span>Live Website</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        {/* View container */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

