import type { Job, JobType } from "@/types/job";

type RawJob = Omit<
  Job,
  | "datePosted"
  | "city"
  | "experience"
  | "workMode"
  | "industry"
  | "skills"
  | "noticePeriod"
  | "companyRating"
  | "applicantCount"
> & {
  type: JobType | "remote";
};

const presets: Record<
  string,
  Partial<
    Pick<
      Job,
      | "city"
      | "experience"
      | "workMode"
      | "industry"
      | "skills"
      | "noticePeriod"
      | "companyRating"
      | "applicantCount"
      | "salaryMin"
      | "salaryMax"
      | "salary"
      | "type"
      | "location"
    >
  >
> = {
  "job-001": {
    city: "Bangalore",
    location: "Bangalore, Karnataka",
    experience: "senior",
    workMode: "hybrid",
    industry: "IT",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    noticePeriod: "2-months",
    companyRating: 4.5,
    applicantCount: 342,
    salaryMin: 18,
    salaryMax: 28,
    salary: "₹18L – ₹28L per annum",
    type: "full-time",
  },
  "job-002": {
    city: "Mumbai",
    location: "Mumbai, Maharashtra",
    experience: "mid",
    workMode: "hybrid",
    industry: "Startup",
    skills: ["Figma", "UI Design", "Prototyping"],
    noticePeriod: "1-month",
    companyRating: 4.2,
    applicantCount: 189,
    salaryMin: 10,
    salaryMax: 16,
    salary: "₹10L – ₹16L per annum",
  },
  "job-003": {
    city: "Delhi",
    location: "Delhi NCR",
    experience: "mid",
    workMode: "onsite",
    industry: "E-Commerce",
    skills: ["SEO", "Google Ads", "Analytics"],
    noticePeriod: "1-month",
    companyRating: 4.0,
    applicantCount: 256,
    salaryMin: 9,
    salaryMax: 14,
    salary: "₹9L – ₹14L per annum",
  },
  "job-004": {
    city: "Mumbai",
    location: "Mumbai, Maharashtra",
    experience: "junior",
    workMode: "onsite",
    industry: "Banking",
    skills: ["Excel", "Financial Modeling", "SQL"],
    noticePeriod: "2-months",
    companyRating: 4.3,
    applicantCount: 178,
    salaryMin: 8,
    salaryMax: 12,
    salary: "₹8L – ₹12L per annum",
  },
  "job-005": {
    city: "Chennai",
    location: "Chennai, Tamil Nadu",
    experience: "mid",
    workMode: "onsite",
    industry: "Healthcare",
    skills: ["Patient Care", "ICU", "BLS"],
    noticePeriod: "1-month",
    companyRating: 4.1,
    applicantCount: 94,
    salaryMin: 5,
    salaryMax: 8,
    salary: "₹5L – ₹8L per annum",
  },
  "job-006": {
    city: "Remote",
    location: "Remote",
    experience: "senior",
    workMode: "remote",
    industry: "IT",
    skills: ["Kubernetes", "Terraform", "AWS", "Python"],
    noticePeriod: "2-months",
    companyRating: 4.6,
    applicantCount: 412,
    salaryMin: 22,
    salaryMax: 35,
    salary: "₹22L – ₹35L per annum",
    type: "full-time",
  },
  "job-007": {
    city: "Hyderabad",
    location: "Hyderabad, Telangana",
    experience: "mid",
    workMode: "hybrid",
    industry: "IT",
    skills: ["React", "Next.js", "TypeScript"],
    noticePeriod: "1-month",
    companyRating: 4.5,
    applicantCount: 298,
    salaryMin: 14,
    salaryMax: 22,
    salary: "₹14L – ₹22L per annum",
  },
  "job-008": {
    city: "Remote",
    location: "Remote",
    experience: "mid",
    workMode: "remote",
    industry: "Startup",
    skills: ["User Research", "Figma", "Analytics"],
    noticePeriod: "15-days",
    companyRating: 4.2,
    applicantCount: 156,
    salaryMin: 12,
    salaryMax: 18,
    salary: "₹12L – ₹18L per annum",
    type: "full-time",
  },
  "job-009": {
    city: "Pune",
    location: "Pune, Maharashtra",
    experience: "junior",
    workMode: "hybrid",
    industry: "Startup",
    skills: ["Content Writing", "SEO", "CMS"],
    noticePeriod: "immediate",
    companyRating: 3.9,
    applicantCount: 203,
    salaryMin: 5,
    salaryMax: 8,
    salary: "₹5L – ₹8L per annum",
  },
  "job-010": {
    city: "Mumbai",
    location: "Mumbai, Maharashtra",
    experience: "senior",
    workMode: "onsite",
    industry: "Banking",
    skills: ["M&A", "Financial Modeling", "Excel"],
    noticePeriod: "3-months",
    companyRating: 4.4,
    applicantCount: 521,
    salaryMin: 25,
    salaryMax: 40,
    salary: "₹25L – ₹40L per annum",
  },
  "job-011": {
    city: "Bangalore",
    location: "Bangalore, Karnataka",
    experience: "mid",
    workMode: "onsite",
    industry: "Healthcare",
    skills: ["Physiotherapy", "Rehabilitation"],
    noticePeriod: "1-month",
    companyRating: 4.0,
    applicantCount: 67,
    salaryMin: 6,
    salaryMax: 9,
    salary: "₹6L – ₹9L per annum",
    type: "part-time",
  },
  "job-012": {
    city: "Remote",
    location: "Remote",
    experience: "mid",
    workMode: "remote",
    industry: "IT",
    skills: ["SaaS", "Customer Success", "CRM"],
    noticePeriod: "1-month",
    companyRating: 4.3,
    applicantCount: 234,
    salaryMin: 10,
    salaryMax: 16,
    salary: "₹10L – ₹16L per annum",
    type: "full-time",
  },
  "job-013": {
    city: "Bangalore",
    location: "Bangalore, Karnataka",
    experience: "lead",
    workMode: "hybrid",
    industry: "IT",
    skills: ["Python", "PyTorch", "MLOps", "AWS"],
    noticePeriod: "2-months",
    companyRating: 4.7,
    applicantCount: 489,
    salaryMin: 30,
    salaryMax: 50,
    salary: "₹30L – ₹50L per annum",
  },
  "job-014": {
    city: "Mumbai",
    location: "Mumbai, Maharashtra",
    experience: "mid",
    workMode: "hybrid",
    industry: "Consulting",
    skills: ["Figma", "Branding", "Adobe CC"],
    noticePeriod: "15-days",
    companyRating: 4.1,
    applicantCount: 145,
    salaryMin: 8,
    salaryMax: 12,
    salary: "₹8L – ₹12L per annum",
    type: "contract",
  },
  "job-015": {
    city: "Remote",
    location: "Remote",
    experience: "junior",
    workMode: "remote",
    industry: "E-Commerce",
    skills: ["SEO", "Ahrefs", "Content Strategy"],
    noticePeriod: "immediate",
    companyRating: 3.8,
    applicantCount: 312,
    salaryMin: 6,
    salaryMax: 10,
    salary: "₹6L – ₹10L per annum",
    type: "freelance",
  },
  "job-016": {
    city: "Chennai",
    location: "Chennai, Tamil Nadu",
    experience: "fresher",
    workMode: "onsite",
    industry: "Consulting",
    skills: ["Accounting", "QuickBooks", "Tally"],
    noticePeriod: "immediate",
    companyRating: 3.9,
    applicantCount: 428,
    salaryMin: 4,
    salaryMax: 6,
    salary: "₹4L – ₹6L per annum",
  },
  "job-017": {
    city: "Hyderabad",
    location: "Hyderabad, Telangana",
    experience: "fresher",
    workMode: "onsite",
    industry: "Healthcare",
    skills: ["EHR", "Patient Care"],
    noticePeriod: "immediate",
    companyRating: 4.0,
    applicantCount: 156,
    salaryMin: 3,
    salaryMax: 5,
    salary: "₹3L – ₹5L per annum",
  },
  "job-018": {
    city: "Remote",
    location: "Remote",
    experience: "senior",
    workMode: "remote",
    industry: "IT",
    skills: ["Python", "Go", "Microservices", "AWS"],
    noticePeriod: "2-months",
    companyRating: 4.6,
    applicantCount: 367,
    salaryMin: 20,
    salaryMax: 32,
    salary: "₹20L – ₹32L per annum",
    type: "full-time",
  },
  "job-019": {
    city: "Bangalore",
    location: "Bangalore, Karnataka",
    experience: "senior",
    workMode: "hybrid",
    industry: "IT",
    skills: ["Spark", "Airflow", "SQL", "Python"],
    noticePeriod: "2-months",
    companyRating: 4.5,
    applicantCount: 278,
    salaryMin: 18,
    salaryMax: 28,
    salary: "₹18L – ₹28L per annum",
  },
  "job-020": {
    city: "Remote",
    location: "Remote",
    experience: "junior",
    workMode: "remote",
    industry: "Startup",
    skills: ["Social Media", "Canva", "Analytics"],
    noticePeriod: "15-days",
    companyRating: 3.7,
    applicantCount: 189,
    salaryMin: 4,
    salaryMax: 7,
    salary: "₹4L – ₹7L per annum",
    type: "part-time",
  },
  "job-021": {
    city: "Noida",
    location: "Noida, Uttar Pradesh",
    experience: "mid",
    workMode: "hybrid",
    industry: "IT",
    skills: ["Cybersecurity", "SIEM", "Python"],
    noticePeriod: "1-month",
    companyRating: 4.2,
    applicantCount: 198,
    salaryMin: 12,
    salaryMax: 20,
    salary: "₹12L – ₹20L per annum",
  },
  "job-022": {
    city: "Remote",
    location: "Remote",
    experience: "junior",
    workMode: "remote",
    industry: "Startup",
    skills: ["Photoshop", "Illustrator", "Figma"],
    noticePeriod: "immediate",
    companyRating: 3.9,
    applicantCount: 267,
    salaryMin: 5,
    salaryMax: 8,
    salary: "₹5L – ₹8L per annum",
    type: "freelance",
  },
  "job-023": {
    city: "Gurgaon",
    location: "Gurgaon, Haryana",
    experience: "senior",
    workMode: "onsite",
    industry: "Healthcare",
    skills: ["Operations", "HIPAA", "Leadership"],
    noticePeriod: "2-months",
    companyRating: 4.1,
    applicantCount: 88,
    salaryMin: 10,
    salaryMax: 15,
    salary: "₹10L – ₹15L per annum",
  },
  "job-024": {
    city: "Remote",
    location: "Remote",
    experience: "mid",
    workMode: "remote",
    industry: "IT",
    skills: ["Technical Writing", "API Docs", "Markdown"],
    noticePeriod: "1-month",
    companyRating: 4.4,
    applicantCount: 142,
    salaryMin: 9,
    salaryMax: 14,
    salary: "₹9L – ₹14L per annum",
    type: "full-time",
  },
};

