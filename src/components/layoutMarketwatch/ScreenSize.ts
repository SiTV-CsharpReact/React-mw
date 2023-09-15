// screenSizeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState: {
    widthWindow: window.innerWidth,
    heightWindow: window.innerHeight,
  },
  reducers: {
    setScreenSize: (state, action) => {
      state.widthWindow = action.payload.width;
      state.heightWindow = action.payload.height;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;

export default screenSizeSlice;