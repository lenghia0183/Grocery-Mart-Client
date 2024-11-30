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
    500: "#77dae6",
    hover: "#66b8e1",
  },

  yellow: {
    DEFAULT: "#ffb700",
    500: "#ffb700",
    hover: "#ffa700",
  },

  dark: {
    DEFAULT: "#292e39", // Màu tối nhất
    100: "#171c28", // Màu tối
    200: "#171c28", // Màu tối
    300: "#292e39", // Màu tối
    400: "#171c28", // Màu tối
    500: "#171c28", // Màu tối nhất
    hover: "#292e39", // Hover color
  },

  gray: {
    DEFAULT: "#d2d1d6", // Màu xám sáng nhất
    100: "#f5f5f5", // Màu xám sáng nhẹ
    200: "#eeeeee", // Màu xám sáng
    300: "#d2d1d6", // Màu xám trung bình
    400: "#a4a5ad", // Màu xám trung bình
    500: "#9e9da8", // Màu xám tối
    hover: "#b9babe", // Hover color (xám nhạt)
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
