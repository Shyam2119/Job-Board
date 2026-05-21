"use client";

import { useState, KeyboardEvent } from "react";
import { Filter, RotateCcw, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterSection } from "@/components/jobs/filter-section";
import {
  DATE_POSTED_OPTIONS,
  EXPERIENCE_OPTIONS,
  FILTER_CITIES,
  INDUSTRY_OPTIONS,
  JOB_TYPE_OPTIONS,
  NOTICE_PERIOD_OPTIONS,
  RATING_FILTER_OPTIONS,
  SALARY_LPA_RANGE,
  SKILL_SUGGESTIONS,
  WORK_MODE_OPTIONS,
} from "@/data/filter-constants";
import { countActiveFilters, formatLpa } from "@/lib/browse-filters";
import type { JobFilters } from "@/types/job";
import { cn } from "@/lib/utils";

interface BrowseJobsFilterSidebarProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  onReset: () => void;
  className?: string;
}

export function BrowseJobsFilterSidebar({
  filters,
  onChange,
  onReset,
  className,
}: BrowseJobsFilterSidebarProps) {
  const [skillInput, setSkillInput] = useState("");
  const activeCount = countActiveFilters(filters);

  const salaryMin = filters.salaryMin ?? SALARY_LPA_RANGE.min;
  const salaryMax = filters.salaryMax ?? SALARY_LPA_RANGE.max;

  const toggleArray = <T extends string>(
    key: keyof JobFilters,
    value: T,
    current: T[] = []
  ) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    const skills = filters.skills ?? [];
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    onChange({ ...filters, skills: [...skills, trimmed] });
    setSkillInput("");
  };

  const handleSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-sm",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Filter className="h-4 w-4 text-accent" />
          Filters
          {activeCount > 0 && (
            <Badge variant="default" className="text-xs">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 text-xs text-muted-foreground hover:text-accent"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset All
          </Button>
        )}
      </div>

      <div className="max-h-[calc(100vh-8rem)] space-y-4 overflow-y-auto pr-1">
        <FilterSection title="Date Posted">
          <div className="space-y-2">
            {DATE_POSTED_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted"
              >
                <input
                  type="radio"
                  name="datePosted"
                  checked={(filters.datePosted ?? "any") === opt.value}
                  onChange={() =>
                    onChange({ ...filters, datePosted: opt.value })
                  }
                  className="h-4 w-4 border-border bg-card text-accent focus:ring-accent focus:ring-offset-background"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Experience Level">
          <div className="space-y-2">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={filters.experience?.includes(opt.value)}
                  onCheckedChange={() =>
                    toggleArray(
                      "experience",
                      opt.value,
                      filters.experience ?? []
                    )
                  }
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Job Type">
          <div className="space-y-2">
            {JOB_TYPE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={filters.types?.includes(opt.value)}
                  onCheckedChange={() =>
                    toggleArray("types", opt.value, filters.types ?? [])
                  }
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Work Mode">
          <div className="space-y-2">
            {WORK_MODE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={filters.workModes?.includes(opt.value)}
                  onCheckedChange={() =>
                    toggleArray(
                      "workModes",
                      opt.value,
                      filters.workModes ?? []
                    )
                  }
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Salary Range">
          <Slider
            min={SALARY_LPA_RANGE.min}
            max={SALARY_LPA_RANGE.max}
            step={1}
            value={[salaryMin, salaryMax]}
            onValueChange={([min, max]) =>
              onChange({
                ...filters,
                salaryMin: min === SALARY_LPA_RANGE.min ? undefined : min,
                salaryMax: max === SALARY_LPA_RANGE.max ? undefined : max,
              })
            }
            className="py-2"
          />
          <p className="mt-2 text-center text-sm font-medium text-accent">
            {formatLpa(salaryMin)} – {formatLpa(salaryMax)} per annum
          </p>
        </FilterSection>

        <FilterSection title="Location">
          <Select
            value={filters.location || "all"}
            onValueChange={(v) =>
              onChange({ ...filters, location: v === "all" ? "" : v })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {FILTER_CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Industry">
          <div className="flex flex-wrap gap-2">
            {INDUSTRY_OPTIONS.map((opt) => {
              const active = filters.industries?.includes(opt.value);
              return (
                <label key={opt.value} className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={active}
                    onChange={() =>
                      toggleArray(
                        "industries",
                        opt.value,
                        filters.industries ?? []
                      )
                    }
                  />
                  <Badge
                    variant={active ? "default" : "outline"}
                    className="transition-all hover:scale-105"
                  >
                    {opt.label}
                  </Badge>
                </label>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Skills">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKey}
            placeholder="Type skill + Enter"
            className="mb-2"
          />
          <div className="mb-2 flex flex-wrap gap-1">
            {SKILL_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addSkill(s)}
                className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.skills?.map((skill) => (
              <Badge key={skill} variant="default" className="gap-1 pr-1">
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      skills: filters.skills?.filter((s) => s !== skill),
                    })
                  }
                  className="rounded-full p-0.5 hover:bg-accent/30"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Notice Period">
          <div className="space-y-2">
            {NOTICE_PERIOD_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted"
              >
                <input
                  type="radio"
                  name="noticePeriod"
                  checked={filters.noticePeriod === opt.value}
                  onChange={() =>
                    onChange({ ...filters, noticePeriod: opt.value })
                  }
                  className="h-4 w-4 border-border bg-card text-accent focus:ring-accent focus:ring-offset-background"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-2.5 rounded-lg p-1.5">
              <input
                type="radio"
                name="noticePeriod"
                checked={!filters.noticePeriod}
                onChange={() => onChange({ ...filters, noticePeriod: "" })}
                className="h-4 w-4 border-border bg-card text-accent focus:ring-accent focus:ring-offset-background"
              />
              <span className="text-sm text-muted-foreground">Any</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Company Rating" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {RATING_FILTER_OPTIONS.map((opt) => {
              const active = filters.minRating === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      minRating: active ? undefined : opt.value,
                    })
                  }
                  className={cn(
                    "flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm transition-all",
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border hover:border-accent/40"
                  )}
                >
                  <Star
                    className={cn(
                      "h-3.5 w-3.5",
                      active && "fill-current"
                    )}
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
