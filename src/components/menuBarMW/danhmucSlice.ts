import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { CategoriesMarketWatch, Category } from "../../models/category";
// <CategoriesMarketWatch>
export const fetchCategoryAsync = createAsyncThunk(
  "table/getCateolcadf",
  async () => {
    // const res = await agent.Category.get();
  try {
    // const data = await  agent.Category.get()
    const data = await  agent.Category.get()
    return data
  } catch (error) {
    console.log("error ở đây", error);
  }
    // return res;
  }
);

export const danhmucSlice = createSlice({
  name: "table_fecthCategory",
  initialState: {
    isLoading: 0,
    row: null,
    name: null,
    data: {
      Code: 0,
      Message: "SUCCESS",
      Data: [] as Category[],
    },
    status: "idle",
  },
  reducers: {
    getDataSuccess: (state, action: PayloadAction<CategoriesMarketWatch>) => {
      state.data = action.payload;
      state.status = "idle";
    },
    activeMenuDanhmuc: (state, action) => {
      state.name = action.payload?.name;
      state.row = action.payload?.row;
    },
    historyPriceActiveMenu : (state) => {
      state.name = null
      state.row = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.isLoading = 1;
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = 2;
        const result = action.payload;
        if (result?.Code === 0) {
          state.data = action.payload;
          state.row = result?.Data[0]?.Row; // lưu row danh mục
          state.name = result?.Data[0]?.Name; // tên danh mục
          state.status = "succeeded";
        } else {
          state.status = "failed";
          // Xử lý tình huống khi API trả về lỗi
        }
      })
      .addCase(fetchCategoryAsync.rejected, (state) => {
        state.isLoading = 3;
        state.status = "failed";
        // Xử lý tình huống khi có lỗi xảy ra trong quá trình gọi API
      });
  },
});
export const { activeMenuDanhmuc ,historyPriceActiveMenu} = danhmucSlice.actions;
export default danhmucSlice;
