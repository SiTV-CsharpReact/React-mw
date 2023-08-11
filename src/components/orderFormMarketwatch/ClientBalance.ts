import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataClientBalance } from "../../models/modelClientBalance";

export const fetchClientBalence = createAsyncThunk(
  "trade/fetchClientBalance",
  async () => {
    const responseReport =await agent.ClientBalance.get();
    console.log(responseReport)
    if(responseReport.Code  === 0){
      return responseReport.Data;
    }
    return null;
  }
);

export const clientBalenceSlice = createSlice({
  name: "fetchClientBalence",
  initialState: {
    isLoadingReport: false,
    ClientBalane: {} as DataClientBalance,
    statusReport: "idle",
  },
  reducers: {
    getClientBalance: (state, action) => {
      state.ClientBalane = action.payload.Table;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBalence.pending, (state) => {
        state.statusReport = "loading";
      })
      .addCase(fetchClientBalence.fulfilled, (state, action) => {
        state.isLoadingReport = true;
        state.statusReport = "success";       
        state.ClientBalane = action.payload;
      })
      .addCase(fetchClientBalence.rejected, (state) => {
        state.isLoadingReport = true;
        state.statusReport = "failed";
      });
  },
});

export const { getClientBalance } = clientBalenceSlice.actions;

export default clientBalenceSlice;
