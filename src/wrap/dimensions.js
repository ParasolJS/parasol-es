// parcoords wrapper: format dimensions (applies to all charts)
const dimensions = (config, ps, flags) => function(d) {
  ps.charts.forEach( pc => pc.dimensions(d) );
  return this;
}
export default dimensions;
