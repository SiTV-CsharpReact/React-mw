import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "./table.scss";
import {
  formatNumber,
  formatNumberMarket,
  getCompanyNameByCode,
  setColorMarkettest,
} from "../../utils/util";
import { ColSpanParams } from "ag-grid-enterprise";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { LicenseManager } from "ag-grid-enterprise";
import PopupStock from "./PopupStock";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getDataTable } from "./tableTestSlice";
import { fetchCategoryAsync } from "../menuBarMW/danhmucSlice";
import { Tooltip } from "@mui/material";
import { dispatchDataTable } from "./tableThunk";
import { dispatchDataTableBuy } from "./tableBuy";
import { statusChartMarketwatch } from "../chartMarketwatch/chartMarketwatchSlice";
import { RowData } from "../../models/tableMarketwatch";

LicenseManager.setLicenseKey(
  "SHI_UK_on_behalf_of_Lenovo_Sweden_MultiApp_1Devs6_November_2019__MTU3Mjk5ODQwMDAwMA==e27a8fba6b8b1b40e95ee08e9e0db2cb"
);

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
  }
};

const PinCell = () => {
  return (
    <div title="Double click to pin" className="pt-[7px]">
      <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z"
        />
      </svg>
    </div>
  );
};

const TableMarketWatchTest = () => {
  // tinh width
  const widthWindow = window.innerWidth;

  const dispatch = useAppDispatch();
  const handleClick = (dataTable: any) => {
    // console.log("dataTable ii",dataTable)
    dispatch(dispatchDataTable(dataTable));
  };
  const handleClickBuy = (dataTable: any) => {
    // console.log("dataTable",dataTable)
    dispatch(dispatchDataTableBuy(dataTable));
  };
  const handleDoubleClick = (e: any, val: any) => {
    if (e.detail === 2) {
      dispatch(statusChartMarketwatch(val));
    }
  };
  //setRowData
  const rowData = useAppSelector((state) => state.tableTest.ListDataTable);
  // pinned
  const pinned = useAppSelector((state) => state.categories.row);

  const handelGetData = useCallback(
    (Data: any) => {
      dispatch(getDataTable(Data));
    },
    [dispatch]
  );
  useEffect(() => {
    async function HanDelCate() {
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
    }
    HanDelCate();
  }, [dispatch, widthWindow]);
  console.log(rowData);
  useEffect(() => {
    const socketHSX = new WebSocket(
      "ws://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=QFYjcEdKNTcQpQ5eM8gSgArpZ8iaLyhAzsOc2yA9Uzj6jAmKV%2Bnt5UMBQQ6IxAg2ytcl36jeKKHXgSbB5HdJNA%2FVdbAn7QKNCQ76UmWHPecxhUD87ZajL354hy24brH6&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=8"
    );
    socketHSX.onopen = () => {
      //console.log("WebSocket connection established.");
    };
    socketHSX.onmessage = (event) => {
      updateQuote(event.data);
      // console.log(gridOptions.api)
      // gridOptions.api.setRowData(event.data);
    };
    socketHSX.onclose = () => {
      //console.log("WebSocket connection closed.");
    };
    return () => {
      socketHSX.close();
    };
  }, []);
  useEffect(() => {
    const socketHNX = new WebSocket(
      "ws://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=IWiKAtteQ0gfuDm%2Fq6LLyUusRcee06oM2k6xVYIgeWHtlePjfeRZFnHIYmMvGt2F1PSB1EsKRw5wHFLA7D0C6bNau3lUFHlFFPF59RMTl3KHk3PRDqc9rmfE904Oy5NV&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1"
    );
    socketHNX.onopen = () => {
      //console.log("WebSocket connection established.");
    };
    socketHNX.onmessage = (event) => {
      // updateQuote(event.data)
      updateQuote(event.data);
      // setDataHNX(event.data);
    };
    socketHNX.onclose = () => {
      // console.log("WebSocket connection closed.");
    };
    return () => {
      socketHNX.close();
    };
  }, []);
  const updateQuote = (objRealtime: any) => {
    // objRealtime = {"RowID":"BCC","Info":[[5,83.5],[7,83.6],[8,100],[11,84.1],[12,101900],[15,77500],[16,84.2],[17,12900],[18,84.3],[19,2000],[20,0],[21,839400],[22,84.2]]};
    //  updateTableHNX(objRealtime)

    var dataHNXRealTime = JSON.parse(objRealtime);
    var arrDatas = [];
    if (typeof dataHNXRealTime !== "undefined") {
      const dataRT = Object.keys(dataHNXRealTime);

      if (dataRT.length !== 0) {
        const dataM = dataHNXRealTime.M;
        if (typeof dataM !== "undefined") {
          dataM.map(
            (dataLT: any) => (
              // console.log(dataM),
              (arrDatas = JSON.parse(dataLT.A[0].Change)),
              // console.log(arrDatas),
              arrDatas.map((arrData: any) => updateTableHNX(arrData))
            )
          );
          // console.log(dataM)
        }
      }
    } else {
      // console.log(dataHNXRealTime)
    }
  };
  const updateTableHNX = (dataHNX: any) => {
    const arrRowID = dataHNX.RowID;
    const arrInfo = dataHNX.Info;
    if (dataHNX) {
      //console.log(dataHNX)
      // data trả ra object có arrRowId
      if (arrRowID) {
        // data >2 map ra
        if (dataHNX.Info.length > 1) {
          dataHNX.Info.map((dataInfo: any) =>
            updateDataTable(arrRowID, dataInfo[0], dataInfo[1])
          );
        }
        // data = 1
        else {
          updateDataTable(arrRowID, arrInfo[0][0], arrInfo[0][1]);
        }
      }
    }
  };

  const updateDataTable = (
    arrRowID: string,
    arrInfo: number,
    arrValue: number
  ) => {
    // getID các giá trị cần lấy
    // const arrayPrice = [5, 7, 9, 11, 14, 16, 18];d
    // const valueTC = document.querySelector(`div[data-index="5"][data-comp="BCC"]`)?.innerHTML;
    const valueTCS = document.querySelector(
      `div[data-index="${arrInfo}"][data-comp="${arrRowID}"]`
    ) as HTMLElement;
    if (valueTCS) {
      valueTCS.innerHTML = `${formatNumberMarket(arrValue)}`;
      // gán màu bg
      const test = valueTCS.parentElement;
      if (test) {
        test.style.backgroundColor = "#888888";
        setTimeout(function () {
          test.style.backgroundColor = "";
        }, 500);
      }
      // sau 0.5s xóa màu bg
    }
  };

  const RowDataIndex = {
    MCK: 0,
    TC: 1,
    Tran: 2,
    San: 3,
    KL4: 4,
    G3: 5,
    KL3: 6,
    G2: 7,
    KL2: 8,
    G1: 9,
    KL1: 10,
    GiaKhop: 11,
    KLKhop: 12,
    Chenhlech: 13,
    G1B: 14,
    KL1B: 15,
    G2B: 16,
    KL2B: 17,
    G3B: 18,
    KL3B: 19,
    KL4B: 20,
    TKL: 21,
    MOC: 22,
    CaoNhat: 23,
    ThapNhat: 24,
    GTB: 25,
    NNMua: 26,
    NNBan: 27,
    RoomCL: 28,
    GDK: 29,
    Quyen: 30,
    CGKGN: 31,
    PhanTram:32,
    RowID: String,
  };
  const containerStyle = { width: "100%", height: "100%" };
  const gridStyle = { height: "100%", width: "100%" };
  const gridApi = useRef<any>(null); // Declare gridApi reference
  // const [rowData, setRowData] = useState<RowData[]>([]);

  const columnDefs = [
    {
      headerName: "",
      cellClass: "ag-cell-pinning",
      // pinned:true,
      field: "pinning",
      maxWidth: 19,
      cellRenderer: PinCell,
      onCellDoubleClicked: (e: any) => {
        const field = e.colDef.field;
        if (field === "pinning") {
          handlePinRow(e);
        }
      },
    },
    {
      field: "MCK",
      // pinned:true,
      headerName: "Mã",
      cellClass: "score-cell",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: widthWindow * 0.05,
      maxWidth: 100,

      // cellClass: "custom-cell",
      headerClass: "custom-header",
      cellStyle: (params: any) => {
        // console.log("ktra", params); // Xem giá trị của params trong console
        return {
          color: setColorMarkettest("MCK", params),
          textAlign: "left",
        };
      },
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.MCK; // Get the index of the column= RowDataIndex.G3; // Get the index of the column

        //console.log("Column Index:", dataIndex);

        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          //  <div data-index={dataIndex} data-comp={rowid}  data-tooltip={getCompanyNameByCode(value).toString()} className="relative custom-cell cell-stock has-symbol company-tooltip">
          //   {value}
          // </div>

          <Tooltip title={getCompanyNameByCode(value)}>
            <div
              data-index={dataIndex}
              data-comp={rowid}
              className="custom-cell cell-stock has-symbol company-tooltip"
            >
              <input
                type="checkbox"
                className="checkbox_price"
                checked={params.data.isPined}
                onClick={() => {
                  // params.data.isPined = !params.data.isPined;
                  handlePinRow(params);
                }}
              />
              <span
                className="pl-1 pt-1"
                onDoubleClick={(e) => handleDoubleClick(e, value)}
              >
                {value}
              </span>
            </div>
          </Tooltip>
        );
      },
    },

    {
      field: "TC",
      headerName: "TC",
      headerClass: "custom-header tc-header",
      cellClass: "score-cell tc-cell",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: widthWindow * 0.03,
      maxWidth: 100,
      // headerStyle: {
      //   fontWeight: "bold",
      //   color: "white",
      //   textAlign: "center",
      // },
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
      }),
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.TC; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column

        // console.log("Column Index:", dataIndex);

        const value = params.value;
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {value}
          </div>
        );
      },
    },
    {
      field: "Tran",
      headerName: "Trần",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: widthWindow * 0.03,
      maxWidth: 100,
      headerClass: "custom-header tc-header ",
      cellClass: "score-cell tc-cell",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.Tran; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column

        // console.log("Column Index:", dataIndex);

        const value = params.value;
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {value}
          </div>
        );
      },
    },
    {
      field: "San",
      headerName: "Sàn",
      suppressMenu: true,
      spanHeaderHeight: true,
      width: widthWindow * 0.03,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      cellClass: "score-cell tc-cell",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.San; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column

        // console.log("Column Index:", dataIndex);

        const value = params.value;
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {value}
          </div>
        );
      },
    },

    {
      headerName: "Mua",
      headerClass: "custom-header",

      children: [
        {
          field: "G3",
          headerName: "G3",
          suppressMenu: true,
          width: widthWindow * 0.03,
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
            const dataIndex = RowDataIndex.G3; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="custom-cell cursor-pointer"
                  onDoubleClick={() =>
                    handleClick({ ma: params.data.MCK, price: value })
                  }
                >
                  {formatNumberMarket(value)}
                </div>
              </Tooltip>
            );
          },
        },
        {
          field: "KL3",
          headerName: "KL3",
          suppressMenu: true,
          width: widthWindow * 0.04,

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
            const dataIndex = RowDataIndex.KL3; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell "
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },

        {
          field: "G2",
          headerName: "G2",
          suppressMenu: true,
          width: widthWindow * 0.03,
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
            const dataIndex = RowDataIndex.G2; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="custom-cell cursor-pointer"
                  onDoubleClick={() =>
                    handleClick({ ma: params.data.MCK, price: value })
                  }
                >
                  {formatNumberMarket(value)}
                </div>
              </Tooltip>
            );
          },
        },

        {
          field: "KL2",
          headerName: "KL2",
          suppressMenu: true,
          width: widthWindow * 0.04,
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
            const dataIndex = RowDataIndex.KL2; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
        {
          field: "G1",
          headerName: "G1",
          suppressMenu: true,
          width: widthWindow * 0.04,
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
            const dataIndex = RowDataIndex.G1; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="custom-cell cursor-pointer"
                  onDoubleClick={() =>
                    handleClick({ ma: params.data.MCK, price: value })
                  }
                >
                  {formatNumberMarket(value)}
                </div>
              </Tooltip>
            );
          },
        },
        {
          field: "KL1",
          headerName: "KL1",
          cellClass: "score-cell",
          suppressMenu: true,
          width: widthWindow * 0.05,
          minWidth: 50,
          maxWidth: 100,
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL1", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.KL1; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
      ],
    },
    {
      headerName: "Khớp lệnh",
      headerClass: "custom-header tc-header",
      children: [
        {
          field: "GiaKhop",
          headerName: "Giá",
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell tc-cell",
          headerClass: "custom-header tc-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.GiaKhop; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
        {
          field: "KLKhop",
          headerName: "KL",
          suppressMenu: true,
          width: widthWindow * 0.04,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell tc-cell",
          headerClass: "custom-header tc-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KLKhop", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.KLKhop; // Get the index of the column= RowDataIndex.KL3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
        {
          field: "Chenhlech",
          headerName: "+/-",

          // headerName: () => {
          //   const buttonElement = document.createElement("button");
          //   buttonElement.innerHTML = "+/-";
          //   buttonElement.addEventListener("click", () => {
          //     // Xử lý sự kiện khi button được nhấp
          //     showKLPT("showPT");
          //   });

          //   const headerElement = document.createElement("div");
          //   headerElement.appendChild(buttonElement);

          //   return headerElement;
          // },
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell tc-cell",
          headerClass: "custom-header tc-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("Chenhlech", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.Chenhlech; // Get the index of the column= column ? allColumns.indexOf(column) : -1; // Get the index of the column
            const value = params.value; // Get the value of the cell
            return (
              <div data-index={dataIndex} className="custom-cell">
                {formatNumberMarket(value)}

              </div>
            );
          },
        },
        {
          field: "PhanTram",
          headerName: "%",

          // headerName: () => {
          //   const buttonElement = document.createElement("button");
          //   buttonElement.innerHTML = "+/-";
          //   buttonElement.addEventListener("click", () => {
          //     // Xử lý sự kiện khi button được nhấp
          //     showKLPT("showPT");
          //   });

          //   const headerElement = document.createElement("div");
          //   headerElement.appendChild(buttonElement);

          //   return headerElement;
          // },
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell tc-cell",
          headerClass: "custom-header tc-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("Chenhlech", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.Chenhlech; // Get the index of the column= column ? allColumns.indexOf(column) : -1; // Get the index of the column
            const value = params.value; // Get the value of the cell
            return (
              <div data-index={dataIndex} className="custom-cell">
                {formatNumberMarket(value)}
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
          headerName: "G1",
          suppressMenu: true,
          width: widthWindow * 0.03,
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
            const dataIndex = RowDataIndex.G1B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="custom-cell cursor-pointer"
                  onDoubleClick={() =>
                    handleClickBuy({ ma: params.data.MCK, price: value })
                  }
                >
                  {formatNumberMarket(value)}
                </div>
              </Tooltip>
            );
          },
        },
        {
          field: "KL1B",
          headerName: "KL1",
          suppressMenu: true,
          width: widthWindow * 0.04,
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
            const dataIndex = RowDataIndex.KL1B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
        {
          field: "G2B",
          headerName: "G2",
          suppressMenu: true,
          width: widthWindow * 0.03,
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
            const dataIndex = RowDataIndex.G2B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="custom-cell cursor-pointer"
                  onDoubleClick={() =>
                    handleClickBuy({ ma: params.data.MCK, price: value })
                  }
                >
                  {formatNumberMarket(value)}
                </div>
              </Tooltip>
            );
          },
        },
        {
          field: "KL2B",
          headerName: "KL2",
          suppressMenu: true,
          width: widthWindow * 0.03,
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
            const dataIndex = RowDataIndex.KL2B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
        {
          field: "G3B",
          headerName: "G3",
          cellClass: "score-cell",
          suppressMenu: true,
          width: widthWindow * 0.04,
          minWidth: 50,
          maxWidth: 100,
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.G3B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="custom-cell cursor-pointer"
                  onDoubleClick={() =>
                    handleClickBuy({ ma: params.data.MCK, price: value })
                  }
                >
                  {formatNumberMarket(value)}
                </div>
              </Tooltip>
            );
          },
        },
        {
          field: "KL3B",
          headerName: "KL3",
          suppressMenu: true,
          width: widthWindow * 0.05,
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
            const dataIndex = RowDataIndex.KL3B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the
            return (
              <div
                data-index={dataIndex}
                data-comp={rowid}
                className="custom-cell"
              >
                {formatNumberMarket(value)}
              </div>
            );
          },
        },
      ],
    },

    {
      field: "TKL",
      headerName: "Tổng KL",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: widthWindow * 0.05,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.TKL; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
    },
    {
      field: "MOC",
      headerName: "Mở Cửa",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.TKL; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
    },
    {
      field: "CaoNhat",
      headerName: "Cao Nhất",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.CaoNhat; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
    },
    {
      field: "ThapNhat",
      headerName: "Thấp nhất",
      spanHeaderHeight: true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.ThapNhat; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
      suppressMenu: true,
    },
    {
      field: "NNMua",
      headerName: "NN mua",
      spanHeaderHeight: true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.NNMua; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
    },
    {
      field: "NNBan",
      headerName: "NN bán",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.NNBan; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
    },
    {
      field: "RoomCL",
      headerName: "Room Còn lại ",
      spanHeaderHeight: true,
      width: widthWindow * 0.05,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header  tc-header",
      suppressMenu: true,
      cellRenderer: (params: any) => {
        const dataIndex = RowDataIndex.RoomCL; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the
        return (
          <div data-index={dataIndex} data-comp={rowid} className="custom-cell">
            {formatNumberMarket(value)}
          </div>
        );
      },
    },

    // { field: "RowID", headerName: "RowID", cellClass: "score-cell" },
  ];

  const defaultColDef = {
    width: 100,
    sortable: true,
    filter: true,
    autoSize: true,
  };

  //pinned
  const gridRef = useRef<any>();
  const pinnedRowsRef = useRef<any[]>([]);

  const handlePinRow = (params: any) => {
    console.log(params.data.RowID);
    const grid = gridRef.current.api;
    const defaultData = gridRef.current.props.rowData;
    const { rowPinned, rowIndex, data } = params;
    const { RowID, symbol, isPined } = data;
    let rows = pinnedRowsRef.current;
    console.log(rows)
    if (rowPinned) {
      const newRows = pinnedRowsRef.current.filter((e) => {
        return RowID !== e.data.RowID;
      });
      const item = rows.find((item) => item.data.RowID === RowID);
      const other = pinnedRowsRef.current.filter((val) => val.index < item.index);
      pinnedRowsRef.current = newRows;
      const rowsToPin = newRows.map((item) => item.data);
      let rowsToPins = rowsToPin
        ? rowsToPin.map((item) => {
            if (item.isPined === false) {
              return { ...item, isPined: true };
            }
            return item;
          })
        : [];
      grid.setPinnedTopRowData(rowsToPins);
      grid.applyTransaction({
        add: [data],
        addIndex: item.index - other.length,
      });
    } else {
      const items = grid.getRowNode(RowID)?.data;
      if (!items) {
        let rowsToPins = rows.map((item: any) => item.data);
        rowsToPins = rowsToPins
          ? rowsToPins.filter((e: RowData) => {
              return RowID !== e?.RowID;
            })
          : [];
        let rowsToPin = rowsToPins
          ? rowsToPins.map((element: RowData) => {
              if (element?.isPined === false) {
                return { ...element, isPined: true };
              }
              return element;
            })
          : [];
        console.log("rowsToPin", rows);
        console.log("rowsToPin", rowsToPins);
        grid.setPinnedTopRowData(rowsToPin);
        grid.applyTransaction({ remove: [items] });
        console.log(grid)
      } else {
        const index = defaultData.findIndex((item: any) => item.MCK === RowID);
        rows.push({
          index,
          data,
        });
        let rowsToPins = rows.map((item: any) => item.data);
        console.log("vạasds", rowsToPins);
        let rowsToPin = rowsToPins
          ? rowsToPins.map((element: RowData) => {
              if (element.isPined === false) {
                return { ...element, isPined: true };
              }
              return element;
            })
          : [];
        grid.setPinnedTopRowData(rowsToPin);
        grid.applyTransaction({ remove: [items] });
      }
    }
  };
  

  
  // const handlePinRow = (params: any) => {
  //   const grid = gridRef.current.api;
  //   const defaultData = gridRef.current.props.rowData;
  //   // console.log(defaultData)
  //   const { rowPinned, rowIndex, data } = params;
  //   console.log("pin", rowPinned, params);
  //   // console.log(params)
  //   const { RowID, symbol } = data;
  //   // console.log(first)
  //   let rows = pinnedRowsRef.current;

  //   if (rowPinned) {
  //     // Unpin
  //     const newRows = pinnedRowsRef.current.filter((e) => {
  //       return RowID !== e.data.RowID;
  //     });
  //     const item = rows.find((item) => item.data.RowID === RowID);

  //     const other = pinnedRowsRef.current.filter(
  //       (val) => val.index < item.index
  //     );

  //     pinnedRowsRef.current = newRows;

  //     const rowsToPin = newRows.map((item) => item.data);

  //     console.log("unpin", item);

  //     grid.setPinnedTopRowData(rowsToPin);
  //     grid.applyTransaction({
  //       add: [data],
  //       addIndex: item.index - other.length,
  //     });
  //   } else {
  //     console.log("pin thành công");
  //     // Pin
  //     const items = grid.getRowNode(RowID).data;

  //     console.log(items);
  //     const index = defaultData.findIndex((item: any) => item.MCK === RowID);
  //     rows.push({
  //       index,
  //       data,
  //     });
  //     const rowsToPin = rows.map((item) => item.data);
  //     // params.data.isPined = true;
  //     console.log("pin", index, rowsToPin);
  //     // Set rows pin to top
  //     grid.setPinnedTopRowData(rowsToPin);
  //     // Remove item from list
  //     grid.applyTransaction({ remove: [items] });
  //     console.log(grid);
  //   }
  // };

  const gridOptions = {
    getRowId: function (e: any) {
      return e.data.RowID;
    },
    defaultColDef: {
      resizable: false,
      sortable: true,
      suppressMovable: true,
      flex: 1,
    },
      suppressCellSelection: true,
      suppressRowClickSelection: true,
      suppressContextMenu: true,
      suppressCellContextMenu: true,
      suppressRowContextMenu: true,
      autoGroupColumnDef: {
      
        // use font awesome for first col, with numbers for sort
        icons: {
          sortAscending: '<i class="fa fa-caret-up !text-sm pr-0.5"/>',
          sortDescending: '<i class="fa fa-caret-down !text-sm pr-0.5"/>',
        },
     
      },
      icons: {
        sortAscending: '<i class="fa fa-caret-down !text-sm pr-0.5"/>',
        sortDescending: '<i class="fa fa-caret-up !text-sm pr-0.5"/>',
      }
    // };
    // document.addEventListener("contextmenu", (event) => {
    //   event.preventDefault();
    // })
  };
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  })

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          suppressDragLeaveHidesColumns={true}
          suppressCellFocus={true}
          rowHeight={25}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          rowDragEntireRow={true}
          rowDragMultiRow={true}
          rowSelection={"multiple"}
          animateRows={true}
          gridOptions={gridOptions}
          onGridReady={(params: any) => {
            params.api.sizeColumnsToFit(undefined, {
              suppressSizeToFit: false,
            });
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(TableMarketWatchTest);
