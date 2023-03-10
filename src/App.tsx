import { useEffect, useRef, useState } from "react";
import IndexMarketW from "./components/IndexMarketW";
import axios from "axios";
import { DataHNX } from "./models/modelTableHNX";
import { Route, Routes } from "react-router-dom";
import HSXMarketWatch from "./components/HSXMarketWatch";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VN30MarketWatch from "./components/VN30MarketWatch";


var updateIndex = (objRoot:any)=>{
  var arrData = JSON.parse(objRoot.Change);
}
// interface IData {
//   id: number;
//   name: string;
// }
// var g_Utils = {
//   showLoading: function (x:any) { },
//   hideLoading: function (x:any) { },
//   updateQuote: function (x:any) {

//   },
//   updateIndex: function (x:any) { },
//   updateQuoteRealTime: function (x:any) { // xử lí lấy giá realtime
//       //console.log(x);
     
//   }
// }

// // ifarme giá
// var g_SideBar = {
//   updateQuote: function (x:any) { }
// }

function App() {
  const { t } = useTranslation(["home", "report"]);


  
  //console.log(data.replaceAll('/@"\\"/g',''))

//   const [products, setProducts] = useState<DataHNX | null>(null);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   useEffect(() => {
//     if (iframeRef.current) {
//       iframeRef.current.onload = () => {
//         // Do something when iframe is loaded
//       };
//     }
//   }, [iframeRef]);
//   useEffect(() => {
//     axios.get(`/hnx/data.ashx?s=quote&l=HNXIndex`)
//     .then(res=>setProducts(res.data))
//     .catch(error=>{
//       console.log(error);
//     })
   
// }, []);
// console.log(products);
  return (
    <div className=' bg-BGTableMarket text-white'>
    
       
      <div className='flex pt-14'>
        <div className="group bg-activeListMarketWatch inline-block p-1 border-r border-black rounded-t cursor-pointer" >
          <span className="uppercase text-sm ">HNX </span>
          <ul className="absolute hidden text-black pt-1.5 group-hover:block">
          <li >
             <Link to="/" className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-2 px-4 block whitespace-no-wrap border-b border-bdListMarketWatch">
              hnx
            </Link>
            </li>
            {/* <li >
            <Link to="/" className=" bg-bgListMarketWatch text-white hover:bg-activeListDropMarketWatch py-2 px-4 block whitespace-no-wrap border-b border-bdListMarketWatch">
              hnx30
            </Link>
            </li>
            <li >
            <Link to="/" className=" bg-bgListMarketWatch text-white hover:bg-activeListDropMarketWatch py-2 px-4 block whitespace-no-wrap border-b border-bdListMarketWatch">
              BOND
            </Link>
            </li>
            <li >
            <Link to="/" className=" bg-bgListMarketWatch text-white hover:bg-activeListDropMarketWatch py-2 px-4 block whitespace-no-wrap ">
              Giao dịch thỏa thuận
            </Link>
            </li> */}
          </ul>
        </div>
        <div className="group inline-block p-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="  uppercase text-sm ">HOSE</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
            <li >
            <Link to="/marketwatch-hsx" className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-2 px-4 block whitespace-no-wrap border-b border-bdListMarketWatch">
              VNI
            </Link>
            </li>
            <li >
            <Link to="/marketwatch-vn30" className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-2 px-4 block whitespace-no-wrap" >
              VN30
            </Link>
            </li>
       
          </ul>
        </div>   
      </div> 
  
      <Routes>
      <Route path="/" element={<IndexMarketW/>}/>
        <Route path="/marketwatch-hsx" element={<HSXMarketWatch/>}/>
        <Route path="/marketwatch-vn30" element={<VN30MarketWatch/>}/>
        {/* <Route path="/hnx" element={<IndexMarketW/>}/> */}
      </Routes>
  {/* <IndexMarketW/> */}
   
    

    </div>
  
  );
}

export default App;
