import { isPlainObject, difference } from 'lodash-es';

/**
 * Show a set of axes globally or on specific charts
 *
 * @param {Object|Array} partition - array or object idenifying axes to be shown;
 * if object, format as { chart id: [vars to show]}
 */
const showAxes = (config, ps, flags) =>
  function(partition) {
    if (typeof partition === 'undefined') {
      // show all axes on all charts (empty partition)
      Object.keys(config.partition).forEach(function(id) {
        config.partition[id] = [];
      });
    } else if (Array.isArray(partition)) {
      // remove array from every key in config.partition
      Object.keys(config.partition).forEach(function(id) {
        config.partition[id] = difference(config.partition[id], partition);
      });
    } else if (isPlainObject(partition)) {
      // take difference of values for each key that is also in config.partition
      // (i.e. remove from hidden)
      Object.entries(partition).forEach(([key, values]) => {
        if (config.partition[key]) {
          config.partition[key] = difference(
            config.partition[key],
            partition[key]
          );
        }
      });
    } else {
      console.log('Error: please provide an object or array as argument.');
    }

    // iterate over partition keys and hide only remaining variables in value array
    Object.entries(config.partition).forEach(([chartID, vars]) => {
      ps.charts[chartID].hideAxis(vars);
      ps.charts[chartID].render().updateAxes(500);
    });

    return this;
  };

export default showAxes;
