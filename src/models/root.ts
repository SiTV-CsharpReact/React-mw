export interface Root {
  Code: number;
  Message: string;
  Data: ICompany[];
}

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
