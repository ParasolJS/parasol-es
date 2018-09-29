const as_float = x => {
  const converted = parseFloat(x);
  return isNaN(converted) ? x : converted;
};

export default as_float;
