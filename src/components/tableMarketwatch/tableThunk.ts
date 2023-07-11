import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const dispatchDataTable: any = createAsyncThunk(
  "data/dispatchDataTable",
  async (dataTable, thunkAPI) => {
    console.log("dataTable", dataTable);
    return dataTable;
  }
);
export const dispatchDataTableBuy: any = createAsyncThunk(
  "data/dispatchDataTableBuy",
  async (dataBuy, thunkAPI) => {
    // console.log( "dataBuy", dataBuy);
    return dataBuy;
  }
);
export const dispatchDataMouseEventHandler: any = createAsyncThunk(
  "data/dispatchDataMouseEventHandler",
  async (dataMouse, thunkAPI) => {
    // console.log( "dataMouse", dataMouse);
    return dataMouse;
  }
);
export const dispatchDataMouseEventHandlerBuy: any = createAsyncThunk(
  "data/dispatchDataMouseEventHandlerBuy",
  async (dataMouseBuy, thunkAPI) => {
    // console.log( "dataMouseBuy", dataMouseBuy);
    return dataMouseBuy;
  }
);
export const dataSlice = createSlice({
  name: "data",
  initialState: {
    dataTable: {
      ma: "",
      price: 0,
      SanT: "",
      TCT: "",
      TranC: "",
      key: "",
    },
    dataBuy: {
      ma: "",
      price: 0,
      SanT: "",
      TCT: "",
      TranC: "",
      key: "",
    },
    dataMouse: {
      maF: "",
      priceF: 0,
      SanT: "",
      TCT: "",
      TranC: "",
      dataPopup: [],
    },
    dataMouseBuy: {
      maB: "",
      priceB: 0,
      SanT: "",
      TCT: "",
      TranC: "",
      dataPopup: [],
    },
  },
  reducers: {
    setProductParams: (state, action) => {
      //console.log(state.productParams);
      console.log("action", action);
      //state.productParams = { ...state.productParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchDataTable.fulfilled, (state: any, action) => {
      state.dataTable = action.payload;
    });
    builder.addCase(dispatchDataTableBuy.fulfilled, (state: any, action) => {
      state.dataBuy = action.payload;
    });
    builder.addCase(
      dispatchDataMouseEventHandler.fulfilled,
      (state: any, action) => {
        state.dataMouse = action.payload;
      }
    );
    builder.addCase(
      dispatchDataMouseEventHandlerBuy.fulfilled,
      (state: any, action) => {
        state.dataMouseBuy = action.payload;
      }
    );
  },
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
