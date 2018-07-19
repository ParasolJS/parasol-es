// logger for easier debugging
import debug from 'debug';
const log = debug('app:log');

// logger should only be enabled if in development
if (ENV === 'development') {
  debug.enable('*');
  log('Logging is enabled!');
} else {
  debug.disable();
}

//misc

//api

//css
import './parallel-coordinates.css';

const ParaVis = (userConfig, selection) => {


  return vis;
}

export default ParaVis;
