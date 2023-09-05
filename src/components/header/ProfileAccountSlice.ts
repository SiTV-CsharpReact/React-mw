import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { PermissionData, SessionData } from "../../models/permission";

export const fetchProfileAccount = createAsyncThunk(
  "account/profileAccount",
  async () => {
    const response = await agent.Account.get();
    return response as SessionData;
  }
);

export const fetchPermission = createAsyncThunk(
  "trade/fetchPermission",
  async () => {
    const responsePermission = await agent.Permission.get();
    return responsePermission as PermissionData;
  }
);

export const ProfileAccountSlice = createSlice({
  name: "profileAccount",
  initialState: {
    isLoading: false,
    profileAccount: {} as any,
    LoginName: "",
    ClientName: "",
    Permission: {} as PermissionData,
    SMS:"",
    Email:"",
    Atransaction:0,
    EzTrade: 0,
    EzTransfer: 0,
    EzAdvance: 0,
    EzMargin: 0,
    EzMortgage: 0,
    EzOddlot: 0,
    EzMarginPro: 0,
    EzFuture: 0,
    EzTvdt: 0,
    vFeeUP: 0,
    vFeeUP_CCQ: 0,
    vFeeLISTED_CP: 0,
    vFeeLISTED_ETF: 0,
    vFeeHSX_CP: 0,
    vFeeHSX_CCQ: 0,
    vFeeHSX_ETF: 0,
    vFeeHSX_CQ: 0,
    vFeeRate_TP: 0, //Phí đối với  Trái Phiếu
    EzTradeChargeRate: 0,
    statusAccount: 1,
    OTPVerifed: 0,
    status: "idle",
  },
  reducers: {
    setProfileAccount: (state, action) => {
      state.profileAccount = action.payload;
    },
    setOTPVerified: (state, action) => {
      state.OTPVerifed = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileAccount.fulfilled, (state, action) => {
        state.isLoading = true;
        state.status = "success";
        state.profileAccount = action.payload.LoginName !== undefined ? action.payload.LoginName : null;
        state.LoginName = action.payload.LoginName !== undefined ? action.payload.LoginName : "";
        state.ClientName = action.payload.ClientName !== undefined ? action.payload.ClientName : "";
        state.SMS = action.payload.SMS !== undefined ? action.payload.SMS : "";
        state.Email = action.payload.Email !== undefined ? action.payload.Email : "";
        state.Atransaction = action.payload.ATRANSACTION !== undefined ? action.payload.ATRANSACTION : 0;
        state.OTPVerifed =action.payload.OTPVerifed !== undefined ? action.payload.OTPVerifed : 0
        // state.Email = action.payload?.ClientName;
      })
      .addCase(fetchProfileAccount.rejected, (state) => {
        state.isLoading = true;
        state.status = "failed";
      })
      .addCase(fetchPermission.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.isLoading = true;
        state.status = "success";
        state.Permission = action.payload;
        state.vFeeUP = action.payload.vFeeUP !== undefined ? action.payload.vFeeUP/1000 : 0;
        state.vFeeUP_CCQ = action.payload.vFeeUP_CCQ !== undefined ? action.payload.vFeeUP_CCQ/10000 : 0;
        state.vFeeLISTED_CP = action.payload.vFeeLISTED_CP !== undefined ? action.payload.vFeeLISTED_CP/10000 : 0;
        state.vFeeLISTED_ETF = action.payload.vFeeLISTED_ETF !== undefined ? action.payload.vFeeLISTED_ETF/10000 : 0;
        state.vFeeHSX_CP = action.payload.vFeeHSX_CP !== undefined ? action.payload.vFeeHSX_CP/10000 : 0;
        state.vFeeHSX_CCQ = action.payload.vFeeHSX_CCQ !== undefined ? action.payload.vFeeHSX_CCQ/10000 : 0;
        state.vFeeHSX_ETF = action.payload.vFeeHSX_ETF !== undefined ? action.payload.vFeeHSX_ETF/10000 : 0;
        state.vFeeHSX_CQ = action.payload.vFeeHSX_CQ !== undefined ? action.payload.vFeeHSX_CQ/10000 : 0;
        state.vFeeRate_TP = action.payload.vFeeRate_TP !== undefined ? action.payload.vFeeRate_TP/10000 : 0;
        state.EzTradeChargeRate = action.payload.EzTradeChargeRate !== undefined ? action.payload.EzTradeChargeRate : 0;
        state.EzTrade =action.payload.EzTrade !== undefined ? action.payload.EzTrade : 0;
        if (action.payload.EzTrade === 1 && action.payload.EzMargin === 0) {
          state.statusAccount = 1; // tk thường
        } else if (action.payload.EzMargin === 1) {
          state.statusAccount = 2; // tk margin
        } else if (action.payload.EzMarginPro === 2) {
          state.statusAccount = 3; // tk margin pro
        }
      })
      .addCase(fetchPermission.rejected, (state) => {
        state.isLoading = true;
        state.status = "failed";
      });
  },
});

export const { setProfileAccount ,setOTPVerified} = ProfileAccountSlice.actions;

export default ProfileAccountSlice;
