const Header = ({ headerGroups }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center dark:bg-gray-700 dark:text-gray-400">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()} className="px-6 py-4 ">
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Header;
