import { isPlainObject, difference } from 'lodash-es';

/**
 * Specify the axes that will appear in each chart. Default for unspecified charts is to display all axes.
 *
 * @param {object} layout:  indentify a list of axes to be shown on each chart; format as { chart id: [vars to show]}
 */
const setAxesLayout = (config, ps, flags) =>
  function(layout) {
    if (isPlainObject(layout)) {
      // take difference of all variables and layout variables
      // i.e. show only those which appear in both data and layout
      Object.entries(layout).forEach(([key, values]) => {
        if (config.partition[key]) {
          config.partition[key] = difference(
            config.vars.concat('id'),
            layout[key]
          );
        }
      });
    } else {
      throw 'Error: please provide layout as a plain object.';
    }

    // iterate over partition keys and hide only remaining variables in value array
    Object.entries(config.partition).forEach(([chartID, vars]) => {
      ps.charts[chartID].hideAxis(vars);
      ps.charts[chartID].render().updateAxes(0);
    });

    return this;
  };

export default setAxesLayout;
