export interface MinistriesMarketwatch {
    Code: number
    Message: string
    Data: Data
  }
  
  export interface Data {
    Time: string
    Data: Ministry[]
  }
  
  export interface Ministry {
    MinistryID: number
    MinistryName: string
    MinistryNameEN: string
    Stock_Code: string
  }
  