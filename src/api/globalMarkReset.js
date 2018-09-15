// reset marks and preform necessary updates
const globalMarkReset = (config, ps, flags) => chartIDs => {
  if (config.grid) {
    // use slickgrid to unmark all data; fires event
    config.grid.setSelectedRows([]);
    config.marked = [];
  } else if(Array.isArray(chartIDs)) {
    // reset marks in listed chats
    chartIDs.forEach( i => {
      if(ps.charts[i]) {
        ps.charts[i].unmark();
      }
    })
  }
};

export default globalMarkReset;
