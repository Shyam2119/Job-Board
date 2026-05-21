import type { JobCategory, JobType } from "@/types/job";

export interface PostJobFormValues {
  title: string;
  company: string;
  location: string;
  salary: string;
  salaryMin: string;
  salaryMax: string;
  type: JobType;
  category: JobCategory;
  description: string;
  requirements: string;
}

export type PostJobFormErrors = Partial<Record<keyof PostJobFormValues, string>>;

export function validatePostJobForm(
  values: PostJobFormValues
): PostJobFormErrors {
  const errors: PostJobFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Job title is required";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!values.company.trim()) {
    errors.company = "Company name is required";
  } else if (values.company.trim().length < 2) {
    errors.company = "Company name must be at least 2 characters";
  }

  if (!values.location.trim()) {
    errors.location = "Location is required";
  } else if (values.location.trim().length < 2) {
    errors.location = "Enter a valid location";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  } else if (values.description.trim().length < 50) {
    errors.description = "Description must be at least 50 characters";
  }

  const reqs = values.requirements
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  if (reqs.length === 0) {
    errors.requirements = "Add at least one requirement (one per line)";
  }

  const min = values.salaryMin ? Number(values.salaryMin) : null;
  const max = values.salaryMax ? Number(values.salaryMax) : null;

  if (values.salaryMin && (Number.isNaN(min) || min! < 0)) {
    errors.salaryMin = "Enter a valid minimum salary";
  }
  if (values.salaryMax && (Number.isNaN(max) || max! < 0)) {
    errors.salaryMax = "Enter a valid maximum salary";
  }
  if (min != null && max != null && !Number.isNaN(min) && !Number.isNaN(max)) {
    if (min > max) {
      errors.salaryMax = "Maximum must be greater than minimum";
    }
    if (min < 2 || max > 50) {
      if (min < 2) errors.salaryMin = "Minimum salary seems too low (LPA)";
      if (max > 50) errors.salaryMax = "Maximum salary seems too high (LPA)";
    }
  }

  return errors;
}
