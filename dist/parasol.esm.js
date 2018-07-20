import { select, selectAll, keys, dispatch } from 'd3';
import ParCoords from 'parcoord-es';

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
		selection = pv.selection = select(selection);

		// store pc charts in array
		pv.charts = [];
		selectAll(selection).each(function (d, i) {
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
	].concat(keys(config));

	var events = dispatch.apply(_this, eventTypes),
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

export default ParaVis;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYXNvbC5lc20uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkvaW5pdC5qcyIsIi4uL3NyYy9zdGF0ZS9kZWZhdWx0Q29uZmlnLmpzIiwiLi4vc3JjL3N0YXRlL2luaXRTdGF0ZS5qcyIsIi4uL3NyYy9zdGF0ZS9zaWRlRWZmZWN0cy5qcyIsIi4uL3NyYy9iaW5kRXZlbnRzLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdCwgc2VsZWN0QWxsIH0gZnJvbSAnZDMnO1xuaW1wb3J0IFBhckNvb3JkcyBmcm9tICdwYXJjb29yZC1lcyc7XG5cbi8qKlxuKiBTZXR1cCBhIG5ldyB2aXN1YWxpemF0aW9uLlxuKlxuKiBAcGFyYW0gY29uZmlnXG4qIEByZXR1cm5zIHtwdn0gYSBwYXJhc29sIGNsb3N1cmVcbiovXG5jb25zdCBpbml0ID0gKGNvbmZpZykgPT4ge1xuXHQvKipcbiAgKiBDcmVhdGUgYSB2aXN1YWxpemF0aW9uIHdpdGhpbiBhIGNvbnRhaW5lci4gVGhlIHNlbGVjdG9yIGNhbiBhbHNvIGJlIGEgZDMgc2VsZWN0aW9uLlxuICAqXG4gICogQHBhcmFtIHNlbGVjdGlvbiBhIGQzIHNlbGVjdGlvblxuICAqIEByZXR1cm5zIHtwdn0gaW5zdGFuY2UgZm9yIGNoYWluZWQgYXBpLCBjb21wYXRpYmxlIHdpdGggcGFyY29vcmRzIGFwaVxuICAqL1xuXHRjb25zdCBwdiA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXHRcdHNlbGVjdGlvbiA9IHB2LnNlbGVjdGlvbiA9IHNlbGVjdChzZWxlY3Rpb24pO1xuXG5cdFx0Ly8gc3RvcmUgcGMgY2hhcnRzIGluIGFycmF5XG5cdFx0cHYuY2hhcnRzID0gW107XG5cdFx0c2VsZWN0QWxsKHNlbGVjdGlvbilcblx0XHRcdC5lYWNoKGZ1bmN0aW9uKGQsaSkge1xuXHRcdFx0XHRwdi5jaGFydHNbaV0gPSBQYXJDb29yZHMoY29uZmlnLmNoYXJ0T3B0aW9ucykodGhpcyk7XG5cdFx0XHRcdC8vIC5kYXRhKGRhdGFzZXQpXG5cdFx0XHRcdC8vIC5oaWRlQXhpcyhoaWRkZW5baV0pXG5cdFx0XHRcdC8vIC5hbHBoYSgwLjQpXG5cdFx0XHRcdC8vIC5hbHBoYU9uQnJ1c2hlZCgwLjEpXG5cdFx0XHRcdC8vIC5yZW5kZXIoKVxuXHRcdFx0XHQvLyAucmVvcmRlcmFibGUoKVxuXHRcdFx0XHQvLyAubW9kZShcInF1ZXVlXCIpXG5cdFx0XHRcdC8vIC5icnVzaE1vZGUoXCIxRC1heGVzXCIpO1xuXHRcdFx0fSk7XG5cblxuXHRcdC8vIGZvciBjaGFpbmVkIGFwaVxuXHRcdHJldHVybiBwdjtcblx0fTtcblx0Ly8gZm9yIHBhcnRpYWwtYXBwbGljYXRpb24gc3R5bGUgcHJvZ3JhbW1pbmdcblx0cmV0dXJuIHB2O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcbiIsImNvbnN0IERlZmF1bHRDb25maWcgPSB7XG5cdGRhdGE6IFtdLFxuXHRicnVzaGVkOiBbXSwgLy8gdW5pb24gb2YgYWxsIGJydXNoZWQgZGF0YVxuXHRtYXJrZWQ6IFtdLCAvLyB1bmlvbiBvZiBhbGwgbWFya2VkIGRhdGFcblx0c2VsZWN0aW9uczogW10sIC8vIHVuaW9uIG9mIGJydXNoZWQgYW5kIG1hcmtlZFxuXHRsaW5rZWQ6IFtdLCAvLyBsaXN0IG9mIGxpbmtlZCBvYmplY3RzXG5cdGRhdGFWaWV3OiBmYWxzZSxcblx0Z3JpZDogZmFsc2UsXG5cdGdyaWRPcHRpb25zOiB7XG5cdFx0ZW5hYmxlQ2VsbE5hdmlnYXRpb246IHRydWUsXG5cdFx0ZW5hYmxlQ29sdW1uUmVvcmRlcjogZmFsc2UsXG5cdFx0bXVsdGlDb2x1bW5Tb3J0OiBmYWxzZSxcblx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRhc3luY0VkaXRvckxvYWRpbmc6IGZhbHNlLFxuXHRcdGF1dG9FZGl0OiBmYWxzZVxuXHR9LFxuXHRjaGFydE9wdGlvbnM6IHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdENvbmZpZztcbiIsImltcG9ydCB7IGVudHJpZXMsIGtleXMsIGRpc3BhdGNoIH0gZnJvbSAnZDMnO1xuXG5pbXBvcnQgRGVmYXVsdENvbmZpZyBmcm9tICcuL2RlZmF1bHRDb25maWcnO1xuXG5jb25zdCBpbml0U3RhdGUgPSB1c2VyQ29uZmlnID0+IHtcblx0Y29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbmZpZywgdXNlckNvbmZpZyk7XG5cblx0Y29uc3QgZXZlbnRUeXBlcyA9IFtcblx0XHQvLyAncmVuZGVyJyxcblx0XHQvLyAncmVzaXplJyxcblx0XHQvLyAnaGlnaGxpZ2h0Jyxcblx0XHQvLyAnbWFyaycsXG5cdFx0Ly8gJ2JydXNoJyxcblx0XHQvLyAnYnJ1c2hlbmQnLFxuXHRcdC8vICdicnVzaHN0YXJ0Jyxcblx0XHQvLyAnYXhlc3Jlb3JkZXInLFxuXHRdLmNvbmNhdChrZXlzKGNvbmZpZykpO1xuXG5cdGNvbnN0IGV2ZW50cyA9IGRpc3BhdGNoLmFwcGx5KHRoaXMsIGV2ZW50VHlwZXMpLFxuXHRcdGZsYWdzID0ge1xuXHRcdFx0Ly8gYnJ1c2hhYmxlOiBmYWxzZSxcblx0XHRcdC8vIHJlb3JkZXJhYmxlOiBmYWxzZSxcblx0XHRcdC8vIGF4ZXM6IGZhbHNlLFxuXHRcdFx0Ly8gaW50ZXJhY3RpdmU6IGZhbHNlLFxuXHRcdFx0Ly8gZGVidWc6IGZhbHNlLFxuXHRcdH07XG5cdC8vIHhzY2FsZSA9IHNjYWxlUG9pbnQoKSxcblx0Ly8gZHJhZ2dpbmcgPSB7fSxcblx0Ly8gYXhpcyA9IGF4aXNMZWZ0KCkudGlja3MoNSksXG5cdC8vIGN0eCA9IHt9LFxuXHQvLyBjYW52YXMgPSB7fTtcblxuXHRyZXR1cm4ge1xuXHRcdGNvbmZpZyxcblx0XHRldmVudHMsXG5cdFx0ZXZlbnRUeXBlcyxcblx0XHRmbGFncyxcblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRTdGF0ZTtcbiIsIi8vIHNpZGUgZWZmZWN0cyBmb3Igc2V0dGVyc1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdkMy1kaXNwYXRjaCc7XG4iLCIvLyBzaWRlIGVmZmVjdHMgZm9yIHNldHRlcnNcbmltcG9ydCBzaWRlRWZmZWN0cyBmcm9tICcuL3N0YXRlL3NpZGVFZmZlY3RzJztcbiIsIi8vY3NzXG5pbXBvcnQgJy4vcGFyYWxsZWwtY29vcmRpbmF0ZXMuY3NzJztcblxuLy9taXNjXG5cblxuLy9hcGlcbmltcG9ydCBpbml0IGZyb20gJy4vYXBpL2luaXQnO1xuXG5pbXBvcnQgaW5pdFN0YXRlIGZyb20gJy4vc3RhdGUvaW5pdFN0YXRlJztcbmltcG9ydCBiaW5kRXZlbnRzIGZyb20gJy4vYmluZEV2ZW50cyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcblxuXG5jb25zdCBQYXJhVmlzID0gdXNlckNvbmZpZyA9PiB7XG5cdGNvbnN0IHN0YXRlID0gaW5pdFN0YXRlKHVzZXJDb25maWcpO1xuXHRjb25zdCB7XG5cdFx0Y29uZmlnLFxuXHRcdGV2ZW50cyxcblx0XHRmbGFncyxcblx0fSA9IHN0YXRlO1xuXG5cdGNvbnN0IHB2ID0gaW5pdChjb25maWcpO1xuXG5cdC8vIGJpbmRFdmVudHMoKTtcblxuXHQvLyBleHBvc2UgdGhlIHN0YXRlIG9mIHRoZSBjaGFydFxuXHRwdi5zdGF0ZSA9IGNvbmZpZztcblx0cHYuZmxhZ3MgPSBmbGFncztcblx0cHYudmVyc2lvbiA9IHZlcnNpb247XG5cblxuXHRyZXR1cm4gcHY7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYXJhVmlzO1xuIl0sIm5hbWVzIjpbImluaXQiLCJjb25maWciLCJwdiIsInNlbGVjdGlvbiIsInNlbGVjdCIsImNoYXJ0cyIsImVhY2giLCJkIiwiaSIsIlBhckNvb3JkcyIsImNoYXJ0T3B0aW9ucyIsIkRlZmF1bHRDb25maWciLCJpbml0U3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJ1c2VyQ29uZmlnIiwiZXZlbnRUeXBlcyIsImNvbmNhdCIsImtleXMiLCJldmVudHMiLCJkaXNwYXRjaCIsImFwcGx5IiwiZmxhZ3MiLCJQYXJhVmlzIiwic3RhdGUiLCJ2ZXJzaW9uIl0sIm1hcHBpbmdzIjoiOzs7QUFHQTs7Ozs7O0FBTUEsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQsRUFBWTs7Ozs7OztLQU9sQkMsS0FBSyxTQUFMQSxFQUFLLENBQVNDLFNBQVQsRUFBb0I7Y0FDbEJELEdBQUdDLFNBQUgsR0FBZUMsT0FBT0QsU0FBUCxDQUEzQjs7O0tBR0dFLE1BQUgsR0FBWSxFQUFaO1lBQ1VGLFNBQVYsRUFDRUcsSUFERixDQUNPLFVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFjO01BQ2hCSCxNQUFILENBQVVHLENBQVYsSUFBZUMsVUFBVVIsT0FBT1MsWUFBakIsRUFBK0IsSUFBL0IsQ0FBZjs7Ozs7Ozs7O0dBRkY7OztTQWVPUixFQUFQO0VBcEJEOztRQXVCT0EsRUFBUDtDQTlCRDs7QUNUQSxJQUFNUyxnQkFBZ0I7T0FDZixFQURlO1VBRVosRUFGWTtTQUdiLEVBSGE7YUFJVCxFQUpTO1NBS2IsRUFMYTtXQU1YLEtBTlc7T0FPZixLQVBlO2NBUVI7d0JBQ1UsSUFEVjt1QkFFUyxLQUZUO21CQUdLLEtBSEw7WUFJRixJQUpFO3NCQUtRLEtBTFI7WUFNRjtFQWRVO2VBZ0JQO0NBaEJmOzs7O0FDSUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLGFBQWM7S0FDekJYLFNBQVNZLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSCxhQUFsQixFQUFpQ0ksVUFBakMsQ0FBZjs7S0FFTUMsYUFBYTs7Ozs7Ozs7O0dBU2pCQyxNQVRpQixDQVNWQyxLQUFLakIsTUFBTCxDQVRVLENBQW5COztLQVdNa0IsU0FBU0MsU0FBU0MsS0FBVCxDQUFlLEtBQWYsRUFBcUJMLFVBQXJCLENBQWY7S0FDQ00sUUFBUTs7Ozs7O0VBRFQ7Ozs7Ozs7UUFjTztnQkFBQTtnQkFBQTt3QkFBQTs7RUFBUDtDQTVCRDs7QUNKQTs7QUNBQTs7OztBQ0FBO0FBQ0E7QUFhQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsYUFBYztLQUN2QkMsUUFBUVosVUFBVUcsVUFBVixDQUFkO0tBRUNkLE1BSDRCLEdBTXpCdUIsS0FOeUIsQ0FHNUJ2QixNQUg0QjtLQUk1QmtCLE1BSjRCLEdBTXpCSyxLQU55QixDQUk1QkwsTUFKNEI7S0FLNUJHLEtBTDRCLEdBTXpCRSxLQU55QixDQUs1QkYsS0FMNEI7OztLQVF2QnBCLEtBQUtGLEtBQUtDLE1BQUwsQ0FBWDs7Ozs7SUFLR3VCLEtBQUgsR0FBV3ZCLE1BQVg7SUFDR3FCLEtBQUgsR0FBV0EsS0FBWDtJQUNHRyxPQUFILEdBQWFBLE9BQWI7O1FBR092QixFQUFQO0NBbEJEOzs7OyJ9
