import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchChartOptionAsync } from "./chartOptionSlice";
// import { HighchartsProvider } from "react-jsx-highcharts";
import { DataStockCode } from "../../models/stockCode";
import { _getDateTs } from "../chartIndex/util/app.chart";
import { formatNumber } from "../../utils/util";
const ChartOption: React.FC<DataStockCode> = (data) => {
  const dispatch = useAppDispatch();
  const { isLoading, dataChartOption, status } = useAppSelector(
    (state) => state.chartOption
  );
  const [dataCol, setDataCol] = useState<any>([]);
  const [dataSpline, setDataSpline] = useState<any>([]);
  const [timeFirst, setTimeFirst] = useState(0);
  const [timeLast, setTimeLast] = useState(0);
  const [indexValue, setIndexValue] = useState(6.34);

  useEffect(() => {
    if (dataChartOption?.length > 0) {
      const data = dataChartOption?.map((item: any) => ({
        TimeJS: _getDateTs(item[0]),
        Index: item[4],
        Vol: item[5],
      }));
      const arrSpline = data?.map((item: any) => {
        return {
          x: item?.TimeJS,
          y: item?.Index,
        };
      });
      console.log(arrSpline);
      
      // data.map((item: any, ind: number) => {
      //   if (ind === 0) {
      //     const v = item?.TimeJS;
      //     set6.34(item?.Index);
      //     setTimeFirst(item?.TimeJS);
      //     const l = new Date(timeFirst);
      //     l.setHours(l.getHours() + 6);
      //     setTimeLast(l.getTime());
      //   }
      //   return "";
      // });
      const arrCol = data?.map((item: any) => ({
        x: item?.TimeJS,
        y: item?.Vol,
      }));
      setDataCol(arrCol);
      setDataSpline(arrSpline);
    }
  }, [dataChartOption, timeFirst]);
  useEffect(() => {
    dispatch(fetchChartOptionAsync({ stockCode: data.stockCode }));
  }, [data.stockCode, dispatch]);

  useEffect(() => {
    const gradient: any = [0, 0, 50, 500];
    const series: any = [
      {
        name: "Column",
        type: "column",
        yAxis: 0,
        state: {
          hover: {
            enabled: false,
          },
        },
        data: dataCol,
      },
      {
        name: "Spline",
        type: "spline",
        yAxis: 1,
        data: dataSpline,
      },
    ];
    Highcharts.chart(`container__chart__time`, {
      chart: {
        //  marginLeft: , // Đặt khoảng cách giữa highcharts-plot-background và highcharts-container là 20px
        width: 390,
        height: 180,
        polar: true,
        backgroundColor: "#303030",
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
        plotBorderWidth: 1,
        plotBorderColor: "#545454",
        events: {
          load: function () {
            const xAxis = this.xAxis[0];
            const today = new Date();
            const dd = today.getDate();
            const mm = today.getMonth(); //January is 0!
            const yyyy = today.getFullYear();
            const HH1 = "9";
            const HH2 = "15";
            const MM = "00"; // minute

            const xminTmp = new Date(yyyy, mm, dd, Number(HH1), Number(MM));
            const xmaxTmp = new Date(yyyy, mm, dd, Number(HH2), Number(MM));

            const xmin = _getDateTs(xminTmp);
            const xmax = _getDateTs(xmaxTmp);
            xAxis.setExtremes(xmin, xmax, true, false);
            console.log(xAxis);
            setTimeFirst(xmin);
            setTimeLast(xmax);
            // const yAxis = this.yAxis[1];
            // const yExtremes = yAxis.getExtremes();

            // const minIndex = Number(yExtremes.dataMin);
            // const maxIndex = Number(yExtremes.dataMax);
            // const lengthStep = Math.round(minIndex * 0.9).toString().length - 2;

            // const step = 10 ** lengthStep;
            // const newMin = Math.floor((minIndex * 0.95) / step) * step;
            // const newMax = Math.ceil(maxIndex / step) * step;
            // yAxis.setExtremes(newMin, newMax, true, false);

            this.redraw();
          },
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          hour: "%H h",
        },
        labels: {
          useHTML: true,
          style: {
            color: "#a5a5a5",
            fontSize: "8px",
            // width: 396,
          },
          align: "center",
          y: 15,
        },
        
        lineWidth: 1,
        lineColor: "#5f5f5f",
        tickWidth: 0,
        tickInterval: 3600000,
        minPadding: 0,
        maxPadding: 0,
        gridLineWidth: 1,
        gridLineColor: "#6d6d6d1f",
        // width: "390px",
      },
      yAxis: [
        
        {
          title: {
            text: "",
          },
          gridLineWidth: 0,
          opposite: true,
          lineWidth: 0,
          lineColor: "#5f5f5f",
          labels: {
            enabled: false,
          },
        },
        {
          title: {
            text: "",
          },
          endOnTick: true,
          lineWidth: 0,
          lineColor: "#5f5f5f",
          labels: {
            padding: 0,
            style: {
              // width: 50,
              fontSize: "8px",
              color: "#a5a5a5",
            },
            distance: 4,
            // enabled: false,
          },
          gridLineWidth: 0,
          gridLineColor: "#6d6d6d1f",
          tickAmount: 4,
          plotLines: [
            {
              color: "#FFFF00",
              width: 1,
              value: 6.34,
              zIndex: 10,
            },
          ],
        },
      ],
      time: {
        useUTC: false,
      },
      tooltip: {
        shared: true,
        shadow: false,
        backgroundColor: "#ffffffc9",
        borderColor: "#07d800",
        borderRadius: 5,
        borderWidth: 1,
        padding: 6,
        useHTML: true,
        formatter: function () {
          const index: any = this.points?.map((e: any, ind) => {
            if (ind === 1) {
              if (e.y >= 6.34) {
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
          }</b></span><br/><span style="color:#000">Khối lượng: <b style="font-size:12px;color:#000" class="font-bold text-sm">${formatNumber(
            this.y
          )} </b></span>`;
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        spline: {
          color: "#00FF00",
          lineWidth: 1.5,
          zones: [
            {
              value: 6.34,
              color: "red",
            },
            {
              color: "#00c010",
            },
          ],
        },
        column: {
          color: "#5F9DFE",
          borderWidth: 0,
          borderRadius: 0,
        },
      },
      series: series,
    });
  }, [dataCol, dataSpline, 6.34, timeFirst, timeLast]);
  return (
    <div className="chart__for__time">
      <figure className="highcharts-figure">
        <div id={`container__chart__time`}></div>
      </figure>
    </div>
  );
};

export default React.memo(ChartOption);
