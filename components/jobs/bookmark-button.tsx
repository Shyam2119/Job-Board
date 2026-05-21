"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSavedJob } from "@/lib/jobs";
import { useBookmarkStatus } from "@/hooks/use-client-jobs";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  jobId: string;
  className?: string;
}

export function BookmarkButton({ jobId, className }: BookmarkButtonProps) {
  const saved = useBookmarkStatus(jobId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedJob(jobId);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      aria-label={saved ? "Remove bookmark" : "Save job"}
      aria-pressed={saved}
    >
      <Bookmark
        className={cn(
          "h-5 w-5 transition-colors",
          saved ? "fill-accent text-accent" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
