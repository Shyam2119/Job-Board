"use client";

import Link from "next/link";
import {
  Code2,
  Palette,
  Megaphone,
  Landmark,
  HeartPulse,
  Globe,
} from "lucide-react";
import type { JobCategory } from "@/types/job";
import { cn } from "@/lib/utils";

const categories: {
  name: JobCategory;
  icon: React.ElementType;
  color: string;
}[] = [
  { name: "Tech", icon: Code2, color: "hover:border-blue-500/50 hover:bg-blue-500/10" },
  { name: "Design", icon: Palette, color: "hover:border-purple-500/50 hover:bg-purple-500/10" },
  { name: "Marketing", icon: Megaphone, color: "hover:border-orange-500/50 hover:bg-orange-500/10" },
  { name: "Finance", icon: Landmark, color: "hover:border-emerald-500/50 hover:bg-emerald-500/10" },
  { name: "Healthcare", icon: HeartPulse, color: "hover:border-rose-500/50 hover:bg-rose-500/10" },
  { name: "Remote", icon: Globe, color: "hover:border-cyan-500/50 hover:bg-cyan-500/10" },
];

interface CategoryFiltersProps {
  activeCategory?: string;
  onSelect?: (category: JobCategory | "") => void;
  linkMode?: boolean;
}

export function CategoryFilters({
  activeCategory,
  onSelect,
  linkMode = false,
}: CategoryFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map(({ name, icon: Icon, color }) => {
        const isActive = activeCategory === name;
        const className = cn(
          "flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all duration-200",
          color,
          isActive && "border-accent bg-accent/10 ring-1 ring-accent"
        );

        if (linkMode) {
          return (
            <Link
              key={name}
              href={`/jobs?category=${name}`}
              className={className}
            >
              <Icon className={cn("h-6 w-6", isActive ? "text-accent" : "text-muted-foreground")} />
              <span className="text-sm font-medium">{name}</span>
            </Link>
          );
        }

        return (
          <button
            key={name}
            type="button"
            onClick={() => onSelect?.(isActive ? "" : name)}
            className={className}
          >
            <Icon className={cn("h-6 w-6", isActive ? "text-accent" : "text-muted-foreground")} />
            <span className="text-sm font-medium">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
