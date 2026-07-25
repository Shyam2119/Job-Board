// components/home/how-it-works.tsx
// "How It Works" section — 3-step visual guide

import { Search, FileText, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse 30+ curated job listings across Tech, Design, Finance, Healthcare, and more. Use our advanced filters to zero in on exactly what you're looking for.",
    color: "bg-accent/10 text-accent",
    border: "border-accent/30",
  },
  {
    step: "02",
    icon: FileText,
    title: "Apply in Minutes",
    description:
      "Submit your application directly on TalentFlow — no external redirects. Upload your resume, write a cover letter, and hit send in under 5 minutes.",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Get Hired",
    description:
      "Our recruiter dashboard helps companies track and review applicants. Top candidates get responses faster — average time-to-offer is under 2 weeks.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>
          <p className="mt-2 text-muted-foreground">
            From search to offer — your next career move starts here.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map(({ step, icon: Icon, title, description, color, border }) => (
              <div
                key={step}
                className={`group relative rounded-2xl border ${border} bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                {/* Step badge */}
                <div className="mb-6 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-border group-hover:text-accent/20 transition-colors">
                    {step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
