import { csvFormat } from 'd3-dsv';
// file-saver 2.x sets `module.exports = saveAs` and assigns `saveAs.saveAs`
// at runtime, so there is no statically detectable named export -- a named
// import compiles fine but throws in Node ESM consumers of dist/parasol.esm.js.
import saveAs from 'file-saver';

/**
 * Export selected data to new csv and download
 *
 * @param {string} selection: one of {'brushed', 'marked', 'both'}
 * @param {string} filename:  name of csv file to be downloaded
 * @param {boolean} exportAll:  override selection param and export all data
 */
const exportData = (config, ps, flags) =>
  function({ selection = 'both', filename = null, exportAll = false }) {
    if (filename === null) {
      filename = 'parasol_data.csv';
    }

    // identify data
    let d = [];
    if (exportAll) {
      d = config.data;
    } else if (selection == 'brushed') {
      d = config.brushed;
    } else if (selection == 'marked') {
      d = config.marked;
    } else if (selection == 'both') {
      d = config.selections();
    } else {
      throw new Error('Please specify one of {\'brushed\', \'marked\', \'both\'}');
    }

    if (d.length > 0) {
      // format data as csv
      // NOTE: include assigned data id number?
      const csv = csvFormat(d, config.vars);

      // create url and download
      const file = new Blob([csv], { type: 'text/csv' });
      saveAs(file, filename);
    } else {
      throw new Error('No data selected.');
    }
    return this;
  };

export default exportData;
