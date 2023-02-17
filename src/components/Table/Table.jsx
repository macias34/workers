import { filterDataToTable, sortData } from "@/src/helpers/tableHelpers";
import { useTable } from "react-table";
import Header from "./Header/Header";
import Row from "./Row/Row";

const Table = ({ columns, data, searchValue, keysToFilter }) => {
  const sortedData = sortData(data);
  const filteredData = filterDataToTable(sortedData, keysToFilter, searchValue);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  return (
    <table
      {...getTableProps()}
      className="w-2/3 text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <Header headerGroups={headerGroups} />
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return <Row row={row} key={row.id} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
