export type SkillProficiency = "beginner" | "intermediate" | "expert";

export interface ProfileSkill {
  name: string;
  proficiency: SkillProficiency;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institute: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
}

export interface Certification {
  id: string;
  name: string;
  org: string;
  date: string;
  url: string;
}

export interface JobPreferences {
  preferredTitle: string;
  locations: string[];
  salaryMin: string;
  salaryMax: string;
  workModes: ("remote" | "hybrid" | "onsite")[];
  jobTypes: ("full-time" | "part-time" | "contract")[];
  noticePeriod: string;
  openToRelocation: boolean;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  portfolio: string;
  headline: string;
  about: string;
  experiences: WorkExperience[];
  education: Education[];
  skills: ProfileSkill[];
  resumeFileName: string;
  resumeSize: string;
  resumeUploadedAt: string;
  certifications: Certification[];
  preferences: JobPreferences;
}
