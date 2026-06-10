/**
 * Selections are the collection of all brushed and marked data; reset all or just a subset (brushed or marked)
 *
 * @param {string} selection: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: if linked charts exist, only those are affected
 */
const resetSelections = (config, ps, flags) => selection => {
  if (selection == 'brushed') {
    ps.brushReset();
  } else if (selection == 'marked') {
    ps.unmark();
  } else if (selection == 'both') {
    ps.brushReset();
    ps.unmark();
  } else {
    throw 'Please specify one of {\'brushed\', \'marked\', \'both\'}';
  }
};

export default resetSelections;
