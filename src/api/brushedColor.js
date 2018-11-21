// wrapper function: set hex color of polylines within brush extents on specified charts
// default is to implement on all charts
const brushedColor = (config, ps, flags) =>
  function({ chartIDs=[...Array(ps.charts.length).keys()], color }) {
    ps.charts.forEach( (pc, i) => {
      if (chartIDs.includes(i)) {
        pc
          .brushedColor(color)
          .hideAxis(config.partition[i])
          .render()
          .updateAxes(0);
      }
    });
    return this;
  }
export default brushedColor;
