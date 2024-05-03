const groceriesList = () => {
  const tsr = new Map();
  const obs = {
    Apples: 10,
    Tomatoes: 10,
    Pasta: 1,
    Rice: 1,
    Banana: 5,
  };
  for (const key of Object.keys(obs)) {
    tsr.set(key, obs[key]);
  }
  return tsr;
};

export default groceriesList;
