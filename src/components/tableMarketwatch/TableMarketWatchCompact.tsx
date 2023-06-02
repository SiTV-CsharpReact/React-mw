import React, { useCallback, useEffect,useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { getDataTable } from './tableTestSlice';
import { fetchCategoryAsync } from '../menuBarMW/danhmucSlice';
import { useTable, useSortBy, Column } from 'react-table';

const TableMarketWatchCompact: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // Lấy dữ liệu từ store
  const dataTables = useAppSelector((state) => state.tableTest.ListDataTable);

  const handelGetData = useCallback((Data: any) => {
    dispatch(getDataTable(Data));
  }, [dispatch]);

  useEffect(() => {
    async function HandleCate() {
      let result = await dispatch(fetchCategoryAsync());
      if (result?.payload?.Data[0]?.List) {
        let data = {
          Floor: "danh-muc",
          Query: result?.payload?.Data[0]?.List,
        };
        await handelGetData(data);
      } else {
        let data = {
          Floor: "HSX",
          Query: "s=quote&l=All",
        };
        await handelGetData(data);
      }
      setIsDataLoaded(true); // Đánh dấu là đã tải dữ liệu
    }

    if (!isDataLoaded) { // Kiểm tra nếu chưa tải dữ liệu thì mới gọi HandleCate
      HandleCate();
    }
  }, [dispatch, handelGetData, isDataLoaded]);// Thêm dataTables vào dependency để chỉ gọi useEffect khi dataTables thay đổi
  

  const columns: Column[] = [
    // Định nghĩa cột cho bảng
    { Header: 'Mã chứng khoán', accessor: 'MCK' },
    { Header: 'TC', accessor: 'TC' },
    { Header: 'Trần', accessor: 'Tran' },
    { Header: 'Sàn', accessor: 'San' },
    { Header: 'KL4', accessor: 'KL4' },
    { Header: 'G3', accessor: 'G3' },
    { Header: 'KL3', accessor: 'KL3' },
    { Header: 'G2', accessor: 'G2' },
    { Header: 'KL2', accessor: 'KL2' },
    { Header: 'G1', accessor: 'G1' },
    { Header: 'KL1', accessor: 'KL1' },
    { Header: 'Giá Khớp', accessor: 'GiaKhop' },
    { Header: 'KL Khớp', accessor: 'KLKhop' },
    { Header: 'Chênh lệch', accessor: 'Chenhlech' },
    { Header: 'G1B', accessor: 'G1B' },
    { Header: 'KL1B', accessor: 'KL1B' },
    { Header: 'G2B', accessor: 'G2B' },
    { Header: 'KL2B', accessor: 'KL2B' },
    { Header: 'G3B', accessor: 'G3B' },
    { Header: 'KL3B', accessor: 'KL3B' },
    { Header: 'KL4B', accessor: 'KL4B' },
    { Header: 'TKL', accessor: 'TKL' },
    { Header: 'MOC', accessor: 'MOC' },
    { Header: 'Cao Nhất', accessor: 'CaoNhat' },
    { Header: 'Thấp Nhất', accessor: 'ThapNhat' },
    { Header: 'GTB', accessor: 'GTB' },
    { Header: 'NN Mua', accessor: 'NNMua' },
    { Header: 'NN Bán', accessor: 'NNBan' },
    { Header: 'Room CL', accessor: 'RoomCL' },
    { Header: 'GDK', accessor: 'GDK' },
    { Header: 'Quyền', accessor: 'Quyen' },
    { Header: 'CGKGN', accessor: 'CGKGN' },
    { Header: 'Row ID', accessor: 'RowID' },
  ];

  // Sử dụng react-table để tạo bảng và sắp xếp dữ liệu
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: dataTables }, useSortBy);
  console.log(dataTables)
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                  </span>
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
    </>
  );
};

export default TableMarketWatchCompact;
