// type status when api return data
export type TStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ICategory {
  RowID: string;
  Text: string;
  Code: string;
  Def: string;
}

export interface IData_Reponse {
  Code: number;
  Msg: string;
  Data: ICategory[];
}
//interface initialState for redux
export interface IState_Category {
  isLoading: number;
  row: null;
  name: null;
  data: IData_Reponse;
  status: TStatus;
}
