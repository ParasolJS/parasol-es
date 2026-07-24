// side effects for setters
import { dispatch } from 'd3';

const sideEffects = (config, ps, flags) =>
  dispatch(...Object.keys(config));
// .on('brush', data => {
//   if (flags.linked) {
//     ps.sync(data);
//   }
// })
// .on('data', data => {
// })

export default sideEffects;
