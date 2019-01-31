/**
 * Keep only selected data update components
 *
 * @param data: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: Any existing brushes or marks will be overwritten
 */
const keepData = (config, ps, flags) =>
  function(data) {
    // identify data
    let d = [];
    if (data == 'brushed') {
      d = config.brushed;
    } else if (data == 'marked') {
      d = config.marked;
    } else if (data == 'both') {
      d = config.selections();
    } else {
      throw "Please specify one of {'brushed', 'marked', 'both'}";
    }

    if (d.length > 0) {
      // reset selections and update config
      ps.resetSelections('both');

      // update data, charts, and grid
      config.data = d;
      ps.charts.forEach(pc => {
        pc.data(d).render.default();
        pc.brushReset();
      });
      if (flags.grid) {
        ps.gridUpdate();
      }
    } else {
      throw 'Error: No data selected.';
    }

    return this;
  };

export default keepData;
