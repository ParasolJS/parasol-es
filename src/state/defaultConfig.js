import { union } from 'lodash-es';

const DefaultConfig = {
  dataView: false,
  grid: false,
  chartOptions: {}, // parcoords options, applies to all charts
  brushed: [], // intersection of all brushed data in linked charts
  marked: [], // union of all marked data in linked charts
  selections: function() {
    return union(this.brushed, this.marked);
  },
};

export default DefaultConfig;
