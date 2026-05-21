"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { Button } from "@/components/ui/button";
import { getAllJobs, getSavedJobs } from "@/lib/jobs";

export function SavedJobsList() {
  const [savedJobs, setSavedJobs] = useState<ReturnType<typeof getSavedJobs>>([]);

  const refresh = useCallback(() => {
    setSavedJobs(getSavedJobs(getAllJobs()));
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("saved-jobs-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("saved-jobs-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  if (savedJobs.length === 0) {
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
      {savedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
