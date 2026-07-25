"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Star, Search, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface Company {
  name: string;
  slug: string;
  logo: string;
  jobCount: number;
  rating: number;
}

export function CompaniesListClient() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((data: { companies?: Company[] }) =>
        setCompanies(data.companies ?? [])
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          id="company-search"
        />
      </div>

      {/* Stats bar */}
      {!loading && (
        <p className="mb-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "company" : "companies"} found
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 space-y-3"
              >
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))
          : filtered.length === 0
          ? (
            <div className="col-span-full flex flex-col items-center gap-3 py-20 text-center">
              <Building2 className="h-10 w-10 text-muted-foreground/40" />
              <p className="font-medium">No companies found</p>
              <p className="text-sm text-muted-foreground">
                Try a different search term.
              </p>
            </div>
          )
          : filtered.map((company) => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                {/* Logo */}
                <div className="flex items-start justify-between">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 rounded-lg border border-border object-cover"
                  />
                  {/* Rating */}
                  <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      {company.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h2 className="font-semibold leading-snug group-hover:text-accent transition-colors">
                    {company.name}
                  </h2>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      {company.jobCount}{" "}
                      {company.jobCount === 1 ? "open role" : "open roles"}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <span className="mt-auto text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View company →
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
}
