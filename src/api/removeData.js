import { difference } from 'lodash-es';

/**
 * Remove selected data and components
 *
 * @param data: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: Any existing brushes or marks will be overwritten
 */
const removeData = (config, ps, flags) =>
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
    d = difference(config.data, d);

    if (d.length > 0 && d.length < config.data.length) {
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

export default removeData;
