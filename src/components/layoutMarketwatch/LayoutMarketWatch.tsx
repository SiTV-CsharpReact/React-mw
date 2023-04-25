import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import MenuMarketWatch from "../indexMarketWatch/MenuMarketWatch";
import MenuBarMW from "../menuBarMW/MenuBarMW";
import OrderMarketW from "../orderFormMarketwatch/OrderFormMarketWatch";
import TableMarketWatch from "../tableMarketwatch/TableMarketWatch";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
import TableGDTTMarketWatch from "../tableMarketwatch/TableGDTTMarketWatch";
import HSXMarketWatch from "../tableMarketwatch/TableHSXMarketWatch";
import TableThongKeMarketWatch from "../tableMarketwatch/TableThongKeMarketWatch";
import AppProvider, { AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/configureStore";
import ChartMarketwatch from "../chartMarketwatch/ChartMarketwatch";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {setHeightOrderFormShow, setHeightPriceBoardShow, setOrderCount, setShowHideOrderForm, updateHeight } from "./LayoutMarketWatchSLice";
import PendingOrders from "../orderFormMarketwatch/PendingOrders";
import IntradayOrder from "../orderFormMarketwatch/IntradayOrder";
import TradingResult from "../orderFormMarketwatch/TradingResult";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import './LayoutMarketWatch.scss'
function RenderTable() {
  const params = useParams<{ id: string }>();
  // console.log(params);
  const paramstock = stocks.find((paramstock) => paramstock.id === params.id);
  const paramTable = paramstock?.id;
  switch (paramTable) {
    case "thoa-thuan-hnx":
    case "thoa-thuan-hsx":
    case "thoa-thuan-upcom":
      return <TableGDTTMarketWatch />;
    case "HNX":
    case "HNX30":
    case "BOND":
    case "UPCOM":
    case "VNI":
    case "VN30":
    case "VNXALL":
    case "VN100":
    case "VNALL":
    case "VNMID":
    case "VNSML":
    case "CW":
      return <TableMarketWatch />;
    case "thong-ke-index":
    case "thong-ke-gia":
    case "thong-ke-dat-lenh":
    case "giao-dich-khop-lenh-ndtnn":
    case "giao-dich-thoa-thuan-ndtnn":
      return <TableThongKeMarketWatch />;
    default:
      break;
  }
}
// const LayoutMarketWatch  = () => {
const LayoutMarketWatch: React.FC = () => {
  const componentVisible = useSelector(
    (state: RootState) => state.menu.visible
  );
  const hideShowOrderForm = useSelector(
    (state: RootState) => state.layoutmarketwatch.orderForm
  );
  const hideShowPendingOrder = useSelector(
    (state: RootState) => state.layoutmarketwatch.pendingOrder
  );
  const orderCount = useSelector(
    (state: RootState) => state.layoutmarketwatch.orderCount
  );
 const hideOrderForm = () =>{
  dispatch(setShowHideOrderForm(!hideShowOrderForm))
  dispatch(setHeightPriceBoardShow())
 }
 const showOrderForm = () =>{
  dispatch(setShowHideOrderForm(!hideShowOrderForm))
  dispatch(setHeightOrderFormShow())
 }
 // const height = useContext(AppContext);
  //console.log(height.heightOrderForm);
  const [popupVisible, setPopupVisible] = useState(false);
  const dispatch = useAppDispatch();
   // show hide menu tab 
  const showPendingOrder = () => {
    dispatch(setOrderCount(1));
  };
  const showTradingResult = () => {
    dispatch(setOrderCount(2));
  };
  const showIntradayOrder = () => {
    dispatch(setOrderCount(3));
  };
  // tính height window 
  const heightDragable = useSelector(   (state: RootState) => state.layoutmarketwatch.heightDragable);
  const heightMarketWatch = useSelector(   (state: RootState) => state.layoutmarketwatch.heightMarketWatch);
  const heightPriceBoard = useSelector(   (state: RootState) => state.layoutmarketwatch.heightPriceBoard);
  const heightOrderForm = useSelector(   (state: RootState) => state.layoutmarketwatch.heightOrderForm);
  const heightExpand = useSelector(   (state: RootState) => state.layoutmarketwatch.heightExpand);
  const heightTable = useSelector(   (state: RootState) => state.layoutmarketwatch.heightTable);
  //console.log(heightMarketWatch ,heightPriceBoard, heightOrderForm,heightExpand)
  // const [showhideOrderForm, setShowhideOrderForm] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0, value: "" });
  const handleContextMenu = (e: any) => {
    e.preventDefault();
    const trValue = e.target.parentElement.getAttribute("data-tr-value");
    if (trValue) {
      setPopupPosition({ x: e.clientX, y: e.clientY, value: trValue });
      setPopupVisible(true);
    }
  };
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  useEffect(() => {
    function handleResize() {
      dispatch(updateHeight());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
  // const params = useParams<{ id: string }>()
  // const paramstock  = stocks.find(
  //   paramstock => paramstock.id === params.id
  // )
  const [height, setHeight] = useState(200);
  const [dragging, setDragging] = useState(false);
  const [yOffset, setYOffset] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setYOffset(e.clientY - height);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragging) {
      const newHeight = e.clientY - yOffset;
      console.log(newHeight)
      setHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  console.log(height)
  //   const paramTable = paramstock?.id
  return (
    <div>
      <div
        className="popup z-[1000]"
        ref={popupRef}
        style={{
          display: popupVisible ? "block" : "none",
          position: "absolute",
          top: popupPosition.y,
          left: popupPosition.x,
        }}
      >
        <ul className="context-menu-list" id="idContextMenu">
          <li>
            <i className="fa fa-arrow-left text-[#00A4FF]"></i>
            <span>
              Mua <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-arrow-right text-[#f44336]"></i>
            <span>
              Bán <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-language text-[#22B14C]"></i>
            <span>
              Thông tin doanh nghiệp <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-sign-out text-[#2371AF]"></i>
            <span>
              Chi tiết <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-history text-[#009688]"></i>
            <span>
              Lịch sử giá <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-bar-chart text-[#795548]"></i>
            <span>
              Phân tích Kỹ thuật <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-close text-[#f44336]"></i>
            <span>
              Bỏ mã <b>{popupPosition.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-info-circle text-[#949831]"></i>
            <span>Ghi thành DM mặc định</span>
          </li>
        </ul>
      </div>
      {/* marketwatch */}
      <div
        className="panel-horizontally bg-BGTableMarket text-white relative overflow-hidden"
        style={{ height: heightMarketWatch }}
      >
        {/* priceboard */}
        <div
          id="panel-top"
          className="panel-top bg-black overflow-auto "
          style={{ height: heightPriceBoard }}
        >
          <div
            className="price-board-layout"
            style={{ display: componentVisible ? "block" : "none" }}
          >
            <MenuMarketWatch />
            <div className="overflow-hidden dvFixed"  style={{ height: heightTable }}>
              <MenuBarMW />
              <div
                className=" overflow-auto relative z-10 table_market"
                id="tableHNX"
                onContextMenu={handleContextMenu}
              >
                <div
                  className={`dvContentLP relative overflow-x-auto `}
                  style={{
                    height: heightTable-30,
                  }}
                >
                  {/* <div className="dvContentLP relative overflow-x-auto" style={{height:height.heightPriceBoard-57}}> */}
                  {RenderTable()}
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div
            className="chart-layout"
            style={{ display: componentVisible ? "none" : "block" }}
          >
            <ChartMarketwatch />
          </div>
        </div>
        <div className="flex justify-between">
          <div
            className="relative left-[49%]"
            onClick={hideOrderForm}
            id="divArrowBottomDown"
            style={{ display: hideShowOrderForm ? "block" : "none" }}
          >
            <ArrowDropDownIcon
              className=" text-iconShowOrder"
              sx={{ fontSize: 45, marginBottom: "-20px", marginTop: "-20px" }}
            />
          </div>
          {/* menu link */}
          <div
            style={{ display: hideShowOrderForm ? "block" : "none" }}
            className="mt-1 text-black"
          >
            <div className="panel__bottom__link flex justify-end mr-[40px] mb-[20px]">
              <div className="group   px-2" onClick={showPendingOrder}>
                <span className=" size-input hover-text-blue-L ">
                  Lệnh chờ khớp
                </span>
              </div>
              <div className="group   px-2" onClick={showTradingResult}>
                <span className=" size-input hover-text-blue-L ">
                  KQ khớp lệnh trong phiên
                </span>
              </div>
              <div className="group   px-2" onClick={showIntradayOrder}>
                <span className=" size-input hover-text-blue-L ">
                  Lệnh trong ngày
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={showOrderForm}
          id="divArrowBottomUp"
          style={{ display: !hideShowOrderForm ? "block" : "none" }}
        >
          <span
            id="spnTitlePanelBottom"
            className="text-spnTitlePanelBottom cursor-pointer	text-xl font-normal	"
          >
            ĐẶT LỆNH
          </span>
          <ArrowDropUpIcon
            className="text-5xl text-iconShowOrder  text-[#b3b3b3]"
            sx={{ fontSize: 45 }}
          />
          {/* <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root icon-spnTitlePanelBottom " focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropUpIcon"><path d="m7 14 5-5 5 5z"></path></svg> */}
        </div>
        {/* Order */}
        <div
          className=" divBot panel-footer__ordrp text-black"
          style={{ display: hideShowOrderForm ? "block" : "none", height: heightOrderForm }}
        >
          {/* {orderCount === 0 ? (
            <OrderMarketW />
          ) : orderCount === 1 ? (
            <PendingOrders />
          ) : orderCount === 2 ? (
            <TradingResult />
          ) : orderCount === 3 ? (
            <IntradayOrder />
          ) : (
            ""
          )} */}
          <div  style={{ display: orderCount === 0 ? "block" : "none" }}>
          <OrderMarketW />
          </div>
          <div style={{ display: orderCount === 1 ? "block" : "none" }}>
          <PendingOrders />
          </div>
          <div style={{ display: orderCount === 2 ? "block" : "none" }}>
          <TradingResult />
          </div>
         <div style={{ display: orderCount === 3 ? "block" : "none" }}>
         <IntradayOrder />
         </div>
        
          {/* <OrderMarketW /> */}
        </div>
        <div id="draggableH" className="ui-draggable ui-draggable-handle" 
         style={{top:heightPriceBoard, background: 'transparent'}}
         onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
         />
      </div>
    </div>
  );
};
export default LayoutMarketWatch;
