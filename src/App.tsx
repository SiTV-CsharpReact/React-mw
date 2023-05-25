import { Navigate, Route, Routes } from "react-router-dom";
import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwatch/LayoutMarketWatch";
import AppProvider from "./Context/AppContext";
import SlidesMarketWatch from "./components/indexMarketWatch/SlidesMarketWatch";
import DraggableDiv from "./pages/dragable";
import DynamicDashboard from "./components/dynamicDashboard/DynamicDashboard";
import MyLayout from "./components/dynamicDashboard/MyLayout";
function App() {
         
  
  return (
    <div>
      
        <AppProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/chung-khoan/HSX" />} />
        <Route path="/chung-khoan" element={<Navigate to="/chung-khoan/HSX" />} />
        <Route path="/chung-khoan/:id" element={<LayoutMarketWatch />} />   
        <Route path="/dynamic-dashboard-test" element={<DynamicDashboard />} /> 
        <Route path="/dynamic-dashboard" element={<MyLayout />} /> 
        {/* <Route path="/chung-khoan/danh-muc/:id" element={<LayoutMarketWatch />} /> */}
        <Route path="/report/ClientActivityRange" element={<SlidesMarketWatch />} />
        <Route path="/report/TradeLog" element={<DraggableDiv />} />
        {/* <Route path="/chung-khoan" element={<LayoutMarketWatch />} />    */}
      </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
