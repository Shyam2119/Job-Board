"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { isJobSaved, toggleSavedJob } from "@/lib/jobs";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  jobId: string;
  className?: string;
  size?: "default" | "icon";
}

export function BookmarkButton({
  jobId,
  className,
  size = "icon",
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isJobSaved(jobId));
  }, [jobId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isNowSaved = toggleSavedJob(jobId);
    setSaved(isNowSaved);
    window.dispatchEvent(new Event("saved-jobs-changed"));
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
      variant="ghost"
      size={size === "icon" ? "icon" : "sm"}
      onClick={handleClick}
      className={cn(
        "shrink-0",
        saved && "text-accent",
        className
      )}
      aria-label={saved ? "Remove from saved" : "Save job"}
    >
      <Bookmark
        className={cn("h-5 w-5 transition-all", saved && "fill-current")}
      />
    </Button>
  );
}
