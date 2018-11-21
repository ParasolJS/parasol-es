// wrapper function: set foreground alpha when brushes exist on specified charts
// default is to implement on all charts
const alphaOnBrushed = (config, ps, flags) =>
  function({
    chartIDs=[...Array(ps.charts.length).keys()],
    alpha
    }) {
      ps.charts.forEach( (pc, i) => {
        if (chartIDs.includes(i)) {
          pc
            .alphaOnBrushed(alpha)
            .hideAxis(config.partition[i])
            .render()
            .updateAxes(0);
        }
      });
      return this;
  }
export default alphaOnBrushed;
