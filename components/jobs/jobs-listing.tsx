"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JobSearch } from "@/components/jobs/job-search";
import { BrowseJobsFilterSidebar } from "@/components/jobs/browse-jobs-filter-sidebar";
import { MobileFilterDrawer } from "@/components/jobs/mobile-filter-drawer";
import { ActiveFilterChips } from "@/components/jobs/active-filter-chips";
import { JobSortDropdown } from "@/components/jobs/job-sort-dropdown";
import { JobCard } from "@/components/jobs/job-card";
import { JobCardSkeleton } from "@/components/jobs/job-card-skeleton";
import { Pagination } from "@/components/jobs/pagination";
import { RecentlyViewedSidebar } from "@/components/jobs/recently-viewed-sidebar";
import { useDebounce } from "@/hooks/use-debounce";
import {
  defaultBrowseFilters,
  sortJobs,
} from "@/lib/browse-filters";
import { parseUrlFilters } from "@/lib/parse-url-filters";
import type { Job, JobFilters, SortOption } from "@/types/job";

const JOBS_PER_PAGE = 10;

// Map client-side filter fields to API query params
function buildApiParams(filters: JobFilters, q: string): URLSearchParams {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (filters.category) p.set("category", String(filters.category));
  if (filters.workModes?.length) p.set("workMode", filters.workModes[0]);
  if (filters.types?.length) p.set("type", filters.types[0]);
  if (filters.experience?.length) p.set("experience", filters.experience[0]);
  if (filters.industries?.length) p.set("industry", filters.industries[0]);
  return p;
}

export function JobsListing() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [filters, setFilters] = useState<JobFilters>(() =>
    parseUrlFilters(searchParams)
  );

  const [currentTimestamp] = useState(() => Date.now());
  const debouncedQuery = useDebounce(filters.query ?? "", 350);

  // Fetch from the database whenever filters or search term changes
  useEffect(() => {
    let active = true;
    const params = buildApiParams(filters, debouncedQuery);
    fetch(`/api/jobs?${params}`)
      .then((r) => r.json())
      .then((data: { jobs?: Job[]; total?: number }) => {
        if (active) {
          setJobs(data.jobs ?? []);
          setTotal(data.total ?? 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [debouncedQuery, filters]);

  // Client-side sort (date, salary) + client-side filters not supported by the API
  const sortedJobs = useMemo(() => sortJobs(jobs, sort), [jobs, sort]);

  // Client-side date filter (datePosted: DatePostedFilter)
  const filteredJobs = useMemo(() => {
    const dateFilter = filters.datePosted;
    if (!dateFilter || dateFilter === "any") return sortedJobs;
    const daysMap: Record<string, number> = { "24h": 1, "3d": 3, "7d": 7, "30d": 30 };
    const days = daysMap[dateFilter];
    if (!days) return sortedJobs;
    const cutoff = currentTimestamp - days * 24 * 60 * 60 * 1000;
    return sortedJobs.filter((j) => {
      const d = j.postedDate ? new Date(j.postedDate).getTime() : 0;
      return d >= cutoff;
    });
  }, [sortedJobs, filters.datePosted, currentTimestamp]);

  // Salary range client filter
  const salaryFiltered = useMemo(() => {
    if (!filters.salaryMin && !filters.salaryMax) return filteredJobs;
    return filteredJobs.filter((j) => {
      if (filters.salaryMin && j.salaryMin < filters.salaryMin) return false;
      if (filters.salaryMax && j.salaryMax > filters.salaryMax) return false;
      return true;
    });
  }, [filteredJobs, filters.salaryMin, filters.salaryMax]);

  const totalPages = Math.max(1, Math.ceil(salaryFiltered.length / JOBS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedJobs = useMemo(() => {
    const start = (safePage - 1) * JOBS_PER_PAGE;
    return salaryFiltered.slice(start, start + JOBS_PER_PAGE);
  }, [salaryFiltered, safePage]);

  const setFiltersAndResetPage = useCallback((next: JobFilters) => {
    setLoading(true);
    setFilters(next);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((next: SortOption) => {
    setSort(next);
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setLoading(true);
    setFilters({ ...defaultBrowseFilters });
    setCurrentPage(1);
  }, []);

  return (
    <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Job Listings
        </h1>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <JobSearch
            value={filters.query ?? ""}
            onChange={(query) => {
              setLoading(true);
              setFilters((prev) => ({ ...prev, query }));
            }}
          />
        </div>
        <MobileFilterDrawer
          open={mobileFiltersOpen}
          onOpenChange={setMobileFiltersOpen}
          filters={filters}
          onChange={setFiltersAndResetPage}
          onReset={handleReset}
        />
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[18rem_1fr] xl:grid-cols-[18rem_1fr_14rem]">
        <aside className="hidden w-72 shrink-0 lg:sticky lg:top-24 lg:block lg:self-start">
          <BrowseJobsFilterSidebar
            filters={filters}
            onChange={setFiltersAndResetPage}
            onReset={handleReset}
          />
        </aside>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {loading ? (
                <span className="inline-block h-4 w-40 animate-pulse rounded bg-muted" />
              ) : (
                <>
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {salaryFiltered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {total}
                  </span>{" "}
                  jobs
                </>
              )}
            </p>
            <div className="w-full sm:w-auto">
              <JobSortDropdown value={sort} onChange={handleSortChange} />
            </div>
          </div>

          <ActiveFilterChips filters={filters} onChange={setFiltersAndResetPage} />

          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))
          ) : paginatedJobs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {!loading && salaryFiltered.length > 0 && (
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>

        <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <RecentlyViewedSidebar />
        </aside>
      </div>

      <div className="mt-8 xl:hidden">
        <RecentlyViewedSidebar />
      </div>
    </div>
  );
}
