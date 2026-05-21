import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JobDetailPageClient } from "@/components/jobs/job-detail-page-client";
import { createMetadata } from "@/lib/metadata";
import { jobs } from "@/data/jobs";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) {
    return createMetadata({
      title: "Job Details",
      description: "View job listing details on TalentFlow.",
      path: `/jobs/${id}`,
    });
  }
  return createMetadata({
    title: `${job.title} at ${job.company}`,
    description: job.description.slice(0, 160),
    path: `/jobs/${id}`,
    image: job.logo,
  });
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);

  return (
    <>
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to jobs
          </Link>
        </div>
      </div>
      <JobDetailPageClient jobId={id} initialJob={job ?? null} />
    </>
  );
}
