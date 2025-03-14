/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",

      "3xl": "1792px",

      "4xl": "2048px",
    },

    extend: {
      colors: {
        dark: {
          100: "#0a0a0a",
          200: "#1A1A1A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
};
