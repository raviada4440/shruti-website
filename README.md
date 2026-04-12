# Shruti Ada — Portfolio Website

A playful, hand-drawn portfolio site built with **Astro 5** and **Tailwind CSS**, featuring custom fonts and a crumpled paper texture aesthetic.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # Production build
npm run preview   # Preview production build
```

## Project Structure

```
shruti-website/
├── public/
│   ├── fonts/
│   │   ├── Sugarpie.ttf          ← Hand-drawn body font
│   │   └── NewUnderground.ttf    ← Bold display headings
│   ├── images/
│   │   ├── portfolio/            ← Artwork images
│   │   ├── doodles/              ← Hand-drawn illustrations & characters
│   │   ├── about/                ← Personal photos
│   │   ├── case-study/           ← Case study project images
│   │   └── paper-bg.jpg          ← Crumpled paper background texture
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      ← Nav, lightbox, mobile menu
│   ├── pages/
│   │   ├── index.astro           ← Landing page
│   │   ├── gallery.astro         ← Illustrations & Projects grids
│   │   ├── services.astro        ← 4 service categories
│   │   ├── about.astro           ← Bio, photos, contact
│   │   └── case-study/
│   │       └── avid-biologics.astro  ← Case study page
│   └── styles/
│       └── global.css            ← @font-face, Tailwind, lightbox styles
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — hero, manifesto, illustration/project previews, contact CTA |
| `/gallery` | Full illustration & project image grids with lightbox |
| `/services` | Branding, Illustration, Social Media, Website Design |
| `/about` | Bio, personal photos, fun likes, contact |
| `/case-study/avid-biologics` | Avid Biologics branding & social media case study |

## How to Customize

### Update Artwork
Add images to `public/images/portfolio/` and update the arrays in `src/pages/index.astro` and `src/pages/gallery.astro`.

### Change Fonts
Replace `.ttf` files in `public/fonts/` and update `@font-face` in `src/styles/global.css` + `fontFamily` in `tailwind.config.mjs`.

### Add a New Case Study
Create a new `.astro` file in `src/pages/case-study/`:
```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
---
<BaseLayout title="Project Name — Shruti Ada">
  <!-- Your case study content -->
</BaseLayout>
```

### Contact
Email links point to `shrutiada19@gmail.com` — search and replace to update.

## Deployment: Coolify + Hetzner + Cloudflare

### 1. Hetzner Setup
- Create a **CX22** VPS on [Hetzner Cloud](https://hetzner.cloud) with **Ubuntu 24.04**

### 2. Install Coolify
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```
Access at `http://<server-ip>:8000`.

### 3. Connect & Deploy
- In Coolify: **Sources** → Add GitHub App → connect your repo
- Click **Deploy** — auto-detects the Dockerfile

### 4. Cloudflare DNS
- Add an **A record**: `@` → `<server IP>` (proxied)
- Add a **CNAME**: `www` → `shrutiada.com` (proxied)
- SSL/TLS → **Full (Strict)**

### 5. Set Domain in Coolify
Set domain to `shrutiada.com` in project settings.

## Tech Stack

- [Astro 5](https://astro.build) — Static site generator
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- Custom fonts: Sugarpie (body) + NewUnderground (headings)
