import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
export const dispatchData :any = createAsyncThunk(
  'data/dispatchData',
  async (dataShow, thunkAPI) => {
    console.log( "dataShow",dataShow);
    return dataShow;
  }
);

export const getDataApi = createAsyncThunk('dataApi/DataApi', async () => {
  const response = await axios.get('http://localhost:3005/Data')

  return response.data
})
export const getDataApiPendingOder = createAsyncThunk('dataApiPendingOder/DataApiPendingOder', async () => {
  const response = await axios.get('http://localhost:3006/items')
  return response.data
})
export const dataSliceShow = createSlice({
  name: 'show',
  initialState: {
    dataShow: {
      ma: '',
      San: '',
      TLV: '',
      giaTranSm:0
    },
    dataApi: [] as any,
    dataApiPendingOder: [] as any,
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
    builder.addCase(getDataApi.fulfilled, (state:any, action) => {
      state.dataApi = action.payload;
    });
    builder.addCase(getDataApiPendingOder.fulfilled, (state:any, action) => {
      state.dataApiPendingOder = action.payload;
    });
     builder.addCase(getDataApi.pending, (state:any, action) => {
      if (state.dataApi === 'idle') {
        state.dataApi = 'pending'
      }
    });
  },
});

export const { setProductParams} = dataSliceShow.actions;
export default dataSliceShow.reducer;
