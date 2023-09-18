import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
// import { ICompany, Root } from "../../models/root";
import {
  ICompany,
  IDataCompany_Response,
  IState,
} from "./interface/interface.config";

const IData_Company: ICompany = {
  Basic_Price: 0,
  Ceiling_Price: 0,
  Code: "",
  Exchange: 0,
  Floor_Price: 0,
  ID: "",
  ScripName: "",
  ScripNameEN: "",
  Stock_Type2: 0,
};

const initialState: IState = {
  dataCompanyTotal: [IData_Company],
  dataCompanyUpcom: [IData_Company],
  dataCompanyHNX: [IData_Company],
  dataCompanyHSX: [IData_Company],
  status: 0,
  dataDetail: null,
  productsLoaded: false,
};

export const fetchCompanyAsync = createAsyncThunk<IDataCompany_Response>(
  "company/getdata",
  async () => {
    try {
      const res: string = await agent.Company.get();
      let result = JSON.parse(res);
      let dataCompanyTotal: ICompany[] = result;

      let dataCompanyHSX: ICompany[] = result.filter(
        (item: ICompany) => item.Exchange === 1
      );
      let dataCompanyHNX: ICompany[] = result.filter(
        (item: ICompany) => item.Exchange === 2
      );
      let dataCompanyUpcom: ICompany[] = result.filter(
        (item: ICompany) => item.Exchange === 3
      );
      let data = {
        dataCompanyTotal: dataCompanyTotal.sort((a: ICompany, b: ICompany) =>
          a.Code.localeCompare(b.Code)
        ),
        dataCompanyHSX: dataCompanyHSX.sort((a: ICompany, b: ICompany) =>
          a.Code.localeCompare(b.Code)
        ),
        dataCompanyHNX: dataCompanyHNX.sort((a: ICompany, b: ICompany) =>
          a.Code.localeCompare(b.Code)
        ),
        dataCompanyUpcom: dataCompanyUpcom.sort((a: ICompany, b: ICompany) =>
          a.Code.localeCompare(b.Code)
        ),
      };
      return data;
    } catch (error) {
      let data = {
        dataCompanyHSX: [],
        dataCompanyHNX: [],
        dataCompanyUpcom: [],
        dataCompanyTotal: [],
      };
      return data;
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getDataSuccess: (state, action) => {
      console.log({ Data: action.payload });

      // state.dataCompanyTotal = action.payload;
      //   state.status = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyAsync.pending, (state) => {
        state.productsLoaded = false;
        state.status = 1;
        state.dataCompanyTotal = [];
      })
      .addCase(
        fetchCompanyAsync.fulfilled,
        (state, action: PayloadAction<IDataCompany_Response>) => {
          state.productsLoaded = true;
          state.status = 2;
          let data = action.payload;

          state.dataCompanyTotal = data.dataCompanyTotal;
          state.dataCompanyHNX = data.dataCompanyHNX;
          state.dataCompanyHSX = data.dataCompanyHSX;
          state.dataCompanyUpcom = data.dataCompanyUpcom;
        }
      )

      .addCase(fetchCompanyAsync.rejected, (state, action) => {
        state.productsLoaded = true;
        state.status = 3;
        state.dataCompanyHSX = [];
        state.dataCompanyHNX = [];
        state.dataCompanyUpcom = [];
        state.dataCompanyTotal = [];
      });
  },
});
export const { getDataSuccess } = companySlice.actions;
export default companySlice;
