# 💼 TalentFlow — Premium Modern Job Board

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel)](https://job-board-jet-delta.vercel.app)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/Shyam2119/Job-Board/actions)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20TS%20%7C%20Tailwind-blue?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Repository:** [github.com/Shyam2119/Job-Board](https://github.com/Shyam2119/Job-Board)

TalentFlow is a sleek, premium, production-ready job board platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It is designed with visual excellence, fluid responsiveness, and premium UX at its core to connect developers, designers, and creatives with industry-leading companies.

🚀 **Live Demo:** [https://job-board-jet-delta.vercel.app](https://job-board-jet-delta.vercel.app)

---

## ✨ Features

- **🔍 Advanced Real-Time Search & Filtering** — Sticky sidebar with date posted, experience, job type, work mode, ₹ LPA salary slider, location, industry, skills tags, notice period, and company rating filters.
- **📁 Dynamic Job Postings** — Employers post jobs via a validated form; listings persist in `localStorage`.
- **🔖 Bookmark & Saved Jobs** — Save jobs and track recently viewed listings (last 5).
- **👤 Job Seeker Profile** — Full profile page with experience, education, skills, resume upload, and job preferences (`/profile`).
- **🏢 Company Directory & Profiles** — Company pages with all open positions.
- **📝 Application Modal** — Apply flow with form validation and toast notifications (Sonner).
- **🎨 Premium HSL Dark/Light Mode** — Full-fledged, seamless toggle using `next-themes` with harmonious high-contrast colors that prevent eye strain.
- **📱 Ultra-Responsive Mobile UX** — Mobile-first layout, custom hamburger drawers, and interactive micro-animations crafted using CSS transitions.
- **📊 SEO & Social Metadata Ready** — Dynamically generated JSON-LD metadata, OpenGraph tags, and Twitter Cards to maximize organic search visibility and ensure rich preview cards when shared.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router with Server/Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Modern HSL colors & CSS variables design tokens)
- **UI Components:** Shadcn/ui-inspired custom components built on top of Radix UI primitives
- **Icons:** Lucide React
- **Theme Management:** Next Themes (Dark/Light mode)
- **Persistence:** LocalStorage (for bookmarks and newly posted jobs)

---

## 📸 Screenshots

> [!NOTE]
> Below are placeholders for application screenshots. Add your actual screenshots to the `/public/screenshots` directory and update the paths.

| Desktop Preview | Mobile Preview |
| --- | --- |
| ![Desktop View Placeholder](https://placehold.co/800x450/0a1628/38bdf8?text=TalentFlow+Desktop+Interface) | ![Mobile View Placeholder](https://placehold.co/300x550/0a1628/38bdf8?text=TalentFlow+Mobile+UI) |

---

## 🚀 Getting Started

Follow these steps to run TalentFlow locally on your development machine.

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shyam2119/Job-Board.git
   cd Job-Board
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy the example environment file and set your deployment URL:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## ⚙️ Environment Variables

The application supports the following environment variables. You can configure them in `.env.local`:

| Variable Name | Description | Default Value | Required |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Base URL of the deployed application (for metadata/canonical URLs) | `https://talentflow.jobs` | No |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed PR guidelines, branch naming, and CI requirements.

Quick start:

1. Fork the repo and create a branch: `git checkout -b feature/amazing-feature`
2. Run checks: `npm run lint && npx tsc --noEmit && npm run build`
3. Open a Pull Request to `main` — CI and Vercel preview deploys run automatically

## 🔄 CI/CD

GitHub Actions runs on every PR and push to `main`:

- **CI:** ESLint → TypeScript → `npm run build`
- **CD (main):** Deploy to Vercel production + commit comment with URL
- **Preview (PRs):** Vercel preview URL posted on the pull request

Configure secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. See [.github/workflows/README.md](.github/workflows/README.md).

## 📚 Documentation

| Doc | Description |
| --- | --- |
| [docs/README.md](docs/README.md) | Documentation index |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Complete feature & technical reference |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | CI/CD and Vercel deployment |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Project structure and data flow |
| [docs/API.md](docs/API.md) | Types and `localStorage` keys |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for the Software Engineer Assessment.*
