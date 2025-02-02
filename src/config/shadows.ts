type Shadows = {
  [key: string]: string;
};

export const shadowsWithoutUnit: Shadows = {
  'button-light': '1px 1px 1px 1px rgba(0, 0, 0, 0.12)',
  'category-card-light': '0 7px 30px -2px rgba(0, 0, 0, 0.12)',
  'category-card-dark': '0px 20px 60px 10px #f6edee33',
  'avatar-menu-light': '0px 0px 2px 1px rgba(0, 0, 0, 0.12)',
  'product-card-light': '0 7px 30px -2px rgba(0, 0, 0, 0.1)',
};

export const shadows: Shadows = Object.fromEntries(
  Object.entries(shadowsWithoutUnit).map(([key, value]) => [key, value]),
) as Shadows;
