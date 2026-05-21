# TalentFlow — Job Board: Full Feature Documentation

**Repository:** [github.com/Shyam2119/Job-Board](https://github.com/Shyam2119/Job-Board)
**Live Demo:** [https://job-board-jet-delta.vercel.app](https://job-board-jet-delta.vercel.app)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Features](#4-features)
   - 4.1 [Home Page](#41-home-page)
   - 4.2 [Job Listings & Search](#42-job-listings--search)
   - 4.3 [Advanced Filter Sidebar](#43-advanced-filter-sidebar)
   - 4.4 [Job Detail Page](#44-job-detail-page)
   - 4.5 [Job Application Modal](#45-job-application-modal)
   - 4.6 [Bookmark / Saved Jobs](#46-bookmark--saved-jobs)
   - 4.7 [Recently Viewed Jobs](#47-recently-viewed-jobs)
   - 4.8 [Post a Job](#48-post-a-job)
   - 4.9 [Company Directory & Profiles](#49-company-directory--profiles)
   - 4.10 [Job Seeker Profile](#410-job-seeker-profile)
   - 4.11 [Dark / Light Theme Toggle](#411-dark--light-theme-toggle)
   - 4.12 [SEO & Metadata](#412-seo--metadata)
   - 4.13 [Responsive & Mobile UX](#413-responsive--mobile-ux)
   - 4.14 [Static Pages](#414-static-pages)
5. [Data Model](#5-data-model)
6. [CI/CD Pipeline](#6-cicd-pipeline)
7. [Environment Variables](#7-environment-variables)
8. [Getting Started Locally](#8-getting-started-locally)
9. [Deployment](#9-deployment)

---

## 1. Project Overview

**TalentFlow** is a premium, production-ready job board platform designed to connect developers, designers, and other tech professionals with industry-leading companies. It is built with a focus on visual excellence, fluid responsiveness, and an intuitive user experience.

The application is fully client-side (no backend database) and leverages `localStorage` for persistence of user-generated data such as saved jobs, recently viewed jobs, posted listings, and the user's profile.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server & Client Components) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (HSL CSS variables design tokens) |
| UI Primitives | Radix UI (Dialog, Select, Checkbox, Slider, Dropdown, Label) |
| Icons | Lucide React |
| Theme | next-themes (Dark / Light mode) |
| Notifications | Sonner (toast notifications) |
| Fonts | Geist Sans & Geist Mono (via `next/font/google`) |
| Persistence | Browser `localStorage` |
| Linting | ESLint + `eslint-config-next` |
| CI/CD | GitHub Actions |
| Hosting | Vercel |

---

## 3. Project Structure

```
job-board/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout (Header, Footer, Providers)
│   ├── jobs/
│   │   ├── page.tsx            # Job listings / browse page
│   │   └── [id]/page.tsx       # Individual job detail page
│   ├── companies/
│   │   └── [slug]/page.tsx     # Company profile page
│   ├── saved/page.tsx          # Saved (bookmarked) jobs
│   ├── post-job/page.tsx       # Post a new job listing
│   ├── profile/page.tsx        # Job seeker profile
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── home/                   # Hero, Stats, Companies Carousel, Alerts Banner
│   ├── jobs/                   # Job card, filters, detail view, modals, forms
│   ├── companies/              # Company profile component
│   ├── layout/                 # Header, Footer, Back-to-Top, Theme Toggle
│   ├── profile/                # Full profile page component
│   ├── providers/              # ThemeProvider wrapper
│   └── ui/                     # Base UI components (Button, Input, Badge, etc.)
├── data/
│   ├── jobs.ts                 # Static seed job data (25+ listings)
│   ├── enrich-jobs.ts          # Derived fields & data enrichment
│   └── filter-constants.ts     # All filter option enums
├── hooks/
│   ├── use-client-jobs.ts      # Merges seed + localStorage jobs
│   ├── use-debounce.ts         # Input debounce hook
│   ├── use-mounted.ts          # Hydration-safe mount detection
│   └── use-profile.ts          # Profile read/write hook
├── lib/
│   ├── jobs.ts                 # Job data access & company extraction helpers
│   ├── browse-filters.ts       # Client-side filtering & sorting logic
│   ├── parse-url-filters.ts    # URL search-param → filter object parsing
│   ├── metadata.ts             # SEO metadata factory
│   ├── profile-storage.ts      # localStorage profile persistence
│   ├── validate-post-job.ts    # Post-job form validation
│   └── utils.ts                # Shared utilities (cn, etc.)
├── types/
│   ├── job.ts                  # Job, JobFilters, PostedJobForm types
│   └── profile.ts              # UserProfile type
├── .github/workflows/
│   └── ci-cd.yml               # GitHub Actions CI/CD pipeline
└── .env.example
```

---

## 4. Features

### 4.1 Home Page

**Route:** `/`

The home page serves as the primary entry point and marketing surface of the platform. It is composed of several sections rendered in sequence:

**Hero Section** — A full-width banner with a headline, subheading, and a primary call-to-action search bar that routes users to `/jobs` with their query pre-filled as a URL parameter.

**Stats Section** — Animated counters highlighting platform-level metrics (total jobs, companies, candidates, placements) to establish social proof.

**Companies Carousel** — A horizontally scrolling strip of company logos derived dynamically from the jobs dataset, each linking to the respective company profile page.

**Browse by Category** — A grid of job category chips (Tech, Design, Marketing, Finance, Healthcare, Remote) rendered by the `CategoryFilters` component in link mode, each filtering the `/jobs` page by that category.

**Featured Jobs** — A 3-column card grid (2-column on tablet, 1-column on mobile) showing up to 6 jobs flagged as `featured: true` in the dataset. Each card links to the job detail page.

**Top Companies Hiring** — A grid of company cards showing the company logo, name, and number of open positions. Clicking a card navigates to that company's profile page.

**Post a Job CTA** — A full-width dark banner prompting employers to post a listing, linking to `/post-job`.

---

### 4.2 Job Listings & Search

**Route:** `/jobs`

The browse page is the core discovery surface of the application.

**Real-Time Search** — A text input (debounced by 300 ms) filters jobs by title, company name, skills, and description simultaneously as the user types. The search query is also stored in the URL (`?q=`) to make results shareable and bookmarkable.

**Sort Dropdown** — Users can sort results by four criteria:
- Most Relevant (default)
- Newest First (by `datePosted`)
- Highest Salary (by `salaryMax`)
- Most Applied (by `applicantCount`)

**Active Filter Chips** — When any filter is active, a row of removable chips appears above the results list showing each active filter's label. Clicking the × on a chip removes that individual filter.

**Result Count** — A live count of matching jobs is displayed (e.g., "42 jobs found") and updates instantly as filters change.

**Pagination** — Results are paginated at 12 jobs per page. The pagination component renders numbered page buttons with previous/next controls and scrolls back to the top of the list on page change.

**Loading Skeleton** — While the component mounts, a set of `JobCardSkeleton` placeholder cards is shown to prevent layout shift and communicate loading state.

**Job Card** — Each listing is rendered as a `JobCard` component displaying:
- Company logo (with `next/image` optimisation)
- Job title (with "New" badge if posted within 7 days, "Featured" badge if applicable)
- Company name
- Location, salary, and applicant count
- Work mode badge (colour-coded: green for Remote, amber for Hybrid, blue for On-site)
- Experience level badge
- Category and job type badges
- Bookmark toggle button
- "View company" link

---

### 4.3 Advanced Filter Sidebar

Accessible via the sticky left sidebar on desktop and a slide-in drawer on mobile (triggered by a "Filters" button).

The sidebar provides the following filter controls:

| Filter | Control Type | Options |
|---|---|---|
| Date Posted | Radio select | Any time, Last 24h, 3 days, 7 days, 30 days |
| Experience Level | Checkboxes | Fresher, Junior, Mid, Senior, Lead |
| Job Type | Checkboxes | Full-time, Part-time, Contract, Internship, Freelance |
| Work Mode | Checkboxes | On-site, Remote, Hybrid |
| Salary (LPA) | Dual-handle range slider | ₹0 – ₹50 LPA |
| Location / City | Dropdown select | 10 major Indian cities + Remote |
| Industry | Checkboxes | IT, Banking, Healthcare, E-Commerce, Education, Startup, Consulting, Manufacturing |
| Skills | Tag input | Free-text entry + 8 quick-add suggestion chips |
| Notice Period | Dropdown select | Immediate, 15 days, 1 month, 2 months, 3 months |
| Company Rating | Radio select | 3★+, 4★+, 4.5★+ |

An active filter count badge on the sidebar header shows how many filters are currently applied. A "Reset" button clears all filters at once.

All filter state is reflected in the URL query string so that filtered views can be shared, bookmarked, or restored on navigation.

---

### 4.4 Job Detail Page

**Route:** `/jobs/[id]`

Displays the full details of a single job listing. The page uses Next.js dynamic routing with `[id]` as the path segment.

The detail view includes:

- Company logo, job title, company name, and location
- Salary range, work mode, job type, experience level, and industry
- Date posted and applicant count
- Full job description (rich text)
- Requirements / responsibilities as a bulleted list
- Skills tags
- Company rating display
- Notice period requirement
- An "Apply Now" button that opens the Application Modal
- A bookmark/save button
- A "View Company" link navigating to the company's profile page

The right-hand sidebar (desktop) shows a "Recently Viewed" widget listing the last 5 jobs the user has viewed, with links back to each.

The page includes proper `not-found.tsx` (404) and `error.tsx` (error boundary) handling, as well as a `loading.tsx` skeleton shown during navigation transitions.

---

### 4.5 Job Application Modal

Triggered by the "Apply Now" button on any job detail page. Rendered as a full-screen overlay dialog (`@radix-ui/react-dialog`).

**Fields:**
- Full Name (required)
- Email (required, type="email")
- Phone (required, type="tel")
- Cover Letter (required, multi-line textarea)
- Resume upload (required, accepts .pdf, .doc, .docx)

**Behaviour:**
- All fields are validated on submit; missing the resume triggers a toast error.
- On submit, a 1.2-second simulated loading state is shown with a spinner.
- On success, the dialog closes and a Sonner toast notification confirms the submission with the job title and company name.
- The form resets to empty after a successful submission.

---

### 4.6 Bookmark / Saved Jobs

**Route:** `/saved`

Users can save any job by clicking the bookmark icon on a job card or job detail page. Saved job IDs are persisted to `localStorage` under the key `saved-jobs`.

The Saved Jobs page retrieves these IDs, looks up the full job objects from the merged dataset (seed + user-posted jobs), and renders them as `JobCard` components. An empty state illustration and prompt are shown when no jobs have been saved.

The `BookmarkButton` component is a toggle — clicking again removes the bookmark. The button's visual state (filled vs. outline icon) reflects the current saved status and updates immediately on click.

---

### 4.7 Recently Viewed Jobs

Whenever a user navigates to a job detail page, that job's ID is prepended to a `recently-viewed` array in `localStorage`. The array is capped at the 5 most recent entries (oldest entry is dropped when the cap is exceeded).

The "Recently Viewed" sidebar widget on the job detail page reads this list and renders the job title, company, and a link back to each listing.

---

### 4.8 Post a Job

**Route:** `/post-job`

A form that allows employers to create a new job listing that is immediately visible in the browse and home pages for the current browser session.

**Fields:**
- Job Title
- Company Name
- Location
- Salary (display string, e.g., "₹12–18 LPA")
- Salary Min / Max (numeric, in LPA)
- Job Type (select: Full-time, Part-time, Contract, Internship, Freelance)
- Category (select: Tech, Design, Marketing, Finance, Healthcare, Remote)
- Job Description (textarea)
- Requirements (textarea — each line becomes a separate requirement bullet)

**Validation** is performed client-side by `lib/validate-post-job.ts` before submission. Invalid fields display inline error messages via the `FieldError` component.

On successful submission, the new job object is serialised and saved to `localStorage` under `posted-jobs`. The `useClientJobs` hook merges this array with the static seed data so newly posted jobs appear throughout the application without a page reload.

---

### 4.9 Company Directory & Profiles

**Route:** `/companies/[slug]`

Company profiles are derived from the jobs dataset — each unique `companySlug` value in the data generates a profile page. The `getCompaniesFromJobs` helper aggregates all jobs per company and builds the company object with a computed `jobCount`.

The company profile page displays:
- Company logo and name
- Industry and company rating
- Total open positions count
- A grid of all currently open job cards for that company

A `not-found.tsx` page handles unknown company slugs gracefully.

---

### 4.10 Job Seeker Profile

**Route:** `/profile`

A comprehensive profile management page for job seekers. All data is persisted to `localStorage` via `lib/profile-storage.ts`.

**Sections:**

**Personal Information** — Full name, email, phone, city, LinkedIn URL, GitHub URL, and a brief bio/summary.

**Work Experience** — Add/edit/delete experience entries, each with: job title, company, start date, end date (or "currently working here" toggle), and description.

**Education** — Add/edit/delete education entries: degree, institution, field of study, start year, end year.

**Skills** — Tag-based skill input. Type a skill and press Enter (or click Add) to add it to a visual tag cloud. Click the × on any tag to remove it.

**Resume Upload** — Allows the user to upload a resume file (PDF or DOC). The filename is stored in the profile object.

**Job Preferences** — Desired job title, preferred work mode (Remote / Hybrid / On-site), preferred job type (Full-time / Part-time / etc.), expected salary range (min/max in LPA), and notice period.

All sections support inline editing with Save / Cancel controls. Changes are saved to `localStorage` on confirmation.

---

### 4.11 Dark / Light Theme Toggle

A theme toggle button in the application header switches between dark and light colour modes. Theme state is managed by `next-themes` and persisted to `localStorage` so the user's preference is retained across sessions.

The design system uses HSL CSS variables (defined in `app/globals.css`) for all colours, ensuring a complete and consistent theme swap with no hard-coded colour values. The dark theme features a deep navy background with high-contrast foreground colours designed to minimise eye strain.

---

### 4.12 SEO & Metadata

Every page generates structured metadata via the `createMetadata` factory in `lib/metadata.ts`:

- `<title>` with a consistent site name template (`%s | TalentFlow`)
- `<meta name="description">` with page-specific descriptions
- OpenGraph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- Canonical URL (derived from `NEXT_PUBLIC_SITE_URL` environment variable)

This ensures the application produces rich preview cards when links are shared on social media and is correctly indexed by search engines.

---

### 4.13 Responsive & Mobile UX

The UI is designed mobile-first and tested at all common breakpoints.

**Header** — On mobile, the navigation links collapse into a hamburger menu that opens a full-height slide-in drawer. The drawer closes on link click or backdrop tap.

**Filter Sidebar** — On screens below the `lg` breakpoint the filter sidebar is hidden. A "Filters" button with an active-filter count badge appears above the job list and opens the `MobileFilterDrawer` component — a bottom-anchored slide-up panel containing the full `BrowseJobsFilterSidebar`.

**Job Grid** — 1 column on mobile, 2 columns on tablet (`sm`), 3 columns on desktop (`lg`).

**Back to Top** — A floating action button appears after scrolling 400 px and smoothly scrolls the page back to the top.

**Micro-animations** — Cards lift on hover (`hover:-translate-y-0.5`) and fade/slide in on load (`animate-slide-up`) using CSS transitions and custom Tailwind animation utilities.

---

### 4.14 Static Pages

The following informational pages are included, each with a loading skeleton and consistent layout via the `StaticPage` layout component:

| Route | Content |
|---|---|
| `/about` | Platform description, mission, and team overview |
| `/contact` | Contact form (name, email, subject, message) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

A global `not-found.tsx` and `error.tsx` page handle 404 and unexpected runtime errors application-wide.

---

## 5. Data Model

### Job

```typescript
interface Job {
  id: string;             // Unique identifier (e.g., "job-001")
  title: string;          // Job title
  company: string;        // Company display name
  companySlug: string;    // URL-safe company identifier
  logo: string;           // Company logo URL
  location: string;       // Display location string
  city: string;           // City for filtering
  salary: string;         // Display salary string (e.g., "₹12–18 LPA")
  salaryMin: number;      // Minimum salary in LPA (for range filter)
  salaryMax: number;      // Maximum salary in LPA (for range filter)
  type: JobType;          // full-time | part-time | contract | internship | freelance
  description: string;    // Full job description
  requirements: string[]; // List of requirements/responsibilities
  datePosted: string;     // ISO date string
  category: JobCategory;  // Tech | Design | Marketing | Finance | Healthcare | Remote
  featured: boolean;      // Whether to show in Featured section
  experience: ExperienceLevel; // fresher | junior | mid | senior | lead
  workMode: WorkMode;     // onsite | remote | hybrid
  industry: Industry;     // IT | Banking | Healthcare | E-Commerce | ...
  skills: string[];       // Required skill tags
  noticePeriod: NoticePeriod; // immediate | 15-days | 1-month | 2-months | 3-months
  companyRating: number;  // Company rating (1.0–5.0)
  applicantCount: number; // Number of applicants (for display and sort)
}
```

### UserProfile

```typescript
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  github: string;
  bio: string;
  skills: string[];
  resumeFileName: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  preferences: {
    desiredTitle: string;
    workMode: WorkMode | "";
    jobType: JobType | "";
    salaryMin: number;
    salaryMax: number;
    noticePeriod: NoticePeriod | "";
  };
}
```

---

## 6. CI/CD Pipeline

The project uses a GitHub Actions workflow defined in `.github/workflows/ci-cd.yml`. It runs on every push to `main` and every pull request targeting `main`.

### Pipeline Jobs

```
┌──────────────────────────────────┐
│   CI — Lint, Typecheck & Build   │
│                                  │
│  1. Checkout repository          │
│  2. Setup Node.js 22 (npm cache) │
│  3. npm ci                       │
│  4. npm run lint (ESLint)        │
│  5. npm run typecheck (tsc)      │
│  6. npm run build                │
└────────────┬─────────────────────┘
             │ (must pass)
     ┌───────┴───────┐
     │               │
     ▼               ▼
[push to main]   [pull request]
     │               │
     ▼               ▼
┌─────────┐   ┌──────────────┐
│ Deploy  │   │   Deploy     │
│Production│   │  Preview    │
│(Vercel) │   │  (Vercel)   │
└────┬────┘   └──────┬───────┘
     │               │
     ▼               ▼
Comment URL    Comment preview
on commit      URL on PR
└──────────────────────────────────┘
        │
        ▼
┌────────────────────────────────┐
│  Pipeline — Required checks    │
│  (CI must pass; deploy result  │
│  is reported as a warning if   │
│  it fails, not a blocker)      │
└────────────────────────────────┘
```

### CI Job (runs on all triggers)

Checks the codebase passes all quality gates before any deployment:

1. Checkout the repository
2. Set up Node.js 22 with npm dependency caching
3. Install dependencies with `npm ci` (clean install for reproducibility)
4. Run ESLint (`npm run lint`)
5. Run TypeScript type checker (`npm run typecheck` → `tsc --noEmit`)
6. Run the Next.js production build (`npm run build`)

### CD — Production Deployment (push to `main` only)

Runs after CI passes. Deploys the built application to Vercel production:

1. Install Vercel CLI globally
2. Write `.vercel/project.json` from `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` secrets
3. Pull the Vercel production environment configuration
4. Build the project with `vercel build --prod`
5. Deploy the pre-built output with `vercel deploy --prebuilt --prod`
6. Post a comment on the triggering commit with the production URL

### CD — Preview Deployment (pull requests only)

Runs after CI passes on every PR:

1. Same setup and install steps as production
2. Pull the Vercel preview environment configuration
3. Build and deploy a preview URL
4. Post or update a comment on the pull request with the preview URL (using a stable marker comment so it doesn't spam on force-pushes)

### Concurrency Control

The workflow uses a `concurrency` group keyed on the PR number or branch ref with `cancel-in-progress: true`, so that a new push to a PR immediately cancels the in-flight run for that PR — saving CI minutes.

### Required Secrets

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel personal access token with deploy permission |
| `VERCEL_ORG_ID` | Vercel team/organisation ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

---

## 7. Environment Variables

| Variable | Description | Required | Default |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL of the deployed application. Used to generate canonical URLs and OpenGraph metadata. | No | `https://talentflow.jobs` |

Create a `.env.local` file in the project root (copy from `.env.example`) and set this variable to your Vercel deployment URL.

---

## 8. Getting Started Locally

### Prerequisites

- Node.js 18.x or higher (22.x recommended)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shyam2119/Job-Board.git
cd Job-Board

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_SITE_URL if needed

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server with Turbopack |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run TypeScript type checking without emitting files |

---

## 9. Deployment

The project is deployed to [Vercel](https://vercel.com) and updates automatically on every merge to `main` via the GitHub Actions CI/CD pipeline described in Section 6.

**Live URL:** [https://job-board-jet-delta.vercel.app](https://job-board-jet-delta.vercel.app)

### Manual Deployment

If you prefer to deploy manually or from your own fork:

1. Install the Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root and follow the prompts to link or create a project
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable in the Vercel dashboard to your deployment URL
4. Future pushes to `main` will trigger automatic deployments if you connect your GitHub repository in the Vercel project settings

### Build Output

Next.js generates a standard `.next` directory. Vercel detects the framework automatically and applies the correct build and output configuration with no additional `vercel.json` needed.

---

*Documentation generated for the TalentFlow Job Board — Software Engineer Assessment Submission.*
