// parcoords wrapper: set bundle dimension on all charts
const bundleDimension = (config, ps, flags) => function(d) {
  ps.charts.forEach( pc => pc.bundleDimension(d) );
  return this;
}
export default bundleDimension;
