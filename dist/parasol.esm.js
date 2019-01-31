import { selectAll, scaleOrdinal, schemeCategory10, csvFormat as csvFormat$1, keys, dispatch } from 'd3';
import ParCoords from 'parcoord-es';
import SlickGrid from 'slickgrid-es6';
import { difference, union, intersection, includes, isPlainObject } from 'lodash-es';
import { csvFormat, csvParse } from 'd3-dsv';
import kmeans from 'ml-kmeans';

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
    selection = ps.selection = selectAll(selection);

    // store pc charts in array
    ps.charts = [];
    selection.each(function (d, i) {
      ps.charts[i] = ParCoords(config.chartOptions)(this).data(config.data).hideAxis(['id']).alpha(0.4).render().mode('queue').brushMode('1D-axes'); //1D-axes must be used with linking

      // add "id" to partition globally
      config.partition[i] = ['id'];
    });

    // for chained api
    return ps;
  };
  // for partial-application style programming
  return ps;
};

var as_float = function as_float(x) {
  var converted = parseFloat(x);
  return isNaN(converted) ? x : converted;
};

/**
 * Creates a new instance of the grid.
 * @class SlickGrid
 * @constructor
 * @param {string} container:   DOM element in which grid will be placed.
 * @param {array}  columns:    An array of column definitions (objects).
 * @param {object} options:     SlickGrid options.
 **/
var attachGrid = function attachGrid(config, ps, flags) {
  return function (_ref) {
    var container = _ref.container,
        _ref$columns = _ref.columns,
        columns = _ref$columns === undefined ? null : _ref$columns,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? null : _ref$options;

    flags.grid = true;

    var checkboxSelector = new SlickGrid.Plugins.CheckboxSelectColumn({
      cssClass: 'slick-cell-checkboxsel'
    });

    if (columns === null) {
      // place id col on left
      var column_keys = config.vars;
      column_keys = difference(column_keys, ['id']);
      // NOTE: remove line below to remove id col from grid
      column_keys.unshift('id');

      columns = column_keys.map(function (key, i) {
        return {
          id: key,
          name: key,
          field: key,
          sortable: true
        };
      });
      columns.unshift(checkboxSelector.getColumnDefinition());
    }

    if (options === null) {
      options = {
        enableCellNavigation: true,
        enableColumnReorder: true,
        multiColumnSort: false,
        editable: true,
        asyncEditorLoading: false,
        autoEdit: false
      };
    }

    // initialize
    config.dataView = new SlickGrid.Data.DataView();
    config.dataView.setItems(config.data);
    config.grid = new SlickGrid.Grid(container, config.dataView, columns, options);

    config.grid.setSelectionModel(new SlickGrid.Plugins.RowSelectionModel({ selectActiveRow: false }));
    config.grid.registerPlugin(checkboxSelector);

    // wire up model events to drive the grid
    config.dataView.onRowCountChanged.subscribe(function (e, args) {
      config.grid.updateRowCount();
      config.grid.render();
    });

    config.dataView.onRowsChanged.subscribe(function (e, args) {
      config.grid.invalidateRows(args.rows);
      config.grid.render();
    });

    // keep checkboxes matched with row on update
    config.dataView.syncGridSelection(config.grid);

    // column sorting
    var sortcol = columns.map(function (c) {
      return c.name;
    });
    sortcol.shift();
    var sortdir = 1;

    var comparer = function comparer(a, b) {
      var x = as_float(a[sortcol]);
      var y = as_float(b[sortcol]);
      return x == y ? 0 : x > y ? 1 : -1;
    };

    // click header to sort grid column
    config.grid.onSort.subscribe(function (e, args) {
      sortdir = args.sortAsc ? 1 : -1;
      sortcol = args.sortCol.field;

      config.dataView.sort(comparer, args.sortAsc);
    });

    return this;
  };
};

/**
 * Update data displayed in grid.
 * @param {array}  data:    array of objects.
 * @param {array} columns:  column definitions.
 **/
var gridUpdate = function gridUpdate(config, ps, flags) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$data = _ref.data,
        data = _ref$data === undefined ? null : _ref$data,
        _ref$columns = _ref.columns,
        columns = _ref$columns === undefined ? null : _ref$columns;

    if (columns !== null) {
      config.grid.setColumns(columns);
      config.grid.render();
    }
    if (data === null) {
      data = config.selections();
      if (data.length === 0) {
        // if selections empty, use full dataset
        data = config.data;
      }
    }
    // if marked data exists, keep in grid
    if (config.marked.length) {
      data = union(data, config.marked);
    }

    var comparer = function comparer(a, b) {
      var x = as_float(a['id']);
      var y = as_float(b['id']);
      return x == y ? 0 : x > y ? 1 : -1;
    };

    config.dataView.beginUpdate();
    config.dataView.setItems(data);
    config.dataView.sort(comparer, true);
    config.dataView.endUpdate();

    return this;
  };
};

