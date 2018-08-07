import { array_to_object, object_to_array } from './wrangle'
import arr from './arr_stats';

// convert values to zscores
const standardize = data => {

  // reformat data
  const df = array_to_object(data);

  // standardize values
  Object.keys(df).forEach( key => {
    df[key] = arr.zScores(df[key]);
  })

  // convert back to original data type
  return object_to_array(df, data);

};

export default standardize;
