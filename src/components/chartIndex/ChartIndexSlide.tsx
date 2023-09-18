import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import { formatNumber, formatNumberToM } from "../../utils/util";
import "./chartIndex.scss";
import { _getDateTs } from "./util/app.chart";
import { getDataChart, getPlotLine } from "./chart/useChart";
import { useAppSelector } from "../../store/configureStore";
import { IChartIndex } from "./interface/interface.config";

type TProps = {
  name: string;
  san: string;
};
const ChartIndexSlide: React.FC<TProps> = ({ name, san }: TProps) => {
  const { dataChartIndex, dataChartIndexTime } = useAppSelector(
    (state) => state.chartIndex
  );
  const [dataSpline, setDataSpline] = useState<any>([]);
  const [dataBar, setDataBar] = useState<any>([]);
  const [indexValue, setIndexValue] = useState<number>(0);

  const data = useMemo(() => {
    if (dataChartIndexTime.SS === null) {
      return dataChartIndex;
    }else{
      return dataChartIndexTime.SS.forEach(item => {
        if(item.HSX.VNXALL.length !== 0){
          dataChartIndex.HSX.DataFull.VNXALL = dataChartIndex.HSX.DataFull.VNXALL.concat(item.HSX.VNXALL)
        }
        if(item.HSX.VNIndex.length !== 0){
          dataChartIndex.HSX.DataFull.VNIndex = dataChartIndex.HSX.DataFull.VNIndex.concat(item.HSX.VNIndex)
        }
        if(item.HSX.VN30.length !== 0){
          dataChartIndex.HSX.DataFull.VN30 = dataChartIndex.HSX.DataFull.VN30.concat(item.HSX.VN30)
        } 
        if(item.HSX.VNALL.length !== 0){
          dataChartIndex.HSX.DataFull.VNALL = dataChartIndex.HSX.DataFull.VNALL.concat(item.HSX.VNALL)
        } 
        if(item.HSX.VN100.length !== 0){
          dataChartIndex.HSX.DataFull.VN100 = dataChartIndex.HSX.DataFull.VN100.concat(item.HSX.VN100)
        } 
        if(item.HSX.VNSML.length !== 0){
          dataChartIndex.HSX.DataFull.VNSML = dataChartIndex.HSX.DataFull.VNSML.concat(item.HSX.VNSML)
        } 
        if(item.HSX.VNMID.length !== 0){
          dataChartIndex.HSX.DataFull.VNMID = dataChartIndex.HSX.DataFull.VNMID.concat(item.HSX.VNMID)
        } 
        if(item.HNX.HNX30.length !== 0){
          dataChartIndex.HNX.DataFull.HNX30 = dataChartIndex.HNX.DataFull.HNX30.concat(item.HNX.HNX30)
        } 
        if(item.HNX.HNXCon.length !== 0){
          dataChartIndex.HNX.DataFull.HNXCon = dataChartIndex.HNX.DataFull.HNXCon.concat(item.HNX.HNXCon)
        }
        if(item.HNX.HNXFin.length !== 0){
          dataChartIndex.HNX.DataFull.HNXFin = dataChartIndex.HNX.DataFull.HNXFin.concat(item.HNX.HNXFin)
        }
        if(item.HNX.HNXIndex.length !== 0){
          dataChartIndex.HNX.DataFull.HNXIndex = dataChartIndex.HNX.DataFull.HNXIndex.concat(item.HNX.HNXIndex)
        }
        if(item.HNX.HNXLCap.length !== 0){
          dataChartIndex.HNX.DataFull.HNXLCap = dataChartIndex.HNX.DataFull.HNXLCap.concat(item.HNX.HNXLCap)
        }
        if(item.HNX.HNXMSCap.length !== 0){
          dataChartIndex.HNX.DataFull.HNXMSCap = dataChartIndex.HNX.DataFull.HNXMSCap.concat(item.HNX.HNXMSCap)
        }
        if(item.HNX.HNXMan.length !== 0){
          dataChartIndex.HNX.DataFull.HNXMan = dataChartIndex.HNX.DataFull.HNXMan.concat(item.HNX.HNXMan)
        }
        if(item.HNX.HNXUpcomIndex.length !== 0){
          dataChartIndex.HNX.DataFull.HNXUpcomIndex = dataChartIndex.HNX.DataFull.HNXUpcomIndex.concat(item.HNX.HNXUpcomIndex)
        }
      })
    }
  }, [dataChartIndex, dataChartIndexTime.SS]);
  
  useEffect(() => {
    if (san === "HSX") {
      const data = getDataChart(dataChartIndex, name);
      const value = getPlotLine(dataChartIndex, name);
      setIndexValue(value);
      setDataSpline(data[0]);
      setDataBar(data[1]);
    } else {
      if (san === "HNX") {
        const data = getDataChart(dataChartIndex, name);
        const value = getPlotLine(dataChartIndex, name);
        setIndexValue(value);
        setDataBar(data[1]);
        setDataSpline(data[0]);
      }
    }
  }, [dataChartIndex, name, san]);

  useEffect(() => {
    const gradient: any = [0, 0, 50, 380];
    const series: any[] = [
      {
        name: "Bar",
        type: "column",
        yAxis: 0,
        data: dataBar,
        // enableMouseTracking: false,
        state: {
          hover: {
            enabled: false,
          },
        },
      },
      {
        name: "Spline",
        type: "spline",
        yAxis: 1,
        data: dataSpline,
        zones: [
          {
            value: indexValue,
            color: "#ff0000",
          },
          {
            color: "#00FF00",
          },
        ],
        state: {
          hover: {
            enabled: false,
          },
        },
      },
    ];

    Highcharts.chart(`container-${name}`, {
      chart: {
        marginTop: 8, // Đặt khoảng cách giữa highcharts-plot-background và highcharts-container là 20px
        marginBottom: 15,
        plotBorderWidth: 1,
        plotBorderColor: "#545454",
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
        backgroundColor: "#000",
        width: 205,
        height: 98,
        events: {
          load: function (e: any) {
            const xAxis = this.xAxis[0];
            const today = new Date();
            const dd = today.getDate();
            const mm = today.getMonth(); //January is 0!
            const yyyy = today.getFullYear();
            const HH1 = 9;
            const HH2 = 15;
            const MM = 0; // minute

            const xminTmp = new Date(yyyy, mm, dd, HH1, MM);
            const xmaxTmp = new Date(yyyy, mm, dd, HH2, MM);

            const xmin = _getDateTs(xminTmp);
            const xmax = _getDateTs(xmaxTmp);
            xAxis.setExtremes(xmin, xmax, true, false);
          },
        },
      },

      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          hour: "%H h",
        },
        gridLineWidth: 1.5,
        gridLineColor: "#35353550",
        lineWidth: 0,
        tickWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        tickInterval: 3600000,
        labels: {
          useHTML: true,
          style: {
            color: "#a5a5a5",
            fontSize: "8px",
          },
        },
        offset: -9,
        zIndex: 1,
      },
      yAxis: [
        {
          title: {
            text: "",
          },
          labels: {
            enabled: false,
          },
          gridLineWidth: 0,
          opposite: true,
          // height: 75,
          lineWidth: 0,
        },
        {
          title: {
            text: "",
          },
          endOnTick: true,
          lineWidth: 0,
          labels: {
            enabled: false,
          },
          gridLineWidth: 0,
          tickAmount: 10,
          plotLines: [
            {
              color: "#FFFF00",
              width: 0.8,
              value: indexValue,
              zIndex: 10,
            },
          ],
          // height: 75,
        },
      ],
      time: {
        useUTC: false,
      },
      tooltip: {
        shadow: false,
        backgroundColor: "#ffffffc9",
        borderColor: "#07d800",
        borderRadius: 5,
        borderWidth: 1,
        padding: 6,
        useHTML: true,
        style: {
          width: 150,
          fontSize: "11px",
          fontWeight: "500",
          position: "absolute",
          // zIndex: 10000,
        },
        shared: true,
        formatter: function () {
          const index: any = this.points?.map((e: any, ind) => {
            if (ind === 1) {
              if (e.y >= indexValue) {
                e.series.chart.tooltip.options.borderColor = "#07d800";
              } else {
                e.series.chart.tooltip.options.borderColor = "red";
              }
              return { x: e.x, y: e.y };
            }
            return "";
          });

          const hour: any = new Date(Number(index[1].x)).getHours();
          const minutes =
            new Date(Number(index[1].x)).getMinutes().toString().length === 1
              ? "0" + new Date(Number(index[1].x)).getMinutes()
              : new Date(Number(index[1].x)).getMinutes();

          return `<span style="color:#000">Thời gian: <b style="font-size:12px;font-weight:600;color:#000" class="font-bold text-sm">${
            hour + ":" + minutes
          }</b></span><br/><span style="color:#000">Index:  <b style="font-size:12px;color:#000" class="font-bold text-sm">${
            index[1].y
          }</b></span><br/>${
            this.y === 0
              ? ""
              : `<span style="color:#000">Khối lượng: <b style="font-size:12px;color:#000" class="font-bold text-sm">${formatNumber(
                  formatNumberToM(this.y)
                )} </b></span>`
          }`;
        },
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        enabled: false,
      },
      plotOptions: {
        spline: {
          lineWidth: 1.5,
          zones: [
            {
              value: indexValue,
              color: "red",
            },
            {
              color: "#00c010",
            },
          ],
        },
        bar: {
          color: "#5F9DFE",
        },
      },
      series: series,
    });
  }, [dataBar, dataSpline, indexValue, name]);

  return (
    <div className="chart__slide__market">
      <figure className="highcharts-figure">
        <div id={`container-${name}`}></div>
      </figure>
    </div>
  );
};

export default React.memo(ChartIndexSlide);
