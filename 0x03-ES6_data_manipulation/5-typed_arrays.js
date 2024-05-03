export default function createInt8TypedArray(ln, psn, val) {
  if (psn < 0 || psn >= ln) {
    throw Error('Position outside range');
  }
  const buff = new ArrayBuffer(ln);
  const ie = new Int8Array(buff, 0, ln);
  ie.set([val], psn);
  return new DataView(buff);
}
