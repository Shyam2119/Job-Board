"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/ui/field-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, jobTypes } from "@/data/jobs";
import { savePostedJob } from "@/lib/jobs";
import { slugify, cn } from "@/lib/utils";
import {
  validatePostJobForm,
  type PostJobFormErrors,
  type PostJobFormValues,
} from "@/lib/validate-post-job";
import type { Job, JobCategory, JobType } from "@/types/job";

const initialForm: PostJobFormValues = {
  title: "",
  company: "",
  location: "",
  salary: "",
  salaryMin: "",
  salaryMax: "",
  type: "full-time",
  category: "Tech",
  description: "",
  requirements: "",
};

export function PostJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PostJobFormValues>(initialForm);
  const [errors, setErrors] = useState<PostJobFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof PostJobFormValues, boolean>>>({});

  const updateField = <K extends keyof PostJobFormValues>(
    key: K,
    value: PostJobFormValues[K]
  ) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key]) {
        const nextErrors = validatePostJobForm(next);
        setErrors((e) => ({ ...e, [key]: nextErrors[key] }));
      }
      return next;
    });
  };

  const handleBlur = (key: keyof PostJobFormValues) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const nextErrors = validatePostJobForm(form);
    setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(
      Object.fromEntries(
        Object.keys(initialForm).map((k) => [k, true])
      ) as Record<keyof PostJobFormValues, boolean>
    );

    const validationErrors = validatePostJobForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors below", {
        description: "Some required fields are missing or invalid.",
      });
      return;
    }

    setLoading(true);

    const companySlug = slugify(form.company);
    const salaryMin = Number(form.salaryMin) || 50000;
    const salaryMax = Number(form.salaryMax) || 80000;

    const today = new Date().toISOString().split("T")[0];
    const lpaMin = salaryMin > 50 ? salaryMin / 100000 : salaryMin;
    const lpaMax = salaryMax > 50 ? salaryMax / 100000 : salaryMax;

    const job: Job = {
      id: `posted-${Date.now()}`,
      title: form.title.trim(),
      company: form.company.trim(),
      companySlug,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.company)}&background=1e3a5f&color=38bdf8&bold=true`,
      location: form.location.trim(),
      city: form.location.split(",")[0]?.trim() ?? form.location.trim(),
      salary:
        form.salary.trim() ||
        `₹${lpaMin}L – ₹${lpaMax}L per annum`,
      salaryMin: lpaMin,
      salaryMax: lpaMax,
      type: form.type,
      description: form.description.trim(),
      requirements: form.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      postedDate: today,
      datePosted: today,
      category: form.category,
      featured: false,
      experience: "mid",
      workMode: form.location.toLowerCase().includes("remote")
        ? "remote"
        : "hybrid",
      industry: "IT",
      skills: ["Communication"],
      noticePeriod: "1-month",
      companyRating: 4.0,
      applicantCount: 0,
    };

    savePostedJob(job);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    toast.success("Job posted successfully!", {
      description: "Your listing is now live.",
    });
    router.push(`/jobs/${job.id}`);
  };

  const fieldClass = (key: keyof PostJobFormValues) =>
    cn(errors[key] && touched[key] && "border-red-500 focus-visible:ring-red-500");

  return (
    <Card className="animate-in">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                onBlur={() => handleBlur("title")}
                placeholder="e.g. Senior Software Engineer"
                aria-invalid={!!errors.title && !!touched.title}
                className={fieldClass("title")}
              />
              <FieldError message={touched.title ? errors.title : undefined} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                onBlur={() => handleBlur("company")}
                aria-invalid={!!errors.company && !!touched.company}
                className={fieldClass("company")}
              />
              <FieldError message={touched.company ? errors.company : undefined} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                onBlur={() => handleBlur("location")}
                placeholder="e.g. Remote (US)"
                aria-invalid={!!errors.location && !!touched.location}
                className={fieldClass("location")}
              />
              <FieldError message={touched.location ? errors.location : undefined} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Display</Label>
              <Input
                id="salary"
                value={form.salary}
                onChange={(e) => updateField("salary", e.target.value)}
                placeholder="$80,000 - $100,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Salary Min (USD)</Label>
              <Input
                id="salaryMin"
                type="number"
                min={0}
                value={form.salaryMin}
                onChange={(e) => updateField("salaryMin", e.target.value)}
                onBlur={() => handleBlur("salaryMin")}
                aria-invalid={!!errors.salaryMin && !!touched.salaryMin}
                className={fieldClass("salaryMin")}
              />
              <FieldError message={touched.salaryMin ? errors.salaryMin : undefined} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Salary Max (USD)</Label>
              <Input
                id="salaryMax"
                type="number"
                min={0}
                value={form.salaryMax}
                onChange={(e) => updateField("salaryMax", e.target.value)}
                onBlur={() => handleBlur("salaryMax")}
                aria-invalid={!!errors.salaryMax && !!touched.salaryMax}
                className={fieldClass("salaryMax")}
              />
              <FieldError message={touched.salaryMax ? errors.salaryMax : undefined} />
            </div>
            <div className="space-y-2">
              <Label>Job Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => updateField("type", v as JobType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => updateField("category", v as JobCategory)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              placeholder="Describe the role, responsibilities, and benefits..."
              aria-invalid={!!errors.description && !!touched.description}
              className={fieldClass("description")}
            />
            <FieldError
              message={touched.description ? errors.description : undefined}
            />
            <p className="text-xs text-muted-foreground">
              {form.description.length}/50 characters minimum
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements * (one per line)</Label>
            <Textarea
              id="requirements"
              rows={4}
              value={form.requirements}
              onChange={(e) => updateField("requirements", e.target.value)}
              onBlur={() => handleBlur("requirements")}
              placeholder={"5+ years experience\nStrong communication skills"}
              aria-invalid={!!errors.requirements && !!touched.requirements}
              className={fieldClass("requirements")}
            />
            <FieldError
              message={touched.requirements ? errors.requirements : undefined}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full transition-transform active:scale-[0.98] sm:w-auto"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job Listing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
