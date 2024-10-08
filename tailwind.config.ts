import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'very-light-pink': '#f7ebeb',
      'light-pink': '#F4C2C5',
      'medium-pink': '#DF8685',
      'dark-pink': '#813843',
      'white': '#FFFFFF',
      'gray': '#453d3e',
      'red': '#d22e2e',
      'black': '#000000',
      'green': '#2e8d2e',
    },
    extend: {
      backgroundImage: {
        "logo": "url('/logo.png')",
      },
    },
  },
  plugins: [],
  type: "module"
};
export default config;
