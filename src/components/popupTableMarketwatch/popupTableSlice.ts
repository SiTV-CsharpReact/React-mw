import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    visible: boolean;
    code: string;
}

const initialState: ComponentState = {
  visible: false,
  code: '',
};
const popupTableSlice = createSlice({
    name: 'DetailStock',
    initialState,
    reducers: {
        showDetailStock: (state, action: PayloadAction<string>) => {
            state.visible = !state.visible;
            state.code = action.payload;
            console.log( action.payload)
          },
   
    },
    
});

export const { showDetailStock} = popupTableSlice.actions;
export default popupTableSlice;