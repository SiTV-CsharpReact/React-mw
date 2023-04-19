import {configureStore} from '@reduxjs/toolkit'
import { counterSlice } from '../components/orderFormMarketwatch/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { tableSlice } from '../components/tableMarketwatch/tableSlice';
import menuSlice from '../components/menuBarMW/menuSlice';

export const store = configureStore({
    reducer:{
        counter:counterSlice.reducer,
        table:tableSlice.reducer,
        menu:menuSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =useSelector;