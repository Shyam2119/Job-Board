// app/companies/[slug]/page.tsx
// Company profile page — fetches jobs for the company from Neon PostgreSQL

import { notFound } from "next/navigation";
import { CompanyProfile } from "@/components/companies/company-profile";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import type { Job } from "@/types/job";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

// Allow any slug to be rendered on demand (new companies appear without rebuild)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CompanyPageProps) {
  const { slug } = await params;
  const first = await prisma.job.findFirst({ where: { companySlug: slug } });
  if (!first) {
    return createMetadata({
      title: "Company Not Found",
      description: "Company profile not found.",
      path: `/companies/${slug}`,
      noIndex: true,
    });
  }
  const count = await prisma.job.count({ where: { companySlug: slug } });
  return createMetadata({
    title: `${first.company} Careers — ${count} Open Jobs`,
    description: `Explore ${count} open positions at ${first.company}. Apply today on TalentFlow.`,
    path: `/companies/${slug}`,
    image: first.logo,
  });
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;

  const rawJobs = await prisma.job.findMany({
    where: { companySlug: slug },
    orderBy: [{ featured: "desc" }, { postedDate: "desc" }],
  });

  if (rawJobs.length === 0) {
    notFound();
  }

  const companyJobs: Job[] = rawJobs.map((raw) => ({
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
  }));

  const first = companyJobs[0];

  return (
    <CompanyProfile
      companySlug={slug}
      companyName={first.company}
      logo={first.logo}
      initialJobs={companyJobs}
    />
  );
}
