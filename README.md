# Shruti Ada — Portfolio Website

A playful, hand-drawn portfolio site built with **Astro 5** and **Tailwind CSS**, featuring custom fonts and a crumpled paper texture aesthetic.

## Quick Start

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # Production build
pnpm preview      # Preview production build
```

## Project Structure

```
shruti-website/
├── public/
│   ├── fonts/
│   │   ├── Sugarpie.ttf            ← Hand-drawn body font
│   │   └── NewUnderground.ttf      ← Bold display headings
│   ├── images/
│   │   ├── portfolio/              ← Illustration artwork images
│   │   ├── doodles/                ← Hand-drawn doodles (pre-rendered from Figma)
│   │   ├── about/                  ← Personal photos & about page assets
│   │   └── works/
│   │       └── avid-bioservices/   ← Project images per company
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Header.astro            ← Site-wide navigation header
│   ├── layouts/
│   │   └── BaseLayout.astro        ← Nav, lightbox, mobile menu
│   ├── data/
│   │   └── portfolio.ts            ← All portfolio data (illustrations + works)
│   ├── pages/
│   │   ├── index.astro             ← Landing page (generated from Figma)
│   │   ├── illustrations.astro     ← Illustrations gallery (marquee strips)
│   │   ├── illustrations/
│   │   │   └── [slug].astro        ← Individual illustration detail page
│   │   ├── works.astro             ← Works gallery (marquee strips)
│   │   ├── works/
│   │   │   └── [slug].astro        ← Works/case study detail page
│   │   ├── services.astro          ← Services page (4 categories)
│   │   └── about.astro             ← Bio, photos, likes, contact
│   └── styles/
│       └── global.css              ← @font-face, Tailwind, lightbox styles
├── scripts/
│   ├── figma-to-code.mjs           ← Generates index.astro from Figma API data
│   └── figma-cache/                ← Cached Figma API responses & renders
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing — hero, manifesto, illustration/works previews, contact CTA |
| `/illustrations` | Gallery — 3 alternating marquee strips of all illustrations |
| `/illustrations/[slug]` | Detail — hero image, category, navigation marquee, contact CTA |
| `/works` | Gallery — 3 alternating marquee strips of all works |
| `/works/[slug]` | Detail — title, description, flexible content sections (full-width, marquee, masonry) |
| `/services` | Branding, Illustration & Iconography, Social Media, Website Design |
| `/about` | Bio, personal photos, fun likes, contact |

## How to Update Content

### Add a New Illustration

1. Drop the image into `public/images/portfolio/`
2. Add an entry to the `illustrations` array in `src/data/portfolio.ts`:
```typescript
{ src: "/images/portfolio/my-new-piece.png", alt: "My New Piece", slug: "my-new-piece", category: "Illustration" }
```
The gallery page and detail page are generated automatically.

### Add a New Works/Case Study Project

1. Create a folder: `public/images/works/[project-slug]/`
2. Drop all project images into that folder
3. Add an entry to the `works` array in `src/data/portfolio.ts`:
```typescript
{
  src: "/images/works/project-name/hero.png",  // thumbnail for gallery
  alt: "Project Name",
  slug: "project-name",
  title: "Project Name",
  subtitle: "(optional tagline)",
  description: "What you did for this project...",
  sections: [
    { type: "full-width", images: ["/images/works/project-name/main.png"] },
    { type: "marquee", images: ["/images/works/project-name/img1.png", ...] },
    { type: "masonry", label: "design work", images: ["/images/works/project-name/img2.png", ...] },
  ],
}
```

**Section types:**
- `"full-width"` — Large centered image (~83% viewport width)
- `"marquee"` — Scrolling strip of images (clicking swaps the full-width image)
- `"masonry"` — CSS columns layout with optional label, good for varying image sizes

### Change Contact Email
Search for `shrutiada19@gmail.com` across the project and replace.

### Change Fonts
Replace `.ttf` files in `public/fonts/` and update `@font-face` in `src/styles/global.css` + `fontFamily` in `tailwind.config.mjs`.

## Deployment: Netlify

The site is deployed to **Netlify** with automatic builds on push.

### Setup
1. Connect the GitHub repo in [Netlify](https://app.netlify.com)
2. Build settings are auto-detected (Astro framework)
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/`
3. Set custom domain to `shrutiada.com` in **Domain settings**
4. Netlify handles SSL automatically

### Deploy
Push to `main` — Netlify builds and deploys automatically. No manual steps needed.

---

<details>
<summary>Alternative: Coolify + Hetzner + Cloudflare</summary>

If migrating to a self-hosted setup:

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

</details>

## Tech Stack

- [Astro 5](https://astro.build) — Static site generator
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- Custom fonts: Sugarpie (body) + NewUnderground (headings)
- All sizing uses `vw` units for proportional scaling across viewports
