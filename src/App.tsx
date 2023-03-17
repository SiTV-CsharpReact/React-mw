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
import HeaderMarketW from "./components/headerMarketwat/HeaderMarket";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import MenuBarMW from "./components/menuBarMW/MenuBarMW";

const AnHienContext = React.createContext(false);
function App() {
  const { t } = useTranslation(["home", "report"]);
  return (
    <div className=" bg-BGTableMarket text-white">
      <MenuMarketWatch />
      <MenuBarMW/>
      
      {/* <div className="h-420 overflow-auto" id="tableHNX">
      <HeaderMarketW/>
      </div> */}
      <Routes>
        <Route path="/" element={<IndexMarketW />} />
        <Route path="/marketwatch-hsx" element={<HSXMarketWatch />} />
        <Route path="/marketwatch-vn30" element={<VN30MarketWatch />} />
        {/* <Route path="/hnx" element={<IndexMarketW/>}/> */}
      </Routes>
      {/* <IndexMarketW/> */}
    </div>
  );
}

export default App;
