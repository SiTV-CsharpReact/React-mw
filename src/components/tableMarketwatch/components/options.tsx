import React,{ useRef, useState } from "react";
import { formatNumberMarket, setColorMarkettest } from "../../../utils/util";
import { RowDataIndex } from "../interface/config.tablegrid";
import { Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
// import { dispatchDataTableBuy } from "../tableBuy";
import {  dispatchDataTable, setDataOrder  } from "../orderComanSlice";
import { statusChartMarketwatch } from "../../chartMarketwatch/chartMarketwatchSlice";
import { RowData } from "../../../models/tableMarketwatch";
import { CellRender } from "./CellRenderComponent";
import { addDatatPined } from "../tableTestSlice";
import { setCookie } from "../../../models/cookie";
import CustomHeader from "../CustomHeader";
import { CellOtherColorRender } from "./CellOtherColorComponent";
import { Company } from "../../../models/root";
import { OBJECT_STATUS } from "../../../configs/app.config";
import { forEach } from "lodash";
const ColumnDef = (props: any, props2: any) => {
  const [showPrice, setShowPrice] = useState(false);
  const  [sttStockCode, setSttStockCode] = useState("")
  const handelCheckNext = () => {
    setShowPrice(!showPrice);
  };
  const widthWindow = window.innerWidth;
  const dispatch = useAppDispatch();
  const { INDEX } = useAppSelector((state) => state.settingMarketwatch);
  const {RowPined} = useAppSelector((state) => state.tableTest)
  const {dataCompanyTotal} = useAppSelector((state) => state.company)
  const handleClick = (dataTable: any) => {
    dispatch(dispatchDataTable(dataTable));
    const dataCode = dataCompanyTotal.find((item:Company) =>  item.Code ===  dataTable.ma)
    if(dataCode){
      let PriceInput = dataTable?.price
      let san = dataCode?.Exchange === 1 ?  "HSX" :"HNX"
      const data = {
        key  :dataTable?.key,
        dataOrder :{...dataCode , Exchange :san,PriceInput:PriceInput}
      }
      dispatch(setDataOrder(data))
    }
  };


  const handleDoubleClick = (e: any, val: any) => {
    if (e.detail === 2) {
      dispatch(statusChartMarketwatch({visible:true,code:val}));
    }
  };

  // const gridRef = useRef<any>();
  // const pinnedRowsRef = useRef<any[]>([]);
  const handlePinRow = (params: any) => {
    const grid = props.current.api;
    const defaultData = props.current.props.rowData;
    const { rowPinned, rowIndex, data } = params;
    // const { RowID, symbol, isPined } = data;
    let rows = props2.current;
   
    let itemss = localStorage.getItem("activePriceboardTabMenu")
    let newCookie = {
      tab : itemss,
      codeList :  data.MCK
    }
   let result =  setCookie(newCookie)
      if(result){
        dispatch(addDatatPined({RowPined,data}))
      }
  };
  function isNumeric(n:any) { return !isNaN(parseFloat(n)) && isFinite(n); }
  const columnDefs = React.useMemo(
    () => [
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
      tooltipField: 'MCK',
      tooltipComponentParams: { color: '#e5f6fd' },
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
        var txtStatus1 = '';
        var txtStatus2 = '';// hungtq
        var txtInfo = '';// hungtq
        let checkSTTStockCode = params.data.Quyen;
        var g_Language = 0
        if (checkSTTStockCode.indexOf('|') === -1) {
          checkSTTStockCode = checkSTTStockCode.split(':');
          for (var i = 0; i < OBJECT_STATUS.length; i++) {
            if (checkSTTStockCode[0] === OBJECT_STATUS[i].Status[0]) {
              // txtStatus1 = '&nbsp;' + '-' + '&nbsp;' + OBJECT_STATUS[i].Status[g_Language + 1];
              for (var j1 = 0; j1 < OBJECT_STATUS[i].Info.length; j1++) {
                if (checkSTTStockCode[1] === OBJECT_STATUS[i].Info[j1][0]) {
                  txtStatus2 = '&nbsp;' + '-' + '&nbsp;' + OBJECT_STATUS[i].Info[j1][g_Language + 1] + '.';
                  txtInfo =  (isNumeric(checkSTTStockCode[1]) ? "R" : checkSTTStockCode[1]);
                  console.log(txtStatus2,params.data.MCK);
                  console.log(txtInfo);
                  break;
                }
              }
              // break;
              console.log("oke")
            }
          }
        }
        else {
         const strn = checkSTTStockCode.split('|');
         for (var index = 0; index < strn.length; index++) {
          var data = strn[index];
           checkSTTStockCode = data.split(':');
          
          for (var ii = 0; ii < OBJECT_STATUS.length; ii++) {
            if (checkSTTStockCode[0] === OBJECT_STATUS[ii].Status[0]) {
              var txtStatus1 = '&nbsp;' + '-' + '&nbsp;' + OBJECT_STATUS[ii].Status[g_Language + 1];
              
              for (var jj = 0; jj < OBJECT_STATUS[ii].Info.length; jj++) {
                if (checkSTTStockCode[1] === OBJECT_STATUS[ii].Info[jj][0]) {
                 txtStatus2 = '&nbsp;' + '-' + '&nbsp;' + OBJECT_STATUS[ii].Info[jj][g_Language + 1] + '.';
                  txtInfo = (isNumeric(checkSTTStockCode[1]) ? "R" : checkSTTStockCode[1]);
                  //console.info('strn',strn,'checkSTTStockCode',checkSTTStockCode,'txtStatus1',txtStatus1,'txtStatus2',txtStatus2,'txtInfo',txtInfo,'OBJECT_STATUS[ii].Status[0]',OBJECT_STATUS[ii].Status[0]);
                  console.log(txtStatus2,params.data.MCK);
                  console.log(txtInfo)
                  if (checkSTTStockCode[0] === '232' || checkSTTStockCode[0] === 'BE') {
                    break;
                  }
                  // Để thoát khỏi vòng lặp trong trường hợp tìm thấy kết quả
                  // return;
                }
              }
            }
          }
        }
        
        }
        // const 
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
            <div
              className="pt-1 pl-1"
              onDoubleClick={(e) => handleDoubleClick(e, value)}
            >
              {/* {value} */}
              {checkSTTStockCode !== "" && checkSTTStockCode[0] === 'BE' || checkSTTStockCode[0] === '232' ? <span className="bg-[#808080]">{value} <sup>{txtInfo}</sup></span> : value}
              {/* {txtInfo?
              <span className="bg-[#808080]">
              {txtInfo && <sup>{txtInfo}</sup>}
              </span>
              // ? checkSTTStockCode[0] !== '232': value
              
              :""} */}
             
            </div>
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
      cellRenderer: CellOtherColorRender,
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
      cellRenderer: CellOtherColorRender,
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
      cellRenderer: CellOtherColorRender,
    },
    {
      headerName: "Mua",
      headerClass: "custom-header cell-default !cursor-default",

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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
          cellClass: "score-cell",
          cellStyle: (params: any):any => ({
            fontWeight: "",
            color: setColorMarkettest("", params),
            textAlign: "right",
          }),
          cellRenderer: (params: any) => {
            // console.log("data ne hi ", params)
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
          cellRenderer: CellOtherColorRender,
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
          cellRenderer: CellOtherColorRender
        },
        {
          field: "Chenhlech",
          headerName: "+/-",
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          maxWidth: 100,
          hide:true,
          cellClass: "score-cell tc-cell",
          headerClass: "custom-header tc-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            color: setColorMarkettest("Chenhlech", params),
            textAlign: "right",
          }),
          cellRenderer: CellOtherColorRender
        },
        {
          field: "Chenhlech1",
          sortable: true,
          setSort: true,
          progressSort: true,
          headerName: () => {
            return <CustomHeader onClick={handelCheckNext} />;
          },

         headerComponentFramework : CustomHeader,
          headerComponentParams: {
            onClick: () => {
              setShowPrice(!showPrice);
            },
            headerName : "+/-"
          },

        
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell tc-cell",
          headerClass: "custom-header tc-header",
          cellStyle: (params: any) => ({
            fontWeight: "",
            //color: setColorMarkettest("Chenhlech1", params),
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }),
          cellRenderer: (params: any) => {
            const dataIndex = params.colDef.field;
            const value = params.value;
            const [valueCT, valuePT] = value.split("|");
            return (
              <div
                data-index={dataIndex} className="cursor-pointer custom-cell">
                {showPrice && (
                  // <div style={{ color:   parseInt(valuePT) >= 0 ? "#00FF00" : "#FF0000", }}>
                       <div className="custom-cell-other" style={{ color: setColorMarkettest("Chenhlech", params) }}>
                    {formatNumberMarket(valuePT.trim())}
                  </div>
                )}
                <div className="custom-cell-other" style={{ color: setColorMarkettest("Chenhlech", params) }}>
                  {showPrice ? null : formatNumberMarket(valueCT.trim())}
                </div>
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
          cellRenderer: CellOtherColorRender
        },
      ],
    },
    {
      headerName: "Bán",
      headerClass: "custom-header cell-default !cursor-default",
      children: [
        {
          field: "G1B",
          headerName: "G1",
          suppressMenu: true,
          width: widthWindow * 0.03,
          minWidth: 50,
          maxWidth: 100,
          cellClass: "score-cell",
          headerClass: "custom-header cell-default",
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
                    handleClick({ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"M" })
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
                    handleClick({ ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"M" })
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
                    handleClick({ ma: params.data.MCK, price: value ,SanT:SanT,TCT:TCT ,TranC:TranC,key:"M" })
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
          headerClass: "custom-header cell-default",
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
          headerClass: "custom-header cell-default",
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
      cellRenderer: CellOtherColorRender,
    },
    {
      field: "MOC",
      headerName: "Mở Cửa",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      width: widthWindow * 0.03,
      maxWidth: 100,
      hide: INDEX.cbcol22 ? false : true,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellOtherColorRender,
    },
    {
      field: "CaoNhat",
      headerName: "Cao Nhất",
      cellClass: "score-cell tc-cell",
      spanHeaderHeight: true,
      hide: INDEX.cbcol23 ? false : true,
      width: widthWindow * 0.03,
      maxWidth: 100,
      headerClass: "custom-header tc-header",
      suppressMenu: true,
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellOtherColorRender,
    },
    {
      field: "ThapNhat",
      headerName: "Thấp nhất",
      spanHeaderHeight: true,
      hide: INDEX.cbcol24 ? false : true,
      width: widthWindow * 0.03,
      maxWidth: 100,
      cellClass: "score-cell tc-cell",
      headerClass: "custom-header tc-header",
      cellStyle: (params: any) => ({
        fontWeight: "",
        color: setColorMarkettest("", params),
        textAlign: "right",
      }),
      cellRenderer: CellOtherColorRender,
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
      cellRenderer: CellOtherColorRender,
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
      cellRenderer: CellOtherColorRender,
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
      cellRenderer: CellOtherColorRender,
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
      cellRenderer: CellOtherColorRender,
    },
  ], 
   [
    INDEX.cbcol20,
    INDEX.cbcol22,
    INDEX.cbcol23,
    INDEX.cbcol24,
    INDEX.cbcol25,
    INDEX.cbcol26,
    INDEX.cbcol27,
    INDEX.cbcol28,
    INDEX.cbcol4,
    handleClick,
    handleDoubleClick,
    handlePinRow,
    widthWindow,
  ]
);
  return [columnDefs];
};

export default ColumnDef;
