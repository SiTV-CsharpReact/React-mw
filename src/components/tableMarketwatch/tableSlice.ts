import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { DataTable, DataGDTT } from "../../models/modelTableHNX";
import agent from "../../api/agent";
import { TableParams } from "../../models/modelLinkTable";
import { RootState } from "../../store/configureStore";

interface TableState {
    productsLoaded: boolean;
    ListDataTable: DataTable[];
    productParams: TableParams;
    status: string;
    index : number;
    floor:  string ;
    NameFloor :  string ;
    DataPt : DataTable[];
    DataBi : DataGDTT[];
    KeyMenuChildren: any
}
type params = {
  Floor :string,
  Query:string,
  KeyMenuChildren?: any //  là cái thay đổi thống kê
}
const dataTableAdapter = createEntityAdapter<DataTable>({
    selectId: (dataTable) => dataTable.RowID || '', // Chỉ định trường khóa
  });
  const dataTableHSXAdapter = createEntityAdapter<DataTable>({
    selectId: (dataTable) => dataTable.RowID || '', // Chỉ định trường khóa
  });
export const fetchTableHNXAsync = createAsyncThunk<
  DataTable[],
  string,
  { state: RootState }
>(
  "table/fetchTableHNXAsync",
  async (params, thunkAPI) => {
    const urlParams = new URLSearchParams();
    urlParams.append("s", "quote");
    urlParams.append("l", params);
    try {
      const responseHNX = await agent.TableHNX.list(urlParams);
    
      console.log(responseHNX)
      return responseHNX;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchTableHSXAsync = createAsyncThunk<
  DataTable[],
  string,
  { state: RootState }
>(
  "table/fetchTableHSXAsync",
  async (params, thunkAPI) => {
    const urlParams = new URLSearchParams();
    urlParams.append("s", "quote");
    urlParams.append("l", params);
    try {
      const responseHNX = await agent.TableHSX.list(urlParams);
    
      console.log(responseHNX)
      return responseHNX;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const getDataTable = createAsyncThunk("table/getDataTable" , async (Param :params)=>{
    try {
      if(Param.Query === "thoa-thuan-hsx"){
            const DataBi = await agent.dataGDTTtable.listBi(Param.Floor)
            const DataPt = await agent.dataGDTTtable.listPt(Param.Floor)
            let data = {
                index : 1,
                floor :"GDTT",
                NameFloor : Param.Floor,
                product : {
                  DataBi,
                  DataPt : DataPt  
                }  ,
                KeyMenuChildren: null
             }
            
             return  data
      }
      else if( Param.Floor ==="danh-muc"){
        const DataHNX = await agent.ListDataTable.list("hnx" , `s=quote&l=${Param.Query}`)
        const DataHSX = await agent.ListDataTable.list("hsx" , `s=quote&l=${Param.Query}`)
              var arrS =Param.Query ?  Param.Query.split(",") : []
      var arr_names: DataTable[] = new Array(arrS.length);
      for (let i = 0; i < DataHSX.length; i++) {
        const cSym = DataHSX[i]?.Info[0][1]; // mã ck
        if (arrS.includes(cSym)) {
          arr_names[arrS.indexOf(cSym)] = DataHSX[i];
        }
      }

      for (let i = 0; i < DataHNX.length; i++) {
        const cSym = DataHNX[i]?.RowID; // mã ck
        if (arrS.includes(cSym)) {
          arr_names[arrS.indexOf(cSym)] = DataHNX[i];
        }
      }
        DataHNX?.map((obj:DataTable) =>
        obj.Info?.sort((a: any, b: any) => {
          const indexA = Number(a[0]);
          const indexB = Number(b[0]);
          if (indexA < indexB) {
            return -1;
          }
          if (indexA > indexB) {
            return 1;
          }
          return 0;
        }) )
     
        let data = {
          index : 0,
          floor :"MAIN",
          NameFloor : Param.Floor,
          product : arr_names,
          KeyMenuChildren : null
        }
       
        return data   
   
      }
      else if(Param.Floor ==="TableTK"){
        const DataHNX = await agent.ListDataTable.list("hnx" , `s=quote&l=${Param.Query}`)
        let data = {
          index : 2,
          floor :"TableTK",
          NameFloor : Param.Floor,
          product : DataHNX,
          KeyMenuChildren : Param?.KeyMenuChildren
        }
        return data
      }
      else{  
            const result = await agent.ListDataTable.list(Param.Floor , Param.Query)
            let data = {
              index : 0,
              floor :"MAIN",
              NameFloor : Param.Floor,
              product : result,
              KeyMenuChildren:null
            }

            return data         
        }
    } catch (error) {
        console.log('lỗi table silce', error);
    }

})

function initParams() {
    return {
        s: "quote",
        l: "HNXIndex",
    };
}

export const tableSlice = createSlice({
    name: "table",
    initialState:dataTableAdapter.getInitialState<TableState>({
        productsLoaded: false,
        ListDataTable: [] as  DataTable[],
        status: "idle",
        index : 0,
        floor : 'MAIN',
        DataBi :  [] as DataGDTT[],
        DataPt :  [] as DataTable[],
        NameFloor : "",
        KeyMenuChildren : null,
        productParams: initParams(),
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },
        
    },

    extraReducers: (builder) => {
        builder
          .addCase(getDataTable.pending , (state, action) =>{
            state.productsLoaded = false;
            state.status = "loading";
          })
          .addCase(getDataTable.fulfilled , (state, action) =>{
            state.productsLoaded = true;
            state.status = "idle";
            let data = action.payload
            if(data?.index === 0){
              if(data.NameFloor === "HNX"){
                data?.product.map((obj:DataTable) =>
                      obj.Info?.sort((a: any, b: any) => {
                        const indexA = Number(a[0]);
                        const indexB = Number(b[0]);
                        if (indexA < indexB) {
                          return -1;
                        }
                        if (indexA > indexB) {
                          return 1;
                        }
                        return 0;
                      }) )
                     state.floor = "MAIN"
                     state.ListDataTable = data?.product
                     state.NameFloor = data?.NameFloor
              }else{
                state.floor = "MAIN"
                state.ListDataTable = data?.product
                state.NameFloor = data?.NameFloor
              }
            }
            else if(data?.index === 2){
                state.floor = "TableTK" 
                state.KeyMenuChildren = data?.KeyMenuChildren
            }
            else if(data?.NameFloor === "TableTK"){
             
                state.DataPt = data.product?.DataPt?.PUT_EXEC
                state.DataBi = data.product?.DataBi
                state.floor = "TableTK" 
                state.NameFloor = "HSX"
              
            }
            else{
              if(data?.NameFloor === "HSX"){
                state.DataPt = data.product?.DataPt?.PUT_EXEC
                state.DataBi = data.product?.DataBi
                state.floor = "GDTT" 
                state.NameFloor = "HSX"
              }else{
                state.DataPt = data?.product?.DataPt
                state.DataBi = data?.product?.DataBi
                state.floor = "GDTT"
                state.NameFloor = "HNX"
              }
         
            }
          })
          .addCase(getDataTable.rejected , (state, action) =>{
            state.DataBi = state.DataBi
            state.DataPt = state.DataPt
            state.NameFloor = state.NameFloor
            state.floor = "MAIN"
            state.productsLoaded = true;
            state.status = "idle";
            state.ListDataTable =    state.ListDataTable
             console.log("vood aydcu9sachu")
          })
    },
});

export default tableSlice;
export const productSelectors = dataTableAdapter.getSelectors((state: RootState) =>state.table)
export const productHSXSelectors = dataTableHSXAdapter.getSelectors((state: RootState) =>state.table)
export const {setProductParams} = tableSlice.actions;
