import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { TableKLTTG } from "../../models/tableKLTTTG";
import axios from "axios";
import { DataTable } from "../../models/modelTableHNX";

const initialState = {
  isLoading: false,
  dataDetailPopup: [] as any,
  dataTableKLTTG: [] as any,
  dataTableSearch: [] as any,
  status: "loading",
};

export const fetchDataTableKLTTGAsync = createAsyncThunk<[], any>(
  "dataKLTTG",
  async (code) => {
    try {
      const RP = {
        action: "le",
        symbol: code,
        max_score: 0,
      };
      const res = await agent.dataTableBasic.postFormData(RP);
      return res.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);

export const fetchDataDetailPopupAsync = createAsyncThunk<[], any>(
  "dataPopupDetail",
  async (code) => {
    try {
      const res = await axios.get(
        `https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${code}`
      );
      return res.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);

export const fetchDataSearchPopupAsync = createAsyncThunk<[], any>(
  "dataSearch",
  async () => {
    try {
      const res = await axios.get(
        `https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=All`
      );
      return res.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
const dataTablePopupDetail = createSlice({
  name: "DataPopupDetail",
  initialState,
  reducers: {
    setDataPopup: (state, action) => {
      state.dataDetailPopup = action.payload;
    },
    setDataKLTTG: (state, action) => {
      state.dataTableKLTTG = action.payload;
    },
    setDataSearch: (state, action) => {
      state.dataTableSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataDetailPopupAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchDataDetailPopupAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataDetailPopup = action.payload;
        // const result = action.payload;
        // console.log(result)
      })
      .addCase(fetchDataTableKLTTGAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchDataTableKLTTGAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataTableKLTTG = action.payload;
      })
      .addCase(fetchDataSearchPopupAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchDataSearchPopupAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataTableSearch = action.payload;
      });
  },
});

export const { setDataPopup, setDataKLTTG } = dataTablePopupDetail.actions;

export default dataTablePopupDetail;
