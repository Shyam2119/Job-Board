"use client";

import { Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { categories, jobTypes } from "@/data/jobs";
import { SALARY_RANGE } from "@/lib/jobs";
import type { JobFilters, JobCategory, JobType } from "@/types/job";
import { cn } from "@/lib/utils";

interface JobFiltersPanelProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  onClear: () => void;
  locations: string[];
}

export function JobFiltersPanel({
  filters,
  onChange,
  onClear,
  locations,
}: JobFiltersPanelProps) {
  const salaryMin = filters.salaryMin ?? SALARY_RANGE.min;
  const salaryMax = filters.salaryMax ?? SALARY_RANGE.max;
  const selectedTypes = filters.types ?? [];
  const selectedCategories = filters.categories ?? [];

  const hasFilters =
    filters.query ||
    (filters.location && filters.location !== "all") ||
    selectedTypes.length > 0 ||
    selectedCategories.length > 0 ||
    filters.salaryMin != null ||
    filters.salaryMax != null;

  const toggleType = (type: JobType) => {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onChange({ ...filters, types: next, type: "" });
  };

  const toggleCategory = (cat: JobCategory) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    onChange({ ...filters, categories: next, category: "" });
  };

  const formatSalary = (n: number) =>
    n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Filter className="h-4 w-4 text-accent" />
          Filters
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="transition-colors"
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Location</Label>
          <Select
            value={filters.location || "all"}
            onValueChange={(v) =>
              onChange({
                ...filters,
                location: v === "all" ? "" : v,
              })
            }
          >
            <SelectTrigger className="transition-colors">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Job Type</Label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                />
                <span className="text-sm capitalize">
                  {type.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Salary Range</Label>
          <Slider
            min={SALARY_RANGE.min}
            max={SALARY_RANGE.max}
            step={5000}
            value={[salaryMin, salaryMax]}
            onValueChange={([min, max]) =>
              onChange({
                ...filters,
                salaryMin: min === SALARY_RANGE.min ? undefined : min,
                salaryMax: max === SALARY_RANGE.max ? undefined : max,
              })
            }
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatSalary(salaryMin)}</span>
            <span>{formatSalary(salaryMax)}+</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Category</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className="transition-transform active:scale-95"
                >
                  <Badge
                    variant={active ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      active && "ring-1 ring-accent"
                    )}
                  >
                    {cat}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
