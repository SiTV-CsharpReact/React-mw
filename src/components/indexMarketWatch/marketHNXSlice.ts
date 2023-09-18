import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ObjectMenuHNX } from "../../models/modelListMenuHSX";
import agent from "../../api/agent";
import { san_HNX } from "../../configs/app.config";
import { IState_SlideMarket_HNX } from "./interface/slidemarket.config";

const initialState: IState_SlideMarket_HNX = {
  isLoadingMarket: false,
  marketHNX: {} as ObjectMenuHNX,
  statusMarket: "idle",
};
export const fetchHNXMarketAsync = createAsyncThunk<ObjectMenuHNX>(
  "market/fetchMarketHNX",
  async () => {
    const responseHSX = await agent.Index.get(san_HNX);
    return responseHSX;
  }
);

export const marketHNXSlice = createSlice({
  name: "market_fetchMarketHNX",
  initialState,
  reducers: {
    getDataHNX: (state, action: PayloadAction<ObjectMenuHNX>) => {
      state.marketHNX = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHNXMarketAsync.pending, (state) => {
        state.statusMarket = "loading";
      })
      .addCase(
        fetchHNXMarketAsync.fulfilled,
        (state, action: PayloadAction<ObjectMenuHNX>) => {
          state.isLoadingMarket = true;
          state.statusMarket = "success";
          state.marketHNX = action.payload;
        }
      )
      .addCase(fetchHNXMarketAsync.rejected, (state) => {
        state.isLoadingMarket = true;
        state.statusMarket = "failed";
      });
  },
});

export const { getDataHNX } = marketHNXSlice.actions;

export default marketHNXSlice;
