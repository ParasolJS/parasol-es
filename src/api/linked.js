import sync from './sync';

// link brush activity between user specified charts, and grid if it exists
const linked = (config, ps, flags) =>
	function (chartList = ps.charts) {
		config.linked = chartList;
		flags.linked = true;
		chartList.forEach( pc => {
			pc.on('brush', sync() );
		});
		return this;
	};

export default linked;
