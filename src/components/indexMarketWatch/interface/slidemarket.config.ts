import { IChartIndex } from "../../chartIndex/interface/interface.config";

export interface ISlideMarket {
  id: string[];
  name: string;
  valueChange: string;
  valueChangePercent: string;
  valueIndexChange: string;
  visible: boolean;
  valueTotalSharesAOM: string;
  valueTotalValuesAOM: string;
  valueUp: string;
  valueCeiling: string;
  valueDown: string;
  valueFloor: string;
  valueNoChange: string;
  status: string;
  san: string;
  dataChartIndex?: IChartIndex;
  dataChartIndexTime?: IChartIndex;
}

export interface IACTION_LIST {
  GET_SS: string;
  GET_CDT: string;
}

export interface IRP {
  s: string;
  m: string;
}

export interface IDataCDT {
  IsBreakingTime: boolean;
  IsStartingTime: boolean;
  IsWorkingDay: boolean;
  IsWorkingTime: boolean;
  LoadRedis: boolean;
  Now: string;
}

export interface IDataSS {
  Max: number;
  SS: null | DataReponseHNX_HSX[];
}

export interface DataReponseHNX_HSX {
  HNX: HNX,
  HSX: HSX
}

export interface HNX {
  HNX30: IDataHNX_HSX[];
  HNX30TRI: IDataHNX_HSX[];
  HNXCon: IDataHNX_HSX[];
  HNXFin: IDataHNX_HSX[];
  HNXIndex: IDataHNX_HSX[];
  HNXLCap: IDataHNX_HSX[];
  HNXMSCap: IDataHNX_HSX[];
  HNXMan: IDataHNX_HSX[];
  HNXUPCoMPremium: IDataHNX_HSX[];
  HNXUpcomIndex: IDataHNX_HSX[];
}

export interface HSX {
  VN30: IDataHNX_HSX[];
  VN100: IDataHNX_HSX[];
  VNALL: IDataHNX_HSX[];
  VNIndex: IDataHNX_HSX[];
  VNMID: IDataHNX_HSX[];
  VNSML: IDataHNX_HSX[];
  VNXALL: IDataHNX_HSX[];
}

export interface IDataHNX_HSX {
  Time?: string;
  Data?: {
    Index?: number;
    TimeJS?: number;
    Vol?: number;
  };
}
