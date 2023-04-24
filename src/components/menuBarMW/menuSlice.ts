import { createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    visible: boolean;
  }
  
  const initialState: ComponentState = {
    visible: true,
  };
const menuSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
      setVisible(state, action) {
        state.visible = action.payload;
      },
    },
});

export const { setVisible } = menuSlice.actions;
export default menuSlice;