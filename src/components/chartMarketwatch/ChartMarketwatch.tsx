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
  const dispatch = useAppDispatch();
  const [statusTable, setStatusTable] = useState<number>(1);
  return (
    <section className="chart-layout">
      <div className="float-left chart-layout-left ">
        <div className="chart-layout-header float-left w-full h-[30px]">
          <div className="float-left w-[900px] index-chart">
            <div>
              <SlidesIndexChartMarketwatch />
            </div>
          </div>
           <DateTime />
          <div className="float-right">
            <Tooltip title="Hiển thị bảng giá">
              <button
                className="p-[5px] h-30 w-[30] hover:bg-spnTitlePanelBottom"
                onClick={() => dispatch(statusChartMarketwatch({visible:false,code:""}))}
              >
                <img src={ImagePriceBoard} height={20} width={20} alt="" />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="w-full tv_chart_container" id="tv_chart_container">
        <TradingViewWidget/>
        </div>
      </div>

      <div className="chart-layout-right float-right w-[350px]  ">
        <div className="mt-content">
        {/* condition1 ? expression1 : condition2 ? expression2 : expression3; */}
          {statusTable ===1? <TableTabWithBuySell /> :statusTable ===2?<TableTabWithChart />:<TableTabWithDanhMuc />}
        
       
        </div>
        <div className="mt-menu-tab" style={{ width: "40px", float: "right" }}>
          <ul className="ul-menu-tab">
            <li
              title="Danh mục"
              onClick={() =>setStatusTable(0)}
              className= {`${statusTable ===0 ? "active" :""}`}
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
              className= {`${statusTable ===1 ? "active" :""}`}
              onClick={() => setStatusTable(1)}
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
              className= {`${statusTable === 2 ? "active" :""}`}
              onClick={() => setStatusTable(2)}
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