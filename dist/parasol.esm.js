import { selectAll, keys, dispatch } from 'd3';
import ParCoords from 'parcoord-es';
import { union, intersection } from 'lodash-es';

/**
* Setup a new visualization.
*
* @param config
* @returns {ps} a parasol closure
*/
var init = function init(config) {
	/**
  * Create a visualization within a container. The selector can also be a d3 selection.
  *
  * @param selection a d3 selection
  * @returns {ps} instance for chained api, compatible with parcoords api
  */
	var ps = function ps(selection) {
		selection = ps.selection = selectAll(selection);

		// store pc charts in array
		ps.charts = [];
		selection.each(function (d, i) {
			ps.charts[i] = ParCoords(config.chartOptions)(this).data(config.data).alpha(0.4).render().mode('queue').brushMode('1D-axes'); //1D-axes must be used with linking
		});
		// for chained api
		return ps;
	};
	// for partial-application style programming
	return ps;
};

// synchronize data between linked components
var sync = function sync(config, ps, flags) {
	return function () {

		//obtain array of brushed data for each chart
		var brush_extents = [];
		config.linked.forEach(function (pc) {
			brush_extents.push(pc.selected());
		});
		// console.log(brush_extents);

		//check edge case where all brushes individually clicked away
		// console.log(union(...brush_extents));
		if (union.apply(undefined, brush_extents).length == 0) {
			config.linked.forEach(function (pc) {
				pc.brushReset();
			});
			// if (flags.grid === true) {
			// 	ps.gridUpdate(config.data);
			// }
		} else {
			var brushed = intersection.apply(undefined, brush_extents);
			// console.log(brushed);
			config.linked.forEach(function (pc) {
				pc.brushed(brushed).render();
			});
			// if (flags.grid === true) {
			// 	ps.gridUpdate(brush_extents);
			// }
		}
	};
};

// link brush activity between user specified charts, and grid if it exists
var linked = function linked(config, ps, flags) {
	return function () {
		var chartList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ps.charts;

		config.linked = chartList;
		chartList.forEach(function (pc) {
			pc.on('brush', sync(config, ps, flags));
		});

		// connect grid
		// highlight row in charts
		// config.grid.onMouseEnter.subscribe( (e, args) => {
		//   const i = grid.getCellFromEvent(e).row;
		//   const d = config.brushed || config.data;
		//   pv.charts.forEach( pc => {
		//     pc.highlight([d[i]]);
		//   })
		// });
		// config.grid.onMouseLeave.subscribe( (e, args) => {
		//   pv.charts.forEach( (pc) => {
		//     pc.unhighlight();
		//   })
		// });

		// mark / unmark rows in charts
		// config.grid.onSelectedRowsChanged.subscribe( (e, args) => {
		//   const selected_row_ids = config.grid.getSelectedRows();
		//   if (config.brushed) {
		//     // nothing outside of brushed should be markable
		//     const d = config.brushed;
		//   } else {
		//     const d = config.data;
		//   }
		//   pv.charts.forEach( (pc) => {
		//     pc.unmark();
		//     pc.mark(selected_row_ids); //NOTE: this may not work initially
		//   })
		// });

		return this;
	};
};

var DefaultConfig = {
	data: [],
	partition: {}, // identifies which plots vars appear on
	dataView: false,
	grid: false,
	chartOptions: {},
	linked: [], // list of linked objects
	brushed: [], // intersection of all brushed data
	marked: [], // union of all marked data
	selections: [] // union of brushed and marked
};

var _this = undefined;

var initState = function initState(data, userConfig) {
	var config = Object.assign({}, DefaultConfig, userConfig);
	config.data = data;

	var eventTypes = [
	// 'data', // when data in a chart is updated, how does this cascade to linked?
	// 'render',
	// 'resize',
	// 'highlight',
	// 'mark',
	'brush', 'brushend', 'brushstart'].concat(keys(config));

	var events = dispatch.apply(_this, eventTypes),
	    flags = {
		linked: false,
		grid: false
		// axes: false,
		// interactive: false,
		// debug: false,
	};
	// xscale = scalePoint(),
	// dragging = {},
	// axis = axisLeft().ticks(5),
	// ctx = {},
	// canvas = {};

	return {
		config: config,
		events: events,
		eventTypes: eventTypes,
		flags: flags
	};
};

var version = "0.0.0";

//css

var Parasol = function Parasol(data, userConfig) {
	var state = initState(data, userConfig);
	var config = state.config,
	    events = state.events,
	    flags = state.flags;


	var ps = init(config);

	// bindEvents();

	// expose the state of charts and grid
	ps.state = config;
	ps.flags = flags;
	ps.version = version;
	// ps.grid = config.grid;
	// ps.dataview = config.dataview;

	// ps.attachGrid = attachGrid(config, flags);
	// ps.gridUpdate = gridUpdate(config, flags);
	ps.linked = linked(config, ps, flags);

	return ps;
};

export default Parasol;
//# sourceMappingURL=parasol.esm.js.map
