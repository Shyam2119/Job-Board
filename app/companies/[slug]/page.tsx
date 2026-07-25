// app/companies/[slug]/page.tsx
// Company profile page — flexible slug matching against Neon PostgreSQL & static seed data

import { notFound } from "next/navigation";
import { CompanyProfile } from "@/components/companies/company-profile";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { jobs as staticJobs } from "@/data/jobs";
import type { Job } from "@/types/job";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

// Normalize slug variations: nexus_labs -> nexus-labs, "Nexus Labs" -> nexus-labs
function normalizeSlug(s: string): string {
  return decodeURIComponent(s).toLowerCase().replace(/[\s_]+/g, "-");
}

export async function generateMetadata({ params }: CompanyPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  try {
    const first = await prisma.job.findFirst({
      where: {
        OR: [
          { companySlug: { equals: slug, mode: "insensitive" } },
          { companySlug: { equals: rawSlug, mode: "insensitive" } },
        ],
      },
    });

    if (!first) {
      // Check static fallback
      const staticMatch = staticJobs.find(
        (j) => normalizeSlug(j.companySlug) === slug
      );
      if (!staticMatch) {
        return createMetadata({
          title: "Company Not Found",
          description: "Company profile not found.",
          path: `/companies/${slug}`,
          noIndex: true,
        });
      }
      return createMetadata({
        title: `${staticMatch.company} Careers`,
        description: `Explore open positions at ${staticMatch.company}. Apply today on TalentFlow.`,
        path: `/companies/${slug}`,
        image: staticMatch.logo,
      });
    }

    const count = await prisma.job.count({
      where: {
        OR: [
          { companySlug: { equals: slug, mode: "insensitive" } },
          { companySlug: { equals: rawSlug, mode: "insensitive" } },
        ],
      },
    });

    return createMetadata({
      title: `${first.company} Careers — ${count} Open Jobs`,
      description: `Explore ${count} open positions at ${first.company}. Apply today on TalentFlow.`,
      path: `/companies/${slug}`,
      image: first.logo,
    });
  } catch {
    return createMetadata({
      title: "Company Profile",
      description: "Company careers and open job listings.",
      path: `/companies/${slug}`,
    });
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  let companyJobs: Job[] = [];

  try {
    const rawJobs = await prisma.job.findMany({
      where: {
        OR: [
          { companySlug: { equals: slug, mode: "insensitive" } },
          { companySlug: { equals: rawSlug, mode: "insensitive" } },
          { company: { contains: slug.replace(/-/g, " "), mode: "insensitive" } },
        ],
      },
      orderBy: [{ featured: "desc" }, { postedDate: "desc" }],
    });

    companyJobs = rawJobs.map((raw) => ({
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
  } catch (error) {
    console.warn("CompanyPage DB fetch warning:", error);
  }

  // If DB returns empty, check static fallback dataset
  if (companyJobs.length === 0) {
    const matchingStatic = staticJobs.filter(
      (j) =>
        normalizeSlug(j.companySlug) === slug ||
        j.company.toLowerCase().includes(slug.replace(/-/g, " "))
    );
    companyJobs = matchingStatic;
  }

  if (companyJobs.length === 0) {
    notFound();
  }

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
