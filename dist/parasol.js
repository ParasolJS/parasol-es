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
    * @returns {pv} a parasol closure
    */
    var init = function init(config) {
    	/**
      * Create a visualization within a container. The selector can also be a d3 selection.
      *
      * @param selection a d3 selection
      * @returns {pv} instance for chained api, compatible with parcoords api
      */
    	var pv = function pv(selection) {
    		selection = pv.selection = d3.select(selection);

    		// store pc charts in array
    		pv.charts = [];
    		d3.selectAll(selection).each(function (d, i) {
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

    var DefaultConfig = {
    	data: [],
    	brushed: [], // union of all brushed data
    	marked: [], // union of all marked data
    	selections: [], // union of brushed and marked
    	linked: [], // list of linked objects
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
    	chartOptions: {}
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

    var ParaVis = function ParaVis(userConfig) {
    	var state = initState(userConfig);
    	var config = state.config,
    	    events = state.events,
    	    flags = state.flags;


    	var pv = init(config);

    	// bindEvents();

    	// expose the state of the chart
    	pv.state = config;
    	pv.flags = flags;
    	pv.version = version;

    	return pv;
    };

    return ParaVis;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYXNvbC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS9pbml0LmpzIiwiLi4vc3JjL3N0YXRlL2RlZmF1bHRDb25maWcuanMiLCIuLi9zcmMvc3RhdGUvaW5pdFN0YXRlLmpzIiwiLi4vc3JjL3N0YXRlL3NpZGVFZmZlY3RzLmpzIiwiLi4vc3JjL2JpbmRFdmVudHMuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0LCBzZWxlY3RBbGwgfSBmcm9tICdkMyc7XG5pbXBvcnQgUGFyQ29vcmRzIGZyb20gJ3BhcmNvb3JkLWVzJztcblxuLyoqXG4qIFNldHVwIGEgbmV3IHZpc3VhbGl6YXRpb24uXG4qXG4qIEBwYXJhbSBjb25maWdcbiogQHJldHVybnMge3B2fSBhIHBhcmFzb2wgY2xvc3VyZVxuKi9cbmNvbnN0IGluaXQgPSAoY29uZmlnKSA9PiB7XG5cdC8qKlxuICAqIENyZWF0ZSBhIHZpc3VhbGl6YXRpb24gd2l0aGluIGEgY29udGFpbmVyLiBUaGUgc2VsZWN0b3IgY2FuIGFsc28gYmUgYSBkMyBzZWxlY3Rpb24uXG4gICpcbiAgKiBAcGFyYW0gc2VsZWN0aW9uIGEgZDMgc2VsZWN0aW9uXG4gICogQHJldHVybnMge3B2fSBpbnN0YW5jZSBmb3IgY2hhaW5lZCBhcGksIGNvbXBhdGlibGUgd2l0aCBwYXJjb29yZHMgYXBpXG4gICovXG5cdGNvbnN0IHB2ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG5cdFx0c2VsZWN0aW9uID0gcHYuc2VsZWN0aW9uID0gc2VsZWN0KHNlbGVjdGlvbik7XG5cblx0XHQvLyBzdG9yZSBwYyBjaGFydHMgaW4gYXJyYXlcblx0XHRwdi5jaGFydHMgPSBbXTtcblx0XHRzZWxlY3RBbGwoc2VsZWN0aW9uKVxuXHRcdFx0LmVhY2goZnVuY3Rpb24oZCxpKSB7XG5cdFx0XHRcdHB2LmNoYXJ0c1tpXSA9IFBhckNvb3Jkcyhjb25maWcuY2hhcnRPcHRpb25zKSh0aGlzKTtcblx0XHRcdFx0Ly8gLmRhdGEoZGF0YXNldClcblx0XHRcdFx0Ly8gLmhpZGVBeGlzKGhpZGRlbltpXSlcblx0XHRcdFx0Ly8gLmFscGhhKDAuNClcblx0XHRcdFx0Ly8gLmFscGhhT25CcnVzaGVkKDAuMSlcblx0XHRcdFx0Ly8gLnJlbmRlcigpXG5cdFx0XHRcdC8vIC5yZW9yZGVyYWJsZSgpXG5cdFx0XHRcdC8vIC5tb2RlKFwicXVldWVcIilcblx0XHRcdFx0Ly8gLmJydXNoTW9kZShcIjFELWF4ZXNcIik7XG5cdFx0XHR9KTtcblxuXG5cdFx0Ly8gZm9yIGNoYWluZWQgYXBpXG5cdFx0cmV0dXJuIHB2O1xuXHR9O1xuXHQvLyBmb3IgcGFydGlhbC1hcHBsaWNhdGlvbiBzdHlsZSBwcm9ncmFtbWluZ1xuXHRyZXR1cm4gcHY7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuIiwiY29uc3QgRGVmYXVsdENvbmZpZyA9IHtcblx0ZGF0YTogW10sXG5cdGJydXNoZWQ6IFtdLCAvLyB1bmlvbiBvZiBhbGwgYnJ1c2hlZCBkYXRhXG5cdG1hcmtlZDogW10sIC8vIHVuaW9uIG9mIGFsbCBtYXJrZWQgZGF0YVxuXHRzZWxlY3Rpb25zOiBbXSwgLy8gdW5pb24gb2YgYnJ1c2hlZCBhbmQgbWFya2VkXG5cdGxpbmtlZDogW10sIC8vIGxpc3Qgb2YgbGlua2VkIG9iamVjdHNcblx0ZGF0YVZpZXc6IGZhbHNlLFxuXHRncmlkOiBmYWxzZSxcblx0Z3JpZE9wdGlvbnM6IHtcblx0XHRlbmFibGVDZWxsTmF2aWdhdGlvbjogdHJ1ZSxcblx0XHRlbmFibGVDb2x1bW5SZW9yZGVyOiBmYWxzZSxcblx0XHRtdWx0aUNvbHVtblNvcnQ6IGZhbHNlLFxuXHRcdGVkaXRhYmxlOiB0cnVlLFxuXHRcdGFzeW5jRWRpdG9yTG9hZGluZzogZmFsc2UsXG5cdFx0YXV0b0VkaXQ6IGZhbHNlXG5cdH0sXG5cdGNoYXJ0T3B0aW9uczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0Q29uZmlnO1xuIiwiaW1wb3J0IHsgZW50cmllcywga2V5cywgZGlzcGF0Y2ggfSBmcm9tICdkMyc7XG5cbmltcG9ydCBEZWZhdWx0Q29uZmlnIGZyb20gJy4vZGVmYXVsdENvbmZpZyc7XG5cbmNvbnN0IGluaXRTdGF0ZSA9IHVzZXJDb25maWcgPT4ge1xuXHRjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29uZmlnLCB1c2VyQ29uZmlnKTtcblxuXHRjb25zdCBldmVudFR5cGVzID0gW1xuXHRcdC8vICdyZW5kZXInLFxuXHRcdC8vICdyZXNpemUnLFxuXHRcdC8vICdoaWdobGlnaHQnLFxuXHRcdC8vICdtYXJrJyxcblx0XHQvLyAnYnJ1c2gnLFxuXHRcdC8vICdicnVzaGVuZCcsXG5cdFx0Ly8gJ2JydXNoc3RhcnQnLFxuXHRcdC8vICdheGVzcmVvcmRlcicsXG5cdF0uY29uY2F0KGtleXMoY29uZmlnKSk7XG5cblx0Y29uc3QgZXZlbnRzID0gZGlzcGF0Y2guYXBwbHkodGhpcywgZXZlbnRUeXBlcyksXG5cdFx0ZmxhZ3MgPSB7XG5cdFx0XHQvLyBicnVzaGFibGU6IGZhbHNlLFxuXHRcdFx0Ly8gcmVvcmRlcmFibGU6IGZhbHNlLFxuXHRcdFx0Ly8gYXhlczogZmFsc2UsXG5cdFx0XHQvLyBpbnRlcmFjdGl2ZTogZmFsc2UsXG5cdFx0XHQvLyBkZWJ1ZzogZmFsc2UsXG5cdFx0fTtcblx0Ly8geHNjYWxlID0gc2NhbGVQb2ludCgpLFxuXHQvLyBkcmFnZ2luZyA9IHt9LFxuXHQvLyBheGlzID0gYXhpc0xlZnQoKS50aWNrcyg1KSxcblx0Ly8gY3R4ID0ge30sXG5cdC8vIGNhbnZhcyA9IHt9O1xuXG5cdHJldHVybiB7XG5cdFx0Y29uZmlnLFxuXHRcdGV2ZW50cyxcblx0XHRldmVudFR5cGVzLFxuXHRcdGZsYWdzLFxuXHR9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdFN0YXRlO1xuIiwiLy8gc2lkZSBlZmZlY3RzIGZvciBzZXR0ZXJzXG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ2QzLWRpc3BhdGNoJztcbiIsIi8vIHNpZGUgZWZmZWN0cyBmb3Igc2V0dGVyc1xuaW1wb3J0IHNpZGVFZmZlY3RzIGZyb20gJy4vc3RhdGUvc2lkZUVmZmVjdHMnO1xuIiwiLy9jc3NcbmltcG9ydCAnLi9wYXJhbGxlbC1jb29yZGluYXRlcy5jc3MnO1xuXG4vL21pc2NcblxuXG4vL2FwaVxuaW1wb3J0IGluaXQgZnJvbSAnLi9hcGkvaW5pdCc7XG5cbmltcG9ydCBpbml0U3RhdGUgZnJvbSAnLi9zdGF0ZS9pbml0U3RhdGUnO1xuaW1wb3J0IGJpbmRFdmVudHMgZnJvbSAnLi9iaW5kRXZlbnRzJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuXG5cbmNvbnN0IFBhcmFWaXMgPSB1c2VyQ29uZmlnID0+IHtcblx0Y29uc3Qgc3RhdGUgPSBpbml0U3RhdGUodXNlckNvbmZpZyk7XG5cdGNvbnN0IHtcblx0XHRjb25maWcsXG5cdFx0ZXZlbnRzLFxuXHRcdGZsYWdzLFxuXHR9ID0gc3RhdGU7XG5cblx0Y29uc3QgcHYgPSBpbml0KGNvbmZpZyk7XG5cblx0Ly8gYmluZEV2ZW50cygpO1xuXG5cdC8vIGV4cG9zZSB0aGUgc3RhdGUgb2YgdGhlIGNoYXJ0XG5cdHB2LnN0YXRlID0gY29uZmlnO1xuXHRwdi5mbGFncyA9IGZsYWdzO1xuXHRwdi52ZXJzaW9uID0gdmVyc2lvbjtcblxuXG5cdHJldHVybiBwdjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhcmFWaXM7XG4iXSwibmFtZXMiOlsiaW5pdCIsImNvbmZpZyIsInB2Iiwic2VsZWN0aW9uIiwic2VsZWN0IiwiY2hhcnRzIiwic2VsZWN0QWxsIiwiZWFjaCIsImQiLCJpIiwiUGFyQ29vcmRzIiwiY2hhcnRPcHRpb25zIiwiRGVmYXVsdENvbmZpZyIsImRhdGEiLCJicnVzaGVkIiwibWFya2VkIiwic2VsZWN0aW9ucyIsImxpbmtlZCIsImRhdGFWaWV3IiwiZ3JpZCIsImdyaWRPcHRpb25zIiwiZW5hYmxlQ2VsbE5hdmlnYXRpb24iLCJlbmFibGVDb2x1bW5SZW9yZGVyIiwibXVsdGlDb2x1bW5Tb3J0IiwiZWRpdGFibGUiLCJhc3luY0VkaXRvckxvYWRpbmciLCJhdXRvRWRpdCIsImluaXRTdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInVzZXJDb25maWciLCJldmVudFR5cGVzIiwiY29uY2F0Iiwia2V5cyIsImV2ZW50cyIsImRpc3BhdGNoIiwiYXBwbHkiLCJmbGFncyIsIlBhcmFWaXMiLCJzdGF0ZSIsInZlcnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBR0E7Ozs7OztJQU1BLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFELEVBQVk7SUFDeEI7Ozs7OztJQU1BLEtBQU1DLEtBQUssU0FBTEEsRUFBSyxDQUFTQyxTQUFULEVBQW9CO0lBQzlCQSxjQUFZRCxHQUFHQyxTQUFILEdBQWVDLFVBQU9ELFNBQVAsQ0FBM0I7O0lBRUE7SUFDQUQsS0FBR0csTUFBSCxHQUFZLEVBQVo7SUFDQUMsZUFBVUgsU0FBVixFQUNFSSxJQURGLENBQ08sVUFBU0MsQ0FBVCxFQUFXQyxDQUFYLEVBQWM7SUFDbkJQLE1BQUdHLE1BQUgsQ0FBVUksQ0FBVixJQUFlQyxVQUFVVCxPQUFPVSxZQUFqQixFQUErQixJQUEvQixDQUFmO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLEdBWEY7O0lBY0E7SUFDQSxTQUFPVCxFQUFQO0lBQ0EsRUFyQkQ7SUFzQkE7SUFDQSxRQUFPQSxFQUFQO0lBQ0EsQ0EvQkQ7O0lDVEEsSUFBTVUsZ0JBQWdCO0lBQ3JCQyxPQUFNLEVBRGU7SUFFckJDLFVBQVMsRUFGWTtJQUdyQkMsU0FBUSxFQUhhO0lBSXJCQyxhQUFZLEVBSlM7SUFLckJDLFNBQVEsRUFMYTtJQU1yQkMsV0FBVSxLQU5XO0lBT3JCQyxPQUFNLEtBUGU7SUFRckJDLGNBQWE7SUFDWkMsd0JBQXNCLElBRFY7SUFFWkMsdUJBQXFCLEtBRlQ7SUFHWkMsbUJBQWlCLEtBSEw7SUFJWkMsWUFBVSxJQUpFO0lBS1pDLHNCQUFvQixLQUxSO0lBTVpDLFlBQVU7SUFORSxFQVJRO0lBZ0JyQmYsZUFBYztJQWhCTyxDQUF0Qjs7OztJQ0lBLElBQU1nQixZQUFZLFNBQVpBLFNBQVksYUFBYztJQUMvQixLQUFNMUIsU0FBUzJCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCakIsYUFBbEIsRUFBaUNrQixVQUFqQyxDQUFmOztJQUVBLEtBQU1DLGFBQWE7SUFDbEI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQVJrQixHQVNqQkMsTUFUaUIsQ0FTVkMsUUFBS2hDLE1BQUwsQ0FUVSxDQUFuQjs7SUFXQSxLQUFNaUMsU0FBU0MsWUFBU0MsS0FBVCxDQUFlLEtBQWYsRUFBcUJMLFVBQXJCLENBQWY7SUFBQSxLQUNDTSxRQUFRO0lBQ1A7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUxPLEVBRFQ7SUFRQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBLFFBQU87SUFDTnBDLGdCQURNO0lBRU5pQyxnQkFGTTtJQUdOSCx3QkFITTtJQUlOTTtJQUpNLEVBQVA7SUFNQSxDQWxDRDs7SUNKQTs7SUNBQTs7OztJQ0FBO0FBQ0E7SUFhQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsYUFBYztJQUM3QixLQUFNQyxRQUFRWixVQUFVRyxVQUFWLENBQWQ7SUFENkIsS0FHNUI3QixNQUg0QixHQU16QnNDLEtBTnlCLENBRzVCdEMsTUFINEI7SUFBQSxLQUk1QmlDLE1BSjRCLEdBTXpCSyxLQU55QixDQUk1QkwsTUFKNEI7SUFBQSxLQUs1QkcsS0FMNEIsR0FNekJFLEtBTnlCLENBSzVCRixLQUw0Qjs7O0lBUTdCLEtBQU1uQyxLQUFLRixLQUFLQyxNQUFMLENBQVg7O0lBRUE7O0lBRUE7SUFDQUMsSUFBR3FDLEtBQUgsR0FBV3RDLE1BQVg7SUFDQUMsSUFBR21DLEtBQUgsR0FBV0EsS0FBWDtJQUNBbkMsSUFBR3NDLE9BQUgsR0FBYUEsT0FBYjs7SUFHQSxRQUFPdEMsRUFBUDtJQUNBLENBbkJEOzs7Ozs7OzsifQ==
