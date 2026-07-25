// hooks/use-jobs.ts
// Fetches jobs from /api/jobs with optional filters

"use client";

import { useState, useEffect, useCallback } from "react";
import type { Job } from "@/types/job";

interface UseJobsOptions {
  q?: string;
  category?: string;
  workMode?: string;
  type?: string;
  experience?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  enabled?: boolean;
}

interface UseJobsResult {
  jobs: Job[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobs(options: UseJobsOptions = {}): UseJobsResult {
  const {
    q,
    category,
    workMode,
    type,
    experience,
    featured,
    limit,
    page = 1,
    enabled = true,
  } = options;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!enabled) return;

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (workMode) params.set("workMode", workMode);
    if (type) params.set("type", type);
    if (experience) params.set("experience", experience);
    if (featured) params.set("featured", "true");
    if (limit) params.set("limit", String(limit));
    if (page > 1) params.set("page", String(page));

    const url = `/api/jobs${params.toString() ? `?${params}` : ""}`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch jobs");
        return r.json();
      })
      .then(
        (data: {
          jobs: Job[];
          total: number;
          totalPages: number;
        }) => {
          setJobs(data.jobs ?? []);
          setTotal(data.total ?? 0);
          setTotalPages(data.totalPages ?? 1);
        }
      )
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [q, category, workMode, type, experience, featured, limit, page, enabled, tick]);

  return { jobs, total, totalPages, loading, error, refetch };
}
