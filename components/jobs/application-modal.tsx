"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
  company: string;
}

type Step = "form" | "success";

export function ApplicationModal({
  open,
  onOpenChange,
  jobId,
  jobTitle,
  company,
}: ApplicationModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeName(file ? file.name : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeName) {
      toast.error("Please upload your resume");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          coverLetter: form.coverLetter,
          resumeFile: resumeName,
        }),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? "Submission failed");
      }

      setStep("success");
    } catch (err) {
      toast.error("Failed to submit application", {
        description:
          err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when closing
      setTimeout(() => {
        setStep("form");
        setForm({ name: "", email: "", phone: "", coverLetter: "" });
        setResumeName("");
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {jobTitle}</DialogTitle>
              <DialogDescription>
                Submit your application to {company}. All fields are required.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apply-name">Full Name</Label>
                <Input
                  id="apply-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-email">Email</Label>
                <Input
                  id="apply-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-phone">Phone</Label>
                <Input
                  id="apply-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-cover">Cover Letter</Label>
                <Textarea
                  id="apply-cover"
                  required
                  rows={4}
                  value={form.coverLetter}
                  onChange={(e) =>
                    setForm({ ...form, coverLetter: e.target.value })
                  }
                  placeholder="Tell us why you're a great fit..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-resume">Resume</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="relative w-full"
                    asChild
                  >
                    <label htmlFor="apply-resume" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      {resumeName || "Upload resume (PDF, DOC)"}
                      <input
                        id="apply-resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleResumeChange}
                      />
                    </label>
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </span>
                ) : (
                  <>
                    Submit Application
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          // ── Success State ──────────────────────────────────────────────────
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-9 w-9 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold">Application Submitted! 🎉</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your application for{" "}
              <span className="font-medium text-foreground">{jobTitle}</span> at{" "}
              <span className="font-medium text-foreground">{company}</span> has
              been received.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              The hiring team will review your application and reach out via
              email.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3">
              <Button onClick={() => handleClose(false)} className="w-full">
                Close
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/jobs" onClick={() => handleClose(false)}>
                  View Similar Jobs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
