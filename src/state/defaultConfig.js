import { union } from 'lodash-es';

const DefaultConfig = {
  dataView: false,
  grid: false,
  chartOptions: {}, // parcoords options, applies to all charts
  linked: [], // list of linked components
  brushed: [], // intersection of all brushed data
  marked: [], // union of all marked data
  selections: function() { return(union(this.brushed, this.marked)); },
};

export default DefaultConfig;
