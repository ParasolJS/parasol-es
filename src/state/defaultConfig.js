const DefaultConfig = {
	data: [],
	partition: {}, // identifies which plots vars appear on
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
	chartOptions: {},
	linked: [], // list of linked objects
	brushed: [], // union of all brushed data
	marked: [], // union of all marked data
	selections: [], // union of brushed and marked
};

export default DefaultConfig;
