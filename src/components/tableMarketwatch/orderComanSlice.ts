import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const dispatchDataTable: any = createAsyncThunk(
  "data/dispatchDataTable",
  async (dataTable, thunkAPI) => {
    console.log("dataTable", dataTable);
    return dataTable;
  }
);

const initialState = {
  maCode: "",
  price: 0,
  SanT: 0,
  TCT: 0,
  TranC: 0,
  key: "M",
  valueInput: "",
  san: "",
  Fee: "",
  quantityMax: 0,
  priceInput: 0,
};
export const OrderComanSlice = createSlice({
  name: "data_order",
  initialState,
  reducers: {
    // set lại data order
    setDataOrder: (state, action) => {
      const { dataOrder, key } = action.payload;
      state.SanT = dataOrder.Floor_Price;
      state.TCT = dataOrder.Basic_Price;
      state.TranC = dataOrder.Ceiling_Price;
      state.key = key;
      state.maCode = dataOrder?.Code;
      state.san = dataOrder?.Exchange;
      state.Fee = dataOrder?.Fee;
      state.quantityMax = dataOrder?.quantityMax;
      state.priceInput = Number(dataOrder?.PriceInput);
    },
    // set lại value htai
    setValueOrder: (state, action) => {
      state.maCode = action.payload;
    },

    // ktra trạng thái mua <=>  bán
    setBuySellorder: (state, action) => {
      state.key = action.payload;
    },
    // reset lại form => làm lại
    ResetStockCode: (state) => {
      state.SanT = 0;
      state.TCT = 0;
      state.TranC = 0;
      state.key = "M";
      state.maCode = "";
      state.san = "";
      state.quantityMax = 0;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setDecrementCounterPrice: (state, action) => {
      if (state.priceInput === action.payload) {
        state.priceInput = action.payload - 100;
      } else {
        state.priceInput = action.payload - 100;
      }
    },
    setIncrementCounterPrice: (state, action) => {
      if (action.payload === 0) {
      } else {
        state.priceInput = action.payload + 100;
      }
    },
    setValueSendOrder: (state, action) => {
      const { dataSendOrder, key } = action.payload;
      state.key = key;
      state.maCode = dataSendOrder.StockCode;
      // state.maCode =  dataSendOrder.StockCode
      state.quantityMax = dataSendOrder.Quantity;
      state.price = dataSendOrder.Price;
      // if(action.payload === 0){

      // }
      // else{
      //   state.priceInput = action.payload + 100
      // }
    },
    // setValueSendOrder : ( state , action) => {
    //   const {dataOrder,key} = action.payload
    //   state.key   = key
    //   state.maCode =  dataOrder.Floor_Price,
    //   state.quantityMax = dataOrder.Floor_Price,
    //   state.price =  dataOrder.Floor_Price,
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchDataTable.fulfilled, (state: any, action) => {
      state.dataTable = action.payload;
    });
  },
});

export const {
  setDataOrder,
  setValueOrder,
  setBuySellorder,
  ResetStockCode,
  setKey,
  setDecrementCounterPrice,
  setIncrementCounterPrice,
  setValueSendOrder,
} = OrderComanSlice.actions;
export default OrderComanSlice;
