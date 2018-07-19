// format data values as strings
const parcoords_format = d => {
  d.forEach(
    (d_obj) => {
      Object.entries(d_obj).forEach(
        ([key, value]) =>  {
          d_obj[key] = value.toString();
      })
  });
};

export default parcoords_format;
