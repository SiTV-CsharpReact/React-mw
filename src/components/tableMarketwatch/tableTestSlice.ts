import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { DataTable, DataGDTT ,dataCK } from "../../models/modelTableHNX";
import agent from "../../api/agent";
import { TableParams } from "../../models/modelLinkTable";
import { RootState } from "../../store/configureStore";
// import { RowData } from "../../models/tableMarketwatch";
import { tinhGiaTC } from "../../utils/util";
import { RowData } from "../../models/tableMarketwatch";
import { getCookie } from "../../models/cookie";
import { VARIBLE_ACTICON_TYPE } from "./helper/varible";

interface TableState {
  productsLoaded: boolean;
  ListDataTable: DataTable[];
  productParams: TableParams;
  status: string;
  index: number;
  floor: string;
  NameFloor: string;
  DataPt: DataTable[];
  DataBi: DataGDTT[];
  RowPined: any;
  DataPined: any[];
  KeyMenuChildren?: any;
  keyActiveMan: number;
  dataTableThongkeIndex: any[];
  loadingTableThongke: number;
  dataTableThongkePrice: any[];
  paginationPageTbTKIndex: number;
  paginationPageTbTKPrice: number;
  paginationPageTbTKOrderLenh: number;
  paginationPageTbTKKhopLenh: number;
  paginationPageTbTKTH: number;
  dataTableThongkeOrderLenh: any[];

  dataTableThongkeKhopLenh: any[];

  dataTableThongkeTH: any[];
  stockCode: string;
  keyMenu: string;
  nameMenu: string;
  floorMenu: string;
  dataHNX :dataCK[];
  dataHSX :dataCK[];
  dataUPCOM : dataCK[];
}
type params = {
  Floor: string;
  Query: string;
  RowPined: any;
  KeyMenuChildren?: any;
};
const dataTableAdapter = createEntityAdapter<DataTable>({
  selectId: (dataTable) => dataTable.RowID || "", // Chỉ định trường khóa
});

