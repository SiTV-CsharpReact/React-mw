import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    visible?: boolean;
    code: string;
}

const initialState: ComponentState = {
  visible: false,
  code: '',
};
const   popupTableSlice = createSlice({
    name: 'DetailStock',
    initialState,
    reducers: {
        showDetailStock: (state, action: PayloadAction<ComponentState>) => {
            state.visible = action.payload.visible;
            state.code = action.payload.code;
          },
    },
});

export const { showDetailStock} = popupTableSlice.actions;
export default popupTableSlice;