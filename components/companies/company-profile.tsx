"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Building2, Briefcase } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { getJobsByCompany } from "@/lib/jobs";
import type { Job } from "@/types/job";

interface CompanyProfileProps {
  companySlug: string;
  companyName: string;
  logo: string;
  initialJobs: Job[];
}

export function CompanyProfile({
  companySlug,
  companyName,
  logo,
  initialJobs,
}: CompanyProfileProps) {
  const [companyJobs, setCompanyJobs] = useState(initialJobs);

  useEffect(() => {
    setCompanyJobs(getJobsByCompany(companySlug));
    const refresh = () => setCompanyJobs(getJobsByCompany(companySlug));
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, [companySlug]);

  const description = getCompanyDescription(companyName);

  return (
    <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Image
            src={logo}
            alt={`${companyName} logo`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl border border-border object-cover"
            unoptimized
          />
          <div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">Company Profile</span>
            </div>
            <h1 className="mt-1 text-3xl font-bold">{companyName}</h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              {companyJobs.length} open position
              {companyJobs.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Open Positions</h2>
        <div className="mt-6 space-y-4">
          {companyJobs.length === 0 ? (
            <p className="text-muted-foreground">No open positions at this time.</p>
          ) : (
            companyJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </section>
    </div>
  );
}

function getCompanyDescription(name: string): string {
  return `${name} is a leading organization committed to innovation and excellence. We foster a collaborative culture where talented professionals thrive. Explore our open roles and join a team that's shaping the future of their industry.`;
}