// synchronize data between linked components
var sync = function sync(config, ps, flags) {
  return function () {
    //obtain array of brushed data for each chart
    var brush_extents = [];
    ps.linked.forEach(function (pc) {
      brush_extents.push(pc.selected());
    });

    //check edge case where all brushes individually clicked away
    if (union.apply(undefined, brush_extents).length == 0) {
      ps.linked.forEach(function (pc) {
        pc.brushReset();
      });
      config.brushed = [];
      // update data in grid
      if (flags.grid) {
        ps.gridUpdate(config.data);
      }
    } else {
      var brushed = intersection.apply(undefined, brush_extents);
      ps.linked.forEach(function (pc) {
        pc.brushed(brushed).render();
      });

      // NOTE: once pc.selected issue fixed, remove if statement and uncomment line below
      //config.brushed = brushed;
      if (brushed.length < config.data.length) {
        config.brushed = brushed;
      } else {
        config.brushed = [];
      }
      // update data in grid
      // NOTE: once pc.selected fixed, remove arg from gridUpdate
      if (flags.grid) {
        ps.gridUpdate({ data: brushed });
      }
    }
  };
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Link brush activity between specified charts, and grid if it exists.
 *
 * @param {array} chartIDs:   charts to be linked (defaults to all).
 **/
var linked = function linked(config, ps, flags) {
  return function () {
    var chartIDs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [].concat(toConsumableArray(Array(ps.charts.length).keys()));

    // force numeric type for indexing
    chartIDs = chartIDs.map(Number);

    // setup linked components
    ps.linked = [];
    chartIDs.forEach(function (i, j) {
      ps.linked[j] = ps.charts[i];
    });

    ps.linked.forEach(function (pc) {
      pc.on('brush', sync(config, ps, flags));
    });

    // connect grid
    if (flags.grid) {
      // highlight row in chart
      config.grid.onMouseEnter.subscribe(function (e, args) {
        var i = config.grid.getCellFromEvent(e).row;
        var d = config.dataView.getItems() || config.data;
        ps.linked.forEach(function (pc) {
          pc.highlight([d[i]]);
        });
      });
      config.grid.onMouseLeave.subscribe(function (e, args) {
        ps.linked.forEach(function (pc) {
          pc.unhighlight();
        });
      });

      // mark row in chart
      config.grid.onSelectedRowsChanged.subscribe(function (e, args) {
        // reset and update selected rows
        var selected_row_ids = config.grid.getSelectedRows();
        var d = config.dataView.getItems() || config.data;
        ps.linked.forEach(function (pc) {
          pc.unmark();
        });
        selected_row_ids.forEach(function (i) {
          ps.linked.forEach(function (pc) {
            pc.mark([d[i]]);
          });
        });

        // update marked data
        config.marked = ps.linked[0].marked();

        // refresh grid if brushes are applied
        if (config.brushed.length) {
          ps.gridUpdate();
        }
      });
    }

    return this;
  };
};

// wrangling tools to manipulate data for processing values

// d3 data is formatted as array of objects, each row is an object
// convert to object of arrays, each array is a column
// e.g. {"var1": [col1], "var2": [col2]}
var array_to_object = function array_to_object(data) {
  return data.reduce(function (acc, obj) {
    Object.keys(obj).forEach(function (k) {
      acc[k] = (acc[k] || []).concat(Number(obj[k]));
    });
    return acc;
  }, {});
};

// data is formatted as 'data frame' with columns as keys
// convert back to array of objects with rows as objects
var object_to_array = function object_to_array(df, data) {
  var result = [];
  Object.entries(df).forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        values = _ref2[1];

    values.forEach(function (val, i) {
      result[i] = result[i] || {};
      // get original string if value is NaN
      if (isNaN(val)) {
        result[i][key] = data[i][key];
      } else {
        result[i][key] = val.toString();
      }
    });
  });
  return result;
};

