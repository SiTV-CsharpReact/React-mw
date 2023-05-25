import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const dispatchDataTable :any = createAsyncThunk(
  'data/dispatchDataTable',
  async (dataTable, thunkAPI) => {
    console.log( dataTable);
    return dataTable;
    
  }
);
export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    dataTable: {
      ma: '',
      price :0,
    },
  }, 
  reducers: {
      setProductParams: (state, action) => {
            //console.log(state.productParams);
            console.log("action",action)
            //state.productParams = { ...state.productParams, ...action.payload };
        },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchDataTable.fulfilled, (state:any, action) => {
      state.dataTable = action.payload;
    });
  },
});

export const { } = dataSlice.actions;
export default dataSlice.reducer;
