import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface ModeState {
  mode: string;
}

const mode =
  localStorage.getItem("theme") !== null
    ? JSON.parse(localStorage.getItem("theme") as string)
    : "light";
const initialState: ModeState = {
  mode: mode,
};

export const changeThemeModeSlice = createSlice({
  name: "mode_theme",
  initialState,
  reducers: {
    changeModeTheme: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
      localStorage.setItem("theme", JSON.stringify(state.mode));
    },
  },
});

export const { changeModeTheme } = changeThemeModeSlice.actions;

export default changeThemeModeSlice;
