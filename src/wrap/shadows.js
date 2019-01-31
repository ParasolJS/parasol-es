// parcoords wrapper: enable shadows on all charts
const shadows = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.shadows(d));
    return this;
  };
export default shadows;
