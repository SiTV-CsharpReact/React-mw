import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import {
  IHNX_DATA,
  IHSX_DATA,
  IChartIndex,
  IState,
} from "./interface/interface.config";
import { IDataSS } from "../indexMarketWatch/interface/slidemarket.config";

const HSX: IHSX_DATA = {
  DataFull: {
    VN100: [],
    VN30: [],
    VNALL: [],
    VNIndex: [],
    VNMID: [],
    VNSML: [],
    VNXALL: [],
  },
  LastIndex: {
    VN100: 0,
    VN30: 0,
    VNALL: 0,
    VNIndex: 0,
    VNMID: 0,
    VNSML: 0,
    VNXALL: 0,
    TradingDate: "",
  },
};

const HNX: IHNX_DATA = {
  DataFull: {
    HNX30: [],
    HNX30TRI: [],
    HNXCon: [],
    HNXFin: [],
    HNXIndex: [],
    HNXLCap: [],
    HNXMan: [],
    HNXMSCap: [],
    HNXUpcomIndex: [],
    HNXUPCoMPremium: [],
  },
  LastIndex: {
    HNX30: 0,
    HNX30TRI: 0,
    HNXCon: 0,
    HNXFin: 0,
    HNXIndex: 0,
    HNXLCap: 0,
    HNXMan: 0,
    HNXMSCap: 0,
    HNXUpcomIndex: 0,
    HNXUPCoMPremium: 0,
    TradingDate: "",
  },
};

const DataRealTime: IDataSS = {
  Max: 0,
  SS: null,
};
const initialState: IState = {
  isLoading: false,
  dataChartIndex: {
    HNX: HNX,
    HSX: HSX,
    IsWorkingDay: "",
  },
  dataChartIndexTime: DataRealTime,
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
      if (dataChartTime.SS !== null) {
        dataChartTime.SS.forEach((item) => {
          if (item.HSX.VNXALL.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VNXALL =
              state.dataChartIndex.HSX.DataFull.VNXALL.concat(item.HSX.VNXALL);
          }
          if (item.HSX.VNIndex.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VNIndex =
              state.dataChartIndex.HSX.DataFull.VNIndex.concat(
                item.HSX.VNIndex
              );
          }
          if (item.HSX.VN30.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VN30 =
              state.dataChartIndex.HSX.DataFull.VN30.concat(item.HSX.VN30);
          }
          if (item.HSX.VNALL.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VNALL =
              state.dataChartIndex.HSX.DataFull.VNALL.concat(item.HSX.VNALL);
          }
          if (item.HSX.VN100.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VN100 =
              state.dataChartIndex.HSX.DataFull.VN100.concat(item.HSX.VN100);
          }
          if (item.HSX.VNSML.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VNSML =
              state.dataChartIndex.HSX.DataFull.VNSML.concat(item.HSX.VNSML);
          }
          if (item.HSX.VNMID.length !== 0) {
            state.dataChartIndex.HSX.DataFull.VNMID =
              state.dataChartIndex.HSX.DataFull.VNMID.concat(item.HSX.VNMID);
          }
          if (item.HNX.HNX30.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNX30 =
              state.dataChartIndex.HNX.DataFull.HNX30.concat(item.HNX.HNX30);
          }
          if (item.HNX.HNXCon.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXCon =
              state.dataChartIndex.HNX.DataFull.HNXCon.concat(item.HNX.HNXCon);
          }
          if (item.HNX.HNXFin.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXFin =
              state.dataChartIndex.HNX.DataFull.HNXFin.concat(item.HNX.HNXFin);
          }
          if (item.HNX.HNXIndex.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXIndex =
              state.dataChartIndex.HNX.DataFull.HNXIndex.concat(
                item.HNX.HNXIndex
              );
          }
          if (item.HNX.HNXLCap.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXLCap =
              state.dataChartIndex.HNX.DataFull.HNXLCap.concat(
                item.HNX.HNXLCap
              );
          }
          if (item.HNX.HNXMSCap.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXMSCap =
              state.dataChartIndex.HNX.DataFull.HNXMSCap.concat(
                item.HNX.HNXMSCap
              );
          }
          if (item.HNX.HNXMan.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXMan =
              state.dataChartIndex.HNX.DataFull.HNXMan.concat(item.HNX.HNXMan);
          }
          if (item.HNX.HNXUpcomIndex.length !== 0) {
            state.dataChartIndex.HNX.DataFull.HNXUpcomIndex =
              state.dataChartIndex.HNX.DataFull.HNXUpcomIndex.concat(
                item.HNX.HNXUpcomIndex
              );
          }
        });
      }
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
