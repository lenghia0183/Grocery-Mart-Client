type ColorShades = {
  DEFAULT: string;
  [key: number]: string;
  hover?: string;
};

type Colors = {
  [key: string]: ColorShades;
};

const colors: Colors = {
  blue: {
    DEFAULT: "#77dae6",
    100: "#f7faff",
    200: "#efeff7",
    300: "#77dae6",
    500: "#0a58ca",
    hover: "#66b8e1",
  },

  yellow: {
    DEFAULT: "#ffb700",
    500: "#ffb700",
    hover: "#ffa700",
  },

  dark: {
    DEFAULT: "#292e39",
    100: "#171c28",
    200: "#171c28",
    300: "#292e39",
    400: "#171c28",
    500: "#171c28",
    hover: "#292e39",
  },

  white: {
    DEFAULT: "#FFFFFF",
    400: "#b9babe",
    500: "#FFFFFF",
  },

  gray: {
    DEFAULT: "#d2d1d6",
    400: "#d2d1d6",
    500: "#9e9da8",
  },

  red: {
    DEFAULT: "#f44336",
    500: "#f44336",
    hover: "#d32f2f",
    400: "#f44336",
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
