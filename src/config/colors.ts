type ColorShades = {
  DEFAULT: string;
  [key: number]: string;
  hover?: string;
};

type Colors = {
  [key: string]: ColorShades;
};

const colors: Colors = {
  crimson: {
    DEFAULT: "#c1322f",
    100: "#d05454",
    200: "#d97a7a",
    300: "#de9f9f",
    400: "#e4c4c4",
    500: "#ebdddd",
    hover: "#d05454",
  },
  blue: {
    DEFAULT: "#007BFF",
    100: "#cce4ff",
    200: "#99c9ff",
    300: "#66adff",
    400: "#3392ff",
    500: "#007BFF",
    600: "#0069e1",
    700: "#0058c3",
    800: "#0046a5",
    900: "#003387",
    hover: "#3392ff",
  },
  emerald: {
    DEFAULT: "#005957",
    50: "#13b093",
    100: "#006f68",
    200: "#00827f",
    300: "#009493",
    400: "#00a7a8",
    500: "#00bcb1",
    hover: "#006f68",
  },
  dark: {
    DEFAULT: "#292929",
    100: "#e5e5e5",
    200: "#cccccc",
    300: "#b2b2b2",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4d4d4d",
    800: "#333333",
    900: "#1a1a1a",
    hover: "#6a6a6a",
  },
  white: {
    DEFAULT: "#f5f3eb",
    100: "#ffffff",
    200: "#e8e5d7",
    300: "#d9d2be",
    400: "#cbc0a6",
    500: "#faf7f2",
    hover: "#f5f3eb",
  },
  yellow: {
    DEFAULT: "#f7a825",
    100: "#f9c85b",
    200: "#f9d95f",
    300: "#f7e54d",
    400: "#f7ec8b",
    500: "#ffb307",
    hover: "#f9c85b",
  },
  facebook: {
    DEFAULT: "#3b5998",
  },
  google: {
    DEFAULT: "#dc4e41",
  },
};

type ColorClass = string;

const colorMap: ColorClass[] = Object.keys(colors).reduce(
  (map: ColorClass[], color: string) => {
    const shades = Object.keys(colors[color as keyof Colors]);
    shades.forEach((shade: string) => {
      const className = shade === "DEFAULT" ? color : `${color}-${shade}`;
      map.push(className);
    });
    return map;
  },
  []
);

const bgColorSafelist: string[] = colorMap.map(
  (colorClass: ColorClass) => `bg-${colorClass}`
);
const textColorSafelist: string[] = colorMap.map(
  (colorClass: ColorClass) => `text-${colorClass}`
);
const borderColorSafelist: string[] = colorMap.map(
  (colorClass: ColorClass) => `border-${colorClass}`
);
const hoverBgColorSafelist: string[] = colorMap.map(
  (colorClass: ColorClass) => `hover:bg-${colorClass}`
);
const hoverTextColorSafelist: string[] = colorMap.map(
  (colorClass: ColorClass) => `hover:text-${colorClass}`
);
const hoverBorderColorSafelist: string[] = colorMap.map(
  (colorClass: ColorClass) => `hover:border-${colorClass}`
);

export {
  colors,
  bgColorSafelist,
  textColorSafelist,
  borderColorSafelist,
  hoverBgColorSafelist,
  hoverTextColorSafelist,
  hoverBorderColorSafelist,
};
