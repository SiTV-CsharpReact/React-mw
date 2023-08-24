import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataClientBalance, DataStockBalance } from "../../models/modelClientBalance";
import { fetchPermission } from "../header/ProfileAccountSlice";
import { ModelDataOTP } from "../../models/modelOTP";

export const SendOrder = createAsyncThunk(
  "trade/SendOrder",
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
export const SendOrder_Marpro = createAsyncThunk(
  "trade/SendOrder_Marpro",
  async (data:any) => {
    const response = await agent.SendOrder_Marpro.post(data);
    // console.log(response)
    // if(response.Code  === 0){
    //   return response.Data;
    // }
    // else if(response.Code  === -6789){
    //   window.location.replace("http://accounts3.fpts.com.vn/Login?href=eztradereact")
    // }
    return response;
  }
);
export const SendOrder_Margin = createAsyncThunk(
  "trade/SendOrder_Margin",
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
export const getOTP = createAsyncThunk(
  "trade/getOTP",
  async () => {
    const response = await agent.GetOTP.get();
    // if(response.Code  === 0){
    //   return response.Data;
    // }
    // else if(response.Code  === -6789){
    //   window.location.replace("http://accounts3.fpts.com.vn/Login?href=eztradereact")
    // }
    return response;
  }
);
export const SendOrderSlice= createSlice({
  name: "sendOrder",
  initialState: {
    isLoadingSendOrder: false,
    isLoadingSendOrderMarginPro: false,
    isLoadingSendOrderMargin: false,
    Response:{} as ModelDataOTP,
    OTP:{} as ModelDataOTP,
    formOTP:false,
    submit:false,
    status: "idle",
  },
  reducers: {
    // getClientBalance: (state, action) => {
    //   state.ClientBalane = action.payload.Table;
    // },
    setsttOrderForm: (state,action) => {
      state.submit = action.payload; 
    },
    setsttFormOTP: (state,action) => {
      state.formOTP = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SendOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SendOrder.fulfilled, (state, action) => {
        state.isLoadingSendOrder = true;
        state.status = "success";       
        state.Response = action.payload;  
      })
      .addCase(SendOrder_Marpro.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SendOrder_Marpro.fulfilled, (state, action) => {
        state.isLoadingSendOrderMarginPro = true;
        state.status = "success";       
        state.Response = action.payload;
      })
      .addCase(SendOrder_Margin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SendOrder_Margin.fulfilled, (state, action) => {
        state.isLoadingSendOrderMargin = true;
        state.status = "success";       
        state.Response = action.payload;
      })
      .addCase(getOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOTP.fulfilled, (state, action) => {
        state.isLoadingSendOrderMargin = true;
        state.status = "success";       
        state.OTP = action.payload;
      })
  },
});

export const { setsttOrderForm,setsttFormOTP} = SendOrderSlice.actions;

export default SendOrderSlice;
