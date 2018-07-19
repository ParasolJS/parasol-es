const DefaultConfig = {
  data: [],
  brushed: [], // union of all brushed data
  marked: [], // union of all marked data
  selections: [], // union of brushed and marked
  linked: [], // list of linked objects
  dataView: false,
  grid: false,
  gridOptions: {
    enableCellNavigation: true,
    enableColumnReorder: false,
    multiColumnSort: false,
    editable: true,
    asyncEditorLoading: false,
    autoEdit: false
  },
};

export default DefaultConfig;
