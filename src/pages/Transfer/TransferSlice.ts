import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transfeTemPlateType, hometransferds } from "./models/transferModels";
import agent from "../../api/agent";

export const getDataTemplate = createAsyncThunk(
  "Transfer_template",
  async () => {
    try {
      const data = await agent.transfer.getdataTempalte();
      return data;
    } catch (e) {}
  }
);
export const getDataHomeTransfer = createAsyncThunk(
  "Transfer_dataHomeTransfer",
  async () => {
    try {
      const data = await agent.transfer.hometransferds();
      return data;
    } catch (error) {}
  }
);
type abc = {
  dataHomeTransfer: hometransferds;
};
const TransferSlice = createSlice({
  name: "Transfer",
  initialState: {
    dataTemPlate: [] as transfeTemPlateType[],
    dataHomeTransfer: {
      ACLIENTCODE: "",
      ACASHDEPOSITED: "",
      ALEDGERBALANCE:"" ,
      ACASHADVANCE: "",
      AADHOCCASH: 0,
      AMARGINPRO: 0,
      ACASHTRADING: 0,
      ACASHMARGIN: 0,
      ACASHUSED: 0,
      ACASHFEE: 0,
      ACASHTRANSFER: 0,
      ADEBT: "",
      AFSAVING: 0,
      TIENMAT: 10070579864,
      AVAIL_TRADINGCASH: 10152404989,
      AVAIL_STOCKVAL: 81825125,
      AVAIL_TRANSFER: 10152404989,
      REMAININGQUOTA: 13070579864,
      AVAIL_PLK: 10070580001,
      AVAIL_FSAVING: 10070579864,
      AMARPRODEBT: 0,
      ACASHHOLDINGBUY: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDataTemplate.pending, (state:any) => {})
      .addCase(getDataTemplate.fulfilled, (state, action) => {
        state.dataTemPlate = action.payload;
      })
      .addCase(getDataTemplate.rejected, (state) => {})
      .addCase(getDataHomeTransfer.pending, (state) => {})
      .addCase(getDataHomeTransfer.fulfilled, (state, action) => {
        state.dataHomeTransfer = action.payload;
      })
      .addCase(getDataHomeTransfer.rejected, (state) => {});
  },
});
export default TransferSlice;
