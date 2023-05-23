import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface ComponentState {
    visible: any;
  }
const initialState = {
    visible:false
}
  
const settingMarket = createSlice({
    name: 'component',
    initialState,
    reducers: {
        showTableWithSetting: (state, action: PayloadAction<string>) => {
            state.visible = !action.payload;
            console.log( action.payload)
          },
          
    },
});

export const { showTableWithSetting} = settingMarket.actions;
export default settingMarket;