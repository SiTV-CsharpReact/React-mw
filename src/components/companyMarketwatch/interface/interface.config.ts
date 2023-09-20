export interface ICompany {
  Code: string;
  Exchange: number;
  ScripName: string;
  Basic_Price: number;
  Ceiling_Price: number;
  Floor_Price: number;
  Stock_Type2: number;
  ScripNameEN: string;
  ID: string;
}

export interface IState extends IDataCompany_Response {
  status: number;
  dataDetail: null;
  productsLoaded: boolean;
}

export interface IDataCompany_Response {
  dataCompanyTotal: ICompany[];
  dataCompanyUpcom: ICompany[];
  dataCompanyHNX: ICompany[];
  dataCompanyHSX: ICompany[];
}
