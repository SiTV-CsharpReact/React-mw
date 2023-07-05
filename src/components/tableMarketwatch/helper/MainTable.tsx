import { RootState, useAppSelector } from "../../../store/configureStore";
import TableDL from "./TableDL";
import TableGDKL from "./TableGDKL";
import TableGDTH from "./TableGDTH";
import TablePrices from "./TablePrice";
const TableChange = () => {
  const { KeyMenuChildren } = useAppSelector((state: RootState) => state.tableTest);
   
  return  <> 
    {KeyMenuChildren === 1 ?  <TablePrices /> :  KeyMenuChildren === 2  ?  <TableDL /> : KeyMenuChildren === 3 ? <TableGDKL /> :<TableGDTH />   }  
  </>
};
export default TableChange;
