// parcoords wrapper: set composite mode on all charts
const composite = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.composite(d));
    return this;
  };
export default composite;
