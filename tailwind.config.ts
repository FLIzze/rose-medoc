import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'very-light-pink': '#fcf5f5',
      'light-pink': '#F4C2C5',
      'medium-pink': '#DF8685',
      'dark-pink': '#813843',
      'white': '#FFFFFF',
      'gray': '#453d3e',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|blue|green|yellow|purple|pink|indigo|gray)-700/,
      variants: ['bg-opacity-10', 'hover:bg-opacity-15'],
    },
    {
      pattern: /border-l-(red|blue|green|yellow|purple|pink|indigo|gray)-700/,
    },
    {
      pattern: /text-(red|blue|green|yellow|purple|pink|indigo|gray)-700/,
    },
    {
      pattern: /h-\d+/,
    },
  ],
};
export default config;
