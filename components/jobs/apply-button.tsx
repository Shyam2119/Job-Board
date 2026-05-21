"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationModal } from "@/components/jobs/application-modal";

interface ApplyButtonProps {
  jobTitle: string;
  company: string;
}

export function ApplyButton({ jobTitle, company }: ApplyButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        onClick={() => setOpen(true)}
        className="w-full transition-transform active:scale-[0.98] sm:w-auto"
      >
        Apply Now
        <Send className="h-4 w-4" />
      </Button>
      <ApplicationModal
        open={open}
        onOpenChange={setOpen}
        jobTitle={jobTitle}
        company={company}
      />
    </>
  );
}
