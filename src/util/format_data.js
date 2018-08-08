// format data values as strings
// const parcoords_format = d => {
// 	d.forEach(
// 		(d_obj) => {
// 			Object.entries(d_obj).forEach(
// 				([key, value]) =>  {
// 					d_obj[key] = value.toString();
// 				});
// 		});
// };
import { csvFormat, csvParse } from 'd3-dsv';

const format_data = data => csvParse(csvFormat(data));

export default format_data;
