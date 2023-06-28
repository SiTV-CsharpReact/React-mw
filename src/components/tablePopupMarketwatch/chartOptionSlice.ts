import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataStockCode } from "../../models/stockCode";

const initialState = {
  isLoading: false,
  dataChartOption: [],
  status: "loading",
};
export const fetchChartOptionAsync = createAsyncThunk<[], DataStockCode>(
  "chartOptions",
  async (data) => {
    try {
      const response = await agent.dataTableBasic.postFormData({
        "action": "gw_realtime",
        "symbol": data.stockCode
      });
      return response.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
const chartOptionSlice = createSlice({
  name: "ChartOption",
  initialState,
  reducers: {
    setStatusTable: (state, action: PayloadAction<[]>) => {
      state.dataChartOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartOptionAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchChartOptionAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataChartOption = action.payload;
        // const result = action.payload;
        // console.log(result)
      });
  },
});

export const { setStatusTable } = chartOptionSlice.actions;
export default chartOptionSlice;