// inspired by: https://gist.github.com/Daniel-Hug/7273430
var arr = {
  max: function max(array) {
    return Math.max.apply(null, array);
  },

  min: function min(array) {
    return Math.min.apply(null, array);
  },

  range: function range(array) {
    return arr.max(array) - arr.min(array);
  },

  extents: function extents(array) {
    return [arr.min(array), arr.max(array)];
  },

  sum: function sum(array) {
    var num = 0;
    for (var i = 0, l = array.length; i < l; i++) {
      num += array[i];
    }return num;
  },

  mean: function mean(array) {
    return arr.sum(array) / array.length;
  },

  variance: function variance(array) {
    var mean = arr.mean(array);
    return arr.mean(array.map(function (num) {
      return Math.pow(num - mean, 2);
    }));
  },

  standardDeviation: function standardDeviation(array) {
    return Math.sqrt(arr.variance(array));
  },

  zScores: function zScores(array) {
    var mean = arr.mean(array);
    var standardDeviation = arr.standardDeviation(array);
    return array.map(function (num) {
      return (num - mean) / standardDeviation;
    });
  },

  norms: function norms(array) {
    var extents = arr.extents(array);
    return array.map(function (num) {
      return (num - extents[0]) / (extents[1] - extents[0]);
    });
  }
};

// convert values to zscores
var standardize = function standardize(data) {
  // reformat data
  var df = array_to_object(data);

  // standardize values
  Object.keys(df).forEach(function (key) {
    df[key] = arr.zScores(df[key]);
  });

  // convert back to original data type
  return object_to_array(df, data);
};

// format data values as strings

var format_data = function format_data(data) {
  return csvParse(csvFormat(data));
};

// add column defintion to grid columns
var add_column = function add_column(columns, col_name) {
  // ignore repeats
  var names = columns.map(function (col) {
    return col.name;
  });
  if (includes(names, col_name)) {
    return columns;
  } else {
    var col_def = {
      id: col_name,
      name: col_name,
      field: col_name,
      sortable: true
    };
    columns.push(col_def);
    return columns;
  }
};

/**
 * Partition data into k clusters in which each data element belongs to
 * the cluster with the nearest mean.
 *
 * @param {int} k: number of clusters
 * @param {array} displayIDs: charts that will display cluster colors
 * @param {} palette: d3 palette or function mapping cluster ids to color
 * @param {array} vars: variables used for clustering. NOTE: associated data must be numeric
 * @param {object} options: ml-kmeans options
 * @param {bool} std: convert values to zscores to obtain unbiased clusters
 * @param {bool} hidden: determines whether cluster axis will be displayed on charts (can be individually updated with hideAxis later)
 */
var cluster = function cluster(config, ps, flags) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$k = _ref.k,
        k = _ref$k === undefined ? 3 : _ref$k,
        _ref$vars = _ref.vars,
        vars = _ref$vars === undefined ? config.vars : _ref$vars,
        _ref$displayIDs = _ref.displayIDs,
        displayIDs = _ref$displayIDs === undefined ? [].concat(toConsumableArray(Array(ps.charts.length).keys())) : _ref$displayIDs,
        _ref$palette = _ref.palette,
        palette = _ref$palette === undefined ? schemeCategory10 : _ref$palette,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options,
        _ref$std = _ref.std,
        std = _ref$std === undefined ? true : _ref$std,
        _ref$hidden = _ref.hidden,
        hidden = _ref$hidden === undefined ? true : _ref$hidden;

    if (Array.isArray(palette)) {
      var scheme = scaleOrdinal(palette);
      palette = function palette(d) {
        return scheme(Number(d['cluster']));
      };
    }

    var data = [];
    if (std === true) {
      data = standardize(config.data);
    } else {
      data = config.data;
    }

    // setup object to filter variables that will be used in clustering
    var cluster_vars = {};
    vars.forEach(function (v) {
      cluster_vars[v] = true;
    });

    // get data values in array of arrays for clustering
    // (values from each row object captured in array)
    var values = [];
    data.forEach(function (d) {
      var target = [];
      Object.entries(d).forEach(function (_ref2) {
        var _ref3 = slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        // only take values from variables listed in function argument
        if (cluster_vars[key] == true) {
          target.push(Number(value));
        }
      });
      values.push(target);
    });

    // preform clustering and update config data
    var result = kmeans(values, k, options);
    config.data.forEach(function (d, i) {
      d.cluster = result.clusters[i].toString();
    });
    // console.log('kmeans++');
    // console.log(result.iterations, result.centroids.map(c => c.error));
    // console.log(result.centroids);

    // hide cluster axis and show colors by default
    if (hidden == true) {
      Object.keys(config.partition).forEach(function (id) {
        config.partition[id].push('cluster');
      });
    }

    // format data, update charts
    config.vars.push('cluster');
    config.data = format_data(config.data);
    ps.charts.forEach(function (pc) {
      pc.data(config.data).render().createAxes();
      // .updateAxes();
    });

    ps.charts.forEach(function (pc, i) {
      // only color charts in displayIDs
      if (displayIDs.includes(i)) {
        pc.color(palette);
      }
      pc.hideAxis(config.partition[i]).render().updateAxes(0);
    });

    if (flags.grid) {
      // add column
      var cols = add_column(config.grid.getColumns(), 'cluster');
      ps.gridUpdate({ columns: cols });
    }

    return this;
  };
};

