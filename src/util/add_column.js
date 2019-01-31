import { includes } from 'lodash-es';
// add column defintion to grid columns
const add_column = (columns, col_name) => {
  // ignore repeats
  const names = columns.map(col => col.name);
  if (includes(names, col_name)) {
    return columns;
  } else {
    const col_def = {
      id: col_name,
      name: col_name,
      field: col_name,
      sortable: true,
    };
    columns.push(col_def);
    return columns;
  }
};
export default add_column;
