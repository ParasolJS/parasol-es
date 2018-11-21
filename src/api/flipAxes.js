// wrapper function: flip listed axes on specified charts
// default is to implement on all charts
const flipAxes = (config, ps, flags) =>
  function({ chartIDs=[...Array(ps.charts.length).keys()], axes }) {
    ps.charts.forEach( (pc, i) => {
      if (chartIDs.includes(i)) {
        pc
          .flip(axes)
          .hideAxis(config.partition[i])
          .render()
          .updateAxes(0);
      }
    });
    return this;
  }
export default flipAxes;
