# NPSN — Free Live Deployment

## Option A — GitHub Pages
GitHub Pages can publish static HTML/CSS/JS from a repository. Put the contents of this folder in a GitHub repository, push to `main`, then enable Pages with the GitHub Actions workflow included at `.github/workflows/pages.yml`.

Typical live address:
`https://YOUR-USERNAME.github.io/REPOSITORY/`

## Option B — Cloudflare Pages
Cloudflare Pages supports static HTML sites and Direct Upload / Git integration. Upload this folder as a Pages project. The included `_headers` file provides baseline security headers.

## What is already production-safe in this free package
- No external paid runtime dependency
- Responsive UI
- Candidate workspace with browser-local storage
- PWA manifest + offline service worker
- 404 page
- GitHub Pages deployment workflow
- Cloudflare security headers
- Official-source architecture
- No voter profiling functionality
- No government affiliation claim

## What cannot be activated without an account/credential
A real public URL must be created inside a hosting account. A real server-side AI, secure multi-user database, authentication and live form processing also require a provider/account and credentials. Do not put API keys into client-side JavaScript.

## Important
The website is an independent strategy platform and does not represent ECI, any government, political party or public authority. Current election facts and legal requirements must be checked against the relevant official sources.
