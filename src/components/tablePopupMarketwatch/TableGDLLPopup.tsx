import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/configureStore";
// import { DataStockCode } from "../../models/stockCode";
import { TableGDLL } from "../../models/tableKLTTTG";
import agent from "../../api/agent";

const TableGDLLPopup= () => {
  const [dataTable, setDataTable] = useState<TableGDLL | null>(null);
  const { code } = useAppSelector((state) => state.popupTable);

  useEffect(() => {
    const RP = {
      action: "po",
      symbol: code,
    };
    const fetchDataTableKLTTG = async () => {
      const dataRP = await agent.dataTableBasic.postFormData(RP);
      setDataTable(dataRP.data);
    };
    fetchDataTableKLTTG();
  }, [code]);

  return (
    <table id="tbOddLot">
      <thead>
        <tr style={{ height: "20px" }}>
          <th className="pu-w" colSpan={4}>
            Giao dịch lô lẻ
          </th>
        </tr>
        <tr style={{ height: "20px" }}>
          <th colSpan={2}>Dư mua</th>
          <th colSpan={2}>Dư bán</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "20px" }}>
          <td
            //  style={{ color: dataMouse.TCT > 28 ? '#00FF00' : (dataMouse.TCT < 28 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.BP1}
          </td>

          <td
            //  style={{ color: dataMouse.TCT > 16 ? '#00FF00' : (dataMouse.TCT < 16 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.BQ1}
          </td>

          <td
            // style={{ color: dataMouse.TCT > 28.45 ? '#00FF00' : (dataMouse.TCT < 28.45 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.SP1}
          </td>

          <td
            // style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.SQ1}
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            //  style={{ color: dataMouse.TCT > 28 ? '#00FF00' : (dataMouse.TCT < 28 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.BP2}
          </td>

          <td
            //  style={{ color: dataMouse.TCT > 16 ? '#00FF00' : (dataMouse.TCT < 16 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.BQ2}
          </td>

          <td
            // style={{ color: dataMouse.TCT > 28.45 ? '#00FF00' : (dataMouse.TCT < 28.45 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.SP2}
          </td>

          <td
            // style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.SQ2}
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            //  style={{ color: dataMouse.TCT > 28 ? '#00FF00' : (dataMouse.TCT < 28 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.BP3}
          </td>

          <td
            //  style={{ color: dataMouse.TCT > 16 ? '#00FF00' : (dataMouse.TCT < 16 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.BQ3}
          </td>

          <td
            // style={{ color: dataMouse.TCT > 28.45 ? '#00FF00' : (dataMouse.TCT < 28.45 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.SP3}
          </td>

          <td
            // style={{ color: dataMouse.TCT > 13 ? '#00FF00' : (dataMouse.TCT < 13 ? 'red' : '#F7FF31') }}
            className="pu-d !text-center"
          >
            {dataTable?.SQ3}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableGDLLPopup;
