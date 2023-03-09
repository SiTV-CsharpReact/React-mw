import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { DataHNX } from '../models/modelTableHNX';
import { formatNumber, formatNumberMarket, setColorMarket, tinhGiaTC} from "../utils/util";
import "../styles/MW.css"
import LoadingComponent from '../layout/LoaddingComponent';
import { Observable } from 'rxjs/internal/Observable';
import IframeComponent from './IFrameComponent';
import { HubConnectionBuilder } from "@aspnet/signalr/dist/esm/HubConnectionBuilder";
import * as signalR from '@aspnet/signalr';
const updateIndex =(objRoot:any)=>{
  console.log(objRoot);
}
const IndexMarketW = () => {
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState("");
  const [products, setProducts] = useState<[] | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
      connection.start().then(() => {
        console.log('Connected to SignalR hub!');
        connection.on('ReceiveMessage', (user: string, message: string) => {
          console.log(`Received message from ${user}: ${message}`);
        });
      }).catch((error: Error) => console.log(error));
    }
  }, [connection]);
  console.log(connection)
  // useEffect(() => {
  //   if (iframeRef.current) {
  //     iframeRef.current.onload = () => {
  //       // Do something when iframe is loaded
  //     };
  //   }
  // }, [iframeRef]);
  useEffect(() => {
    axios.get(`/hnx/data.ashx?s=quote&l=HNXIndex`)
    .then(res=>setProducts(res.data))
    .catch(error=>{
      console.log(error);
    })
    .finally(()=> setLoading(false));
}, []);
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
if (loading) return <LoadingComponent message="Loading..."/>
   console.log(products)
   const test= products;
  return (
    <></>
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
  )
}

export default IndexMarketW