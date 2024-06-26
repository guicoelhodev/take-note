import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ".bg-secondary": {
            "background-color": "#f3f3f3",
          },
          ".text-color": {
            color: "#36bc97",
          },
          ".editor-placeholder::before": {
            color: "#36bc97",
            content: "attr(data-placeholder)",
          },
          primary: "#36bc97",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ".bg-secondary": {
            "background-color": "#282d35",
          },
          ".text-color": {
            color: "#38eab9",
          },
          ".editor-placeholder::before": {
            color: "#38eab9",
            content: "attr(data-placeholder)",
          },
          primary: "#38eab9",
        },
      },
    ],
  },
};
export default config;
