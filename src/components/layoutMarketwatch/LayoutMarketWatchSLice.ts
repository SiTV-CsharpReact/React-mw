import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const heightHeader= 40 //height header
const heightPannelLink= 46
const heightArrow = 38 
const expand = 27
const heightWindow = window.innerHeight /// height 1000  // - đi header 
const heightMarketWatchOr = heightWindow - heightHeader - heightPannelLink 
const heightMarketWatch = heightWindow -40  // height market watch 
const heightOrderForm = heightMarketWatch/10 *4.3
const heightPriceBoard = heightMarketWatch - heightOrderForm ;   // height bang gia = height market watch - height order form 
const heightTable = heightPriceBoard - expand;
const heightDragable = heightMarketWatch - heightOrderForm -45
interface ComponentState {
    orderForm: boolean;
    pendingOrder: boolean;
    orderCount:number;
    heightWindow: number;
    heightMarketWatch: number;
    heightPriceBoard:number;
    heightOrderForm:number;
    heightPannelLink:number;
    heightArrow:number;
    heightExpand:number;
    heightTable:number;
    heightDragable:number;
  }
  
  const initialState: ComponentState = {
    orderForm: true,
    pendingOrder:true,
    orderCount:0,
    heightWindow:heightWindow,
    heightMarketWatch: heightWindow- heightHeader,
    heightPriceBoard:(heightWindow - heightHeader) /10 *5.7 ,
    heightOrderForm:  (heightWindow - heightHeader)/10 *4.3 - heightPannelLink,
    heightPannelLink: heightPannelLink,
    heightArrow : heightArrow,
    heightExpand:expand,
    heightTable:heightTable,
    heightDragable:heightDragable
  };
const LayoutMarketWatchSLice = createSlice({
    name: 'layoutmarketwatch',
    initialState,
    reducers: {
      setShowHideOrderForm(state, action) {
        state.orderForm = action.payload;
      },
      setShowHidePendingOrder(state, action) {
        state.pendingOrder = action.payload;
      },
      setOrderCount(state, action) {
        state.orderCount = action.payload;
      },
      updateHeight(state) {
        state.heightWindow = window.innerHeight - heightHeader;
        state.heightPriceBoard = (window.innerHeight - heightHeader)/10 * 5.7 
        state.heightOrderForm = (window.innerHeight  - heightHeader)/10 *4.3 - heightPannelLink 
      },
      setHeightPriceBoardShow(state) {
        state.heightPriceBoard = heightMarketWatch -heightArrow
        state.heightTable = state.heightPriceBoard - state.heightExpand
        state.heightDragable = heightMarketWatch - 40
        console.log(state.heightPriceBoard, state.heightTable,state.heightExpand)
        // state.heightOrderForm = heightOrderForm
      },
      setHeightOrderFormShow(state) {
        state.heightPriceBoard = heightPriceBoard
        state.heightOrderForm = heightOrderForm
        state.heightTable = state.heightPriceBoard - state.heightExpand 
      },
      setHeightExpand(state, action:PayloadAction<number>) {
        state.heightExpand = action.payload;
       if(state.orderForm === true) {
        console.log(heightPriceBoard)
        state.heightTable = heightPriceBoard - state.heightExpand;
        state.heightPriceBoard = heightPriceBoard;
        console.log(heightPriceBoard, state.heightExpand)
       }
       else{
        state.heightTable = heightMarketWatch - state.heightExpand  -heightArrow;
        state.heightPriceBoard = heightMarketWatch -heightArrow;
        console.log(heightPriceBoard, state.heightExpand)
       }
      },
      setHeightDragable(state,action) {
        state.heightPriceBoard = action.payload
        state.heightOrderForm = heightMarketWatchOr - action.payload;
        state.heightTable = action.payload - state.heightExpand;
        //state.heightTable = state.heightPriceBoard - state.heightExpand 
      },
    },
});

export const { setShowHideOrderForm ,setShowHidePendingOrder,setOrderCount,updateHeight,setHeightPriceBoardShow,setHeightOrderFormShow,setHeightExpand,setHeightDragable} = LayoutMarketWatchSLice.actions;
export default LayoutMarketWatchSLice;