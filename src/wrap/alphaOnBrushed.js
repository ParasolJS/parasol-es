// parcoords wrapper: set foreground alpha when brushes exist
const alphaOnBrushed = (config, ps, flags) => function(d) {
  ps.charts.forEach( pc => pc.alphaOnBrushed(d) );
  return this;
}
export default alphaOnBrushed;
