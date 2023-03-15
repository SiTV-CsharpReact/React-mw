import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DataHNX } from "../models/modelTableHNX";
import {
  checkSTTMarket,
  formatNumber,
  formatNumberMarket,
  setColorMarket,
  tinhGiaTC,
} from "../utils/util";
import "../styles/MW.css";
// import LoadingComponent from "../layout/LoaddingComponent";
// import { Observable } from "rxjs/internal/Observable";
// import IframeComponent from "./IFrameComponent";
// import { HubConnectionBuilder } from "@aspnet/signalr/dist/esm/HubConnectionBuilder";
// import * as signalR from "@aspnet/signalr";
// import { io } from "socket.io-client";
import { ObjectMenuHSX } from "../models/modelListMenuHSX"; 
import HeaderMarketW from "./headerMarketwat/HeaderMarket";

const IndexMarketW = () => {
  const arrayPrice =[5,7,9,11,14,16,18]
  const arrayKL =[6,8,10,12,15,17,19]
  //const arrayColor ="text-red text-green text-blue text-white text-yellow text-violet";
  const arrayColor =["text-red", "text-green" ,"text-blue", "text-white", "text-yellow", "text-violet"];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("{}");
  

  const [products, setProductsHNX] = useState<[] | null>(null);
  const [statusMarket, setStatusMarket] = useState<ObjectMenuHSX | null>(null);
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  //const [connection, setConnection] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
        try {
            setLoading(true);
            const responseHNX = await axios.get(`http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNXIndex`);
            const responsesttHNX = await axios.get(`http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`);
            setProductsHNX(responseHNX.data);
            setStatusMarket(responsesttHNX.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
      }
      fetchData();
   
  }, []);
  useEffect(() => {
    // const socket = io('ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=dnL897L7K8vCFfdm%2FU2B%2B8L3mgJxVC9qXt8YejdUGsaMoHgfj%2FPPyVumCVpn5PvW2sxZanXnmvvNU49qowDUIJ5hYyfNfe56xdHs6Gf3cOQ84am2ZKvvswyYk8wE4dyq&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1');

    // socket.on("newData", (data) => {
    //   console.log(data);
    // });
    const socket = new WebSocket(
      "ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=dnL897L7K8vCFfdm%2FU2B%2B8L3mgJxVC9qXt8YejdUGsaMoHgfj%2FPPyVumCVpn5PvW2sxZanXnmvvNU49qowDUIJ5hYyfNfe56xdHs6Gf3cOQ84am2ZKvvswyYk8wE4dyq&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1"
    );

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      setData(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // const socket = io('ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=dnL897L7K8vCFfdm%2FU2B%2B8L3mgJxVC9qXt8YejdUGsaMoHgfj%2FPPyVumCVpn5PvW2sxZanXnmvvNU49qowDUIJ5hYyfNfe56xdHs6Gf3cOQ84am2ZKvvswyYk8wE4dyq&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1');

    // socket.on("newData", (data) => {
    //   console.log(data);
    // });
    const socket = new WebSocket(
      "ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=E9HRMZrVZunX7wBF72lDBGWuhAlxDlcvw%2F5AS3ddyWlrBDSuI%2BpZCYBev7ZMFV7MM02jbs2gnSTFI1B0oPBT9%2F4za8uPCarJO8Jv0tkq5Wsd2hS1iirEbtCfbxkgg0%2Ff&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=3"
    );

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      setData(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);
  console.log(statusMarket)
  const updateTableHNX = (dataHNX:any)=>{
    const arrRowID = dataHNX.RowID
    const arrInfo = dataHNX.Info
   if(dataHNX){
    // data trả ra object có arrRowId
    if(arrRowID){
      if(dataHNX.Info.length>1){
        dataHNX.Info.map((dataInfo:any)=>(
          updateDataTable(arrRowID,dataInfo[0],dataInfo[1])
        ))
      }
      else{
        updateDataTable(arrRowID,arrInfo[0][0],arrInfo[0][1])
      }
    }
    else{
      //console.log(dataHNX[0])
     const tdIndexMenu = document.getElementById(`${dataHNX[0]}`);
     //const tdImageIndexMenu = document.getElementById(`${dataHNX[0]}_Image`);
      //console.log(tdIndexMenu)
     if(tdIndexMenu) {
     tdIndexMenu.innerHTML = `${dataHNX[1]}`;
     tdIndexMenu.style.backgroundColor ="#888888"
     tdIndexMenu.style.color = colorTextMenu(dataHNX[1]) 
     setTimeout(function() {
      tdIndexMenu.style.backgroundColor =""
     }, 500);}
    }
   }
  }
  
  const colorTextTD = (tc?:string,tran?:string,san?:string,price?:number)=>{
    let Color ="text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if(price){
      if(price===0){
        Color="text-white"
    }
    else if(price=== Number(san)){
        Color="text-blue"
    }
    else if(price === Number(tran)){
        Color="text-violet"
    }
    else if(price === Number(tc)){
        Color="text-yellow"
    }
    else if(price > Number(tc)){
        Color="text-green"
    }
    else if(price<Number(tc) && price> Number(san)  )
    {
        Color="text-red"
    }
    }
   
    return Color;
  }
  const colorTextMenu = (price:number)=>{
    const  value =0
    let Color ="text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if(price){
      if(price===0){
        Color="text-yellow"
    }
    else if(price=== Number(value)){
      Color="text-yellow"
    }

    else if(price > Number(value)){
        Color="text-green"
    }
    else if(price<Number(value)  )
    {
        Color="text-red"
    }
    }
   
    return Color;
  }
  const updateDataTable= (arrRowID:string,arrInfo:number,arrValue:number) =>{ 
    const tdIndex = document.getElementById(`${arrRowID}_${arrInfo}`);
    const valueTC= document.getElementById(`${arrRowID}_TC`)?.innerHTML;       
    const valueTran= document.getElementById(`${arrRowID}_Tran`)?.innerHTML;
    const valueSan= document.getElementById(`${arrRowID}_San`)?.innerHTML;
    const valuePT= document.getElementById(`${arrRowID}_PT`);
    if (tdIndex)  {
      tdIndex.innerHTML = `${formatNumberMarket(arrValue)}`
      tdIndex.style.backgroundColor ="#888888"
      setTimeout(function() {
        tdIndex.style.backgroundColor =""
      }, 500);
      const indexPrice = arrayPrice.indexOf(arrInfo)
      if(indexPrice !== -1)
      {
      if(valueTC && valueTran && valueSan)
      {
        if(arrInfo === 11){
          const PT =  tinhGiaTC(Number(valueTC),arrValue)
         
          console.log(Number(valueTC),arrValue,PT)
          const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
          if(valuePT) valuePT.innerHTML = `${PT}`
          // console.log(tdIndex.classList.contains("text-red text-green text-blue text-white text-yellow text-violet"))
          // eslint-disable-next-line array-callback-return
          arrayColor.map((arrayColorText:string)=>{        
              tdIndex.classList.remove(arrayColorText)
              document.getElementById(`${arrRowID}`)?.classList.remove(arrayColorText)
              document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
              valuePT?.classList.remove(arrayColorText)
          })
          tdIndex.classList.add(textColor)
          document.getElementById(`${arrRowID}`)?.classList.add(textColor)
          document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
          valuePT?.classList.add(textColor)
        }

        else{
          const statusMarketW =statusMarket?.STAT_ControlCode
          console.log(statusMarketW,arrInfo)
        //   if((arrInfo === 2 && statusMarketW=== "A") || "P"){
        //     const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
        //     // eslint-disable-next-line array-callback-return
        //    arrayColor.map((arrayColorText:string)=>{       
        //     tdIndex.classList.remove(arrayColorText)
        //     document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        // })
        // tdIndex.classList.add(textColor)
        // document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
        //   }
        //   else if((arrInfo === 0 && statusMarketW === "A") || "P"){
        //     const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
        //     // eslint-disable-next-line array-callback-return
        //    arrayColor.map((arrayColorText:string)=>{       
        //     tdIndex.classList.remove(arrayColorText)
        //     document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        // })
        // tdIndex.classList.add(textColor)
        // document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
        //   }
       
            const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
            // eslint-disable-next-line array-callback-return
        arrayColor.map((arrayColorText:string)=>{       
            tdIndex.classList.remove(arrayColorText)
            document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        })
        tdIndex.classList.add(textColor)
        document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
        // tdIndex.style.color = textColor
        } 
      }
    }
  }
}


  const datas = JSON.parse(data);
  if (typeof datas === "undefined") {
  } else {
    const dataRT = datas.M;
    let arrDatas = [];
    if (typeof dataRT !== "undefined") {
      dataRT.map(
        (dataLT: any) => (
          (arrDatas = JSON.parse(dataLT.A[0].Change)),
          arrDatas.map(
            (arrData: any) => ( 
              updateTableHNX(arrData)    
            ) 
          )
        )
      );
    }
  }
 
  if (loading) return <div className="h-420">Loading...</div>

  const rows = products?.map((dataTable: any) => (
    <tr key={dataTable.RowID} id={`tr${dataTable.RowID}`}>
      <td 
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
        id={`${dataTable.RowID}`}
      >
    
        {dataTable.RowID}
      </td>
    
      {/* TTham chiếu */}
      <td
        data-sort={dataTable.Info[13][1]}
        id={`${dataTable.RowID}_TC`}
        className=" text-right bg-BGTableHoverMarket text-textTableMarketTC"
      >
        {formatNumber(dataTable.Info[13][1])}
      </td>
      {/* Trần */}
      <td
        data-sort={dataTable.Info[15][1]}
        id={`${dataTable.RowID}_Tran`}
        className=" text-right bg-BGTableHoverMarket text-textTableMarketTran"
      >
        {formatNumber(dataTable.Info[15][1])}
      </td>
      {/* Sàn */}
      <td
        data-sort={dataTable.Info[14][1]}
        id={`${dataTable.RowID}_San`}
        className=" text-right bg-BGTableHoverMarket text-textTableMarketSan"
      >
        {formatNumber(dataTable.Info[14][1])}
      </td>
      {/* G3 Mua*/}
      <td
        data-sort={dataTable.Info[8][1]}
        id={`${dataTable.RowID}_${dataTable.Info[8][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[8][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[8][1])}
      </td>
      {/* KL3 */}
      <td
        data-sort={dataTable.Info[9][1]}
        id={`${dataTable.RowID}_${dataTable.Info[9][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[8][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[9][1])}
      </td>
      {/* G2 */}
      <td
        data-sort={dataTable.Info[4][1]}
        id={`${dataTable.RowID}_${dataTable.Info[4][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[4][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[4][1])}
      </td>
      {/* KL2 */}
      <td
        data-sort={dataTable.Info[5][1]}
        id={`${dataTable.RowID}_${dataTable.Info[5][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[4][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[5][1])}
      </td>
      {/* G1 */}
      <td
        data-sort={dataTable.Info[0][1]}
        id={`${dataTable.RowID}_${dataTable.Info[0][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[0][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
               {checkSTTMarket(formatNumberMarket(dataTable.Info[0][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[1][1]))}
        {/* {formatNumberMarket(dataTable.Info[0][1])} */}
      </td>
      {/* KL1 */}
      <td
        data-sort={dataTable.Info[1][1]}
        id={`${dataTable.RowID}_${dataTable.Info[1][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[0][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[1][1])}
      </td>
      {/* Gia Khơp lenh */}
      <td
        data-sort={dataTable.Info[18][1]}
        id={`${dataTable.RowID}_${dataTable.Info[18][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[18][1])}
      </td>
      {/* KL */}
      <td
        data-sort={dataTable.Info[19][1]}
        id={`${dataTable.RowID}_${dataTable.Info[19][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[19][1])}
      </td>
      {/* +-*/}
      <td
        data-sort={tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}
        id={`${dataTable.RowID}_PT`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}
      </td>
      {/* G1 Ban*/}
      <td
        data-sort={dataTable.Info[2][1]}
        id={`${dataTable.RowID}_${dataTable.Info[2][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[2][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {checkSTTMarket(formatNumberMarket(dataTable.Info[2][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[3][1]))}
      </td>
      {/* KL1 */}
      <td
        data-sort={dataTable.Info[3][1]}
        id={`${dataTable.RowID}_${dataTable.Info[3][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[2][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[3][1])}
      </td>
      {/* G2 */}
      <td
        data-sort={dataTable.Info[6][1]}
        id={`${dataTable.RowID}_${dataTable.Info[6][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[6][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[6][1])}
      </td>
      {/* KL2 */}
      <td
        data-sort={dataTable.Info[7][1]}
        id={`${dataTable.RowID}_${dataTable.Info[7][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[6][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[7][1])}
      </td>
      {/* G3 */}
      <td
        data-sort={dataTable.Info[10][1]}
        id={`${dataTable.RowID}_${dataTable.Info[10][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[10][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[10][1])}
      </td>
      {/* KL3 */}
      <td
        data-sort={dataTable.Info[11][1]}
        id={`${dataTable.RowID}_${dataTable.Info[11][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[10][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[11][1])}
      </td>
      {/* TKL */}
      <td
        data-sort={dataTable.Info[20][1]}
        id={`${dataTable.RowID}_${dataTable.Info[20][0]}`}
        className=" text-right bg-BGTableHoverMarket "
      >
        {formatNumberMarket(dataTable.Info[20][1])}
      </td>
      <td
        data-sort={dataTable.Info[21][1]}
        id={`${dataTable.RowID}_${dataTable.Info[21][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[21][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[21][1])}
      </td>
      <td
        data-sort={dataTable.Info[22][1]}
        id={`${dataTable.RowID}_${dataTable.Info[22][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[22][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[22][1])}
      </td>
      <td
        data-sort={dataTable.Info[23][1]}
        id={`${dataTable.RowID}_${dataTable.Info[23][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[23][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[23][1])}
      </td>
      <td
        data-sort={dataTable.Info[25][1]}
        id={`${dataTable.RowID}_${dataTable.Info[25][0]}`}
        className=" text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[25][1])}
      </td>
      <td
        data-sort={dataTable.Info[26][1]}
        id={`${dataTable.RowID}_${dataTable.Info[26][0]}`}
        className=" text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[26][1])}
      </td>
      <td
        data-sort={dataTable.Info[27][1]}
        id={`${dataTable.RowID}_${dataTable.Info[27][0]}`}
        className=" text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[27][1])}
      </td>
    </tr>
  ));

  return (
    <div className="h-420 overflow-auto" id="tableHNX">
      {/* <iframe id="iframe" src="/hnx/blank?843" ref={iframeRef}></iframe> */}
      {/* <p>{dataRT[0]}</p> */}
      <HeaderMarketW/>
      <table className="w-full tableMW " id="tableMW_HNX">
    {/* <colgroup><col className="col-symbol" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-total-vol" /><col className="col-over-buy" /><col className="col-over-sell" /><col className="col-ave-price" /><col className="col-high-price" /><col className="col-low-price" /><col className="col-foreign-buy" /><col className="col-foreign-sell" /></colgroup>
     */}
             {/* <colgroup><col className="show-on-mobile col-symbol" /><col className="show-on-mobile col-price" /><col className="show-on-mobile col-price" /><col className="show-on-mobile col-price" /><col className="col-vol col-vol-lg" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol col-vol-sm" /><col className="col-diff" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-vol col-vol-lg" /><col className="col-vol" /><col className="col-vol" /></colgroup> */}
        <colgroup>
        <col className="col-symbol" />
        <col className="show-on-mobile col-price" />
        <col className="show-on-mobile col-price" />
        <col className="show-on-mobile col-price" />
       
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol col-vol-sm" />
        <col className="col-diff" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-vol-total" />
        <col className="col-price-open" />
        <col className="col-price-high" />
        <col className="col-price-short" />
     
        <col className="col-vol-foreign-buy" />
        <col className="col-vol-foreign-sell" />
        <col className="col-vol-still" />
        </colgroup>
        <tbody>
        {/* <tr  className="unselect" id="trCEO" data-pos="37" role="row"><td className="cccd fixedcol" ><span >CEO</span></td><td className="g_r">20.7</td><td className="g_c">22.7</td><td className="grf">18.7</td><td id="CEO_5" className="b_d">20.3</td><td className="b_d" id="CEO_6">165,200</td><td className="b_d" id="CEO_7">20.4</td><td id="CEO_8" className="b_d">149,700</td><td className="b_d" id="CEO_9">20.5</td><td className="brd" id="CEO_10">37,300</td><td className="g_d" id="CEO_11">20.6</td><td className="g_d" id="CEO_12">200</td><td className="grd">-0.5 %</td><td className="b_d">20.6</td><td className="b_d">4,500</td><td className="b_r">20.7</td><td className="b_r">187,500</td><td className="b_u">20.8</td><td className="b_u">76,600</td><td className="br_ hide">2,648,200</td><td className="g__">960,000</td><td className="g_d">20.6</td><td className="g_r">20.7</td><td className="g_d">20.3</td><td className="grd hide">20.502</td><td className="g__">13,300</td><td className="g__"></td><td className="g__">118,402,461</td></tr>
        <tr  className="unselect" id="trCEO" data-pos="37" role="row"><td className="cccd fixedcol" ><span >SHS</span></td><td className="g_r">20.7</td><td className="g_c">22.7</td><td className="grf">18.7</td><td className="b__ hide">2,767,600</td><td className="b_d">20.3</td><td className="b_d">165,200</td><td className="b_d">20.4</td><td className="b_d">149,700</td><td className="b_d">20.5</td><td className="brd">37,300</td><td className="g_d">20.6</td><td className="g_d">200</td><td className="grd">-0.5 %</td><td className="b_d">20.6</td><td className="b_d">4,500</td><td className="b_r">20.7</td><td className="b_r">187,500</td><td className="b_u">20.8</td><td className="b_u">76,600</td><td className="br_ hide">2,648,200</td><td className="g__">960,000</td><td className="g_d">20.6</td><td className="g_r">20.7</td><td className="g_d">20.3</td><td className="grd hide">20.502</td><td className="g__">13,300</td><td className="g__"></td><td className="g__">118,402,461</td></tr>
        <tr  className="unselect" id="trSHS" data-pos="249" role="row"><td className="cccr fixedcol" ><span>SHS</span></td><td className="g_r">8.7</td><td className="g_c">9.5</td><td className="grf">7.9</td><td className="b__ hide">5,081,900</td><td className="b_d" >8.5</td><td className="b_d" >2,327,400</td><td className="b_d" >8.6</td><td className="b_d" >2,290,700</td><td className="b_r" >8.7</td><td className="brr" >9,200</td><td className="g_r">8.7</td><td className="g_r" >3,000</td><td className="grr"></td><td className="b_u" >8.8</td><td className="b_u" >2,535,700</td><td className="b_u" >8.9</td><td className="b_u" >2,051,100</td><td className="b_u" >9</td><td className="b_u" >1,422,600</td><td className="br_ hide">4,679,900</td><td className="g__" >5,255,500</td><td className="g_r">8.7</td><td className="g_u">8.8</td><td className="g_d">8.5</td><td className="grd hide">8.668</td><td className="g__">3,400</td><td className="g__"></td><td className="g__">343,257,762</td></tr> */}
          {rows}</tbody>
      </table>
    </div>
  );
};
  



export default IndexMarketW;
