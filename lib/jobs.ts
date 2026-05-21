import { jobs as mockJobs } from "@/data/jobs";
import type { Job } from "@/types/job";

const POSTED_JOBS_KEY = "job-board-posted-jobs";
const SAVED_JOBS_KEY = "job-board-saved-jobs";
const RECENTLY_VIEWED_KEY = "job-board-recently-viewed";
const MAX_RECENTLY_VIEWED = 5;

export { SALARY_RANGE } from "@/lib/browse-filters";
export const JOBS_PER_PAGE = 10;

/** Ensures jobs from localStorage have all fields required by filters and UI. */
export function normalizeJob(raw: Partial<Job> & Pick<Job, "id" | "title" | "company">): Job {
  const city =
    raw.city ??
    raw.location?.split(",")[0]?.trim() ??
    raw.location ??
    "Unknown";
  const posted = raw.postedDate ?? raw.datePosted ?? new Date().toISOString().split("T")[0];

  return {
    id: raw.id,
    title: raw.title,
    company: raw.company,
    companySlug: raw.companySlug ?? raw.company.toLowerCase().replace(/\s+/g, "-"),
    logo:
      raw.logo ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(raw.company)}&background=1e3a5f&color=38bdf8&bold=true`,
    location: raw.location ?? city,
    city,
    salary: raw.salary ?? "Competitive",
    salaryMin: raw.salaryMin ?? 8,
    salaryMax: raw.salaryMax ?? 12,
    type: raw.type ?? "full-time",
    description: raw.description ?? "",
    requirements: Array.isArray(raw.requirements) ? raw.requirements : [],
    postedDate: posted,
    datePosted: raw.datePosted ?? posted,
    category: raw.category ?? "Tech",
    featured: raw.featured ?? false,
    experience: raw.experience ?? "mid",
    workMode: raw.workMode ?? "hybrid",
    industry: raw.industry ?? "IT",
    skills: Array.isArray(raw.skills) ? raw.skills : ["Communication"],
    noticePeriod: raw.noticePeriod ?? "1-month",
    companyRating: raw.companyRating ?? 4,
    applicantCount: raw.applicantCount ?? 0,
  };
}

let clientJobsSnapshot: Job[] | null = null;
let clientJobsSnapshotKey = "";

/** Invalidate after mutating posted/saved/recent jobs in localStorage. */
export function invalidateJobsCache(): void {
  clientJobsSnapshotKey = "";
}

function getClientJobsSnapshot(): Job[] {
  const key =
    typeof window !== "undefined"
      ? (localStorage.getItem(POSTED_JOBS_KEY) ?? "")
      : "server";
  if (clientJobsSnapshot && clientJobsSnapshotKey === key) {
    return clientJobsSnapshot;
  }
  clientJobsSnapshotKey = key;
  clientJobsSnapshot = [...getPostedJobs(), ...mockJobs];
  return clientJobsSnapshot;
}

/** Stable snapshot for client stores; same array reference until localStorage changes. */
export function getJobsStoreSnapshot(): Job[] {
  if (typeof window === "undefined") return mockJobs;
  return getClientJobsSnapshot();
}

export function getAllJobs(): Job[] {
  if (typeof window === "undefined") {
    return mockJobs;
  }
  return getClientJobsSnapshot();
}

export function getMockJobs(): Job[] {
  return mockJobs;
}

export function getJobById(id: string): Job | undefined {
  return getAllJobs().find((job) => job.id === id);
}

export function getFeaturedJobs(): Job[] {
  return getAllJobs().filter((job) => job.featured).slice(0, 6);
}

export function getJobsByCompany(companySlug: string): Job[] {
  return getAllJobs().filter((job) => job.companySlug === companySlug);
}

export function getRelatedJobs(job: Job, limit = 4): Job[] {
  return getAllJobs()
    .filter(
      (j) =>
        j.id !== job.id &&
        (j.category === job.category || j.companySlug === job.companySlug)
    )
    .slice(0, limit);
}

export function getUniqueLocations(jobs: Job[] = mockJobs): string[] {
  const locations = new Set<string>();
  for (const job of jobs) {
    const city = job.location.split(",")[0]?.trim() ?? job.location;
    locations.add(city);
    if (job.location.toLowerCase().includes("remote")) {
      locations.add("Remote");
    }
  }
  return Array.from(locations).sort((a, b) => a.localeCompare(b));
}

export { filterJobsAdvanced as filterJobs } from "@/lib/browse-filters";

export function addRecentlyViewed(jobId: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const filtered = ids.filter((id) => id !== jobId);
    filtered.unshift(jobId);
    localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(filtered.slice(0, MAX_RECENTLY_VIEWED))
    );
    invalidateJobsCache();
    window.dispatchEvent(new Event("recently-viewed-changed"));
  } catch {
    /* ignore */
  }
}

export function getRecentlyViewedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function getRecentlyViewedJobs(allJobs: Job[]): Job[] {
  const ids = getRecentlyViewedIds();
  return ids
    .map((id) => allJobs.find((j) => j.id === id))
    .filter((j): j is Job => j != null);
}

export function getPostedJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(POSTED_JOBS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Partial<Job> & Pick<Job, "id" | "title" | "company">>;
    return parsed.map(normalizeJob);
  } catch {
    return [];
  }
}

export function savePostedJob(job: Job): void {
  const posted = getPostedJobs();
  posted.unshift(job);
  localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify(posted));
  if (typeof window !== "undefined") {
    invalidateJobsCache();
    window.dispatchEvent(new Event("posted-jobs-changed"));
  }
}

export function getSavedJobIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleSavedJob(id: string): boolean {
  const saved = getSavedJobIds();
  const index = saved.indexOf(id);
  let isSaved: boolean;
  if (index >= 0) {
    saved.splice(index, 1);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
    isSaved = false;
  } else {
    saved.push(id);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
    isSaved = true;
  }
  if (typeof window !== "undefined") {
    invalidateJobsCache();
    window.dispatchEvent(new Event("saved-jobs-changed"));
  }
  return isSaved;
}

export function isJobSaved(id: string): boolean {
  return getSavedJobIds().includes(id);
}

export function getSavedJobs(allJobs: Job[]): Job[] {
  const ids = getSavedJobIds();
  return allJobs.filter((job) => ids.includes(job.id));
}

export function getCompaniesFromJobs(jobs: Job[]) {
  const map = new Map<
    string,
    { name: string; slug: string; logo: string; jobCount: number }
  >();

  for (const job of jobs) {
    const existing = map.get(job.companySlug);
    if (existing) {
      existing.jobCount += 1;
    } else {
      map.set(job.companySlug, {
        name: job.company,
        slug: job.companySlug,
        logo: job.logo,
        jobCount: 1,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.jobCount - a.jobCount);
}
