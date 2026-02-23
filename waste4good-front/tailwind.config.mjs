// tailwind.config.mjs
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./general-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: ["Geist", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
