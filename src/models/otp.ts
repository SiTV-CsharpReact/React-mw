export interface RootOTP {
    Code: number
    Message: any
    Data: Data
  }
  
  export interface Data {
    LoginName: string
    ErrorCode: number
    Message: string
  }
  