import { IDataSS } from "../../indexMarketWatch/interface/slidemarket.config";

export interface IData {
  Time: string;
  Data: {
    Index: number;
    TimeJS: number;
    Vol: number;
  };
}

export interface IDataFullHNX {
  HNX30: IData[];
  HNX30TRI: IData[];
  HNXCon: IData[];
  HNXFin: IData[];
  HNXIndex: IData[];
  HNXLCap: IData[];
  HNXMSCap: IData[];
  HNXMan: IData[];
  HNXUPCoMPremium: IData[];
  HNXUpcomIndex: IData[];
}

export interface IHNX {
  LastIndex: {
    HNX30: number;
    HNX30TRI: number;
    HNXCon: number;
    HNXFin: number;
    HNXIndex: number;
    HNXLCap: number;
    HNXMSCap: number;
    HNXMan: number;
    HNXUPCoMPremium: number;
    HNXUpcomIndex: number;
    TradingDate?: string;
  };
  DataFull: IDataFullHNX;
}

export interface IHSX {
  LastIndex: {
    TradingDate?: string;
    VN30: number;
    VN100: number;
    VNALL: number;
    VNIndex: number;
    VNMID: number;
    VNSML: number;
    VNXALL: number;
  };
  DataFull: IDataFullHSX;
}

export interface IDataFullHSX {
  VN30: IData[];
  VN100: IData[];
  VNALL: IData[];
  VNIndex: IData[];
  VNMID: IData[];
  VNSML: IData[];
  VNXALL: IData[];
}


export interface IChartIndex {
  HSX: IHSX;
  HNX: IHNX;
  IsWorkingDay: string;
}

// setup initialState for redux
export interface IState {
  isLoading: boolean;
  dataChartIndex: IChartIndex;
  dataChartIndexTime: IDataSS;
  configChartIndex: string;
  Max: string;
  timeGet: string;
  status: string;
}