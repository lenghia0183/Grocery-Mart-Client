export const createTailwindClass = (prefix: string, colors: string): string => {
  if (!colors.trim()) return '';

  const colorArray = colors.split(' ');

  const classNames = colorArray.map((color) => {
    const [modifier, baseColor] = color.includes(':') ? color.split(':') : [null, color];
    if (baseColor === '') {
      return '';
    }
    return modifier ? `${modifier}:${prefix}-${baseColor}` : `${prefix}-${color}`;
  });

  return classNames.join(' ');
};

export default createTailwindClass;
