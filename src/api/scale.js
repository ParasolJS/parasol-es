// wrapper function: set the domain (and scale?) of a single axis on specified charts
// default is to implement on all charts
const scale = (config, ps, flags) =>
  function({ chartIDs=[...Array(ps.charts.length).keys()], axis, domain }) {
    const range = ps.charts[0].dimensions()[axis].yscale.domain();
    if (range[0] >= domain[0] && range[1] <= domain[1]) {
      ps.charts.forEach( (pc, i) => {
        if (chartIDs.includes(i)) {
          pc
            .scale(axis, domain)
            .hideAxis(config.partition[i])
            .render()
            .updateAxes(0);
        }
      });
    } else {
      throw Error('Domain Error: specified domain must be exceed axis domain.')
    }
    return this;
  }
export default scale;
