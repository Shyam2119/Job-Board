"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { JobCardSkeleton } from "@/components/jobs/job-card-skeleton";
import { Button } from "@/components/ui/button";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import type { Job } from "@/types/job";

export function SavedJobsList() {
  const { savedIds, loading: idsLoading } = useSavedJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idsLoading) return;

    let active = true;
    if (savedIds.size === 0) {
      Promise.resolve().then(() => {
        if (active) {
          setJobs([]);
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }

    fetch("/api/jobs?limit=100")
      .then((r) => r.json())
      .then((data: { jobs?: Job[] }) => {
        if (active) {
          const allJobs = data.jobs ?? [];
          setJobs(allJobs.filter((j) => savedIds.has(j.id)));
        }
      })
      .catch(console.error)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [savedIds, idsLoading]);

  if (idsLoading || loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
        <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h2 className="mt-4 text-lg font-semibold">No saved jobs yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Bookmark jobs you&apos;re interested in to review them later.
        </p>
        <Button asChild className="mt-6">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
