
export const RowDataIndex = {
    RowID: String,
    MCK: 0,
    TC: 1,
    Tran: 2,
    San: 3,
    KL4: 4,
    G3: 5,
    KL3: 6,
    G2: 7,
    KL2: 8,
    G1: 9,
    KL1: 10,
    GiaKhop: 11,
    KLKhop: 12,
    Chenhlech: 13,
    G1B: 14,
    KL1B: 15,
    G2B: 16,
    KL2B: 17,
    G3B: 18,
    KL3B: 19,
    KL4B: 20,
    TKL: 21,
    MOC: 22,
    CaoNhat: 23,
    ThapNhat: 24,
    GTB: 25,
    NNMua: 26,
    NNBan: 27,
    RoomCL: 28,
    GDK: 29,
    Quyen: 30,
    CGKGN: 31,

  };

  export type RowData = {
    RowID: string;
    MCK: string;
    TC: string;
    Tran: string;
    San: string;
    KL4: string;
    G3: string;
    KL3: string;
    G2: string;
    KL2: string;
    G1: string;
    KL1: string;
    GiaKhop: string;
    KLKhop: string;
    Chenhlech: string;
    G1B: string;
    KL1B: string;
    G2B: string;
    KL2B: string;
    G3B: string;
    KL3B: string;
    KL4B: string;
    TKL: string;
    MOC: string;
    CaoNhat: string;
    ThapNhat: string;
    GTB: string;
    NNMua: string;
    NNBan: string;
    RoomCL: string;
    GDK: string;
    Quyen: string;
    CGKGN: string;
  
    isPined: boolean;
  };
  export type Row = {
    index: number;
    data :  RowData
  }
  export type tesstasss = [
    name : string,
    age : number,
    address : string,
  ]