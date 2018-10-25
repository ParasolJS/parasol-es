// reset marks and preform necessary updates
const globalMarkReset = (config, ps, flags) => charts => {
  if (flags.grid) {
    config.grid.setSelectedRows([]);
    ps.gridUpdate();
  }
  if(Array.isArray(charts)) {
    // reset marks in provided charts
    charts.forEach( pc => pc.unmark() );
    config.marked = [];
  }
};

export default globalMarkReset;
