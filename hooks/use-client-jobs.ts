"use client";

import { useCallback, useSyncExternalStore } from "react";
import { jobs as mockJobs } from "@/data/jobs";
import {
  getAllJobs,
  getJobsByCompany,
  getRecentlyViewedJobs,
  getSavedJobs,
  isJobSaved,
} from "@/lib/jobs";
import type { Job } from "@/types/job";

function subscribeStorage(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("posted-jobs-changed", handler);
  window.addEventListener("saved-jobs-changed", handler);
  window.addEventListener("recently-viewed-changed", handler);
  window.addEventListener("profile-updated", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("posted-jobs-changed", handler);
    window.removeEventListener("saved-jobs-changed", handler);
    window.removeEventListener("recently-viewed-changed", handler);
    window.removeEventListener("profile-updated", handler);
  };
}

export function useClientJobs(): Job[] {
  return useSyncExternalStore(
    subscribeStorage,
    getAllJobs,
    () => mockJobs
  );
}

export function useCompanyJobs(companySlug: string): Job[] {
  const getSnapshot = useCallback(
    () => getJobsByCompany(companySlug),
    [companySlug]
  );

  return useSyncExternalStore(subscribeStorage, getSnapshot, () =>
    mockJobs.filter((j) => j.companySlug === companySlug)
  );
}

export function useSavedJobsList(): Job[] {
  const getSnapshot = useCallback(() => {
    return getSavedJobs(getAllJobs());
  }, []);

  return useSyncExternalStore(subscribeStorage, getSnapshot, () => []);
}

export function useRecentlyViewedList(): Job[] {
  const getSnapshot = useCallback(() => {
    return getRecentlyViewedJobs(getAllJobs());
  }, []);

  return useSyncExternalStore(subscribeStorage, getSnapshot, () => []);
}

export function useBookmarkStatus(jobId: string): boolean {
  const getSnapshot = useCallback(() => isJobSaved(jobId), [jobId]);

  return useSyncExternalStore(subscribeStorage, getSnapshot, () => false);
}