// normalize data values (scale: 0-1) for unbiased aggregate scores
var normalize = function normalize(data) {
  // reformat data
  var df = array_to_object(data);

  // normalize values
  Object.entries(df).forEach(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        col = _ref2[1];

    df[key] = arr.norms(col);
  });

  // convert back to original data type
  return object_to_array(df, data);
};

/**
 * Compute individual weighted sums for each solution based on
 * user specified weights.
 *
 * @param {object} weights: specify weight of each variable, unspecified variables will be assigned weight 0
 * @param {array} displayIDs: charts that will display 'weighted sum' variable; defaults to all charts
 * @param {bool} norm: normalize values (0-1) to obtain fair weighting
 */
var weightedSum = function weightedSum(config, ps, flags) {
  return function (_ref) {
    var weights = _ref.weights,
        _ref$displayIDs = _ref.displayIDs,
        displayIDs = _ref$displayIDs === undefined ? [].concat(toConsumableArray(Array(ps.charts.length).keys())) : _ref$displayIDs,
        _ref$norm = _ref.norm,
        norm = _ref$norm === undefined ? true : _ref$norm;

    // NOTE: if data is re-scored, old score will not affect new score unless it is given a weight itself in the 'weights' object

    // force numeric type for indexing
    displayIDs = displayIDs.map(Number);

    var data = [];
    if (norm === true) {
      data = normalize(config.data);
    } else {
      data = config.data;
    }

    // compute initial weight for each data element
    var row_totals = [];
    data.forEach(function (d, i) {
      var d_weight = 0;
      Object.entries(d).forEach(
      // find cumulative sum of weight times value
      function (_ref2) {
        var _ref3 = slicedToArray(_ref2, 2),
            key = _ref3[0],
            val = _ref3[1];

        if (weights[key]) {
          d_weight += val * weights[key];
        }
      });
      data[i].score = d_weight;
      row_totals.push(d_weight);
    });

    // normalize all values against total weight and assign values
    var extents = arr.extents(row_totals);
    data.forEach(function (d, i) {
      config.data[i]['weighted sum'] = ((d.score - extents[0]) / (extents[1] - extents[0])).toString();
    });

    // partition scores var on charts
    Object.keys(config.partition).forEach(function (i) {
      if (!displayIDs.includes(Number(i))) {
        // chart not in displayIDs, hidden on this chart
        config.partition[Number(i)].push('weighted sum');
      }
    });

    // weighted sums are ready, update data and charts
    config.vars.push('weighted sum');
    config.data = format_data(config.data);
    ps.charts.forEach(function (pc, i) {
      pc.data(config.data).hideAxis(config.partition[i]).render().createAxes();
      // .updateAxes();
    });
    // NOTE: need to maintain current state of charts somehow

    if (flags.grid) {
      // add column
      var cols = add_column(config.grid.getColumns(), 'weighted sum');
      ps.gridUpdate({ columns: cols });
    }

    return this;
  };
};

/**
 * Hide a set of axes globally or from specific charts.
 *
 * @param partition: array or object idenifying axes to be hidden; if object, format as { chart id: [hidden vars]}
 */
var hideAxes = function hideAxes(config, ps, flags) {
  return function (partition) {
    if (Array.isArray(partition)) {
      // append array to every key in config.partition
      Object.keys(config.partition).forEach(function (id) {
        config.partition[id] = union(config.partition[id], partition);
      });
    } else if (isPlainObject(partition)) {
      // take union of values for each key that is also in config.partition
      Object.entries(partition).forEach(function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            key = _ref2[0],
            values = _ref2[1];

        if (config.partition[key]) {
          config.partition[key] = union(config.partition[key], partition[key]);
        }
      });
    } else {
      throw 'Error: please provide an object or array as argument.';
    }

    // iterate over partition keys and hide all variables in value array
    Object.entries(config.partition).forEach(function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          chartID = _ref4[0],
          vars = _ref4[1];

      ps.charts[chartID].hideAxis(vars);
      ps.charts[chartID].render().updateAxes(500);
    });

    return this;
  };
};

