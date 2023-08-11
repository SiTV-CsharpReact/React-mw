import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataClientBalance } from "../../models/modelClientBalance";

export const fetchProfileAccount = createAsyncThunk(
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
    isLoading: false,
    ProfileAccount : {} as DataClientBalance,
    status: "idle",
  },
  reducers: {
    getClientBalance: (state, action) => {
      state.ProfileAccount  = action.payload.Table;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileAccount.fulfilled, (state, action) => {
        state.isLoading = true;
        state.status = "success";       
        state.ProfileAccount  = action.payload;
      })
      .addCase(fetchProfileAccount.rejected, (state) => {
        state.isLoading = true;
        state.status = "failed";
      });
  },
});

export const { getClientBalance } = clientBalenceSlice.actions;

export default clientBalenceSlice;
