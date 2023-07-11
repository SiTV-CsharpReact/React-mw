import React, { useEffect, useRef, useState } from "react";
import MenuMarketWatch from "../indexMarketWatch/MenuMarketWatch";
import OrderMarketW from "../orderFormMarketwatch/OrderFormMarketWatch";
import TableMarketWatch from "../tableMarketwatch/TableMarketWatch";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
import TableGDTTMarketWatch from "../tableMarketwatch/TableGDTTMarketWatch";
import TableThongKeMarketWatch from "../tableMarketwatch/TableThongKeMarketWatch";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
import ChartMarketwatch from "../chartMarketwatch/ChartMarketwatch";
import PendingOrders from "../orderFormMarketwatch/PendingOrders";
import IntradayOrder from "../orderFormMarketwatch/IntradayOrder";
import TradingResult from "../orderFormMarketwatch/TradingResult";
import "./LayoutMarketWatch.scss";
import { Tooltip } from "@mui/material";
import ListMenuBar from "../menuBarMW/ListMenuBar";
import DanhMuc from "../menuBarMW/DanhMuc";
import SettingTable from "../menuBarMW/SettingTable";
import DateTime from "../menuBarMW/DateTime";
import { statusChartMarketwatch } from "../chartMarketwatch/chartMarketwatchSlice";
import PopupTableMarketwatch from "../popupTableMarketwatch/popupTableMarketwatch";
import { resizeState } from "../../models/resizeWindow";
import TablePopupMarketwatch from "../tablePopupMarketwatch/TablePopupMarketwatch";
import { DraggableData, DraggableEvent } from "react-draggable";
import TableDanhMuc from "../tableMarketwatch/TableDanhMuc";
//image
import LineChart from "../../images/line-chart-32.png";
import Close from "../../images/x28.png";
import TableMarketWatchTest from "../tableMarketwatch/TableMarketWatchTest";
import DropDown from "../menuBarMW/DropDown";
import { setOrderCount } from "./LayoutMarketWatchSLice";
import { useSelector } from "react-redux";
import CompleteStock from "../menuBarMW/CompleteStock";
import { useTranslation } from "react-i18next";
import { getDataApi, getDataApiPendingOder } from "../orderFormMarketwatch/data";

