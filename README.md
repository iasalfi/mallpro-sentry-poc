# MallPro Sentry — Small-tier POC

A single-page, client-side proof of concept for the **MallPro Small deployment tier**
(1 entrance + 3 interior cameras) described in the Al Bayan technical & commercial
proposal. Everything on the page — occupancy, visitor demographics, loss-prevention
cues, camera feeds, heatmaps — is generated locally in the browser with synthetic
data. No real camera stream, footage, or visitor is involved anywhere in this repo.

**Live site:** published via GitHub Pages by the CI/CD workflow below. Once the
first deploy runs, the URL is shown in the deployment's environment on the
repo's **Actions** tab, and under **Settings → Pages**.

## What's inside

- `index.html` — the entire app: markup, styles, and vanilla JS in one
  self-contained file. No build step, no dependencies, no bundler.
- `tests/validate.js` — the CI test: checks the shipped HTML is structurally
  sound (balanced tags, required sections present) and that the inline
  `<script>` block is syntactically valid JavaScript.
- `.github/workflows/ci-cd.yml` — the pipeline: runs the test on every push
  and pull request; on a push to `main` that passes, deploys `index.html`
  straight to GitHub Pages.

## Running it locally

No install needed — it's a static file:

```bash
open index.html          # macOS
# or serve it so relative paths behave exactly like production:
python3 -m http.server 8000
```

## Running the test locally

```bash
node tests/validate.js
```

## CI/CD pipeline

```
push / PR → test job (node tests/validate.js)
                │
                ▼  (only on push to main, only if tests pass)
          deploy job → GitHub Pages
```

The first time this runs, go to **Settings → Pages** in the repo and set
**Source** to **GitHub Actions** (one-time setup; the workflow does the rest
on every push after that).

## Scope note

This POC mirrors the Small tier only (see Section 6/16 of the proposal):
Module A (footfall & occupancy), Module A+ (visitor insight, optional), and
Module B "cues to check" (no AI reviewer on this tier). Numbers on the
System & Licence tab are pulled directly from the proposal's Section 16
pricing.
