"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminDashboard, type DashboardStats } from "@/lib/api";
import {
  HardHat,
  Wrench,
  Truck,
  Briefcase,
  FileText,
  Mail,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    projects: 0,
    machinery: 0,
    careers: 0,
    contactMessages: 0,
    jobApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then(setStats)
      .catch((err) => console.error("Could not load dashboard stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Total Projects",
      value: stats.projects,
      href: "/admin/projects",
      icon: HardHat,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      title: "Engineering Services",
      value: stats.services,
      href: "/admin/services",
      icon: Wrench,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Machinery Fleet",
      value: stats.machinery,
      href: "/admin/machinery",
      icon: Truck,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Open Careers",
      value: stats.careers,
      href: "/admin/careers",
      icon: Briefcase,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Job Applications",
      value: stats.jobApplications,
      href: "/admin/applications",
      icon: FileText,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      title: "Contact Inquiries",
      value: stats.contactMessages,
      href: "/admin/messages",
      icon: Mail,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {c.title}
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">
                  {loading ? "..." : c.value}
                </h3>
                <Link
                  href={c.href}
                  className="text-xs font-semibold text-amber-600 hover:underline mt-2 inline-flex items-center gap-1"
                >
                  Manage &rarr;
                </Link>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${c.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-8 text-white shadow-md flex flex-wrap items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Quick Administrative Shortcuts</h3>
          <p className="text-xs text-slate-300 mt-1">
            Instantly create new website portfolio entries or review incoming applications.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <Plus size={14} /> New Project
          </Link>
          <Link
            href="/admin/services"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 border border-slate-700"
          >
            <Plus size={14} /> New Service
          </Link>
          <Link
            href="/admin/machinery"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 border border-slate-700"
          >
            <Plus size={14} /> Add Machinery
          </Link>
          <Link
            href="/admin/careers"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 border border-slate-700"
          >
            <Plus size={14} /> Post Vacancy
          </Link>
        </div>
      </div>
    </div>
  );
}

