import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ObjectMenuHNX } from "../../models/modelListMenuHSX";

export const fetchHNXMarketAsync = createAsyncThunk<ObjectMenuHNX>(
  "market/fetchMarketHNX",
  async () => {
    const responseHSX = await axios.get(
      `http://marketstream.fpts.com.vn/hnx/data.ashx?s=index`
    );
    return responseHSX.data;
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
