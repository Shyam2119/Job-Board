"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkButton } from "@/components/jobs/bookmark-button";
import { isJobNew } from "@/lib/browse-filters";
import { cn } from "@/lib/utils";

const EXPERIENCE_LABELS: Record<Job["experience"], string> = {
  fresher: "0-1 yrs",
  junior: "1-3 yrs",
  mid: "3-5 yrs",
  senior: "5-8 yrs",
  lead: "8+ yrs",
};

const WORK_MODE_STYLES: Record<
  Job["workMode"],
  string
> = {
  remote:
    "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  hybrid:
    "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400",
  onsite:
    "border-blue-500/40 bg-blue-500/15 text-blue-600 dark:text-blue-400",
};

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const isNew = isJobNew(job.datePosted);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/jobs/${job.id}`} className="flex min-w-0 flex-1 gap-4">
            <Image
              src={job.logo}
              alt={`${job.company} logo`}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-lg border border-border object-cover"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-accent">
                  {job.title}
                </h3>
                {isNew && (
                  <Badge className="border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    New
                  </Badge>
                )}
                {job.featured && (
                  <Badge variant="featured">Featured</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {job.location}
                </span>
                <span className="font-medium text-foreground/80">
                  {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  {job.applicantCount.toLocaleString()} applicants
                </span>
              </div>
            </div>
          </Link>
          <BookmarkButton jobId={job.id} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={cn("capitalize", WORK_MODE_STYLES[job.workMode])}
            >
              {job.workMode === "onsite" ? "On-site" : job.workMode}
            </Badge>
            <Badge variant="secondary">
              {EXPERIENCE_LABELS[job.experience]}
            </Badge>
            <Badge variant="default">{job.category}</Badge>
            <Badge variant="secondary" className="capitalize">
              {job.type.replace("-", " ")}
            </Badge>
          </div>
          <Link
            href={`/companies/${job.companySlug}`}
            className="shrink-0 text-xs text-accent hover:underline"
          >
            View company
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
