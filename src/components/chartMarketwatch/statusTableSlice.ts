
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    statusTabTable:number;
  }
  
  const initialState: ComponentState = {
    statusTabTable:1,
  };
const statusTableMWSlice = createSlice({
  name: "show_hide_tableMW",
  initialState,
  reducers: {
    setStatusTable: (state, action: PayloadAction<number>) => {
      state.statusTabTable = action.payload;
    }
  }
});

export const { setStatusTable  } = statusTableMWSlice.actions;
export default statusTableMWSlice;
