"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BrowseJobsFilterSidebar } from "@/components/jobs/browse-jobs-filter-sidebar";
import { countActiveFilters } from "@/lib/browse-filters";
import type { JobFilters } from "@/types/job";
import { Badge } from "@/components/ui/badge";

interface MobileFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  onReset: () => void;
}

export function MobileFilterDrawer({
  open,
  onOpenChange,
  filters,
  onChange,
  onReset,
}: MobileFilterDrawerProps) {
  const count = countActiveFilters(filters);

  return (
    <>
      <Button
        variant="outline"
        className="lg:hidden"
        onClick={() => onOpenChange(true)}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
        {count > 0 && (
          <Badge variant="default" className="ml-2">
            {count}
          </Badge>
        )}
      </Button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="fixed bottom-0 left-0 right-0 top-auto max-h-[85vh] w-full max-w-none translate-x-0 translate-y-0 rounded-t-2xl border-border bg-card p-0 text-foreground sm:mx-auto sm:max-w-lg">
          <DialogHeader className="border-b border-border px-4 py-3">
            <DialogTitle>Filter Jobs</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-2 pb-6">
            <BrowseJobsFilterSidebar
              filters={filters}
              onChange={onChange}
              onReset={() => {
                onReset();
                onOpenChange(false);
              }}
              className="border-0 shadow-none"
            />
            <div className="sticky bottom-0 border-t border-border bg-card p-4">
              <Button className="w-full" onClick={() => onOpenChange(false)}>
                Show Results
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
