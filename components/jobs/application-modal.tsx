"use client";

import { useState } from "react";
import { Upload, Send } from "lucide-react";
import { toast } from "sonner";
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
  jobTitle: string;
  company: string;
}

export function ApplicationModal({
  open,
  onOpenChange,
  jobTitle,
  company,
}: ApplicationModalProps) {
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

    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    onOpenChange(false);
    toast.success("Application submitted!", {
      description: `Your application for ${jobTitle} at ${company} has been received.`,
    });

    setForm({ name: "", email: "", phone: "", coverLetter: "" });
    setResumeName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
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
              placeholder="+1 (555) 000-0000"
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
      </DialogContent>
    </Dialog>
  );
}
