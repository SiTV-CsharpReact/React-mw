import { ObjectMenuHNX, ObjectMenuHSX } from "../../../models/modelListMenuHSX";
import { IIndex } from "../marketShowSlice";

export interface IReturn_Data {
  name: string;
  id: string[];
  valueIndexChange: string;
  valueChange: string;
  valueChangePercent: string;
  visible: boolean;
  valueTotalSharesAOM: string;
  valueTotalValuesAOM: string;
  valueUp: string;
  valueCeiling: string;
  valueNoChange: string;
  valueDown: string;
  valueFloor: string;
  status: string;
  san: string;
  type: boolean;
}

export interface IRecieve_Data {
  name: string;
  marketHNX: ObjectMenuHNX;
  marketHSX: ObjectMenuHSX;
  id: string[];
  visible: boolean;
  san: string;
  type: IIndex;
}

export interface IStock_Data {
  StockIndex: string;
  StockExchange: string;
  className: string[];
}
