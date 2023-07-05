import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { DataStockCode } from "../../models/stockCode";

const initialState = {
  isLoading: false,
  dataChartOption: [],
  status: "loading",
};
export const fetchNewsAsync = createAsyncThunk<[], DataStockCode>(
  "news",
  async (data) => {
    try {
      const response = await agent.dataTableBasic.postFormData({
        action: "new",
        symbol: data.stockCode,
      });
      return response.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
const NewsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {
    setStatusNews: (state, action: PayloadAction<[]>) => {
      state.dataChartOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchNewsAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataChartOption = action.payload;
        // const result = action.payload;
        // console.log(result)
      });
  },
});

export const { setStatusNews } = NewsSlice.actions;
export default NewsSlice;
