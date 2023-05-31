import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "./table.scss";
import { setColorMarkettest } from "../../utils/util";
import { ColSpanParams } from "ag-grid-enterprise";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('SHI_UK_on_behalf_of_Lenovo_Sweden_MultiApp_1Devs6_November_2019__MTU3Mjk5ODQwMDAwMA==e27a8fba6b8b1b40e95ee08e9e0db2cb');
type RowData = {
  MCK: string;
  TC: string;
  Tran: string;
  San: string;
  KL4: string;
  G3: string;
  KL3: string;
  G2: string;
  KL2: string;
  G1: string;
  KL1: string;
  GiaKhop: string;
  KLKhop: string;
  Chenhlech: string;
  G1B: string;
  KL1B: string;
  G2B: string;
  KL2B: string;
  G3B: string;
  KL3B: string;
  KL4B: string;
  TKL: string;
  MOC: string;
  CaoNhat: string;
  ThapNhat: string;
  GTB: string;
  NNMua: string;
  NNBan: string;
  RoomCL: string;
  GDK: string;
  Quyen: string;
  CGKGN: string;
  RowID: string;
};
const showKLPT = (value: string) => {
  // console.log(value);
  if (value === "showPT") {
    const element = document.getElementsByClassName("price-ot");
    const elementFirst = document.getElementsByClassName("price-ot")[0];
    const elementPriceChange = document.getElementsByClassName("price-change");
    const elementKhopLenhPT = document.getElementById("showKhopLenhPT");
    if (elementFirst.classList.contains("d-block-kl")) {
      for (let j = 0; j < element.length; j++) {
        const elementOT = element.item(j);
        elementOT?.classList.remove("d-block-kl");
        elementOT?.classList.add("d-none-kl");

        // In ra danh sách các lớp của phần tử
      }
      for (let i = 0; i < elementPriceChange.length; i++) {
        const elementChange = elementPriceChange.item(i);
        elementChange?.classList.remove("d-none-kl");
        elementChange?.classList.add("d-block-kl");
        // In ra danh sách các lớp của phần tử
      }
      if (elementKhopLenhPT) elementKhopLenhPT.innerHTML = "+/-";
    } else {
      for (let j = 0; j < element.length; j++) {
        const elementOT = element.item(j);
        elementOT?.classList.remove("d-none-kl");
        elementOT?.classList.add("d-block-kl");
        // In ra danh sách các lớp của phần tử
      }
      for (let i = 0; i < elementPriceChange.length; i++) {
        const elementChange = elementPriceChange.item(i);
        elementChange?.classList.remove("d-block-kl");
        elementChange?.classList.add("d-none-kl");
        // In ra danh sách các lớp của phần tử
      }
      if (elementKhopLenhPT) elementKhopLenhPT.innerHTML = "%";
    }
    // if(element) {
    //   element.classList.remove("d-block-kl")
    //   element.classList.add("d-none-kl")
    // }
  }
};

