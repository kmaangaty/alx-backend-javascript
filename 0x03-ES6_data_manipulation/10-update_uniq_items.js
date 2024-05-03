const updateUniqueItems = (kar) => {
  if (kar instanceof Map) {
    for (const [k, v] of kar.entries()) {
      if (v === 1) {
        kar.set(k, 100);
      }
    }
    return kar;
  }
  throw new Error('Cannot process');
};

export default updateUniqueItems;
