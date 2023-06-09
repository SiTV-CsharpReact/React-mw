import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const dispatchDataTableBuy :any = createAsyncThunk(
  'data/dispatchDataTableBuy',
  async (dataBuy, thunkAPI) => {
    console.log( dataBuy);
    return dataBuy;
    
  }
);
export const tableBuy = createSlice({
  name: 'dataBuy',
  initialState: {
    dataBuy: {
      ma: '',
      price: 0,
      SanT: '',
      TCT: '',
      TranC:''
    },
  }, 
  reducers: {
      setProductParamsBuy: (state, action) => {
            console.log("action",action)
        },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchDataTableBuy.fulfilled, (state:any, action) => {
      state.dataBuy = action.payload;
    });
  },
});

export const { } = tableBuy.actions;
export default tableBuy.reducer;
