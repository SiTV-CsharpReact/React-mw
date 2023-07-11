import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const dispatchDataTable :any = createAsyncThunk(
  'data/dispatchDataTable',
  async (dataTable, thunkAPI) => {
    console.log( "dataTable",dataTable);
    return dataTable;
    
  }
);


export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    dataTable: {
      ma: '',
      price: 0,
      SanT: '',
      TCT: '',
      TranC: '',
      key:""
    },
   
  }, 
  reducers: {
      setProductParams: (state, action) => {
            console.log("action",action)
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
