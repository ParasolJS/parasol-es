// parcoords wrapper: set hex color of polylines within brush extents
const brushedColor = (config, ps, flags) =>
  function(d) {
    ps.charts.forEach(pc => pc.brushedColor(d));
    return this;
  };
export default brushedColor;
