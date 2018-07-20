import { entries, keys, dispatch } from 'd3';

import DefaultConfig from './defaultConfig';

const initState = userConfig => {
	const config = Object.assign({}, DefaultConfig, userConfig);

	const eventTypes = [
		// 'render',
		// 'resize',
		// 'highlight',
		// 'mark',
		// 'brush',
		// 'brushend',
		// 'brushstart',
		// 'axesreorder',
	].concat(keys(config));

	const events = dispatch.apply(this, eventTypes),
		flags = {
			// brushable: false,
			// reorderable: false,
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
		config,
		events,
		eventTypes,
		flags,
	};
};

export default initState;
