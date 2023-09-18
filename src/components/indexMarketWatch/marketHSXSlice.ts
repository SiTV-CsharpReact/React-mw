import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ObjectMenuHSX } from "../../models/modelListMenuHSX";
import agent from "../../api/agent";
import { san_HSX } from "../../configs/app.config";
import { IState_SlideMarket_HSX } from "./interface/slidemarket.config";

const initialState: IState_SlideMarket_HSX = {
  isLoadingMarket: false,
  marketHSX: {} as ObjectMenuHSX,
  statusMarket: "idle",
};
// san HSX
export const fetchHSXMarketAsync = createAsyncThunk<ObjectMenuHSX>(
  "market/fetchMarketHSX",
  async () => {
    const responseHSX = await agent.Index.get(san_HSX);
    return responseHSX;
  }
);

export const marketHSXSlice = createSlice({
  name: "market_fetchMarketHSX",
  initialState,
  reducers: {
    getDataHSX: (state, action: PayloadAction<ObjectMenuHSX>) => {
      state.marketHSX = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHSXMarketAsync.pending, (state) => {
        state.statusMarket = "loading";
      })
      .addCase(fetchHSXMarketAsync.fulfilled, (state, action:PayloadAction<ObjectMenuHSX>) => {
        state.isLoadingMarket = true;
        state.statusMarket = "success";
        state.marketHSX = action.payload;
      })
      .addCase(fetchHSXMarketAsync.rejected, (state) => {
        state.isLoadingMarket = true;
        state.statusMarket = "failed";
      });
  },
});

export const { getDataHSX } = marketHSXSlice.actions;

export default marketHSXSlice;
