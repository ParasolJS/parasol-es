// parcoords wrapper: reset all brushes and preform necessary updates
const brushReset = (config, ps, flags) => () => {
    ps.charts.forEach( pc => pc.brushReset() );

    // NOTE: if charts are linked and at least one is not reset, then none will be reset

    // NOTE: brushed data in config is updated by sync() as consequence of pc.brushReset()
    // currently need to force due to issue with ParCoords.selected() returning entire dataset if brush extents are empty
    config.brushed = [];

    if (flags.grid) {
      ps.gridUpdate();
    }
};

export default brushReset;
