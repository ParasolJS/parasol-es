import { entries, keys, dispatch } from 'd3';

import DefaultConfig from './defaultConfig';

const initState = (data, userConfig) => {
  const config = Object.assign({}, DefaultConfig, userConfig);
  // "private" keys -- values must be forced for consistent operation
  config.data = data;
  config.vars = Object.keys(data[0]);
  config.partition = {}; // { chart id: [hidden vars]} built in init.js

  const eventTypes = [
    // 'data', // when data in a chart is updated, how does this cascade to linked?
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
