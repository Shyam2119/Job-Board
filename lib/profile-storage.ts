import type { UserProfile } from "@/types/profile";

const PROFILE_KEY = "talentflow-user-profile";

export const defaultProfile: UserProfile = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  linkedin: "",
  portfolio: "",
  headline: "",
  about: "",
  experiences: [],
  education: [],
  skills: [],
  resumeFileName: "",
  resumeSize: "",
  resumeUploadedAt: "",
  certifications: [],
  preferences: {
    preferredTitle: "",
    locations: [],
    salaryMin: "",
    salaryMax: "",
    workModes: [],
    jobTypes: [],
    noticePeriod: "",
    openToRelocation: false,
  },
};

export function getProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("profile-updated"));
}

export function calculateProfileCompletion(profile: UserProfile): number {
  const checks = [
    !!profile.fullName,
    !!profile.email,
    !!profile.phone,
    !!profile.city,
    !!profile.headline,
    !!profile.about,
    profile.experiences.length > 0,
    profile.education.length > 0,
    profile.skills.length >= 3,
    !!profile.resumeFileName,
    !!profile.preferences.preferredTitle,
    profile.preferences.locations.length > 0,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "TF"
  );
}
