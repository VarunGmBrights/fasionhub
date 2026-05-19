/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        cream: {
          50: "#FDFCFA",
          100: "#FAF8F5",
          200: "#F5F0E8",
          300: "#EDE5D8",
        },
        gold: {
          light: "#D4B896",
          DEFAULT: "#BFA882",
          dark: "#8B7355",
        },
        charcoal: {
          light: "#4A4A4A",
          DEFAULT: "#1A1A1A",
          dark: "#0A0A0A",
        },
        blush: "#F2B8B0",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        shimmer: "shimmer 1.5s infinite",
        "slide-in": "slideIn 0.3s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.12)",
        gold: "0 4px 24px rgba(191,168,130,0.3)",
      },
    },
  },
  plugins: [],
};
