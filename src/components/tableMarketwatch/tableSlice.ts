import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";

import { DataTable, ProductParams } from "../../models/modelTableHNX";

import agent from "../../api/agent";

import axios from "axios";

import { TableParams } from "../../models/modelLinkTable";

import { RootState } from "../../store/configureStore";

interface TableState {
    productsLoaded: boolean;
    table: {};
    productParams: TableParams;
    status: string; //metaData:MetaData | null;
}
const productsAdapter = createEntityAdapter<DataTable>();
function getAxiosParams(tableParams: TableParams) {
    const params = new URLSearchParams();

    console.log(params);

    if (tableParams.s) params.append("s", tableParams.s?.toString());

    if (tableParams.l) params.append("l", tableParams.l?.toString());

    return params;
}
const fetchTableAsync = createAsyncThunk<DataTable[],void,{ state: RootState }>(
    "table/fecthTable",
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().table.productParams);
        console.log(params)
        try {
            const response = await agent.Table.list(params);
            const data = await response.json();
            console.log("oke"); //thunkAPI.dispatch(setMetaData(response.metaData));
            return data; // console.log(response.items)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const fetchTableHNXAsync = createAsyncThunk<[]>(
    "table/fecthTableHNX",
    async () => {
        const res = await fetch('http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNXIndex');
      
        const data = await res.json();
        console.log(data)
        return data;
    }
);
export const fetchTableHNX30Async = createAsyncThunk<[]>(
    "table/fecthTableHN30",
    async () => {
        const res = await fetch('http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNX30');
      
        const data = await res.json();
        console.log(data)
        return data;
    }
);
export const fetchTableBONDAsync = createAsyncThunk<[]>(
    "table/fecthTableBOND",
    async () => {
        const res = await fetch('http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=BOND');
      
        const data = await res.json();
        console.log(data)
        return data;
    }
);
export const fetchStatusAsync = createAsyncThunk<[]>(
    "table/fecthStatusMarket",
    async () => {
        const res = await fetch('http://marketstream.fpts.com.vn/hsx/data.ashx?s=index');
      
        const data = await res.json();
        console.log(data)
        return data;
    }
);
export const fetchTableHSXAsync = createAsyncThunk<[]>(
    "table/fecthTableHSX",
    async () => {
        const res = await fetch('https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=All');
        const data = await res.json();
        console.log(data)
        return data;
    }
);
export const fetchCompanyAsync = createAsyncThunk<[]>(
    "table/fecthCompany",
    async () => {
        const res = await fetch('http://localhost:8430/api/stock/v1/cache/stock_info_cn/eztrade?code=ALL');
        const data = await res.json();
        console.log(data)
        return data;
        // const res = await agent.Company.get();
   
        // // const data = await res.json();
        // console.log(res)
        // return res;
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
        table: [],
        status: "oke",
        productParams: initParams(),
    },

    reducers: {
        setProductParams: (state, action) => {
            //console.log(state.productParams);
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTableHNXAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTableHNXAsync.fulfilled, (state, action) => {
                state.productsLoaded = true;
                console.log(action.payload);
                //productsAdapter.setAll(state, action.payload);
                state.table = action.payload;
                state.status = "idle";
            })
            .addCase(fetchTableHNX30Async.fulfilled, (state, action) => {
                state.productsLoaded = true;
                console.log(action.payload);
                //productsAdapter.setAll(state, action.payload);
                state.table = action.payload;
                state.status = "idle";
            })
            .addCase(fetchTableBONDAsync.fulfilled, (state, action) => {
                state.productsLoaded = true;
                console.log(action.payload);
                //productsAdapter.setAll(state, action.payload);
                state.table = action.payload;
                state.status = "idle";
            })
          
            // .addCase(fetchTableAsync.fulfilled, (state, action) => {
            //     state.productsLoaded = true;
            //     console.log(action.payload);
            //     //productsAdapter.setAll(state, action.payload);
            //     state.table = action.payload;
            //     state.status = "idle";
            // })
            .addCase(fetchStatusAsync.fulfilled, (state, action) => {
                state.productsLoaded = true;
                console.log(action.payload);
                //productsAdapter.setAll(state, action.payload);
                state.table = action.payload;
                state.status = "idle";
            })
            .addCase(fetchTableHSXAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTableHSXAsync.fulfilled, (state, action) => {
                state.productsLoaded = true;
                console.log(action.payload);
                //productsAdapter.setAll(state, action.payload);
                state.table = action.payload;
                state.status = "idle";
            })
            // .addCase(fetchCompanyAsync.fulfilled, (state, action) => {
            //     state.productsLoaded = true;
            //     // console.log(action.payload);
            //     //productsAdapter.setAll(state, action.payload);
            //     state.table = action.payload;
            //     state.status = "idle";
            // })
    },
});

// export const productSelectors = productsAdapter.getSelectors(
//     (state: RootState) => state.table
// );

//console.log(productSelectors);
export default tableSlice;
//export const { setProductParams } = tableSlice.actions;
// export const { setProductParams } = tableSlice.actions;