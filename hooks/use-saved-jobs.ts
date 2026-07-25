// hooks/use-saved-jobs.ts
// Database-backed saved jobs hook using /api/saved

"use client";

import { useState, useEffect, useCallback } from "react";
import { getSessionId } from "@/lib/session";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load saved jobs from DB on mount
  useEffect(() => {
    const sessionId = getSessionId();
    if (sessionId === "server") {
      // Return early without synchronous setState in effect
      return;
    }

    let active = true;
    fetch(`/api/saved?sessionId=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data: { savedIds?: string[] }) => {
        if (active) setSavedIds(new Set(data.savedIds ?? []));
      })
      .catch(() => {
        /* silent fail */
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Toggle a saved job in the DB
  const toggle = useCallback(
    async (jobId: string): Promise<boolean> => {
      const sessionId = getSessionId();

      // Optimistic update
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (next.has(jobId)) {
          next.delete(jobId);
        } else {
          next.add(jobId);
        }
        return next;
      });

      try {
        const res = await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId, sessionId }),
        });
        const data = (await res.json()) as { saved?: boolean };
        const isSaved = data.saved ?? false;

        // Reconcile with server response
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (isSaved) {
            next.add(jobId);
          } else {
            next.delete(jobId);
          }
          return next;
        });

        return isSaved;
      } catch {
        // Revert optimistic update on error
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (next.has(jobId)) {
            next.delete(jobId);
          } else {
            next.add(jobId);
          }
          return next;
        });
        return false;
      }
    },
    []
  );

  return {
    savedIds,
    loading,
    isSaved: (jobId: string) => savedIds.has(jobId),
    toggle,
  };
}
