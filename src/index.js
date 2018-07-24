//css
import './parallel-coordinates.css';

//misc


//api
import init from './api/init';

import initState from './state/initState';
import bindEvents from './bindEvents';
import { version } from '../package.json';


const parasol = userConfig => {
	const state = initState(userConfig);
	const {
		config,
		events,
		flags,
	} = state;

	const ps = init(config);

	// bindEvents();

	// expose the state of the chart
	ps.state = config;
	ps.flags = flags;
	ps.version = version;


	return ps;
};

export default parasol;
