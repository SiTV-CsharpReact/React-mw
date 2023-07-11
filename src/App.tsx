import { Navigate, Route, Routes, redirect } from "react-router-dom";
// import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwatch/LayoutMarketWatch";
import AppProvider from "./Context/AppContext";
import SlidesMarketWatch from "./components/indexMarketWatch/SlidesMarketWatch";
import DynamicDashboard from "./components/dynamicDashboard/DynamicDashboard";
import MyLayout from "./components/dynamicDashboard/MyLayout";
import AssetReport from "./components/AssetReport/AssetReport";
import TableMarketWatchTest from "./components/tableMarketwatch/TableMarketWatchTest";
import TradingViewWidget from "./components/Chart/TradingViewWidget";
import HistoryOrder from "./pages/Report/HistoryOrder";
import HistoryMatching from "./pages/Report/HistoryMatching";
import HistoryForpay from "./pages/Report/HistoryForPay";
import MoneyTransferForm from "./pages/Transfer/MoneyTransferForm";
import MoneyTransferDerivative from "./pages/Transfer/MoneyTransferDerivative ";
import MoneyHistory from "./pages/Transfer/MoneyHistory";
import HistoryAdvReportMoney from "./pages/Report/HistoryAdvReportMoney";
import MoneyTransferMain from "./pages/Transfer/MoneyTransferMain";
import OrdersavingsTransfer from "./pages/Transfer/OrdersavingsTransfer";
import SavingshistoryTransfer from "./pages/Transfer/SavingshistoryTransfer";
import FinalizesavingsTransfer from "./pages/Transfer/FinalizesavingsTransfer";
import AdvanceRightCustody from "./pages/RightCustody/AdvanceRightCustody";
import AdvanceHistoryCustody from "./pages/RightCustody/AdvanceHistoryCustody";
import HistoryCkSell from "./pages/Oddlot/HistoryCkSell";
import OverViewCustody from "./pages/RightCustody/OverViewCustody";
import ConditionalOrder from "./pages/Stoploss/ConditionalOrder";
import ConditionalOrderBook from "./pages/Stoploss/ConditionalOrderBook";
import RegistrationOnline from "./pages/RightCustody/RegistrationOnline";
import CurrMargin from "./pages/Report/CurrMargin";
import StockSettlement from "./pages/Report/StockSettlement";
import CashSettlement from "./pages/Report/CashSettlement";
import ReportCW from "./pages/Report/ReportCW";
import ListFee from "./pages/Report/ListFee";
import DepositoryHistory from "./pages/RightCustody/DepositoryHistory";
import ReportNAV from "./pages/Report/ReportNAV";
// import ReportNAV from "./components/ReportNAV/ReportNAV";
import ReportTransSummary from "./pages/Report/ReportTransSummary";
import StockDetails from "./pages/Report/StockDetails";
import TransBalance from "./components/TransBalance/TransBalance";
import Header from "./components/header/Header";
import LayoutAthentication from "./layout/LayoutAuthen";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "./store/configureStore";
import { useEffect } from "react";
import { getToken } from "./components/Authencation/AuthencationSlice";
import MainlayoutScreen from "./layout/LayoutSreen";
import ConditionalOderText from "./pages/Stoploss/ConditionalOderText";
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { token ,isLoadingToken } = useAppSelector((state: RootState) => state.Authen);
  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);
 
  return (
    <AppProvider>
      <Header/>
      <Routes>
            <Route path="/" element={  <LayoutMarketWatch />     } />
            <Route path="/test" element={<TableMarketWatchTest />} />
            <Route
              path="/dynamic-dashboard-test"
              element={   <DynamicDashboard />  }
            />
            <Route path="/dynamic-dashboard" element={<MyLayout />} />
           
            <Route
              path="/report/ReportTransBalance"
              element={<TransBalance />}
            />
            <Route path="/report/AssetReport2" element={<AssetReport />} />
            <Route path="/report/ReportNAV" element={ <ReportNAV />  } />

            <Route path="/report/reportprofitloss" element={<AssetReport />} />

            <Route
              path="/report/ReportTransSummary"
              element={<ReportTransSummary />}
            />
            <Route path="/report/StockDetails" element={<StockDetails />} />

            <Route path="/report/CurrMargin" element={<CurrMargin />  } />
            <Route path="/report/StockSettlement" element={<StockSettlement />  } />
            <Route path="/report/CashSettlement" element={ <CashSettlement/>  } />
            <Route path="/report/StockSettlement" element={<AssetReport />  } />
            <Route path="/report/CashSettlement" element={ <AssetReport /> } />

 

            <Route
              path="/report/ClientActivityRange"
              element={ <HistoryOrder />  }
            />
            <Route path="/report/TradeLog" element={ <HistoryMatching />  } />
            <Route
              path="/report/PendingSettlement"
              element={ <HistoryForpay />  }
            />
  
            <Route
              path="/report/AdvReport"
              element={ <HistoryAdvReportMoney />  }
            />
           
            <Route path="/transfer" element={<MoneyTransferMain />  } />
            <Route path="/transfer/template" element={<MoneyTransferForm />  } />
            <Route
              path="/transfer/home/transferds"
              element={<MoneyTransferDerivative />  }
            />
            <Route path="/transfer/history" element={<MoneyHistory />  } />
            <Route
              path="/transfer/ordersavings"
              element={<OrdersavingsTransfer />}
            />
            <Route
              path="/transfer/savingshistory"
              element={<SavingshistoryTransfer />}
            />
            <Route
              path="/transfer/finalizesavings"
              element={<FinalizesavingsTransfer />}
            />

            <Route path="/transfer/home/transferds" element={<AssetReport />} />

            <Route
              path="/rightscustody/AdvanceOrderForm"
              element={<AdvanceRightCustody />}
            />
            <Route
              path="/rightscustody/AdvanceHistory"
              element={<AdvanceHistoryCustody />}
            />
            <Route
              path="/rightscustody/OverView"
              element={<OverViewCustody />}
            />
            <Route
              path="/rightscustody/CustodyOrderForm"
              element={<RegistrationOnline />}
            />

            <Route
              path="/rightscustody/AdvanceOrderForm"
              element={<AssetReport />}
            />

         
          <Route path="/stoploss/orderform" element={<ConditionalOrder />} />
          <Route
            path="/stoploss/orderform_test"
            element={<ConditionalOderText />}
          />

          <Route path="/stoploss/history" element={<ConditionalOrderBook />} />
       
          <Route path="/oddlot/History" element={<HistoryCkSell />} />
          <Route path="/tradingview" element={<TradingViewWidget />} />
        </Routes>
      </AppProvider>
  );
};

export default App;
