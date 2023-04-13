import { Navigate, Route, Routes } from "react-router-dom";
import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwatch/LayoutMarketWatch";
import AppProvider from "./Context/AppContext";
function App() {
  return (
    <div>
        <AppProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/chung-khoan/HNX" />} />
        <Route path="/chung-khoan" element={<Navigate to="/chung-khoan/HNX" />} />
        <Route path="/chung-khoan/:id" element={<LayoutMarketWatch />} />
      </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
