import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { DataTable, DataGDTT } from "../../models/modelTableHNX";
import agent from "../../api/agent";
import { TableParams } from "../../models/modelLinkTable";
import { RootState } from "../../store/configureStore";
// import { RowData } from "../../models/tableMarketwatch";
import { tinhGiaTC } from "../../utils/util";
import { RowData } from "../../models/tableMarketwatch";

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
}
type params = {
  Floor: string;
  Query: string;
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
          product: {
            DataBi,
            DataPt: DataPt,
          },
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
        var arr_names: DataTable[] = new Array(arrS.length);
        for (let i = 0; i < DataHSX.length; i++) {
          const cSym = DataHSX[i]?.Info[0][1]; // mã ck
          if (arrS.includes(cSym)) {
            arr_names[arrS.indexOf(cSym)] = DataHSX[i];
          }
        }

        for (let i = 0; i < DataHNX.length; i++) {
          const cSym = DataHNX[i]?.RowID; // mã ck
          if (arrS.includes(cSym)) {
            arr_names[arrS.indexOf(cSym)] = DataHNX[i];
          }
        }
        DataHNX?.map((obj: DataTable) =>
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
          product: arr_names,
        };

        return data;
      } else {
        const result = await agent.ListDataTable.list(Param.Floor, Param.Query);
        let data = {
          index: 0,
          floor: "MAIN",
          NameFloor: Param.Floor,
          product: result,
        };

        return data;
      }
    } catch (error) {
      console.log("lỗi table silce", error);
    }
  }
);

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
    NameFloor: "",
    productParams: initParams(),
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDataTable.pending, (state, action) => {
        state.productsLoaded = false;
        state.status = "loading";
      })
      .addCase(getDataTable.fulfilled, (state, action) => {
        state.productsLoaded = true;
        state.status = "idle";
        let data = action.payload;
        let dataTable = data?.product;

        if (data?.index === 0) {
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
              Chenhlech1: `${infoArray[13]} | ${tinhGiaTC(infoArray[1], infoArray[11])}`,
              PhanTram: tinhGiaTC(infoArray[1], infoArray[11]),
              RowID: element.RowID,
              isPined: false,
            };
            return mergedObject;
          });
          // console.log(mergedArray);
          if (data.NameFloor === "HNX") {
            // data?.product.map((obj:DataTable) =>
            //       obj.Info?.sort((a: any, b: any) => {
            //         const indexA = Number(a[0]);
            //         const indexB = Number(b[0]);
            //         if (indexA < indexB) {
            //           return -1;
            //         }
            //         if (indexA > indexB) {
            //           return 1;
            //         }
            //         return 0;
            //       }) )
            state.floor = "MAIN";
            state.ListDataTable = mergedArray;
            state.NameFloor = data?.NameFloor;
          } else {
            state.floor = "MAIN";
            state.ListDataTable = mergedArray;
            state.NameFloor = data?.NameFloor;
          }
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
        console.log("vood aydcu9sachu");
      });
  },
});

export default tableTestSlice;
export const productSelectors = dataTableAdapter.getSelectors(
  (state: RootState) => state.table
);
export const { setProductParams } = tableTestSlice.actions;
