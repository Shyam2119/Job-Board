"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobDetailView } from "@/components/jobs/job-detail-view";
import { useClientJobs } from "@/hooks/use-client-jobs";
import type { Job } from "@/types/job";

interface JobDetailPageClientProps {
  jobId: string;
  initialJob: Job | null;
}

export function JobDetailPageClient({
  jobId,
  initialJob,
}: JobDetailPageClientProps) {
  const jobs = useClientJobs();
  const job = useMemo(
    () => initialJob ?? jobs.find((j) => j.id === jobId) ?? null,
    [initialJob, jobs, jobId]
  );

  if (!job) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This job listing may have been removed or doesn&apos;t exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/jobs">Browse All Jobs</Link>
        </Button>
      </div>
    );
  }

  return <JobDetailView initialJob={job} />;
}
