import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/configureStore";
import { formatNumber } from "../../utils/util";

const TableKLTTGPopup: React.FC<any> = ({ dataResult }) => {
  

  return (
    <table id="tbpuRT" className="pu-table-realtime">
      <thead style={{}}>
        <tr  style={{ height: "22px" }}>
          <th  colSpan={4}>Khớp lệnh theo thời gian</th>
        </tr>
        <tr className="border" style={{ height: "22.5px" }}>
          <th>Thời gian</th>
          <th>Giá</th>
          <th>Khối lượng</th>
          <th>Tổng KL</th>
        </tr>
      </thead>
      <tbody>
        {dataResult.map((item: any, index: any) => {
           const color = ""
          
          return  <tr key={index} style={{ height: "22px" }}>
          <td style={{color: color  }} className="text-center pu-w">{item.MT}</td>
          <td  style={{color: color  }} className="pu-w">{formatNumber(item.MP)}</td>
          <td  style={{color: color  }} className="pu-w">{formatNumber(item.MQ)}</td>
          <td  style={{color: color  }} className="pu-w">{formatNumber(item.TQ)}</td>
        </tr>
        })}
       
       
      </tbody>
    </table>
  );
};

export default TableKLTTGPopup;
