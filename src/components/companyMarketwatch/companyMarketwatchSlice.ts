import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { stat } from "fs";
import { Root } from "../../models/root";
interface TableState {
    productsLoaded: boolean;
    data: [];
    status: string; //metaData:MetaData | null;
}

export const fetchCompanyAsync = createAsyncThunk<Root>(
    "table/fecthCompany",
    async () => {
        const res = await agent.Company.get();       
        console.log(res)      
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
            console.log(action.payload);
            state.status = "loading";
        })
            .addCase(fetchCompanyAsync.fulfilled, (state, action) => {
                state.productsLoaded = true;
                state.data = action.payload;
                //console.log(action.payload)
                // const dataCompany =  action.payload?.Data;
                const result = JSON.stringify(action.payload.Data)
                //console.log(result)
                localStorage.setItem("CacheSI", result);
                
                state.status = "oke";
            })
            .addCase(fetchCompanyAsync.rejected, (state, action) => {
                state.productsLoaded = true;
                console.log(action.payload);
                state.status = "";
            })

          
    },

});

// export const productSelectors = productsAdapter.getSelectors(
//     (state: RootState) => state.table
// );

//console.log(productSelectors);

// export const { fetchCompanyAsync } = companySlice.actions;
export default companySlice;
// export const { setProductParams } = tableSlice.actions;