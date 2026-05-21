"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getJobsStoreSnapshot, invalidateJobsCache } from "@/lib/jobs";
import { jobs as mockJobs } from "@/data/jobs";
import type { Job } from "@/types/job";

function subscribeJobs(onStoreChange: () => void) {
  const handler = () => {
    invalidateJobsCache();
    onStoreChange();
  };
  window.addEventListener("storage", handler);
  window.addEventListener("posted-jobs-changed", handler);
  window.addEventListener("saved-jobs-changed", handler);
  window.addEventListener("recently-viewed-changed", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("posted-jobs-changed", handler);
    window.removeEventListener("saved-jobs-changed", handler);
    window.removeEventListener("recently-viewed-changed", handler);
  };
}

function subscribeSaved(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("saved-jobs-changed", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("saved-jobs-changed", handler);
    window.removeEventListener("storage", handler);
  };
}

function getSavedIdsKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("job-board-saved-jobs") ?? "";
  } catch {
    return "";
  }
}

function getRecentIdsKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("job-board-recently-viewed") ?? "";
  } catch {
    return "";
  }
}

export function useClientJobs(): Job[] {
  return useSyncExternalStore(
    subscribeJobs,
    getJobsStoreSnapshot,
    () => mockJobs
  );
}

export function useCompanyJobs(companySlug: string): Job[] {
  const jobs = useClientJobs();
  return useMemo(
    () => jobs.filter((j) => j.companySlug === companySlug),
    [jobs, companySlug]
  );
}

export function useSavedJobsList(): Job[] {
  const savedKey = useSyncExternalStore(subscribeSaved, getSavedIdsKey, () => "");
  const jobs = useClientJobs();
  return useMemo(() => {
    const ids: string[] = savedKey ? (JSON.parse(savedKey) as string[]) : [];
    return jobs.filter((job) => ids.includes(job.id));
  }, [jobs, savedKey]);
}

export function useRecentlyViewedList(): Job[] {
  const recentKey = useSyncExternalStore(
    subscribeJobs,
    getRecentIdsKey,
    () => ""
  );
  const jobs = useClientJobs();
  return useMemo(() => {
    const ids: string[] = recentKey ? (JSON.parse(recentKey) as string[]) : [];
    return ids
      .map((id) => jobs.find((j) => j.id === id))
      .filter((j): j is Job => j != null);
  }, [jobs, recentKey]);
}

export function useBookmarkStatus(jobId: string): boolean {
  const savedKey = useSyncExternalStore(subscribeSaved, getSavedIdsKey, () => "");
  return useMemo(() => {
    const ids: string[] = savedKey ? (JSON.parse(savedKey) as string[]) : [];
    return ids.includes(jobId);
  }, [savedKey, jobId]);
}
