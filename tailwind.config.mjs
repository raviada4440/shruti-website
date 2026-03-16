/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFDF8",
          100: "#FFF8ED",
          200: "#FFF1D6",
          300: "#FFE8BD",
          400: "#FFDEA3",
        },
        sage: {
          300: "#B8C4A0",
          400: "#9AAF7C",
          500: "#7A9455",
          600: "#5E7340",
          700: "#465632",
          800: "#2E3A21",
        },
        warmgold: {
          300: "#D4B878",
          400: "#C4A45A",
          500: "#A8893E",
          600: "#8A6E2F",
          700: "#6B5524",
        },
        charcoal: {
          700: "#3D3D3D",
          800: "#2A2A2A",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        display: ['"Gilda Display"', "serif"],
        body: ['"PT Serif"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "logo-reveal": "logoReveal 1.5s ease-out forwards",
        "hero-fade": "heroFade 1s ease-out 1.2s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        logoReveal: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        heroFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
