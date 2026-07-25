"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Application {
  id: string;
  fullName: string;
  email: string;
  appliedAt: string;
  job: { id: string; title: string; company: string };
}

interface StatsData {
  jobs: number;
  companies: number;
  seekers: number;
  placements: number;
}

interface JobSummary {
  id: string;
  title: string;
  company: string;
  applicantCount: number;
  postedDate: string;
  category: string;
  workMode: string;
}

export function DashboardClient() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/stats").then((r) => r.json()),
      fetch("/api/applications?limit=5").then((r) => r.json()),
      fetch("/api/jobs?limit=6").then((r) => r.json()),
    ])
      .then(([statsData, appsData, jobsData]) => {
        setStats(statsData as StatsData);
        setRecentApps(
          ((appsData as { applications?: Application[] }).applications ?? [])
        );
        setRecentJobs(
          ((jobsData as { jobs?: JobSummary[] }).jobs ?? [])
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Jobs",
      value: stats?.jobs ?? 0,
      icon: Briefcase,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Companies Hiring",
      value: stats?.companies ?? 0,
      icon: Building2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Applications",
      value: recentApps.length,
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Placements",
      value: stats?.placements ?? 0,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ) : (
              <>
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <p className="text-3xl font-bold">
                  {value.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Recent Jobs */}
        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-semibold">Recent Job Listings</h2>
            <Link
              href="/jobs"
              className="flex items-center gap-1 text-sm text-accent hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))
              : recentJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.company} ·{" "}
                        <span className="capitalize">{job.workMode}</span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {job.applicantCount} applicants
                    </span>
                  </Link>
                ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-semibold">Recent Applications</h2>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              {recentApps.length} total
            </span>
          </div>
          <div className="divide-y divide-border">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="px-6 py-4 space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))
              : recentApps.length === 0
              ? (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No applications yet.
                    <br />
                    They&apos;ll appear here once candidates apply.
                  </p>
                </div>
              )
              : recentApps.map((app) => (
                  <div key={app.id} className="px-6 py-4">
                    <p className="font-medium">{app.fullName}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Applied for{" "}
                      <Link
                        href={`/jobs/${app.job.id}`}
                        className="text-accent hover:underline"
                      >
                        {app.job.title}
                      </Link>
                    </p>
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(app.appliedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}
