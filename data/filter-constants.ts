import type {
  DatePostedFilter,
  ExperienceLevel,
  Industry,
  JobType,
  NoticePeriod,
  WorkMode,
} from "@/types/job";

export const FILTER_CITIES = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Pune",
  "Noida",
  "Gurgaon",
  "Kolkata",
  "Remote",
] as const;

export const DATE_POSTED_OPTIONS: { value: DatePostedFilter; label: string }[] =
  [
    { value: "any", label: "Any Time" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "3d", label: "Last 3 Days" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];

export const EXPERIENCE_OPTIONS: {
  value: ExperienceLevel;
  label: string;
}[] = [
  { value: "fresher", label: "Fresher (0-1 yrs)" },
  { value: "junior", label: "Junior (1-3 yrs)" },
  { value: "mid", label: "Mid Level (3-5 yrs)" },
  { value: "senior", label: "Senior (5-8 yrs)" },
  { value: "lead", label: "Lead (8+ yrs)" },
];

export const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
];

export const WORK_MODE_OPTIONS: { value: WorkMode; label: string }[] = [
  { value: "onsite", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

export const INDUSTRY_OPTIONS: { value: Industry; label: string }[] = [
  { value: "IT", label: "IT" },
  { value: "Banking", label: "Banking" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Education", label: "Education" },
  { value: "Startup", label: "Startup" },
  { value: "Consulting", label: "Consulting" },
  { value: "Manufacturing", label: "Manufacturing" },
];

export const NOTICE_PERIOD_OPTIONS: {
  value: NoticePeriod;
  label: string;
}[] = [
  { value: "immediate", label: "Immediate" },
  { value: "15-days", label: "15 Days" },
  { value: "1-month", label: "1 Month" },
  { value: "2-months", label: "2 Months" },
  { value: "3-months", label: "3 Months" },
];

export const SKILL_SUGGESTIONS = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "SQL",
  "Figma",
  "Flutter",
];

export const RATING_FILTER_OPTIONS = [
  { value: 3, label: "3★+" },
  { value: 4, label: "4★+" },
  { value: 4.5, label: "4.5★+" },
];

export const SORT_OPTIONS = [
  { value: "relevant", label: "Most Relevant" },
  { value: "newest", label: "Newest First" },
  { value: "salary", label: "Highest Salary" },
  { value: "applied", label: "Most Applied" },
] as const;

export const SALARY_LPA_RANGE = { min: 0, max: 50 };
