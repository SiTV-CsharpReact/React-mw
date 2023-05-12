import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface ComponentState {
    codeList: string;
  }
  
  const initialState: ComponentState = {
    codeList: '',
  };
const codeListSlice = createSlice({
    name: 'CodeListStock',
    initialState,
    reducers: {
        listStock: (state, action: PayloadAction<string>) => {
            state.codeList = action.payload;       
          },
   
    },
    
});

export const { listStock} = codeListSlice.actions;
export default codeListSlice;