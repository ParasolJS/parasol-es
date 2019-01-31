import { entries, keys, dispatch } from 'd3';

import DefaultConfig from './defaultConfig';
import format_data from '../util/format_data';

const initState = (data, userConfig) => {
  const config = Object.assign({}, DefaultConfig, userConfig);
  // force attributes for consistent operation
  config.data = data;
  config.vars = Object.keys(data[0]); // does not contain 'id'
  config.partition = {}; // { chart id: [hidden vars]} built in init.js

  // assign each data element an ID for slickgrid and other analyses
  config.data.forEach((d, i) => {
    d.id = d.id || i;
  });
  config.data = format_data(config.data);

  // NOTE: "id" col hidden globally by default in init.js

  const eventTypes = [
    // 'data', // when data in a chart is updated, how should this cascade to linked?
    // 'render',
    // 'resize',
    // 'highlight',
    // 'mark',
    'brush',
    'brushend',
    'brushstart',
    // 'axesreorder',
  ].concat(keys(config));

  const events = dispatch.apply(this, eventTypes),
    flags = {
      linked: false,
      grid: false,
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
