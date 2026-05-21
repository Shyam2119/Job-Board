"use client";

import { X } from "lucide-react";
import { getActiveFilterChips } from "@/lib/browse-filters";
import type { JobFilters } from "@/types/job";

interface ActiveFilterChipsProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export function ActiveFilterChips({ filters, onChange }: ActiveFilterChipsProps) {
  const chips = getActiveFilterChips(filters);
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onChange({ ...filters, ...chip.clear() })}
          className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/25"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
