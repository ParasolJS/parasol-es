//css
import './parallel-coordinates.css';

//misc

//api
import init from './api/init';
import attachGrid from './api/attachGrid';
import gridUpdate from './api/gridUpdate';
import linked from './api/linked';
import cluster from './api/cluster';
import weightedSums from './api/weightedSums';
import hideAxes from './api/hideAxes';
import showAxes from './api/showAxes';
import setAxesLayout from './api/setAxesLayout';
import keepData from './api/keepData';
import removeData from './api/removeData';
import exportData from './api/exportData';

import globalBrushReset from './api/globalBrushReset';
import globalMarkReset from './api/globalMarkReset';
import resetSelections from './api/resetSelections';

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
  ps.grid = config.grid;
  ps.dataview = config.dataview;

  ps.attachGrid = attachGrid(config, ps, flags);
  ps.gridUpdate = gridUpdate(config, ps, flags);
  ps.linked = linked(config, ps, flags);
  ps.cluster = cluster(config, ps, flags);
  ps.weightedSums = weightedSums(config, ps, flags);
  ps.hideAxes = hideAxes(config, ps, flags);
  ps.showAxes = showAxes(config, ps, flags);
  ps.setAxesLayout = setAxesLayout(config, ps, flags);
  ps.keepData = keepData(config, ps, flags);
  ps.removeData = removeData(config, ps, flags);
  ps.exportData = exportData(config, ps, flags);

  ps.globalBrushReset = globalBrushReset(config, ps, flags);
  ps.globalMarkReset = globalMarkReset(config, ps, flags);
  ps.resetSelections = resetSelections(config, ps, flags);

  return ps;
};

export default Parasol;
