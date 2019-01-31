// parcoords wrapper: set foreground alpha on all charts
const alpha = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.alpha(d));
    return this;
  };
export default alpha;
