# 💼 TalentFlow — Premium Modern Job Board

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel)](https://job-board-demo.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20TS%20%7C%20Tailwind-blue?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

TalentFlow is a sleek, premium, production-ready job board platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It is designed with visual excellence, fluid responsiveness, and premium UX at its core to connect developers, designers, and creatives with industry-leading companies.

🚀 **Live Demo:** [https://job-board-demo.vercel.app](https://job-board-demo.vercel.app)

---

## ✨ Features

- **🔍 Advanced Real-Time Search & Filtering** — Instant search by title, company, or keywords, combined with dynamic multi-select filters for Job Type, Experience Level, Work Mode (Remote/Onsite/Hybrid), and Salary range.
- **📁 Dynamic Job Postings** — Employers can easily post a job listing using a multi-step form with persistent validation, saved in `localStorage` for immediate local review.
- **🔖 Bookmark & Saved Jobs** — Candidates can bookmark and save jobs to a personalized collection for future follow-up, powered by browser-level persistence.
- **🏢 Company Directory & Profiles** — Dedicated company landing pages detailing their mission, tech stack, workspace culture, and list of all currently active positions.
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

We welcome contributions of all kinds! To contribute:

1. **Fork** the repository on GitHub.
2. Create a new **feature branch**: `git checkout -b feature/amazing-feature`.
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`.
4. **Push** to the branch: `git push origin feature/amazing-feature`.
5. Open a **Pull Request** and describe your changes.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for the Software Engineer Assessment.*
