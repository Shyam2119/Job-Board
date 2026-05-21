"use client";

import { useCallback, useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  Settings,
  Plus,
  Trash2,
  Download,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FILTER_CITIES } from "@/data/filter-constants";
import {
  calculateProfileCompletion,
  getInitials,
  getProfile,
  saveProfile,
} from "@/lib/profile-storage";
import type {
  Certification,
  Education,
  SkillProficiency,
  UserProfile,
  WorkExperience,
} from "@/types/profile";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "resume", label: "Resume & Docs", icon: FileText },
  { id: "preferences", label: "Job Preferences", icon: Settings },
] as const;

const PREDEFINED_SKILLS = [
  "React", "Node.js", "Python", "Java", "TypeScript", "AWS", "SQL",
  "Figma", "Flutter", "Next.js", "Docker", "Kubernetes", "MongoDB",
  "PostgreSQL", "Communication", "Leadership",
];

const PROFICIENCY_COLORS: Record<SkillProficiency, string> = {
  beginner: "border-slate-500/40 bg-slate-500/15 text-slate-600 dark:text-slate-300",
  intermediate: "border-blue-500/40 bg-blue-500/15 text-blue-600 dark:text-blue-400",
  expert: "border-accent/40 bg-accent/15 text-accent",
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(() => getProfile());
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("personal");
  const [skillSearch, setSkillSearch] = useState("");
  const [showExpForm, setShowExpForm] = useState(false);
  const [showEduForm, setShowEduForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);

  const persist = useCallback((next: UserProfile) => {
    setProfile(next);
    saveProfile(next);
  }, []);

  const completion = calculateProfileCompletion(profile);

  const savePersonal = () => {
    persist(profile);
    toast.success("Personal info saved");
  };

  const savePreferences = () => {
    persist(profile);
    toast.success("Job preferences saved");
  };

  return (
    <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
        My Profile
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-72">
          <Card className="lg:sticky lg:top-24">
            <CardContent className="p-6 text-center">
              <label className="group relative mx-auto mb-4 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-accent/20 text-2xl font-bold text-accent transition-colors hover:bg-accent/30">
                {getInitials(profile.fullName)}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={() =>
                    toast.info("Photo upload is mocked in this demo")
                  }
                />
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Upload
                </span>
              </label>
              <h2 className="font-semibold">
                {profile.fullName || "Your Name"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.headline || "Add a professional headline"}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {profile.city || "City"} · {profile.email || "email"}
              </p>
              {profile.phone && (
                <p className="text-xs text-muted-foreground">{profile.phone}</p>
              )}
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span>Profile completion</span>
                  <span className="font-medium text-accent">{completion}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => toast.info("Resume download mocked")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              {(profile.linkedin || profile.portfolio) && (
                <div className="mt-3 flex justify-center gap-3 text-xs">
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline"
                    >
                      <LinkIcon className="h-3 w-3" /> LinkedIn
                    </a>
                  )}
                  {profile.portfolio && (
                    <a
                      href={profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline"
                    >
                      <LinkIcon className="h-3 w-3" /> Portfolio
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border pb-px">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                  tab === t.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {tab === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({ ...profile, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={profile.city}
                      onChange={(e) =>
                        setProfile({ ...profile, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>LinkedIn URL</Label>
                    <Input
                      value={profile.linkedin}
                      onChange={(e) =>
                        setProfile({ ...profile, linkedin: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Portfolio / GitHub URL</Label>
                    <Input
                      value={profile.portfolio}
                      onChange={(e) =>
                        setProfile({ ...profile, portfolio: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Professional Headline</Label>
                  <Input
                    value={profile.headline}
                    onChange={(e) =>
                      setProfile({ ...profile, headline: e.target.value })
                    }
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>About Me</Label>
                  <Textarea
                    rows={5}
                    value={profile.about}
                    onChange={(e) =>
                      setProfile({ ...profile, about: e.target.value })
                    }
                  />
                </div>
                <Button onClick={savePersonal}>Save</Button>
              </CardContent>
            </Card>
          )}

          {tab === "experience" && (
            <ExperienceTab
              profile={profile}
              persist={persist}
              showForm={showExpForm}
              setShowForm={setShowExpForm}
            />
          )}

          {tab === "education" && (
            <EducationTab
              profile={profile}
              persist={persist}
              showForm={showEduForm}
              setShowForm={setShowEduForm}
            />
          )}

          {tab === "skills" && (
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_SKILLS.filter((s) =>
                    s.toLowerCase().includes(skillSearch.toLowerCase())
                  ).map((skill) => {
                    const exists = profile.skills.find(
                      (sk) => sk.name.toLowerCase() === skill.toLowerCase()
                    );
                    return (
                      <Button
                        key={skill}
                        type="button"
                        size="sm"
                        variant={exists ? "secondary" : "outline"}
                        disabled={!!exists}
                        onClick={() =>
                          persist({
                            ...profile,
                            skills: [
                              ...profile.skills,
                              {
                                name: skill,
                                proficiency: "intermediate",
                              },
                            ],
                          })
                        }
                      >
                        + {skill}
                      </Button>
                    );
                  })}
                </div>
                {(["beginner", "intermediate", "expert"] as SkillProficiency[]).map(
                  (level) => {
                    const group = profile.skills.filter(
                      (s) => s.proficiency === level
                    );
                    if (group.length === 0) return null;
                    return (
                      <div key={level}>
                        <p className="mb-2 text-sm font-medium capitalize">
                          {level}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.map((sk) => (
                            <Badge
                              key={sk.name}
                              variant="outline"
                              className={cn(
                                "gap-2 pr-1 capitalize",
                                PROFICIENCY_COLORS[sk.proficiency]
                              )}
                            >
                              <select
                                className="bg-transparent text-xs outline-none"
                                value={sk.proficiency}
                                onChange={(e) =>
                                  persist({
                                    ...profile,
                                    skills: profile.skills.map((s) =>
                                      s.name === sk.name
                                        ? {
                                            ...s,
                                            proficiency: e.target
                                              .value as SkillProficiency,
                                          }
                                        : s
                                    ),
                                  })
                                }
                              >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="expert">Expert</option>
                              </select>
                              {sk.name}
                              <button
                                type="button"
                                onClick={() =>
                                  persist({
                                    ...profile,
                                    skills: profile.skills.filter(
                                      (s) => s.name !== sk.name
                                    ),
                                  })
                                }
                                className="ml-1 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </CardContent>
            </Card>
          )}

          {tab === "resume" && (
            <ResumeTab
              profile={profile}
              persist={persist}
              showCertForm={showCertForm}
              setShowCertForm={setShowCertForm}
            />
          )}

          {tab === "preferences" && (
            <PreferencesTab
              profile={profile}
              setProfile={setProfile}
              onSave={savePreferences}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ExperienceTab({
  profile,
  persist,
  showForm,
  setShowForm,
}: {
  profile: UserProfile;
  persist: (p: UserProfile) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
}) {
  const empty: WorkExperience = {
    id: uid(),
    jobTitle: "",
    company: "",
    location: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: false,
    description: "",
  };
  const [form, setForm] = useState<WorkExperience>(empty);

  const save = () => {
    if (!form.jobTitle || !form.company) {
      toast.error("Title and company are required");
      return;
    }
    persist({
      ...profile,
      experiences: [...profile.experiences, form],
    });
    setForm({ ...empty, id: uid() });
    setShowForm(false);
    toast.success("Experience added");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-1 h-4 w-4" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Job Title"
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              />
              <Input
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <Input
                placeholder="Location"
                className="sm:col-span-2"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <Input
                placeholder="Start Month"
                value={form.startMonth}
                onChange={(e) =>
                  setForm({ ...form, startMonth: e.target.value })
                }
              />
              <Input
                placeholder="Start Year"
                value={form.startYear}
                onChange={(e) =>
                  setForm({ ...form, startYear: e.target.value })
                }
              />
              {!form.current && (
                <>
                  <Input
                    placeholder="End Month"
                    value={form.endMonth}
                    onChange={(e) =>
                      setForm({ ...form, endMonth: e.target.value })
                    }
                  />
                  <Input
                    placeholder="End Year"
                    value={form.endYear}
                    onChange={(e) =>
                      setForm({ ...form, endYear: e.target.value })
                    }
                  />
                </>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Switch
                checked={form.current}
                onCheckedChange={(c) => setForm({ ...form, current: c })}
              />
              Currently working here
            </label>
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <Button onClick={save}>Save Experience</Button>
          </div>
        )}
        {profile.experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between gap-4 rounded-lg border border-border p-4"
          >
            <div>
              <h4 className="font-semibold">{exp.jobTitle}</h4>
              <p className="text-sm text-muted-foreground">
                {exp.company} · {exp.location}
              </p>
              <p className="text-xs text-muted-foreground">
                {exp.startMonth} {exp.startYear} –{" "}
                {exp.current ? "Present" : `${exp.endMonth} ${exp.endYear}`}
              </p>
              {exp.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {exp.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                persist({
                  ...profile,
                  experiences: profile.experiences.filter((e) => e.id !== exp.id),
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function EducationTab({
  profile,
  persist,
  showForm,
  setShowForm,
}: {
  profile: UserProfile;
  persist: (p: UserProfile) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
}) {
  const empty: Education = {
    id: uid(),
    institute: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
    grade: "",
  };
  const [form, setForm] = useState<Education>(empty);

  const save = () => {
    if (!form.institute || !form.degree) {
      toast.error("Institute and degree are required");
      return;
    }
    persist({ ...profile, education: [...profile.education, form] });
    setForm({ ...empty, id: uid() });
    setShowForm(false);
    toast.success("Education added");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-1 h-4 w-4" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <Input
              placeholder="Institute Name"
              value={form.institute}
              onChange={(e) => setForm({ ...form, institute: e.target.value })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Degree"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
              <Input
                placeholder="Field of Study"
                value={form.field}
                onChange={(e) => setForm({ ...form, field: e.target.value })}
              />
              <Input
                placeholder="Start Year"
                value={form.startYear}
                onChange={(e) =>
                  setForm({ ...form, startYear: e.target.value })
                }
              />
              <Input
                placeholder="End Year"
                value={form.endYear}
                onChange={(e) => setForm({ ...form, endYear: e.target.value })}
              />
              <Input
                placeholder="Grade / CGPA"
                className="sm:col-span-2"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              />
            </div>
            <Button onClick={save}>Save Education</Button>
          </div>
        )}
        {profile.education.map((edu) => (
          <div
            key={edu.id}
            className="flex justify-between rounded-lg border border-border p-4"
          >
            <div>
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-sm text-muted-foreground">{edu.institute}</p>
              <p className="text-xs text-muted-foreground">
                {edu.field} · {edu.startYear}–{edu.endYear}
                {edu.grade && ` · ${edu.grade}`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                persist({
                  ...profile,
                  education: profile.education.filter((e) => e.id !== edu.id),
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ResumeTab({
  profile,
  persist,
  showCertForm,
  setShowCertForm,
}: {
  profile: UserProfile;
  persist: (p: UserProfile) => void;
  showCertForm: boolean;
  setShowCertForm: (v: boolean) => void;
}) {
  const empty: Certification = {
    id: uid(),
    name: "",
    org: "",
    date: "",
    url: "",
  };
  const [certForm, setCertForm] = useState<Certification>(empty);

  const onResume = (file: File | undefined) => {
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    persist({
      ...profile,
      resumeFileName: file.name,
      resumeSize: `${(file.size / 1024).toFixed(1)} KB`,
      resumeUploadedAt: new Date().toLocaleDateString(),
    });
    toast.success("Resume uploaded");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <label
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 transition-colors hover:border-accent/50 hover:bg-muted/40"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onResume(e.dataTransfer.files[0]);
            }}
          >
            <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">Drag & drop PDF resume</p>
            <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
            <input
              type="file"
              accept=".pdf"
              className="sr-only"
              onChange={(e) => onResume(e.target.files?.[0])}
            />
          </label>
          {profile.resumeFileName && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">{profile.resumeFileName}</p>
                <p className="text-xs text-muted-foreground">
                  {profile.resumeSize} · Uploaded {profile.resumeUploadedAt}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  document.getElementById("replace-resume")?.click()
                }
              >
                Replace Resume
              </Button>
              <input
                id="replace-resume"
                type="file"
                accept=".pdf"
                className="sr-only"
                onChange={(e) => onResume(e.target.files?.[0])}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certifications</CardTitle>
          <Button size="sm" onClick={() => setShowCertForm(!showCertForm)}>
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showCertForm && (
            <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2">
              <Input
                placeholder="Name"
                value={certForm.name}
                onChange={(e) =>
                  setCertForm({ ...certForm, name: e.target.value })
                }
              />
              <Input
                placeholder="Issuing Org"
                value={certForm.org}
                onChange={(e) =>
                  setCertForm({ ...certForm, org: e.target.value })
                }
              />
              <Input
                type="date"
                value={certForm.date}
                onChange={(e) =>
                  setCertForm({ ...certForm, date: e.target.value })
                }
              />
              <Input
                placeholder="Certificate URL"
                value={certForm.url}
                onChange={(e) =>
                  setCertForm({ ...certForm, url: e.target.value })
                }
              />
              <Button
                className="sm:col-span-2"
                onClick={() => {
                  if (!certForm.name) {
                    toast.error("Name required");
                    return;
                  }
                  persist({
                    ...profile,
                    certifications: [...profile.certifications, certForm],
                  });
                  setCertForm({ ...empty, id: uid() });
                  setShowCertForm(false);
                }}
              >
                Save Certification
              </Button>
            </div>
          )}
          {profile.certifications.map((c) => (
            <div
              key={c.id}
              className="flex justify-between rounded-lg border border-border p-4"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-muted-foreground">
                  {c.org} · {c.date}
                </p>
                {c.url && (
                  <a
                    href={c.url}
                    className="text-xs text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View certificate
                  </a>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  persist({
                    ...profile,
                    certifications: profile.certifications.filter(
                      (x) => x.id !== c.id
                    ),
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PreferencesTab({
  profile,
  setProfile,
  onSave,
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  onSave: () => void;
}) {
  const prefs = profile.preferences;

  const toggleChip = <T extends string>(
    arr: T[],
    val: T,
    key: keyof typeof prefs
  ) => {
    const next = arr.includes(val)
      ? arr.filter((x) => x !== val)
      : [...arr, val];
    setProfile({
      ...profile,
      preferences: { ...prefs, [key]: next },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Preferred Job Title</Label>
          <Input
            value={prefs.preferredTitle}
            onChange={(e) =>
              setProfile({
                ...profile,
                preferences: { ...prefs, preferredTitle: e.target.value },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Preferred Locations</Label>
          <div className="flex flex-wrap gap-2">
            {FILTER_CITIES.map((city) => {
              const active = prefs.locations.includes(city);
              return (
                <Badge
                  key={city}
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() =>
                    toggleChip(prefs.locations, city, "locations")
                  }
                >
                  {city}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Expected Salary Min (₹ LPA)</Label>
            <Input
              type="number"
              value={prefs.salaryMin}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferences: { ...prefs, salaryMin: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Expected Salary Max (₹ LPA)</Label>
            <Input
              type="number"
              value={prefs.salaryMax}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferences: { ...prefs, salaryMax: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Work Mode</Label>
          <div className="flex flex-wrap gap-2">
            {(["remote", "hybrid", "onsite"] as const).map((m) => (
              <Badge
                key={m}
                variant={prefs.workModes.includes(m) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => toggleChip(prefs.workModes, m, "workModes")}
              >
                {m === "onsite" ? "On-site" : m}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Job Type</Label>
          <div className="flex flex-wrap gap-2">
            {(["full-time", "part-time", "contract"] as const).map((t) => (
              <Badge
                key={t}
                variant={prefs.jobTypes.includes(t) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => toggleChip(prefs.jobTypes, t, "jobTypes")}
              >
                {t.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Notice Period</Label>
          <select
            className="flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground"
            value={prefs.noticePeriod}
            onChange={(e) =>
              setProfile({
                ...profile,
                preferences: { ...prefs, noticePeriod: e.target.value },
              })
            }
          >
            <option value="">Select</option>
            <option value="immediate">Immediate</option>
            <option value="15-days">15 Days</option>
            <option value="1-month">1 Month</option>
            <option value="2-months">2 Months</option>
            <option value="3-months">3 Months</option>
          </select>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <Label htmlFor="relocation">Open to Relocation</Label>
          <Switch
            id="relocation"
            checked={prefs.openToRelocation}
            onCheckedChange={(c) =>
              setProfile({
                ...profile,
                preferences: { ...prefs, openToRelocation: c },
              })
            }
          />
        </div>
        <Button onClick={onSave}>Save Preferences</Button>
      </CardContent>
    </Card>
  );
}
