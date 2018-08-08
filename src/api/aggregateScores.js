import normalize from '../util/normalize';
import format_data from '../util/format_data';
import arr from '../util/arr_stats';

/**
* Compute individual aggregate scores for each solution based on
* user specified weights
*
* @param weights object specififying weight of each variable, unspecified variables will be assigned weight 0
* @param chartList charts that will display 'aggregate score' variable
*/
const aggregateScores = (config, ps, flags) => function(
	weights,
	chartList = ps.charts
) {

	// NOTE: if data is re-scored, old score will not affect new score unless it is given a weight itself in the 'weights' object
	let data = normalize(config.data);

  // compute initial weight for each data element
  const row_totals = [];
  data.forEach( (d, i) => {
    let d_weight = 0;
    Object.entries(d).forEach(
      // find cumulative sum of weight times value
      ([key, val]) =>  {
        if(weights[key]) {
          d_weight += val * weights[key];
        };
    });
    data[i].score = d_weight;
    row_totals.push(d_weight)
  });

  // normalize all values against total weight and assign values
  const extents = arr.extents(row_totals);
  data.forEach( (d, i) => {
    config.data[i]['aggregate score'] = ((d.score-extents[0])/(extents[1]-extents[0])).toString();
  });

  // aggregate scores are ready, update data and charts
	config.data = format_data(config.data);
	ps.charts.forEach( pc => {
		pc
			.data(config.data)
		  // .hideAxis(config.hidden)
			.render()
			.createAxes()
		  // .updateAxes();
	});
	// NOTE: partition 'aggregateScore' only to charts in chartList
	// NOTE: need to maintain current state of charts somehow

  // if (flags.grid) {
	//   // rebuild the grid
	//   ps.attachGrid();
	//   ps.gridUpdate();
	// }

  return this;
};

export default aggregateScores;
