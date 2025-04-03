/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003366", // CACC blue
          dark: "#002244",
          light: "#004488",
        },
        secondary: {
          DEFAULT: "#FF6600", // CACC orange
          dark: "#CC5500",
          light: "#FF8833",
        },
        background: "#F8F9FA",
        foreground: "#1A1A1A",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 