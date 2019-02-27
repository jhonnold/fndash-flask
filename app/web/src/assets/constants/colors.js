export const colors = {
  primary: '#22d900',
  lightGray: '#e6e6e6',
  mediumGray: '#cacaca',
  darkGray: '#272727',
  black: '#131313',
  white: '#fafafa',
  cardBack: '#1f1f1f',
};

export const toRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};
