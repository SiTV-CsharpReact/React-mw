import IndexMarketW from "./components/tableMarketwat/IndexMarketW";
import { Route, Routes } from "react-router-dom";
import HSXMarketWatch from "./components/tableMarketwat/HSXMarketWatch";
import { useTranslation } from "react-i18next";
import VN30MarketWatch from "./components/tableMarketwat/VN30MarketWatch";
import React from "react";
import Table from "./components/tableMarketwat/HNX30MarketWatch";
import AssetReport from "./pages/Report/AssetReport";
function App() {
  const { t } = useTranslation(["home", "report"]);
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<IndexMarketW />} />
        <Route path="/marketwatch-hsx" element={<HSXMarketWatch />} />
        <Route path="/marketwatch-vn30" element={<VN30MarketWatch />} />
        <Route path="/marketwatch-hnx30" element={<Table />} />
        <Route path="/report-bcts" element={<AssetReport />} />
        {/* <Route path="/hnx" element={<IndexMarketW/>}/> */}
      </Routes>
      {/* <IndexMarketW/> */}
    </div>
  );
}

export default App;
