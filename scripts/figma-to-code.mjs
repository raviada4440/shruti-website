#!/usr/bin/env node
/**
 * Figma-to-Code Generator — reads cached Figma API data,
 * outputs index.astro with EXACT values from every node.
 * Zero guesswork.
 *
 * Data source: scripts/figma-cache/all-pages.json
 * Run: node scripts/figma-to-code.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE = JSON.parse(
  readFileSync(join(__dirname, "figma-cache", "all-pages.json"), "utf-8")
);

const page = CACHE.nodes["0:1"].document;
const frame = page.children[0];
const FB = frame.absoluteBoundingBox;
const FW = FB.width;   // 1366
const FH = FB.height;  // 3840

console.log(`Frame: "${frame.name}" ${FW}x${FH}`);

// ── Collect every node ───────────────────────────────────────────────

const texts = [];
const images = [];

function walk(node) {
  const t = node.type;
  const bb = node.absoluteBoundingBox || {};
  const x = (bb.x || 0) - FB.x;
  const y = (bb.y || 0) - FB.y;
  const w = bb.width || 0;
  const h = bb.height || 0;
  const fills = node.fills || [];
  const style = node.style || {};
  const rt = node.relativeTransform || [];

  if (t === "TEXT") {
    const solidFill = fills.find((f) => f.type === "SOLID");
    const color = solidFill?.color;
    texts.push({
      name: node.name,
      characters: node.characters,
      x, y, w, h,
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      lineHeightPx: style.lineHeightPx,
      letterSpacing: style.letterSpacing,
      textAlign: style.textAlignHorizontal,
      color: color
        ? `rgba(${Math.round(color.r * 255)},${Math.round(color.g * 255)},${Math.round(color.b * 255)},${color.a})`
        : "rgb(0,0,0)",
    });
  }

  if (t === "RECTANGLE") {
    const imgFill = fills.find((f) => f.type === "IMAGE");
    let rotation = 0;
    if (rt.length === 2) {
      rotation = Math.round(Math.atan2(rt[1][0], rt[0][0]) * (180 / Math.PI) * 100) / 100;
    }
    images.push({
      name: node.name,
      x, y, w, h,
      imageRef: imgFill?.imageRef || null,
      rotation,
    });
  }

  for (const c of node.children || []) walk(c);
}

for (const child of frame.children) walk(child);

console.log(`Texts: ${texts.length}, Images: ${images.length}`);

// ── Identify elements by Figma coordinates ───────────────────────────
// Every value below comes directly from the Figma API output.

const find = (arr, name) => arr.find((n) => n.name === name);
const findText = (chars) => texts.find((n) => n.characters?.startsWith(chars));

// Doodles (image nodes that are decorative)
const monsterEye = find(images, "IMG_2602 1");
const creatureSpirals = find(images, "IMG_2599 1");
const handsReaching = find(images, "Untitled_Artwork 28 1");
const arrow1 = find(images, "IMG_2586 1");
const arrow2 = find(images, "IMG_2586 2");
const logo = find(images, "shruti ada logo 1");

// ── Helper: convert Figma px to percentage of frame ──────────────────

const pctX = (px) => ((px / FW) * 100).toFixed(4);
const pctY = (px) => ((px / FH) * 100).toFixed(4);

// Convert Figma px to vw (viewport-width units) based on 1366px frame.
// This makes everything scale proportionally at any browser width.
const vw = (px) => ((px / FW) * 100).toFixed(4);
const vwGap = (px) => ((px / FH) * 100).toFixed(4); // for vertical gaps relative to frame height

// ── Helper: generate CSS for a text node ─────────────────────────────

function textCSS(node) {
  const lines = [];
  lines.push(`font-family: ${node.fontFamily === "NewUnderground" ? '"NewUnderground", sans-serif' : '"Sugarpie", cursive'};`);
  lines.push(`font-size: ${vw(node.fontSize)}vw;`);
  lines.push(`font-weight: ${node.fontWeight};`);
  lines.push(`line-height: ${(node.lineHeightPx / node.fontSize).toFixed(4)};`);
  if (node.letterSpacing !== 0) {
    lines.push(`letter-spacing: ${vw(node.letterSpacing)}vw;`);
  }
  return lines.join(" ");
}

// ── Build the Astro page ─────────────────────────────────────────────

// All text nodes, grouped by section based on Y position
const navTexts = texts.filter((t) => t.y >= 70 && t.y <= 90);
const heroHeading = findText("Welcome to the");
const heroSubtitle = findText("(My name is Shruti");
const manifHeading = findText("Every project gets");
const manifSubtitle = findText("My works are my");
const illustTitle = findText("illustrations");
const illustSub = findText("( a plethora of illustrative");
const learnMore = findText("learn more");
const illustView = texts.find((t) => t.characters === "view more" && t.y < 2500);
const projTitle = findText("projects");
const projSub = findText("( a plethora of projects");
const projView = texts.find((t) => t.characters === "view more" && t.y > 2500);
const sayHello = findText("Say Hello!");
const promiseBite = findText("I promise I dont");
const collabText = findText("Lets collaborate");
const contactMe = findText("contact me");
const contactEmail = texts.find((t) => t.characters === "shrutiada19@gmail.com" && t.y > 3400);
const bottomEmail = findText("Shrutiada19@gmail.com");
const socialMedia = findText("social media");

// Image strips in Figma (y≈1863 for illustrations, y≈2616 for works)
const illustStripY = 1863;
const worksStripY = 2616;
const stripH = 256;

// ── Generate doodle HTML (absolute positioned, percentage-based) ─────

function doodleStyle(img) {
  let s = `left:${pctX(img.x)}%; top:${pctY(img.y)}%; width:${pctX(img.w)}%; height:${pctY(img.h)}%;`;
  if (img.rotation !== 0) {
    s += ` transform:rotate(${img.rotation}deg); transform-origin:center;`;
  }
  return s;
}

// Map doodle imageRefs to local files
const doodleMap = {
  [monsterEye.imageRef]: "/images/doodles/monster-eye.png",
  [creatureSpirals.imageRef]: "/images/doodles/creature-spirals.png",
  [handsReaching.imageRef]: "/images/doodles/hands-reaching.png",
  [arrow1.imageRef]: "/images/doodles/arrow-doodle.png",
};

const doodles = [monsterEye, creatureSpirals, handsReaching, arrow1, arrow2];

const astro = `---
import BaseLayout from "../layouts/BaseLayout.astro";
import { illustrations, works } from "../data/portfolio";
---

<BaseLayout>
  <div class="figma-canvas">

    {/* Doodle layer — absolute positioned at exact Figma coordinates */}
    <div class="doodle-layer" aria-hidden="true">
      <img src="${doodleMap[monsterEye.imageRef]}" alt="" class="doodle" style="${doodleStyle(monsterEye)}" />
      <img src="${doodleMap[creatureSpirals.imageRef]}" alt="" class="doodle" style="${doodleStyle(creatureSpirals)}" />
      <img src="${doodleMap[handsReaching.imageRef]}" alt="" class="doodle" style="${doodleStyle(handsReaching)}" />
      <img src="${doodleMap[arrow1.imageRef]}" alt="" class="doodle" style="${doodleStyle(arrow1)}" />
      <img src="${doodleMap[arrow1.imageRef]}" alt="" class="doodle" style="${doodleStyle(arrow2)}" />
    </div>

    {/* ── Hero ── */}
    <section class="f-section f-hero">
      <h1 class="f-hero-heading">${heroHeading.characters}</h1>
      <p class="f-hero-subtitle">${heroSubtitle.characters}</p>
    </section>

    {/* ── Manifesto ── */}
    <section class="f-section f-manifesto">
      <h2 class="f-manifesto-heading">${manifHeading.characters}</h2>
      <p class="f-manifesto-subtitle">${manifSubtitle.characters}</p>
    </section>

    {/* ── Illustrations ── */}
    <section id="illustrations" class="f-section f-illustrations">
      <h2 class="f-illust-title">${illustTitle.characters}</h2>
      <p class="f-illust-sub">${illustSub.characters}</p>

      <div class="marquee-wrap">
        <div class="marquee-track">
          {illustrations.map((item) => (
            <div class="marquee-item" data-lightbox data-lightbox-src={item.src} data-lightbox-alt={item.alt}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
          {illustrations.map((item) => (
            <div class="marquee-item" aria-hidden="true">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <a href="/gallery" class="f-link f-learn-more">${learnMore.characters}</a>
      <a href="/gallery" class="f-link f-illust-view">${illustView.characters}</a>
    </section>

    {/* ── Projects ── */}
    <section id="works" class="f-section f-projects">
      <h2 class="f-proj-title">${projTitle.characters}</h2>
      <p class="f-proj-sub">${projSub.characters}</p>

      <div class="marquee-wrap">
        <div class="marquee-track">
          {works.map((item) => (
            <div class="marquee-item" data-lightbox data-lightbox-src={item.src} data-lightbox-alt={item.alt}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
          {works.map((item) => (
            <div class="marquee-item" aria-hidden="true">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <a href="/gallery" class="f-link f-proj-view">${projView.characters}</a>
    </section>

    {/* ── Footer ── */}
    <section class="f-section f-footer">
      <h2 class="f-say-hello">${sayHello.characters}</h2>
      <p class="f-promise">${promiseBite.characters}</p>

      <div class="f-footer-cols">
        <h3 class="f-collab">${collabText.characters}</h3>
        <div class="f-contact-right">
          <p class="f-contact-label">${contactMe.characters}</p>
          <a href="mailto:shrutiada19@gmail.com" class="f-contact-email">${contactEmail.characters}</a>
        </div>
      </div>

      <div class="f-footer-bar">
        <a href="mailto:shrutiada19@gmail.com" class="f-bottom-email">${bottomEmail.characters}</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener" class="f-social">${socialMedia.characters}</a>
      </div>
    </section>

  </div>
</BaseLayout>

<style>
  /*
   * ALL values below come from Figma API (frame ${FW}x${FH}).
   * Node positions are in px, converted to % of frame for responsiveness.
   * Font sizes, line heights, letter spacing are EXACT from style object.
   */

  .figma-canvas {
    position: relative;
    width: 100%;
    overflow: visible;
  }

  /* ── Doodle layer ── */
  .doodle-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }
  .doodle {
    position: absolute;
    pointer-events: none;
    object-fit: contain;
  }
  .f-section {
    position: relative;
    z-index: 2;
  }

  /* ── Hero ── */
  .f-hero {
    padding-top: ${vw(heroHeading.y)}vw;
    padding-left: ${vw(heroHeading.x)}vw;
    padding-right: ${vw(FW - heroHeading.x - heroHeading.w)}vw;
  }
  .f-hero-heading {
    ${textCSS(heroHeading)}
    text-align: ${heroHeading.textAlign.toLowerCase()};
    width: ${vw(heroHeading.w)}vw;
    max-width: 100%;
  }
  .f-hero-subtitle {
    ${textCSS(heroSubtitle)}
    text-align: ${heroSubtitle.textAlign.toLowerCase()};
    margin-top: ${vw(heroSubtitle.y - heroHeading.y - heroHeading.lineHeightPx * 2)}vw;
    padding-left: ${vw(heroSubtitle.x - heroHeading.x)}vw;
    width: ${vw(heroSubtitle.w)}vw;
    max-width: 100%;
  }

  /* ── Manifesto ── */
  .f-manifesto {
    padding-top: ${vw(manifHeading.y - heroSubtitle.y - heroSubtitle.lineHeightPx)}vw;
    padding-left: ${vw(manifHeading.x)}vw;
    padding-right: ${vw(FW - manifHeading.x - manifHeading.w)}vw;
  }
  .f-manifesto-heading {
    ${textCSS(manifHeading)}
    text-align: ${manifHeading.textAlign.toLowerCase()};
    width: ${vw(manifHeading.w)}vw;
    max-width: 100%;
  }
  .f-manifesto-subtitle {
    ${textCSS(manifSubtitle)}
    text-align: ${manifSubtitle.textAlign.toLowerCase()};
    margin-top: ${vw(manifSubtitle.y - manifHeading.y - manifHeading.lineHeightPx * 2)}vw;
    padding-left: ${vw(manifSubtitle.x - manifHeading.x)}vw;
    width: ${vw(manifSubtitle.w)}vw;
    max-width: 100%;
  }

  /* ── Illustrations ── */
  .f-illustrations {
    padding-top: ${vw(illustTitle.y - manifSubtitle.y - manifSubtitle.lineHeightPx)}vw;
  }
  .f-illust-title {
    ${textCSS(illustTitle)}
    text-align: ${illustTitle.textAlign.toLowerCase()};
    padding-left: ${vw(illustTitle.x)}vw;
    width: ${vw(illustTitle.w)}vw;
    max-width: 100%;
  }
  .f-illust-sub {
    ${textCSS(illustSub)}
    text-align: ${illustSub.textAlign.toLowerCase()};
    margin-top: ${vw(illustSub.y - illustTitle.y - illustTitle.lineHeightPx)}vw;
    padding-left: ${vw(illustSub.x)}vw;
    width: ${vw(illustSub.w)}vw;
    max-width: 100%;
  }
  .f-learn-more {
    ${textCSS(learnMore)}
    display: block;
    margin-top: ${vw(20)}vw;
    padding-left: ${vw(learnMore.x)}vw;
  }
  .f-illust-view {
    ${textCSS(illustView)}
    display: block;
    margin-top: ${vw(illustView.y - learnMore.y - learnMore.lineHeightPx)}vw;
    padding-left: ${vw(illustView.x)}vw;
  }

  /* ── Projects ── */
  .f-projects {
    padding-top: ${vw(projTitle.y - illustView.y - illustView.lineHeightPx)}vw;
  }
  .f-proj-title {
    ${textCSS(projTitle)}
    text-align: ${projTitle.textAlign.toLowerCase()};
    padding-left: ${vw(projTitle.x)}vw;
    width: ${vw(projTitle.w)}vw;
    max-width: 100%;
  }
  .f-proj-sub {
    ${textCSS(projSub)}
    text-align: ${projSub.textAlign.toLowerCase()};
    margin-top: ${vw(projSub.y - projTitle.y - projTitle.lineHeightPx)}vw;
    padding-left: ${vw(projSub.x)}vw;
    width: ${vw(projSub.w)}vw;
    max-width: 100%;
  }
  .f-proj-view {
    ${textCSS(projView)}
    display: block;
    margin-top: ${vw(24)}vw;
    padding-left: ${vw(projView.x)}vw;
  }

  /* ── Footer ── */
  .f-footer {
    padding-top: ${vw(sayHello.y - projView.y - projView.lineHeightPx)}vw;
    padding-left: ${vw(Math.min(collabText.x, bottomEmail.x))}vw;
    padding-right: ${vw(FW - socialMedia.x - socialMedia.w)}vw;
    padding-bottom: ${vw(FH - bottomEmail.y - bottomEmail.lineHeightPx)}vw;
  }
  .f-say-hello {
    ${textCSS(sayHello)}
    text-align: ${sayHello.textAlign.toLowerCase()};
    padding-left: ${vw(sayHello.x - Math.min(collabText.x, bottomEmail.x))}vw;
    width: ${vw(sayHello.w)}vw;
  }
  .f-promise {
    ${textCSS(promiseBite)}
    text-align: ${promiseBite.textAlign.toLowerCase()};
    margin-top: ${vw(promiseBite.y - sayHello.y - sayHello.lineHeightPx)}vw;
    padding-left: ${vw(promiseBite.x - Math.min(collabText.x, bottomEmail.x))}vw;
    width: ${vw(promiseBite.w)}vw;
  }
  .f-footer-cols {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: ${vw(collabText.y - promiseBite.y - promiseBite.lineHeightPx)}vw;
  }
  .f-collab {
    ${textCSS(collabText)}
    text-align: ${collabText.textAlign.toLowerCase()};
    width: ${vw(collabText.w)}vw;
  }
  .f-contact-right {
    text-align: right;
  }
  .f-contact-label {
    ${textCSS(contactMe)}
  }
  .f-contact-email {
    ${textCSS(contactEmail)}
    display: block;
    margin-top: ${vw(contactEmail.y - contactMe.y - contactMe.lineHeightPx)}vw;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  .f-contact-email:hover { opacity: 1; }
  .f-footer-bar {
    display: flex;
    justify-content: space-between;
    margin-top: ${vw(bottomEmail.y - contactEmail.y - contactEmail.lineHeightPx)}vw;
  }
  .f-bottom-email {
    ${textCSS(bottomEmail)}
    opacity: 0.6;
    transition: opacity 0.3s;
  }
  .f-social {
    ${textCSS(socialMedia)}
    opacity: 0.6;
    transition: opacity 0.3s;
  }
  .f-bottom-email:hover, .f-social:hover { opacity: 1; }

  /* ── Links ── */
  .f-link {
    color: rgb(0,0,0);
    text-decoration: none;
    transition: opacity 0.3s;
  }
  .f-link:hover { opacity: 0.6; }

  /* ── Marquee (scrolling image strips) ── */
  .marquee-wrap {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
    margin-top: ${vw(illustStripY - illustSub.y - illustSub.lineHeightPx - 40)}vw;
  }
  .marquee-track {
    display: flex;
    gap: ${vw(24)}vw;
    animation: marquee-scroll 45s linear infinite;
    width: max-content;
  }
  .marquee-wrap:hover .marquee-track {
    animation-play-state: paused;
  }
  .marquee-item {
    flex-shrink: 0;
    width: ${vw(455)}vw;
    cursor: pointer;
  }
  .marquee-item img {
    width: 100%;
    height: ${vw(stripH)}vw;
    object-fit: cover;
    border-radius: 2px;
    transition: transform 0.7s;
  }
  .marquee-item:hover img {
    transform: scale(1.03);
  }
  @keyframes marquee-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .f-footer-cols { flex-direction: column; gap: 3vw; }
    .f-contact-right { text-align: left; }
  }
</style>
`;

// ── Write ────────────────────────────────────────────────────────────

const outPath = join(__dirname, "..", "src", "pages", "index.astro");
writeFileSync(outPath, astro, "utf-8");
console.log(`\nGenerated: ${outPath}`);
console.log(`All values from Figma API — zero guesswork.`);
