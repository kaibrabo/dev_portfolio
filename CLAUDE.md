# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose
The site exists to inform hiring managers. Judge content and layout changes to `index.html` by that reader.

## Stack
Static HTML/CSS, a little vanilla JS. No package manager, no build, no tests, no linter.
Served at kainoabrabo.com (`CNAME`) via GitHub Pages.

## Commands
- Preview locally: `python3 -m http.server 8000` from the repo root (also the `portfolio` entry in `.claude/launch.json`), then open http://localhost:8000/ (root-relative links like `/waimea/guide/` need the repo root as server root).
- Re-export the resume PDF (with the server running), then check it is still one page:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf=Kainoa-Brabo-Resume.pdf http://localhost:8000/`
- Deploy: push to `main`; GitHub Pages publishes it. There is no other step.

## Structure
- `index.html` is both the portfolio and the resume. One HTML source, two layouts in `assets/styles.css`:
  - Screen: dark two-column layout. Mobile-first base styles; wider layouts sit in `@media screen and (min-width: ...)` so they never apply in print.
  - Print: the `@media print` block plus `@page` turn the same HTML into a one-page Letter resume (10pt body, white, single column). Elements only for print use `.print-only` (the plain-text contact line).
- Print gotchas: keep `color-scheme: light` in print (else Chrome paints dark page margins), and don't use absolute positioning or `z-index` on resume content in print. Positioned boxes paint out of DOM order, which scrambles the PDF's extracted text for ATS parsers. Cards use a grid with `.card-body { display: contents }` instead.
- `Kainoa-Brabo-Resume.pdf` (linked as "view CV") is generated from the print layout with the command above. After any content change to `index.html`, re-export it, or it goes stale.
- `js/main.js`: screen-only extras (nav highlight via `IntersectionObserver`, cursor spotlight gated on `pointer: fine` and `prefers-reduced-motion: no-preference`). The page must work without it.
- Stylesheet is cache-busted by query string (`styles.css?v=N`); bump N when changing it.
- `waimea/`, `waqt/`: public pages for the iOS apps. Each page is self-contained (inline `<style>`, inline SVG favicon, light/dark via CSS variables on `:root` with `prefers-color-scheme` and `data-theme`). They share nothing with `assets/styles.css`.
- Root `main.js` is an unused stub.

## Coupling with the app repos (read before moving or renaming anything)
- `waimea/config.json` and `waqt/config.json` are read at app launch by `../../waimea/src/lib/iap.ts` and `../../waqt/src/lib/iap.ts`. Shape: `{"offer": "sub" | "off", "founderMaxBuild": <number>}`. `off` hides the paywall and unlocks Pro. Changing this file changes live app behavior.
- The apps and App Store listings hardcode these URLs: `/waimea/`, `/waimea/privacy/`, `/waimea/support/`, `/waimea/changelog/`, `/waimea/guide/`, `/waqt/`, `/waqt/privacy/`, `/waqt/support/`, `/waqt/changelog/`. Do not move them.
- `waimea/changelog/index.html` mirrors `../../waimea/CHANGELOG.md`; keep them in step. Privacy pages mirror each app's `store/privacy-policy.*`.

## Conventions
- Commit subject prefix: `portfolio:` for the root page/resume, `waimea:` / `waqt:` for app pages.
- Pages directory-per-route (`<route>/index.html`) so URLs end in `/`.
- All Waimea pages carry Open Graph tags using `https://kainoabrabo.com/waimea/og.png`; the landing, guide and changelog pages also set a canonical URL. Waqt pages have neither yet.

## Platform developer docs
- HTML/CSS/JS: MDN Web Docs, https://developer.mozilla.org/
- Hosting, custom domain, HTTPS: GitHub Pages, https://docs.github.com/en/pages
- App pages (`waimea/`, `waqt/`): App Store Review Guidelines, https://developer.apple.com/app-store/review/guidelines/ (privacy policy and support URL requirements)
