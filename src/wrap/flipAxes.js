// parcoords wrapper: flip listed axes on all charts
const flipAxes = (config, ps, flags) =>
  function(axes) {
    ps.charts.forEach(pc => pc.flipAxes(axes));
    return this;
  };
export default flipAxes;
