import { createSlice } from '@reduxjs/toolkit';
import { TableParams } from '../../models/modelLinkTable';
interface TableState {
  productsLoaded: boolean;
  table: {};
  productParams: TableParams;
  status: string; //metaData:MetaData | null;
}
function getAxiosParams(tableParams: TableParams) {
  const params = new URLSearchParams();


  if (tableParams.s) params.append("s", tableParams.s?.toString());

  if (tableParams.l) params.append("l", tableParams.l?.toString());

  return params;
}
interface ComponentState {
    statusChart: boolean;
  }
  
  const initialState: ComponentState = {
    statusChart: true,
  };
const menuSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
      setStatusChart(state, action) {
        state.statusChart = action.payload;
      },
    },
});

export const { setStatusChart } = menuSlice.actions;
export default menuSlice;