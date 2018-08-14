import kmeans from 'ml-kmeans';
import { scaleOrdinal, schemeCategory10 } from 'd3';

import standardize from '../util/standardize';

/**
 * Partition data into k clusters in which each data element belongs to
 * the cluster with the nearest mean.
 *
 * @param k number of clusters
 * @param chartList charts that will display cluster colors
 * @param palette function mapping cluster ids to color
 * @param vars variables to perfom clustering on
 * @param standardize convert values to zscores to obtain unbiased clusters
 * @param options ml-kmeans options
 * @param hidden determines whether cluster axis will be displayed on charts
 *               (can be individually updated later)
 */
const cluster = (config, ps, flags) => (
  k,
  chartList = ps.charts,
  palette = null,
  vars = config.vars,
  options = {},
  standardize = true,
  hidden = true
) => {
  if (palette === null) {
    const scheme = scaleOrdinal(schemeCategory10);
    palette => d => scheme(d['cluster']);
  }

  // if (standardize) {
  // 	const data = standardize(config.data);
  // } else {
  // 	const data = config.data;
  // }
  // console.log(data);

  // get data values in array of arrays for clustering
  // (values from each row object captured in array)
  const values = [];
  data.forEach(d => {
    const target = [];
    Object.entries(d).forEach(([key, value]) => {
      // only take values from variables listed in function argument
      if (vars[key] !== undefined) {
        target.push(value);
      }
    });
    values.push([target]);
  });
  console.log(values);

  // preform clustering and update config data
  const result = kmeans(values, k, options);
  config.data.forEach((d, i) => {
    d.cluster = result.clusters[i].toString();
  });
  console.log('kmeans++');
  console.log(result.iterations, result.centroids.map(c => c.error));
  console.log(result.centroids);

  // hide cluster axis and show colors by default
  config.hidden.push(['cluster']);

  // update charts
  ps.charts.forEach(pc => {
    pc.data(config.data)
      // .hideAxis(config.hidden)
      .render();
    // .updateAxes();
  });

  chartList.forEach(pc => {
    pc.color(palette).render();
  });

  // if (flags.grid) {
  //   // rebuild the grid
  //   ps.attachGrid();
  //   ps.gridUpdate();
  // }

  return this;
};

export default cluster;
