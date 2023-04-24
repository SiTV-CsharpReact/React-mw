import { createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    orderForm: boolean;
    pendingOrder: boolean;
    orderCount:number;
    heightWindow: number;
  }
  
  const initialState: ComponentState = {
    orderForm: true,
    pendingOrder:true,
    orderCount:0,
    heightWindow: window.innerHeight,
  };
const LayoutMarketWatchSLice = createSlice({
    name: 'layoutmarketwatch',
    initialState,
    reducers: {
      setShowHideOrderForm(state, action) {
        state.orderForm = action.payload;
        console.log(action.payload)
      },
      setShowHidePendingOrder(state, action) {
        state.pendingOrder = action.payload;
      },
      setOrderCount(state, action) {
        state.orderCount = action.payload;
        console.log(state.orderCount)
      },
    },
});

export const { setShowHideOrderForm ,setShowHidePendingOrder,setOrderCount} = LayoutMarketWatchSLice.actions;
export default LayoutMarketWatchSLice;