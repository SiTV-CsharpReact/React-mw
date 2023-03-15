import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DataHNX } from "../models/modelTableHNX";
import {
  formatNumber,
  formatNumberMarket,
  setColorMarket,
  tinhGiaTC,
} from "../utils/util";
import "../styles/MW.css";
import LoadingComponent from "../layout/LoaddingComponent";
import { Observable } from "rxjs/internal/Observable";
import IframeComponent from "./IFrameComponent";
import { HubConnectionBuilder } from "@aspnet/signalr/dist/esm/HubConnectionBuilder";
import * as signalR from "@aspnet/signalr";
import { io } from "socket.io-client";

const IndexMarketW = () => {
  const arrTCTranSan = []
  const arrayPrice =[5,7,9,11,14,16,18]
  const arrayKL =[6,8,10,12,15,17,19]
  const cellRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("{}");

  const [products, setProducts] = useState<[] | null>(null);
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  const [connection, setConnection] = useState<any>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("/hsx/signalr")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub!");
          connection.on("ReceiveMessage", (user: string, message: string) => {
            console.log(`Received message from ${user}: ${message}`);
          });
        })
        .catch((error: Error) => console.log(error));
    }
  }, [connection]);
  useEffect(() => {
    axios
      .get(`/hnx/data.ashx?s=quote&l=HNXIndex`)
      .then((res) => setProducts(res.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
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



 
  //console.log(data)
  // const listData =(arrRowID?:string,arrInfo?:[])=>{
  //   if (arrRowID && arrInfo) {
  //     if(arrInfo.length>2){
  //       arrInfo.map((dataInfo)=>(
  //         console.log(dataInfo)
  //       ))
  //     }
  //     else{
  //       updateDataTable()
  //     }
  // }
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
        const tdIndex = document.getElementById(`${arrRowID}_${arrInfo[0][0]}`);
        var valueTC= document.getElementById(`${arrRowID}_TC`)?.innerHTML;
        
        var valueTran= document.getElementById(`${arrRowID}_Tran`)?.innerHTML;
      
        var valueSan= document.getElementById(`${arrRowID}_San`)?.innerHTML;
        console.log(tdIndex)
        if (tdIndex)  {
          tdIndex.innerHTML = `${formatNumberMarket(arrInfo[0][1])}`
          
          //tdIndex.classList.add("bg-tdHover")
          tdIndex.style.backgroundColor ="#888888"
          setTimeout(function() {
            tdIndex.style.backgroundColor =""
          }, 500);
             
          const indexPrice = arrayPrice.indexOf(arrInfo[0][0])
          if(indexPrice !== -1)
          {
          if(valueTC && valueTran && valueSan)
          {
            if(arrInfo[0][0] === 11){
              const PT =  tinhGiaTC(Number(valueTC),arrInfo[0][1])
              const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrInfo[0][1])
              tdIndex.innerHTML = `${formatNumberMarket(PT)}`
              tdIndex.classList.add(textColor)
              document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
            }
            else{
              const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrInfo[0][1])
              tdIndex.classList.add(textColor)
              document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
            }
        
          }
        

         /* Changing the background color of the tdIndex to #797979 and then after 500 milliseconds it
         changes it back to #1D1D1D. */
          // tdIndex.style.backgroundColor ="#797979"
     
          // setTimeout(function() {
          //   tdIndex.style.backgroundColor ="#1D1D1D"
          // }, 500);
        }
     
      
        //  setTimeout(function() {
        //   document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add("bg-tdHover")
        //   tdIndex?.classList.add("bg-tdHover")
        // }, 500);
        }
        // arrayPrice.map((indexPrice)=>(  
        //   compareValue(`${arrRowID}_${indexPrice}`,`${arrRowID}_${arrInfo[0][0]}`,`${arrInfo[0][1]}`,valueTC)
        // ))
        

      }
    }
    else{
     console.log(dataHNX)
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
    else if(price<Number(tc) && Number(san)  )
    {
        Color="text-red"
    }
    }
   
    return Color;
  }

  // const compareValue = (indexPrice:string,tdIndex:string,tdValue:string,valueTC:string) =>{
  //    if(indexPrice === tdIndex){
  //     const tdIndex = document.getElementById(indexPrice);
  //     if (tdIndex)  {
  //       tdIndex.innerHTML = `${formatNumberMarket(tdValue)}`
  //        if(tdValue === valueTC){
  //        tdIndex.classList.add("text-yellow")
  //        }
  //        else if(tdValue <valueTC){
  //         tdIndex.classList.add("text-red") 
  //        }
  //        else{
  //         tdIndex.classList.add("text-red") 
  //        }
  //     }
      
  //    }
  // }
  const updateDataTable= (arrRowID?:string,arrInfo?:number,arrValue?:number) =>{
   
    const td = document.getElementById(`${arrRowID}_${arrInfo}`);
    console.log(td)
    if (td)  {
      td.innerHTML = `${formatNumberMarket(arrValue)}`
    td.style.backgroundColor =`#444444` }
  }
  const updateIndexTable= (arrData:any) =>{
   console.log(arrData)
  }

  const datas = JSON.parse(data);
  if (typeof datas === "undefined") {
  } else {
    const dataRT = datas.M;
    let arrDatas = [];

    let arrDataRT = [];
    if (typeof dataRT !== "undefined") {
      dataRT.map(
        (dataLT: any) => (
          (arrDatas = JSON.parse(dataLT.A[0].Change)),
          // /console.log(arrDatas),
          arrDatas.map(
            (arrData: any) => ( 
              // (arrData.Info)
              // console.log(arrData.RowID),
              // console.log(`${arrData.RowID}_${arrData.Info[0][0]}`),
              //document.getElementById(`${arrData.RowID}_${arrData.Info[0][1]}`),
              //(arrDataRT = arrData),
              updateTableHNX(arrData)
             // typeof arrDataRT !== "object" ? arrDataRT : []
              
              //arrDataRT.RowID?  updateDataTable(arrDataRT.RowID,arrDataRT.Info[0][0],arrDataRT.Info[0][1]): updateIndexTable(arrDataRT),
              // convert obj sang mang
              //Object.values(arrDataRT).map((arrInfo:any)=>(console.log(arrInfo)))
              //arrDataRT.RowID ? document.querySelector(`${arrData.RowID}_${arrData.Info[0][0]}`)?.innerHTML = `oke`:"",
              //const td = document.getElementById(`${arrData.RowID}_${arrData.Info[0][0]}`);
             //arrDataRT.Info?.length>2 ?arrDataRT.Info?.map((arrInfo:any)=>(console.log(arrInfo))) : []
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {" "}
        {dataTable.RowID}
      </td>
      {/* <td>   {dataTable.Info.map((items:any) => (
        items.map((item:any) =>(
          console.log(item),
          item[13]
      
        ))
'border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${`formatNumberMarket()`}'

))}</td>  */}
      {/* TTham chiếu */}
      <td
        data-sort={dataTable.Info[13][1]}
        id={`${dataTable.RowID}_TC`}
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTC"
      >
        {formatNumber(dataTable.Info[13][1])}
      </td>
      {/* Trần */}
      <td
        data-sort={dataTable.Info[15][1]}
        id={`${dataTable.RowID}_Tran`}
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTran"
      >
        {formatNumber(dataTable.Info[15][1])}
      </td>
      {/* Sàn */}
      <td
        data-sort={dataTable.Info[14][1]}
        id={`${dataTable.RowID}_San`}
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketSan"
      >
        {formatNumber(dataTable.Info[14][1])}
      </td>
      {/* G3 Mua*/}
      <td
        data-sort={dataTable.Info[8][1]}
        id={`${dataTable.RowID}_${dataTable.Info[8][0]}`}
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[0][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[0][1])}
      </td>
      {/* KL1 */}
      <td
        data-sort={dataTable.Info[1][1]}
        id={`${dataTable.RowID}_${dataTable.Info[1][0]}`}
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[2][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[2][1])}
      </td>
      {/* KL1 */}
      <td
        data-sort={dataTable.Info[3][1]}
        id={`${dataTable.RowID}_${dataTable.Info[3][0]}`}
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(
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
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket "
      >
        {formatNumberMarket(dataTable.Info[20][1])}
      </td>
      <td
        data-sort={dataTable.Info[21][1]}
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(
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
        className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(
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
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[25][1])}
      </td>
      <td
        data-sort={dataTable.Info[26][1]}
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[26][1])}
      </td>
      <td
        data-sort={dataTable.Info[27][1]}
        className="border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[27][1])}
      </td>
    </tr>
  ));

  return (
    <div className="h-420 overflow-auto"  id="indexMarketW">
      {/* <iframe id="iframe" src="/hnx/blank?843" ref={iframeRef}></iframe> */}
      {/* <p>{dataRT[0]}</p> */}

      <table className="w-full tableMW ">
        <thead>
          <tr>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket"
              rowSpan={2}
            >
              Mã
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              TC
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Trần
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Sàn
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket"
              colSpan={6}
            >
              Mua
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              colSpan={3}
            >
              Khớp lệnh
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket"
              colSpan={6}
            >
              Bán
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Tổng KL
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Mở cửa
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Cao nhất
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Thấp nhất
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN mua
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN bán
            </th>
            <th
              className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Room còn lại
            </th>
          </tr>
          <tr>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              G3
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              KL3
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              G2
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              G1
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket">
              Giá
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket">
              KL
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket">
              +-
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              G1
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              G2
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              G3
            </th>
            <th className="border border-borderHeadTableMarket p-2 text-textHeadTableMarket">
              KL3
            </th>
          </tr>
        </thead>
        <tbody>
        {/* <tr  className="unselect" id="trCEO" data-pos="37" role="row"><td className="cccd fixedcol" ><span >CEO</span></td><td className="g_r">20.7</td><td className="g_c">22.7</td><td className="grf">18.7</td><td id="CEO_5" className="b_d">20.3</td><td className="b_d" id="CEO_6">165,200</td><td className="b_d" id="CEO_7">20.4</td><td id="CEO_8" className="b_d">149,700</td><td className="b_d" id="CEO_9">20.5</td><td className="brd" id="CEO_10">37,300</td><td className="g_d" id="CEO_11">20.6</td><td className="g_d" id="CEO_12">200</td><td className="grd">-0.5 %</td><td className="b_d">20.6</td><td className="b_d">4,500</td><td className="b_r">20.7</td><td className="b_r">187,500</td><td className="b_u">20.8</td><td className="b_u">76,600</td><td className="br_ hide">2,648,200</td><td className="g__">960,000</td><td className="g_d">20.6</td><td className="g_r">20.7</td><td className="g_d">20.3</td><td className="grd hide">20.502</td><td className="g__">13,300</td><td className="g__"></td><td className="g__">118,402,461</td></tr>
        <tr  className="unselect" id="trCEO" data-pos="37" role="row"><td className="cccd fixedcol" ><span >SHS</span></td><td className="g_r">20.7</td><td className="g_c">22.7</td><td className="grf">18.7</td><td className="b__ hide">2,767,600</td><td className="b_d">20.3</td><td className="b_d">165,200</td><td className="b_d">20.4</td><td className="b_d">149,700</td><td className="b_d">20.5</td><td className="brd">37,300</td><td className="g_d">20.6</td><td className="g_d">200</td><td className="grd">-0.5 %</td><td className="b_d">20.6</td><td className="b_d">4,500</td><td className="b_r">20.7</td><td className="b_r">187,500</td><td className="b_u">20.8</td><td className="b_u">76,600</td><td className="br_ hide">2,648,200</td><td className="g__">960,000</td><td className="g_d">20.6</td><td className="g_r">20.7</td><td className="g_d">20.3</td><td className="grd hide">20.502</td><td className="g__">13,300</td><td className="g__"></td><td className="g__">118,402,461</td></tr>
        <tr  className="unselect" id="trSHS" data-pos="249" role="row"><td className="cccr fixedcol" ><span>SHS</span></td><td className="g_r">8.7</td><td className="g_c">9.5</td><td className="grf">7.9</td><td className="b__ hide">5,081,900</td><td className="b_d" >8.5</td><td className="b_d" >2,327,400</td><td className="b_d" >8.6</td><td className="b_d" >2,290,700</td><td className="b_r" >8.7</td><td className="brr" >9,200</td><td className="g_r">8.7</td><td className="g_r" >3,000</td><td className="grr"></td><td className="b_u" >8.8</td><td className="b_u" >2,535,700</td><td className="b_u" >8.9</td><td className="b_u" >2,051,100</td><td className="b_u" >9</td><td className="b_u" >1,422,600</td><td className="br_ hide">4,679,900</td><td className="g__" >5,255,500</td><td className="g_r">8.7</td><td className="g_u">8.8</td><td className="g_d">8.5</td><td className="grd hide">8.668</td><td className="g__">3,400</td><td className="g__"></td><td className="g__">343,257,762</td></tr> */}
          {rows}</tbody>
      </table>
    </div>
  );
};
  
