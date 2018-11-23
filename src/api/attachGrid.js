import SlickGrid from 'slickgrid-es6';
import { difference } from 'lodash-es';

import as_float from '../util/as_float';

/**
   * Creates a new instance of the grid.
   * @class SlickGrid
   * @constructor
   * @param {string} container:   DOM element in which grid will be placed.
   * @param {array}  columns:    An array of column definitions (objects).
   * @param {object} options:     SlickGrid options.
**/
const attachGrid = (config, ps, flags) =>
  function({ container, columns = null, options = null }) {
    flags.grid = true;

    const checkboxSelector = new SlickGrid.Plugins.CheckboxSelectColumn({
      cssClass: 'slick-cell-checkboxsel',
    });

    if (columns === null) {
      // place id col on left
      let column_keys = config.vars;
      column_keys = difference(column_keys, ['id']);
      // NOTE: remove line below to remove id col from grid
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
        enableColumnReorder: true,
        multiColumnSort: false,
        editable: true,
        asyncEditorLoading: false,
        autoEdit: false,
      };
    }

    // initialize
    config.dataView = new SlickGrid.Data.DataView();
    config.dataView.setItems(config.data);
    config.grid = new SlickGrid.Grid(container, config.dataView, columns, options);

    config.grid.setSelectionModel(
      new SlickGrid.Plugins.RowSelectionModel({ selectActiveRow: false })
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
    config.dataView.syncGridSelection(config.grid);

    // column sorting
    let sortcol = columns.map(c => c.name);
    sortcol.shift();
    let sortdir = 1;

    const comparer = (a, b) => {
        const x = as_float(a[sortcol]);
        const y = as_float(b[sortcol]);
        return (x == y ? 0 : (x > y ? 1 : -1));
    };

    // click header to sort grid column
    config.grid.onSort.subscribe( (e, args) => {
      sortdir = args.sortAsc ? 1 : -1;
      sortcol = args.sortCol.field;

      config.dataView.sort(comparer, args.sortAsc);
    });

    return this;
};

export default attachGrid;
