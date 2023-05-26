import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MenuMarketWatch from "../indexMarketWatch/MenuMarketWatch";
// import MenuBarMW from "../menuBarMW/MenuBarMW";
import OrderMarketW from "../orderFormMarketwatch/OrderFormMarketWatch";
import TableMarketWatch from "../tableMarketwatch/TableMarketWatch";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
import TableGDTTMarketWatch from "../tableMarketwatch/TableGDTTMarketWatch";
import TableThongKeMarketWatch from "../tableMarketwatch/TableThongKeMarketWatch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/configureStore";
import ChartMarketwatch from "../chartMarketwatch/ChartMarketwatch";
import PendingOrders from "../orderFormMarketwatch/PendingOrders";
import IntradayOrder from "../orderFormMarketwatch/IntradayOrder";
import TradingResult from "../orderFormMarketwatch/TradingResult";
import "./LayoutMarketWatch.scss";
import { Button, Tooltip } from "@mui/material";
import ListMenuBar from "../menuBarMW/ListMenuBar";
import DanhMuc from "../menuBarMW/DanhMuc";
import SettingTable from "../menuBarMW/SettingTable";
import DateTime from "../menuBarMW/DateTime";
import { setStatusChart } from "../menuBarMW/menuSlice";
//image
import LineChart from "../../images/line-chart-32.png";
import Close from "../../images/x28.png";
import { showChartMarketwatch } from "../chartMarketwatch/chartMarketwatchSlice";
import PopupTableMarketwatch from "../popupTableMarketwatch/popupTableMarketwatch";
import { resizeState } from "../../models/resizeWindow";
import TablePopupMarketwatch from "../tablePopupMarketwatch/TablePopupMarketwatch";
import { DraggableData, DraggableEvent } from "react-draggable";
function RenderTable() {
  const params = useParams<{ id: string }>();
  //console.log(params)
  // console.log(params);
  const paramstock = stocks.find((paramstock) => paramstock.id === params.id);
  const paramTable = paramstock?.id;
  // console.log(paramTable)
  switch (paramTable) {
    case "thoa-thuan-hnx":
    case "thoa-thuan-hsx":
    case "thoa-thuan-upcom":
      return <TableGDTTMarketWatch />;
    case "HNX":
    case "HNX30":
    case "BOND":
    case "UPCOM":
    case "HSX":
    case "VNI":
    case "VN30":
    case "VNXALL":
    case "VN100":
    case "VNALL":
    case "VNMID":
    case "VNSML":
    case "CW":
    case "danh-muc":
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
const heightPannelLink = 35;
const heightArrow = 38; // đặt lệnh
const expand = 27;
const heightWindow = window.innerHeight; /// height 1000  // - đi header
const heightMarketWatchOr = heightWindow - heightHeader - heightPannelLink;
const heightMarketWatch = heightWindow - 40; // height market watch
const heightOrderForm = (heightMarketWatch / 10) * 4.3;
const heightPriceBoard = heightMarketWatch - heightOrderForm; // height bang gia = height market watch - height order form
const heightTable = heightPriceBoard - expand;

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
  const dispatch = useAppDispatch();
  // tao useState resize khi height window thay đổi
  const [heightComponent, setHeightComponent] = useState(initialState);
  const [selectedValue, setSelectedValue] = useState({
    x: 0,
    y: 0,
    value: "",
    status: false,
  });
  // tinh height khi đổi từ màn hình này sang màn hình khác
  useEffect(() => {
    function handleResize() {
      setHeightComponent({
        ...heightComponent,
        heightMarketWatch: window.innerHeight - 40,
        heightOrderForm: ((window.innerHeight - 40) / 10) * 4.3 - 46,
        heightPriceBoard: ((window.innerHeight - 40) / 10) * 5.7,
        heightTable:
          ((window.innerHeight - 40) / 10) * 5.7 - heightComponent.heightExpand,
      });
      // console.log(window.innerHeight)
    }
    // console.log(heightComponent);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerHeight]);
  // băt sự kiện esc đóng form menu tab
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setHeightComponent({
          ...heightComponent,
          orderCount: 0,
          heightMarketWatch: heightComponent.heightMarketWatch,
          heightOrderForm: heightComponent.heightOrderForm,
          heightPriceBoard: heightComponent.heightPriceBoard,
          heightTable: heightComponent.heightTable,
          heightExpand: heightComponent.heightExpand,
        });
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
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
      orderForm: true,
    });
    console.log(heightComponent);
  };
  // show hide order
  const hideOrderForm = () => {
    setHeightComponent({
      ...heightComponent,
      orderForm: !heightComponent.orderForm,
      heightPriceBoard: heightComponent.heightMarketWatch - heightArrow,
      heightTable: heightComponent.heightMarketWatch - heightArrow - heightComponent.heightExpand,
    });
  };
  const showOrderForm = () => {
    setHeightComponent({
      ...heightComponent,
      orderForm: !heightComponent.orderForm,
      heightPriceBoard:
        heightComponent.heightMarketWatch -heightComponent.heightOrderForm - heightPannelLink,
      heightTable:heightComponent.heightMarketWatch -heightComponent.heightOrderForm - heightPannelLink -heightComponent.heightExpand,
    });
  };
  // tính height khi click expand
  const setHeightExpand = (newHeightExpand: number) => {
    if (heightComponent.orderForm === true) {
      setHeightComponent((prevState) => ({
        ...prevState,
        heightExpand: newHeightExpand,
        heightTable: heightComponent.heightPriceBoard - newHeightExpand,
      }));
    } else {
      setHeightComponent((prevState) => ({
        ...prevState,
        heightExpand: newHeightExpand,
        heightTable:
          heightComponent.heightMarketWatch - newHeightExpand - heightArrow,
        heightPriceBoard: heightComponent.heightMarketWatch - heightArrow,
      }));
    }
  };
  // show popup theo mã

  const componentVisible = useSelector(
    (state: RootState) => state.chart.visible
  );
  const hideShowOrderForm = heightComponent.orderForm;
  // show hide menu tab
  const showPendingOrder = () => {
    setHeightComponent({ ...heightComponent, orderCount: 1 });
  };
  const showTradingResult = () => {
    setHeightComponent({ ...heightComponent, orderCount: 2 });
  };
  const showIntradayOrder = () => {
    setHeightComponent({ ...heightComponent, orderCount: 3 });
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault(); 
    const trValue = e.target.parentElement.getAttribute("data-tr-value");
    console.log(trValue)
    if (trValue) {
      setSelectedValue({
        x: e.clientX,
        y: e.clientY-40,
        value: trValue,
        status: true,
      });
    }
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    draggingRef.current = false;
  };
  const handleDragable = (event: DraggableEvent, data: DraggableData) => {
    console.log(`x: ${data.x}, y: ${data.y}`);
  };
  const status = useSelector(((state: RootState) => state.popupTable.visible))
  //console.log(heightComponent);
  return (
    <div className="relative">
      {/* popup theo table */}
      <PopupTableMarketwatch
        selectedValue={selectedValue}
        setSelectedValueProp={setSelectedValue}
      />
      {status ? <TablePopupMarketwatch

//  defaultPosition={{ x: 0, y: 0 }}
//  onDrag={handleDragable}
 />:''}
        
      {/* marketwatch */}
      <div
        className="resize panel-horizontally bg-BGTableMarket text-white relative overflow-hidden"
        style={{ height: heightComponent.heightMarketWatch }}
      >
        {/* priceboard */}
        <div
          id="panel-top"
          className="resize panel-top bg-black "
          style={{ height: heightComponent.heightPriceBoard }}
        >
          <div
            className="price-board-layout"
            style={{ display: componentVisible ? "none" : "block" }}
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
                  <CompleteStock/>
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
                      <button
                        className="btn btn-sm btn-chart"
                        onClick={() => dispatch(showChartMarketwatch(""))}
                      >
                        <img src={LineChart} width={20} height={20} alt="" />
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
                  {RenderTable()}
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div
            className="chart-layout"
            style={{ display: componentVisible ? "block" : "none" }}
          >
            <ChartMarketwatch />
          </div>
        </div>
        {/* orderform */}

        <div>
          <div
            className={`flex justify-between ${
              heightComponent.orderCount === 0 ? "" : "hidden"
            }`}
          >
            <div
              className="relative left-[49%]"
              id="divArrowBottomDown"
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
              onClick={hideOrderForm}
            >
              <i className="fa fa-caret-down text-iconShowOrder mt-[-5px]"></i>
            </div>
            {/* menu link */}
            <div
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
              className="mt-1 text-black"
            >
              <div className="panel__bottom__link flex justify-end mr-[40px] mb-[14px]">
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
          {/* pannent link khi click tab */}
          <div
            className={`flex justify-between bg-[#dedede] h-[35px] relative items-center ${
              heightComponent.orderCount !== 0 ? "" : "hidden"
            }`}
          >
            <div
              className="cursor-pointer pl-2.5 text-[#d71920] "
              style={{
                display: heightComponent.orderCount === 0 ? "none" : "block",
              }}
              onClick={() =>
                setHeightComponent({ ...heightComponent, orderCount: 0 })
              }
            >
              <Tooltip title="Trở về đặt lệnh">
                <span className="text-[15px] hover:underline ">
                  [ESC] Thoát
                </span>
              </Tooltip>
            </div>

            <div
              className="text-base text-[#235aaf] uppercase item__center"
              id="divArrowBottomDown"
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
              onClick={hideOrderForm}
            >
              {heightComponent.orderCount === 1
                ? "Lệnh chờ khớp"
                : heightComponent.orderCount === 2
                ? "Kết quả khớp lệnh trong phiên"
                : "Lệnh trong ngày"}
            </div>
            {/* menu link */}
            <div
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
              className=" text-black"
            >
              <div className="panel__bottom__link flex justify-end items-center">
                <div className="group px-2" onClick={showPendingOrder}>
                  <span
                    className={`size-input hover-text-blue-L ${
                      heightComponent.orderCount === 1 ? "active" : ""
                    }`}
                  >
                    Lệnh chờ khớp
                  </span>
                </div>
                <div className="group px-2" onClick={showTradingResult}>
                  <span
                    className={`size-input hover-text-blue-L ${
                      heightComponent.orderCount === 2 ? "active" : ""
                    }`}
                  >
                    KQ khớp lệnh trong phiên
                  </span>
                </div>
                <div className="group px-2" onClick={showIntradayOrder}>
                  <span
                    className={`size-input hover-text-blue-L ${
                      heightComponent.orderCount === 3 ? "active" : ""
                    }`}
                  >
                    Lệnh trong ngày
                  </span>
                </div>
                <div
                  className="cursor-pointer h-[35px] w-[45px] ml-4 hover:bg-white "
                  style={{
                    display:
                      heightComponent.orderCount === 0 ? "none" : "block",
                  }}
                  onClick={() =>
                    setHeightComponent({ ...heightComponent, orderCount: 0 })
                  }
                >
                  <Tooltip title="Đóng">
                    <button
                      style={{
                        height: 35,
                        width: 45,
                        backgroundImage: `url(${Close})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "11px 11px",
                      }}
                    ></button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* đặt lệnh ẩn */}
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
            <i className="fa fa-caret-up text-iconShowOrder"></i>
          </div>
          {/* form lệnh */}
          <div
            className=" divBot panel-footer__ordrp text-black pb-5 overflow-auto"
            style={{
              display: hideShowOrderForm ? "block" : "none",
              height: heightComponent.heightOrderForm,
            }}
          >
            <div
              style={{
                display: heightComponent.orderCount === 0 ? "block" : "none",
              }}
            >
              <OrderMarketW />
            </div>
            <div
              style={{
                display: heightComponent.orderCount === 1 ? "block" : "none",
              }}
            >
              <PendingOrders />
            </div>
            <div
              style={{
                display: heightComponent.orderCount === 2 ? "block" : "none",
              }}
            >
              <TradingResult />
            </div>
            <div
              style={{
                display: heightComponent.orderCount === 3 ? "block" : "none",
              }}
            >
              <IntradayOrder />
            </div>

            {/* <OrderMarketW /> */}
          </div>
          <div
            id="draggableH"
            className="ui-draggable ui-draggable-handle"
            style={{
              top: heightComponent.heightPriceBoard,
              background: "transparent",
            }}
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
export default React.memo(LayoutMarketWatch);
