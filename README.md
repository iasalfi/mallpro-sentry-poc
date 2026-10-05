# MallPro AI Vision

A single-page, client-side demo of MallPro for mall and souq owners: what the dashboard shows when
your own cameras are read on site.

Two use cases run side by side:

1. **Tenant footfall and estimated revenue.** People in and out at each tenant entrance or
   shopfront (two-line gate, staff left out), shoppers leaving with the tenant's bag counted as
   bag-outs, and an estimated revenue per tenant from bag-outs times an agreed basket value.
   It is an estimate, not audited sales.
2. **Staff presence and emergency alerts.** Guard-post checks, cleaning rounds against the schedule
   per shift, and person-down or crowd-forming alerts with camera, time, zone and one still photo.
   Staff are recognised by uniform, never by face.

Two fictional Jeddah sites are included, a **mall** (shops on a shared corridor) and a **souq**
(open lanes, pole cameras). Each has four cameras: two tenant entrances or shopfronts, a guard post
and a cleaning route. Switch between them in the sidebar. The interface is bilingual (English and
Arabic, with right-to-left layout and Arabic-Indic numerals) and has light and dark themes.

The roadmap page lists the capabilities that are scoped on demand and are not part of the live
workspaces: shopper sentiment and insight, in-shop employee analytics, and theft and loss prevention.

## What's inside

- `index.html` is the entire app: markup, styles and vanilla JS in one self-contained file. No build
  step, no dependencies, no bundler. The only font is Calibri.
- `tests/validate.js` is the CI test: checks the shipped HTML is structurally sound (balanced tags,
  every workspace present) and that the inline script is valid JavaScript.
- `.github/workflows/ci-cd.yml` runs the test on every push and pull request, and on a push to
  `main` that passes, deploys `index.html` to GitHub Pages.

## Running it locally

```bash
open index.html          # macOS
# or serve it so relative paths behave like production:
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

The first time this runs, set **Settings → Pages → Source** to **GitHub Actions** in the repo.
