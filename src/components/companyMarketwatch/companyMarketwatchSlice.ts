import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Root } from "../../models/root";
export const fetchCompanyAsync = createAsyncThunk<Root>(
    "table/fecthCompany",
    async () => {
        const res = await agent.Company.get();       
        return res;
    }
);
export const companySlice = createSlice({
    name: "table",
    initialState:{
        productsLoaded: false,
        data: {},
        status: "oke",
    },

    reducers: {
        getDataSuccess: (state, action: PayloadAction<{}>) => {
            state.data = action.payload;
            state.status = "idle";
          },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchCompanyAsync.pending, (state, action) => {
            state.productsLoaded = false;
            //console.log(action.payload);
            state.status = "loading";
        })
            .addCase(fetchCompanyAsync.fulfilled, (state, action) => {
                state.productsLoaded = true;
                state.data = action.payload;
                const result = JSON.stringify(action.payload.Data)
                localStorage.setItem("CacheSI", result);
                state.status = "oke";
            })
            .addCase(fetchCompanyAsync.rejected, (state, action) => {
                state.productsLoaded = true;
                state.status = "";
            })

          
    },

});
export default companySlice;