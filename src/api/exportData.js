import { csvFormat } from 'd3';
import { saveAs } from 'file-saver/FileSaver';

/**
 * Export selected data to new csv and download
 *
 * @param {string} selection: one of {'brushed', 'marked', 'both'}
 * @param {string} filename:  name of csv file to be downloaded
 * @param {boolean} exportAll:  override selection param and export all data
 */
const exportData = (config, ps, flags) =>
  function({ selection='both', filename=null, exportAll=false }) {
    if (filename === null) {
      filename = 'parasol_data.csv';
    }

    // identify data
    let d = [];
    if (exportAll) {
      d= config.data;
    } else if (selection == 'brushed') {
      d = config.brushed;
    } else if (selection == 'marked') {
      d = config.marked;
    } else if (selection == 'both') {
      d = config.selections();
    } else {
      throw 'Please specify one of {\'brushed\', \'marked\', \'both\'}';
    }

    if (d.length > 0) {
      // format data as csv
      // NOTE: include assigned data id number?
      const csv = csvFormat(d, config.vars);

      // create url and download
      const file = new Blob([csv], {type: 'text/csv'});
      saveAs(file, filename);

    } else {
      throw 'Error: No data selected.';
    }
    return this;
  };

export default exportData;
