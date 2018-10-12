//update data displayed in grid
const gridUpdate = (config, ps, flags) => function(data = null) {
  if (data === null) {
    if(config.selections.length) {
      data = config.selections;
    } else {
      data = config.data;
    }
  }

  config.dataView.beginUpdate();
  config.dataView.setItems(data);
  // if marked data exists, keep in grid
  if (config.marked.length) {
  	config.marked.forEach( i => {
  		config.dataView.insertItem(0,i);
  	});
  }
  config.dataView.endUpdate();

  return this;
};

export default gridUpdate;
