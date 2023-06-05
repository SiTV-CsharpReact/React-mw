import { RootState, useAppSelector } from "../../../store/configureStore";
import TableDL from "./TableDL";
import TableGD from "./TableGD";
import TablePrices from "./TablePrice";

const TableChange = () => {
  const { KeyMenuChildren } = useAppSelector((state:RootState) => state.table);
  return  <> 
    {KeyMenuChildren === 1 ?  <TablePrices /> :  KeyMenuChildren === 2  ?  <TableDL /> : <TableGD />  }  
  </>
};
export default TableChange;
