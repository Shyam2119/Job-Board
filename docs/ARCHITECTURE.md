# Architecture

TalentFlow is a **Next.js 16 App Router** application with no backend database. Seed data lives in `data/jobs.ts`; user data persists in the browser via `localStorage`.

## High-level flow

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  app/ pages │────▶│ components/      │────▶│ lib/ + hooks/   │
│  (routes)   │     │ (UI + features)  │     │ (logic + store) │
└─────────────┘     └──────────────────┘     └────────┬────────┘
                                                      │
                        ┌─────────────────────────────┴─────────────────────────────┐
                        ▼                             ▼                             ▼
                 data/jobs.ts              localStorage (client)           types/
                 enrich-jobs.ts            posted, saved, recent, profile
```

## Directory layout

| Path | Role |
| --- | --- |
| `app/` | Routes, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` |
| `components/home/` | Hero, stats, carousel, category links |
| `components/jobs/` | Listing, filters, cards, detail, post form, modals |
| `components/layout/` | Header, footer, theme toggle, static page shell |
| `components/profile/` | Profile tabs and forms |
| `lib/jobs.ts` | Job store snapshot, CRUD for posted/saved/recent |
| `lib/browse-filters.ts` | Filter + sort + pagination |
| `lib/parse-url-filters.ts` | URL `searchParams` → filter state |
| `hooks/use-client-jobs.ts` | `useSyncExternalStore` for reactive job lists |

## Client state pattern

To avoid infinite re-renders with `useSyncExternalStore`, `getJobsStoreSnapshot()` returns a **stable array reference** until `invalidateJobsCache()` runs after a `localStorage` mutation.

`JobsListingShell` uses `key={searchParams.toString()}` so URL filter changes remount the listing without `setState` in effects.

## Rendering

- **Static:** Home, static pages, `/jobs` shell
- **SSG:** `/jobs/[id]`, `/companies/[slug]` via `generateStaticParams`
- **Client:** Filters, bookmarks, profile, post-job form, theme toggle

## Theming

CSS variables in `app/globals.css` (`:root` / `.dark`) map to Tailwind tokens. `ThemeProvider` (`next-themes`) sets the `class` on `<html>`.
