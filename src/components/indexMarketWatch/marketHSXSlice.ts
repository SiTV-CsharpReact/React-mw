import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ObjectMenuHSX } from "../../models/modelListMenuHSX";
import agent from "../../api/agent";
import axios from "axios";
import { san_HSX } from "../../configs/app.config";

// san HSX
export const fetchHSXMarketAsync = createAsyncThunk<ObjectMenuHSX>(
  "market/fetchMarketHSX",
  async () => {
    const responseHSX = await agent.Index.get(san_HSX);
    // console.log(responseHSX)
    return responseHSX;
  }
);

export const marketHSXSlice = createSlice({
  name: "market_fetchMarketHSX",
  initialState: {
    isLoadingMarket: false,
    marketHSX: {
      valueHSX: {} as ObjectMenuHSX,
    },
    statusMarket: "idle",
  },
  reducers: {
    getDataHSX: (state, action: PayloadAction<ObjectMenuHSX>) => {
      state.marketHSX.valueHSX = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHSXMarketAsync.pending, (state) => {
        state.statusMarket = "loading";
      })
      .addCase(fetchHSXMarketAsync.fulfilled, (state, action) => {
        state.isLoadingMarket = true;
        state.statusMarket = "success";
        state.marketHSX.valueHSX = action.payload;
        console.log(state.marketHSX.valueHSX)
      })
      .addCase(fetchHSXMarketAsync.rejected, (state) => {
        state.isLoadingMarket = true;
        state.statusMarket = "failed";
      });
  },
});

export const { getDataHSX } = marketHSXSlice.actions;

export default marketHSXSlice;
