import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ComponentState {
    orderCount:number;
  }
  
  const initialState: ComponentState = {
    orderCount:0,
  };
const LayoutMarketWatchSLice = createSlice({
    name: 'layoutmarketwatch',
    initialState,
    reducers: {
      setOrderCount(state, action) {
        state.orderCount = action.payload;
        // console.log(action.payload)
      },
    },
});

export const { setOrderCount} = LayoutMarketWatchSLice.actions;
export default LayoutMarketWatchSLice;