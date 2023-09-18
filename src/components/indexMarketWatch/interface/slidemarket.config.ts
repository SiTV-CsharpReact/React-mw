import { ObjectMenuHNX, ObjectMenuHSX } from "../../../models/modelListMenuHSX";
import { IReturn_Data } from "./interface.RenderSlideMarket";

// status when api return
export type TStatus = "idle" | "loading" | "success" | "failed";

export interface ISlideMarket extends IReturn_Data {}

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
  SS: DataReponseHNX_HSX[] | null;
}

export interface DataReponseHNX_HSX {
  HNX: HNX;
  HSX: HSX;
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
  Time: string;
  Data: {
    Index: number;
    TimeJS: number;
    Vol: number;
  };
}

//interace initialState for redux
export interface IState_SlideMarket {
  isLoadingMarket: boolean;
  statusMarket: TStatus;
}

export interface IState_SlideMarket_HSX extends IState_SlideMarket {
  marketHSX: ObjectMenuHSX;
}

export interface IState_SlideMarket_HNX extends IState_SlideMarket {
  marketHNX: ObjectMenuHNX;
}

export interface IIndex {
  VNXALL: boolean;
  VNI: boolean;
  VN30: boolean;
  VN100: boolean;
  VNMID: boolean;
  VNSML: boolean;
  VNALL: boolean;
  HNX: boolean;
  HNX30: boolean;
  HNXLCAP: boolean;
  HNXSMCAP: boolean;
  HNXFIN: boolean;
  HNXMAN: boolean;
  HNXCON: boolean;
  UPCOM: boolean;
  cbcol4: boolean;
  cbcol20: boolean;
  cbcol25: boolean;
  cbcol28: boolean;
  cbcol22: boolean;
  cbcol23: boolean;
  cbcol24: boolean;
  cbcol26: boolean;
  cbcol27: boolean;
  smart_symbol_up: boolean;
  smart_symbol_down: boolean;
  prior_textbox_priceF: boolean;
  prior_textbox_qtyF: boolean;
}

