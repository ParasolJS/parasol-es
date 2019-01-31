// parcoords wrapper: enable reordering on all charts

// const reorderable = (config, ps, flags) =>
//   function({ chartIDs=[...Array(ps.charts.length).keys()] }={}) {
//     ps.charts.forEach( (pc, i) => {
//       if (chartIDs.includes(i)) {
//         pc
//           .reorderable()
//           .hideAxis(config.partition[i])
//           .render()
//           .updateAxes(0);
//       }
//     });
//     return this;
//   }
// export default reorderable;

const reorderable = (config, ps, flags) =>
  function() {
    ps.charts.forEach(pc => pc.reorderable());
    return this;
  };
export default reorderable;
