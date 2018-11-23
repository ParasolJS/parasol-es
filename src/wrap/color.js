// parcoords wrapper: set polyline hex color on all charts
const color = (config, ps, flags) => function(d) {
  ps.charts.forEach( pc => pc.color(d) );
  return this;
}
export default color;
