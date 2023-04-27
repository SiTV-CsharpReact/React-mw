import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import {
  setHeightDragable,
  setHeightOrderFormShow,
  setHeightPriceBoardShow,
  setOrderCount,
  setShowHideOrderForm,
  updateHeight,
} from "./LayoutMarketWatchSLice";
import PendingOrders from "../orderFormMarketwatch/PendingOrders";
import IntradayOrder from "../orderFormMarketwatch/IntradayOrder";
import TradingResult from "../orderFormMarketwatch/TradingResult";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./LayoutMarketWatch.scss";
import Draggable from "react-draggable";
import { Tooltip } from "@mui/material";
import LineChart from "../../images/line-chart-32.png";
import ListMenuBar from "../menuBarMW/ListMenuBar";
import DanhMuc from "../menuBarMW/DanhMuc";
import SettingTable from "../menuBarMW/SettingTable";
import DateTime from "../menuBarMW/DateTime";
import { convertLength } from "@mui/material/styles/cssUtils";
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
const heightHeader = 40; //height header
const heightPannelLink = 46;
const heightArrow = 38; // đặt lệnh
const expand = 27;
const heightWindow = window.innerHeight; /// height 1000  // - đi header
const heightMarketWatchOr = heightWindow - heightHeader - heightPannelLink;
const heightMarketWatch = heightWindow - 40; // height market watch
const heightOrderForm = (heightMarketWatch / 10) * 4.3;
const heightPriceBoard = heightMarketWatch - heightOrderForm; // height bang gia = height market watch - height order form
const heightTable = heightPriceBoard - expand;
interface resizeState {
  orderForm: boolean;
  pendingOrder: boolean;
  orderCount: number;
  heightWindow: number;
  heightMarketWatch: number;
  heightPriceBoard: number;
  heightOrderForm: number;
  heightPannelLink: number;
  heightArrow: number;
  heightExpand: number;
  heightTable: number;
}
const initialState: resizeState = {
  orderForm: true,
  pendingOrder: true,
  orderCount: 0,
  heightWindow: heightWindow,
  heightMarketWatch: heightWindow - heightHeader,
  heightPriceBoard: ((heightWindow - heightHeader) / 10) * 5.7,
  heightOrderForm: ((heightWindow - heightHeader) / 10) * 4.3 - heightPannelLink,
  heightPannelLink: heightPannelLink,
  heightArrow: heightArrow,
  heightExpand: expand,
  heightTable: heightTable,
};
// const LayoutMarketWatch  = () => {
const LayoutMarketWatch: React.FC = () => {
  
  // tao useState resize
  const [heightComponent, setHeightComponent] = useState(initialState);
  useEffect(() => {
    
    function handleResize() {
      setHeightComponent({...heightComponent,
         heightMarketWatch:window.innerHeight-40, 
         heightOrderForm:((window.innerHeight-40)/10) * 4.3 -46,
         heightPriceBoard:((window.innerHeight-40)/10) * 5.7, 
         heightTable:((window.innerHeight-40)/10) * 5.7 - heightComponent.heightExpand})
      // console.log(window.innerHeight)
    }
    console.log(heightComponent)
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerHeight]);
  const draggingRef = useRef<boolean>(false);
  const yOffsetRef = useRef<number>(0);
  // kéo thả orderform
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    yOffsetRef.current = e.clientY - heightComponent.heightPriceBoard;
    e.dataTransfer?.setDragImage(new Image(), 0, 0); // ẩn hiệu ứng kéo thả mặc định
  };
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
      const newHeight = e.clientY - yOffsetRef.current;
      if (e.clientY !== 0) {
        setHeightDragable(newHeight);
      }
    }
  };
  // keo tha tinh lai height
  const setHeightDragable = (height: number) => {
    setHeightComponent({
      ...heightComponent,
      heightPriceBoard: height,
      heightOrderForm: heightMarketWatchOr - height,
      heightTable: height - 27,
      orderForm:true
    });
  };
  // show hide order
  const hideOrderForm = () => {
    setHeightComponent({
      ...heightComponent,
      orderForm: !heightComponent.orderForm,
      heightPriceBoard: heightComponent.heightMarketWatch - heightArrow,
      heightTable: heightComponent.heightMarketWatch - heightArrow - heightComponent.heightExpand,
    });
    // dispatch(setHeightPriceBoardShow())
  };
  const showOrderForm = () => {
    setHeightComponent({
      ...heightComponent,
      orderForm: !heightComponent.orderForm,
      heightPriceBoard: heightComponent.heightMarketWatch - heightComponent.heightOrderForm - heightPannelLink,  
      heightTable:heightComponent.heightMarketWatch - heightComponent.heightOrderForm- heightPannelLink - heightComponent.heightExpand,
    }); 
  };
  
  const setHeightExpand = (newHeightExpand: number) => {
    if(heightComponent.orderForm === true){
      setHeightComponent((prevState) => ({
        ...prevState,
        heightExpand: newHeightExpand,
        heightTable: heightComponent.heightPriceBoard - newHeightExpand,
        // heightPriceBoard:heightPriceBoard ,
      }));
    }
    
    else{
      setHeightComponent((prevState) => ({
        ...prevState,
        heightExpand: newHeightExpand,
        heightTable : heightComponent.heightMarketWatch - newHeightExpand -heightArrow,
        heightPriceBoard : heightComponent.heightMarketWatch -heightArrow,
      }));
     }
  };
  // show popup theo mã

  const componentVisible = useSelector(
    (state: RootState) => state.menu.visible
  );
  const hideShowOrderForm = heightComponent.orderForm;
  const orderCount = heightComponent.orderCount;

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

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    draggingRef.current = false;
  };
  //console.log(heightComponent);
  return (
    <div>
      {/* popup theo table */}
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
        className="resize panel-horizontally bg-BGTableMarket text-white relative overflow-hidden"
        style={{ height: heightComponent.heightMarketWatch }}
      >
        {/* priceboard */}
        <div
          id="panel-top"
          className="resize panel-top bg-black overflow-auto "
          style={{ height: heightComponent.heightPriceBoard }}
        >
          <div
            className="price-board-layout"
            style={{ display: componentVisible ? "block" : "none" }}
          >
            {/* menu marketwatch */}
            <div
              className="relative overflow-hidden"
              style={{
                height:
                  heightComponent.heightExpand === 27
                    ? "27px"
                    : heightComponent.heightExpand === 67
                    ? "67px"
                    : "169px",
              }}
            >
              <MenuMarketWatch />
            </div>
            {/* Menu Table */}
            <div
              className="overflow-hidden dvFixed"
              style={{ height: heightComponent.heightTable }}
            >
              <div className="flex justify-between h-30 bg-headerMenuTableMarket relative">
                <div className="flex ">
                  <ListMenuBar />
                  <DanhMuc />

                  {heightComponent.heightExpand === 27 ? (
                    <div>
                      <Tooltip title="Hiện thị index">
                        <span
                          id="spExpand"
                          className="imgExpandOpen"
                          onClick={() => setHeightExpand(67)}
                        ></span>
                      </Tooltip>
                    </div>
                  ) : heightComponent.heightExpand === 67 ? (
                    <div>
                      <Tooltip title="Hiện đồ thị">
                        <span
                          id="spExpand"
                          className="imgExpandOpen"
                          onClick={() => setHeightExpand(169)}
                        ></span>
                      </Tooltip>
                    </div>
                  ) : (
                    <div>
                      <Tooltip title="Ẩn đồ thị">
                        <span
                          id="spExpand"
                          className="imgExpand"
                          onClick={() => setHeightExpand(27)}
                        ></span>
                      </Tooltip>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div>
                    <Tooltip title="Đồ thị">
                      <button className="btn btn-sm btn-chart">
                        <img src={LineChart} width={20} height={20} alt="" />
                        {/* <InsertChartIcon style={{ fontSize: 30, marginRight: 10 }} /> */}
                      </button>
                    </Tooltip>
                  </div>
                  <SettingTable />
                  <DateTime />

                  <div className="px-1">
                    <Tooltip title="Hướng dẫn sử dụng">
                      <input
                        className="imgHelp"
                        type="button"
                        id="btHelp"
                        data-toggle="modal"
                        data-target="#mdHelp"
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div
                className=" overflow-auto relative z-10 table_market"
                id="tableHNX"
                onContextMenu={handleContextMenu}
              >
                <div
                  className={`dvContentLP relative overflow-x-auto `}
                  style={{
                    height: heightComponent.heightTable - 30,
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
        {/* orderform */}

        <div>
          <div className="flex justify-between">
            <div
              className="relative left-[49%]"
              onClick={hideOrderForm}
              id="divArrowBottomDown"
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
            >
              <ArrowDropDownIcon
                className=" text-iconShowOrder"
                sx={{ fontSize: 45, marginBottom: "-20px", marginTop: "-20px" }}
              />
            </div>
            {/* menu link */}
            <div
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
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
            style={{ display: !heightComponent.orderForm ? "block" : "none" }}
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
            style={{
              display: hideShowOrderForm ? "block" : "none",
              height: heightComponent.heightOrderForm,
            }}
          >
            <div style={{ display: orderCount === 0 ? "block" : "none" }}>
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
          <div
            id="draggableH"
            className="ui-draggable ui-draggable-handle"
            style={{ top: heightComponent.heightPriceBoard, background: "transparent" }}
            onClick={(e) => e.stopPropagation()}
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        </div>
      </div>
    </div>
  );
};
export default LayoutMarketWatch;
