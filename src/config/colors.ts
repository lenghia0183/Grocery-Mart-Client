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
    // Đã có trước
    DEFAULT: '#77dae6',
    100: '#f7faff', // Đã có trước
    200: '#efeff7', // Đã có trước
    300: '#4863a9', // Màu mới
    400: '#66b8e1', // Đã có trước
    500: '#0a58ca', // Đã có trước
    hover: '#66b8e1', // Đã có trước
  },

  yellow: {
    // Đã có trước
    DEFAULT: '#ffb700',
    100: '#fff8e1', // Màu mới
    200: '#ffecb3', // Màu mới
    300: '#ffe082', // Màu mới
    400: '#fcc63d', // Đã có trước
    500: '#ffb700', // Đã có trước
    hover: '#ffa700', // Đã có trước
  },

  dark: {
    // Đã có trước
    DEFAULT: '#292e39',
    100: '#e0e0e0', // Màu mới
    200: '#bdbdbd', // Màu mới
    300: '#808080', // Màu mới
    400: '#171c28', // Màu mới
    500: '#292e39', // Đã có trước
    600: '#020617',
    hover: '#171c28', // Đã có trước
  },

  white: {
    // Đã có trước
    DEFAULT: '#FFFFFF',
    100: '#f9f9f9', // Màu mới
    200: '#f0f0f0', // Màu mới
    300: '#e0e0e0', // Màu mới
    400: '#b9babe', // Đã có trước
    500: '#FFFFFF', // Đã có trước
  },

  gray: {
    // Đã có trước
    DEFAULT: '#d2d1d6',
    100: '#f9f9f9', // Màu mới
    200: '#c9cbcd', // Màu mới
    300: '#d2d1d6', // Đã có trước
    400: 'rgb(210, 202, 202, 0.65)', // Đã có trước
    500: '#9e9da8', // Đã có trước
    600: '#dcd7d7',
  },

  red: {
    // Đã có trước
    DEFAULT: '#f44336',
    100: '#ffebee', // Màu mới
    200: '#ffcdd2', // Màu mới
    300: '#ef9a9a', // Màu mới
    400: '#f44336', // Đã có trước
    500: '#d32f2f', // Đã có trước
    hover: '#d32f2f', // Đã có trước
  },
};

type ColorClass = string;

const colorMap: ColorClass[] = Object.keys(colors).reduce((map: ColorClass[], color: string) => {
  const shades = Object.keys(colors[color as keyof Colors]);
  shades.forEach((shade: string) => {
    const className = shade === 'DEFAULT' ? color : `${color}-${shade}`;
    map.push(className);
  });
  return map;
}, []);

const bgColorSafelist: string[] = colorMap.flatMap((colorClass: ColorClass) => [
  `bg-${colorClass}`,
  `dark:bg-${colorClass}`,
]);

const textColorSafelist: string[] = colorMap.flatMap((colorClass: ColorClass) => [
  `text-${colorClass}`,
  `dark:text-${colorClass}`,
]);

const borderColorSafelist: string[] = colorMap.flatMap((colorClass: ColorClass) => [
  `border-${colorClass}`,
  `dark:border-${colorClass}`,
]);

const hoverBgColorSafelist: string[] = colorMap.flatMap((colorClass: ColorClass) => [
  `hover:bg-${colorClass}`,
  `dark:hover:bg-${colorClass}`,
]);

const hoverTextColorSafelist: string[] = colorMap.flatMap((colorClass: ColorClass) => [
  `hover:text-${colorClass}`,
  `dark:hover:text-${colorClass}`,
]);

const hoverBorderColorSafelist: string[] = colorMap.flatMap((colorClass: ColorClass) => [
  `hover:border-${colorClass}`,
  `dark:hover:border-${colorClass}`,
]);

export {
  colors,
  bgColorSafelist,
  textColorSafelist,
  borderColorSafelist,
  hoverBgColorSafelist,
  hoverTextColorSafelist,
  hoverBorderColorSafelist,
};
