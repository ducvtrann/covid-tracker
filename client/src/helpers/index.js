export const calculatePercentage = (newValue, oldValue) => {
  return ((newValue / oldValue - 1) * 100).toFixed(2);
};
