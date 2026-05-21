import type { Job, JobFilters, SortOption } from "@/types/job";
import { SALARY_LPA_RANGE } from "@/data/filter-constants";

export { SALARY_LPA_RANGE as SALARY_RANGE };

export const defaultBrowseFilters: JobFilters = {
  query: "",
  location: "",
  types: [],
  categories: [],
  datePosted: "any",
  experience: [],
  workModes: [],
  industries: [],
  skills: [],
  noticePeriod: "",
  minRating: undefined,
  salaryMin: undefined,
  salaryMax: undefined,
};

export function countActiveFilters(filters: JobFilters): number {
  let count = 0;
  if (filters.location && filters.location !== "all") count++;
  if (filters.datePosted && filters.datePosted !== "any") count++;
  if (filters.experience?.length) count++;
  if (filters.types?.length) count++;
  if (filters.workModes?.length) count++;
  if (filters.industries?.length) count++;
  if (filters.skills?.length) count++;
  if (filters.noticePeriod) count++;
  if (filters.minRating != null) count++;
  if (filters.categories?.length) count++;
  if (
    filters.salaryMin != null &&
    filters.salaryMin > SALARY_LPA_RANGE.min
  )
    count++;
  if (
    filters.salaryMax != null &&
    filters.salaryMax < SALARY_LPA_RANGE.max
  )
    count++;
  return count;
}

function matchesDatePosted(datePosted: string, filter: JobFilters["datePosted"]): boolean {
  if (!filter || filter === "any") return true;
  const posted = new Date(datePosted);
  const now = new Date();
  const ms = now.getTime() - posted.getTime();
  const days = ms / (1000 * 60 * 60 * 24);
  switch (filter) {
    case "24h":
      return days <= 1;
    case "3d":
      return days <= 3;
    case "7d":
      return days <= 7;
    case "30d":
      return days <= 30;
    default:
      return true;
  }
}

export function filterJobsAdvanced(jobs: Job[], filters: JobFilters): Job[] {
  const activeTypes = filters.types?.length ? filters.types : [];
  const activeCategories = filters.categories?.length
    ? filters.categories
    : filters.category
      ? [filters.category]
      : [];

  return jobs.filter((job) => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = [
        job.title,
        job.company,
        job.description,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filters.location && filters.location !== "all") {
      const loc = filters.location.toLowerCase();
      if (
        job.city.toLowerCase() !== loc &&
        !job.location.toLowerCase().includes(loc)
      ) {
        return false;
      }
    }

    if (!matchesDatePosted(job.datePosted, filters.datePosted)) return false;

    if (
      filters.experience?.length &&
      !filters.experience.includes(job.experience)
    ) {
      return false;
    }

    if (activeTypes.length > 0 && !activeTypes.includes(job.type)) {
      return false;
    }

    if (
      filters.workModes?.length &&
      !filters.workModes.includes(job.workMode)
    ) {
      return false;
    }

    if (
      filters.industries?.length &&
      !filters.industries.includes(job.industry)
    ) {
      return false;
    }

    if (filters.skills?.length) {
      const hasSkill = filters.skills.some((s) =>
        job.skills.some((js) => js.toLowerCase() === s.toLowerCase())
      );
      if (!hasSkill) return false;
    }

    if (filters.noticePeriod && job.noticePeriod !== filters.noticePeriod) {
      return false;
    }

    if (
      filters.minRating != null &&
      job.companyRating < filters.minRating
    ) {
      return false;
    }

    if (activeCategories.length > 0 && !activeCategories.includes(job.category)) {
      return false;
    }

    const salMin = filters.salaryMin ?? SALARY_LPA_RANGE.min;
    const salMax = filters.salaryMax ?? SALARY_LPA_RANGE.max;
    if (job.salaryMax < salMin || job.salaryMin > salMax) {
      return false;
    }

    return true;
  });
}

export function sortJobs(jobs: Job[], sort: SortOption): Job[] {
  const copy = [...jobs];
  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
      );
    case "salary":
      return copy.sort((a, b) => b.salaryMax - a.salaryMax);
    case "applied":
      return copy.sort((a, b) => b.applicantCount - a.applicantCount);
    case "relevant":
    default:
      return copy.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.applicantCount - a.applicantCount;
      });
  }
}

export function getActiveFilterChips(
  filters: JobFilters
): { key: string; label: string; clear: () => Partial<JobFilters> }[] {
  const chips: { key: string; label: string; clear: () => Partial<JobFilters> }[] =
    [];

  if (filters.location && filters.location !== "all") {
    chips.push({
      key: "location",
      label: filters.location,
      clear: () => ({ location: "" }),
    });
  }

  if (filters.datePosted && filters.datePosted !== "any") {
    const labels: Record<string, string> = {
      "24h": "Last 24h",
      "3d": "Last 3 days",
      "7d": "Last 7 days",
      "30d": "Last 30 days",
    };
    chips.push({
      key: "date",
      label: labels[filters.datePosted] ?? filters.datePosted,
      clear: () => ({ datePosted: "any" }),
    });
  }

  filters.experience?.forEach((e) => {
    chips.push({
      key: `exp-${e}`,
      label: e,
      clear: () => ({
        experience: filters.experience?.filter((x) => x !== e),
      }),
    });
  });

  filters.types?.forEach((t) => {
    chips.push({
      key: `type-${t}`,
      label: t.replace("-", " "),
      clear: () => ({ types: filters.types?.filter((x) => x !== t) }),
    });
  });

  filters.workModes?.forEach((w) => {
    chips.push({
      key: `wm-${w}`,
      label: w,
      clear: () => ({ workModes: filters.workModes?.filter((x) => x !== w) }),
    });
  });

  filters.industries?.forEach((i) => {
    chips.push({
      key: `ind-${i}`,
      label: i,
      clear: () => ({
        industries: filters.industries?.filter((x) => x !== i),
      }),
    });
  });

  filters.skills?.forEach((s) => {
    chips.push({
      key: `skill-${s}`,
      label: s,
      clear: () => ({ skills: filters.skills?.filter((x) => x !== s) }),
    });
  });

  if (filters.noticePeriod) {
    chips.push({
      key: "notice",
      label: `Notice: ${filters.noticePeriod}`,
      clear: () => ({ noticePeriod: "" }),
    });
  }

  if (filters.minRating != null) {
    chips.push({
      key: "rating",
      label: `${filters.minRating}★+`,
      clear: () => ({ minRating: undefined }),
    });
  }

  if (
    filters.salaryMin != null &&
    filters.salaryMin > SALARY_LPA_RANGE.min
  ) {
    chips.push({
      key: "sal-min",
      label: `Min ₹${filters.salaryMin}L`,
      clear: () => ({ salaryMin: undefined }),
    });
  }

  if (
    filters.salaryMax != null &&
    filters.salaryMax < SALARY_LPA_RANGE.max
  ) {
    chips.push({
      key: "sal-max",
      label: `Max ₹${filters.salaryMax}L`,
      clear: () => ({ salaryMax: undefined }),
    });
  }

  return chips;
}

export function formatLpa(n: number): string {
  return n >= 1 ? `₹${n}L` : `₹${n}`;
}

export function isJobNew(datePosted: string): boolean {
  const posted = new Date(datePosted);
  const now = new Date();
  return now.getTime() - posted.getTime() <= 24 * 60 * 60 * 1000;
}
