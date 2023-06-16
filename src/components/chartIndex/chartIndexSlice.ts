import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { IChartIndex } from "./util/interface.config";

// interface ComponentState {
//   isLoading: boolean;
//   dataChartIndex: IChartIndex;
//   status: string;
// }

const initialState = {
  isLoading: false,
  dataChartIndex: {} as IChartIndex,
  status: "loading",
};
export const fetchChartIndexAsync = createAsyncThunk<IChartIndex>(
  "chartIndex",
  async () => {
    try {
      const data = await agent.chartIndex.get();
      // console.log(data);
      return data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
const chartIndexSlice = createSlice({
  name: "ChartIndex",
  initialState,
  reducers: {
    setStatusTable: (state, action: PayloadAction<IChartIndex>) => {
      state.dataChartIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartIndexAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchChartIndexAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataChartIndex = action.payload;
        // const result = action.payload;
        // console.log(result)
      });
  },
});

export const { setStatusTable } = chartIndexSlice.actions;
export default chartIndexSlice;
