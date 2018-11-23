// parcoords wrapper: render and update charts, maintain config
const render = (config, ps, flags) => function() {
  ps.charts.forEach( (pc, i) => {
    pc
      .hideAxis(config.partition[i])
      .render()
      .updateAxes(0);
  })
  return this;
}
export default render;
