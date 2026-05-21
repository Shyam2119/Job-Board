import type { ReadonlyURLSearchParams } from "next/navigation";
import { defaultBrowseFilters } from "@/lib/browse-filters";
import type { JobCategory, JobFilters, JobType, WorkMode } from "@/types/job";

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams
): JobFilters {
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const location = searchParams.get("location");
  const workMode = searchParams.get("workMode");
  const q = searchParams.get("q");

  return {
    ...defaultBrowseFilters,
    query: q ?? "",
    categories: category ? [category as JobCategory] : [],
    types: type ? [type as JobType] : [],
    location: location ?? "",
    workModes: workMode ? [workMode as WorkMode] : [],
  };
}
