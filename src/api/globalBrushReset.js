// reset listed brushes and preform necessary updates
// NOTE: why is this so slow?

const globalBrushReset = (config, ps, flags) => chartIDs => {

  if (Array.isArray(chartIDs)) {
    // reset brushes in listed chats
    chartIDs.forEach( i => {
      if(ps.charts[i]) {
        ps.charts[i].brushReset();
      }
    })

    // NOTE: if charts are linked and at least one is not reset, then none will be reset

    // NOTE: brushed data is config is updated by sync() as consequence of pc.brushReset()

    // if (grid) {
    //   update with config.brushed
    // }

  }
};

export default globalBrushReset;
