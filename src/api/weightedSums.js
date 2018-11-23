import normalize from '../util/normalize';
import format_data from '../util/format_data';
import arr from '../util/arr_stats';
import add_column from '../util/add_column';

/**
 * Compute individual weighted sums for each solution based on
 * user specified weights.
 *
 * @param {object} weights: specify weight of each variable, unspecified variables will be assigned weight 0
 * @param {array} displayIDs: charts that will display 'weighted sum' variable; defaults to all charts
 * @param {bool} norm: normalize values (0-1) to obtain fair weighting
 */
const weightedSums = (config, ps, flags) =>
  function({
    weights,
    displayIDs = [...Array(ps.charts.length).keys()],
    norm = true
  }) {
    // NOTE: if data is re-scored, old score will not affect new score unless it is given a weight itself in the 'weights' object

    // force numeric type for indexing
    displayIDs = displayIDs.map(Number);

    let data = [];
    if (norm === true) {
      data = normalize(config.data);
    } else {
      data = config.data;
    }

    // compute initial weight for each data element
    const row_totals = [];
    data.forEach((d, i) => {
      let d_weight = 0;
      Object.entries(d).forEach(
        // find cumulative sum of weight times value
        ([key, val]) => {
          if (weights[key]) {
            d_weight += val * weights[key];
          }
        }
      );
      data[i].score = d_weight;
      row_totals.push(d_weight);
    });

    // normalize all values against total weight and assign values
    const extents = arr.extents(row_totals);
    data.forEach((d, i) => {
      config.data[i]['weighted sum'] = (
        (d.score - extents[0]) /
        (extents[1] - extents[0])
      ).toString();
    });

    // partition scores var on charts
    Object.keys(config.partition).forEach( i => {
      if (!displayIDs.includes(Number(i))) {
        // chart not in displayIDs, hidden on this chart
        config.partition[Number(i)].push('weighted sum');
      }
    });

    // weighted sums are ready, update data and charts
    config.vars.push('weighted sum')
    console.log(config.vars);
    config.data = format_data(config.data);
    ps.charts.forEach( (pc, i) => {
      pc
        .data(config.data)
        .hideAxis(config.partition[i])
        .render()
        .createAxes();
      // .updateAxes();
    });
    // NOTE: need to maintain current state of charts somehow

    if (flags.grid) {
      // add column
      const cols = add_column(config.grid.getColumns(), 'weighted sum');
      ps.gridUpdate({ columns: cols });
    }

    return this;
  };

export default weightedSums;
