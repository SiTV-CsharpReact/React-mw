import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { getDataTable } from "../../tableMarketwatch/TableDanhMucSlice";
import DanhMuc from "../../menuBarMW/DanhMuc";
import { AgGridReact } from "ag-grid-react";
import { formatNumberMarket, setColorMarket } from "../../../utils/util";
import { RowDataIndex } from "../../tableMarketwatch/interface/config.tablegrid";

const gridOptions = {
  getRowId: function (e: any) {
    return e.data.RowID;
  },
  defaultColDef: {
    resizable: false,
    sortable: false,
    suppressMovable: true,
    flex: 1,
  },
};

const TableTabWithDanhMuc = () => {
  const { ListDataTable } = useAppSelector((state) => state.tableTest);
  console.log("row", ListDataTable);

  const columnDefs = React.useMemo(
    () => [
      {
        field: "Mã CK",
        headerName: "Mã CK",
        maxWidth: 100,
        suppressMenu: true,
        height: 45,
        headerClass: "custom-header",
        cellRenderer: (params: any) => {
          // const dataIndex = RowDataIndex.;
          // const value = params.value;
          // const rowid = params.data.RowID;
          console.log(params);
          return (
            <div
              // data-index={dataIndex}
              // data-comp={rowid}
              className={`custom-cell !h-[45px] !justify-start ${setColorMarket(
                params.data.TC,
                params.data.GiaKhop,
                params.data.Tran,
                params.data.San
              )}`}
            >
              {params.data.MCK}
            </div>
          );
        },
      },
      {
        field: "Mua 1",
        headerName: "Mua 1",
        maxWidth: 100,
        suppressMenu: true,
        headerClass: "custom-header",
        height: 45,
        cellRenderer: (params: any) => {
          return (
            <div
              // data-index={dataIndex}
              // data-comp={rowid}
              className={`custom-cell !h-[45px] inline-flex flex-col !text-right !items-end ${setColorMarket(
                params.data.TC,
                params.data.GiaKhop,
                params.data.Tran,
                params.data.San
              )}`}
            >
              <span>{params.data.G1}</span>
              <span>{formatNumberMarket(params.data.KL1)}</span>
            </div>
          );
        },
      },
      {
        field: "Khớp",
        headerName: "Khớp",
        maxWidth: 100,
        suppressMenu: true,
        headerClass: "custom-header",
        height: 45,
        cellRenderer: (params: any) => {
          return (
            <div
              // data-index={dataIndex}
              // data-comp={rowid}
              className={`custom-cell !h-[45px] inline-flex flex-col text-right !items-end ${setColorMarket(
                params.data.TC,
                params.data.GiaKhop,
                params.data.Tran,
                params.data.San
              )}`}
            >
              <span>{params.data.GiaKhop}</span>
              <span>{params.data.Chenhlech}</span>
            </div>
          );
        },
      },
      {
        field: "Bán 1",
        headerName: "Bán 1",
        maxWidth: 100,
        suppressMenu: true,
        headerClass: "custom-header",
        height: 45,
        cellRenderer: (params: any) => {
          return (
            <div
              // data-index={dataIndex}
              // data-comp={rowid}
              className={`custom-cell inline-flex flex-col text-right !h-[45px] !items-end ${setColorMarket(
                params.data.TC,
                params.data.GiaKhop,
                params.data.Tran,
                params.data.San
              )}`}
            >
              <span>{params.data.G2}</span>
              <span>{formatNumberMarket(params.data.KL2)}</span>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="h-full tbDanhMuc">
      <div>
        <DanhMuc />
      </div>
      <div className="w-full tab1_body">
        <div
          className="ag-theme-alpine-dark"
          style={{ height: 400, width: "100%", background: "#000 !important" }}
        >
          <AgGridReact
            rowHeight={45}
            rowData={ListDataTable}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            rowSelection={"multiple"}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default TableTabWithDanhMuc;
