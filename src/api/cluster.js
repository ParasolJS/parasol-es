import kmeans from 'ml-kmeans';
// import { difference } from 'lodash-es';
import { scaleOrdinal, schemeCategory10 } from 'd3';

import standardize from '../util/standardize';
import format_data from '../util/format_data';
import add_column from '../util/add_column';

/**
 * Partition data into k clusters in which each data element belongs to
 * the cluster with the nearest mean.
 *
 * @param k number of clusters
 * @param chartIDs charts that will display cluster colors
 * @param palette d3 palette or function mapping cluster ids to color
 * @param vars variables used for clustering. NOTE: associated data must be numeric
 * @param std convert values to zscores to obtain unbiased clusters
 * @param options ml-kmeans options
 * @param hidden determines whether cluster axis will be displayed on charts (can be individually updated later)
 */
const cluster = (config, ps, flags) =>
  function ({
    k = 3,
    chartIDs = [...Array(ps.charts.length).keys()],
    vars = config.vars,
    palette = schemeCategory10,
    options = {},
    std = true,
    hidden = true
  }={}) {
    if (Array.isArray(palette)) {
      const scheme = scaleOrdinal(palette);
      palette = d => scheme(Number(d['cluster']));
    }
    else {
      palette = palette;
    }

    let data = [];
    if (std === true) {
      	data = standardize(config.data);
    } else {
      	data = config.data;
    }

    // setup object to filter variables that will be used in clustering
    const cluster_vars = {};
    vars.forEach( v => {
      cluster_vars[v] = true;
    });

    // get data values in array of arrays for clustering
    // (values from each row object captured in array)
    const values = [];
    data.forEach(d => {
      const target = [];
      Object.entries(d).forEach(([key, value]) => {
        // only take values from variables listed in function argument
        if (cluster_vars[key] == true) {
          target.push(Number(value));
        }
      });
      values.push(target);
    });

    // preform clustering and update config data
    const result = kmeans(values, k, options);
    config.data.forEach((d, i) => {
      d.cluster = result.clusters[i].toString();
    });
    // console.log('kmeans++');
    // console.log(result.iterations, result.centroids.map(c => c.error));
    // console.log(result.centroids);

    // hide cluster axis and show colors by default
    if (hidden == true) {
      Object.keys(config.partition).forEach( id => {
        config.partition[id].push('cluster');
      });
    }

    // format data, update charts
    config.data = format_data(config.data);
    ps.charts.forEach(pc => {
      pc
        .data(config.data)
        .render()
        .createAxes();
      // .updateAxes();
    });

    ps.charts.forEach( (pc, i) => {
      // only color charts in chartIDs
      if (chartIDs.includes(i)) {
        pc.color(palette);
      }
      pc
        .hideAxis(config.partition[i])
        .render()
        .updateAxes(0);
    });

    if (flags.grid) {
      // add column
      const cols = add_column(config.grid.getColumns(), 'cluster');
      ps.gridUpdate({ columns: cols });
    }

    return this;
  };

export default cluster;