// useEffect(() => {
//   const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
//     input !== null && input.tagName === 'IFRAME';
//   const iframe = (document.getElementById("iframe") as HTMLIFrameElement);
//   const iframeObservable = new Observable((observer) => {
//     const messageHandler = (event:any) => {
//       observer.next(event.data);
//     };
//     if (isIFrame(iframe) && iframe.contentWindow) {
//       console.log(iframe)
//       console.log(iframe.contentWindow)
//       iframe.contentWindow.postMessage({}, '*');
//   }
//     iframe.contentWindow?.addEventListener("message", messageHandler);
//     return () => {
//       iframe.contentWindow?.removeEventListener("message", messageHandler);
//     };
//   });
//   const subscription = iframeObservable.subscribe((message:any) => {
//     setData(message);
//   });
//   return () => subscription.unsubscribe();
// }, []);

//     <div className=''>

// {/* <iframe id="iframe" src="/hnx/blank?843" ref={iframeRef}></iframe> */}
// <p>{data}</p>
//     <table className="w-full tableMW ">
//   <thead>
//     <tr>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' rowSpan={2}>Mã</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>TC</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Trần</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Sàn</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' colSpan={6}>Mua</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' colSpan={3}>Khớp lệnh</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' colSpan={6}>Bán</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Tổng KL</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Mở cửa</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Cao nhất</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Thấp nhất</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>NN mua</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>NN bán</th>
//       <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Room còn lại</th>
//     </tr>
//     <tr>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G3</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL3</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G2</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL2</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' >G1</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL1</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket'>Giá</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket'>KL</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket'>+-</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G1</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL1</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G2</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL2</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G3</th>
//      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL3</th>
//     </tr>
//   </thead>
//   <tbody>
//   {products?.map((dataTable:any) =>(
//       <tr key={dataTable.RowID} id={`tr${dataTable.RowID}`}>

