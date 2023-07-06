import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/util";
import { DataStockCode } from "../../models/stockCode";
import agent from "../../api/agent";
import { TableKLTTG } from "../../models/tableKLTTTG";

const TableKLTTGPopup: React.FC<DataStockCode> = ( data ) => {
  const [dataTable,setDataTable] = useState<TableKLTTG| null>(null)
  const RP = {
    action: "le",
    symbol: data?.stockCode,
    max_score:0
  };
useEffect(()=>{
  fetchDataTableKLTTG()
},[])
const fetchDataTableKLTTG = async ()=>{
  const  dataRP = await agent.dataTableBasic.postFormData(RP)
  setDataTable(dataRP.data)
}
console.log(RP,data?.stockCode,dataTable)
  return (
    <table id="tbpuRT" className="pu-table-realtime">
      <thead style={{}}>
        <tr style={{ height: "22px" }}>
          <th colSpan={4}>Khớp lệnh theo thời gian</th>
        </tr>
        <tr className="border" style={{ height: "22.5px" }}>
          <th>Thời gian</th>
          <th>Giá</th>
          <th>Khối lượng</th>
          <th>Tổng KL</th>
        </tr>
      </thead>
      <tbody>
        {dataTable?.Body.reverse().map((item: any, index: any) => {
          //  const color =
          //   dataMouse.priceF < item.MP ? "red"
          //     : dataMouse > item.MP
          //     ? "green"
          //     : "yellow";
          // const colorBuy =
          //   dataMouseBuy.priceB < item.MP ? "red"
          //     : dataMouseBuy > item.MP
          //     ? "green"
          //     : "yellow";
          
          return  <tr key={index} style={{ height: "22px" }}>
          <td 
          // style={{color: color || colorBuy }} 
          className="text-center pu-w">{item.MT}</td>
          <td  
          // style={{color: color || colorBuy }}
           className="pu-w">{formatNumber(item.MP)}</td>
          <td
            // style={{color: color || colorBuy }}
           className="pu-w">{formatNumber(item.MQ)}</td>
          <td  
          // style={{color: color || colorBuy }} 
          className="pu-w">{formatNumber(item.TQ)}</td>
        </tr>
        })}
      </tbody>
    </table>
  );
};

export default React.memo(TableKLTTGPopup);
