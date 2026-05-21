export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance";

export type JobCategory =
  | "Tech"
  | "Design"
  | "Marketing"
  | "Finance"
  | "Healthcare"
  | "Remote";

export type ExperienceLevel =
  | "fresher"
  | "junior"
  | "mid"
  | "senior"
  | "lead";

export type WorkMode = "onsite" | "remote" | "hybrid";

export type Industry =
  | "IT"
  | "Banking"
  | "Healthcare"
  | "E-Commerce"
  | "Education"
  | "Startup"
  | "Consulting"
  | "Manufacturing";

export type NoticePeriod =
  | "immediate"
  | "15-days"
  | "1-month"
  | "2-months"
  | "3-months";

export type DatePostedFilter = "any" | "24h" | "3d" | "7d" | "30d";

export type SortOption = "relevant" | "newest" | "salary" | "applied";

export interface Job {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  logo: string;
  location: string;
  city: string;
  salary: string;
  /** Salary in LPA (lakhs per annum) */
  salaryMin: number;
  salaryMax: number;
  type: JobType;
  description: string;
  requirements: string[];
  postedDate: string;
  datePosted: string;
  category: JobCategory;
  featured: boolean;
  experience: ExperienceLevel;
  workMode: WorkMode;
  industry: Industry;
  skills: string[];
  noticePeriod: NoticePeriod;
  companyRating: number;
  applicantCount: number;
}

export interface JobFilters {
  query?: string;
  location?: string;
  type?: JobType | "";
  types?: JobType[];
  category?: JobCategory | "";
  categories?: JobCategory[];
  /** Salary filter in LPA */
  salaryMin?: number;
  salaryMax?: number;
  datePosted?: DatePostedFilter;
  experience?: ExperienceLevel[];
  workModes?: WorkMode[];
  industries?: Industry[];
  skills?: string[];
  noticePeriod?: NoticePeriod | "";
  minRating?: number;
}

export interface PostedJobForm {
  title: string;
  company: string;
  location: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  type: JobType;
  category: JobCategory;
  description: string;
  requirements: string;
}
