// app/jobs/[id]/page.tsx
// Fully dynamic — fetches job from the database API by CUID ID.
// No generateStaticParams — every job page is rendered on demand.

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { JobDetailView } from "@/components/jobs/job-detail-view";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import type { Job } from "@/types/job";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

// Always render dynamically — job IDs are CUIDs from the database
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { id } = await params;
  try {
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return createMetadata({
        title: "Job Not Found",
        description: "This job listing may have been removed.",
        path: `/jobs/${id}`,
      });
    }
    return createMetadata({
      title: `${job.title} at ${job.company}`,
      description: job.description.slice(0, 160),
      path: `/jobs/${id}`,
      image: job.logo,
    });
  } catch {
    return createMetadata({
      title: "Job Details",
      description: "View job listing details on TalentFlow.",
      path: `/jobs/${id}`,
    });
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  let job: Job | null = null;
  try {
    const raw = await prisma.job.findUnique({ where: { id } });
    if (raw) {
      // Map Prisma model to Job type
      job = {
        id: raw.id,
        title: raw.title,
        company: raw.company,
        companySlug: raw.companySlug,
        logo: raw.logo,
        location: raw.location,
        city: raw.city,
        salary: raw.salary,
        salaryMin: raw.salaryMin,
        salaryMax: raw.salaryMax,
        type: raw.type as Job["type"],
        description: raw.description,
        requirements: raw.requirements,
        skills: raw.skills,
        postedDate: raw.postedDate.toISOString(),
        datePosted: raw.postedDate.toISOString().split("T")[0],
        category: raw.category as Job["category"],
        featured: raw.featured,
        experience: raw.experience as Job["experience"],
        workMode: raw.workMode as Job["workMode"],
        industry: raw.industry as Job["industry"],
        noticePeriod: raw.noticePeriod as Job["noticePeriod"],
        companyRating: raw.companyRating,
        applicantCount: raw.applicantCount,
      };
    }
  } catch (e) {
    console.error("Failed to fetch job:", e);
  }

  if (!job) {
    notFound();
  }

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
      <JobDetailView initialJob={job} />
    </>
  );
}
