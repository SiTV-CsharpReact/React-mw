export interface News {
  VN: Vn[];
  EN: En[];
}

export interface Vn {
  ID: string;
  ShowDate: string;
  ShowTime: string;
  Title: string;
  Path: string;
}

export interface En {
  ID: string;
  ShowDate: string;
  ShowTime: string;
  Title: string;
  Path: string;
}