//         <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[18][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}> {dataTable.RowID}</td>
//         {/* <td>   {dataTable.Info.map((items:any) => (
//               items.map((item:any) =>(
//                 console.log(item),
//                 item[13]
            
//               ))
//   'border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${`formatNumberMarket()`}'
 
//       ))}</td>  */}
//          {/* TTham chiếu */}
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTC'>{formatNumber(dataTable.Info[13][1])}</td>   
//       {/* Trần */}
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTran'>{formatNumber(dataTable.Info[15][1])}</td>
//       {/* Sàn */}
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketSan'>{formatNumber(dataTable.Info[14][1])}</td>
//       {/* G3 Mua*/}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[8][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[8][1])}</td>
//        {/* KL3 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[8][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[9][1])}</td>
//        {/* G2 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[4][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[4][1])}</td>
//        {/* KL2 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[4][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[5][1])}</td>
//        {/* G1 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[0][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[0][1])}</td>
//        {/* KL1 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[0][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[1][1])}</td>
//        {/* Gia Khơp lenh */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[13][1],dataTable.Info[18][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[18][1])}</td>
//        {/* KL */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[13][1],dataTable.Info[18][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[19][1])}</td>
//        {/* +-*/}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[13][1],dataTable.Info[18][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{tinhGiaTC(dataTable.Info[13][1],dataTable.Info[18][1])}</td>
//        {/* G1 Ban*/}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[2][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[2][1])}</td>
//        {/* KL1 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[2][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[3][1])}</td>
//        {/* G2 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[6][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[6][1])}</td>
//        {/* KL2 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[6][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[7][1])}</td>  
//        {/* G3 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[10][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[10][1])}</td>
//        {/* KL3 */}
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[13][1],dataTable.Info[10][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[11][1])}</td>
//        {/* TKL */}
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket '>{formatNumberMarket(dataTable.Info[20][1])}</td> 
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[13][1],dataTable.Info[21][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[21][1])}</td>  
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[13][1],dataTable.Info[22][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[22][1])}</td>
//       <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[13][1],dataTable.Info[23][1],dataTable.Info[15][1],dataTable.Info[14][1])}`}>{formatNumberMarket(dataTable.Info[23][1])}</td>
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[25][1])}</td>
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[26][1])}</td>
//       <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[27][1])}</td>
//       </tr>  
//     ) 
//     )
    
//     }
    
//   </tbody>
// </table>
// <IframeComponent/>
// {/* <iframe id="iframe" src="/hnx/blank?843" ref={iframeRef}></iframe> */}

//     {/* <iframe src="/hsx/blank?843"></iframe> */}
//     </div>


export default IndexMarketW;
