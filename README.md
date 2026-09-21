# Mohit Rathore — Portfolio

Animated single-page portfolio for a product designer (UI/UX). Built from scratch with
React, Three.js and Tailwind — no template.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

## What is where

```
index.html                  meta tags, fonts, Person structured data
public/
  Mohit-Rathore-Resume.pdf  the file behind every "Résumé" button
  favicon.svg  robots.txt
src/
  data/content.js           ← ALL the copy lives here. Edit this, not the components.
  App.jsx                   section order
  components/
    Preloader.jsx           counter curtain that lifts on load
    Nav.jsx                 fixed header, scroll progress, mobile menu
    Hero.jsx                headline + the WebGL scene
    Marquee.jsx  About.jsx  Work.jsx  Experience.jsx
    Capabilities.jsx  Contact.jsx  Footer.jsx
    WorkVisual.jsx          the abstract project previews (pure DOM/CSS)
    ExperienceCarousel.jsx  auto-playing slider for the Magnet Brains points
    ExperienceVisual.jsx    one diagram per carousel slide (pure DOM/CSS)
    three/
      HeroScene.jsx         canvas, pointer tracking, performance guards
      ParticleField.jsx     5.6k GPU-animated points
      Backdrop.jsx          aurora shader plane
      Core.jsx              wireframe shell + orbit rings
      shaders.js            all the GLSL
    ui/                     Reveal, SplitWords, Magnetic, Cursor, SectionHeading
  hooks/                    smooth scroll (Lenis) + media-query helpers
  styles/index.css          design tokens, base styles, utilities
```

## Editing the content

Everything a recruiter reads is in `src/data/content.js` — profile details, experience
bullets, the three case studies, skills, education. Change it there and every section
updates.

To swap a colour, edit the tokens at the top of `src/styles/index.css`:
`--color-accent` (violet), `--color-flame` (coral), `--color-ink` (page background).

## Things worth knowing

- **Performance** — Three.js is lazy-loaded, so it never blocks the first paint. The
  render loop stops when the hero scrolls away or the tab is hidden, particle count and
  DPR drop on phones, and there is a CSS-gradient fallback when WebGL is unavailable.
- **Motion** — every animation respects `prefers-reduced-motion`; with it on, Lenis, the
  preloader, the custom cursor and the pointer interactions all switch off.
- **Interactions** — move the pointer to part the particle cloud, click the hero to
  scatter it, hover a project preview to tilt it.

## Before you publish

1. Export a 1200×630 cover and save it as `public/og.png` (`index.html` already links it).
2. Replace the résumé PDF in `public/` whenever you update it.

## Deploy

Static output, so anything works. Vercel or Netlify: build command `npm run build`,
output directory `dist`. GitHub Pages needs `base: '/<repo-name>/'` added to
`vite.config.js`.
