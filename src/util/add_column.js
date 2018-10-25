// add column defintion to grid columns
const add_column = (columns, col_name) => {
  const col_def = {
    id: col_name,
    name: col_name,
    field: col_name,
    sortable: true,
  };
  columns.push( col_def );
  return columns;
};
export default add_column;
