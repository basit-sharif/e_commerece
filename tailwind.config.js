/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryWhite: "#FFECE3",
        cat1: "#D6D6D8",
        cat2:"#212121",
        cat3:"#EFE1C7",
        cat4:"#D7D7D9",
        opacityDownColor: "#ffffffba"
      }
    },
  },
  plugins: [],
}
