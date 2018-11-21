// wrapper function: set composite mode on specified charts
// default is to implement on all charts
const composite = (config, ps, flags) =>
  function({ chartIDs=[...Array(ps.charts.length).keys()], mode }) {
    ps.charts.forEach( (pc, i) => {
      if (chartIDs.includes(i)) {
        pc
          .composite(mode)
          .hideAxis(config.partition[i])
          .render()
          .updateAxes(0);
      }
    });
    return this;
  }
export default composite;
