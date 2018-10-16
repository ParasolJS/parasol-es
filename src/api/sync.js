import { union, intersection } from 'lodash-es';

// synchronize data between linked components
const sync = (config, ps, flags) =>
  function() {
    //obtain array of brushed data for each chart
    const brush_extents = [];
    ps.linked.forEach(pc => {
      brush_extents.push(pc.selected());
    });
    // console.log(brush_extents);

    //check edge case where all brushes individually clicked away
    // console.log(union(...brush_extents));
    if (union(...brush_extents).length == 0) {
      ps.linked.forEach(pc => {
        pc.brushReset();
      });
      config.brushed = [];
      // update data in grid
      if (flags.grid) {
      	ps.gridUpdate(config.data);
      }
    } else {
      const brushed = intersection(...brush_extents);
      // console.log(brushed);
      ps.linked.forEach(pc => {
        pc.brushed(brushed).render();
      });

      // NOTE: once pc.selected issue fixed, remove if statement and uncomment line below
      //config.brushed = brushed;
      if (brushed.length < config.data.length) {
        config.brushed = brushed;
      } else {
        config.brushed = [];
      }
      // update data in grid
      // NOTE: again, once pc.selected fixed, change brushed to config.brushed
      if (flags.grid) {
      	ps.gridUpdate(brushed);
      }
    }
  };

export default sync;
