import { createSlice } from "@reduxjs/toolkit";
import { dataOrderlenh } from "../../models/stoploss";

const initialState = {
  dataOrderlenh: [] as dataOrderlenh[],
};
const stoplossSlice = createSlice({
  name: "Sloploss",
  initialState,
  reducers: {
    setDataOrder: (state, action) => {
      state.dataOrderlenh = [action.payload, ...state.dataOrderlenh];
    },
    handleIcrementCouter: (state, action) => {
      const { key, value } = action.payload;

      switch (value) {
        case "quantity":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              quanytity: state.dataOrderlenh[key].quanytity + 100,
            },
            ...state.dataOrderlenh.slice(key + 1), // Giữ nguyên các phần tử sau chỉ mục key
          ];
          break;
        case "priceGN":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              priceGN: state.dataOrderlenh[key].priceGN + 100,
            },
            ...state.dataOrderlenh.slice(key + 1), // Giữ nguyên các phần tử sau chỉ mục key
          ];
          break;
        case "priceLenhTh":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              priceLenhTh: state.dataOrderlenh[key].priceLenhTh + 100,
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;

        default:
          break;
      }
    },
    handleDcrementCouter: (state, action) => {
      const { key, value } = action.payload;
      switch (value) {
        case "quantity":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              quanytity: state.dataOrderlenh[key].quanytity - 100,
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;
        case "priceGN":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              priceGN: state.dataOrderlenh[key].priceGN - 100,
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;
        case "priceLenhTh":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              priceLenhTh: state.dataOrderlenh[key].priceLenhTh - 100,
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;

        default:
          break;
      }
    },
    handleRemove: (state, action) => {
      let key = action.payload;
      state.dataOrderlenh = [
        ...state.dataOrderlenh.slice(0, key),
        ...state.dataOrderlenh.slice(key + 1),
      ];
    },
    handleChanginputVale: (state, action) => {
      const { value, key, code } = action.payload;
      switch (code) {
        case "quantity":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              quanytity: Number(value),
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;
        case "priceGN":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              priceGN: Number(value) * 1000,
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;
        case "priceLenhTh":
          state.dataOrderlenh = [
            ...state.dataOrderlenh.slice(0, key),
            {
              ...state.dataOrderlenh[key],
              priceLenhTh: Number(value) * 1000,
            },
            ...state.dataOrderlenh.slice(key + 1),
          ];
          break;

        default:
          break;
      }
    },
  },
});
export const {
  setDataOrder,
  handleIcrementCouter,
  handleDcrementCouter,
  handleRemove,
  handleChanginputVale,
} = stoplossSlice.actions;
export default stoplossSlice.reducer;
