# 💼 TalentFlow — Full-Stack Premium Job Board

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel)](https://job-board-jet-delta.vercel.app)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/Shyam2119/Job-Board/actions)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Prisma%20%7C%20PostgreSQL-blue?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-00E699?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Repository:** [github.com/Shyam2119/Job-Board](https://github.com/Shyam2119/Job-Board)

TalentFlow is a **production-grade, full-stack job board** built with **Next.js 16 (App Router)**, **Prisma ORM**, **PostgreSQL (Neon Serverless)**, and **Tailwind CSS v4**. It connects developers, designers, and tech professionals with leading companies — featuring a real database backend, REST API routes, recruiter dashboard, and premium UI.

🚀 **Live Demo:** [https://job-board-jet-delta.vercel.app](https://job-board-jet-delta.vercel.app)

---

## ✨ Features

- **🔍 Advanced Real-Time Search & Filtering** — 10+ filter types (experience, work mode, salary range, skills, notice period, company rating) all URL-synced.
- **🗄️ PostgreSQL Database** — Real Neon serverless PostgreSQL backing all data. No localStorage for critical state.
- **🔌 REST API Backend** — 7 API routes (`/api/jobs`, `/api/applications`, `/api/saved`, `/api/profile`, `/api/companies`, `/api/stats`) served via Next.js Route Handlers.
- **📝 Job Applications** — Full application form that persists to PostgreSQL. Applicant count increments in real-time.
- **🏢 Recruiter Dashboard** — `/dashboard` page with live job listings, application pipeline, and platform stats from the database.
- **🔖 DB-backed Bookmarks** — Save/unsave jobs stored in PostgreSQL per anonymous session (no login required).
- **👤 Persistent Profile** — Job seeker profile with experience, education, skills, certifications stored in the database.
- **📁 Post-a-Job** — Employer job submission form that creates real database records immediately visible to all users.
- **🏢 Company Directory** — Dynamic company profiles aggregated from the jobs table.
- **🎨 Premium Dark/Light Theme** — HSL CSS variables with seamless `next-themes` toggle.
- **📱 Mobile-First Responsive** — Mobile hamburger nav, slide-up filter drawers, adaptive layouts.
- **📊 SEO Ready** — OpenGraph, Twitter Cards, canonical URLs, JSON-LD structured metadata on every page.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Server & Client Components) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 (HSL CSS variables design tokens) |
| **Database** | PostgreSQL — Neon Serverless |
| **ORM** | Prisma v6 (type-safe DB access, migrations) |
| **API** | Next.js Route Handlers (`app/api/`) |
| **UI Primitives** | Radix UI (Dialog, Select, Checkbox, Slider, Dropdown) |
| **Icons** | Lucide React |
| **Theme** | next-themes (Dark/Light mode) |
| **Notifications** | Sonner (toast notifications) |
| **Fonts** | Geist Sans & Geist Mono |
| **CI/CD** | GitHub Actions |
| **Hosting** | Vercel |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser Client                    │
│  (Next.js React — App Router, Tailwind CSS v4)      │
│  Pages: /, /jobs, /jobs/[id], /companies/[slug],   │
│         /saved, /post-job, /profile, /dashboard     │
└────────────────────┬────────────────────────────────┘
                     │ HTTP fetch
┌────────────────────▼────────────────────────────────┐
│              Next.js API Routes (Backend)           │
│  GET/POST /api/jobs         → Jobs CRUD             │
│  GET       /api/jobs/[id]   → Single job            │
│  GET       /api/companies   → Company list          │
│  GET       /api/stats       → Platform stats        │
│  GET/POST  /api/applications → Job applications     │
│  GET/POST  /api/saved       → Toggle bookmarks      │
│  GET/PUT   /api/profile     → User profile          │
└────────────────────┬────────────────────────────────┘
                     │ Prisma Client
┌────────────────────▼────────────────────────────────┐
│        PostgreSQL — Neon Serverless Database         │
│  Tables: Job, Application, SavedJob, UserProfile    │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher (22.x recommended)
- npm
- A [Neon](https://neon.tech) account (free tier works perfectly)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shyam2119/Job-Board.git
cd Job-Board

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your Neon DATABASE_URL and DIRECT_URL

# 4. Push schema to database
npm run db:push

# 5. Seed the database (30 jobs)
npm run db:seed

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | Neon pooled connection string (serverless-safe) | ✅ Yes |
| `DIRECT_URL` | Neon direct connection string (for migrations) | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | Base URL for metadata / OpenGraph | No |

Get your connection strings from [neon.tech](https://neon.tech) → Project → Settings → Connection Details.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server with Turbopack |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript (no emit) |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:seed` | Seed 30 jobs into the database |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:studio` | Open Prisma Studio (visual DB explorer) |

---

## 🔄 CI/CD

GitHub Actions runs on every PR and push to `main`:

- **CI:** ESLint → TypeScript → Security Audit → Prisma Generate → Build
- **CD (main):** Deploy to Vercel production + commit comment with URL  
- **Preview (PRs):** Vercel preview URL posted on the pull request

**Required GitHub Secrets:**

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel organisation ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_URL` | Neon direct connection string |

---

## 📚 Documentation

| Doc | Description |
|---|---|
| [DOCUMENTATION.md](DOCUMENTATION.md) | Complete feature & technical reference |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | CI/CD and Vercel deployment guide |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Project structure and data flow |
| [docs/API.md](docs/API.md) | API Routes reference |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ using AI-assisted development for the Software Engineer Assessment.*
*Stack: Next.js · TypeScript · Prisma · PostgreSQL (Neon) · Tailwind CSS · GitHub Actions · Vercel*
