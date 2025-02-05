const formatCurrency = (amount: number | null | undefined): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '';
  }

  const formattedAmount = new Intl.NumberFormat('vi-VN').format(amount);

  return `${formattedAmount} đ`;
};

export default formatCurrency;
