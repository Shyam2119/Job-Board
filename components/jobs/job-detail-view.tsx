"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  DollarSign,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";
import type { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookmarkButton } from "@/components/jobs/bookmark-button";
import { ApplyButton } from "@/components/jobs/apply-button";
import { JobCard } from "@/components/jobs/job-card";
import { addRecentlyViewed, getAllJobs, getRelatedJobs } from "@/lib/jobs";
import { RecentlyViewedSidebar } from "@/components/jobs/recently-viewed-sidebar";
import { formatDate } from "@/lib/utils";

interface JobDetailViewProps {
  initialJob: Job;
}

export function JobDetailView({ initialJob }: JobDetailViewProps) {
  const [job, setJob] = useState(initialJob);
  const [related, setRelated] = useState<Job[]>([]);

  useEffect(() => {
    const all = getAllJobs();
    const found = all.find((j) => j.id === initialJob.id) ?? initialJob;
    setJob(found);
    setRelated(getRelatedJobs(found));
    addRecentlyViewed(found.id);
  }, [initialJob]);

  return (
    <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,300px)] xl:grid-cols-[1fr_minmax(0,280px)_minmax(0,220px)]">
        <article className="order-1 min-w-0 lg:order-none">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl border border-border object-cover"
                  unoptimized
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold sm:text-3xl">{job.title}</h1>
                    {job.featured && (
                      <Badge variant="featured">Featured</Badge>
                    )}
                  </div>
                  <Link
                    href={`/companies/${job.companySlug}`}
                    className="mt-1 inline-flex items-center gap-1 text-lg text-accent hover:underline"
                  >
                    <Building2 className="h-4 w-4" />
                    {job.company}
                  </Link>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Posted {formatDate(job.postedDate)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>{job.category}</Badge>
                    <Badge variant="secondary" className="capitalize">
                      {job.type.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </div>
              <BookmarkButton jobId={job.id} />
            </div>

            <Separator className="my-8" />

            <section>
              <h2 className="text-xl font-semibold">About the Role</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">Related Jobs</h2>
              <div className="space-y-4">
                {related.map((r) => (
                  <JobCard key={r.id} job={r} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="order-2 space-y-6 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="font-semibold">Ready to apply?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Join {job.company} and make an impact in {job.category}.
            </p>
            <div className="mt-6">
              <ApplyButton jobTitle={job.title} company={job.company} />
            </div>
            <Separator className="my-6" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salary</span>
                <span className="font-medium">{job.salary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">
                  {job.type.replace("-", " ")}
                </span>
              </div>
            </div>
            <Link
              href={`/companies/${job.companySlug}`}
              className="mt-6 block text-center text-sm text-accent hover:underline"
            >
              View all jobs at {job.company}
            </Link>
          </div>
        </aside>

        <aside className="hidden space-y-6 xl:block lg:sticky lg:top-24 lg:self-start">
          <RecentlyViewedSidebar />
        </aside>
      </div>

      <div className="mt-8 xl:hidden">
        <RecentlyViewedSidebar />
      </div>
    </div>
  );
}
