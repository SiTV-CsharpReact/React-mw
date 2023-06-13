export interface chartIndex {
    HSX: Hsx
    HNX: Hnx
    IsWorkingDay: string
  }
  
  export interface Hsx {
    LastIndex: LastIndex
    DataFull: DataFull
  }
  
  export interface LastIndex {
    TradingDate: string
    VNIndex: number
    VNSML: number
    VNMID: number
    VNALL: number
    VN30: number
    VN100: number
    VNXALL: number
  }
  
  export interface DataFull {
    VNIndex: Vnindex[]
    VN30: Vn30[]
    VN100: Vn100[]
    VNALL: Vnall[]
    VNMID: Vnmid[]
    VNSML: Vnsml[]
    VNXALL: Vnxall[]
  }
  
  export interface Vnindex {
    Time: string
    Data: Data
  }
  
  export interface Data {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Vn30 {
    Time: string
    Data: Data2
  }
  
  export interface Data2 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Vn100 {
    Time: string
    Data: Data3
  }
  
  export interface Data3 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Vnall {
    Time: string
    Data: Data4
  }
  
  export interface Data4 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Vnmid {
    Time: string
    Data: Data5
  }
  
  export interface Data5 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Vnsml {
    Time: string
    Data: Data6
  }
  
  export interface Data6 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Vnxall {
    Time: string
    Data: Data7
  }
  
  export interface Data7 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnx {
    LastIndex: LastIndex2
    DataFull: DataFull2
  }
  
  export interface LastIndex2 {
    HNX30: number
    HNX30TRI: number
    HNXCon: number
    HNXFin: number
    HNXIndex: number
    HNXLCap: number
    HNXMSCap: number
    HNXMan: number
    HNXUpcomIndex: number
    HNXUPCoMPremium: number
  }
  
  export interface DataFull2 {
    HNX30: Hnx30[]
    HNX30TRI: any[]
    HNXCon: Hnxcon[]
    HNXFin: Hnxfin[]
    HNXIndex: Hnxindex[]
    HNXLCap: Hnxlcap[]
    HNXMSCap: Hnxmscap[]
    HNXMan: Hnxman[]
    HNXUpcomIndex: HnxupcomIndex[]
    HNXUPCoMPremium: any[]
  }
  
  export interface Hnx30 {
    Time: string
    Data: Data8
  }
  
  export interface Data8 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnxcon {
    Time: string
    Data: Data9
  }
  
  export interface Data9 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnxfin {
    Time: string
    Data: Data10
  }
  
  export interface Data10 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnxindex {
    Time: string
    Data: Data11
  }
  
  export interface Data11 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnxlcap {
    Time: string
    Data: Data12
  }
  
  export interface Data12 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnxmscap {
    Time: string
    Data: Data13
  }
  
  export interface Data13 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface Hnxman {
    Time: string
    Data: Data14
  }
  
  export interface Data14 {
    TimeJS: number
    Index: number
    Vol: number
  }
  
  export interface HnxupcomIndex {
    Time: string
    Data: Data15
  }
  
  export interface Data15 {
    TimeJS: number
    Index: number
    Vol: number
  }
  