import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { ObjectMenuHSX } from '../../models/modelListMenuHSX';

export const fetchAsyncHSX = createAsyncThunk('market/fetchMarket',async () => {
    const resHSX = await axios.get(
          `http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`
    );
    return resHSX.data;
})

export const marketHSXSlice = createSlice({
    name: 'market_fetchmarket',
    initialState: {
        valueHSX: {} as ObjectMenuHSX,
        statrMarket:'idle'
    },
    reducers: {
        getDataHSX: (state,action) => {
            state.valueHSX = action.payload;
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchAsyncHSX.pending, state => {
            state.statrMarket = 'loading';
        }).addCase(fetchAsyncHSX.fulfilled, (state,action) => {
            state.statrMarket = 'success';
            state.valueHSX=action.payload
        }).addCase(fetchAsyncHSX.rejected, (state, action) => {
            state.statrMarket='failed';
        })
    },
})

export const { getDataHSX } = marketHSXSlice.actions

export default marketHSXSlice;