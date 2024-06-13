import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oatmeal: "#F3F7EC",
        normal: "#000000", // black
        normal_hover: "#3f3f46", // zinc-700
        critical: "#b91c1c", // red-700
        critical_hover: "#ef4444", // red-500
        warning: "#fb923c", // orange-400

        "disabled-bg": "#d1d5db", // gray-300 color
        "disabled-text": "#9ca3af", // gray-400 color
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
export default config;
