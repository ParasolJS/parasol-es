import { csvFormat } from 'd3';
import { saveAs } from 'file-saver/FileSaver';

/**
 * Export selected data to new csv and download
 *
 * @param selection: {string} one of {'brushed', 'marked', 'both', 'all'}
 * @param filename: {string} name of csv file to be downloaded
 */
const exportData = (config, ps, flags) =>
  function(selection='all', filename=null) {
    if (filename === null) {
      filename = 'parasol_data.csv';
    }

    // identify data
    let d = [];
    if (selection == 'brushed') {
      d = config.brushed;
    } else if (selection == 'marked') {
      d = config.marked;
    } else if (selection == 'both') {
      d = config.selections();
    } else if (selection == 'all') {
      d = config.data;
    } else {
      // throw error
    }
    console.log(d);

    if (d.length > 0) {
      // format data as csv
      // NOTE: want to include assigned data id number?
      const csv = csvFormat(d, config.vars);

      // create url and download
      const file = new Blob([csv], {type: 'text/csv'});
      saveAs(file, filename);

    } else {
      console.log('Error: No data selected.');
    }

    return this;
  };

export default exportData;
