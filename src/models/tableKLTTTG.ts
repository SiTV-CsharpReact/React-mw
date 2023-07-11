export interface TableKLTTG {
  Header: Header;
  Body: Body[];
}

export interface Header {
  MaxScore: string;
}

export interface Body {
  MT: string;
  MQ: number;
  MP: number;
  TQ: number;
}
export interface TableGDLL {
  T: string;
  S: string;
  BP1: number;
  BQ1: number;
  BP2: number;
  BQ2: number;
  BP3: number;
  BQ3: number;
  SP1: number;
  SQ1: number;
  SP2: number;
  SQ2: number;
  SP3: number;
  SQ3: number;
}
