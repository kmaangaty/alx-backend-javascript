export const weakMap = new WeakMap();

export function queryAPI(ep) {
  let mod = 0;
  if (weakMap.get(ep)) mod = weakMap.get(ep);
  weakMap.set(ep, mod + 1);
  if (mod + 1 >= 5) throw new Error('Endpoint load is high');
}