const TableMarketWatchTest = () => {
  const containerStyle = { width: "100%", height: "100%" };
  const gridStyle = { height: "100%", width: "100%" };
  const gridApi = useRef<any>(null); // Declare gridApi reference

  const [rowData, setRowData] = useState<RowData[]>([]);

  const columnDefs = [
    {
      field: "MCK",
      headerName: "Mã",
      cellClass: "score-cell",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      // cellClass: "custom-cell",
      headerClass: "custom-header",
      cellStyle: (params: any) => {
        console.log("ktra", params); // Xem giá trị của params trong console
        return {
          color: setColorMarkettest("MCK", params),
          textAlign: "left",
        };
      },
   
    },

    {
      field: "TC",
      headerName: "TC",
      headerClass: "custom-header tc-header",
      cellClass: "score-cell tc-cell",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      headerStyle: {
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
      }),
      
    },
    {
      field: "Tran",
      headerName: "Tran",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      headerClass: "custom-header tc-header ",
      cellClass: "score-cell tc-cell",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
    },
    {
      field: "San",
      headerName: "San",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      cellClass: "score-cell tc-cell",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
    },

    {
      headerName: "Mua",
      headerClass: "custom-header",

      children: [
        {
          field: "G3",
          headerName: "G3",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          height: 30,
          maxWidth: 100,
          headerClass: "custom-header",
          cellClass: "score-cell",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "KL3",
          headerName: "KL3",
          suppressMenu: true,
          width: 62,
          minWidth: 50,
          heigth: 34,
          maxWidth: 100,
          headerClass: "custom-header",
          cellClass: "score-cell",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL3", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        
        {
          field: "G2",
          headerName: "G2",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("G2", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },

        {
          field: "KL2",
          headerName: "KL2",
          suppressMenu: true,
          width: 62,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL2", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "G1",
          headerName: "G1",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("G1", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "KL1",
          headerName: "KL1",
          cellClass: "score-cell",
          suppressMenu: true,
          width: 62,
          minWidth: 50,
          maxWidth: 100,
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL1", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
      ],
    },
    {
      headerName: "Khớp lệnh",
      headerClass: "custom-header",

      children: [
        {
          field: "GiaKhop",
          headerName: "Gia",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "KLKhop",
          headerName: "KL",
          suppressMenu: true,
          width: 52,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KLKhop", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "Chenhlech",
          headerName: () => {
            const buttonElement = document.createElement("button");
            buttonElement.innerHTML = "+/-";
            buttonElement.addEventListener("click", () => {
              // Xử lý sự kiện khi button được nhấp
              showKLPT("showPT");
            });

            const headerElement = document.createElement("div");
            headerElement.appendChild(buttonElement);

            return headerElement;
          },
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("Chenhlech", params),
            textAlign: "right",
          }),
           cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
      ],
    },

    {
      headerName: "Bán",
      headerClass: "custom-header",

      children: [
        {
          field: "G1B",
          headerName: "G1B",
          suppressMenu: true,
          width: 52,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
           cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "KL1B",
          headerName: "KL1B",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL1B", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "G2B",
          headerName: "G2B",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "KL2B",
          headerName: "KL2B",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL2B", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "G3B",
          headerName: "G3B",
          cellClass: "score-cell",
          suppressMenu: true,
          width: 50,
          minWidth: 50,
          maxWidth: 100,
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
        {
          field: "KL3B",
          headerName: "KL3B",
          suppressMenu: true,
          width: 60,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell ",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL3B", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
            const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
            const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column
    
            console.log("Column Index:", dataIndex);
    
            const value = params.value; // Get the value of the cell
    
            return (
              <div data-index={dataIndex} className="custom-cell">
                {value}
              </div>
            );
          },
        },
      ],
    },

    {
      field: "TKL",
      headerName: "TKL",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: 60,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      
    },
    {
      field: "MOC",
      headerName: "MOC",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
    },
    {
      field: "CaoNhat",
      headerName: "CaoNhat",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
        const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
        const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column

        console.log("Column Index:", dataIndex);

        const value = params.value; // Get the value of the cell

        return (
          <div data-index={dataIndex} className="custom-cell">
            {value}
          </div>
        );
      },
      suppressMenu: true,
    },
    {
      field: "ThapNhat",
      headerName: "ThapNhat",
      spanHeaderHeight: true,
      width: 52,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
        const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
        const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column

        console.log("Column Index:", dataIndex);

        const value = params.value; // Get the value of the cell

        return (
          <div data-index={dataIndex} className="custom-cell">
            {value}
          </div>
        );
      },
      suppressMenu: true,
    },
    {
      field: "NNMua",
      headerName: "NNMua",
      spanHeaderHeight: true,
      width: 62,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
        const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
        const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column

        console.log("Column Index:", dataIndex);

        const value = params.value; // Get the value of the cell

        return (
          <div data-index={dataIndex} className="custom-cell">
            {value}
          </div>
        );
      },
    },
    {
      field: "NNBan",
      headerName: "NNBan",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: 73,
      maxWidth: 100,

      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
        const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
        const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column

        console.log("Column Index:", dataIndex);

        const value = params.value; // Get the value of the cell

        return (
          <div data-index={dataIndex} className="custom-cell">
            {value}
          </div>
        );
      },
    },
    {
      field: "RoomCL",
      headerName: "RoomCL ",
      spanHeaderHeight: true,
      width: 62,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header  tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const allColumns = params.columnApi.getAllGridColumns(); // Retrieve all columns
        const column = allColumns.find((col: any) => col.getInstanceId() === params.column.getInstanceId()); // Find the matching column
        const dataIndex = column ? allColumns.indexOf(column) : -1; // Get the index of the column

        console.log("Column Index:", dataIndex);

        const value = params.value; // Get the value of the cell

        return (
          <div data-index={dataIndex} className="custom-cell">
            {value}
          </div>
        );
      },
    },

    // { field: "RowID", headerName: "RowID", cellClass: "score-cell" },
  ];

  const fetchData = () => {
    fetch("http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNXIndex")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data); // Xem dữ liệu trả về từ API trong console
        if (Array.isArray(data)) {
          // Chỉnh sửa điều kiện kiểm tra dữ liệu
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const infoArray = element.Info.map(
              (subArray: any[]) => subArray[1]
            );
            const sortedData = data.map((product: any) => {
              const sortedInfo = product.Info.sort((a: any, b: any) => {
                const indexA = Number(a[0]);
                const indexB = Number(b[0]);
                if (indexA < indexB) {
                  return -1;
                }
                if (indexA > indexB) {
                  return 1;
                }
                return 0;
              });
              return { ...product, Info: sortedInfo };
            });
            const mergedArray = data.map((element: any) => {
              const infoArray = element.Info.map(
                (subArray: any[]) => subArray[1]
              );
              const mergedObject: RowData = {
                // MCK: infoArray[0],
                // TC: infoArray[1],
                // Tran: infoArray[2],
                // San: infoArray[3],
                // G3: infoArray[4],
                // KL3: infoArray[5],
                // G2: infoArray[6],
                // KL2: infoArray[7],
                // G1: infoArray[8],
                // KL1: infoArray[9],
                // Gia: infoArray[10],
                // KL: infoArray[11],
                // KLTEXT: infoArray[12],
                // G1B: infoArray[13],
                // KL1B: infoArray[14],
                // G2B: infoArray[15],
                // KL2B: infoArray[16],
                // G3B: infoArray[17],
                // KL3B: infoArray[18],
                // TKL: infoArray[19],
                // MOC: infoArray[20],
                // CaoNhat: infoArray[21],
                // ThapNhat: infoArray[22],
                // NNMua: infoArray[23],
                // NNBan: infoArray[24],
                // RoomCL: infoArray[25],
                MCK: infoArray[0],
                TC: infoArray[1],
                Tran: infoArray[2],
                San: infoArray[3],
                KL4: infoArray[4],
                G3: infoArray[5],
                KL3: infoArray[6],
                G2: infoArray[7],
                KL2: infoArray[8],
                G1: infoArray[9],
                KL1: infoArray[10],
                GiaKhop: infoArray[11],
                KLKhop: infoArray[12],
                Chenhlech: infoArray[13],
                G1B: infoArray[14],
                KL1B: infoArray[15],
                G2B: infoArray[16],
                KL2B: infoArray[17],
                G3B: infoArray[18],
                KL3B: infoArray[19],
                KL4B: infoArray[20],
                TKL: infoArray[21],
                MOC: infoArray[22],
                CaoNhat: infoArray[23],
                ThapNhat: infoArray[24],
                GTB: infoArray[25],
                NNMua: infoArray[26],
                NNBan: infoArray[27],
                RoomCL: infoArray[28],
                GDK: infoArray[29],
                Quyen: infoArray[30],
                CGKGN: infoArray[31],
                RowID: element.RowID,
              };
              return mergedObject;
            });

            setRowData(mergedArray);
            console.log("testne", mergedArray);
          }
        } else {
          console.error("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const defaultColDef = {
    width: 100,
    sortable: true,
    filter: true,
    autoSize: true,
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          rowDragEntireRow={true}
          rowDragMultiRow={true}
          rowSelection={"multiple"}
          animateRows={true}
          onGridReady={(params: any) => {
            params.api.sizeColumnsToFit(undefined, {
              suppressSizeToFit: false,
            });
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default TableMarketWatchTest;
