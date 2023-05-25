import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { MinistriesMarketwatch, Data, Ministry } from "../../models/ministry";

interface ComponentState {
    visible: boolean;
  }
  
  const initialState: ComponentState = {
    visible: false,
  };

export const fetchMinistryAsync = createAsyncThunk<MinistriesMarketwatch>(
  "table/fecthMinistry",
  async () => {
    const res = await agent.Ministry.get();
    // console.log(res);
    return res;
  }
);

export const ministrySlice = createSlice({
  name: "table_fecthCategory",
  initialState: {
    isLoadingMinistry: false,
    dataMinistry: {
      Code: 0,
      Message: "SUCCESS",
      Data: {
        Time: "",
        Data: [] as Ministry[]
      }
    },
    statusMinistry: "idle",
    isChecked:false,
  },
  reducers: {
    getDataSuccess: (state, action: PayloadAction<MinistriesMarketwatch>) => {
      state.dataMinistry = action.payload;
      state.statusMinistry = "idle";
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchMinistryAsync.pending, (state) => {
      state.isLoadingMinistry = false;
      state.statusMinistry = "loading";
    })
    .addCase(fetchMinistryAsync.fulfilled, (state, action) => {
      state.isLoadingMinistry = true;
      const result = action.payload;
      if (result?.Code === 0) {
        state.dataMinistry = action.payload;
        state.statusMinistry = "succeeded";
      } else {
        state.statusMinistry = "failed";
        // Xử lý tình huống khi API trả về lỗi
      }
    })
    .addCase(fetchMinistryAsync.rejected, (state) => {
      state.isLoadingMinistry = true;
      state.statusMinistry = "failed";
      // Xử lý tình huống khi có lỗi xảy ra trong quá trình gọi API
    })
    
   
},

});

export default ministrySlice;