/**
 * Show a set of axes globally or on specific charts
 *
 * @param partition: array or object idenifying axes to be shown; if object, format as { chart id: [vars to show]}
 */
var showAxes = function showAxes(config, ps, flags) {
  return function (partition) {
    if (typeof partition === 'undefined') {
      // show all axes on all charts (empty partition)
      Object.keys(config.partition).forEach(function (id) {
        config.partition[id] = [];
      });
    } else if (Array.isArray(partition)) {
      // remove array from every key in config.partition
      Object.keys(config.partition).forEach(function (id) {
        config.partition[id] = difference(config.partition[id], partition);
      });
    } else if (isPlainObject(partition)) {
      // take difference of values for each key that is also in config.partition
      // (i.e. remove from hidden)
      Object.entries(partition).forEach(function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            key = _ref2[0],
            values = _ref2[1];

        if (config.partition[key]) {
          config.partition[key] = difference(config.partition[key], partition[key]);
        }
      });
    } else {
      throw 'Error: please provide an object or array as argument.';
    }

    // iterate over partition keys and hide only remaining variables in value array
    Object.entries(config.partition).forEach(function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          chartID = _ref4[0],
          vars = _ref4[1];

      ps.charts[chartID].hideAxis(vars);
      ps.charts[chartID].render().updateAxes(500);
    });

    return this;
  };
};

/**
 * Specify the axes that will appear in each chart. Default for unspecified charts is to display all axes.
 *
 * @param {object} layout:  indentify a list of axes to be shown on each chart; format as { chart id: [vars to show]}
 */
var setAxesLayout = function setAxesLayout(config, ps, flags) {
  return function (layout) {
    if (isPlainObject(layout)) {
      // take difference of all variables and layout variables
      // i.e. show only those which appear in both data and layout
      Object.entries(layout).forEach(function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            key = _ref2[0],
            values = _ref2[1];

        if (config.partition[key]) {
          config.partition[key] = difference(config.vars.concat('id'), layout[key]);
        }
      });
    } else {
      throw 'Error: please provide layout as a plain object.';
    }

    // iterate over partition keys and hide only remaining variables in value array
    Object.entries(config.partition).forEach(function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          chartID = _ref4[0],
          vars = _ref4[1];

      ps.charts[chartID].hideAxis(vars);
      ps.charts[chartID].render().updateAxes(0);
    });

    return this;
  };
};

/**
 * Keep only selected data update components
 *
 * @param data: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: Any existing brushes or marks will be overwritten
 */
var keepData = function keepData(config, ps, flags) {
  return function (data) {
    // identify data
    var d = [];
    if (data == 'brushed') {
      d = config.brushed;
    } else if (data == 'marked') {
      d = config.marked;
    } else if (data == 'both') {
      d = config.selections();
    } else {
      throw "Please specify one of {'brushed', 'marked', 'both'}";
    }

    if (d.length > 0) {
      // reset selections and update config
      ps.resetSelections('both');

      // update data, charts, and grid
      config.data = d;
      ps.charts.forEach(function (pc) {
        pc.data(d).render.default();
        pc.brushReset();
      });
      if (flags.grid) {
        ps.gridUpdate();
      }
    } else {
      throw 'Error: No data selected.';
    }

    return this;
  };
};

/**
 * Remove selected data and components
 *
 * @param data: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: Any existing brushes or marks will be overwritten
 */
