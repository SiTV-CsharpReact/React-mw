import React, { useEffect, useState } from "react";
import { DataStockCode } from "../../models/stockCode";
import agent from "../../api/agent";
import { formatNumber, subStringData } from "../../utils/util";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Header_Basic, STR_BASIC } from "./config/tablePopup.config";
import TheadPopupTable from "./TheadPopupTable";
import TbodyPopupTable from "./TbodyPopupTable";



const TableBasicPopup: React.FC<DataStockCode> = (data) => {
  const { t } = useTranslation(["home"]);
  const [dataBasic, setDataBasic] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);
  const RP = {
    "action": "gw_ezs_basic",
    "symbol": data?.stockCode
  };
  useEffect(()=>{
    fetchDataTableBasic()
  },[])
  const fetchDataTableBasic = async () =>{
     const  dataTable = await agent.dataTableBasic.postFormData(RP);
     const date = new Date();
     const dataSplit = subStringData(dataTable,STR_BASIC);
    // dataSplit.splice(dataSplit.length - 1, 1) // loai bo chi so cuoi cung la company Type(k dung den);
     setDataBasic(dataSplit);
     var header:any = [];
     header.push.apply(header, Header_Basic);
     header[1] += ' ' + date.getFullYear();
    //  header.push(dataTable.splice(dataTable.length - 1, 1));// cat chi so cap nhat den quy... day vao mang header
     setDataHeader(header)
  }
  console.log(dataHeader)
  return (
    <table id="tbFI" className="pu-table text-[#B9B9B9]">
       <TheadPopupTable dataHeader={dataHeader}/>
        <TbodyPopupTable dataBody={dataBasic}/>
    </table>
  );
};

export default React.memo(TableBasicPopup);
