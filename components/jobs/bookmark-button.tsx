"use client";

import { Bookmark } from "lucide-react";
import { toast } from "sonner";
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
    const isNowSaved = toggleSavedJob(jobId);
    if (isNowSaved) {
      toast.success("Job saved", {
        description: "View it anytime in Saved Jobs.",
      });
    } else {
      toast.info("Removed from saved jobs");
    }
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
