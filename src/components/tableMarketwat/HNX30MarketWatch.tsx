import { useMemo } from 'react';
import { useTable, useSortBy, useGroupBy } from 'react-table';

function Table() {
  const data = useMemo(
    () => [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 32,
        gender: 'Male',
        city: 'New York',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 27,
        gender: 'Female',
        city: 'Los Angeles',
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        age: 45,
        gender: 'Male',
        city: 'Chicago',
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 37,
        gender: 'Female',
        city: 'San Francisco',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            sortType: 'basic', // specify sort type as 'basic' to sort by number correctly
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          {
            Header: 'City',
            accessor: 'city',
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        groupBy: ['gender'], // set default grouping by gender
        sortBy: [{ id: 'age', desc: true }], // set default sorting by age in descending order
      },
    },
    useGroupBy,
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? 'desc'
                      : 'asc'
                    : ''
                }
              >
                {column.canGroupBy ? (
                  <span {...column.getGroupByToggleProps()}>
                    {column.isGrouped ? '🛑 ' : '👉 '}
                  </span>
                ) : null}
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;