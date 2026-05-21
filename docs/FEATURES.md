# Features

Quick index by route. For full prose and screenshots placeholders, see [DOCUMENTATION.md](../DOCUMENTATION.md).

| Route | Highlights |
| --- | --- |
| `/` | Hero search, stats, company carousel, categories, featured jobs, top companies CTA |
| `/jobs` | Debounced search, advanced filters (sidebar + mobile drawer), sort, chips, pagination |
| `/jobs/[id]` | Detail, apply modal, bookmark, company link, recently viewed |
| `/post-job` | Validated employer form → `localStorage` |
| `/companies/[slug]` | Company profile + open roles |
| `/saved` | Bookmarked listings |
| `/profile` | 6-tab seeker profile, preferences, resume metadata |
| `/about`, `/contact`, `/privacy`, `/terms` | Static content pages |

## Cross-cutting

- Dark/light theme (`next-themes`)
- SEO metadata + JSON-LD (`lib/metadata.ts`)
- Route `loading.tsx` skeletons, `error.tsx`, `not-found.tsx`
- Entrance animations (`animate-in`, `animate-slide-up`)
- Footer: About, Contact, Privacy, Terms + social icons
- Toasts via Sonner (apply, post job, profile save)

## Filters (browse)

Date posted, experience, job types, work mode, ₹ LPA salary range, location, industry, skills tags, notice period, company rating — see `components/jobs/browse-jobs-filter-sidebar.tsx`.
