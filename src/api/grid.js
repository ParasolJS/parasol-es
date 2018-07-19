import { slickgrid stuff } from somewhere
import { difference } from underscore

import convert_to_float from "../util/convert_to_float";

const grid = (config, vis, flags) => {

  // NOTE: flag grid as active

  // place id col on left
  const column_keys = Object.keys(config.data[0]).slice();
  column_keys = difference(column_keys, ["id"]);
  column_keys.unshift("id");

  const columns = column_keys.map(
    (key,i) => ({
      id: key,
      name: key,
      field: key,
      sortable: true
    })
  );

  // const options = {
  //   enableCellNavigation: true,
  //   enableColumnReorder: false,
  //   multiColumnSort: false,
  //   editable: true,
  //   asyncEditorLoading: false,
  //   autoEdit: false
  // };

  const checkboxSelector = new Slick.CheckboxSelectColumn({
    cssClass: "slick-cell-checkboxsel"
  });
  columns.unshift(checkboxSelector.getColumnDefinition());

  // initialize
  config.dataView = new Slick.Data.DataView();
  config.grid = new Slick.Grid("#grid", config.dataView, columns, config.gridOptions);
  config.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
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
  config.dataView.syncGridSelection(config.grid, preserveHidden=false);

  // column sorting
  const sortcol = column_keys[0];
  const sortdir = 1;

  const comparer = (a, b) => {
      const x = convert_to_float(a[sortcol]);
      const y = convert_to_float(b[sortcol]);
      return (x == y ? 0 : (x > y ? 1 : -1));
  };

  // click header to sort grid column
  config.grid.onSort.subscribe( (e, args) => {
    sortdir = args.sortAsc ? 1 : -1;
    sortcol = args.sortCol.field;

    if ($.browser.msie && $.browser.version <= 8) {
      config.dataView.fastSort(sortcol, args.sortAsc);
    } else {
      config.dataView.sort(comparer, args.sortAsc);
    }
  });

  // highlight row in charts
  config.grid.onMouseEnter.subscribe( (e, args) => {
    const i = grid.getCellFromEvent(e).row;
    const d = config.brushed || config.data;
    vis.list.forEach( (pc) => {
      pc.highlight([d[i]]);
    })
  });
  config.grid.onMouseLeave.subscribe( (e, args) => {
    vis.list.forEach( (pc) => {
      pc.unhighlight();
    })
  });

  // mark / unmark rows in charts
  config.grid.onSelectedRowsChanged.subscribe( (e, args) => {
    const selected_row_ids = config.grid.getSelectedRows();
    if (config.brushed) {
      // nothing outside of brushed should be markable
      const d = config.brushed;
    } else {
      const d = config.data;
    }
    vis.list.forEach( (pc) => {
      pc.unmark();
      pc.mark(selected_row_ids); //NOTE: this may not work initially
    })
  });

};

export default grid;
