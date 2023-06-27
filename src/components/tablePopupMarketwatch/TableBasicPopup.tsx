import React, { useEffect } from "react";
import { DataStockCode } from "../../models/stockCode";
import agent from "../../api/agent";
import axios from "axios";



const TableBasicPopup: React.FC<DataStockCode> = (data) => {
  const RP = {
    "action": "gw_ezs_basic",
    "symbol": data?.stockCode
  };
  axios.post("/Root/Data.ashx", RP,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },})
  .then((response) => {
    const objJSON = response.data;
    let obj = {};
    if (objJSON !== '') {
      obj = objJSON;
    }
    // Xử lý callback
    console.info('g_AppDemo.getGwRealtime', objJSON);
    // ...
    // console.log("g_AppDemo.getGwRealtime.objJSON=" + objJSON);
  })
  .catch((error) => {
    console.log("getDataChartTime Request failed: " + error);
  });
  console.log(data.stockCode)
  useEffect(()=>{
    fetchDataTableBasic()
  })

  const fetchDataTableBasic =() =>{
     const dataTable =  agent.dataTableBasic.postFormData(RP)
     console.log("dataTable",dataTable)
  }
  return (
    <table id="tbFI" className="pu-table text-[#B9B9B9]">
      <thead>
        <tr>
          <th style={{ width: "150px" }}>Chỉ số cơ bản</th>
          <th>đến 2023</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "20px" }}>
          <td
            title="Giá trị vốn hóa thị trường"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            Giá trị vốn hóa thị trường
          </td>
          <td title="3,336,527,662,750" className="<!Class>">
            3,336,527,662,750
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="KLNY hiện tại"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            KLNY hiện tại
          </td>
          <td title="117,276,895" className="<!Class>">
            117,276,895
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="KLĐLH hiện tại"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            KLĐLH hiện tại
          </td>
          <td title="117,276,895" className="<!Class>">
            117,276,895
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="KLGD bq 30 ngày"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            KLGD bq 30 ngày
          </td>
          <td title="86,890" className="<!Class>">
            86,890
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="Giá cao nhất 52 tuần"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            Giá cao nhất 52 tuần
          </td>
          <td title="30,250" className="<!Class>">
            30,250
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="Giá thấp nhất 52 tuần"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            Giá thấp nhất 52 tuần
          </td>
          <td title="21,850" className="<!Class>">
            21,850
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="Tỷ lệ sở hữu nước ngoài"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            Tỷ lệ sở hữu nước ngoài
          </td>
          <td title="47.49" className="<!Class>">
            47.49
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="EPS(FPTS)**"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            EPS(FPTS)**
          </td>
          <td title="2,717" className="<!Class>">
            2,717
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td
            title="P/E(FPTS)**"
            className="<!Class>"
            style={{ width: "150px" }}
          >
            P/E(FPTS)**
          </td>
          <td title="10.47" className="<!Class>">
            10.47
          </td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td className="<!Class>" style={{ width: "150px" }}>
            &nbsp;
          </td>
          <td className="<!Class>">&nbsp;</td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td className="<!Class>" style={{ width: "150px" }}>
            &nbsp;
          </td>
          <td className="<!Class>">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableBasicPopup;
