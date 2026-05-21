import { jobs as mockJobs } from "@/data/jobs";
import type { Job } from "@/types/job";

const POSTED_JOBS_KEY = "job-board-posted-jobs";
const SAVED_JOBS_KEY = "job-board-saved-jobs";
const RECENTLY_VIEWED_KEY = "job-board-recently-viewed";
const MAX_RECENTLY_VIEWED = 5;

export { SALARY_RANGE } from "@/lib/browse-filters";
export const JOBS_PER_PAGE = 10;

export function getAllJobs(): Job[] {
  if (typeof window === "undefined") {
    return mockJobs;
  }
  const posted = getPostedJobs();
  return [...posted, ...mockJobs];
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
    return raw ? (JSON.parse(raw) as Job[]) : [];
  } catch {
    return [];
  }
}

export function savePostedJob(job: Job): void {
  const posted = getPostedJobs();
  posted.unshift(job);
  localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify(posted));
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
