import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchChartIndexAsync } from "./chartIndexSlice";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { drawChart } from "./util/app.chart";
import { formatNumber, formatNumberToM } from "../../utils/util";
import "./chartIndex.scss";
import { _getDateTs } from "./util/app.chart";
import { getDataChart, getDataChartHNX, getDataChartHSX, getPlotLine } from "./chart/useChart";

type TProps = {
  name: string;
  san: string;
};

const ChartIndex: React.FC<TProps> = ({
  name,
  san,
}: TProps) => {
  const { dataChartIndex } = useAppSelector((state) => state.chartIndex);
  const [dataSpline, setDataSpline] = useState<any>([]);
  const [dataBar, setDataBar] = useState<any>([]);
  const [indexValue, setIndexValue] = useState<number>(0);

  useEffect(() => {
    if (san === "HSX") {
      const data = getDataChart(dataChartIndex, name);
      const value = getPlotLine(dataChartIndex, name);
      setIndexValue(value);
      console.log({value});
      
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
  const options = {
    chart: {
      marginTop: 8,
      marginBottom: 15,
      plotBorderWidth: 1,
      plotBorderColor: "#545454",
      plotBackgroundColor: {
        linearGradient: [0, 0, 50, 380],
        stops: [
          [0, "#080808"],
          [1, "#d4b614"],
        ],
      },
      backgroundColor: "#000",
      width: 205,
      height: 98,
      events: {
        load: function (this: Highcharts.Chart) {
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
      },
      shared: true,
      // function(this: Highcharts.TooltipFormatterContextObject){
      //       const points = this;
      //   console.log(points)
      // }
      formatter: function (this: Highcharts.TooltipFormatterContextObject){
        const points = this.points;
        console.log(this)
        console.log(points)
       
        // if (points.y !== null && points.y !== undefined) {
        //   if (points.y >= indexValue) {
        //     points.series.chart.tooltip.options.borderColor = "#07d800";
        //   } else {
        //     points.series.chart.tooltip.options.borderColor = "red";
        //   }
        //   return { x: points.x, y: points.y };
        // }
        const index: any = points?.map((point, ind) => {
          if (ind === 1) {
            if (point.y !== null && point.y !== undefined) {
              if (point.y >= indexValue) {
                point.series.chart.tooltip.options.borderColor = "#07d800";
              } else {
                point.series.chart.tooltip.options.borderColor = "red";
              }
              return { x: point.x, y: point.y };
            }
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
    series: [
      {
        name: "Bar",
        type: "column",
        yAxis: 0,
        data: dataBar,
        states: {
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
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    ],
  };

  return (
    <div className="chart__slide__market">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default React.memo(ChartIndex);
