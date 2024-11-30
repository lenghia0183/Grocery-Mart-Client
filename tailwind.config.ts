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
  colors: {
    ...colors,
  },
  darkMode: "selector",
  theme: {
    screen: {
      screens: {
        ...breakpoints,
      },
    },

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
