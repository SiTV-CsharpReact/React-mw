import React, { useCallback, useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "./table.scss";
import {
  arrayColor,
  colorTextMenu,
  fStatusMarketHNX,
  fStatusMarketUPCOM,
  formatNumberMarket,
} from "../../utils/util";

// import { LicenseManager } from "ag-grid-enterprise";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getDataTable, handleHistoryPrices } from "./tableTestSlice";
import { fetchCategoryAsync } from "../menuBarMW/danhmucSlice";

import { defaultColDef, gridOptions } from "./interface/config.tablegrid";
import ColumnDef from "./components/options";
import { setCookie } from "../../models/cookie";
import { g_CLASS_INDEX } from "../../configs/app.config";

// LicenseManager.setLicenseKey(
//   "SHI_UK_on_behalf_of_Lenovo_Sweden_MultiApp_1Devs6_November_2019__MTU3Mjk5ODQwMDAwMA==e27a8fba6b8b1b40e95ee08e9e0db2cb"
// );
const TableMarketWatchTest = () => {
  // tinh width
  const gridRef = useRef<any>();
  const pinnedRowsRef = useRef<any[]>([]);

  const [columnDefs] = ColumnDef(gridRef, pinnedRowsRef);
  const dispatch = useAppDispatch();
  // rest sort
  //setRowData
  const { ListDataTable, DataPined, RowPined, keyActiveMan } = useAppSelector(
    (state) => state.tableTest
  );
  // pinned
  const pinned = useAppSelector((state) => state.categories.row);
  // call data
  const HanDelCate = useCallback(async () => {
    let result = await dispatch(fetchCategoryAsync());
    if (result?.payload?.Data[0]?.List) {
      let data = {
        Floor: "danh-muc",
        Query: result?.payload?.Data[0]?.List,
        RowPined: result?.payload?.Data[0]?.Row,
      };
      await handelGetData(data);
    } else {
      let data = {
        Floor: "HSX",
        Query: "s=quote&l=All",
        RowPined: null,
        KeyMenuChildren: null,
      };
      let newCookie = {
        tab: "VNI",
        codeList: "",
      };
      localStorage.setItem("activePriceboardTabMenu", "VNI");
      setCookie(newCookie);
      await handelGetData(data);
    }
  }, [dispatch]);
  const handelGetData = useCallback(
    (Data: any) => {
      dispatch(getDataTable(Data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (keyActiveMan === 0) {
      HanDelCate();
    }
  }, [dispatch, HanDelCate]);
  useEffect(() => {
    const socketHSX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=l4Qv5el2qo7nNiXubQ1oHGbFB%2F4w1UNE4vpgPXPs5nz6VP7b6bGYnMwB2aivGfMOUNZ%2F0QwrXmR%2BwkqRkEukXGYDdn8iKHzVZ%2BIiwFO2A1nxyh0%2FCdX3rc3omFIBjraz&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=5"
    );
    const socketHNX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=JWiUHUXRVLCXtTY7Na0DSx2vODWGuDSFrc6Da7FVAcRg9EYCUqCkDYfa3bsaKn305erm6aBpsrUmoFZ70viczLA1hDqUzrrqmuaZWu0UZDyUzynPYy0gGJu4gHM7dZVg&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=1"
    );
    socketHSX.onopen = () => {
      //console.log("WebSocket connection established.");
    };
    socketHNX.onopen = () => {
      //console.log("WebSocket connection established.");
    };
    socketHSX.onmessage = (event) => {
      updateQuote(event.data);
      // console.log(gridOptions.api)
      // gridOptions.api.setRowData(event.data);
    };

    socketHNX.onmessage = (event) => {
      // updateQuote(event.data)
      updateQuote(event.data);
      // setDataHNX(event.data);
    };
    socketHSX.onclose = () => {
      //console.log("WebSocket connection closed.");
    };
    socketHNX.onclose = () => {
      // console.log("WebSocket connection closed.");
    };
    return () => {
      socketHSX.close();
      socketHNX.close();
    };
  }, []);
  // useEffect(() => {
  //   const socketHNX = new WebSocket(
  //     "wss://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=JWiUHUXRVLCXtTY7Na0DSx2vODWGuDSFrc6Da7FVAcRg9EYCUqCkDYfa3bsaKn305erm6aBpsrUmoFZ70viczLA1hDqUzrrqmuaZWu0UZDyUzynPYy0gGJu4gHM7dZVg&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=1"
  //   );
  //   socketHNX.onopen = () => {
  //     //console.log("WebSocket connection established.");
  //   };
  //   socketHNX.onmessage = (event) => {
  //     // updateQuote(event.data)
  //     updateQuote(event.data);
  //     // setDataHNX(event.data);
  //   };
  //   socketHNX.onclose = () => {
  //     // console.log("WebSocket connection closed.");
  //   };
  //   return () => {
  //     socketHNX.close();
  //   };
  // }, []);
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
          // console.log("dataM",dataM)
        }
      }
    } else {
      // console.log(dataHNXRealTime)
    }
  };
  const updateTableHNX = (dataHNX: any) => {
    var vTextClass = "",
      vImageClass = "",
      vName = "",
      vStrs = "";
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
      } else {
        //tạo biến tdIndex lấy element
        const tdIndexMenu = document.getElementById(`${dataHNX[0]}`);
        // lay gia trị đằng sau
        vStrs = dataHNX[0].split("_");

        var vIDImage = dataHNX[0].substring(0, dataHNX[0].indexOf("_"));
        const vCLassImage = document.getElementById(`${vIDImage}_Image`);
        const vCLassIndex = document.getElementById(`${vIDImage}_3`);
        //HSX
        // const vCLassImageHSX = document.getElementById(`${vIDImage}_Image`);
        const vCLassIndexHSX = document.getElementById(
          `${vIDImage}_IndexValue`
        );
        const vCLassPT = document.getElementById(
          `${vIDImage}_6`
        )?.parentElement;
        const vCLassPTHSX = document.getElementById(
          `${vIDImage}_ChangePercent`
        )?.parentElement;
        /// check có tdIndex để bắt đầu add giá trị vào
        if (tdIndexMenu) {
          // neu = 5 thì update màu cho image và PT
          if (vStrs[1] === "5") {
            var v = parseFloat(dataHNX[1]);
            if (v === 0) {
              // = tham chieu, vang
              vTextClass = g_CLASS_INDEX[0][0];
              vImageClass = g_CLASS_INDEX[0][1];
            }
            if (v > 0) {
              // tang, xanh
              vTextClass = g_CLASS_INDEX[1][0];
              vImageClass = g_CLASS_INDEX[1][1];
            }
            if (v < 0) {
              // giam, do
              vTextClass = g_CLASS_INDEX[2][0];
              vImageClass = g_CLASS_INDEX[2][1];
            }
            if (vCLassImage) {
              if (vImageClass) {
                vCLassImage.className = vImageClass;
                // console.log(vCLassImage,vTextClass)
              }
            }
            if (vCLassIndex) {
              if (vTextClass) {
                vCLassIndex.className = vTextClass + " px-0.5";

                // console.log(vCLassIndex,vTextClass)
                //vCLassIndex.classList.add(vTextClass);
              }
            }
            if (vCLassPT) {
              if (vTextClass) {
                vCLassPT.className = vTextClass;
                // console.log(vCLassPT,vTextClass)
                //vCLassIndex.classList.add(vTextClass);
              }
            }
          }
          //hsx
          if (vStrs[1] === "ChangePercent") {
            var v = parseFloat(dataHNX[1]);
            if (v === 0) {
              // = tham chieu, vang
              vTextClass = g_CLASS_INDEX[0][0];
              vImageClass = g_CLASS_INDEX[0][1];
            }
            if (v > 0) {
              // tang, xanh
              vTextClass = g_CLASS_INDEX[1][0];
              vImageClass = g_CLASS_INDEX[1][1];
            }
            if (v < 0) {
              // giam, do
              vTextClass = g_CLASS_INDEX[2][0];
              vImageClass = g_CLASS_INDEX[2][1];
            }
            if (vCLassIndexHSX) {
              if (vTextClass) {
                vCLassIndexHSX.className = vTextClass + " px-0.5";

                // console.log(vCLassIndex,vTextClass)
                //vCLassIndex.classList.add(vTextClass);
              }
            }
            if (vCLassImage) {
              if (vImageClass) {
                vCLassImage.className = vImageClass;
                // console.log(vCLassImage,vTextClass)
              }
            }
            if (vCLassPTHSX) {
              if (vTextClass) {
                vCLassPTHSX.className = vTextClass;
                // console.log(vCLassPT,vTextClass)
                //vCLassIndex.classList.add(vTextClass);
              }
            }
          }
          // check trạng thái thị trường HNX
          if (fStatusMarketHNX(dataHNX[1]) !== "") {
            tdIndexMenu.innerHTML = fStatusMarketHNX(dataHNX[1]);
            tdIndexMenu.style.backgroundColor = "#888888";
            arrayColor.map((arrayColorText: string) => {
              tdIndexMenu.classList.remove(arrayColorText);
            });
            setTimeout(function () {
              tdIndexMenu.style.backgroundColor = "";
            }, 500);
          }
          // check thị trường UPCOM
          else if (fStatusMarketUPCOM(dataHNX[1]) !== "") {
            tdIndexMenu.innerHTML = fStatusMarketUPCOM(dataHNX[1]);
            tdIndexMenu.style.backgroundColor = "#888888";
            arrayColor.map((arrayColorText: string) => {
              tdIndexMenu.classList.remove(arrayColorText);
            });
            setTimeout(function () {
              tdIndexMenu.style.backgroundColor = "";
            }, 500);
          } else {
            tdIndexMenu.innerHTML = `${dataHNX[1]}`;
            tdIndexMenu.style.backgroundColor = "#888888";
            arrayColor.map((arrayColorText: string) => {
              tdIndexMenu.classList.remove(arrayColorText);
            });
            //tdIndexMenu.style.color = colorTextMenu(dataHNX[1])
            tdIndexMenu.classList.add(colorTextMenu(dataHNX[1]));
            //valuePT?.classList.add(textColor)
            setTimeout(function () {
              tdIndexMenu.style.backgroundColor = "";
            }, 500);
          }
        }

        //console.log(dataHNX)
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
      valueTCS.textContent = `${formatNumberMarket(arrValue)}`;
      // gán màu bg
      const test1 = valueTCS;
      const test = valueTCS.parentElement;
      if (test) {
        test1.style.backgroundColor = "#888888";
        test.style.backgroundColor = "#888888";
        setTimeout(function () {
          test.style.backgroundColor = "";
          test1.style.backgroundColor = "";
        }, 500);
      }
      // sau 0.5s xóa màu bg
    }
  };
  const containerStyle = { width: "100%", height: "100%" };
  const gridStyle = { height: "100%", width: "100%" };
  const HandleHistory = () => {
    dispatch(handleHistoryPrices("tets"));
  };
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    return () => {
      document.removeEventListener("contextmenu", () => {});
    };
  }, []);
  //  ******************************************************************
  const [option, setOntion] = useState(null);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark table__price">
        <AgGridReact
          ref={gridRef}
          suppressDragLeaveHidesColumns={true}
          suppressCellFocus={true}
          rowHeight={25}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
          }
          // overlayNoRowsTemplate={
          //     " "
          // }
          rowData={ListDataTable}
          pinnedTopRowData={DataPined}
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
