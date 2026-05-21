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

const LPA_MIN = 2;
const LPA_MAX = 50;

function parseLpa(value: string): number | null {
  const n = Number(value);
  if (Number.isNaN(n) || n < 0) return null;
  return n > 100 ? n / 100000 : n;
}

export function validatePostJobForm(
  values: PostJobFormValues
): PostJobFormErrors {
  const errors: PostJobFormErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Job title is required";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (title.length > 120) {
    errors.title = "Title must be under 120 characters";
  }

  const company = values.company.trim();
  if (!company) {
    errors.company = "Company name is required";
  } else if (company.length < 2) {
    errors.company = "Company name must be at least 2 characters";
  }

  const location = values.location.trim();
  if (!location) {
    errors.location = "Location is required";
  } else if (location.length < 2) {
    errors.location = "Enter a valid location (e.g. Bengaluru or Remote)";
  }

  const description = values.description.trim();
  if (!description) {
    errors.description = "Description is required";
  } else if (description.length < 50) {
    errors.description = "Description must be at least 50 characters";
  } else if (description.length > 5000) {
    errors.description = "Description must be under 5000 characters";
  }

  const reqs = values.requirements
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  if (reqs.length === 0) {
    errors.requirements = "Add at least one requirement (one per line)";
  } else if (reqs.some((r) => r.length < 3)) {
    errors.requirements = "Each requirement should be at least 3 characters";
  }

  const min = values.salaryMin ? parseLpa(values.salaryMin) : null;
  const max = values.salaryMax ? parseLpa(values.salaryMax) : null;

  if (values.salaryMin && min == null) {
    errors.salaryMin = "Enter a valid minimum salary (LPA)";
  }
  if (values.salaryMax && max == null) {
    errors.salaryMax = "Enter a valid maximum salary (LPA)";
  }
  if (min != null && max != null) {
    if (min > max) {
      errors.salaryMax = "Maximum must be greater than or equal to minimum";
    }
    if (min < LPA_MIN) {
      errors.salaryMin = `Minimum should be at least ${LPA_MIN} LPA`;
    }
    if (max > LPA_MAX) {
      errors.salaryMax = `Maximum should be at most ${LPA_MAX} LPA`;
    }
  } else if (min != null && (min < LPA_MIN || min > LPA_MAX)) {
    errors.salaryMin = `Enter a value between ${LPA_MIN} and ${LPA_MAX} LPA`;
  } else if (max != null && (max < LPA_MIN || max > LPA_MAX)) {
    errors.salaryMax = `Enter a value between ${LPA_MIN} and ${LPA_MAX} LPA`;
  }

  return errors;
}

export const POST_JOB_FIELD_ORDER: (keyof PostJobFormValues)[] = [
  "title",
  "company",
  "location",
  "salary",
  "salaryMin",
  "salaryMax",
  "type",
  "category",
  "description",
  "requirements",
];
