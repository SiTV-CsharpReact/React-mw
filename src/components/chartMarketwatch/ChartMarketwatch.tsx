import { Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ImagePriceBoard from "../../images/calendar-7-32.png";
import DateTime from "../menuBarMW/DateTime";
import "./chartMarketwatch.scss";
import {  useAppDispatch } from "../../store/configureStore";
import { setStatusChart } from "../menuBarMW/menuSlice";
import FooterMarket from "../footerMarketwatch/FooterMarket";
import FooterChart from "../footerMarketwatch/FooterChart";
import MenuMarketWatch from "../indexMarketWatch/MenuMarketWatch";
import { useSelector } from "react-redux";
import {showChartMarketwatch } from "./chartMarketwatchSlice";
import SlidesMarketWatch from "../indexMarketWatch/SlidesMarketWatch";
import SlidesIndexChartMarketwatch from "./SlidesIndexChartMarketwatch";
import ReactApexChart from 'react-apexcharts';
import TableWithChart from "./TableWithChart";
interface Data {
  RowID: string;
  Info: string[][];
}
type ChartMarketwatchProps = {
  stock: string;
};
 
const ChartMarketwatch = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [dataChart, setDataChart] = useState<Data[]>([]);
  const dispatch = useAppDispatch();
  return (
    <section className="chart-layout">
      <div className="chart-layout-left float-left ">
        <div className="chart-layout-header w-full float-left h-[30px]">
          <div className="float-left w-[900px] index-chart">
            <div>
              <SlidesIndexChartMarketwatch />
            </div>
            {/* <SlidesMarketWatch/> */}
          </div>
          <div className="float-right">
            <Tooltip title="Hiển thị bảng giá">
              <button
                className="p-[5px] h-30 w-[30] hover:bg-spnTitlePanelBottom"
                onClick={() => dispatch(showChartMarketwatch(''))}
              >
                <img src={ImagePriceBoard} height={20} width={20} alt="" />
              </button>
            </Tooltip>
          </div>

          <DateTime />
        </div>
        <div className="tv_chart_container w-full" id="tv_chart_container">
          chart
        </div>
      </div>

      <TableWithChart/>
    </section>
  );
};

export default React.memo(ChartMarketwatch);
