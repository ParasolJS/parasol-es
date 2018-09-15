/**
 * Keep only selected data update components
 *
 * @param selection: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: Any existing brushes or marks will be overwritten
 */
const keepSelection = (config, ps, flags) =>
  function(selection) {
    console.log('before:', config.data.length);

    // identify data
    let d = [];
    if (selection == 'brushed') {
      d = config.brushed;
    } else if (selection == 'marked') {
      d = config.marked;
    } else if (selection == 'both') {
      d = config.selections();
    } else {
      // throw error
    }
    console.log(d);

    if (d.length > 0) {
      // reset selections and update config
      ps.resetSelections();

      // update charts and grid
      ps.charts.forEach( pc => {
        pc.data(d).render.default();
        pc.brushReset();
      });
      if (config.grid) {
        console.log('here');
        // gridUpdate()
      }

      // update data
      config.data = d;
    } else {
      console.log('Error: No data selected.');
    }

    console.log('after:', config.data.length);
    return this;

  };

export default keepSelection;
