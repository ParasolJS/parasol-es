// parcoords wrapper: set bundling smoothness on all charts
const smoothness = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.smoothness(d));
    return this;
  };
export default smoothness;
