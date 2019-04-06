export default (a, b) => {
  if (!a.label) return -1;
  if (!b.label) return 1;
  if (a.label.toUpperCase() < b.label.toUpperCase()) {
    return -1;
  }
  if (a.label.toUpperCase() > b.label.toUpperCase()) {
    return 1;
  }
  return 0;
};
