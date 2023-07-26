import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCoookieStorage } from "../../api/authen";
import agent from "../../api/agent";
type typevalue =  {
    DataAuthencation: any,
    token :any,
    isLoadingToken:number 
}
    export const LoginUser = createAsyncThunk("Authen-login", async(query:any)=>{
        try {
            const data = await agent.Authen.login(query)
        } catch (error) {
            
        }
    })

const  initialState : typevalue={
    DataAuthencation: "",
    token:null ,
    isLoadingToken: 0
}
const AuthenCationSlice = createSlice({
        name: "Authen",
        initialState,
        reducers : {
                getToken :(state)=>{
                    let token = getCoookieStorage()
                    if(token){
                        state.isLoadingToken = 1
                    }else{
                        state.isLoadingToken = 2  
                    }
                    state.token = token
                }
        }
})
export const {getToken} = AuthenCationSlice.actions
export default  AuthenCationSlice