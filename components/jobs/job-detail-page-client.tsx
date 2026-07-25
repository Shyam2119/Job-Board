"use client";

import { JobDetailView } from "@/components/jobs/job-detail-view";
import type { Job } from "@/types/job";

interface JobDetailPageClientProps {
  initialJob: Job;
}

export function JobDetailPageClient({ initialJob }: JobDetailPageClientProps) {
  return <JobDetailView initialJob={initialJob} />;
}
