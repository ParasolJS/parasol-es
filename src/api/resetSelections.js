/**
 * Selections are the collection of all brushed and marked data; reset all or just a subset -- brushed or marked
 *
 * @param {string} selection - one of {'brushed', 'marked', 'both'} keywords as string.
 * NOTE: only linked charts are affected.
 */
const resetSelections = (config, ps, flags) => selection => {
  console.log('config linked: ', config.linked);
  if (selection == 'brushed') {
    ps.globalBrushReset(config.linked);
  } else if (selection == 'marked') {
    ps.globalMarkReset(config.linked);
  } else if (selection == 'both') {
    ps.globalBrushReset(config.linked);
    ps.globalMarkReset(config.linked);
  } else {
    // throw error
  }
  console.log(config.selections());
};

export default resetSelections;
