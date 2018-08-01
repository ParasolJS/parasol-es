import sync from './sync';

// link brush activity between user specified charts, and grid if it exists
const linked = (config, ps, flags) =>
	function (chartList = ps.charts) {
		config.linked = chartList;
		chartList.forEach( pc => {
			pc.on('brush', sync(config, ps, flags) );
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

export default linked;
