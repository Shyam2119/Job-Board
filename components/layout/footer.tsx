import Link from "next/link";
import { Briefcase } from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/layout/social-icons";
import { cn } from "@/lib/utils";

const exploreLinks = [
  { href: "/jobs", label: "All Jobs" },
  { href: "/jobs?category=Tech", label: "Tech Jobs" },
  { href: "/jobs?location=Remote", label: "Remote Jobs" },
  { href: "/saved", label: "Saved Jobs" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const employerLinks = [
  { href: "/post-job", label: "Post a Job" },
  { href: "/jobs", label: "Browse Talent" },
];

const socialLinks = [
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: TwitterIcon,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: GitHubIcon,
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                <Briefcase className="h-5 w-5" />
              </span>
              TalentFlow
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Find your next career move. Browse thousands of jobs from top
              companies across every industry.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border border-navy-light bg-navy-light/50 text-slate-400 transition-all",
                    "hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Employers
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {employerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-navy-light pt-8 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} TalentFlow. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
