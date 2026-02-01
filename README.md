# Tetea Jamii - Astro Migration Project

This repository contains the source code for the Tetea Jamii Community-Based Organization website, migrated from static HTML to [Astro](https://astro.build).

## 🚀 Project Structure
Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── assets/
│       ├── css/ (Global styles)
│       ├── js/ (Global scripts)
│       └── images/ (Site assets)
├── src/
│   ├── layouts/ (Shared page layouts)
│   └── pages/ (Site pages: .astro files)
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🛠️ Key Features
-   **Astro Components**: Modular pages for easy maintenance.
-   **Leaflet.js**: Interactive maps for Contact and Impact pages.
-   **Formspree**: Functional contact forms.
-   **CSS Variables**: Consistent branding (Justice Blue, Empowerment Purple, etc.).
-   **Scroll Animations**: IntersectionObserver-based entry animations.

## 📦 Deployment
This project is configured for static hosting (Cloudflare Pages, Vercel, Netlify).
Recommended: **Cloudflare Pages** (Zero config, free SSL).
1.  Connect GitHub repo.
2.  Select **Astro** preset.
3.  Deploy!
# TeteaJamiiAstro
