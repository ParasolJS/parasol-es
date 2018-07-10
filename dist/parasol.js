

// function template //
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
// .cluster(k=3, group="both")
// .weight({weights})
// .hide([axes_list])
// .show([axes_list])
// .utopia_line([optimize_list])
// .uncertainty_mode(1,2,3,4)
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



// constructor:
// initializes two independent ParCoords vars and retuns them in an array
var ParaVis = function ParaVis(dataset, objectives=null) {
  var pc1 = ParCoords()("#plot1")
      .data(dataset)
      .alpha(0.4)
      .alphaOnBrushed(0.1)
      .render()
      .reorderable()
      .mode("queue")
      .brushMode("1D-axes");

  var pc2 = ParCoords()("#plot2")
      .data(dataset)
      .alpha(0.4)
      .alphaOnBrushed(0.1)
      .render()
      .reorderable()
      .mode("queue")
      .brushMode("1D-axes");

  var plot_list = [pc1, pc2]
  return(plot_list);
}
