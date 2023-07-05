import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { hisOrder, ReportData ,hometransferds} from "./models/models";
import { elements } from "chart.js";

export const getdata = createAsyncThunk("reportSlice_getdata", async () => {
  try {
    let data = await agent.report.get();
    const  ArrayAlike = (data:any)=> {
        let mang_moi:any = [];
      
        for (let i = 0; i < data.length; i++) {
          let daTonTai = false;

          for (let j = 0; j < mang_moi.length; j++) {
            if (mang_moi[j][0].ATRADEDATE === data[i].ATRADEDATE) {
              mang_moi[j].push(data[i]);
              daTonTai = true;
              break;
            }
          }
          if (!daTonTai) {
            mang_moi.push([data[i]]);
          }
        }
        return mang_moi;
      }
      let mang_moi = ArrayAlike(data);
      return mang_moi;
  } catch (e) {}
});
export const getDataHisOrder = createAsyncThunk(
  "reportSlice_getdataHisOrder",
  async () => {
    try {
      const data = await agent.report.getHisOrder();
      return data;
    } catch (e) {}
  }
);
export const getDataHomeTransfer = createAsyncThunk("reportSlice_dataHomeTransfer", async () => {
  try {
      const data = await agent.transfer.hometransferds();
      console.log(data);
  } catch (error) {
    
  }
})
const RespportSlice = createSlice({
  name: "reportSlice",
  initialState: {
    dataHisOrder: [] as hisOrder[],
    dataTradeLog : [] as  ReportData[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getdata.pending, (state) => {})
      .addCase(getdata.fulfilled, (state,action) => {
        state.dataTradeLog = action.payload
      })
      .addCase(getdata.rejected, (state) => {})
      .addCase(getDataHisOrder.pending, (state) => {})
      .addCase(getDataHisOrder.fulfilled, (state, action) => {
        state.dataHisOrder = action.payload;
      })
      .addCase(getDataHisOrder.rejected, (state) => {});
  },
});
export default RespportSlice;
