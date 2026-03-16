# Shruti Ada — Portfolio Website

A modern, responsive portfolio site built with **Astro**, **Tailwind CSS**, and **GSAP** animations.

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server (opens at http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
shruti-website/
├── public/
│   ├── images/
│   │   ├── portfolio/      ← Your artwork (26 images from Squarespace)
│   │   ├── projects/       ← Add project-specific images here
│   │   └── icons/          ← Add custom icons here
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.astro              ← Full-screen hero with background art
│   │   ├── IllustrationsCarousel.astro  ← Horizontal scroll carousel
│   │   ├── GalleryStrip.astro      ← Masonry gallery of additional work
│   │   ├── About.astro             ← Hello/bio section
│   │   ├── ProjectsGrid.astro      ← Project cards grid
│   │   ├── Services.astro          ← 4 service categories
│   │   ├── Contact.astro           ← Contact form
│   │   └── SectionDivider.astro    ← Decorative divider (reusable)
│   ├── layouts/
│   │   └── BaseLayout.astro        ← Header, footer, nav, loader
│   ├── pages/
│   │   └── index.astro             ← Main page (assembles all components)
│   └── styles/
│       └── global.css              ← Tailwind + custom styles
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## How to Customize

### Change Your Bio
Edit `src/components/About.astro` — update the text in the `<p>` tags with your real bio.

### Update Artwork
1. Add new images to `public/images/portfolio/` (JPG or PNG)
2. Update the image arrays in:
   - `src/components/IllustrationsCarousel.astro` (carousel items)
   - `src/components/GalleryStrip.astro` (masonry grid items)
   - `src/components/ProjectsGrid.astro` (project cards)

Each array entry looks like:
```js
{ src: "/images/portfolio/your-image.jpg", title: "Title", category: "Category" }
```

### Change Colors
Edit `tailwind.config.mjs` — the color palette is defined under `theme.extend.colors`:
- `cream` — background tones
- `sage` — green accent tones
- `warmgold` — gold/amber accents (buttons, dividers, hover)
- `charcoal` — text colors

### Change Fonts
1. Edit the Google Fonts import in `src/styles/global.css`
2. Update `fontFamily` in `tailwind.config.mjs`

### Update Services
Edit `src/components/Services.astro` — modify the `services` array with your actual offerings.

### Update Social Links
Edit `src/layouts/BaseLayout.astro` — search for `instagram` and `linkedin` to update the URLs.

### Contact Form
The form is set up for **Netlify Forms** (works automatically on Netlify hosting).
For other hosts, you can switch to [Formspree](https://formspree.io) by changing the form's `action` attribute.

## Adding New Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Page Title">
  <section class="pt-24 pb-20 max-w-5xl mx-auto px-6 md:px-12">
    <h1 class="font-display text-4xl">Your Page</h1>
    <!-- Your content -->
  </section>
</BaseLayout>
```

The file name becomes the URL route (e.g., `src/pages/about.astro` → `/about`).

## Deployment: Coolify + Hetzner + Cloudflare

### 1. Hetzner Setup
- Create a **CX22** (or similar) VPS on [Hetzner Cloud](https://hetzner.cloud)
- Choose **Ubuntu 24.04** as the OS
- Note the server IP address

### 2. Install Coolify
SSH into your Hetzner server and run:
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```
Coolify will be available at `http://<your-server-ip>:8000`. Create your admin account.

### 3. Connect GitHub Repo
- In Coolify dashboard, go to **Sources** → Add GitHub App
- Follow the OAuth flow to connect your GitHub account
- Go to **Projects** → New → select this repo
- Coolify auto-detects the `Dockerfile` — no extra config needed

### 4. Deploy
- Click **Deploy** in Coolify — it builds the Docker image and starts the container
- Coolify handles SSL via Let's Encrypt automatically

### 5. Cloudflare DNS
1. Add `shrutiada.com` to [Cloudflare](https://dash.cloudflare.com)
2. Update your domain registrar's nameservers to Cloudflare's
3. In Cloudflare DNS, add an **A record**:
   - Name: `@`
   - Content: `<your Hetzner server IP>`
   - Proxy: **ON** (orange cloud)
4. Add a **CNAME** for `www`:
   - Name: `www`
   - Content: `shrutiada.com`
   - Proxy: **ON**

### 6. Cloudflare Settings (Recommended)
- **SSL/TLS** → Set to **Full (Strict)**
- **Speed → Optimization** → Enable Auto Minify (HTML, CSS, JS)
- **Caching → Configuration** → Set Browser Cache TTL to 1 month
- **Rules** → Create a Page Rule: `*shrutiada.com/*` → Cache Level: Cache Everything

### 7. Set Domain in Coolify
- In your Coolify project settings, set the domain to `shrutiada.com`
- Coolify will configure the reverse proxy and SSL automatically

### Docker (Local Testing)
```bash
# Build image
docker build -t shruti-portfolio .

# Run locally
docker run -p 8080:80 shruti-portfolio

# Open http://localhost:8080
```

## Using Cursor to Edit This Site

Open this project folder in Cursor and use **Sonnet 4** model (fast, affordable, great for frontend).

Example prompts that work well:
- "Change the hero background image to mansion-scene-layout.jpg"
- "Add a new project card for 'My New Project' with image new-project.jpg"
- "Make the services section have 3 columns on desktop instead of 2"
- "Add an animated gradient background to the hero section"
- "Create a new /about page with a timeline of my experience"
- "Change the color scheme to use deep blue instead of warm gold"

## Tech Stack

- [Astro](https://astro.build) — Static site generator
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [GSAP](https://gsap.com) — Scroll-triggered animations
- [Google Fonts](https://fonts.google.com) — Gilda Display, PT Serif, DM Sans
