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

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel). For GitHub Pages, enable
Pages on this repository and point it at the branch root — no configuration
needed.

## Editing content

All copy lives in `index.html`. To update the palette or type, edit the custom
properties at the top of `styles.css` (`:root`).

Design decisions worth keeping if you revise it:

- One accent color (warm clay), used sparingly — section numbers, the emphasized
  hero and contact lines, link states.
- No stock photography; the type carries the page. If a portrait is added later,
  give it a considered frame rather than dropping it into the hero.
- Motion respects `prefers-reduced-motion`.
