import { array_to_object, object_to_array } from './wrangle';
import arr from './arr_stats';

// normalize data values (scale: 0-1) for unbiased aggregate scores
const normalize = data => {

	// reformat data
	const df = array_to_object(data);

	// normalize values
	Object.entries(df).forEach( ([key, col]) => {
		df[key] = arr.norms(col);
	});

	// convert back to original data type
	return object_to_array(df, data);

};

export default normalize;