function RenderTable() {
  const floor = useAppSelector((state) => state.tableTest.floor)
  switch (floor) {
    case "MAIN":
      return <TableMarketWatchTest />;
    case "GDTT":
      return <TableGDTTMarketWatch />;
    case "TableTK":
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
  heightWindow: heightWindow,
  heightMarketWatch: heightWindow - heightHeader,
  heightPriceBoard: ((heightWindow - heightHeader) / 10) * 5.7,
  heightOrderForm:
    ((heightWindow - heightHeader) / 10) * 4.3 - heightPannelLink,
  heightPannelLink: heightPannelLink,
  heightArrow: heightArrow,
  heightExpand: expand,
  heightTable: heightTable,
};
// const LayoutMarketWatch  = () => {
const LayoutMarketWatch: React.FC = () => {
  const { t } = useTranslation(["home"]);
  const dispatch = useAppDispatch();
  const orderCount = useAppSelector((state) => state.layout.orderCount);
  // gọi danh mục
  // row danh mục
  // tao useState resize khi height window thay đổi
  const { row, name } = useSelector((state: RootState) => state.categories);
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
        dispatch(setOrderCount(0));
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
  };
 
  // show hide order
  const hideOrderForm = () => {
    dispatch(getDataApi())
    dispatch(getDataApiPendingOder())
    setHeightComponent({
      ...heightComponent,
      orderForm: !heightComponent.orderForm,
      heightPriceBoard: heightComponent.heightMarketWatch - heightArrow,
      heightTable:
        heightComponent.heightMarketWatch -
        heightArrow -
        heightComponent.heightExpand,
    });
  };
  const showOrderForm = () => {
    setHeightComponent({
      ...heightComponent,
      orderForm: !heightComponent.orderForm,
      heightPriceBoard:
        heightComponent.heightMarketWatch -
        heightComponent.heightOrderForm -
        heightPannelLink,
      heightTable:
        heightComponent.heightMarketWatch -
        heightComponent.heightOrderForm -
        heightPannelLink -
        heightComponent.heightExpand,
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

  const componentVisible = useAppSelector((state) => state.chart.visible);
  const hideShowOrderForm = heightComponent.orderForm;
  const handleContextMenu = (e: any) => {
    e.preventDefault();
    const vCell = e.target.classList.contains("custom-cell")
      ? e.target.parentElement
      : e.target;
    const rowID = vCell.querySelector("div.custom-cell").dataset.comp;
    const trValue = document.querySelector(
      `div[data-index="0"][data-comp="${rowID}"] div`
    )?.innerHTML;
    // console.log("click", trValue);
    if (trValue) {
      setSelectedValue({
        x: e.clientX,
        y: e.clientY - 40,
        value: trValue,
        status: true,
      });
    }
  };
  const showTab = (orderCount: number) => {
    dispatch(setOrderCount(orderCount));
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    draggingRef.current = false;
  };
  const handleDragable = (event: DraggableEvent, data: DraggableData) => {
    console.log(`x: ${data.x}, y: ${data.y}`);
  };
  const status = useAppSelector((state) => state.popupTable.visible);
  return (
    <div className="relative">
      {/* popup theo table */}
      <PopupTableMarketwatch
        selectedValue={selectedValue}
        setSelectedValueProp={setSelectedValue}
      />
      {status ? <TablePopupMarketwatch /> : ""}
      {/* marketwatch */}
      <div
        className="relative z-50 overflow-hidden text-white resize panel-horizontally bg-BGTableMarket"
        style={{ height: heightComponent.heightMarketWatch }}
      >
        {/* priceboard */}
        <div
          id="panel-top"
          className="bg-black resize panel-top "
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
              <div className="relative flex justify-between h-30 bg-headerMenuTableMarket">
                <div className="flex ">
                  <ListMenuBar />
                  <DanhMuc />
                  {row && name ? <CompleteStock /> : ""}

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
                        onClick={() => dispatch(statusChartMarketwatch({visible:true,code:""}))}
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
                className="relative z-10 overflow-auto table_market"
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
        {/* orderform */}

        <div className="absolute w-full z-[100] bg-white">
          <div
            className={`flex justify-between ${
              orderCount === 0 ? "" : "hidden"
            }`}
          >
            <div
              className="relative left-[49%] z-40"
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
                <div className="px-2 group" onClick={() => showTab(1)}>
                  <span className=" size-input hover-text-blue-L">
                  {t("home:Order.TITLE_LCK")}
                  </span>
                </div>
                <div className="px-2 group" onClick={() => showTab(2)}>
                  <span className=" size-input hover-text-blue-L">
                  {t("home:Order.TITLE_KQKL")} 
                  </span>
                </div>
                <div className="px-2 group" onClick={() => showTab(3)}>
                  <span className=" size-input hover-text-blue-L">
                  {t("home:Order.TITLE_LTN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* pannent link khi click tab */}
          <div
            className={`flex justify-between bg-[#dedede] h-[35px] relative items-center ${
              orderCount !== 0 ? "" : "hidden"
            }`}
          >
            <div
              className="cursor-pointer pl-2.5 mt-0.5 text-[#d71920] "
              style={{
                display: orderCount === 0 ? "none" : "block",
              }}
              onClick={() => showTab(0)}
            >
              <Tooltip title="Trở về đặt lệnh">
                <span className="text-[15px] hover:underline ">
                  [ESC] {t("home:Order.ORDER__EXIT")}
                </span>
              </Tooltip>
            </div>

            <div
              className="text-base text-[#235aaf] uppercase item__center"
              id="divArrowBottomDown"
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
              onClick={hideOrderForm}
            > 
              {orderCount === 1
                ?  `${t("home:Order.TITLE_LCK1")}`
                : orderCount === 2
                ? `${t("home:Order.TITLE_KQKL1")}` 
                : `${t("home:Order.TITLE_LTN1")}`}
            </div>
            {/* menu link */}
            <div
              style={{ display: heightComponent.orderForm ? "block" : "none" }}
              className="text-black "
            >
              <div className="flex items-center justify-end panel__bottom__link">
                <div className="px-3 group" onClick={() => { dispatch(getDataApiPendingOder()); showTab(1)}}>
                  <span
                    className={`size-input hover-text-blue-L ${
                      orderCount === 1 ? "active" : ""
                    }`}
                  >
                     {t("home:Order.TITLE_LCK")}
                  </span>
                </div>
                {/* hihi */}
                <div className="px-3 group" onClick={() => { dispatch(getDataApi()); showTab(2) }}>
                <span
                  className={`size-input hover-text-blue-L ${orderCount === 2 ? "active" : ""}`}
                >
                  {t("home:Order.TITLE_KQKL")} 
                </span>
              </div>

                <div className="px-3 group" onClick={() => showTab(3)}>
                  <span
                    className={`size-input hover-text-blue-L ${
                      orderCount === 3 ? "active" : ""
                    }`}
                  >
                   {t("home:Order.TITLE_LTN")}
                  </span>
                </div>
                <div
                  className="cursor-pointer h-[35px] w-[45px] ml-3 mr-[1px] hover:bg-white "
                  style={{
                    display: orderCount === 0 ? "none" : "block",
                  }}
                  onClick={() => showTab(0)}
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
              className="text-xl font-normal cursor-pointer text-spnTitlePanelBottom "
            >
              ĐẶT LỆNH
            </span>
            <i className="fa fa-caret-up text-iconShowOrder"></i>
          </div>
          {/* form lệnh */}
          <div
            className="pb-5 overflow-auto text-black divBot panel-footer__ordrp"
            style={{
              display: hideShowOrderForm ? "block" : "none",
              height: heightComponent.heightOrderForm,
            }}
          >
            <div
              style={{
                display: orderCount === 0 ? "block" : "none",
              }}
            >
              <OrderMarketW />
            </div>
            <div
              style={{
                display: orderCount === 1 ? "block" : "none",
              }}
            >
              <PendingOrders value={orderCount} />
            </div>
            <div
              style={{
                display: orderCount === 2 ? "block" : "none",
              }}
            >
              <TradingResult />
            </div>
            <div
              style={{
                display: orderCount === 3 ? "block" : "none",
              }}
            >
              <IntradayOrder />
            </div>
          </div>
      
        </div>
      </div>
    </div>
  );
};
export default React.memo(LayoutMarketWatch);
