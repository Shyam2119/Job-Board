# TalentFlow — Job Board: Full Feature Documentation

Welcome to the technical documentation for **TalentFlow**, a full-stack, production-grade job board web application.

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
   - 4.11 [Recruiter Dashboard](#411-recruiter-dashboard)
   - 4.12 [Dark / Light Theme Toggle](#412-dark--light-theme-toggle)
   - 4.13 [SEO & Metadata](#413-seo--metadata)
   - 4.14 [Responsive & Mobile UX](#414-responsive--mobile-ux)
5. [Database & REST API Data Model](#5-database--rest-api-data-model)
6. [CI/CD Pipeline](#6-cicd-pipeline)
7. [Environment Variables](#7-environment-variables)
8. [Getting Started Locally](#8-getting-started-locally)
9. [Deployment](#9-deployment)

---

## 1. Project Overview

**TalentFlow** is designed as a modern, high-performance career portal connecting job seekers with hiring companies across tech, design, marketing, finance, healthcare, and remote roles.

Key goals:
- **Real Database Backend**: Serverless PostgreSQL via **Neon** and **Prisma ORM**.
- **REST API Layer**: 7 API route handlers (`/api/jobs`, `/api/applications`, `/api/saved`, `/api/profile`, `/api/companies`, `/api/stats`).
- **State-of-the-Art UX**: Modern typography (Geist), dark/light mode toggle, micro-animations, glassmorphism badges, and real-time filtering.
- **Production DevOps**: Automated GitHub Actions CI/CD pipeline deploying directly to Vercel with zero downtime.

---

## 2. Tech Stack

- **Framework**: Next.js 16 (App Router, Server & Client Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (HSL design tokens, CSS variables)
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Prisma v6
- **UI Primitives**: Radix UI (Dialog, Select, Checkbox, Slider, Dropdown)
- **Icons**: Lucide React
- **Notifications**: Sonner (toast alerts)
- **CI/CD**: GitHub Actions (`.github/workflows/ci-cd.yml`)
- **Hosting**: Vercel

---

## 3. Project Structure

```
├── app/                        # Next.js App Router pages & API routes
│   ├── page.tsx                # Home page (dynamic Prisma fetch)
│   ├── layout.tsx              # Root layout (Header, Footer, Providers)
│   ├── jobs/                   # /jobs (search & filter listing)
│   │   └── [id]/page.tsx       # /jobs/[id] (dynamic CUID job detail)
│   ├── companies/              # /companies directory page
│   │   └── [slug]/page.tsx     # /companies/[slug] profile page
│   ├── dashboard/              # /dashboard (recruiter portal)
│   ├── post-job/               # /post-job submission form
│   ├── profile/                # /profile job seeker manager
│   ├── saved/                  # /saved bookmarked jobs page
│   └── api/                    # REST API route handlers
│       ├── jobs/               # GET/POST /api/jobs
│       ├── applications/       # GET/POST /api/applications
│       ├── saved/              # GET/POST /api/saved
│       ├── profile/            # GET/PUT /api/profile
│       ├── companies/          # GET /api/companies
│       └── stats/              # GET /api/stats
├── components/                 # React UI components
├── hooks/                      # Custom React hooks (useJobs, useSavedJobs, etc.)
├── lib/                        # Prisma client, filters, utilities
├── prisma/                     # Schema, seeds, migrations
└── public/                     # Static assets
```

---

## 4. Database & REST API Data Model

### Prisma Schema (`prisma/schema.prisma`)
- `Job`: CUID primary keys, company metadata, salary ranges, categories, work modes, skills array.
- `Application`: Foreign key to `Job`, candidate name, email, resume, cover letter.
- `SavedJob`: Anonymous session-based bookmarks linked to `Job`.
- `UserProfile`: Candidate bio, experience, education, skills, resume details.

### REST API Endpoints
- `GET /api/jobs` — Search, filter, and paginate jobs.
- `GET /api/jobs/[id]` — Retrieve full job details by CUID.
- `POST /api/jobs` — Post a new job listing.
- `POST /api/applications` — Submit a job application.
- `GET/POST /api/saved` — Read and toggle saved bookmarks.
- `GET/PUT /api/profile` — Read and update user profile.
- `GET /api/companies` — List all hiring companies.
- `GET /api/stats` — Live platform statistics.

---

## 5. Getting Started Locally

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to run the application.
