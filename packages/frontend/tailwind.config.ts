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
      },
    },
  },
  plugins: [],
};
export default config;
