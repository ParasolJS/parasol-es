// parcoords wrapper: reset all highlights 
const unhighlight = (config, ps, flags) => () => {
  ps.charts.forEach( pc => pc.unhighlight() );
};
export default unhighlight;
