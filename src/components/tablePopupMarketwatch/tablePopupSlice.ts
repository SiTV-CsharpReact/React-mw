import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { CategoriesMarketWatch, Category } from "../../models/category";

export const fetchCategoryAsync = createAsyncThunk<CategoriesMarketWatch>(
  "table/fecthCategory",
  async () => {
    const res = await agent.Category.get();
    console.log(res);
    return res;
  }
);
export const tablePopupSlice = createSlice({
  name: "table_fecthCategory",
  initialState: {
    isLoading: false,
    data: {
      Code: 0,
      Message: "SUCCESS",
      Data: [] as Category[]
    },
    status: "idle",
  },
  reducers: {
    getDataSuccess: (state, action: PayloadAction<CategoriesMarketWatch>) => {
      state.data = action.payload;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        const result = action.payload;
        if (result?.Code === 0) {
          state.data = action.payload;
          state.status = "succeeded";
        } else {
          state.status = "failed";
          // Xử lý tình huống khi API trả về lỗi
        }
      })
      .addCase(fetchCategoryAsync.rejected, (state) => {
        state.isLoading = true;
        state.status = "failed";
        // Xử lý tình huống khi có lỗi xảy ra trong quá trình gọi API
      })
    
      
  },
});

export default tablePopupSlice;
