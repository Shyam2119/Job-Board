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
  filterJobsAdvanced,
  sortJobs,
} from "@/lib/browse-filters";
import { getAllJobs, JOBS_PER_PAGE } from "@/lib/jobs";
import type {
  JobFilters,
  JobCategory,
  JobType,
  SortOption,
  WorkMode,
} from "@/types/job";

export function JobsListing() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState(() => getAllJobs());
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [filters, setFilters] = useState<JobFilters>(() => ({
    ...defaultBrowseFilters,
    query: searchParams.get("q") ?? "",
    categories: searchParams.get("category")
      ? [searchParams.get("category") as JobCategory]
      : [],
    types: searchParams.get("type")
      ? [searchParams.get("type") as JobType]
      : [],
  }));

  const debouncedQuery = useDebounce(filters.query ?? "", 300);

  const debouncedFilters = useMemo(
    () => ({ ...filters, query: debouncedQuery }),
    [filters, debouncedQuery]
  );

  useEffect(() => {
    setJobs(getAllJobs());
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const workMode = searchParams.get("workMode");
    const q = searchParams.get("q");

    setFilters((prev) => ({
      ...prev,
      query: q ?? prev.query ?? "",
      categories: category ? [category as JobCategory] : prev.categories,
      types: type ? [type as JobType] : prev.types,
      location: location ?? prev.location ?? "",
      workModes: workMode
        ? [workMode as WorkMode]
        : prev.workModes ?? [],
    }));
  }, [searchParams]);

  const filteredJobs = useMemo(() => {
    const filtered = filterJobsAdvanced(jobs, debouncedFilters);
    return sortJobs(filtered, sort);
  }, [jobs, debouncedFilters, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(start, start + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilters, sort]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const handleReset = useCallback(() => {
    setFilters({ ...defaultBrowseFilters });
    setCurrentPage(1);
  }, []);

  const isSearching = debouncedQuery !== (filters.query ?? "");

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
            onChange={(query) => setFilters((prev) => ({ ...prev, query }))}
          />
        </div>
        <MobileFilterDrawer
          open={mobileFiltersOpen}
          onOpenChange={setMobileFiltersOpen}
          filters={filters}
          onChange={setFilters}
          onReset={handleReset}
        />
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[18rem_1fr] xl:grid-cols-[18rem_1fr_14rem]">
        <aside className="hidden w-72 shrink-0 lg:sticky lg:top-24 lg:block lg:self-start">
          <BrowseJobsFilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
          />
        </aside>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {loading || isSearching ? (
                <span className="inline-block h-4 w-40 animate-pulse rounded bg-muted" />
              ) : (
                <>
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredJobs.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {jobs.length}
                  </span>{" "}
                  jobs
                </>
              )}
            </p>
            <div className="w-full sm:w-auto">
              <JobSortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          <ActiveFilterChips filters={filters} onChange={setFilters} />

          {loading || isSearching ? (
            Array.from({ length: JOBS_PER_PAGE }).map((_, i) => (
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

          {!loading && !isSearching && filteredJobs.length > 0 && (
            <Pagination
              currentPage={currentPage}
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
