"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { JobSearch } from "@/components/jobs/job-search";
import { JobAlertsBanner } from "@/components/home/job-alerts-banner";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/jobs${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Sparkles className="h-4 w-4" />
            24+ new jobs posted this week
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Dream{" "}
            <span className="text-accent">Career</span> Today
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            Browse top opportunities from leading companies. Tech, design,
            marketing, finance, healthcare, and remote — all in one place.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            <JobSearch
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              large
              placeholder="Job title, keywords, or company..."
            />
          </div>
        </div>

        <JobAlertsBanner />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
            <Link href="/jobs">
              Browse All Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
