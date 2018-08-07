// wrangling tools to manipulate data for processing values

// data is formatted as array of objects, each row is an object
// we need object of arrays, each inner-array is a column
// e.g. {"var1": [data], "var2": [data]}
const array_to_object = data => {
  data.reduce( (acc, obj) => {
    Object.keys(obj).forEach(function(k) {
      acc[k] = (acc[k] || []).concat(Number(obj[k]))
    })
    return acc
  },{})
  console.log(this); //maybe need to return this
};

// data is formatted as 'data frame' with columns as keys
// convert back to array of objects with rows as objects
const object_to_array = (df, data) => {
  var result = [];
  Object.entries(df).forEach( ([key, values]) => {
    values.forEach( (val, i) => {
      result[i] = (result[i] || {});
      // get original string if NaN
      if (isNaN(val)){
        result[i][key] = data[i][key];
      } else {
        result[i][key] = val.toString();
      }
    })
  })
  return result;
};

export { array_to_object, object_to_array };
