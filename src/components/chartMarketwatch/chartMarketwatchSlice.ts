
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    visible: boolean;
    code: string;
  }
  
  const initialState: ComponentState = {
    visible: false,
    code: '',
  };
const chartMarketwatchSlice = createSlice({
  name: "show_hide_marketwatch",
  initialState,
  reducers: {
    statusChartMarketwatch: (state, action: PayloadAction<string>) => {
      state.visible = !state.visible;
      state.code = action.payload;
    }
  }
});

export const { statusChartMarketwatch  } = chartMarketwatchSlice.actions;
export default chartMarketwatchSlice;
