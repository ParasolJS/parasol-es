import sync from './sync';

/**
   * Link brush activity between specified charts, and grid if it exists.
   *
   * @param {array} chartIDs:   charts to be linked (defaults to all).
**/
const linked = (config, ps, flags) =>
  function(chartIDs = [...Array(ps.charts.length).keys()]) {
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

        // refresh grid if brushes are applied
        if (config.brushed.length) {
          ps.gridUpdate();
        }
      });

    };

    return this;
  };

export default linked;
