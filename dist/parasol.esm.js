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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYXNvbC5lc20uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkvaW5pdC5qcyIsIi4uL3NyYy9zdGF0ZS9kZWZhdWx0Q29uZmlnLmpzIiwiLi4vc3JjL3N0YXRlL2luaXRTdGF0ZS5qcyIsIi4uL3NyYy9zdGF0ZS9zaWRlRWZmZWN0cy5qcyIsIi4uL3NyYy9iaW5kRXZlbnRzLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdCwgc2VsZWN0QWxsIH0gZnJvbSAnZDMnO1xuaW1wb3J0IFBhckNvb3JkcyBmcm9tICdwYXJjb29yZC1lcyc7XG5cbi8qKlxuKiBTZXR1cCBhIG5ldyB2aXN1YWxpemF0aW9uLlxuKlxuKiBAcGFyYW0gY29uZmlnXG4qIEByZXR1cm5zIHtwdn0gYSBwYXJhc29sIGNsb3N1cmVcbiovXG5jb25zdCBpbml0ID0gKGNvbmZpZykgPT4ge1xuXHQvKipcbiAgKiBDcmVhdGUgYSB2aXN1YWxpemF0aW9uIHdpdGhpbiBhIGNvbnRhaW5lci4gVGhlIHNlbGVjdG9yIGNhbiBhbHNvIGJlIGEgZDMgc2VsZWN0aW9uLlxuICAqXG4gICogQHBhcmFtIHNlbGVjdGlvbiBhIGQzIHNlbGVjdGlvblxuICAqIEByZXR1cm5zIHtwdn0gaW5zdGFuY2UgZm9yIGNoYWluZWQgYXBpLCBjb21wYXRpYmxlIHdpdGggcGFyY29vcmRzIGFwaVxuICAqL1xuXHRjb25zdCBwdiA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXHRcdHNlbGVjdGlvbiA9IHB2LnNlbGVjdGlvbiA9IHNlbGVjdChzZWxlY3Rpb24pO1xuXG5cdFx0Ly8gc3RvcmUgcGMgY2hhcnRzIGluIGFycmF5XG5cdFx0cHYuY2hhcnRzID0gW107XG5cdFx0c2VsZWN0QWxsKHNlbGVjdGlvbilcblx0XHRcdC5lYWNoKGZ1bmN0aW9uKGQsaSkge1xuXHRcdFx0XHRwdi5jaGFydHNbaV0gPSBQYXJDb29yZHMoY29uZmlnLmNoYXJ0T3B0aW9ucykodGhpcyk7XG5cdFx0XHRcdC8vIC5kYXRhKGRhdGFzZXQpXG5cdFx0XHRcdC8vIC5oaWRlQXhpcyhoaWRkZW5baV0pXG5cdFx0XHRcdC8vIC5hbHBoYSgwLjQpXG5cdFx0XHRcdC8vIC5hbHBoYU9uQnJ1c2hlZCgwLjEpXG5cdFx0XHRcdC8vIC5yZW5kZXIoKVxuXHRcdFx0XHQvLyAucmVvcmRlcmFibGUoKVxuXHRcdFx0XHQvLyAubW9kZShcInF1ZXVlXCIpXG5cdFx0XHRcdC8vIC5icnVzaE1vZGUoXCIxRC1heGVzXCIpO1xuXHRcdFx0fSk7XG5cblxuXHRcdC8vIGZvciBjaGFpbmVkIGFwaVxuXHRcdHJldHVybiBwdjtcblx0fTtcblx0Ly8gZm9yIHBhcnRpYWwtYXBwbGljYXRpb24gc3R5bGUgcHJvZ3JhbW1pbmdcblx0cmV0dXJuIHB2O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcbiIsImNvbnN0IERlZmF1bHRDb25maWcgPSB7XG5cdGRhdGE6IFtdLFxuXHRwYXJ0aXRpb246IHt9LCAvLyBpZGVudGlmaWVzIHdoaWNoIHBsb3RzIHZhcnMgYXBwZWFyIG9uXG5cdGRhdGFWaWV3OiBmYWxzZSxcblx0Z3JpZDogZmFsc2UsXG5cdGdyaWRPcHRpb25zOiB7XG5cdFx0ZW5hYmxlQ2VsbE5hdmlnYXRpb246IHRydWUsXG5cdFx0ZW5hYmxlQ29sdW1uUmVvcmRlcjogZmFsc2UsXG5cdFx0bXVsdGlDb2x1bW5Tb3J0OiBmYWxzZSxcblx0XHRlZGl0YWJsZTogdHJ1ZSxcblx0XHRhc3luY0VkaXRvckxvYWRpbmc6IGZhbHNlLFxuXHRcdGF1dG9FZGl0OiBmYWxzZVxuXHR9LFxuXHRjaGFydE9wdGlvbnM6IHt9LFxuXHRsaW5rZWQ6IFtdLCAvLyBsaXN0IG9mIGxpbmtlZCBvYmplY3RzXG5cdGJydXNoZWQ6IFtdLCAvLyB1bmlvbiBvZiBhbGwgYnJ1c2hlZCBkYXRhXG5cdG1hcmtlZDogW10sIC8vIHVuaW9uIG9mIGFsbCBtYXJrZWQgZGF0YVxuXHRzZWxlY3Rpb25zOiBbXSwgLy8gdW5pb24gb2YgYnJ1c2hlZCBhbmQgbWFya2VkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0Q29uZmlnO1xuIiwiaW1wb3J0IHsgZW50cmllcywga2V5cywgZGlzcGF0Y2ggfSBmcm9tICdkMyc7XG5cbmltcG9ydCBEZWZhdWx0Q29uZmlnIGZyb20gJy4vZGVmYXVsdENvbmZpZyc7XG5cbmNvbnN0IGluaXRTdGF0ZSA9IHVzZXJDb25maWcgPT4ge1xuXHRjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29uZmlnLCB1c2VyQ29uZmlnKTtcblxuXHRjb25zb2xlLmxvZyhjb25maWcpO1xuXG5cdGNvbnN0IGV2ZW50VHlwZXMgPSBbXG5cdFx0Ly8gJ3JlbmRlcicsXG5cdFx0Ly8gJ3Jlc2l6ZScsXG5cdFx0Ly8gJ2hpZ2hsaWdodCcsXG5cdFx0Ly8gJ21hcmsnLFxuXHRcdC8vICdicnVzaCcsXG5cdFx0Ly8gJ2JydXNoZW5kJyxcblx0XHQvLyAnYnJ1c2hzdGFydCcsXG5cdFx0Ly8gJ2F4ZXNyZW9yZGVyJyxcblx0XS5jb25jYXQoa2V5cyhjb25maWcpKTtcblxuXHRjb25zdCBldmVudHMgPSBkaXNwYXRjaC5hcHBseSh0aGlzLCBldmVudFR5cGVzKSxcblx0XHRmbGFncyA9IHtcblx0XHRcdC8vIGJydXNoYWJsZTogZmFsc2UsXG5cdFx0XHQvLyByZW9yZGVyYWJsZTogZmFsc2UsXG5cdFx0XHQvLyBheGVzOiBmYWxzZSxcblx0XHRcdC8vIGludGVyYWN0aXZlOiBmYWxzZSxcblx0XHRcdC8vIGRlYnVnOiBmYWxzZSxcblx0XHR9O1xuXHQvLyB4c2NhbGUgPSBzY2FsZVBvaW50KCksXG5cdC8vIGRyYWdnaW5nID0ge30sXG5cdC8vIGF4aXMgPSBheGlzTGVmdCgpLnRpY2tzKDUpLFxuXHQvLyBjdHggPSB7fSxcblx0Ly8gY2FudmFzID0ge307XG5cblx0cmV0dXJuIHtcblx0XHRjb25maWcsXG5cdFx0ZXZlbnRzLFxuXHRcdGV2ZW50VHlwZXMsXG5cdFx0ZmxhZ3MsXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0U3RhdGU7XG4iLCIvLyBzaWRlIGVmZmVjdHMgZm9yIHNldHRlcnNcbmltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnZDMtZGlzcGF0Y2gnO1xuIiwiLy8gc2lkZSBlZmZlY3RzIGZvciBzZXR0ZXJzXG5pbXBvcnQgc2lkZUVmZmVjdHMgZnJvbSAnLi9zdGF0ZS9zaWRlRWZmZWN0cyc7XG4iLCIvL2Nzc1xuaW1wb3J0ICcuL3BhcmFsbGVsLWNvb3JkaW5hdGVzLmNzcyc7XG5cbi8vbWlzY1xuXG5cbi8vYXBpXG5pbXBvcnQgaW5pdCBmcm9tICcuL2FwaS9pbml0JztcblxuaW1wb3J0IGluaXRTdGF0ZSBmcm9tICcuL3N0YXRlL2luaXRTdGF0ZSc7XG5pbXBvcnQgYmluZEV2ZW50cyBmcm9tICcuL2JpbmRFdmVudHMnO1xuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5cblxuY29uc3QgUGFyYVZpcyA9IHVzZXJDb25maWcgPT4ge1xuXHRjb25zdCBzdGF0ZSA9IGluaXRTdGF0ZSh1c2VyQ29uZmlnKTtcblx0Y29uc3Qge1xuXHRcdGNvbmZpZyxcblx0XHRldmVudHMsXG5cdFx0ZmxhZ3MsXG5cdH0gPSBzdGF0ZTtcblxuXHRjb25zdCBwdiA9IGluaXQoY29uZmlnKTtcblxuXHQvLyBiaW5kRXZlbnRzKCk7XG5cblx0Ly8gZXhwb3NlIHRoZSBzdGF0ZSBvZiB0aGUgY2hhcnRcblx0cHYuc3RhdGUgPSBjb25maWc7XG5cdHB2LmZsYWdzID0gZmxhZ3M7XG5cdHB2LnZlcnNpb24gPSB2ZXJzaW9uO1xuXG5cblx0cmV0dXJuIHB2O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFyYVZpcztcbiJdLCJuYW1lcyI6WyJpbml0IiwiY29uZmlnIiwicHYiLCJzZWxlY3Rpb24iLCJzZWxlY3QiLCJjaGFydHMiLCJlYWNoIiwiZCIsImkiLCJQYXJDb29yZHMiLCJjaGFydE9wdGlvbnMiLCJEZWZhdWx0Q29uZmlnIiwiaW5pdFN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwidXNlckNvbmZpZyIsImxvZyIsImV2ZW50VHlwZXMiLCJjb25jYXQiLCJrZXlzIiwiZXZlbnRzIiwiZGlzcGF0Y2giLCJhcHBseSIsImZsYWdzIiwiUGFyYVZpcyIsInN0YXRlIiwidmVyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7O0FBR0E7Ozs7OztBQU1BLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFELEVBQVk7Ozs7Ozs7S0FPbEJDLEtBQUssU0FBTEEsRUFBSyxDQUFTQyxTQUFULEVBQW9CO2NBQ2xCRCxHQUFHQyxTQUFILEdBQWVDLE9BQU9ELFNBQVAsQ0FBM0I7OztLQUdHRSxNQUFILEdBQVksRUFBWjtZQUNVRixTQUFWLEVBQ0VHLElBREYsQ0FDTyxVQUFTQyxDQUFULEVBQVdDLENBQVgsRUFBYztNQUNoQkgsTUFBSCxDQUFVRyxDQUFWLElBQWVDLFVBQVVSLE9BQU9TLFlBQWpCLEVBQStCLElBQS9CLENBQWY7Ozs7Ozs7OztHQUZGOzs7U0FlT1IsRUFBUDtFQXBCRDs7UUF1Qk9BLEVBQVA7Q0E5QkQ7O0FDVEEsSUFBTVMsZ0JBQWdCO09BQ2YsRUFEZTtZQUVWLEVBRlU7V0FHWCxLQUhXO09BSWYsS0FKZTtjQUtSO3dCQUNVLElBRFY7dUJBRVMsS0FGVDttQkFHSyxLQUhMO1lBSUYsSUFKRTtzQkFLUSxLQUxSO1lBTUY7RUFYVTtlQWFQLEVBYk87U0FjYixFQWRhO1VBZVosRUFmWTtTQWdCYixFQWhCYTthQWlCVCxFQWpCUztDQUF0Qjs7OztBQ0lBLElBQU1DLFlBQVksU0FBWkEsU0FBWSxhQUFjO0tBQ3pCWCxTQUFTWSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkgsYUFBbEIsRUFBaUNJLFVBQWpDLENBQWY7O1NBRVFDLEdBQVIsQ0FBWWYsTUFBWjs7S0FFTWdCLGFBQWE7Ozs7Ozs7OztHQVNqQkMsTUFUaUIsQ0FTVkMsS0FBS2xCLE1BQUwsQ0FUVSxDQUFuQjs7S0FXTW1CLFNBQVNDLFNBQVNDLEtBQVQsQ0FBZSxLQUFmLEVBQXFCTCxVQUFyQixDQUFmO0tBQ0NNLFFBQVE7Ozs7OztFQURUOzs7Ozs7O1FBY087Z0JBQUE7Z0JBQUE7d0JBQUE7O0VBQVA7Q0E5QkQ7O0FDSkE7O0FDQUE7Ozs7QUNBQTtBQUNBO0FBYUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLGFBQWM7S0FDdkJDLFFBQVFiLFVBQVVHLFVBQVYsQ0FBZDtLQUVDZCxNQUg0QixHQU16QndCLEtBTnlCLENBRzVCeEIsTUFINEI7S0FJNUJtQixNQUo0QixHQU16QkssS0FOeUIsQ0FJNUJMLE1BSjRCO0tBSzVCRyxLQUw0QixHQU16QkUsS0FOeUIsQ0FLNUJGLEtBTDRCOzs7S0FRdkJyQixLQUFLRixLQUFLQyxNQUFMLENBQVg7Ozs7O0lBS0d3QixLQUFILEdBQVd4QixNQUFYO0lBQ0dzQixLQUFILEdBQVdBLEtBQVg7SUFDR0csT0FBSCxHQUFhQSxPQUFiOztRQUdPeEIsRUFBUDtDQWxCRDs7OzsifQ==
