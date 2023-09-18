import { createSlice } from "@reduxjs/toolkit";
import { IIndex } from "./interface/slidemarket.config";

export const INDEX_TYPE: IIndex = {
  VNXALL: true,
  VNI: true,
  VN30: true,
  VN100: false,
  VNMID: false,
  VNSML: false,
  VNALL: false,
  HNX: true,
  HNX30: true,
  HNXLCAP: false,
  HNXSMCAP: false,
  HNXFIN: false,
  HNXMAN: false,
  HNXCON: false,
  UPCOM: true,
  cbcol4: false,
  cbcol20: false,
  cbcol25: false,
  cbcol28: true,
  cbcol22: true,
  cbcol23: true,
  cbcol24: true,
  cbcol26: true,
  cbcol27: true,
  smart_symbol_down: true,
  smart_symbol_up: false,
  prior_textbox_priceF: false,
  prior_textbox_qtyF: true,
};

const data =
  localStorage.getItem("setting_table") !== null
    ? JSON.parse(localStorage.getItem("setting_table") as string)
    : INDEX_TYPE;

const initialState = {
  INDEX: data as IIndex,
};

export const settingMarketWatchSlice = createSlice({
  name: "setting/table_marketwatch",
  initialState,
  reducers: {
    paramsMarketwatch: (state, action) => {
      state.INDEX = action.payload;
      localStorage.setItem("setting_table", JSON.stringify(state.INDEX));
    },
  },
});

export const { paramsMarketwatch } = settingMarketWatchSlice.actions;

export default settingMarketWatchSlice;
