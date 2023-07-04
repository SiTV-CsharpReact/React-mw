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
    keyMenu : number,
    nameMenu :any,
    floor : string
  }
  
  const initialState: ComponentState = {
    statusChart: true,
    keyMenu : 0,
    nameMenu : "",
    floor : "HSX"
  };
const menuSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
      setStatusChart(state, action) {
        state.statusChart = action.payload;
      },
      setActiveMenu  (state, action) {
        state.nameMenu = action.payload?.nameMenu;
        state.keyMenu = action.payload?.keyMenu;
        state.floor = action.payload?.floor;
      },
      setHistoryMenu :  ( state)=> {
          state.keyMenu = 4
          state.nameMenu = "Thống kê Giá"
      } 
    },
});

export const { setStatusChart , setActiveMenu ,setHistoryMenu } = menuSlice.actions;
export default menuSlice;