// TODO: add documentation info here

// reset marks and preform necessary updates
const globalMarkReset = (config, ps, flags) => charts => {
  if (config.grid) {
    // use slickgrid to unmark all data; fires event
    config.grid.setSelectedRows([]);
    config.marked = [];
  } else if (Array.isArray(charts)) {
    // reset marks in provided charts
    charts.forEach(pc => {
      pc.unmark();
    });
  }
};

export default globalMarkReset;
