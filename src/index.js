//css
import './parallel-coordinates.css';

//misc

//api
import init from './api/init';
// import attachGrid from './api/attachGrid';
// import gridUpdate from './api/gridUpdate';
import linked from './api/linked';
import cluster from './api/cluster';
import aggregateScores from './api/aggregateScores';

import globalBrushReset from './api/globalBrushReset';

import initState from './state/initState';
// import bindEvents from './bindEvents';
import { version } from '../package.json';

const Parasol = (data, userConfig) => {
  const state = initState(data, userConfig);
  const { config, events, flags } = state;

  const ps = init(config);

  // bindEvents();

  // expose the state of charts and grid
  ps.state = config;
  ps.flags = flags;
  ps.version = version;
  // ps.grid = config.grid;
  // ps.dataview = config.dataview;

  // ps.attachGrid = attachGrid(config, flags);
  // ps.gridUpdate = gridUpdate(config, flags);
  ps.linked = linked(config, ps, flags);
  ps.cluster = cluster(config, ps, flags);
  ps.aggregateScores = aggregateScores(config, ps, flags);

  ps.globalBrushReset = globalBrushReset(config, ps, flags);

  return ps;
};

export default Parasol;
