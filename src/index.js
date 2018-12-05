//css
import './parallel-coordinates.css';

//misc

//api
import init from './api/init';
import attachGrid from './api/attachGrid';
import gridUpdate from './api/gridUpdate';
import linked from './api/linked';
import cluster from './api/cluster';
import weightedSum from './api/weightedSum';
import hideAxes from './api/hideAxes';
import showAxes from './api/showAxes';
import setAxesLayout from './api/setAxesLayout';
import keepData from './api/keepData';
import removeData from './api/removeData';
import exportData from './api/exportData';
import resetSelections from './api/resetSelections';

// parcoords wrappers
import alpha from './wrap/alpha';
import color from './wrap/color';
import alphaOnBrushed from './wrap/alphaOnBrushed';
import brushedColor from './wrap/brushedColor';
import reorderable from './wrap/reorderable';
import composite from './wrap/composite';
import shadows from './wrap/shadows';
// import mark from './wrap/mark';
// import highlight from './wrap/highlight';
import dimensions from './wrap/dimensions';
import flipAxes from './wrap/flipAxes';
import scale from './wrap/scale';
import bundleDimension from './wrap/bundleDimension';
import bundlingStrength from './wrap/bundlingStrength';
import smoothness from './wrap/smoothness';
import render from './wrap/render';
import brushReset from './wrap/brushReset';
import unmark from './wrap/unmark';
import unhighlight from './wrap/unhighlight';

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
  ps.weightedSum = weightedSum(config, ps, flags);
  ps.hideAxes = hideAxes(config, ps, flags);
  ps.showAxes = showAxes(config, ps, flags);
  ps.setAxesLayout = setAxesLayout(config, ps, flags);
  ps.keepData = keepData(config, ps, flags);
  ps.removeData = removeData(config, ps, flags);
  ps.exportData = exportData(config, ps, flags);
  ps.resetSelections = resetSelections(config, ps, flags);


  // parcoords methods (global)
  ps.alpha = alpha(config, ps, flags);
  ps.color = color(config, ps, flags);
  ps.alphaOnBrushed = alphaOnBrushed(config, ps, flags);
  ps.brushedColor = brushedColor(config, ps, flags);
  ps.reorderable = reorderable(config, ps, flags);
  ps.composite = composite(config, ps, flags);
  ps.shadows = shadows(config, ps, flags);
  // ps.mark = mark(config, ps, flags);
  // ps.highlight = highlight(config, ps, flags);
  ps.dimensions = dimensions(config, ps, flags);
  ps.scale = scale(config, ps, flags);
  ps.flipAxes = flipAxes(config, ps, flags);
  ps.bundleDimension = bundleDimension(config, ps, flags);
  ps.bundlingStrength = bundlingStrength(config, ps, flags);
  ps.smoothness = smoothness(config, ps, flags);
  ps.render = render(config, ps, flags);
  ps.brushReset = brushReset(config, ps, flags);
  ps.unmark = unmark(config, ps, flags);
  ps.unhighlight = unhighlight(config, ps, flags);

  return ps;
};

export default Parasol;