export const getDataTable = createAsyncThunk(
  "table/getDataTable",
  async (Param: params) => {
    try {
      if (Param.Query === "thoa-thuan-hsx") {
        const DataBi = await agent.dataGDTTtable.listBi(Param.Floor);
        const DataPt = await agent.dataGDTTtable.listPt(Param.Floor);
        let data = {
          index: 1,
          floor: "GDTT",
          NameFloor: Param.Floor,
          RowPined: Param.RowPined,
          product: {
            DataBi,
            DataPt: DataPt,
          },
          KeyMenuChildren: null,
        };

        return data;
      } else if (Param.Floor === "danh-muc") {
        const DataHNX = await agent.ListDataTable.list(
          "hnx",
          `s=quote&l=${Param.Query}`
        );
        const DataHSX = await agent.ListDataTable.list(
          "hsx",
          `s=quote&l=${Param.Query}`
        );
        var arrS = Param.Query ? Param.Query.split(",") : [];
        let uniqueArrarrS = DataHSX.filter(
          (value: any, index: any, self: any) => {
            return self.findIndex((item: any) => item === value) === index;
          }
        ); // lọc các phần tử giống nhau
        //  arrS = ['FPT', 'ALT', 'FTS', 'AAV', 'ALT']
        var arr_names: DataTable[] = new Array(uniqueArrarrS.length);

        let uniqueArrDataHSX = DataHSX.filter(
          (value: any, index: any, self: any) => {
            return (
              self.findIndex((item: any) => item.RowID === value.RowID) ===
              index
            );
          }
        ); // lọc các phần tử giống nhau
        for (let i = 0; i < uniqueArrDataHSX.length; i++) {
          const cSym = uniqueArrDataHSX[i]?.Info[0][1]; // mã ck vd FPT
          if (arrS.includes(cSym)) {
            arr_names[arrS.indexOf(cSym)] = uniqueArrDataHSX[i];
          }
        }
        let uniqueArrDataHNX = DataHNX.filter(
          (value: any, index: any, self: any) => {
            return (
              self.findIndex((item: any) => item.RowID === value.RowID) ===
              index
            );
          }
        ); // lọc các phần tử giống nhau
        for (let i = 0; i < uniqueArrDataHNX.length; i++) {
          const cSym = uniqueArrDataHNX[i]?.RowID; // mã ck
          if (arrS.includes(cSym)) {
            arr_names[arrS.indexOf(cSym)] = uniqueArrDataHNX[i];
          }
        }
        uniqueArrDataHNX?.map((obj: DataTable) =>
          obj.Info?.sort((a: any, b: any) => {
            const indexA = Number(a[0]);
            const indexB = Number(b[0]);
            if (indexA < indexB) {
              return -1;
            }
            if (indexA > indexB) {
              return 1;
            }
            return 0;
          })
        );

        let data = {
          index: 0,
          floor: "MAIN",
          NameFloor: Param.Floor,
          RowPined: Param.RowPined,
          product: arr_names,
          KeyMenuChildren: null,
        };
        return data;
      } else if (Param.Floor === "TableTK") {
        const DataHNX = await agent.ListDataTable.list(
          "hnx",
          `s=quote&l=${Param.Query}`
        );
        let data = {
          index: 2,
          floor: "TableTK",
          NameFloor: Param.Floor,
          product: DataHNX,
          KeyMenuChildren: Param?.KeyMenuChildren,
          RowPined: Param.RowPined,
        };
        return data;
      } else {
        const result = await agent.ListDataTable.list(Param.Floor, Param.Query);
        let data = {
          index: 0,
          floor: "MAIN",
          NameFloor: Param.Floor,
          RowPined: Param.RowPined,
          product: result,
          KeyMenuChildren: null,
        };

        return data;
      }
    } catch (error: any) {
      console.error("error lỗi table slice ");
    }
  }
);
export const getdataTableThongKe = createAsyncThunk(
  "table_thong_ke",
  async () => {
    try {
      // mặc định call nhưng chưa biết nó để lmj
      let params = "s=bi";

      // const data = await agent.tableThongke.getdataThongke(params);
    } catch (error) {}
  }
);
export const getDataChungKhoan = createAsyncThunk("table_getdataChungkhoan", async()=>{
  try {
      const dataHNX =  await agent.tableThongke.dataHNX()
      const dataHSX =  await agent.tableThongke.dataHSX()
      const dataUPCOM = dataHNX
       const dataCK ={
        dataHNX: dataHNX.sort((a:dataCK, b:dataCK) => a.Sy.localeCompare(b.Sy)),
        dataHSX :dataHSX.sort((a:dataCK, b:dataCK) => a.Sy.localeCompare(b.Sy)),
        dataUPCOM : dataUPCOM.sort((a:dataCK, b:dataCK) => a.Sy.localeCompare(b.Sy)),
      }
      return dataCK
  } catch (error) {
    
  }
})
export const SortTableThongkeIndex = createAsyncThunk(
  "table_thongke_index",
  async (query: any) => {
    try {
      const data = await agent.tableThongke.sortThongkeIndex(query?.result);
      let result = {
        action_type: query?.action,
        data: data.Body,
        panigation: data?.Header?.PageCount,
      };
      return result;
    } catch (error) {}
  }
);
//

function initParams() {
  return {
    s: "quote",
    l: "HNXIndex",
  };
}

