export interface CategoriesMarketWatch {
    Code: number
    Message: string
    Data: Category[]
  }
  
  export interface Category {
    Score: string
    Name: string
    List: string
    Row: string
    Default_MarketWatch: string
    UserAgent: any
  }
  export interface CategoriesMarketWatchs {
    Code: number
    Message: string
    Data: ICategory[]
  }
  
  export interface ICategory {
    RowID: string
    Text: string
    Code: string
    Def: string
  }
  