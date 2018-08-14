//update data displayed in grid
const gridUpdate = config => (data = null) => {
  if (data === null) {
    // check union of brushed and marked, else config.data
    data = config.data;
  }
  config.dataView.beginUpdate();
  config.dataView.setItems(data);
  // if marked data exists, keep in grid
  // if (flags.marked) {
  // 	// array_of_all_marked_data.forEach( (i) => {
  // 	// 	config.dataView.insertItem(0,i);
  // 	// });
  // }
  config.dataView.endUpdate();

  return this;
};

export default gridUpdate;
