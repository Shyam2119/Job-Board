"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobDetailView } from "@/components/jobs/job-detail-view";
import { getAllJobs } from "@/lib/jobs";
import type { Job } from "@/types/job";

interface JobDetailPageClientProps {
  jobId: string;
  initialJob: Job | null;
}

export function JobDetailPageClient({
  jobId,
  initialJob,
}: JobDetailPageClientProps) {
  const [job, setJob] = useState<Job | null>(initialJob);
  const [loading, setLoading] = useState(!initialJob);

  useEffect(() => {
    if (!initialJob) {
      const found = getAllJobs().find((j) => j.id === jobId);
      setJob(found ?? null);
      setLoading(false);
    }
  }, [jobId, initialJob]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">
        Loading job details...
      </div>
    );
  }

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
