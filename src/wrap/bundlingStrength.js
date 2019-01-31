// parcoords wrapper: set bundling strength on all charts
const bundlingStrength = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.bundlingStrength(d));
    return this;
  };
export default bundlingStrength;
