import { useRef, useState } from "react";
import { formatNumberMarket, setColorMarkettest } from "../../../utils/util";
import { RowDataIndex } from "../interface/config.tablegrid";
import { Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
// import { dispatchDataTableBuy } from "../tableBuy";
import { dispatchDataMouseEventHandler, dispatchDataMouseEventHandlerBuy, dispatchDataTable , dispatchDataTableBuy } from "../tableThunk";
import { statusChartMarketwatch } from "../../chartMarketwatch/chartMarketwatchSlice";
import { RowData } from "../../../models/tableMarketwatch";
import { CellRender } from "./CellRenderComponent";

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

const ColumnDef = (props: any, props2: any) => {
  const widthWindow = window.innerWidth;
  const dispatch = useAppDispatch();
  const { INDEX } = useAppSelector((state) => state.settingMarketwatch);

  const handleClick = (dataTable: any) => {
    // console.log("dataTable ii",dataTable)
    dispatch(dispatchDataTable(dataTable));
  };
  const handleClickR = (dataTableR: any) => {
    dispatch(dispatchDataTable(dataTableR));
  };
  const handleClickRight = (dataTableMou: any): React.MouseEventHandler<HTMLDivElement> => {
  return (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleClickR(dataTableMou);
    dispatch(dispatchDataMouseEventHandler(dataTableMou));

  };
  };
    const handleClickBuyR = (dataTable: any) => {
    // console.log("dataTable",dataTable)
    dispatch(dispatchDataTableBuy(dataTable));
  };

  const handleClickBuy = (dataTable: any) => {
    // console.log("dataTable",dataTable)
    dispatch(dispatchDataTableBuy(dataTable));
  };
    const handleClickRightBuy = (dataTableBUYR: any): React.MouseEventHandler<HTMLDivElement> => {
  return (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleClickBuyR(dataTableBUYR);
    dispatch(dispatchDataMouseEventHandlerBuy(dataTableBUYR));

  };
};

  const handleDoubleClick = (e: any, val: any) => {
    if (e.detail === 2) {
      dispatch(statusChartMarketwatch(val));
    }
  };

  // const gridRef = useRef<any>();
  // const pinnedRowsRef = useRef<any[]>([]);
  const handlePinRow = (params: any) => {
    const grid = props.current.api;
    const defaultData = props.current.props.rowData;
    const { rowPinned, rowIndex, data } = params;
    const { RowID, symbol, isPined } = data;
    let rows = props2.current;
    // console.log("co row ne", rows);
    if (rowPinned) {
      const newRows = props2.current.filter((e: any) => {
        return RowID !== e.data.RowID;
      });
      const item = rows.find((item: any) => item.data.RowID === RowID);
      const other = props2.current.filter((val: any) => val.index < item.index);
      props2.current = newRows;
      const rowsToPin = newRows.map((item: any) => item.data);
      let rowsToPins = rowsToPin
        ? rowsToPin.map((item: any) => {
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
        const newRows = props2.current.filter((e: any) => {
          return RowID !== e.data.RowID;
        });
        const item = rows.find((item: any) => item.data.RowID === RowID);
        const other = props2.current.filter(
          (val: any) => val.index < item.index
        );
        props2.current = newRows;
        const rowsToPin = newRows.map((item: any) => item.data);
        let rowsToPins = rowsToPin
          ? rowsToPin.map((item: any) => {
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
        const index = defaultData.findIndex((item: any) => item.MCK === RowID);
        rows.push({
          index,
          data,
        });
        let rowsToPins = rows.map((item: any) => item.data);
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
  const columnDefs = [
    // {
    //   headerName: "",
    //   cellClass: "ag-cell-pinning",
    //   field: "pinning",
    //   maxWidth: 19,
    //   cellRenderer: PinCell,
    //   onCellDoubleClicked: (e: any) => {
    //     const field = e.colDef.field;
    //     if (field === "pinning") {
    //       // handlePinRow(e);
    //     }
    //   },
    // },
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

        const value = params.value; // Get the value of the cell
        const rowid = params.data.RowID; // Get the

        return (
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
            />
            <span
              className="pt-1 pl-1"
              onDoubleClick={(e) => handleDoubleClick(e, value)}
            >
              {value}
            </span>
          </div>
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
      cellRenderer: CellRender,
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
      cellRenderer: CellRender,
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
      cellRenderer: CellRender,
    },
    {
      headerName: "Mua",
      headerClass: "custom-header",

      children: [
        {
          field: "KL4",
          headerName: "KL4",
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          height: 30,
          maxWidth: 100,
          hide: INDEX.cbcol4 ? false : true,
          headerClass: "custom-header",
          cellClass: "score-cell",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.KL4; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
            const value = params.value; // Get the value of the cell
            const rowid = params.data.RowID; // Get the

            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
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
            const SanT : any = params.data.San
            const TCT : any= params.data.TC
            const TranC: any = params.data.Tran
            const dataPopup = params.data
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
                  onDoubleClick={() =>
                    handleClick({ ma: params.data.MCK, price: value,SanT:SanT,TCT:TCT ,TranC:TranC ,key:"S" })
                  }
                  onContextMenu={handleClickRight({ maF: params.data.MCK, priceF: value ,SanT:SanT,TCT:TCT ,TranC:TranC,dataPopup:dataPopup })}
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
            const SanT : any = params.data.San
            const TCT : any= params.data.TC
            const TranC : any= params.data.Tran
            const dataPopup = params.data

            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
                  onDoubleClick={() =>
                    handleClick({ ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"S"})
                  }
                  onContextMenu={handleClickRight({dataPopup:dataPopup, maF: params.data.MCK, priceF: value,SanT:SanT,TCT:TCT ,TranC:TranC,})}

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
            const SanT : any = params.data.San
            const TCT : any= params.data.TC
            const TranC: any = params.data.Tran
            const dataPopup = params.data
            
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
                  onDoubleClick={() =>
                    handleClick({ ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC ,key:"S"})
                  }
                  onContextMenu={handleClickRight({dataPopup:dataPopup, maF: params.data.MCK, priceF: value ,SanT:SanT,TCT:TCT ,TranC:TranC })}

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
          cellRenderer: CellRender,
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
             const SanT : any = params.data.San
            const TCT : any= params.data.TC
            const TranC: any = params.data.Tran
            const dataPopup = params.data
            
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
                  onDoubleClick={() =>
                    handleClickBuy({ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"B" })
                  }
                  onContextMenu={handleClickRightBuy({dataPopup:dataPopup, maB: params.data.MCK, priceB: value,SanT:SanT,TCT:TCT ,TranC:TranC, })}

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
             const SanT : any = params.data.San
            const TCT : any= params.data.TC
            const TranC: any = params.data.Tran
            const dataPopup = params.data
            
            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
                  onDoubleClick={() =>
                    handleClickBuy({ ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"B" })
                  }
                  onContextMenu={handleClickRightBuy({dataPopup:dataPopup, maB: params.data.MCK, priceB: value ,SanT:SanT,TCT:TCT ,TranC:TranC,})}

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
              const SanT : any = params.data.San
            const TCT : any= params.data.TC
            const TranC: any = params.data.Tran
            const dataPopup = params.data

            return (
              <Tooltip title="Click đúp để đặt lệnh">
                <div
                  data-index={dataIndex}
                  data-comp={rowid}
                  className="cursor-pointer custom-cell"
                  onDoubleClick={() =>
                    handleClickBuy({ ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"B" })
                  }
                  onContextMenu={handleClickRightBuy({ maB: params.data.MCK, priceB: value,SanT:SanT,TCT:TCT ,TranC:TranC})}

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
        {
          field: "KL4B",
          headerName: "KL4",
          suppressMenu: true,
          width: widthWindow * 0.05,
          minWidth: 50,
          maxWidth: 100,
          hide: INDEX.cbcol20 ? false : true,
          cellClass: "score-cell ",
          headerClass: "custom-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("KL4B", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = RowDataIndex.KL4B; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
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
      cellRenderer: CellRender,
    },
    {
      field: "MOC",
      headerName: "Mở Cửa",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      hide: INDEX.cbcol22 ? false : true,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellRender,
    },
    {
      field: "CaoNhat",
      headerName: "Cao Nhất",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      hide: INDEX.cbcol23 ? false : true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellRender,
    },
    {
      field: "ThapNhat",
      headerName: "Thấp nhất",
      spanHeaderHeight: true,
      hide: INDEX.cbcol24 ? false : true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellRender,
      suppressMenu: true,
    },
    {
      field: "Trungbinh",
      headerName: "Trung bình",
      spanHeaderHeight: true,
      hide: INDEX.cbcol25 ? false : true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellRender,
      suppressMenu: true,
    },
    {
      field: "NNMua",
      headerName: "NN mua",
      spanHeaderHeight: true,
      hide: INDEX.cbcol26 ? false : true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: CellRender,
    },
    {
      field: "NNBan",
      headerName: "NN bán",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      hide: INDEX.cbcol27 ? false : true,
      width: widthWindow * 0.04,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellRenderer: CellRender,
    },
    {
      field: "RoomCL",
      headerName: "Room Còn lại ",
      spanHeaderHeight: true,
      hide: INDEX.cbcol28 ? false : true,
      width: widthWindow * 0.05,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header  tc-header",
      suppressMenu: true,
      cellRenderer: CellRender,
    },
  ];
  return [columnDefs];
};

export default ColumnDef;
