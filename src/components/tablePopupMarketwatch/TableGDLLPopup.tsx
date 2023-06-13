import React from "react";
import { useAppSelector } from "../../store/configureStore";

const TableGDLLPopup = () => {
  let { dataMouse  }: any = useAppSelector(state => state.dataMouse);

  return (
    <table id="tbOddLot">
      <thead>
        <tr style={{ height: "20px" }}>
          <th className="pu-w" colSpan={4}>Giao dịch lô lẻ</th>
        </tr>
        <tr style={{ height: "20px" }}>
          <th colSpan={2}>Dư mua</th>
          <th colSpan={2}>Dư bán</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "20px" }}>
         <td style={{ color: dataMouse.TCT > 28 ? '#00FF00' : (dataMouse.TCT < 28 ? 'red' : '#F7FF31') }} className="pu-d !text-center">28</td>

         <td style={{ color: dataMouse.TCT > 16 ? '#00FF00' : (dataMouse.TCT < 16 ? 'red' : '#F7FF31') }} className="pu-d !text-center">16</td>

          <td style={{ color: dataMouse.TCT > 28.45 ? '#00FF00' : (dataMouse.TCT < 28.45 ? 'red' : '#F7FF31') }} className="pu-d !text-center">28.45</td>

           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">13</td>

        </tr>
        <tr style={{ height: "20px" }}>
          <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">28.45</td>
           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">13</td>
           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">28.45</td>
           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">13</td>

        </tr>
        <tr style={{ height: "20px" }}>
          <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">13</td>
           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">28.45</td>
           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">13</td>
           <td style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }} className="pu-d !text-center">28.45</td>

        </tr>
      </tbody>
    </table>
  );
};

export default TableGDLLPopup;
