// wrapper function: set foreground alpha on specified charts
// default is to implement on all charts
const alpha = (config, ps, flags) =>
  function({ chartIDs=[...Array(ps.charts.length).keys()], alpha }) {
    ps.charts.forEach( (pc, i) => {
      if (chartIDs.includes(i)) {
        pc
          .alpha(alpha)
          .hideAxis(config.partition[i])
          .render()
          .updateAxes(0);
      }
    });
    return this;
  }
export default alpha;
