import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "light-gray": "#303640",
        seconds: "rgba(6, 252, 63, 1)",
        minutes: "rgba(252, 230, 0, 1)",
        hours: "rgba(253, 41, 112, 1)",
      },
      fontFamily: {
        body: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
