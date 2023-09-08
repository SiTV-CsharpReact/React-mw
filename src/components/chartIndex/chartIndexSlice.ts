import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { IChart, IChartIndex } from "./interface/interface.config";
import { DataReponseHNX_HSX, IDataSS } from "../indexMarketWatch/interface/slidemarket.config";
interface RootChart {
  SS: any
  Max: number
}
interface IState  {
  isLoading: boolean,
  // dataChartIndex: IChart,
  // dataChartIndexTime: IDataSS,
  dataChartIndex: any,
  dataChartIndexTime: any,
  configChartIndex: string,
  Max: string,
  timeGet: string,
  status: string,
}
const initialState: IState = {
  isLoading: false,
  dataChartIndex: {} as IChart,
  dataChartIndexTime: {
    Max: 0,
    SS: null
  },
  configChartIndex: "",
  Max: "",
  timeGet:'',

  status: "loading",
};
export const fetchChartIndexAsync = createAsyncThunk(
  "chartIndex",
  async () => {
    try {
      const data = await agent.chartIndex.get();
      return data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
export const fetchConfigChartIndexAsync = createAsyncThunk(
  "ConfigchartIndex",
  async () => {
    try {
      const data = await agent.chartIndex.getSS();
      const regex = /var\s+g_CHART_MAX_INDEX_SS\s*=\s*'([^']+)'/;
      const match = data.match(regex);
      return match[1];
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
export const fetchChartIndexTimeAsync = createAsyncThunk(
  "chartIndexTime",
  async (dataChartIndex:any) => {
    try {
      const data = await agent.chartIndex.getTimeSS(dataChartIndex);
      return data.data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
export const fetchChartIndexCDTAsync = createAsyncThunk(
  "chartIndexCDT",
  async (dataCDT:string) => {
    try {
      const data = await agent.chartIndex.getCDT(dataCDT);
      return data;
    } catch (error) {
      console.log("error ở đây", error);
    }
  }
);
const chartIndexSlice = createSlice({
  name: "ChartIndex",
  initialState,
  reducers: {
    setStatusTable: (state, action) => {
      state.dataChartIndex = action.payload;
    },
    setMax: (state, action) => {
      state.dataChartIndex = action.payload;
    },
    setDataChartRealTime:(state,action)=>{
    
          const dataChartTime = action.payload;
          state.dataChartIndexTime = dataChartTime;
          // state.configChartIndex = dataChartTime.Max.toString();
          console.log(state.dataChartIndexTime)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartIndexAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchChartIndexAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.dataChartIndex = action.payload;
      })
      .addCase(fetchConfigChartIndexAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchConfigChartIndexAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.configChartIndex = action.payload;
      })
      .addCase(fetchChartIndexCDTAsync.pending, (state) => {
        state.isLoading = false;
        state.status = "loading";
      })
      .addCase(fetchChartIndexCDTAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.timeGet = action.payload;
      })
      // .addCase(fetchChartIndexTimeAsync.pending, (state) => {
      //   state.isLoading = false;
      //   state.status = "loading";
      // })
      // .addCase(fetchChartIndexTimeAsync.fulfilled, (state, action) => {
      //   state.isLoading = true;
      //   const dataChartTime = action.payload;
      //   if(dataChartTime)
      //   if(dataChartTime?.SS !== null){
      //     state.dataChartIndexTime = dataChartTime;
      //     state.configChartIndex = dataChartTime.Max;
      //   }
      // });
  },
});

export const { setStatusTable ,setDataChartRealTime} = chartIndexSlice.actions;
export default chartIndexSlice;
