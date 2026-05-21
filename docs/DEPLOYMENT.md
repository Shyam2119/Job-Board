# Deployment & CI/CD

## Production URL

[https://job-board-jet-delta.vercel.app](https://job-board-jet-delta.vercel.app)

## Automatic deploy (recommended)

On every **push to `main`**, GitHub Actions (`.github/workflows/ci-cd.yml`) runs:

1. **CI** — `npm ci` → `lint` → `typecheck` → `build`
2. **CD** — Vercel CLI: `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`
3. **Pipeline status** — Fails only if CI fails; deploy failure is a warning (Vercel Git integration may still deploy)

PRs to `main` get the same CI plus an optional **preview deploy** and PR comment with the preview URL.

## Required GitHub secrets

| Secret | Use |
| --- | --- |
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Team/user ID |
| `VERCEL_PROJECT_ID` | Project ID |

Add under **Settings → Secrets and variables → Actions**.

Find IDs after `npx vercel link`: `cat .vercel/project.json`

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical/OG URLs; set to your Vercel URL in production |

Copy `.env.example` to `.env.local` for local development.

## Manual deploy

```bash
npm ci
npm run build
npx vercel link    # first time
npx vercel --prod
```

## Monitoring CI

- Actions: [github.com/Shyam2119/Job-Board/actions](https://github.com/Shyam2119/Job-Board/actions)
- Required check job: **Pipeline — Required checks** (CI must pass)

See [.github/workflows/README.md](../.github/workflows/README.md) for troubleshooting.
