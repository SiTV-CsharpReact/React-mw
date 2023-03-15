import { useEffect, useRef, useState } from "react";
import IndexMarketW from "./components/IndexMarketW";
import axios from "axios";
import { DataHNX } from "./models/modelTableHNX";
import { Route, Routes } from "react-router-dom";
import HSXMarketWatch from "./components/HSXMarketWatch";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VN30MarketWatch from "./components/VN30MarketWatch";
import MenuMarketWatch from "./components/MenuMarketWatch";
import { Tooltip } from "@mui/material";
import React from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
// Format lại chuỗi thời gian và ngày theo định dạng mong muốn
const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second: '2-digit',hour12: false });
const formattedDate = time.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
//const formattedDate = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  return (
    <div className="d-flex float-right pr-10">    
      <span className="text-xs font-medium px-1.5">{formattedDate}</span>
      <span className="text-xs font-medium px-1.5">{formattedTime}</span>
    </div>
  );
}
const AnHienContext = React.createContext(false);
function App() {
 

  const { t } = useTranslation(["home", "report"]);
  return (
    <div className=' bg-BGTableMarket text-white'>
       <MenuMarketWatch/>
      <div className='flex justify-between'>
     <div className="flex">
     <div className="group bg-activeListMarketWatch inline-block p-1 border-r border-black rounded-t cursor-pointer" >
          <span className="uppercase text-sm ">HNX </span>
          <ul className="absolute hidden text-black pt-1.5 group-hover:block">
          <li >
             <Link to="/" className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-2 px-4 block whitespace-no-wrap border-b border-bdListMarketWatch text-white">
              hnx
            </Link>
            </li>
          </ul>
        </div>
        <div className="group inline-block p-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="  uppercase text-sm ">HOSE</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
            <li >
            <Link to="/marketwatch-hsx" className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-2 px-4 block whitespace-no-wrap border-b border-bdListMarketWatch text-white">
              VNI
            </Link>
            </li>
            <li >
            <Link to="/marketwatch-vn30" className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-2 px-4 block whitespace-no-wrap text-white" >
              VN30
            </Link>
            </li>
       
          </ul>
        </div>   
        <div>
          <Tooltip title="Hiện đồ thị">
          <span id="spExpand" className="imgExpandOpen"></span>
          </Tooltip>
            
        </div>
     </div>
       
        <Clock/>
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
