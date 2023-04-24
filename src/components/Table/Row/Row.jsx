import { memo } from "react";

const Row = ({ row }) => {
  return (
    <tr
      className="bg-gray-800 hover:bg-gray-700 hover:text-white "
      {...row.getRowProps()}
    >
      {row.cells.map((cell) => {
        return (
          <td
            className="text-center xl:px-6 py-6 px-0 md:px-4 "
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(Row);
