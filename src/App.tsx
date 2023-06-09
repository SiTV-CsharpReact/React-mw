import { Navigate, Route, Routes } from "react-router-dom";
// import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwatch/LayoutMarketWatch";
import AppProvider from "./Context/AppContext";
import SlidesMarketWatch from "./components/indexMarketWatch/SlidesMarketWatch";
import DynamicDashboard from "./components/dynamicDashboard/DynamicDashboard";
import MyLayout from "./components/dynamicDashboard/MyLayout";
import AssetReport from "./components/AssetReport/AssetReport";
import TableMarketWatchTest from "./components/tableMarketwatch/TableMarketWatchTest";
import TradingViewWidget from "./components/Chart/TradingViewWidget";
function App() {
  return (
    <div>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LayoutMarketWatch />} />
          <Route path="/test" element={<TableMarketWatchTest />} />
          <Route
            path="/dynamic-dashboard-test"
            element={<DynamicDashboard />}
          />
          <Route path="/dynamic-dashboard" element={<MyLayout />} />
          {/* Report */}
          <Route path="/report/ReportTransBalance" element={<AssetReport />} />  
          <Route path="/report/AssetReport2" element={<AssetReport />} />  
          <Route path="/report/ReportNAV" element={<AssetReport />} />
          <Route path="/report/reportprofitloss" element={<AssetReport />} />
          <Route path="/report/ReportTransSummary" element={<AssetReport />} />
          <Route path="/report/StockDetails" element={<AssetReport />} />  
          <Route path="/report/CurrMargin" element={<AssetReport />} />
          <Route path="/report/StockSettlement" element={<AssetReport />} />
          <Route path="/report/CashSettlement" element={<AssetReport />} />
          <Route path="/report/CurrMargin" element={<AssetReport />} />
          <Route path="/report/StockSettlement" element={<AssetReport />} />
          <Route path="/report/CashSettlement" element={<AssetReport />} />
          {/* Transfer */}
          <Route path="/transfer" element={<AssetReport />} />
          <Route path="/transfer/template" element={<AssetReport />} />
          <Route path="/transfer/home/transferds" element={<AssetReport />} />
          <Route path="/transfer/history" element={<AssetReport />} />
          <Route path="/transfer/ordersavings" element={<AssetReport />} />
          <Route path="/transfer/savingshistory" element={<AssetReport />} />
          <Route path="/transfer/home/transferds" element={<AssetReport />} />
          {/* Rightcustory */}
          <Route path="/rightscustody/AdvanceOrderForm" element={<AssetReport />}/>
          <Route path="/rightscustody/AdvanceHistory" element={<AssetReport />}/>
          <Route path="/rightscustody/OverView" element={<AssetReport />} />
          <Route path="/rightscustody/CustodyOrderForm"element={<AssetReport />}/>
          <Route path="/rightscustody/AdvanceOrderForm" element={<AssetReport />}/>
          <Route path="/rightscustody/AdvanceHistory" element={<AssetReport />} />
          {/* Stoploss */}
          <Route path="/stoploss/orderform" element={<AssetReport />} />
          <Route path="/stoploss/history" element={<AssetReport />} />
          <Route path="/stoploss/orderform" element={<AssetReport />} />
          {/* Oddlot */}
          <Route path="/oddlot/History" element={<AssetReport />} />
          <Route path="/rightscustody/AdvanceHistory" element={<AssetReport />}/>
          
          <Route path="/tradingview" element={<TradingViewWidget />}/>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
