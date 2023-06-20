import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const dispatchDataThongke :any = createAsyncThunk(
  'data/dispatchDataThongke',
  async (dataThongke, thunkAPI) => {
    console.log( "dataThongke",dataThongke);
    return dataThongke;
  }
);

export const dataSliceThongke = createSlice({
  name: 'dataThongke',
  initialState: {
    dataThongke: {
    ma : ""
    }
  }, 
  reducers: {
      setProductParams: (state, action) => {
            //console.log(state.productParams);
            console.log("action",action)
            //state.productParams = { ...state.productParams, ...action.payload };
        },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchDataThongke.fulfilled, (state:any, action) => {
      state.dataThongke = action.payload;
    });
  },
});