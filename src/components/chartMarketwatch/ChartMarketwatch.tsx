import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import ImagePriceBoard from "../../images/calendar-7-32.png";
import ImageBuySell from "../../images/ppc-optimization-32.png";
import ImageHandShake from "../../images/handshake-32.png";
import DateTime from "../menuBarMW/DateTime";
import "./chartMarketwatch.scss";
import { useAppDispatch } from "../../store/configureStore";
import FooterChart from "../footerMarketwatch/FooterChart";
import { statusChartMarketwatch } from "./chartMarketwatchSlice";
import SlidesIndexChartMarketwatch from "./SlidesIndexChartMarketwatch";
import TableTabWithBuySell from "./components/TableTabWithBuySell";
import TableTabWithChart from "./components/TableTabWithChart";
import TableTabWithDanhMuc from "./components/TableTabWithDanhMuc";
import TradingViewWidget from "../Chart/TradingViewWidget";
const ChartMarketwatch = () => {
  const [isDanhMuc, setIsDanhMuc] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const [isKL, setIsKL] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  return (
    <section className="chart-layout">
      <div className="float-left chart-layout-left ">
        <div className="chart-layout-header float-left w-full h-[30px]">
          <div className="float-left w-[900px] index-chart">
            <div>
              <SlidesIndexChartMarketwatch />
            </div>
          </div>
          <div className="float-right">
            <Tooltip title="Hiển thị bảng giá">
              <button
                className="p-[5px] h-30 w-[30] hover:bg-spnTitlePanelBottom"
                onClick={() => dispatch(statusChartMarketwatch(""))}
              >
                <img src={ImagePriceBoard} height={20} width={20} alt="" />
              </button>
            </Tooltip>
          </div>

          <DateTime />
        </div>
        <div className="w-full tv_chart_container" id="tv_chart_container">
        <TradingViewWidget/>
        </div>
      </div>

      <div className="chart-layout-right float-right w-[350px]  ">
        <div className="mt-content">
          {isDanhMuc && <TableTabWithDanhMuc />}
          {isBuy && <TableTabWithBuySell />}
          {isKL && <TableTabWithChart />}
          <FooterChart />
        </div>
        <div className="mt-menu-tab" style={{ width: "40px", float: "right" }}>
          <ul className="ul-menu-tab">
            <li
              title="Danh mục"
              onClick={() => {
                setIsDanhMuc(!isDanhMuc);
                setIsBuy(false);
                setIsKL(false);
              }}
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
              className="active"
              onClick={() => {
                setIsDanhMuc(false);
                setIsBuy(!isBuy);
                setIsKL(false);
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
              onClick={() => {
                setIsDanhMuc(false);
                setIsBuy(false);
                setIsKL(!isKL);
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

export default React.memo(ChartMarketwatch);
