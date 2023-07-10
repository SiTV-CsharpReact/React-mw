import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ObjectMenuHNX } from "../../models/modelListMenuHSX";
import agent from "../../api/agent";
import { san_HNX } from "../../configs/app.config";

export const fetchHNXMarketAsync = createAsyncThunk<ObjectMenuHNX>(
  "market/fetchMarketHNX",
  async () => {
    const responseHSX = await agent.Index.get(san_HNX)
    return responseHSX;
  }
);

export const marketHNXSlice = createSlice({
  name: "market_fetchMarketHNX",
  initialState: {
    isLoadingMarket: false,
    marketHNX: {
      valueHNX: {} as ObjectMenuHNX,
    },
    statusMarket: "idle",
  },
  reducers: {
    getDataHNX: (state, action: PayloadAction<ObjectMenuHNX>) => {
      state.marketHNX.valueHNX = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHNXMarketAsync.pending, (state) => {
        state.statusMarket = "loading";
      })
      .addCase(fetchHNXMarketAsync.fulfilled, (state, action) => {
        state.isLoadingMarket = true;
        state.statusMarket = "success";
        state.marketHNX.valueHNX = action.payload;
      })
      .addCase(fetchHNXMarketAsync.rejected, (state) => {
        state.isLoadingMarket = true;
        state.statusMarket = "failed";
      });
  },
});

export const { getDataHNX } = marketHNXSlice.actions;

export default marketHNXSlice;
