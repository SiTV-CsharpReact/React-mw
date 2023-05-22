import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    visible: boolean;
    code: string;
  }
  
  const initialState: ComponentState = {
    visible: false,
    code: '',
  };
const chartMarketwatchSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        showChartMarketwatch: (state, action: PayloadAction<string>) => {
            state.visible = !state.visible ;
            state.code = action.payload;
            console.log( action.payload)
          },
          // hideChartMarketwatch: (state) => {
          //   state.visible = false;
          //   state.code = '';
          // },
    },
});

export const { showChartMarketwatch  } = chartMarketwatchSlice.actions;
export default chartMarketwatchSlice;