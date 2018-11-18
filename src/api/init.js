import { selectAll } from 'd3';
import ParCoords from 'parcoord-es';

/**
 * Setup a new visualization.
 *
 * @param config
 * @returns {ps} a parasol closure
 */
const init = config => {
  /**
   * Create a visualization within a container. The selector can also be a d3 selection.
   *
   * @param selection a d3 selection
   * @returns {ps} instance for chained api, compatible with parcoords api
   */
  const ps = function(selection) {
    selection = ps.selection = selectAll(selection);

    // store pc charts in array
    ps.charts = [];
    selection.each(function(d, i) {
      ps.charts[i] = ParCoords(config.chartOptions)(this)
        .data(config.data)
        .hideAxis(['id'])
        .alpha(0.4)
        .render()
        .mode('queue')
        .brushMode('1D-axes'); //1D-axes must be used with linking

      // add "id" to partition globally
      config.partition[i] = ['id'];
    });

    // for chained api
    return ps;
  };
  // for partial-application style programming
  return ps;
};

export default init;
