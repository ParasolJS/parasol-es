import sync from './sync';

// link brush activity between user specified charts, and grid if it exists
const linked = (config, ps, flags) =>
  function(chartIDs = []) {
    if(chartIDs.length == 0) {
      chartIDs = Object.keys(config.partition);
    }
    // force numeric type for indexing
    chartIDs = chartIDs.map(Number);

    // setup linked components
    ps.linked = [];
    chartIDs.forEach( (i, j) => {
      ps.linked[j] = ps.charts[i];
    });

    ps.linked.forEach( pc => {
      pc.on('brush', sync(config, ps, flags));
    });

    // connect grid
    if (flags.grid) {

      // highlight row in chart
      config.grid.onMouseEnter.subscribe((e, args) => {
        let i = config.grid.getCellFromEvent(e).row;
        const d = config.dataView.getItems() || config.data;
        ps.linked.forEach(pc => {
          pc.highlight([d[i]]);
        });
      });
      config.grid.onMouseLeave.subscribe((e, args) => {
        ps.linked.forEach(pc => {
          pc.unhighlight();
        });
      });

      // mark row in chart
      config.grid.onSelectedRowsChanged.subscribe((e, args) =>  {
        // reset and update selected rows
        const selected_row_ids = config.grid.getSelectedRows();
        // NOTE: want to remove row from grid when unselected if not in brush extents
        const d = config.dataView.getItems() || config.data;
        ps.linked.forEach(pc => {
          pc.unmark();
        });
        selected_row_ids.forEach( i => {
          ps.linked.forEach(pc => {
            pc.mark([d[i]]);
          });
        });

        // update marked data
        config.marked = ps.linked[0].marked();
      });

    };

    return this;
  };

export default linked;
