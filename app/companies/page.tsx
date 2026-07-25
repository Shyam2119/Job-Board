// app/companies/page.tsx
// Companies directory — lists all companies hiring on TalentFlow
// Data fetched live from the database via /api/companies

import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import { CompaniesListClient } from "@/components/companies/companies-list-client";

export const metadata = createMetadata({
  title: "Companies Hiring | TalentFlow",
  description:
    "Explore top companies actively hiring on TalentFlow — from startups to Fortune 500. Find the right culture fit for your next career move.",
  path: "/companies",
});

function CompaniesFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">
      Loading companies...
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Companies Hiring Now
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover companies actively recruiting on TalentFlow.
        </p>
      </div>

      <Suspense fallback={<CompaniesFallback />}>
        <CompaniesListClient />
      </Suspense>
    </div>
  );
}
