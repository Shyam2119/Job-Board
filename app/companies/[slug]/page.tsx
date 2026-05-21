import { notFound } from "next/navigation";
import { CompanyProfile } from "@/components/companies/company-profile";
import { createMetadata } from "@/lib/metadata";
import { jobs } from "@/data/jobs";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = [...new Set(jobs.map((j) => j.companySlug))];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CompanyPageProps) {
  const { slug } = await params;
  const job = jobs.find((j) => j.companySlug === slug);
  if (!job) {
    return createMetadata({
      title: "Company Not Found",
      description: "Company profile not found.",
      path: `/companies/${slug}`,
      noIndex: true,
    });
  }
  const count = jobs.filter((j) => j.companySlug === slug).length;
  return createMetadata({
    title: `${job.company} Careers — ${count} Open Jobs`,
    description: `Explore ${count} open positions at ${job.company}. Apply today on TalentFlow.`,
    path: `/companies/${slug}`,
    image: job.logo,
  });
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const companyJobs = jobs.filter((j) => j.companySlug === slug);

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
