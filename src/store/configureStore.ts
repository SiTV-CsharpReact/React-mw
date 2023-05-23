import {configureStore} from '@reduxjs/toolkit'
import { counterSlice } from '../components/orderFormMarketwatch/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { tableSlice } from '../components/tableMarketwatch/tableSlice';
import menuSlice from '../components/menuBarMW/menuSlice';
import LayoutMarketWatchSLice from '../components/layoutMarketwatch/LayoutMarketWatchSLice';
import chartMarketwatchSlice from '../components/chartMarketwatch/chartMarketwatchSlice';
import companySlice from '../components/companyMarketwatch/companyMarketwatchSlice';
import popupTableSlice from '../components/popupTableMarketwatch/popupTableSlice';
import codeListSlice from '../components/menuBarMW/codeListSlice';
import danhmucSlice from '../components/menuBarMW/danhmucSlice';
import ministrySlice from '../components/menuBarMW/ministrySlice';
import settingSlice from '../components/menuBarMW/settingSlice';
import marketHSXSlice from '../components/indexMarketWatch/marketHSXSlice';

export const store = configureStore({
    reducer:{
        company:companySlice.reducer,
        counter:counterSlice.reducer,
        table:tableSlice.reducer,
        menu:menuSlice.reducer,
        layoutmarketwatch: LayoutMarketWatchSLice.reducer,
        chart:chartMarketwatchSlice.reducer,
        popupTable:popupTableSlice.reducer,
        codeList:codeListSlice.reducer,
        categories:danhmucSlice.reducer,
        ministry: ministrySlice.reducer,
        settingTable: settingSlice.reducer,
        marketHSX:marketHSXSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =useSelector;