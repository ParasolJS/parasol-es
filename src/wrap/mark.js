// parcoords wrapper: mark a data element
const mark = (config, ps, flags) => d => {
  ps.charts.forEach( pc => pc.mark(d) );
};
export default mark;
