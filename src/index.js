//css
import './parallel-coordinates.css';

//misc


//api
import init from './api/init';

import initState from './state/initState';
import bindEvents from './bindEvents';
import { version } from '../package.json';


const ParaVis = userConfig => {
	const state = initState(userConfig);
	const {
		config,
		events,
		flags,
	} = state;

	const pv = init(config);

	// bindEvents();

	// expose the state of the chart
	pv.state = config;
	pv.flags = flags;
	pv.version = version;


	return pv;
};

export default ParaVis;
