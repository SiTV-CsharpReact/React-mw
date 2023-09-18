import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { ICategory, CategoriesMarketWatchs } from "../../models/category";
import { IData_Reponse, IState_Category } from "./interface/interface.config";

const Reponse_Data: IData_Reponse = {
  Code: 0,
  Msg: "",
  Data: Array<ICategory>()
};
const initialState: IState_Category = {
  isLoading: 0,
  name: null,
  row: null,
  status: "idle",
  data: Reponse_Data,
};
// Lấy danh sách danh mục
export const fetchCategoryAsync = createAsyncThunk<IData_Reponse>(
  "table_fecthCategory/getCateolcadf",
  async (form: any) => {
    try {
      // const data = await  agent.Category.postformData(form)
      const data = await agent.Category.get(form);
      return data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);

// Thêm danh mục
export const AddCategori = createAsyncThunk(
  "table_fecthCategory/addCategori",
  async (Query: any) => {
    try {
      const data = await agent.Category.AddCate(Query);
      console.log("vô data  Query ", Query, data);
    } catch (error) {}
  }
);

export const danhmucSlice = createSlice({
  name: "table_fecthCategory",
  initialState,
  reducers: {
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.status = "idle";
    },
    activeMenuDanhmuc: (state, action) => {
      state.name = action.payload?.name;
      state.row = action.payload?.row;
    },
    historyPriceActiveMenu: (state) => {
      state.name = null;
      state.row = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.isLoading = 1;
        state.status = "loading";
      })
      .addCase(
        fetchCategoryAsync.fulfilled,
        (state, action: PayloadAction<IData_Reponse>) => {
          state.isLoading = 2;
          state.data = action.payload;
        }
      )
      .addCase(fetchCategoryAsync.rejected, (state) => {
        state.isLoading = 3;
        state.status = "failed";
        // Xử lý tình huống khi có lỗi xảy ra trong quá trình gọi API
      });
  },
});
export const { activeMenuDanhmuc, historyPriceActiveMenu } =
  danhmucSlice.actions;
export default danhmucSlice;
