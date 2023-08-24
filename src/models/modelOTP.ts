export interface ModelDataOTP {
    Code: number
    Message: string
    Data: ModelOTP
  }
  
  export interface ModelOTP {
    LoginName: string
    ErrorCode: number
    Message: string
    TimeExpire: string
    TimeReSend: string
    CodeOTP: any
    CountOtpFalse: number
    TimeServer: string
  }
  