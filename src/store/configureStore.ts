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
import { dataSlice } from '../components/tableMarketwatch/tableThunk';
import {tableBuy} from '../components/tableMarketwatch/tableBuy';
export const store = configureStore({
  reducer: {
    // Get danh sách công ty để map với stockcode 
    company: companySlice.reducer,
    // Get Data Table market watch
    table: tableSlice.reducer,
    // 
    menu: menuSlice.reducer,
    // show hide chart 
    chart: chartMarketwatchSlice.reducer,
    // Popup theo mã 
    popupTable: popupTableSlice.reducer,
    codeList: codeListSlice.reducer,
    categories: danhmucSlice.reducer,
    ministry: ministrySlice.reducer,
    // Get data Index của sàn hsx
    marketHSX: marketHSXSlice.reducer,
        // Get data Index của sàn hnx
    marketHNX: marketHNXSlice.reducer,
    // cài đặt giao diện trang marketwatch
    settingMarketwatch: settingMarketWatchSlice.reducer,
    //báo cáo tài sản
        assetReport: assetReportSlice.reducer,
    
         dataTable: dataSlice.reducer,
         dataBuy:tableBuy.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
