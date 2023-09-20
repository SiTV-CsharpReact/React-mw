import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataChart } from "./interface/data_tablepopup";

interface DataInitialState {
  isLoading: boolean;
  dataChartOption: (string | number)[];
  status: string;
}
const initialState: DataInitialState = {
  isLoading: false,
  dataChartOption: [],
  status: "loading",
};
export const fetchChartOptionAsync = createAsyncThunk<[], DataChart>(
  "chartOptionRealtime",
  async (data) => {
    try {
      const response = await agent.dataTableBasic.postFormData({
        action: "gw_realtime",
        symbol: data.symbol,
      });
      console.log("daresponseta", response);
      return response.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
export const fetchChartOptiongHistoryAsync = createAsyncThunk<[], DataChart>(
  "chartOptionHistory",
  async (data) => {
    try {
      const response = await agent.dataTableBasic.postFormData({
        action: "gw_history",
        symbol: data.symbol,
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
    setAction: (state, action: PayloadAction<[]>) => {
      // console.log(ac);
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
      })
      .addCase(fetchChartOptiongHistoryAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataChartOption = action.payload
      });
  },
});

export const { setStatusTable, setAction } = chartOptionSlice.actions;
export default chartOptionSlice;
