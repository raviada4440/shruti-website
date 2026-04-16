export interface PortfolioItem {
  src: string;
  alt: string;
  slug: string;
  category?: string;
}

export type SectionType = "marquee" | "masonry" | "full-width";

export interface WorkSection {
  type: SectionType;
  label?: string;
  images: string[];
}

export interface WorkItem {
  src: string;
  alt: string;
  slug: string;
  title: string;
  /** If set, project page shows this image instead of typographic `title`. */
  titleLogo?: string;
  subtitle: string;
  description: string;
  sections: WorkSection[];
  /** If set, `/works` shows one marquee tile per image (all link to this project). Otherwise only `src` is used. */
  galleryImages?: string[];
  /** If set and same length as `galleryImages`, each tile uses this href instead of `/works/{slug}`. */
  galleryLinks?: string[];
}

/** Avid Bioservices — TV slides only, one file per slide (`public/images/works/avid-bioservices/`). */
const AVID_TV_SLIDES = [
  "/images/works/avid-bioservices/tv-general-hr-office-hours.png",
  "/images/works/avid-bioservices/tv-adp-office-hours.png",
  "/images/works/avid-bioservices/tv-benefits-office-hours.png",
  "/images/works/avid-bioservices/tv-new-hire-office-hours.png",
  "/images/works/avid-bioservices/tv-momentum-athletic-club.png",
  "/images/works/avid-bioservices/tv-go-observation-winners.png",
  "/images/works/avid-bioservices/tv-webinar-biologics-gmp.png",
  "/images/works/avid-bioservices/tv-earth-day.png",
  "/images/works/avid-bioservices/tv-abms-conference.png",
] as const;

/** Avid Bioservices — LinkedIn / social posts (`public/images/works/avid-bioservices/`). */
const AVID_SOCIAL_MEDIA = [
  "/images/works/avid-bioservices/social-white-paper-new-era-biologics.png",
  "/images/works/avid-bioservices/social-webinar-biologics-gmp.png",
  "/images/works/avid-bioservices/social-cell-line-dev-06.png",
  "/images/works/avid-bioservices/social-cell-line-dev-07.png",
  "/images/works/avid-bioservices/social-cell-line-dev-08.png",
  "/images/works/avid-bioservices/social-cell-line-dev-09.png",
  "/images/works/avid-bioservices/social-onshoring-white-paper.png",
  "/images/works/avid-bioservices/social-biosecure-white-paper.png",
  "/images/works/avid-bioservices/social-airway-early-phase-advantage.png",
  "/images/works/avid-bioservices/social-cdmo-capabilities-grid.png",
  "/images/works/avid-bioservices/social-early-phase-hexagons.png",
  "/images/works/avid-bioservices/social-early-phase-molecular.png",
  "/images/works/avid-bioservices/social-early-phase-pink-helices.png",
  "/images/works/avid-bioservices/social-early-phase-teal-gradient.png",
  "/images/works/avid-bioservices/social-grand-opening-boarding-pass.png",
  "/images/works/avid-bioservices/social-precision-every-molecule.png",
] as const;

/** Avid Bioservices — presentation / deck graphics (`public/images/works/avid-bioservices/`). */
const AVID_PRESENTATION_GRAPHICS = [
  "/images/works/avid-bioservices/graphics-presentation-avelocity-3-1.png",
  "/images/works/avid-bioservices/graphics-presentation-av-7.png",
  "/images/works/avid-bioservices/graphics-presentation-av-9.png",
  "/images/works/avid-bioservices/graphics-presentation-avelocity-8-1.png",
  "/images/works/avid-bioservices/graphics-presentation-avelocity-4-1.png",
  "/images/works/avid-bioservices/graphics-presentation-process-stages.png",
  "/images/works/avid-bioservices/graphics-presentation-stack.png",
] as const;

/** All assets in `public/images/munch'd/` — add a line here when you drop in new files. */
const MUNCHD_IMAGES = [
  "/images/munch'd/Beige%20Minimalist%20Hand%20Holding%20Phone%20Mockup%20Instagram%20Post.png",
  "/images/munch'd/Beige%20Minimalist%20Totebag%20Mockup%20Instagram%20Post%20(1).png",
  "/images/munch'd/Frame%202.png",
  "/images/munch'd/Frame%205.png",
] as const;

/** One page per munch'd asset — URLs `/works/munchd/{piece}` */
export const munchdPieces = [
  { piece: "phone", src: MUNCHD_IMAGES[0], title: "Phone mockup" },
  { piece: "totebag", src: MUNCHD_IMAGES[1], title: "Totebag mockup" },
  { piece: "frame-2", src: MUNCHD_IMAGES[2], title: "Frame 2" },
  { piece: "frame-5", src: MUNCHD_IMAGES[3], title: "Frame 5" },
] as const;

