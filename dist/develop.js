
// NOTE: somehow require d3, parcoords, underscore, ...

// ----------
// template
// ----------
// function description
// var fname = function fname(global vars) {
//   return function (local vars) {
//     do stuff
//   };
// };

// ----------
// api
// ----------
// ParaVis(data, objectives) // create a dual plot variable
//
// // extensions for ParaVis and ParCoords type vars
// .grid()
// .linked([plot_list])
// .link_reset(brushes, marks, all)
// .cluster(k=3, group="both", color_palette)
// .aggregate({weights})
// .hide([axes_list])
// .show([axes_list])
// .utopia_line([optimize_list])
// //.uncertainty_mode(1,2,3,4)
//
// keep_selected(selection = (brushed, marked, both))
// remove_selected(selection = (brushed, marked, both))
// load_file(file)
// load_data(data, objectives, grid=false)
// export_selected(selection = (brushed, marked, both), filename)
// save_image(plot)
//
// ----------
// internal functions
// ----------
// convert_to_float(x)
// parcoords_format(data)
// build_grid(userConfig, data, plot_list)
// grid_update(dataView, data, plot_list)


/**
 * Setup a new parallel coordinates chart array.
 *
 * @param config
 * @returns {pc} a parcoords closure
 */
var build = function build(config) {
  /**
   * Create charts within each container in the d3 selection.
   *
   * @param selection a d3 selection
   * @returns {pc} instance for chained api
   */
   config = {} // temporary bypass

  var vis = function vis(selection) {
    selection = vis.selection = d3Selection.select(selection);

    // store pc plot functions in array
    vis.list = [];
    d3.selectAll(selection)
      .each(function(d,i) {
          vis.list[i] = ParCoords(config)(this);
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
    return vis;
  };

  // for partial-application style programming
  return vis;
};




var ParaVis = function ParaVis(userConfig, selection) {
  // dataset: may be either an object or an array, all values should be the same format
  // partition: object indicating which plots a variable should be included in; formatted as partition = { "var": [pids] }
  // n: number of plots to create

  selection = vis.selection = d3Selection.select(selection);


  // var state = initState(userConfig, selection);
  // var config = state.config,
  //     events = state.events,
  //     flags = state.flags,
  //     size = state.size; // this will be num of plots, identify by d3selection.size()


  var vis = build(config);

  // bindEvents(config, ctx, pc, xscale, flags, brushedQueue, foregroundQueue, events, axis);





  console.log(partition);

  // setup array of arrays to store hidden axes for all plots
  var hidden = Array.from({length: n}, (pid) => []);

  // update hidden variables based on partition
  Object.entries(partition).forEach(
    ([axis, pids]) => {
      // identify pids in which an axis should be hidden
      var hidden_pids = _.difference(_.range(n), pids);
      // append axis name to hidden[pid] array
      hidden_pids.forEach(
        (pid) => { hidden[pid].push(axis) }
      )
    }
  );

  // hide axis from all plots if not found in partition
  var extraneous_vars = _.difference(Object.keys(dataset[0]), Object.keys(partition));
  hidden.forEach(
    (hidden_pid) => {
      hidden_pid.push(extraneous_vars)
    })
  console.log(hidden);


  console.log(plots);

  return(plots);
}
