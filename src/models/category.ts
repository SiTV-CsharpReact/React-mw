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
  