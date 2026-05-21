# Data API

TalentFlow has **no HTTP API routes**. This document describes the **TypeScript data contract** and **browser persistence keys**.

## Types

Source of truth: `types/job.ts`, `types/profile.ts`.

### `Job`

Core fields: `id`, `title`, `company`, `companySlug`, `logo`, `location`, `city`, `salary`, `salaryMin`, `salaryMax`, `type`, `description`, `requirements[]`, `datePosted`, `category`, `featured`, `experience`, `workMode`, `industry`, `skills[]`, `noticePeriod`, `companyRating`, `applicantCount`.

Posted jobs from the form are normalized in `lib/jobs.ts` → `normalizeJob()` so legacy `localStorage` entries remain compatible with filters.

### `UserProfile`

Stored under `talentflow-user-profile`. Includes contact info, experience/education arrays, skills, resume filename, and job preferences (title, work mode, type, salary range, notice period).

## localStorage keys

| Key | Module | Purpose |
| --- | --- | --- |
| `job-board-posted-jobs` | `lib/jobs.ts` | User-posted job listings (JSON array of `Job`) |
| `job-board-saved-jobs` | `lib/jobs.ts` | Bookmarked job IDs (`string[]`) |
| `job-board-recently-viewed` | `lib/jobs.ts` | Last 5 viewed job IDs |
| `talentflow-user-profile` | `lib/profile-storage.ts` | Full profile object |

## Read/write helpers

| Function | File |
| --- | --- |
| `getAllJobs()` / `getJobsStoreSnapshot()` | `lib/jobs.ts` |
| `savePostedJob(job)` | `lib/jobs.ts` |
| `toggleSavedJob(id)` | `lib/jobs.ts` |
| `addRecentlyViewed(id)` | `lib/jobs.ts` |
| `getProfile()` / `saveProfile()` | `lib/profile-storage.ts` |
| `filterJobs(jobs, filters)` | `lib/browse-filters.ts` |
| `validatePostJobForm(values)` | `lib/validate-post-job.ts` |

## URL query parameters (`/jobs`)

Parsed by `lib/parse-url-filters.ts`, including: `q`, `category`, `type`, `workMode`, `experience`, `location`, `industry`, `skills`, `noticePeriod`, `datePosted`, `salaryMin`, `salaryMax`, `rating`, `sort`, `page`.

Example: `/jobs?workMode=remote&category=Tech`