var removeData = function removeData(config, ps, flags) {
  return function (data) {
    // identify data
    var d = [];
    if (data == 'brushed') {
      d = config.brushed;
    } else if (data == 'marked') {
      d = config.marked;
    } else if (data == 'both') {
      d = config.selections();
    } else {
      throw "Please specify one of {'brushed', 'marked', 'both'}";
    }
    d = difference(config.data, d);

    if (d.length > 0 && d.length < config.data.length) {
      // reset selections and update config
      ps.resetSelections('both');

      // update data, charts, and grid
      config.data = d;
      ps.charts.forEach(function (pc) {
        pc.data(d).render.default();
        pc.brushReset();
      });
      if (flags.grid) {
        ps.gridUpdate();
      }
    } else {
      throw 'Error: No data selected.';
    }

    return this;
  };
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var FileSaver = createCommonjsModule(function (module) {
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || function (view) {
	// IE <10 is explicitly unsupported

	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var doc = view.document
	// only get URL when necessary in case Blob.js hasn't overridden it yet
	,
	    get_URL = function get_URL() {
		return view.URL || view.webkitURL || view;
	},
	    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
	    can_use_save_link = "download" in save_link,
	    click = function click(node) {
		var event = new MouseEvent("click");
		node.dispatchEvent(event);
	},
	    is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
	    is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
	    throw_outside = function throw_outside(ex) {
		(view.setImmediate || view.setTimeout)(function () {
			throw ex;
		}, 0);
	},
	    force_saveable_type = "application/octet-stream"
	// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
	,
	    arbitrary_revoke_timeout = 1000 * 40 // in ms
	,
	    revoke = function revoke(file) {
		var revoker = function revoker() {
			if (typeof file === "string") {
				// file is an object URL
				get_URL().revokeObjectURL(file);
			} else {
				// file is a File
				file.remove();
			}
		};
		setTimeout(revoker, arbitrary_revoke_timeout);
	},
	    dispatch$$1 = function dispatch$$1(filesaver, event_types, event) {
		event_types = [].concat(event_types);
		var i = event_types.length;
		while (i--) {
			var listener = filesaver["on" + event_types[i]];
			if (typeof listener === "function") {
				try {
					listener.call(filesaver, event || filesaver);
				} catch (ex) {
					throw_outside(ex);
				}
			}
		}
	},
	    auto_bom = function auto_bom(blob) {
		// prepend BOM for UTF-8 XML and text/* types (including HTML)
		// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
		if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
			return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
		}
		return blob;
	},
	    FileSaver = function FileSaver(blob, name, no_auto_bom) {
		if (!no_auto_bom) {
			blob = auto_bom(blob);
		}
		// First try a.download, then web filesystem, then object URLs
		var filesaver = this,
		    type = blob.type,
		    force = type === force_saveable_type,
		    object_url,
		    dispatch_all = function dispatch_all() {
			dispatch$$1(filesaver, "writestart progress write writeend".split(" "));
		}
		// on any filesys errors revert to saving with object URLs
		,
		    fs_error = function fs_error() {
			if ((is_chrome_ios || force && is_safari) && view.FileReader) {
				// Safari doesn't allow downloading of blob urls
				var reader = new FileReader();
				reader.onloadend = function () {
					var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
					var popup = view.open(url, '_blank');
					if (!popup) view.location.href = url;
					url = undefined; // release reference before dispatching
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				};
				reader.readAsDataURL(blob);
				filesaver.readyState = filesaver.INIT;
				return;
			}
			// don't create more object URLs than needed
			if (!object_url) {
				object_url = get_URL().createObjectURL(blob);
			}
			if (force) {
				view.location.href = object_url;
			} else {
				var opened = view.open(object_url, "_blank");
				if (!opened) {
					// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
					view.location.href = object_url;
				}
			}
			filesaver.readyState = filesaver.DONE;
			dispatch_all();
			revoke(object_url);
		};
		filesaver.readyState = filesaver.INIT;

		if (can_use_save_link) {
			object_url = get_URL().createObjectURL(blob);
			setTimeout(function () {
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				dispatch_all();
				revoke(object_url);
				filesaver.readyState = filesaver.DONE;
			});
			return;
		}

		fs_error();
	},
	    FS_proto = FileSaver.prototype,
	    saveAs = function saveAs(blob, name, no_auto_bom) {
		return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
	};
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function (blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function () {};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

	return saveAs;
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || commonjsGlobal.content);
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (module.exports) {
	module.exports.saveAs = saveAs;
}
});
var FileSaver_1 = FileSaver.saveAs;

/**
 * Export selected data to new csv and download
 *
 * @param {string} selection: one of {'brushed', 'marked', 'both'}
 * @param {string} filename:  name of csv file to be downloaded
 * @param {boolean} exportAll:  override selection param and export all data
 */
var exportData = function exportData(config, ps, flags) {
  return function (_ref) {
    var _ref$selection = _ref.selection,
        selection = _ref$selection === undefined ? 'both' : _ref$selection,
        _ref$filename = _ref.filename,
        filename = _ref$filename === undefined ? null : _ref$filename,
        _ref$exportAll = _ref.exportAll,
        exportAll = _ref$exportAll === undefined ? false : _ref$exportAll;

    if (filename === null) {
      filename = 'parasol_data.csv';
    }

    // identify data
    var d = [];
    if (exportAll) {
      d = config.data;
    } else if (selection == 'brushed') {
      d = config.brushed;
    } else if (selection == 'marked') {
      d = config.marked;
    } else if (selection == 'both') {
      d = config.selections();
    } else {
      throw "Please specify one of {'brushed', 'marked', 'both'}";
    }

    if (d.length > 0) {
      // format data as csv
      // NOTE: include assigned data id number?
      var csv = csvFormat$1(d, config.vars);

      // create url and download
      var file = new Blob([csv], { type: 'text/csv' });
      FileSaver_1(file, filename);
    } else {
      throw 'Error: No data selected.';
    }
    return this;
  };
};

/**
 * Selections are the collection of all brushed and marked data; reset all or just a subset (brushed or marked)
 *
 * @param {string} selection: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: if linked charts exist, only those are affected
 */
var resetSelections = function resetSelections(config, ps, flags) {
  return function (selection) {
    if (selection == 'brushed') {
      ps.brushReset();
    } else if (selection == 'marked') {
      ps.unmark();
    } else if (selection == 'both') {
      ps.brushReset();
      ps.unmark();
    } else {
      throw "Please specify one of {'brushed', 'marked', 'both'}";
    }
  };
};

// parcoords wrapper: set foreground alpha on all charts
var alpha = function alpha(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.alpha(d);
    });
    return this;
  };
};

