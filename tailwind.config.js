/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#ffffff",
        "second-color": "#F5F6F6",
        "third-color": "#003D29",
        "fourth-color": "#FBF0E4",
      },
    },
  },
  plugins: [],
};
