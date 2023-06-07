import { ICellRendererParams } from "ag-grid-community";
import { TRowDataIndex } from "../interface/interface.tablegrid";
import { RowDataIndex } from "../interface/config.tablegrid";
import { formatNumberMarket } from "../../../utils/util";

export const CellRender = (
  props: ICellRendererParams<TRowDataIndex, number>
) => {
  const dataIndex = Object.entries(RowDataIndex).filter(
    (item) => item[0] === props.colDef?.field
  );
  //   const dataIndex = RowDataIndex.RoomCL; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
  const value = props.value; // Get the value of the cell
  const rowid = props.data?.RowID; // Get the
  return (
    <div data-index={dataIndex[1]} data-comp={rowid} className="custom-cell">
      {formatNumberMarket(value)}
    </div>
  );
};

// export const CellRenderToolTip = (
//   props: ICellRendererParams<TRowDataIndex, number>
// ) => {
//   const dataIndex = Object.entries(RowDataIndex).filter(
//     (item) => item[0] === props.colDef?.field
//   );
//   // const [handleClick] = HandleFunction();
//   const dispatch = useAppDispatch();

//   //   const dataIndex = RowDataIndex.RoomCL; // Get the index of the column= RowDataIndex.G3; // Get the index of the column
//   const value = props.value; // Get the value of the cell
//   const rowid = props.data?.RowID; // Get the
//   return (
//     <Tooltip title="Click đúp để đặt lệnh">
//       <div
//         data-index={dataIndex[1]}
//         data-comp={rowid}
//         className="custom-cell cursor-pointer"
//         onDoubleClick={() =>
//           // handleClick({ ma: props.data?.MCK, price: value })
//           dispatch(dispatchDataTable({ ma: props.data?.MCK, price: value }))
//         }
//       >
//         {formatNumberMarket(value)}
//       </div>
//     </Tooltip>
//   );
// };