/** Red Water — project assets (`public/images/works/red-water/`). */
const RED_WATER_IMAGES = [
  "/images/works/red-water/red-water-01.png",
  "/images/works/red-water/red-water-02.png",
  "/images/works/red-water/red-water-03.png",
  "/images/works/red-water/red-water-04.png",
  "/images/works/red-water/red-water-05.png",
  "/images/works/red-water/red-water-06.png",
  "/images/works/red-water/red-water-07.png",
  "/images/works/red-water/red-water-08.png",
  "/images/works/red-water/red-water-09.png",
] as const;

export const illustrations: PortfolioItem[] = [
  { src: "/images/portfolio/piece-11.png", alt: "Monster House — Poster Design", slug: "monster-house", category: "Poster Design" },
  { src: "/images/portfolio/piece-20.png", alt: "Watergun Props — First Pass", slug: "watergun-props", category: "Prop Design" },
  { src: "/images/portfolio/piece-10.png", alt: "Town Square — Background Art", slug: "town-square", category: "Background Art" },
  { src: "/images/portfolio/piece-8.png", alt: "Her Car — Prop Page", slug: "her-car", category: "Prop Design" },
  { src: "/images/portfolio/sa01-1.png", alt: "Illustration SA01", slug: "sa01", category: "Illustration" },
  { src: "/images/portfolio/sa02-1.png", alt: "Illustration SA02", slug: "sa02", category: "Illustration" },
  { src: "/images/portfolio/sa03-1.png", alt: "Illustration SA03", slug: "sa03", category: "Illustration" },
  { src: "/images/portfolio/sa04-1.png", alt: "Illustration SA04", slug: "sa04", category: "Illustration" },
  { src: "/images/portfolio/sa05-1.png", alt: "Illustration SA05", slug: "sa05", category: "Illustration" },
];

export const works: WorkItem[] = [
  {
    src: "/images/works/avid-bioservices/hero.png",
    alt: "Avid Bioservices",
    slug: "avid-bioservices",
    title: "avid Bioservices",
    titleLogo: "/images/works/avid-bioservices/avid-logo.png",
    subtitle: "(see, i can do corporate too!)",
    description: "Avid Bioservices is a biotech company that produces biologics. I'm in charge with supplementing with their social media and branding. Creating posts for linkedin and work for their offices, as well as illustrations to make them stand out against their competitors",
    galleryImages: [...AVID_TV_SLIDES, ...AVID_SOCIAL_MEDIA, ...AVID_PRESENTATION_GRAPHICS],
    sections: [
      {
        type: "full-width",
        images: ["/images/works/avid-bioservices/hero.png"],
      },
      {
        type: "marquee",
        images: [...AVID_TV_SLIDES, ...AVID_SOCIAL_MEDIA, ...AVID_PRESENTATION_GRAPHICS],
      },
      {
        type: "masonry",
        label: "Social media content",
        images: [...AVID_SOCIAL_MEDIA],
      },
      {
        type: "masonry",
        label: "TV slides",
        images: [...AVID_TV_SLIDES],
      },
      {
        type: "masonry",
        label: "Graphics for presentations",
        images: [...AVID_PRESENTATION_GRAPHICS],
      },
    ],
  },
  {
    src: MUNCHD_IMAGES[0],
    alt: "munch'd — social mockups",
    slug: "munchd",
    title: "munch'd",
    subtitle: "",
    description: "",
    galleryImages: [...MUNCHD_IMAGES],
    galleryLinks: munchdPieces.map((p) => `/works/munchd/${p.piece}`),
    sections: [
      {
        type: "full-width",
        images: [...MUNCHD_IMAGES],
      },
      {
        type: "marquee",
        images: [...MUNCHD_IMAGES],
      },
      {
        type: "masonry",
        label: "mockups",
        images: [...MUNCHD_IMAGES],
      },
    ],
  },
  {
    src: "/images/works/red-water/hero.png",
    alt: "Red Water",
    slug: "red-water",
    title: "Red Water",
    titleLogo: "/images/works/red-water/red-water-logo.png",
    subtitle: "",
    description:
      "My role as a 2D Artist / Graphic Designer on Red Water, I developed visual assets that support both gameplay clarity and atmospheric storytelling in a Midwestern gothic horror setting.\n\nMy work focused on designing UI elements, including icons, interface components, and navigational maps, ensuring they felt intuitive while still grounded in the game's eerie, immersive tone. Beyond UI, I created 2D illustrative assets that helped reinforce the world-building, blending narrative detail with a cohesive visual language that ties the environment, lore, and player experience together.",
    galleryImages: [...RED_WATER_IMAGES],
    sections: [
      {
        type: "full-width",
        images: ["/images/works/red-water/hero.png"],
      },
      {
        type: "marquee",
        images: [...RED_WATER_IMAGES],
      },
      {
        type: "masonry",
        label: "Gallery",
        images: [...RED_WATER_IMAGES],
      },
    ],
  },
];
