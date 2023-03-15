import { useEffect, useRef, useState } from "react";
import IndexMarketW from "./components/IndexMarketW";
import axios from "axios";
import { DataHNX } from "./models/modelTableHNX";
import { Route, Routes } from "react-router-dom";
import HSXMarketWatch from "./components/HSXMarketWatch";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VN30MarketWatch from "./components/VN30MarketWatch";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { resizeWindow } from "./utils/resizeWindow";
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
  useEffect(() => {
    resizeWindow()
  }, []);
  //var heightHeader2 = document.getElementById("header-fpts")
 // var pannelTop = document.getElementById("pannel-top")
  //if(heightHeader2) console.log(heightHeader2.offsetHeight)
  //if(pannelTop) console.log(pannelTop.offsetHeight)
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
    <div className=' bg-BGTableMarket text-white' id="pannel-top">
   
   <div>
      <ul className="flex p-1">
  <li className="mr-10">
  <p className="text-sm"><span id="" className="mar_">VNXALL: </span><span id="VNXALL_IndexValue" className="text-red ">1,596.14 </span><span id="VNXALL_Image" className="text-red"><ArrowDropDownIcon/></span><span id="VNXALL_Change" className="text-red ">-6.73</span><span id="" className="text-red px-0.5"><span id="VNXALL_ChangePercent" className="text-red px-0.5">-0.42</span>%</span></p>

  </li>
  <li className="mr-10">
  <p className="text-sm"><span id="" className="mar_">VNI: </span><span id="VNI_IndexValue" className="text-red ">1,053</span><span id="VNI_Image" className="arrowDown text-red"><ArrowDropDownIcon/></span><span id="VNI_Change" className="text-red ">-2.95</span><span id="" className="text-red px-0.5"><span id="VNI_ChangePercent" className="text-red px-0.5">-0.28</span>%</span></p>
  </li>
  <li className="mr-10">
  <p className="text-sm"><span id="" className="mar_">HNX: </span><span id="i02_3" className="text-red ">207.86</span><span id="i02_Image" className="arrowDown text-red"><ArrowDropDownIcon/></span><span id="i02_5" className="text-red">-1.17</span><span id="" className="text-red px-0.5"><span id="i02_6" className="text-red px-0.5">-0.56</span>%</span></p>
  </li>
  <li className="mr-10">
  <p className="text-sm"><span id="" className="mar_">HNX30: </span><span id="i41_3" className="text-red ">367.92</span><span id="i41_Image" className="arrowDown text-red"><ArrowDropDownIcon/></span><span id="i41_5" className="text-red ">-3.02</span><span id="" className="text-red px-0.5"><span id="i41_6" className="text-red px-0.5">-0.81</span>%</span></p>
  </li>
  <li className="mr-10">
  <p className="text-sm"><span id="" className="mar_">VN30: </span><span id="VN30_IndexValue" className="text-red ">1,047.2</span><span id="VN30_Image" className="arrowDown text-red"><ArrowDropDownIcon/></span><span id="VN30_Change" className="text-red ">-3.08</span><span id="" className="text-red px-0.5"><span id="VN30_ChangePercent" className="text-red px-0.5">-0.29</span>%</span></p>
  </li>
  <li className="mr-10">
  <p className="text-sm"><span id="" className="mar_">UPCOM: </span><span id="i03_3" className="text-green ">76.77</span><span id="i03_Image" className="arrowUp text-green"><ArrowDropUpIcon/></span><span id="i03_5" className="text-green ">0.17</span><span id="" className="text-green px-0.5"><span id="i03_6" className="text-green px-0.5">0.22</span>%</span></p>
  </li>
  </ul>
      </div>
      <div className='flex'>
     
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
