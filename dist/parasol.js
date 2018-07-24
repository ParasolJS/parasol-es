(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('parcoord-es')) :
    typeof define === 'function' && define.amd ? define(['d3', 'parcoord-es'], factory) :
    (global.parasol = factory(global.d3,global.ParCoords));
}(this, (function (d3,ParCoords) { 'use strict';

    ParCoords = ParCoords && ParCoords.hasOwnProperty('default') ? ParCoords['default'] : ParCoords;

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
    		selection = ps.selection = d3.selectAll(selection);

    		// store pc charts in array
    		ps.charts = [];
    		selection.each(function (d, i) {
    			ps.charts[i] = ParCoords(config.chartOptions)(this);
    		});
    		// for chained api
    		return ps;
    	};
    	// for partial-application style programming
    	return ps;
    };

    var DefaultConfig = {
    	data: [],
    	partition: {}, // identifies which plots vars appear on
    	dataView: false,
    	grid: false,
    	gridOptions: {
    		enableCellNavigation: true,
    		enableColumnReorder: false,
    		multiColumnSort: false,
    		editable: true,
    		asyncEditorLoading: false,
    		autoEdit: false
    	},
    	chartOptions: {},
    	linked: [], // list of linked objects
    	brushed: [], // union of all brushed data
    	marked: [], // union of all marked data
    	selections: [] // union of brushed and marked
    };

    var _this = undefined;

    var initState = function initState(userConfig) {
    	var config = Object.assign({}, DefaultConfig, userConfig);

    	var eventTypes = [
    		// 'render',
    		// 'resize',
    		// 'highlight',
    		// 'mark',
    		// 'brush',
    		// 'brushend',
    		// 'brushstart',
    		// 'axesreorder',
    	].concat(d3.keys(config));

    	var events = d3.dispatch.apply(_this, eventTypes),
    	    flags = {
    		// brushable: false,
    		// reorderable: false,
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

    // side effects for setters

    // side effects for setters

    var version = "0.0.0";

    //css

    var parasol = function parasol(userConfig) {
    	var state = initState(userConfig);
    	var config = state.config,
    	    events = state.events,
    	    flags = state.flags;


    	var ps = init(config);

    	// bindEvents();

    	// expose the state of the chart
    	ps.state = config;
    	ps.flags = flags;
    	ps.version = version;

    	return ps;
    };

    return parasol;

})));
//# sourceMappingURL=parasol.js.map
