const formatNumber = (num?: number, decimalPlaces: number = 2, returnAsString: boolean = false): number | string => {
  if (num === undefined || num === null || !Number.isFinite(num)) {
    return returnAsString ? '0.00' : 0;
  }

  const factor = Math.pow(10, decimalPlaces);
  const rounded = Math.round(num * factor) / factor;

  return returnAsString ? rounded.toFixed(decimalPlaces) : rounded;
};

export default formatNumber;
