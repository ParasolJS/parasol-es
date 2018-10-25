/**
 * Selections are the collection of all brushed and marked data; reset all or just a subset -- brushed or marked
 *
 * @param selection: One of {'brushed', 'marked', 'both'} keywords as string
 *
 * NOTE: only linked charts are affected
 */
const resetSelections = (config, ps, flags) => selection => {
  if (selection == 'brushed') {
    ps.globalBrushReset(ps.linked);
  } else if (selection == 'marked') {
    ps.globalMarkReset(ps.linked);
  } else if (selection == 'both') {
    ps.globalBrushReset(ps.linked);
    ps.globalMarkReset(ps.linked);
  } else {
    throw 'Please specify one of {\'brushed\', \'marked\', \'both\'}';
  }
};

export default resetSelections;
