import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataTable, ProductParams } from "../../models/modelTableHNX";
import agent from "../../api/agent";
import axios from "axios";
import { TableParams } from "../../models/modelLinkTable";
import { RootState } from "../../store/configureStore";

interface TableState {
    productsLoaded:boolean;
   table : [],
   productParams:TableParams;
   status:string;
     //metaData:MetaData | null;
}
// const initialState: TableState ={
//     table:[],
    
// }
interface CatalogState{
    // productsLoaded:boolean;
    // filtersLoaded:boolean;
    // status:string;
    // brands:string[];
    // types:string[];
    productParams:TableParams;
    //metaData:MetaData | null;
}
function getAxiosParams(tableParams:TableParams){
    const params = new URLSearchParams();
     console.log(params);
     if(tableParams.s)  params.append('searchTerm', tableParams.s?.toString());
     if(tableParams.l)params.append('brands', tableParams.l?.toString());
    
     return params;
    }
// export const dataTableAsync = createAsyncThunk(
//     'http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNXIndex',
//     async ()=>{
//         const params = ("http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNXIndex");
//         var paramsString = "?user=trieu-quan-su&place=quan-net&place=rung";
//         try{
//             const response = await agent.Table.list.getAxiosParams({paramsString});
//             return response.items;
//         }
//     }
// )
export const fetchBasketAsync = createAsyncThunk<TableState,void,{state: RootState}>(
    '',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().table.productParams);
        try {
            const response = await agent.Table.list(params);
            //thunkAPI.dispatch(setMetaData(response.metaData));
            return response;
            // console.log(response.items)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)
function initParams(){
    return{
        s:'quote',
        l:'HNXIndex',
    }
    // s=quote&l=HNXIndex
}
export const tableSlice = createSlice({
        name:'table',
        initialState:{
            productsLoaded:false,
            table:[] ,
            productParams:initParams(),
            status:"pendingFetchProducts"
        },
        reducers:{
            setProductParams: (state, action) => {
                state.productsLoaded = false;
                state.productParams = {...state.productParams, ...action.payload,};
                state.table = action.payload;
            },
        },
        extraReducers: (builder => {
            builder.addCase(fetchBasketAsync.pending, (state) => {
                console.log(state);
                state.status = 'pendingFetchProducts';
            });
        })
})
export const {setProductParams} = tableSlice.actions;