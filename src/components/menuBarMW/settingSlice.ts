import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface ComponentState {
    name: string;
  }
  const initialState = {
    data : []
  };
const settingSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        addTable: (state, action) => {
            const task = action.payload;
            return {
                ...state,
                data: task
            }
        }
        // showTableWithSetting: (state, action: PayloadAction<string>) => {
        //     state.visible = !action.payload;
        //     console.log( action.payload)
        //   },
          
    },
});

export const { addTable } = settingSlice.actions;
export default settingSlice;