import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImagePriceBoard from "../../images/calendar-7-32.png";
import ImageBuySell from "../../images/ppc-optimization-32.png";
import ImageHandShake from "../../images/handshake-32.png";
import DateTime from "../menuBarMW/DateTime";
import "./chartMarketwatch.scss";
import { useAppDispatch } from "../../store/configureStore";
import TableTabWithBuySell from "./components/TableTabWithBuySell";
import TableTabWithChart from "./components/TableTabWithChart";
import TableTabWithDanhMuc from "./components/TableTabWithDanhMuc";
import TradingViewWidget from "../Chart/TradingViewWidget";
import SlidesMarketWatch from "../indexMarketWatch/SlidesMarketWatch";
import { statusChartMarketwatch } from "./chartMarketwatchSlice";

interface ChartMarketwatchProps {
  heightPriceBoard: number; // Kiểu dữ liệu của prop "heightPriceBoard" là number
}

const ChartMarketwatch: React.FC<ChartMarketwatchProps> = ({
  heightPriceBoard,
}) => {
  const dispatch = useAppDispatch();
  const [statusTable, setStatusTable] = useState<number>(1);
  const [hiddenChartRight, setHiddenChartRight] = useState<boolean>(false);
  return (
    <section style={{ height: heightPriceBoard }}>
      <div
        className={`float-left chart-layout-left `}
        style={{
          width: `calc(100% - ${hiddenChartRight ? 40 : 350}px)`,
          height: heightPriceBoard,
        }}
      >
        <div className="chart-layout-header float-left w-full h-[30px]">
          <div className="float-left w-[900px] index-chart">
            <div>
              <SlidesMarketWatch />
            </div>
          </div>
          <DateTime />
          <div className="float-right">
            <Tooltip title="Hiển thị bảng giá">
              <button
                className="p-[5px] h-30 w-[30] hover:bg-spnTitlePanelBottom"
                onClick={() =>
                  dispatch(statusChartMarketwatch({ visible: false, code: "" }))
                }
              >
                <img src={ImagePriceBoard} height={20} width={20} alt="" />
              </button>
            </Tooltip>
          </div>
        </div>
        <div
          className="w-full tv_chart_container"
          id="tv_chart_container"
          style={{ height: heightPriceBoard }}
        >
          <TradingViewWidget heightPriceBoard={heightPriceBoard} />
        </div>
      </div>

      <div
        className={`chart-layout-right h-full float-right ${
          hiddenChartRight ? "w-[40px]" : "w-[350px]"
        } `}
      >
        <div className={`${hiddenChartRight === true && "hidden"} mt-content`}>
          {/* condition1 ? expression1 : condition2 ? expression2 : expression3; */}
          {statusTable === 1 ? (
            <TableTabWithBuySell />
          ) : statusTable === 2 ? (
            <TableTabWithChart heightPriceBoard={heightPriceBoard} />
          ) : (
            <TableTabWithDanhMuc />
          )}
        </div>
        <div className="mt-menu-tab" style={{ width: "40px", float: "right" }}>
          <ul className="ul-menu-tab">
            <li
              title="Danh mục"
              onClick={() => {
                setStatusTable(0);
                if (statusTable !== 0) {
                  setHiddenChartRight(false);
                } else {
                  setHiddenChartRight(!hiddenChartRight);
                }
              }}
              className={`${statusTable === 0 ? "active" : ""}`}
            >
              <img
                src={ImagePriceBoard}
                height={24}
                width={24}
                alt="Tab danh mục"
              />
            </li>
            <li
              title="Top Mua/Bán"
              className={`${statusTable === 1 ? "active" : ""}`}
              onClick={() => {
                setStatusTable(1);
                if (statusTable !== 1) {
                  setHiddenChartRight(false);
                } else {
                  setHiddenChartRight(!hiddenChartRight);
                }
              }}
            >
              <img
                src={ImageBuySell}
                height={24}
                width={24}
                alt="Tab Top Mua/Bán"
              />
            </li>
            <li
              title="Khớp lệnh"
              className={`${statusTable === 2 ? "active" : ""}`}
              onClick={() => {
                setStatusTable(2);
                if (statusTable !== 2) {
                  setHiddenChartRight(false);
                } else {
                  setHiddenChartRight(!hiddenChartRight);
                }
              }}
            >
              <img
                src={ImageHandShake}
                height={24}
                width={24}
                alt="Tab Khớp lệnh"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ChartMarketwatch;
