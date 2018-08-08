import normalize from '../util/normalize';
import arr from '../util/arr_stats';

/**
* Compute individual aggregate scores for each solution based on
* user specified weights
*
* @param weights object specififying weight of each variable, unspecified variables will be assigned weight 0
* @param chartList charts that will display 'aggregate score' variable
*/
const aggregateScore = (config, ps, flags) => (
	weights,
	chartList = ps.charts
) => {

	const data = normalize(config.data);

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

  // normalize all values against total weight and assign
  const extents = arr.extents(row_totals);
  data.forEach( (d, i) => {
    config.data[i]['aggregateScore'] = ((d.score-extents[0])/(extents[1]-extents[0])).toString();
  });
  console.log(config.data);

  // NOTE: partition 'aggregateScore' only to charts in chartList

  // NOTE: determine why cols config.data does not technically show aggScore var

  // aggregate scores are ready, update data and charts
	ps.charts.forEach( pc => {
		pc
			.data(config.data)
		  // .hideAxis(config.hidden)
      .hideAxis(['name'])
			.render()
		  .updateAxes();
	});

  // if (flags.grid) {
	//   // rebuild the grid
	//   ps.attachGrid();
	//   ps.gridUpdate();
	// }

  return this;
};

export default aggregateScore;
