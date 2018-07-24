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

    	console.log(config);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYXNvbC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS9pbml0LmpzIiwiLi4vc3JjL3N0YXRlL2RlZmF1bHRDb25maWcuanMiLCIuLi9zcmMvc3RhdGUvaW5pdFN0YXRlLmpzIiwiLi4vc3JjL3N0YXRlL3NpZGVFZmZlY3RzLmpzIiwiLi4vc3JjL2JpbmRFdmVudHMuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0LCBzZWxlY3RBbGwgfSBmcm9tICdkMyc7XG5pbXBvcnQgUGFyQ29vcmRzIGZyb20gJ3BhcmNvb3JkLWVzJztcblxuLyoqXG4qIFNldHVwIGEgbmV3IHZpc3VhbGl6YXRpb24uXG4qXG4qIEBwYXJhbSBjb25maWdcbiogQHJldHVybnMge3B2fSBhIHBhcmFzb2wgY2xvc3VyZVxuKi9cbmNvbnN0IGluaXQgPSAoY29uZmlnKSA9PiB7XG5cdC8qKlxuICAqIENyZWF0ZSBhIHZpc3VhbGl6YXRpb24gd2l0aGluIGEgY29udGFpbmVyLiBUaGUgc2VsZWN0b3IgY2FuIGFsc28gYmUgYSBkMyBzZWxlY3Rpb24uXG4gICpcbiAgKiBAcGFyYW0gc2VsZWN0aW9uIGEgZDMgc2VsZWN0aW9uXG4gICogQHJldHVybnMge3B2fSBpbnN0YW5jZSBmb3IgY2hhaW5lZCBhcGksIGNvbXBhdGlibGUgd2l0aCBwYXJjb29yZHMgYXBpXG4gICovXG5cdGNvbnN0IHB2ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG5cdFx0c2VsZWN0aW9uID0gcHYuc2VsZWN0aW9uID0gc2VsZWN0KHNlbGVjdGlvbik7XG5cblx0XHQvLyBzdG9yZSBwYyBjaGFydHMgaW4gYXJyYXlcblx0XHRwdi5jaGFydHMgPSBbXTtcblx0XHRzZWxlY3RBbGwoc2VsZWN0aW9uKVxuXHRcdFx0LmVhY2goZnVuY3Rpb24oZCxpKSB7XG5cdFx0XHRcdHB2LmNoYXJ0c1tpXSA9IFBhckNvb3Jkcyhjb25maWcuY2hhcnRPcHRpb25zKSh0aGlzKTtcblx0XHRcdFx0Ly8gLmRhdGEoZGF0YXNldClcblx0XHRcdFx0Ly8gLmhpZGVBeGlzKGhpZGRlbltpXSlcblx0XHRcdFx0Ly8gLmFscGhhKDAuNClcblx0XHRcdFx0Ly8gLmFscGhhT25CcnVzaGVkKDAuMSlcblx0XHRcdFx0Ly8gLnJlbmRlcigpXG5cdFx0XHRcdC8vIC5yZW9yZGVyYWJsZSgpXG5cdFx0XHRcdC8vIC5tb2RlKFwicXVldWVcIilcblx0XHRcdFx0Ly8gLmJydXNoTW9kZShcIjFELWF4ZXNcIik7XG5cdFx0XHR9KTtcblxuXG5cdFx0Ly8gZm9yIGNoYWluZWQgYXBpXG5cdFx0cmV0dXJuIHB2O1xuXHR9O1xuXHQvLyBmb3IgcGFydGlhbC1hcHBsaWNhdGlvbiBzdHlsZSBwcm9ncmFtbWluZ1xuXHRyZXR1cm4gcHY7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuIiwiY29uc3QgRGVmYXVsdENvbmZpZyA9IHtcblx0ZGF0YTogW10sXG5cdHBhcnRpdGlvbjoge30sIC8vIGlkZW50aWZpZXMgd2hpY2ggcGxvdHMgdmFycyBhcHBlYXIgb25cblx0ZGF0YVZpZXc6IGZhbHNlLFxuXHRncmlkOiBmYWxzZSxcblx0Z3JpZE9wdGlvbnM6IHtcblx0XHRlbmFibGVDZWxsTmF2aWdhdGlvbjogdHJ1ZSxcblx0XHRlbmFibGVDb2x1bW5SZW9yZGVyOiBmYWxzZSxcblx0XHRtdWx0aUNvbHVtblNvcnQ6IGZhbHNlLFxuXHRcdGVkaXRhYmxlOiB0cnVlLFxuXHRcdGFzeW5jRWRpdG9yTG9hZGluZzogZmFsc2UsXG5cdFx0YXV0b0VkaXQ6IGZhbHNlXG5cdH0sXG5cdGNoYXJ0T3B0aW9uczoge30sXG5cdGxpbmtlZDogW10sIC8vIGxpc3Qgb2YgbGlua2VkIG9iamVjdHNcblx0YnJ1c2hlZDogW10sIC8vIHVuaW9uIG9mIGFsbCBicnVzaGVkIGRhdGFcblx0bWFya2VkOiBbXSwgLy8gdW5pb24gb2YgYWxsIG1hcmtlZCBkYXRhXG5cdHNlbGVjdGlvbnM6IFtdLCAvLyB1bmlvbiBvZiBicnVzaGVkIGFuZCBtYXJrZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRDb25maWc7XG4iLCJpbXBvcnQgeyBlbnRyaWVzLCBrZXlzLCBkaXNwYXRjaCB9IGZyb20gJ2QzJztcblxuaW1wb3J0IERlZmF1bHRDb25maWcgZnJvbSAnLi9kZWZhdWx0Q29uZmlnJztcblxuY29uc3QgaW5pdFN0YXRlID0gdXNlckNvbmZpZyA9PiB7XG5cdGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb25maWcsIHVzZXJDb25maWcpO1xuXG5cdGNvbnNvbGUubG9nKGNvbmZpZyk7XG5cblx0Y29uc3QgZXZlbnRUeXBlcyA9IFtcblx0XHQvLyAncmVuZGVyJyxcblx0XHQvLyAncmVzaXplJyxcblx0XHQvLyAnaGlnaGxpZ2h0Jyxcblx0XHQvLyAnbWFyaycsXG5cdFx0Ly8gJ2JydXNoJyxcblx0XHQvLyAnYnJ1c2hlbmQnLFxuXHRcdC8vICdicnVzaHN0YXJ0Jyxcblx0XHQvLyAnYXhlc3Jlb3JkZXInLFxuXHRdLmNvbmNhdChrZXlzKGNvbmZpZykpO1xuXG5cdGNvbnN0IGV2ZW50cyA9IGRpc3BhdGNoLmFwcGx5KHRoaXMsIGV2ZW50VHlwZXMpLFxuXHRcdGZsYWdzID0ge1xuXHRcdFx0Ly8gYnJ1c2hhYmxlOiBmYWxzZSxcblx0XHRcdC8vIHJlb3JkZXJhYmxlOiBmYWxzZSxcblx0XHRcdC8vIGF4ZXM6IGZhbHNlLFxuXHRcdFx0Ly8gaW50ZXJhY3RpdmU6IGZhbHNlLFxuXHRcdFx0Ly8gZGVidWc6IGZhbHNlLFxuXHRcdH07XG5cdC8vIHhzY2FsZSA9IHNjYWxlUG9pbnQoKSxcblx0Ly8gZHJhZ2dpbmcgPSB7fSxcblx0Ly8gYXhpcyA9IGF4aXNMZWZ0KCkudGlja3MoNSksXG5cdC8vIGN0eCA9IHt9LFxuXHQvLyBjYW52YXMgPSB7fTtcblxuXHRyZXR1cm4ge1xuXHRcdGNvbmZpZyxcblx0XHRldmVudHMsXG5cdFx0ZXZlbnRUeXBlcyxcblx0XHRmbGFncyxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRTdGF0ZTtcbiIsIi8vIHNpZGUgZWZmZWN0cyBmb3Igc2V0dGVyc1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdkMy1kaXNwYXRjaCc7XG4iLCIvLyBzaWRlIGVmZmVjdHMgZm9yIHNldHRlcnNcbmltcG9ydCBzaWRlRWZmZWN0cyBmcm9tICcuL3N0YXRlL3NpZGVFZmZlY3RzJztcbiIsIi8vY3NzXG5pbXBvcnQgJy4vcGFyYWxsZWwtY29vcmRpbmF0ZXMuY3NzJztcblxuLy9taXNjXG5cblxuLy9hcGlcbmltcG9ydCBpbml0IGZyb20gJy4vYXBpL2luaXQnO1xuXG5pbXBvcnQgaW5pdFN0YXRlIGZyb20gJy4vc3RhdGUvaW5pdFN0YXRlJztcbmltcG9ydCBiaW5kRXZlbnRzIGZyb20gJy4vYmluZEV2ZW50cyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcblxuXG5jb25zdCBQYXJhVmlzID0gdXNlckNvbmZpZyA9PiB7XG5cdGNvbnN0IHN0YXRlID0gaW5pdFN0YXRlKHVzZXJDb25maWcpO1xuXHRjb25zdCB7XG5cdFx0Y29uZmlnLFxuXHRcdGV2ZW50cyxcblx0XHRmbGFncyxcblx0fSA9IHN0YXRlO1xuXG5cdGNvbnN0IHB2ID0gaW5pdChjb25maWcpO1xuXG5cdC8vIGJpbmRFdmVudHMoKTtcblxuXHQvLyBleHBvc2UgdGhlIHN0YXRlIG9mIHRoZSBjaGFydFxuXHRwdi5zdGF0ZSA9IGNvbmZpZztcblx0cHYuZmxhZ3MgPSBmbGFncztcblx0cHYudmVyc2lvbiA9IHZlcnNpb247XG5cblxuXHRyZXR1cm4gcHY7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYXJhVmlzO1xuIl0sIm5hbWVzIjpbImluaXQiLCJjb25maWciLCJwdiIsInNlbGVjdGlvbiIsInNlbGVjdCIsImNoYXJ0cyIsInNlbGVjdEFsbCIsImVhY2giLCJkIiwiaSIsIlBhckNvb3JkcyIsImNoYXJ0T3B0aW9ucyIsIkRlZmF1bHRDb25maWciLCJkYXRhIiwicGFydGl0aW9uIiwiZGF0YVZpZXciLCJncmlkIiwiZ3JpZE9wdGlvbnMiLCJlbmFibGVDZWxsTmF2aWdhdGlvbiIsImVuYWJsZUNvbHVtblJlb3JkZXIiLCJtdWx0aUNvbHVtblNvcnQiLCJlZGl0YWJsZSIsImFzeW5jRWRpdG9yTG9hZGluZyIsImF1dG9FZGl0IiwibGlua2VkIiwiYnJ1c2hlZCIsIm1hcmtlZCIsInNlbGVjdGlvbnMiLCJpbml0U3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJ1c2VyQ29uZmlnIiwiY29uc29sZSIsImxvZyIsImV2ZW50VHlwZXMiLCJjb25jYXQiLCJrZXlzIiwiZXZlbnRzIiwiZGlzcGF0Y2giLCJhcHBseSIsImZsYWdzIiwiUGFyYVZpcyIsInN0YXRlIiwidmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFHQTs7Ozs7O0lBTUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQsRUFBWTtJQUN4Qjs7Ozs7O0lBTUEsS0FBTUMsS0FBSyxTQUFMQSxFQUFLLENBQVNDLFNBQVQsRUFBb0I7SUFDOUJBLGNBQVlELEdBQUdDLFNBQUgsR0FBZUMsVUFBT0QsU0FBUCxDQUEzQjs7SUFFQTtJQUNBRCxLQUFHRyxNQUFILEdBQVksRUFBWjtJQUNBQyxlQUFVSCxTQUFWLEVBQ0VJLElBREYsQ0FDTyxVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYztJQUNuQlAsTUFBR0csTUFBSCxDQUFVSSxDQUFWLElBQWVDLFVBQVVULE9BQU9VLFlBQWpCLEVBQStCLElBQS9CLENBQWY7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsR0FYRjs7SUFjQTtJQUNBLFNBQU9ULEVBQVA7SUFDQSxFQXJCRDtJQXNCQTtJQUNBLFFBQU9BLEVBQVA7SUFDQSxDQS9CRDs7SUNUQSxJQUFNVSxnQkFBZ0I7SUFDckJDLE9BQU0sRUFEZTtJQUVyQkMsWUFBVyxFQUZVO0lBR3JCQyxXQUFVLEtBSFc7SUFJckJDLE9BQU0sS0FKZTtJQUtyQkMsY0FBYTtJQUNaQyx3QkFBc0IsSUFEVjtJQUVaQyx1QkFBcUIsS0FGVDtJQUdaQyxtQkFBaUIsS0FITDtJQUlaQyxZQUFVLElBSkU7SUFLWkMsc0JBQW9CLEtBTFI7SUFNWkMsWUFBVTtJQU5FLEVBTFE7SUFhckJaLGVBQWMsRUFiTztJQWNyQmEsU0FBUSxFQWRhO0lBZXJCQyxVQUFTLEVBZlk7SUFnQnJCQyxTQUFRLEVBaEJhO0lBaUJyQkMsYUFBWSxFQWpCUztJQUFBLENBQXRCOzs7O0lDSUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLGFBQWM7SUFDL0IsS0FBTTNCLFNBQVM0QixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQmxCLGFBQWxCLEVBQWlDbUIsVUFBakMsQ0FBZjs7SUFFQUMsU0FBUUMsR0FBUixDQUFZaEMsTUFBWjs7SUFFQSxLQUFNaUMsYUFBYTtJQUNsQjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBUmtCLEdBU2pCQyxNQVRpQixDQVNWQyxRQUFLbkMsTUFBTCxDQVRVLENBQW5COztJQVdBLEtBQU1vQyxTQUFTQyxZQUFTQyxLQUFULENBQWUsS0FBZixFQUFxQkwsVUFBckIsQ0FBZjtJQUFBLEtBQ0NNLFFBQVE7SUFDUDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBTE8sRUFEVDtJQVFBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUEsUUFBTztJQUNOdkMsZ0JBRE07SUFFTm9DLGdCQUZNO0lBR05ILHdCQUhNO0lBSU5NO0lBSk0sRUFBUDtJQU1BLENBcENEOztJQ0pBOztJQ0FBOzs7O0lDQUE7QUFDQTtJQWFBLElBQU1DLFVBQVUsU0FBVkEsT0FBVSxhQUFjO0lBQzdCLEtBQU1DLFFBQVFkLFVBQVVHLFVBQVYsQ0FBZDtJQUQ2QixLQUc1QjlCLE1BSDRCLEdBTXpCeUMsS0FOeUIsQ0FHNUJ6QyxNQUg0QjtJQUFBLEtBSTVCb0MsTUFKNEIsR0FNekJLLEtBTnlCLENBSTVCTCxNQUo0QjtJQUFBLEtBSzVCRyxLQUw0QixHQU16QkUsS0FOeUIsQ0FLNUJGLEtBTDRCOzs7SUFRN0IsS0FBTXRDLEtBQUtGLEtBQUtDLE1BQUwsQ0FBWDs7SUFFQTs7SUFFQTtJQUNBQyxJQUFHd0MsS0FBSCxHQUFXekMsTUFBWDtJQUNBQyxJQUFHc0MsS0FBSCxHQUFXQSxLQUFYO0lBQ0F0QyxJQUFHeUMsT0FBSCxHQUFhQSxPQUFiOztJQUdBLFFBQU96QyxFQUFQO0lBQ0EsQ0FuQkQ7Ozs7Ozs7OyJ9
