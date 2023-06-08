import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const dispatchData :any = createAsyncThunk(
  'data/dispatchData',
  async (dataShow, thunkAPI) => {
    console.log( "dataShow",dataShow);
    return dataShow;
  }
);
export const dataSliceShow = createSlice({
  name: 'show',
  initialState: {
    dataShow: {
      ma: '',
      San: '',
      TLV: '',
    },
  }, 
  reducers: {
      setProductParams: (state, action) => {
            console.log("action",action)
        },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchData.fulfilled, (state:any, action) => {
      state.dataShow = action.payload;
    });
  },
});

export const { } = dataSliceShow.actions;
export default dataSliceShow.reducer;
