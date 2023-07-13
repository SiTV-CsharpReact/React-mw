import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Company, Root } from "../../models/root";
export const fetchCompanyAsync = createAsyncThunk<any>(
  "company/getdata",
  async () => {
   try {
    const res = await agent.Company.get();
    let result =  JSON.parse(res)
    let dataCompanyTotal =  result
    let dataCompanyHSX = result.filter(
      (item: Company) => item.Exchange === 1
    );
    let dataCompanyHNX = result.filter(
      (item: Company) => item.Exchange === 2
    );
    let dataCompanyUpcom = result.filter(
      (item: Company) => item.Exchange === 3
    );
    let data = {
      dataCompanyTotal :dataCompanyHSX.sort((a:Company, b:Company) => a.Code.localeCompare(b.Code)),
      dataCompanyHSX: dataCompanyHSX.sort((a:Company, b:Company) => a.Code.localeCompare(b.Code)),
      dataCompanyHNX :dataCompanyHNX.sort((a:Company, b:Company) => a.Code.localeCompare(b.Code)),
      dataCompanyUpcom : dataCompanyUpcom.sort((a:Company, b:Company) => a.Code.localeCompare(b.Code)),
    }
    return data
   } catch (error) {
    let data = {
   dataCompanyHSX : [],
    dataCompanyHNX: [],
    dataCompanyUpcom: [],
    dataCompanyTotal: [],
    }
    return  data
   }
  }
);
export const companySlice = createSlice({
  name: "company",
  initialState: {
    productsLoaded: false,
    dataCompanyTotal: [] as Company[],
    dataCompanyUpcom: [] as Company[],
    dataCompanyHNX: [] as Company[],
    dataCompanyHSX: [] as Company[],
    status: 0,
  },

  reducers: {
    getDataSuccess: (state, action: PayloadAction<{}>) => {
      // state.data = action.payload;
    //   state.status = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyAsync.pending, (state) => {
        state.productsLoaded = false;
        state.status = 1;
        state.dataCompanyTotal =[]
      })
      .addCase(fetchCompanyAsync.fulfilled, (state, action) => {
        state.productsLoaded = true;
        state.status = 2;
        let data = action.payload;
    
        state.dataCompanyTotal = data.dataCompanyTotal
        state.dataCompanyHNX = data.dataCompanyHNX
        state.dataCompanyHSX = data.dataCompanyHSX
        state.dataCompanyUpcom = data.dataCompanyUpcom
      })

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
export default companySlice;
