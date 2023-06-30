import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import {subStringData } from "../../utils/util";
import { DataStockCode } from "../../models/stockCode";
import { Header_Report, STR_REPORT } from "./config/tablePopup.config";
import TbodyPopupTable from "./TbodyPopupTable";
import TheadPopupTable from "./TheadPopupTable";

const TableReportingPopup: React.FC<DataStockCode> = (data) => {
  const [dataReport, setDataReport] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);
  const RP = {
    "action": "gw_ezs_report",
    "symbol": data?.stockCode
  };
  useEffect(()=>{
    fetchDataTableBasic()
  },[])
  const fetchDataTableBasic = async () =>{
    const  dataTable = await agent.dataTableBasic.postFormData(RP);
    const dataSplit = subStringData(dataTable,STR_REPORT);
     dataSplit.splice(dataSplit.length - 1, 1) // loai bo chi so cuoi cung la company Type(k dung den);
    setDataReport(dataSplit);
    var header:any = [];
    header.push.apply(header, Header_Report);
    header.push(dataSplit.splice(dataSplit.length - 1, 1));// cat chi so cap nhat den quy... day vao mang header
    setDataHeader(header)
 }
  return (
    <table id="tbRN" className="pu-table">
        <TheadPopupTable dataHeader={dataHeader}/>
        <TbodyPopupTable dataBody={dataReport}/>
    </table>
  );
};

export default React.memo(TableReportingPopup);
