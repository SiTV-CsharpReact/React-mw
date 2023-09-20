import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ComponentState {
  visible?: boolean;
  code: string;
  floorLTG: string;
}

const initialState: ComponentState = {
  visible: false,
  code: "",
  floorLTG: "",
};
const popupTableSlice = createSlice({
  name: "DetailStock",
  initialState,
  reducers: {
    showDetailStock: (state, action) => {
      state.visible = action.payload.visible;
      state.code = action.payload.code;
    },
    setLLTG: (state, action) => {
      state.floorLTG = action.payload;
    },
  },
});

export const { showDetailStock, setLLTG } = popupTableSlice.actions;
export default popupTableSlice;
