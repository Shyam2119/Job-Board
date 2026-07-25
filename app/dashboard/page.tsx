import { Briefcase, TrendingUp, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata = createMetadata({
  title: "Recruiter Dashboard | TalentFlow",
  description:
    "Track your job postings, monitor applications, and manage your hiring pipeline on TalentFlow.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-accent">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Recruiter Portal</span>
          </div>
          <h1 className="mt-1 text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Monitor your job postings and application pipeline.
          </p>
        </div>
        <Link
          href="/post-job"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover active:scale-[0.98] sm:mt-0"
        >
          <Briefcase className="h-4 w-4" />
          Post a New Job
        </Link>
      </div>

      {/* Quick-link nav */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Browse Jobs", href: "/jobs", icon: Briefcase, color: "bg-accent/10 text-accent" },
          { label: "Companies", href: "/companies", icon: Building2, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
          { label: "Saved Jobs", href: "/saved", icon: Users, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
          { label: "My Profile", href: "/profile", icon: Users, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
        ].map(({ label, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium group-hover:text-accent">{label}</span>
          </Link>
        ))}
      </div>

      {/* Dynamic dashboard content (client component for live data) */}
      <DashboardClient />
    </div>
  );
}
