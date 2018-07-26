// side effects for setters
import { dispatch } from 'd3-dispatch';

const sideEffects = (
	config,
	ps,
	flags
) =>
	dispatch
		.apply(this, Object.keys(config));
// .on('brush', data => {
//   if (flags.linked) {
//     ps.sync(data);
//   }
// })
// .on('data', data => {
// })


export default sideEffects;
