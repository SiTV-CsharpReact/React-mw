import React, { useCallback, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "./table.scss";
import { formatNumberMarket } from "../../utils/util";

// import { LicenseManager } from "ag-grid-enterprise";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getDataTable } from "./tableTestSlice";
import { fetchCategoryAsync } from "../menuBarMW/danhmucSlice";

import {
  RowDataIndex,
  defaultColDef,
  gridOptions,
} from "./interface/config.tablegrid";
import ColumnDef from "./components/options";

// LicenseManager.setLicenseKey(
//   "SHI_UK_on_behalf_of_Lenovo_Sweden_MultiApp_1Devs6_November_2019__MTU3Mjk5ODQwMDAwMA==e27a8fba6b8b1b40e95ee08e9e0db2cb"
// );
const TableMarketWatchTest = () => {
  // tinh width
  const gridRef = useRef<any>();
  const pinnedRowsRef = useRef<any[]>([]);

  const [columnDefs] = ColumnDef(gridRef, pinnedRowsRef);
  const dispatch = useAppDispatch();

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
  }, [dispatch]);
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
  const containerStyle = { width: "100%", height: "100%" };
const gridStyle = { height: "100%", width: "100%" };

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    return () => {
      document.removeEventListener("contextmenu", () => {});
    };
  }, []);

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