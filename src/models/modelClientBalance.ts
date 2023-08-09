export interface ClientBalance {
    Code: number
    Message: string
    Data: DataClientBalance
  }
  
  export interface DataClientBalance {
    Table: TableClientBalance[]
  }
  
  export interface TableClientBalance {
    ACLIENTCODE: string
    ACASHDEPOSITED: number
    ALEDGERBALANCE: number
    ACASHADVANCE: number
    AADHOCCASH: number
    AMARGINPRO: number
    ACASHTRADING: number
    ACASHMARGIN: number
    ACASHUSED: number
    ACASHFEE: number
    ACASHTRANSFER: number
    ADEBT: number
    AFSAVING: number
    TIENMAT: number
    AVAIL_TRADINGCASH: number
    AVAIL_STOCKVAL: number
    AVAIL_TRANSFER: number
    REMAININGQUOTA: number
    AVAIL_PLK: number
    AVAIL_FSAVING: number
    AMARPRODEBT: number
    ACASHHOLDINGBUY: number
  }
  