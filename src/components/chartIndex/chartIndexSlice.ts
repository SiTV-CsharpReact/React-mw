import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { IChartIndex, IHNX, IHSX, IState } from "./interface/interface.config";
import { IDataSS } from "../indexMarketWatch/interface/slidemarket.config";

export const Data_HSX: IHSX = {
  LastIndex: {
    TradingDate: "",
    VN30: 0,
    VN100: 0,
    VNALL: 0,
    VNIndex: 0,
    VNMID: 0,
    VNSML: 0,
    VNXALL: 0,
  },
  DataFull: {
    VN30: [],
    VN100: [],
    VNALL: [],
    VNIndex: [],
    VNMID: [],
    VNSML: [],
    VNXALL: [],
  },
};
export const Data_HNX: IHNX = {
  LastIndex: {
    HNX30: 0,
    HNX30TRI: 0,
    HNXCon: 0,
    HNXFin: 0,
    HNXIndex: 0,
    HNXLCap: 0,
    HNXMSCap: 0,
    HNXMan: 0,
    HNXUPCoMPremium: 0,
    HNXUpcomIndex: 0,
    TradingDate: "",
  },
  DataFull: {
    HNX30: [],
    HNX30TRI: [],
    HNXCon: [],
    HNXFin: [],
    HNXIndex: [],
    HNXLCap: [],
    HNXMSCap: [],
    HNXMan: [],
    HNXUPCoMPremium: [],
    HNXUpcomIndex: [],
  },
};

const initialState: IState = {
  isLoading: false,
  dataChartIndex: {
    HNX: Data_HNX,
    HSX: Data_HSX,
    IsWorkingDay: "",
  },
  dataChartIndexTime: {
    Max: 0,
    SS: null,
  },
  configChartIndex: "",
  Max: "",
  timeGet: "",

  status: "loading",
};
export const fetchChartIndexAsync = createAsyncThunk("chartIndex", async () => {
  try {
    const data = await agent.chartIndex.get();
    return data;
  } catch (error) {
    console.log("error ở đây", error);
  }
});
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
  async (dataChartIndex: any) => {
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
  async (dataCDT: string) => {
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
    setStatusTable: (state, action: PayloadAction<IChartIndex>) => {
      state.dataChartIndex = action.payload;
    },
    // setMax: (state, action) => {
    //   state.dataChartIndex = action.payload;
    // },
    setDataChartRealTime: (state, action: PayloadAction<IDataSS>) => {
      const dataChartTime = action.payload;
      state.dataChartIndexTime = dataChartTime;
      state.configChartIndex = dataChartTime.Max.toString();
    },
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
      });
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

export const { setStatusTable, setDataChartRealTime } = chartIndexSlice.actions;
export default chartIndexSlice;
