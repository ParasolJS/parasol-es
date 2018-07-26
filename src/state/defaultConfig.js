const DefaultConfig = {
	data: [],
	partition: {}, // identifies which plots vars appear on
	dataView: false,
	grid: false,
	chartOptions: {},
	linked: [], // list of linked objects
	brushed: [], // intersection of all brushed data
	marked: [], // union of all marked data
	selections: [], // union of brushed and marked
};

export default DefaultConfig;
