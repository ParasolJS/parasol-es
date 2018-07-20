import { select, selectAll } from 'd3';
import ParCoords from 'parcoord-es';

/**
* Setup a new visualization.
*
* @param config
* @returns {pv} a parasol closure
*/
const init = (config) => {
	/**
  * Create a visualization within a container. The selector can also be a d3 selection.
  *
  * @param selection a d3 selection
  * @returns {pv} instance for chained api, compatible with parcoords api
  */
	const pv = function(selection) {
		selection = pv.selection = select(selection);

		// store pc charts in array
		pv.charts = [];
		selectAll(selection)
			.each(function(d,i) {
				pv.charts[i] = ParCoords(config.chartOptions)(this);
				// .data(dataset)
				// .hideAxis(hidden[i])
				// .alpha(0.4)
				// .alphaOnBrushed(0.1)
				// .render()
				// .reorderable()
				// .mode("queue")
				// .brushMode("1D-axes");
			});


		// for chained api
		return pv;
	};
	// for partial-application style programming
	return pv;
};

export default init;