export const tableTestSlice = createSlice({
  name: "table",
  initialState: dataTableAdapter.getInitialState<TableState>({
    productsLoaded: false,
    ListDataTable: [] as DataTable[],
    status: "idle",
    index: 0,
    floor: "MAIN",
    DataBi: [] as DataGDTT[],
    DataPt: [] as DataTable[],
    RowPined: null,
    NameFloor: "",
    productParams: initParams(),
    DataPined: [],
    KeyMenuChildren: null,
    keyActiveMan: 0,
    dataTableThongkeIndex: [],
    dataTableThongkeTH: [],
    dataTableThongkePrice: [],
    dataTableThongkeOrderLenh: [],
    dataTableThongkeKhopLenh: [],
    loadingTableThongke: 0,
    paginationPageTbTKIndex: 0,
    paginationPageTbTKPrice: 0,
    paginationPageTbTKOrderLenh: 0,
    paginationPageTbTKKhopLenh: 0,
    paginationPageTbTKTH: 0,
    // table price thống kê
    stockCode: "",
    keyMenu: "",
    nameMenu: "",
    floorMenu: "",
    dataHNX :[] as dataCK[],
    dataHSX :[] as dataCK[],
    dataUPCOM :[] as dataCK[],
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setPinned: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    // pinde data table click pined
    addDatatPined: (state, action) => {
      let { data, RowPined } = action.payload;
      if (RowPined) {
        // danh mục
        let { isPined } = data;
        if (isPined === false) {
          state.DataPined = [...state.DataPined, { ...data, isPined: true }];
          state.ListDataTable = state.ListDataTable.filter(
            (e) => e.RowID !== data.RowID
          );
        } else {
          state.DataPined = state.DataPined.filter(
            (e) => e.RowID !== data.RowID
          );
          state.ListDataTable = [
            { ...data, isPined: false },
            ...state.ListDataTable,
          ];
        }
      } else {
        if (data.isPined === false) {
          state.DataPined = [...state.DataPined, { ...data, isPined: true }];
          state.ListDataTable = state.ListDataTable.filter(
            (e) => e.RowID !== data.RowID
          );
        } else {
          state.DataPined = state.DataPined.filter(
            (e) => e.RowID !== data.RowID
          );
          state.ListDataTable = [
            { ...data, isPined: false },
            ...state.ListDataTable,
          ];
        }
      }
    },
    // tab menu cookie
    getDataCookie: (state, action) => {
      let tab = localStorage.getItem("activePriceboardTabMenu");
      let StringCookie = { tab: tab, codeList: "" };
      const arraydata = getCookie(StringCookie); /// return array codelis
      if (arraydata) {
        //  kiểm tra có hay k
        let ArrayPiend = state.ListDataTable?.filter((e) => {
          return arraydata?.includes(e.MCK);
        }); // data ghim
        state.DataPined = ArrayPiend.map((e: any) => {
          if (e?.isPined === false) return { ...e, isPined: true };
          return e;
        });
        let tableDataCookie = state.ListDataTable?.filter((e) => {
          return arraydata?.indexOf(e.MCK) === -1;
        });
        state.ListDataTable = tableDataCookie;
      } else {
        state.ListDataTable = [...state.ListDataTable];
        state.DataPined = [...state.DataPined];
      }
    },
    //  lịch sử giá
    handleHistoryPrices: (state, action) => {
      let { stockCode, keyMenu, nameMenu, floor } = action.payload;
      state.KeyMenuChildren = 1;
      state.floor = "TableTK";
      state.stockCode = stockCode;
      state.keyMenu = keyMenu;
      state.nameMenu = nameMenu;
      state.floorMenu = floor;
    },
    HandleKeyActiveMain: (state) => {
      state.keyActiveMan = 1;
    },
    handleSetStockCode: (state) => {
      // reset lại stock code
      state.stockCode = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDataTable.pending, (state, action) => {
        state.productsLoaded = false;
        state.status = "loading";
        state.ListDataTable = [];
        state.DataPined = [];
      })
      .addCase(getDataTable.fulfilled, (state, action) => {
        state.productsLoaded = true;
        state.status = "idle";
        let data = action.payload;
        let dataTable = data?.product;
        state.RowPined = data?.RowPined;
        if (data?.index === 0) {
          state.floor = "MAIN";
          state.index = data?.index;
          const mergedArray = dataTable.map((element: any) => {
            const infoArray = element.Info.map(
              (subArray: any[]) => subArray[1]
            );
            const mergedObject: RowData = {
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
              Chenhlech1: `${infoArray[13]} | ${tinhGiaTC(
                infoArray[1],
                infoArray[11]
              )}`,
              PhanTram: tinhGiaTC(infoArray[1], infoArray[11]),
              RowID: element.RowID,
              isPined: false,
            };
            return mergedObject;
          });
          if (data?.RowPined) {
            let indexCut = data?.RowPined;
            let newdata = mergedArray ? mergedArray.splice(0, indexCut) : [];
            state.DataPined = newdata.map((e: any) => {
              return { ...e, isPined: true };
            });

            state.ListDataTable = mergedArray;
          } else {
            if (data.NameFloor === "HNX") {
              state.floor = "MAIN";
              state.ListDataTable = mergedArray;
              state.NameFloor = data?.NameFloor;
            } else {
              state.floor = "MAIN";
              state.ListDataTable = mergedArray;
              state.NameFloor = data?.NameFloor;
            }
          }
        } else if (data?.index === 2) {
          state.floor = "TableTK";
          state.KeyMenuChildren = data?.KeyMenuChildren;
          state.DataPt = data.product?.DataPt?.PUT_EXEC;
          state.DataBi = data.product?.DataBi;
          state.floor = "TableTK";
          state.NameFloor = "HSX";
        } else {
          if (data?.NameFloor === "HSX") {
            state.DataPt = data.product?.DataPt?.PUT_EXEC;
            state.DataBi = data.product?.DataBi;
            state.floor = "GDTT";
            state.NameFloor = "HSX";
          } else {
            state.DataPt = data?.product?.DataPt;
            state.DataBi = data?.product?.DataBi;
            state.floor = "GDTT";
            state.NameFloor = "HNX";
          }
        }
      })
      .addCase(getDataTable.rejected, (state, action) => {
        state.DataBi = state.DataBi;
        state.DataPt = state.DataPt;
        state.NameFloor = state.NameFloor;
        state.floor = "MAIN";
        state.productsLoaded = true;
        state.status = "idle";
        state.ListDataTable = state.ListDataTable;
      })
      // data table thống kê
      .addCase(SortTableThongkeIndex.pending, (state) => {
        state.loadingTableThongke = 1;
      })
      .addCase(SortTableThongkeIndex.fulfilled, (state, action) => {
        state.loadingTableThongke = 2;

        let data = action.payload;
        if (data?.action_type === VARIBLE_ACTICON_TYPE.ACTION_INDEX) {
          state.dataTableThongkeIndex = data?.data;
          state.paginationPageTbTKIndex = data.panigation;
        } else if (data?.action_type === VARIBLE_ACTICON_TYPE.ACTION_PRICE) {
          // giá
          state.dataTableThongkePrice = data?.data;
          state.paginationPageTbTKPrice = data.panigation;
        } else if (
          data?.action_type === VARIBLE_ACTICON_TYPE.ACTION_ORDERLENH
        ) {
          // đặt lệnh
          state.paginationPageTbTKOrderLenh = data.panigation;

          state.dataTableThongkeOrderLenh = data?.data.map((e: any) => {
            return e.Data;
          });
        } else if (data?.action_type === VARIBLE_ACTICON_TYPE.ACTION_GDKL) {
          //khớp lệnh
          state.paginationPageTbTKKhopLenh = data.panigation;
          state.dataTableThongkeKhopLenh = data?.data.map((e: any) => {
            return e.Data;
          });
        } else if (data?.action_type === VARIBLE_ACTICON_TYPE.ACTION_TH) {
          //thỏa thuận
          state.paginationPageTbTKTH = data.panigation;
          state.dataTableThongkeTH = data?.data.map((e: any) => {
            return e.Data;
          });
        }
      })
      .addCase(SortTableThongkeIndex.rejected, (state) => {
        state.loadingTableThongke = 3;
      })
      .addCase(getDataChungKhoan.pending,(state) => {})
      .addCase(getDataChungKhoan.fulfilled,(state,action) => {
          const data =  action.payload
          state.dataHSX  = data?.dataHSX
          state.dataHNX =  data?.dataHNX
          state.dataUPCOM = data?.dataUPCOM
      })
      .addCase(getDataChungKhoan.rejected,(state) => {})
  },
});

export default tableTestSlice;
export const productSelectors = dataTableAdapter.getSelectors(
  (state: RootState) => state.table
);
export const {
  setProductParams,
  addDatatPined,
  getDataCookie,
  handleHistoryPrices,
  HandleKeyActiveMain,
  handleSetStockCode,
} = tableTestSlice.actions;
