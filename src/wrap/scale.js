// parcoords wrapper: set the domain (and scale?) of a single axis on all charts
const scale = (config, ps, flags) => function(axis, domain) {
  const range = ps.charts[0].dimensions()[axis].yscale.domain();
  if (range[0] >= domain[0] && range[1] <= domain[1]) {
    ps.charts.forEach( pc => pc.scale(axis, domain) );
  } else {
    throw Error('Domain Error: specified domain must be exceed axis extrema.')
  }
  return this;
}
export default scale;
