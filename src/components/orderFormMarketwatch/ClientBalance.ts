import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataClientBalance, DataStockBalance } from "../../models/modelClientBalance";
import { fetchPermission } from "../header/ProfileAccountSlice";

export const fetchClientBalence = createAsyncThunk(
  "trade/fetchClientBalance",
  async () => {
    const response  = await agent.ClientBalance.get();
    if(response.Code  === 0){
      return response.Data;
    }
    else if(response.Code  === -6789){
      window.location.replace("http://accounts3.fpts.com.vn/Login?href=eztradereact")
    }
    return null;
  }
);
export const GetStockBalance = createAsyncThunk(
  "trade/getStockBalance",
  async () => {
    const response = await agent.StockBalance.get();
    if(response.Code  === 0){
      return response.Data;
    }
    else if(response.Code  === -6789){
      window.location.replace("http://accounts3.fpts.com.vn/Login?href=eztradereact")
    }
    return null;
  }
);
export const GetStockBalanceMarpro= createAsyncThunk(
  "trade/getStockBalanceMarpro",
  async () => {
    const response = await agent.StockBalanceMarpro.get();
    if(response.Code  === 0){
      return response.Data;
    }
    else if(response.Code  === -6789){
      window.location.replace("http://accounts3.fpts.com.vn/Login?href=eztradereact")
    }
    return null;
  }
);
export const clientBalanceSlice = createSlice({
  name: "fetchClientBalance",
  initialState: {
    isLoadingClientBalance: false,
    isLoadingStockBalance: false,
    isLoadingStockBalanceMarpro: false,
    ClientBalane: {} as DataClientBalance,
    StockBalane: {} as DataStockBalance,
    StockBalaneMarpro: "",
    sttAccount: {},
    statusKQ: false,
    status: "idle",
  },
  reducers: {
    getClientBalance: (state, action) => {
      state.ClientBalane = action.payload.Table;
    },
    setStatusKQ: (state,action) => {
      state.statusKQ = action.payload;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBalence.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientBalence.fulfilled, (state, action) => {
        state.isLoadingClientBalance = true;
        state.status = "success";       
        state.ClientBalane = action.payload;  
      })
      .addCase(GetStockBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetStockBalance.fulfilled, (state, action) => {
        state.isLoadingStockBalance = true;
        state.status = "success";       
        state.StockBalane = action.payload;
      })
      .addCase(GetStockBalanceMarpro.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetStockBalanceMarpro.fulfilled, (state, action) => {
        state.isLoadingStockBalanceMarpro = true;
        state.status = "success";       
        state.StockBalaneMarpro = action.payload;
      })
      .addCase(fetchPermission.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.status = "success";       
        state.sttAccount = action.payload;
      })
  },
});

export const { getClientBalance, setStatusKQ} = clientBalanceSlice.actions;

export default clientBalanceSlice;
