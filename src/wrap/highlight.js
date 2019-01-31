// parcoords wrapper: highlight a data element
const highlight = (config, ps, flags) => d => {
  ps.charts.forEach(pc => pc.highlight(d));
};
export default highlight;
