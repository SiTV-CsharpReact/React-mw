import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const dispatchDataTable: any = createAsyncThunk(
  "data/dispatchDataTable",
  async (dataTable, thunkAPI) => {
    console.log("dataTable", dataTable);
    return dataTable;
  }
);

const initialState  = {
      maCode: "",
      price: 0,
      SanT: 0,
      TCT: 0,
      TranC: 0,
      key: "M", 
      valueInput : "",
      san : ""
}
export const OrderComanSlice = createSlice({
  name: "data_thub",
  initialState,
  reducers: {
    // set lại data order
      setDataOrder: (state, action) => {
        const {dataOrder,key} = action.payload
        state.SanT = dataOrder.Floor_Price
        state.TCT = dataOrder.Basic_Price
        state.TranC = dataOrder.Ceiling_Price
        state.key   = key
        state.maCode =  dataOrder?.Code
        state.san =  dataOrder?.Exchange
        },
        // set lại value htai
        setValueOrder  :  (state,action) =>{
          state.maCode = action.payload
        }, 
        // ktra trạng thái mua <=>  bán 
        setBuySellorder :(state ,action)=>{
          state.key = action.payload
        },
        // reset lại form => làm lại 
        ResetStockCode : (state)=>{
          state.SanT = 0
          state.TCT = 0
          state.TranC = 0
          state.key   = "M"
          state.maCode =""
          state.san =  ""
        }
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchDataTable.fulfilled, (state: any, action) => {
      state.dataTable = action.payload;
    });
    
  },
});

export const {setDataOrder ,setValueOrder ,setBuySellorder ,ResetStockCode} = OrderComanSlice.actions;
export default OrderComanSlice;
