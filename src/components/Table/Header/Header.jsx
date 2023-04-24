const Header = ({ headerGroups }) => {
  return (
    <thead className="xl:text-xs text-[0.6rem] text-gray-700 uppercase bg-gray-50 text-center dark:bg-gray-700 dark:text-gray-400">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()} className="xl:px-6 px-2 py-4 ">
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Header;
