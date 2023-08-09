import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";

export const fetchAssetReport = createAsyncThunk(
  "report/fetchAssetReport",
  async () => {
    // const responseRepot = await axios.get(`http://localhost:8480/api/stock/v1/report/bcts/058C108101`);
    // const responseRepot = await axios.get(`http://eztradereacttest.fpts.com.vn/report/api/ApiData/ReportBCTS`);
    const responseReport =await agent.assetReport.get();
    if (responseReport.Code === 0){
      return responseReport.Data
    }
    else if(responseReport.Code === -6789){
      window.location.replace('http://accounts3.fpts.com.vn');
    }
    return null;
  }
);

export const assetReportSlice = createSlice({
  name: "asset_report_fetchAssetReport",
  initialState: {
    isLoadingReport: false,
    assetReport: [] as any,
    statusReport: "idle",
  },
  reducers: {
    getAssetReport: (state, action: PayloadAction) => {
      state.assetReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetReport.pending, (state) => {
        state.statusReport = "loading";
      })
      .addCase(fetchAssetReport.fulfilled, (state, action) => {
        state.isLoadingReport = true;
        state.statusReport = "success";       
        state.assetReport = action.payload;
      })
      .addCase(fetchAssetReport.rejected, (state) => {
        state.isLoadingReport = true;
        state.statusReport = "failed";
      });
  },
});

export const { getAssetReport } = assetReportSlice.actions;

export default assetReportSlice;
