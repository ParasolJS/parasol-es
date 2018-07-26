import { Grid, Data, Plugins } from 'slickgrid-es6';
import difference from 'lodash/difference';

import convert_to_float from '../util/convert_to_float';

const attachGrid = (config, flags) =>
	function(columns = null, options = null) {

		flags.grid = true;

		if (columns === null) {
			// place id col on left
			let column_keys = Object.keys(config.data[0]).slice();
			column_keys = _difference(column_keys, ['id']);
			column_keys.unshift('id');

			columns = column_keys.map(
				(key,i) => ({
					id: key,
					name: key,
					field: key,
					sortable: true
				})
			);
		}

		if (options === null) {
			options = {
				enableCellNavigation: true,
				enableColumnReorder: false,
				multiColumnSort: false,
				editable: true,
				asyncEditorLoading: false,
				autoEdit: false
			};
		}

		const checkboxSelector = new Plugins.CheckboxSelectColumn({
			cssClass: 'slick-cell-checkboxsel'
		});
		columns.unshift(checkboxSelector.getColumnDefinition());

		// initialize
		config.dataView = new Data.DataView();
		config.grid = new Grid('#grid', config.dataView, columns, options);
		config.grid.setSelectionModel(new Plugins.RowSelectionModel({selectActiveRow: false}));
		config.grid.registerPlugin(checkboxSelector);

		// wire up model events to drive the grid
		config.dataView.onRowCountChanged.subscribe( (e, args) => {
			config.grid.updateRowCount();
			config.grid.render();
		});

		config.dataView.onRowsChanged.subscribe( (e, args) => {
			config.grid.invalidateRows(args.rows);
			config.grid.render();
		});

		// keep checkboxes matched with row on update
		config.dataView.syncGridSelection(config.grid, preserveHidden=true);

		// // column sorting
		// const sortcol = column_keys[0];
		// const sortdir = 1;
		//
		// const comparer = (a, b) => {
		//     const x = convert_to_float(a[sortcol]);
		//     const y = convert_to_float(b[sortcol]);
		//     return (x == y ? 0 : (x > y ? 1 : -1));
		// };
		//
		// // click header to sort grid column
		// config.grid.onSort.subscribe( (e, args) => {
		//   sortdir = args.sortAsc ? 1 : -1;
		//   sortcol = args.sortCol.field;
		//
		//   config.dataView.sort(comparer, args.sortAsc);
		// });

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

export default attachGrid;
