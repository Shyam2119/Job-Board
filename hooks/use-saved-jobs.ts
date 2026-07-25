// hooks/use-saved-jobs.ts
// Database-backed saved jobs hook using /api/saved (with shared state & request deduplication)

"use client";

import { useState, useEffect, useCallback } from "react";
import { getSessionId } from "@/lib/session";

let sharedSavedIds: Set<string> = new Set();
let sharedFetchPromise: Promise<Set<string>> | null = null;
let isLoaded = false;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function fetchSavedIdsShared(sessionId: string): Promise<Set<string>> {
  if (sharedFetchPromise) return sharedFetchPromise;

  sharedFetchPromise = fetch(`/api/saved?sessionId=${encodeURIComponent(sessionId)}`)
    .then((r) => r.json())
    .then((data: { savedIds?: string[] }) => {
      sharedSavedIds = new Set(data.savedIds ?? []);
      isLoaded = true;
      notifyListeners();
      return sharedSavedIds;
    })
    .catch((err) => {
      console.error("Failed to fetch saved jobs:", err);
      return sharedSavedIds;
    })
    .finally(() => {
      sharedFetchPromise = null;
    });

  return sharedFetchPromise;
}

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => sharedSavedIds);
  const [loading, setLoading] = useState(() => !isLoaded);

  useEffect(() => {
    const handleChange = () => {
      setSavedIds(new Set(sharedSavedIds));
      setLoading(!isLoaded);
    };

    listeners.add(handleChange);

    const sessionId = getSessionId();
    if (sessionId !== "server" && !isLoaded) {
      fetchSavedIdsShared(sessionId);
    }

    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const toggle = useCallback(async (jobId: string): Promise<boolean> => {
    const sessionId = getSessionId();

    // Optimistic update across all components
    if (sharedSavedIds.has(jobId)) {
      sharedSavedIds.delete(jobId);
    } else {
      sharedSavedIds.add(jobId);
    }
    notifyListeners();

    try {
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, sessionId }),
      });
      const data = (await res.json()) as { saved?: boolean };
      const isSaved = data.saved ?? false;

      if (isSaved) {
        sharedSavedIds.add(jobId);
      } else {
        sharedSavedIds.delete(jobId);
      }
      notifyListeners();
      return isSaved;
    } catch {
      // Revert optimistic update on error
      if (sharedSavedIds.has(jobId)) {
        sharedSavedIds.delete(jobId);
      } else {
        sharedSavedIds.add(jobId);
      }
      notifyListeners();
      return false;
    }
  }, []);

  return {
    savedIds,
    loading,
    isSaved: (jobId: string) => savedIds.has(jobId),
    toggle,
  };
}
