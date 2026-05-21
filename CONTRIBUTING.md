# Contributing to TalentFlow

Thank you for your interest in contributing to [TalentFlow](https://github.com/Shyam2119/Job-Board)! This guide explains how to work on the project effectively.

## Code of conduct

Be respectful, constructive, and inclusive in all interactions.

## How to contribute

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Job-Board.git
   cd Job-Board
   ```
3. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies** and run locally:
   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```
5. **Make your changes** following the guidelines below.
6. **Verify** before opening a PR:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
7. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add filter for company rating"
   ```
8. **Push** and open a **Pull Request** against `main`.

## Pull request guidelines

### PR title

Use conventional commit style:

- `feat: add job alert subscriptions`
- `fix: mobile filter drawer scroll`
- `docs: update README screenshots`
- `chore: bump dependencies`

### PR description

Include:

- **What** changed and **why**
- **Screenshots** or screen recordings for UI changes
- **Testing** steps you performed
- Linked **issue** number (if applicable)

### Checklist

- [ ] Code builds locally (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] TypeScript passes (`npx tsc --noEmit`)
- [ ] UI works on mobile and desktop
- [ ] Dark mode checked for new components
- [ ] No secrets or `.env.local` committed

## CI/CD

Every PR to `main` automatically runs:

1. ESLint
2. TypeScript check
3. Production build
4. **Vercel preview deployment** (when secrets are configured)

Fix failing checks before requesting review. See [.github/workflows/README.md](.github/workflows/README.md).

## Development standards

### Tech conventions

- **Next.js App Router** — prefer Server Components; use `"use client"` only when needed
- **TypeScript** — strict types; avoid `any`
- **Tailwind CSS** — use design tokens (`bg-card`, `text-accent`, etc.)
- **Components** — colocate under `components/` by feature

### File structure

```
app/           # Routes and pages
components/    # UI and feature components
data/          # Mock data and constants
lib/           # Utilities and business logic
types/         # Shared TypeScript types
```

### Styling

- Match existing navy (`#0f172a`) + blue accent theme
- Support **light and dark** modes via CSS variables
- Mobile-first responsive layouts

## Reporting bugs

Open an issue with:

- Steps to reproduce
- Expected vs actual behavior
- Browser/OS
- Screenshots if relevant

## Feature requests

Open an issue describing the problem, proposed solution, and alternatives considered.

## Questions

Open a [GitHub Discussion](https://github.com/Shyam2119/Job-Board/discussions) or issue for help.

---

We appreciate every contribution! 🙌
