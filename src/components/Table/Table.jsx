import { useTable } from "react-table";

const Table = ({ columns, data, searchValue, keysToFilter }) => {
  const filterDataToTable = () => {
    if (searchValue.length === 0) return data;
    const filteredData = data.filter((filtered) => {
      if (
        keysToFilter.some((key) =>
          filtered[key].toLowerCase().includes(searchValue)
        ) ||
        keysToFilter.some((key) =>
          searchValue.includes(filtered[key].toLowerCase())
        )
      )
        return filtered;
    });
    return filteredData;
  };

  const filteredData = filterDataToTable();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  return (
    <table
      {...getTableProps()}
      className="w-2/3 text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="px-6 py-2">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className="bg-gray-800 hover:bg-gray-700 hover:text-white "
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    className="text-center px-6 py-6"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
