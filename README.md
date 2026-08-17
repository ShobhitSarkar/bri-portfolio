# Brianna Rivera — Portfolio

A personal portfolio site for Brianna Rivera, Communications & PR Specialist
(Chicago, IL). Built as a hand-crafted, editorial single-page site — warm paper
palette, an optical serif (Fraunces) set against a clean grotesque (Archivo),
a real typographic grid, and restrained scroll motion.

## Stack

Plain HTML, CSS, and a small amount of vanilla JavaScript — no framework, no
build step. Fonts load from Google Fonts.

```
index.html    Page markup and content
styles.css    The full design system
script.js     Scroll reveals + sticky masthead hairline
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy (Vercel)

This is a zero-build static site, so Vercel needs no configuration beyond the
committed `vercel.json` (which sets clean URLs, cache, and basic security
headers).

1. On [vercel.com](https://vercel.com), **Add New → Project** and import this
   GitHub repository.
2. Framework preset: **Other**. Leave Build Command and Output Directory empty —
   Vercel serves the repository root and finds `index.html`.
3. Deploy. Production tracks the `main` branch; every push to `main` redeploys,
   and pull requests get their own preview URLs automatically.

Any other static host (Netlify, GitHub Pages) works the same way with no build
step.

## Editing content

All copy lives in `index.html`. To update the palette or type, edit the custom
properties at the top of `styles.css` (`:root`).

Design decisions worth keeping if you revise it:

- One accent color (warm clay), used sparingly — section numbers, the emphasized
  hero and contact lines, link states.
- No stock photography; the type carries the page. If a portrait is added later,
  give it a considered frame rather than dropping it into the hero.
- Motion respects `prefers-reduced-motion`.
