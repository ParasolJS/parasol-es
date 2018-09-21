// reset listed brushes and preform necessary updates
// NOTE: why is this so slow?

// TODO: add documentation info here

const globalBrushReset = (config, ps, flags) => charts => {
  if (Array.isArray(charts)) {
    // reset brushes in provided charts
    charts.forEach(pc => {
      pc.brushReset();
    });

    // NOTE: if charts are linked and at least one is not reset, then none will be reset

    // NOTE: brushed data in config is updated by sync() as consequence of pc.brushReset()
    // currently need to force due to issue with ParCoords.selected() returning entire dataset if brush extents are empty
    config.brushed = [];

    // if (grid) {
    //   update with config.brushed
    // }
  }
};

export default globalBrushReset;
