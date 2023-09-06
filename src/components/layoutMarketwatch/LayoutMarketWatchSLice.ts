import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ComponentState {
    orderCount:number;
    layoutOrder:number;
  }
  
  const initialState: ComponentState = {
    orderCount:0,
    layoutOrder:0,
  };
const LayoutMarketWatchSLice = createSlice({
    name: 'layoutmarketwatch',
    initialState,
    reducers: {
      setOrderCount(state, action) {
        state.orderCount = action.payload;
        // console.log(action.payload)
      },
      setStatusLayout(state, action) {
        state.layoutOrder = action.payload;
        // console.log(action.payload)
      },
    },
});

export const { setOrderCount} = LayoutMarketWatchSLice.actions;
export default LayoutMarketWatchSLice;