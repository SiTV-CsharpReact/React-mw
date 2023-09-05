import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Categories, CategoriesMarketWatch, CategoriesMarketWatchs, Category } from "../../models/category";
// <CategoriesMarketWatch>
export const fetchCategoryAsync = createAsyncThunk(
  "table_fecthCategory/getCateolcadf",
  async (form:any) => {
  try {
    // const data = await  agent.Category.postformData(form)
    const data = await agent.Category.get(form)
    return data
  } catch (error) {
    console.log("error ở đây", error);
  }
  }
);
export const AddCategori = createAsyncThunk("table_fecthCategory/addCategori" , async(Query:any)=>{
  try {
      const data = await agent.Category.AddCate(Query)
      console.log("vô data  Query " ,Query ,  data)
  } catch (error) {
    
  }
})

export const danhmucSlice = createSlice({
  name: "table_fecthCategory",
  initialState: {
    isLoading: 0,
    row: null,
    name: null,
    data: {
      Code: 0,
      Message: "SUCCESS",
      Data: [] as Categories[],
    },
    status: "idle",
  },
  reducers: {
    getDataSuccess: (state, action: PayloadAction<CategoriesMarketWatchs>) => {
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
        console.log(result)
        if (result?.Code === 0) {
          console.log(result.Data[0])
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
