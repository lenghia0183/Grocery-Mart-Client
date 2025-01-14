export const createTailwindClass = (prefixes: string | string[] = 'text', colors: string | string[]): string => {
  const colorArray = Array.isArray(colors) ? colors : [colors];
  const prefixArray = Array.isArray(prefixes) ? prefixes : [prefixes];

  const classNames = colorArray.map((color, index) => {
    if (color && prefixArray[index]) return `${prefixArray[index]}-${color}`;
  });
  return classNames.join(' ');
};

export default createTailwindClass;
