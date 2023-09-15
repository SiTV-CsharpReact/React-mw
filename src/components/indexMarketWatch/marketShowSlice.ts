import { createSlice } from "@reduxjs/toolkit";
export interface IIndex {
  VNXALL: boolean;
  VNI: boolean;
  VN30: boolean;
  VN100: boolean;
  VNMID: boolean;
  VNSML: boolean;
  VNALL: boolean;
  HNX: boolean;
  HNX30: boolean;
  HNXLCAP: boolean;
  HNXSMCAP: boolean;
  HNXFIN: boolean;
  HNXMAN: boolean;
  HNXCON: boolean;
  UPCOM: boolean;
  cbcol4: boolean;
  cbcol20: boolean;
  cbcol25: boolean;
  cbcol28: boolean;
  cbcol22: boolean;
  cbcol23: boolean;
  cbcol24: boolean;
  cbcol26: boolean;
  cbcol27: boolean;
  smart_symbol_up: boolean;
  smart_symbol_down: boolean;
  prior_textbox_priceF: boolean;
  prior_textbox_qtyF: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
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
const quantityIndex15F=Object.values(data).slice(0, 15);
const quantityIndex= quantityIndex15F.filter(value => value === true).length
const initialState = {
  INDEX: data as IIndex,
  quantityIndex: quantityIndex,
};

export const settingMarketWatchSlice = createSlice({
  name: "setting/table_marketwatch",
  initialState,
  reducers: {
    paramsMarketwatch: (state, action) => {
      const qttIndex = action.payload;
      state.INDEX = qttIndex;
      const first15Values = Object.values(qttIndex).slice(0, 15) // lay 15 index
      state.quantityIndex = first15Values.filter(value => value === true).length; // đếm số lượng index hiển thị
      localStorage.setItem("setting_table", JSON.stringify(state.INDEX));
    },
 
  },
});

export const { paramsMarketwatch } = settingMarketWatchSlice.actions;

export default settingMarketWatchSlice;
