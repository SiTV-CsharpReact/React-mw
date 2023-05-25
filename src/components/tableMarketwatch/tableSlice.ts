import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { DataTable, ProductParams } from "../../models/modelTableHNX";
import agent from "../../api/agent";
import { TableParams } from "../../models/modelLinkTable";
import { RootState } from "../../store/configureStore";

interface TableState {
    productsLoaded: boolean;
    table: DataTable[];
    productParams: ProductParams;
    status: string;
}
const productsAdapter = createEntityAdapter<DataTable>();
function getAxiosParams(tableParams: TableParams) {
    const params = new URLSearchParams();
    console.log(params);
    if (tableParams.s) params.append("s", tableParams.s?.toString());
    if (tableParams.l) params.append("l", tableParams.l?.toString());
    return params;
}
const fetchTableHNXAsync = createAsyncThunk<DataTable[],void,{ state: RootState }>(
    "table/fecthTable",
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().table.productParams);
        console.log(params)
        try {
            const response = await agent.TableHNX.list(params);
            const data = await response.json();
            console.log("oke"); 
            return data; // console.log(response.items)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);
const fetchTableHSXAsync = createAsyncThunk<DataTable[],void,{ state: RootState }>(
    "table/fecthTable",
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().table.productParams);
        console.log(params)
        try {
            const response = await agent.TableHNX.list(params);
            const data = await response.json();
            console.log("oke"); 
            //thunkAPI.dispatch(setMetaData(response.metaData));
            return data; // console.log(response.items)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);
export const fetchDataTableHNXAsync = createAsyncThunk<[]>(
    "table/fecthTableHNX",
  async () => {
    const res = await agent.TableHNX.get();
    console.log(res);
    return res;
  }
);
export const fetchDataTableHSXAsync = createAsyncThunk<[]>(
    "table/fecthTableHSX",
  async () => {
    const res = await agent.TableHSX.get();
    console.log(res);
    return res;
  }
);
function initParams() {
    return {
        s: "quote",
        l: "HNXIndex",
    }; // s=quote&l=HNXIndex
}

export const tableSlice = createSlice({
    name: "table",
    initialState:{
        productsLoaded: false,
        tableHNX: [] as  DataTable[],
        tableHSX: [] as  DataTable[],
        status: "oke",
        productParams: initParams(),
    },
    reducers: {
        setProductParams: (state, action) => {
            //console.log(state.productParams);
            state.productsLoaded = false;
            //state.productParams = { ...state.productParams, ...action.payload };
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTableHNXAsync.fulfilled, (state, action) => {
            state.productsLoaded = true;
            console.log('data',action.payload);
            //productsAdapter.setAll(state, action.payload);
            state.tableHNX = action.payload;
            state.status = "idle";
        })
        .addCase(fetchDataTableHNXAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchDataTableHNXAsync.fulfilled, (state, action) => {
            state.productsLoaded = true;
            console.log(action.payload);
            //productsAdapter.setAll(state, action.payload);
            state.tableHNX = action.payload;
            state.status = "idle";
        })
        .addCase(fetchDataTableHSXAsync.fulfilled, (state, action) => {
            state.productsLoaded = true;
            console.log(action.payload);
            //productsAdapter.setAll(state, action.payload);
            state.tableHSX = action.payload;
            state.status = "idle";
        })
    },
});

export default tableSlice;
// export const productSelectors = productsAdapter.getSelectors(
//     (state: RootState) => state.table
// );

//console.log(productSelectors);
//export const { setProductParams } = tableSlice.actions;
// export const { setProductParams } = tableSlice.actions;