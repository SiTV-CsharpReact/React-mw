import React, {
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
import { RootState } from "../../store/configureStore";
import ChartMarketwatch from "../chartMarketwatch/ChartMarketwatch";
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
   
      // return <HSXMarketWatch />;
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
const LayoutMarketWatch: React.FC = ()=> {
  const componentVisible = useSelector((state: RootState) => state.menu.visible);
  console.log(componentVisible)
  // const isVisible = useSelector(state => state.componentVisibility);

  // const isVisible = useSelector((state: RootState) => state.componentVisibility.isVisible);
  // const dispatch = useDispatch();
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const heightPriceBoard = ((windowHeight - 40) / 10) * 5.7;
  // const heightOrderForm = ((windowHeight - 40) / 10) * 4.3;
  // console.log(windowHeight);
  const height = useContext(AppContext)
  console.log(height.heightOrderForm)
  const [popupVisible, setPopupVisible] = useState(false);
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
  // const params = useParams<{ id: string }>()
  // const paramstock  = stocks.find(
  //   paramstock => paramstock.id === params.id
  // )

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
     
        <div
          className="panel-horizontally bg-BGTableMarket text-white relative overflow-hidden"
          style={{ height: height.windowHeight}}
          
        >
          <div
            id="panel-top"
            className="panel-top bg-black overflow-auto "
            style={{ height: height.heightPriceBoard }}
          >
         <div className="price-board-layout" style={{ display: componentVisible ? "block" : "none",}}>
            <MenuMarketWatch />
            <div className="overflow-hidden dvFixed">
              <MenuBarMW />
              <div
                className=" overflow-auto relative z-10 table_market"
                id="tableHNX"
                onContextMenu={handleContextMenu}
              >
                <div className={`dvContentLP relative overflow-x-auto `} style={{height:height.expand ===27?height.heightPriceBoard-57:height.expand ===67?height.heightPriceBoard-97:height.heightPriceBoard-194}}>
              
              {/* <div className="dvContentLP relative overflow-x-auto" style={{height:height.heightPriceBoard-57}}> */}
              {RenderTable()}
              </div>
              </div>
            </div>
            </div>
              <div className="chart-layout" style={{ display: componentVisible ? "none" : "block",}}>
              <ChartMarketwatch/>
            </div>

          
          </div>
          
          <div  className="panel-bottom divBot">
            <OrderMarketW />
          </div>
        </div>
      
    </div>
  );
};
export default LayoutMarketWatch;
