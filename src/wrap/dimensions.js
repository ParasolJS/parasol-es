// parcoords wrapper: format dimensions 
const dimensions = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.dimensions(d));
    return this;
  };
export default dimensions;