// parcoords wrapper: set polyline hex color on all charts
var color = function color(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.color(d);
    });
    return this;
  };
};

// parcoords wrapper: set foreground alpha when brushes exist
var alphaOnBrushed = function alphaOnBrushed(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.alphaOnBrushed(d);
    });
    return this;
  };
};

// parcoords wrapper: set hex color of polylines within brush extents
var brushedColor = function brushedColor(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.brushedColor(d);
    });
    return this;
  };
};

// parcoords wrapper: enable reordering on all charts

// const reorderable = (config, ps, flags) =>
//   function({ chartIDs=[...Array(ps.charts.length).keys()] }={}) {
//     ps.charts.forEach( (pc, i) => {
//       if (chartIDs.includes(i)) {
//         pc
//           .reorderable()
//           .hideAxis(config.partition[i])
//           .render()
//           .updateAxes(0);
//       }
//     });
//     return this;
//   }
// export default reorderable;

var reorderable = function reorderable(config, ps, flags) {
  return function () {
    ps.charts.forEach(function (pc) {
      return pc.reorderable();
    });
    return this;
  };
};

// parcoords wrapper: set composite mode on all charts
var composite = function composite(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.composite(d);
    });
    return this;
  };
};

// parcoords wrapper: enable shadows on all charts
var shadows = function shadows(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.shadows(d);
    });
    return this;
  };
};

// parcoords wrapper: mark a data element
var mark = function mark(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.mark(d);
    });
  };
};

// parcoords wrapper: highlight a data element
var highlight = function highlight(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.highlight(d);
    });
  };
};

// parcoords wrapper: format dimensions 
var dimensions = function dimensions(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.dimensions(d);
    });
    return this;
  };
};

// parcoords wrapper: flip listed axes on all charts
var flipAxes = function flipAxes(config, ps, flags) {
  return function (axes) {
    ps.charts.forEach(function (pc) {
      return pc.flipAxes(axes);
    });
    return this;
  };
};

// parcoords wrapper: set the domain (and scale?) of a single axis on all charts
var scale = function scale(config, ps, flags) {
  return function (axis, domain) {
    var range = ps.charts[0].dimensions()[axis].yscale.domain();
    if (range[0] >= domain[0] && range[1] <= domain[1]) {
      ps.charts.forEach(function (pc) {
        return pc.scale(axis, domain);
      });
    } else {
      throw Error('Domain Error: specified domain must exceed axis extrema.');
    }
    return this;
  };
};

// parcoords wrapper: set bundle dimension on all charts
var bundleDimension = function bundleDimension(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.bundleDimension(d);
    });
    return this;
  };
};

// parcoords wrapper: set bundling strength on all charts
var bundlingStrength = function bundlingStrength(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.bundlingStrength(d);
    });
    return this;
  };
};

// parcoords wrapper: set bundling smoothness on all charts
var smoothness = function smoothness(config, ps, flags) {
  return function (d) {
    ps.charts.forEach(function (pc) {
      return pc.smoothness(d);
    });
    return this;
  };
};

// parcoords wrapper: render and update charts, maintain config
var render = function render(config, ps, flags) {
  return function () {
    ps.charts.forEach(function (pc, i) {
      pc.hideAxis(config.partition[i]).render().updateAxes(0);
    });
    return this;
  };
};

