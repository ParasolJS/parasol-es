// parcoords wrapper: reset all marks and preform necessary updates
const unmark = (config, ps, flags) => () => {
  ps.charts.forEach( pc => pc.unmark() );
  config.marked = [];
  if (flags.grid) {
    config.grid.setSelectedRows([]);
    ps.gridUpdate();
  }
};

export default unmark;
