import { Route, Routes } from "react-router-dom";
import HSXMarketWatch from "./components/tableMarketwat/HSXMarketWatch";
import { useTranslation } from "react-i18next";
import VN30MarketWatch from "./components/tableMarketwat/VN30MarketWatch";
import React from "react";
import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwat/LayoutMarketWatch";
function App() {
  const { t } = useTranslation(["home", "report"]);
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<LayoutMarketWatch />} >
          <Route path=":id" element={<LayoutMarketWatch />} />
        </Route>
        {/* <Route path="/marketwatch-hsx" element={<HSXMarketWatch />} />
        <Route path="/marketwatch-vn30" element={<VN30MarketWatch />} />
        <Route path="/marketwatch-hnx30" element={<HNX30MarketWatch />} />
        <Route path="/report-bcts" element={<AssetReport />} /> */}
        {/* <Route path="/HNI" element={<HNIMarketWatch />} />
        <Route path="/Table" element={<LayoutMarketWatch />} /> */}
        {/* <Route path="/hnx" element={<IndexMarketW/>}/> */}
      </Routes>
      {/* <IndexMarketW/> */}
    </div>
  );
}

export default App;
