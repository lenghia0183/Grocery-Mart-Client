import type { Config } from "tailwindcss";
import { breakpoints } from "./src/config/breakpoints";
import {
  colors,
  bgColorSafelist,
  textColorSafelist,
  borderColorSafelist,
  hoverBgColorSafelist,
  hoverTextColorSafelist,
  hoverBorderColorSafelist,
} from "./src/config/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...textColorSafelist,
    ...borderColorSafelist,
    ...bgColorSafelist,
    ...hoverBgColorSafelist,
    ...hoverTextColorSafelist,
    ...hoverBorderColorSafelist,
  ],

  darkMode: "selector",
  theme: {
    screen: {
      screens: {
        ...breakpoints,
      },
    },

    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
} satisfies Config;
