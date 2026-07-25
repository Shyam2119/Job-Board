# Architecture

TalentFlow is a full-stack **Next.js 16 App Router** application backed by **Neon PostgreSQL** and **Prisma ORM**.

## High-level flow

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Client                       │
│  (Next.js React — App Router, Tailwind CSS v4)          │
│  Pages: /, /jobs, /jobs/[id], /companies, /dashboard,  │
│         /saved, /post-job, /profile                     │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP fetch
┌────────────────────────────▼────────────────────────────┐
│              Next.js API Routes (Backend)               │
│  GET/POST /api/jobs         → Jobs CRUD                 │
│  GET      /api/jobs/[id]   → Single job                 │
│  GET      /api/companies   → Company list               │
│  GET      /api/stats       → Platform stats             │
│  GET/POST /api/applications → Job applications         │
│  GET/POST /api/saved       → Toggle bookmarks          │
│  GET/PUT  /api/profile     → User profile               │
└────────────────────────────┬────────────────────────────┘
                             │ Prisma Client
┌────────────────────────────▼────────────────────────────┐
│        PostgreSQL — Neon Serverless Database             │
│  Tables: Job, Application, SavedJob, UserProfile        │
└─────────────────────────────────────────────────────────┘
```

## Directory layout

| Path | Role |
| --- | --- |
| `app/` | Next.js App Router pages and `/api` REST route handlers |
| `components/home/` | Hero, stats, carousel, category links |
| `components/jobs/` | Listing, filters, cards, detail, post form, modals |
| `components/companies/` | Company grid and individual profile pages |
| `components/dashboard/` | Recruiter portal with stats and applications |
| `lib/prisma.ts` | Prisma Client singleton |
| `lib/browse-filters.ts` | Client/server filter and sort logic |
| `hooks/use-jobs.ts` | React hook fetching `/api/jobs` |
| `hooks/use-saved-jobs.ts` | React hook interacting with `/api/saved` |
| `prisma/` | Database schema (`schema.prisma`) and seed script |

## Database & Session State

- Critical entities (Jobs, Applications, Saved Bookmarks, User Profile) persist in **PostgreSQL**.
- Anonymous users get a persistent `sessionId` stored in browser `localStorage` to sync saved bookmarks across sessions.

## Rendering

- **Dynamic (Server-Rendered):** `/`, `/jobs/[id]`, `/companies/[slug]`, `/api/*`
- **Static Pages:** `/about`, `/contact`, `/privacy`, `/terms`, `/companies` shell
- **Client Components:** Filters, application forms, bookmarks, theme toggle
