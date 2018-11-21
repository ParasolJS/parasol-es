// wrapper function: set polyline hex color on specified charts
// default is to implement on all charts
const color = (config, ps, flags) =>
  function({ chartIDs=[...Array(ps.charts.length).keys()], color }) {
    ps.charts.forEach( (pc, i) => {
      if (chartIDs.includes(i)) {
        pc
          .color(color)
          .hideAxis(config.partition[i])
          .render()
          .updateAxes(0);
      }
    });
    return this;
  }
export default color;
