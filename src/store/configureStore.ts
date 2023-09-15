import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { tableSlice } from "../components/tableMarketwatch/tableSlice";
import menuSlice from "../components/menuBarMW/menuSlice";
import chartMarketwatchSlice from "../components/chartMarketwatch/chartMarketwatchSlice";
import companySlice from "../components/companyMarketwatch/companyMarketwatchSlice";
import popupTableSlice from "../components/popupTableMarketwatch/popupTableSlice";
import codeListSlice from "../components/menuBarMW/codeListSlice";
import danhmucSlice from "../components/menuBarMW/danhmucSlice";
import ministrySlice from "../components/menuBarMW/ministrySlice";
import { marketHSXSlice } from "../components/indexMarketWatch/marketHSXSlice";
import settingMarketWatchSlice from "../components/indexMarketWatch/marketShowSlice";
import marketHNXSlice from "../components/indexMarketWatch/marketHNXSlice";
import assetReportSlice from "../components/AssetReport/AssetReportSlice";
import OrderComanSlice from "../components/tableMarketwatch/orderComanSlice";
// import {tableBuy} from '../components/tableMarketwatch/tableBuy';
import changeThemeModeSlice from "../components/header/DarkModeSlice";
import LayoutMarketWatchSLice from "../components/layoutMarketwatch/LayoutMarketWatchSLice";
import { tableTestSlice } from "../components/tableMarketwatch/tableTestSlice";
import { dataSliceShow } from "../components/orderFormMarketwatch/data";
import statusTableMWSlice from "../components/chartMarketwatch/statusTableSlice";
import chartIndexSlice from "../components/chartIndex/chartIndexSlice";
import { dataSliceThongke } from "../components/tableMarketwatch/helper/tableFormThongke";
import RespportSlice from "../pages/Report/ResportSlice";
import TransferSlice from "../pages/Transfer/TransferSlice";
import chartOptionSlice from "../components/tablePopupMarketwatch/chartOptionSlice";
import dataTablePopupDetail from "../components/tablePopupMarketwatch/dataTablePopupDetailSlice";
import stoplossSlice from "../pages/Stoploss/stoplossSlice";
import clientBalanceSlice from "../components/orderFormMarketwatch/ClientBalance";
import ProfileAccountSlice from "../components/header/ProfileAccountSlice";
import SendOrderSlice, { SendOrder } from "../components/orderFormMarketwatch/SendOrderSlice";
import screenSizeSlice from "../components/layoutMarketwatch/ScreenSize";

export const store = configureStore({
  reducer: {
    //trang chủ marketwatch
    // layout
    // Authen : AuthenCationSlice.reducer,
    layout: LayoutMarketWatchSLice.reducer,
    // Get danh sách công ty để map với stockcode
    company: companySlice.reducer,
    // Get Data Table market watch
    table: tableSlice.reducer,
    // show hide chart
    chart: chartMarketwatchSlice.reducer,
    // Popup theo mã
    popupTable: popupTableSlice.reducer,
    // code list khi click danh mục
    codeList: codeListSlice.reducer,
    // list menu danh mục
    categories: danhmucSlice.reducer,
    // list mã nghành
    ministry: ministrySlice.reducer,
    // Get data Index của sàn hsx
    marketHSX: marketHSXSlice.reducer,
    // Get data Index của sàn hnx
    marketHNX: marketHNXSlice.reducer,
    // cài đặt giao diện trang marketwatch
    settingMarketwatch: settingMarketWatchSlice.reducer,
    // screen màn hình 
    screenSize: screenSizeSlice.reducer,
    //báo cáo tài sản
    assetReport: assetReportSlice.reducer,
    //
   
    dataThongke: dataSliceThongke.reducer,
    orderComan :  OrderComanSlice.reducer,
 
    //set status show table chart
    statusTable: statusTableMWSlice.reducer,

    // change theme
    settingColorMode: changeThemeModeSlice.reducer,
    // menu bar
    menuBar: menuSlice.reducer,
    // table test
    tableTest: tableTestSlice.reducer,

    dataShow: dataSliceShow.reducer,
    // chart index
    chartIndex: chartIndexSlice.reducer,
    // chart option
    chartOption: chartOptionSlice.reducer,

    dataApi: dataSliceShow.reducer,
    dataApiPendingOder: dataSliceShow.reducer,

    report: RespportSlice.reducer,
    transfer: TransferSlice.reducer,

    dataPopupDetail: dataTablePopupDetail.reducer,
    stoploss :stoplossSlice,
    clientBalance: clientBalanceSlice.reducer,
    ProfileAccount: ProfileAccountSlice.reducer,
     SendOrder: SendOrderSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
