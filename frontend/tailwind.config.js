/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          // "primary" now points to the variable, not a hex code
          primary: "hsl(var(--primary) / <alpha-value>)",
          secondary: "hsl(var(--secondary) / <alpha-value>)",
          background: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
        },
        fontFamily: {
          sans: ["var(--font-sans)", "sans-serif"],
        },
      },
    },
    plugins: [],
  };