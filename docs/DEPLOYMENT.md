# Deployment & CI/CD Guide

## Production Deployment

- **Live Site**: [https://job-board-jet-delta.vercel.app](https://job-board-jet-delta.vercel.app)
- **Database**: Neon Serverless PostgreSQL (`postgresql://...`)

## Automatic Deploy (GitHub Actions)

On every **push to `main`**, GitHub Actions (`.github/workflows/ci-cd.yml`) executes:

1. **Checkout & Node Setup** — Node.js 22 with npm caching.
2. **Lint & Typecheck** — ESLint and TypeScript `tsc --noEmit`.
3. **Security Audit** — High severity security checks.
4. **Prisma Generate & Next Build** — Compiles Next.js app.
5. **Vercel Deploy** — Deploys directly to production on Vercel.

## Required Environment Variables

| Variable | Location | Description |
|---|---|---|
| `DATABASE_URL` | Vercel & GitHub Secrets | Neon pooled connection string |
| `DIRECT_URL` | Vercel & GitHub Secrets | Neon direct connection string |
| `VERCEL_TOKEN` | GitHub Secrets | Vercel personal access token |
| `VERCEL_ORG_ID` | GitHub Secrets | Vercel organization ID |
| `VERCEL_PROJECT_ID` | GitHub Secrets | Vercel project ID |
