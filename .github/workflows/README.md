# GitHub Actions — CI/CD

This folder contains the [CI/CD workflow](ci-cd.yml) for **TalentFlow** (Job Board).

## Overview

| Trigger | Jobs that run |
| --- | --- |
| **Pull request → `main`** | `ci` → `deploy-preview` |
| **Push → `main`** | `ci` → `deploy-production` |

## Pipeline diagram

```
PR to main                    Push to main
    │                              │
    ▼                              ▼
┌─────────┐                  ┌─────────┐
│   ci    │                  │   ci    │
│ lint    │                  │ lint    │
│ tsc     │                  │ tsc     │
│ build   │                  │ build   │
└────┬────┘                  └────┬────┘
     │                              │
     ▼                              ▼
┌─────────────┐            ┌──────────────────┐
│deploy-preview│            │deploy-production │
│ Vercel URL  │            │ Vercel prod URL  │
│ PR comment  │            │ Commit comment   │
└─────────────┘            └──────────────────┘
```

## Job: `ci`

Runs on every pull request and push to `main`.

1. Checkout code
2. Node.js **20** with **npm cache**
3. `npm ci`
4. `npm run lint` (ESLint)
5. `npx tsc --noEmit` (TypeScript)
6. `npm run build` (Next.js production build)

If any step fails, downstream deploy jobs are skipped (`needs: ci`).

Deploy jobs run **only when** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are configured. If they are missing, CI still passes (deploy is skipped). Your site can still deploy via [Vercel Git integration](https://vercel.com/docs/deployments/git).

## Job: `deploy-production`

Runs only on **push to `main`**, after `ci` succeeds, and when all Vercel secrets are set.

1. Re-runs install + Vercel CLI setup
2. `vercel pull` (production env)
3. `vercel build --prod`
4. `vercel deploy --prebuilt --prod`
5. Posts the live URL as a **commit comment** via GitHub API

Uses GitHub Environment: `production` (optional protection rules in repo settings).

## Job: `deploy-preview`

Runs only on **pull requests** targeting `main`, after `ci` succeeds.

1. `vercel pull` (preview env)
2. `vercel build`
3. `vercel deploy --prebuilt`
4. Creates or updates a **PR comment** with the preview URL

## Required GitHub Secrets

Configure these in **Settings → Secrets and variables → Actions**:

| Secret | Description |
| --- | --- |
| `VERCEL_TOKEN` | Vercel personal access token ([Vercel Account Tokens](https://vercel.com/account/tokens)) |
| `VERCEL_ORG_ID` | Team or user ID from `.vercel/project.json` or Vercel project settings |
| `VERCEL_PROJECT_ID` | Project ID from Vercel project settings |

### How to find Vercel IDs

```bash
# After linking the project locally:
npx vercel link
cat .vercel/project.json
```

Or from the Vercel dashboard: **Project → Settings → General**.

## Caching

`actions/setup-node@v4` with `cache: npm` caches dependencies based on `package-lock.json` for faster runs.

## Concurrency

Workflow runs are grouped by ref/PR number. New pushes cancel in-progress runs for the same group to avoid duplicate deploys.

## Troubleshooting

| Issue | Fix |
| --- | --- |
| `VERCEL_TOKEN` invalid | Regenerate token; ensure token has project access |
| Build fails in CI but works locally | Run `npm ci && npm run build` locally; check Node 22 |
| Workflow red but app deploys on Vercel | Add GitHub secrets or rely on Vercel Git deploy; CI passes without secrets |
| No commit comment | Ensure workflow has `contents: write` permission |
| Preview comment missing | Check PR targets `main`; verify secrets on fork PRs (use `pull_request` from same repo) |

## Manual deploy (local)

```bash
npm run build
npx vercel --prod
```