// parcoords wrapper: reset all brushes and preform necessary updates
var brushReset = function brushReset(config, ps, flags) {
  return function () {
    ps.charts.forEach(function (pc) {
      return pc.brushReset();
    });

    // NOTE: brushed data in config is updated by sync() as consequence of pc.brushReset()
    // currently need to force due to issue with ParCoords.selected() returning entire dataset if brush extents are empty
    config.brushed = [];

    if (flags.grid) {
      ps.gridUpdate();
    }
  };
};

// parcoords wrapper: reset all marks and preform necessary updates
var unmark = function unmark(config, ps, flags) {
  return function () {
    ps.charts.forEach(function (pc) {
      return pc.unmark();
    });
    config.marked = [];
    if (flags.grid) {
      config.grid.setSelectedRows([]);
      ps.gridUpdate();
    }
  };
};

// parcoords wrapper: reset all highlights
var unhighlight = function unhighlight(config, ps, flags) {
  return function () {
    ps.charts.forEach(function (pc) {
      return pc.unhighlight();
    });
  };
};

var DefaultConfig = {
  dataView: false,
  grid: false,
  chartOptions: {}, // parcoords options, applies to all charts
  brushed: [], // intersection of all brushed data in linked charts
  marked: [], // union of all marked data in linked charts
  selections: function selections() {
    return union(this.brushed, this.marked);
  }
};

var _this = undefined;

var initState = function initState(data, userConfig) {
  var config = Object.assign({}, DefaultConfig, userConfig);
  // force attributes for consistent operation
  config.data = data;
  config.vars = Object.keys(data[0]); // does not contain 'id'
  config.partition = {}; // { chart id: [hidden vars]} built in init.js

  // assign each data element an ID for slickgrid and other analyses
  config.data.forEach(function (d, i) {
    d.id = d.id || i;
  });
  config.data = format_data(config.data);

  // NOTE: "id" col hidden globally by default in init.js

  var eventTypes = [
  // 'data', // when data in a chart is updated, how should this cascade to linked?
  // 'render',
  // 'resize',
  // 'highlight',
  // 'mark',
  'brush', 'brushend', 'brushstart'].concat(keys(config));

  var events = dispatch.apply(_this, eventTypes),
      flags = {
    linked: false,
    grid: false
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

var version = "1.0.0";

//css

var Parasol = function Parasol(data, userConfig) {
  var state = initState(data, userConfig);
  var config = state.config,
      events = state.events,
      flags = state.flags;


  var ps = init(config);

  // bindEvents();

  // expose the state of charts and grid
  ps.state = config;
  ps.flags = flags;
  ps.version = version;
  ps.grid = config.grid;
  ps.dataview = config.dataview;

  ps.attachGrid = attachGrid(config, ps, flags);
  ps.gridUpdate = gridUpdate(config, ps, flags);
  ps.linked = linked(config, ps, flags);
  ps.cluster = cluster(config, ps, flags);
  ps.weightedSum = weightedSum(config, ps, flags);
  ps.hideAxes = hideAxes(config, ps, flags);
  ps.showAxes = showAxes(config, ps, flags);
  ps.setAxesLayout = setAxesLayout(config, ps, flags);
  ps.keepData = keepData(config, ps, flags);
  ps.removeData = removeData(config, ps, flags);
  ps.exportData = exportData(config, ps, flags);
  ps.resetSelections = resetSelections(config, ps, flags);

  // parcoords methods (apply to all charts)
  ps.alpha = alpha(config, ps, flags);
  ps.color = color(config, ps, flags);
  ps.alphaOnBrushed = alphaOnBrushed(config, ps, flags);
  ps.brushedColor = brushedColor(config, ps, flags);
  ps.reorderable = reorderable(config, ps, flags);
  ps.composite = composite(config, ps, flags);
  ps.shadows = shadows(config, ps, flags);
  ps.mark = mark(config, ps, flags);
  ps.highlight = highlight(config, ps, flags);
  ps.dimensions = dimensions(config, ps, flags);
  ps.scale = scale(config, ps, flags);
  ps.flipAxes = flipAxes(config, ps, flags);
  ps.bundleDimension = bundleDimension(config, ps, flags);
  ps.bundlingStrength = bundlingStrength(config, ps, flags);
  ps.smoothness = smoothness(config, ps, flags);
  ps.render = render(config, ps, flags);
  ps.brushReset = brushReset(config, ps, flags);
  ps.unmark = unmark(config, ps, flags);
  ps.unhighlight = unhighlight(config, ps, flags);

  return ps;
};

export default Parasol;
//# sourceMappingURL=parasol.esm.js.map
