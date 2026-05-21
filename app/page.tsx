import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { CompaniesCarousel } from "@/components/home/companies-carousel";
import { CategoryFilters } from "@/components/jobs/category-filters";
import { JobCard } from "@/components/jobs/job-card";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { jobs } from "@/data/jobs";
import { getCompaniesFromJobs } from "@/lib/jobs";

export const metadata = createMetadata({
  title: "Find Your Dream Career | Job Board",
  description:
    "Browse 10,000+ jobs from top companies. Tech, design, marketing, finance, healthcare, and remote opportunities.",
  path: "/",
});

export default function HomePage() {
  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 6);
  const companies = getCompaniesFromJobs(jobs);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <CompaniesCarousel companies={companies} />

      <section className="mx-auto max-w-7xl animate-slide-up px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Find opportunities in your field of expertise
          </p>
        </div>
        <div className="mt-8">
          <CategoryFilters linkMode />
        </div>
      </section>

      <section className="animate-slide-up animate-delay-100 bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Featured</span>
              </div>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Featured Jobs
              </h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked opportunities from top employers
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/jobs">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl animate-slide-up px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Top Companies Hiring</h2>
        <p className="mt-2 text-muted-foreground">
          Explore employers with open positions
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.slice(0, 6).map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logo}
                alt={company.name}
                className="h-12 w-12 rounded-lg border border-border object-cover"
              />
              <div>
                <h3 className="font-semibold transition-colors group-hover:text-accent">
                  {company.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {company.jobCount} open position
                  {company.jobCount !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-slide-up animate-delay-200 bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Hire Top Talent?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Post your job listing and reach thousands of qualified candidates.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/post-job">Post a Job — It&apos;s Free</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
