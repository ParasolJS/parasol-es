import Slickgrid from 'slickgrid-es6';
import { difference } from 'lodash-es';

import as_float from '../util/as_float';

const attachGrid = (config, flags) => (columns = null, options = null) => {
  flags.grid = true;

  const checkboxSelector = new slickgrid.Plugins.CheckboxSelectColumn({
    cssClass: 'slick-cell-checkboxsel',
  });

  if (columns === null) {
    // place id col on left
    let column_keys = Object.keys(config.data[0]).slice();
    column_keys = difference(column_keys, ['id']);
    column_keys.unshift('id');

    columns = column_keys.map((key, i) => ({
      id: key,
      name: key,
      field: key,
      sortable: true,
    }));
    columns.unshift(checkboxSelector.getColumnDefinition());
  }

  if (options === null) {
    options = {
      enableCellNavigation: true,
      enableColumnReorder: false,
      multiColumnSort: false,
      editable: true,
      asyncEditorLoading: false,
      autoEdit: false,
    };
  }

  // initialize
  config.dataView = new slickgrid.Data.DataView();
  config.grid = new slickgrid.Grid('#grid', config.dataView, columns, options);
  config.grid.setSelectionModel(
    new slickgrid.Plugins.RowSelectionModel({ selectActiveRow: false })
  );
  config.grid.registerPlugin(checkboxSelector);

  // wire up model events to drive the grid
  config.dataView.onRowCountChanged.subscribe((e, args) => {
    config.grid.updateRowCount();
    config.grid.render();
  });

  config.dataView.onRowsChanged.subscribe((e, args) => {
    config.grid.invalidateRows(args.rows);
    config.grid.render();
  });

  // keep checkboxes matched with row on update
  // config.dataView.syncGridSelection(config.grid, preserveHidden=true);

  // // column sorting
  // const sortcol = column_keys[0];
  // const sortdir = 1;
  //
  // const comparer = (a, b) => {
  //     const x = as_float(a[sortcol]);
  //     const y = as_float(b[sortcol]);
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

  return this;
};

export default attachGrid;
