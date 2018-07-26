import spread from 'lodash/spread';
import union from 'lodash/union';
import intersection from 'lodash/intersection';

// synchronize data between linked components
const sync = (config, ps) =>
	function() {

		//obtain array of brushed data for each chart
		const brush_extents = [];
		config.linked.forEach( pc => {
			brush_extents.push([pc.selected]);
		});

		//check edge case where all brushes individually clicked away
		console.log(_spread(_union)(brush_extents));
		if (spread(union)(brush_extents).length == 0) {
			config.linked.forEach( pc => {
				pc.brushReset();
			});
			if (config.grid !== false) {
				ps.gridUpdate(config.data);
			}
		} else {
			const brushed = spread(intersection)(brush_extents);
			config.linked.forEach( pc => {
				pc.brushed(brushed).render();
			});
			if (config.grid !== false) {
				ps.gridUpdate(brush_extents);
			}
		}
	};

export default sync;
