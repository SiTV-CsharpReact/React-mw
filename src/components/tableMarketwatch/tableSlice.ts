import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { DataTable } from "../../models/modelTableHNX";
import agent from "../../api/agent";
import { TableParams } from "../../models/modelLinkTable";
import { RootState } from "../../store/configureStore";

interface TableState {
    productsLoaded: boolean;
    tableHNX: DataTable[];
    tableHSX: DataTable[];
    productParams: TableParams;
    status: string;
}
const dataTableAdapter = createEntityAdapter<DataTable>({
    selectId: (dataTable) => dataTable.RowID || '', // Chỉ định trường khóa
  });
  const dataTableHSXAdapter = createEntityAdapter<DataTable>({
    selectId: (dataTable) => dataTable.RowID || '', // Chỉ định trường khóa
  });
export const fetchTableHNXAsync = createAsyncThunk<
  DataTable[],
  string,
  { state: RootState }
>(
  "table/fetchTableHNXAsync",
  async (params, thunkAPI) => {
    const urlParams = new URLSearchParams();
    urlParams.append("s", "quote");
    urlParams.append("l", params);
    try {
      const responseHNX = await agent.TableHNX.list(urlParams);
    
      console.log(responseHNX)
      return responseHNX;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchTableHSXAsync = createAsyncThunk<
  DataTable[],
  string,
  { state: RootState }
>(
  "table/fetchTableHSXAsync",
  async (params, thunkAPI) => {
    const urlParams = new URLSearchParams();
    urlParams.append("s", "quote");
    urlParams.append("l", params);
    try {
      const responseHNX = await agent.TableHSX.list(urlParams);
    
      console.log(responseHNX)
      return responseHNX;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


function initParams() {
    return {
        s: "quote",
        l: "HNXIndex",
    };
}

export const tableSlice = createSlice({
    name: "table",
    initialState:dataTableAdapter.getInitialState<TableState>({
        productsLoaded: false,
        tableHNX: [] as  DataTable[],
        tableHSX: [] as  DataTable[],
        status: "idle",
        productParams: initParams(),
    }),
    reducers: {
        setProductParams: (state, action) => {
            console.log(action.payload)
            //console.log(state.productParams);
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTableHNXAsync.pending, (state) => {  
            state.productsLoaded = false;
            state.status = "loading";
          })
        .addCase(fetchTableHNXAsync.fulfilled, (state, action) => {
            const dataTableHNX = action.payload;
            if(dataTableHNX.length>0){
                // const dataT = ...dataTableHNX;
                dataTableHNX.map((obj:DataTable) =>
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
              }
        
              dataTableAdapter.setAll(state, dataTableHNX);
            console.log(dataTableAdapter)

            state.productsLoaded = true;
            //state.tableHNX = action.payload;
            state.status = "idle";
          })
          .addCase(fetchTableHNXAsync.rejected, (state, action) => {
            console.log("Fetch rejected:", action.error); // Log the rejection error for debugging
            state.productsLoaded = false;
            state.status = "error";
          })
          .addCase(fetchTableHSXAsync.fulfilled, (state, action) => {
              dataTableHSXAdapter.setAll(state, action.payload);
            state.productsLoaded = true;
            // state.tableHNX = action.payload;
            state.status = "idle";
          })
    },
});

export default tableSlice;
export const productSelectors = dataTableAdapter.getSelectors((state: RootState) =>state.table)
export const productHSXSelectors = dataTableHSXAdapter.getSelectors((state: RootState) =>state.table)
export const {setProductParams} = tableSlice.actions;
