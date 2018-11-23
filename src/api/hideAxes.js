import { isPlainObject, union } from 'lodash-es';

/**
 * Hide a set of axes globally or from specific charts.
 *
 * @param partition: array or object idenifying axes to be hidden; if object, format as { chart id: [hidden vars]}
 */
const hideAxes = (config, ps, flags) =>
  function(partition) {

    if (Array.isArray(partition)) {
      // append array to every key in config.partition
      Object.keys(config.partition).forEach(function(id) {
        config.partition[id] = union(config.partition[id], partition);
      });
    } else if (isPlainObject(partition)) {
      // take union of values for each key that is also in config.partition
      Object.entries(partition).forEach(([key, values]) => {
        if(config.partition[key]) {
          config.partition[key] = union(config.partition[key], partition[key]);
        }
      });
    } else {
      throw 'Error: please provide an object or array as argument.';
    }

    // iterate over partition keys and hide all variables in value array
    Object.entries(config.partition).forEach(([chartID, vars]) => {
      ps.charts[chartID].hideAxis(vars);
      ps.charts[chartID].render().updateAxes(500);
    });

    return this;
  };

export default hideAxes;
