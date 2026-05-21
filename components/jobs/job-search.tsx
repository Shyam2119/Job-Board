"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  large?: boolean;
}

export function JobSearch({
  value,
  onChange,
  onSubmit,
  placeholder = "Search jobs by title or company...",
  large = false,
}: JobSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={
          large
            ? "flex flex-col gap-3 sm:flex-row sm:items-center"
            : "flex gap-2"
        }
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={large ? "h-12 pl-10 text-base" : "pl-10"}
          />
        </div>
        {large && (
          <Button type="submit" size="lg" className="shrink-0 sm:w-auto w-full">
            Search Jobs
          </Button>
        )}
      </div>
    </form>
  );
}
