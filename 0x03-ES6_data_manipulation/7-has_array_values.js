const hasValuesFromArray = (cat, ars) => {
  for (const i of ars) {
    if (!cat.has(i)) {
      return false;
    }
  }
  return true;
};

export default hasValuesFromArray;