function mapLegacyType(type: JobType | "remote"): {
  type: JobType;
  workMode: Job["workMode"];
} {
  if (type === "remote") {
    return { type: "full-time", workMode: "remote" };
  }
  return { type, workMode: "hybrid" };
}

function usdToLpa(usd: number): number {
  return Math.max(3, Math.round((usd / 100000) * 12 * 10) / 10);
}

export function enrichJob(raw: RawJob): Job {
  const preset = presets[raw.id] ?? {};
  const legacy = mapLegacyType(raw.type as JobType | "remote");
  const salaryMin = preset.salaryMin ?? usdToLpa(raw.salaryMin);
  const salaryMax = preset.salaryMax ?? usdToLpa(raw.salaryMax);

  const recentIds = ["job-001", "job-007"];
  const datePosted = recentIds.includes(raw.id)
    ? new Date().toISOString().split("T")[0]
    : raw.postedDate;

  return {
    ...raw,
    type: preset.type ?? legacy.type,
    postedDate: datePosted,
    datePosted,
    city: preset.city ?? "Bangalore",
    location: preset.location ?? raw.location,
    salary:
      preset.salary ?? `₹${salaryMin}L – ₹${salaryMax}L per annum`,
    salaryMin,
    salaryMax,
    experience: preset.experience ?? "mid",
    workMode: preset.workMode ?? legacy.workMode,
    industry: preset.industry ?? "IT",
    skills: preset.skills ?? ["Communication"],
    noticePeriod: preset.noticePeriod ?? "1-month",
    companyRating: preset.companyRating ?? 4.0,
    applicantCount: preset.applicantCount ?? 120,
  };
}
