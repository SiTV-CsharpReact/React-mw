import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ObjectMenuHSX } from "../../models/modelListMenuHSX";
import axios from "axios";

// san HSX
export const fetchHSXMarketAsync = createAsyncThunk<ObjectMenuHSX>(
  "market/fetchMarketHSX",
  async () => {
    const responseHSX = await axios.get(
      `http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`
    );
    return responseHSX.data;
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
      })
      .addCase(fetchHSXMarketAsync.rejected, (state) => {
        state.isLoadingMarket = true;
        state.statusMarket = "failed";
      });
  },
});

export const { getDataHSX } = marketHSXSlice.actions;

export default marketHSXSlice;
