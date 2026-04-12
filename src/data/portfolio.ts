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
  subtitle: string;
  description: string;
  sections: WorkSection[];
}

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
    subtitle: "(see, i can do corporate too!)",
    description: "Avid Bioservices is a biotech company that produces biologics. I'm in charge with supplementing with their social media and branding. Creating posts for linkedin and work for their offices, as well as illustrations to make them stand out against their competitors",
    sections: [
      {
        type: "full-width",
        images: ["/images/works/avid-bioservices/webinar-slide.png"],
      },
      {
        type: "marquee",
        images: [
          "/images/works/avid-bioservices/new-hire-office-hours.png",
          "/images/works/avid-bioservices/momentum-athletic.png",
          "/images/works/avid-bioservices/benefits-office-hours.png",
          "/images/works/avid-bioservices/go-observation.png",
        ],
      },
      {
        type: "masonry",
        label: "presentation designs",
        images: [
          "/images/works/avid-bioservices/protein-cover.png",
          "/images/works/avid-bioservices/av7.png",
          "/images/works/avid-bioservices/avelocity-2.png",
          "/images/works/avid-bioservices/avelocity-1.png",
        ],
      },
    ],
  },
  {
    src: "/images/portfolio/piece-10.png",
    alt: "Town Square — Background Art",
    slug: "town-square",
    title: "Town Square",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/piece-11.png",
    alt: "Monster House — Poster Design",
    slug: "monster-house",
    title: "Monster House",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/piece-20.png",
    alt: "Watergun Props — First Pass",
    slug: "watergun-props",
    title: "Watergun Props",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/piece-8.png",
    alt: "Her Car — Prop Page",
    slug: "her-car",
    title: "Her Car",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/sa06-1.png",
    alt: "Project SA06",
    slug: "sa06",
    title: "Project SA06",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/sa07-1.png",
    alt: "Project SA07",
    slug: "sa07",
    title: "Project SA07",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/sa09-1.png",
    alt: "Project SA09",
    slug: "sa09",
    title: "Project SA09",
    subtitle: "",
    description: "",
    sections: [],
  },
  {
    src: "/images/portfolio/sa10-1.png",
    alt: "Project SA10",
    slug: "sa10",
    title: "Project SA10",
    subtitle: "",
    description: "",
    sections: [],
  },
];
