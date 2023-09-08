import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import * as Highcharts from "highcharts";
import { _getDateTs, maxNumber, minNumber } from "../chartIndex/util/app.chart";
import { formatNumber } from "../../utils/util";
import { useDispatch } from "react-redux";
import { fetchChartOptionAsync } from "./chartOptionSlice";
import useChartConfig from "./config/useChartConfig";
import { useContextTablePopup } from "./context/TablePopupMarketWatchContext";
const ChartOption = () => {
  const { dataChartOption } = useAppSelector((state) => state.chartOption);
  const { option, select } = useContextTablePopup();
  
  const { dataDetailPopup } = useAppSelector((state) => state.dataPopupDetail);
  const [indexValue, setIndexValue] = useState<number>(0);
  const { options } = useChartConfig(dataChartOption, option, indexValue, select);

  useEffect(() => {
    Highcharts.chart("container__chart__time", options);
  }, [options]);
  useEffect(() => {
    dataDetailPopup?.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      return item.Info?.map((e: any, ind: number) => {
        if (ind === 1) {
          setIndexValue(e[1]);
        }
      });
    });
  }, [dataDetailPopup]);

  // useEffect(() => {
  //   const gradient: any = [0, 0, 50, 500];
  //   const series: any = [
  //     {
  //       name: "Column",
  //       type: "column",
  //       yAxis: 0,
  //       state: {
  //         hover: {
  //           enabled: false,
  //         },
  //       },
  //       data: dataCol,
  //     },
  //     {
  //       name: "Spline",
  //       type: "spline",
  //       yAxis: 1,
  //       data: dataSpline,
  //     },
  //   ];

  //   Highcharts.chart(`container__chart__time`, {
  //     chart: {
  //       height: 160,
  //       polar: true,
  //       type: "column",
  //       backgroundColor: "#303030",
  //       plotBackgroundColor: {
  //         linearGradient: gradient,
  //         stops: [
  //           [0, "#080808"],
  //           [1, "#917c05"],
  //         ],
  //       },
  //       plotBorderWidth: 1,
  //       plotBorderColor: "#545454",
  //       events: {
  //         load: function () {
  //           this.yAxis[1].update({
  //             labels: {
  //               format: "{value:.1f}",
  //             },
  //           });
  //           const xAxis = this.xAxis[0];
  //           const today = new Date();
  //           const dd = today.getDate();
  //           const mm = today.getMonth(); //January is 0!
  //           const yyyy = today.getFullYear();
  //           const HH1 = 9;
  //           const HH2 = 15;
  //           const MM = 0; // minute

  //           const xminTmp = new Date(yyyy, mm, dd, HH1, MM);
  //           const xmaxTmp = new Date(yyyy, mm, dd, HH2, MM);

  //           const xmin = _getDateTs(xminTmp);
  //           const xmax = _getDateTs(xmaxTmp);
  //           xAxis.setExtremes(xmin, xmax, true, false);

  //           let price_min, price_max: number, tick, minSub;
  //           let barwidth: number;
  //           let arrSub: any = [];
  //           price_min = minNumber(arrPr);
  //           price_max = maxNumber(arrPr);

            // if (arrPr.length === 0) {
            //   const min = Number(indexValue) - 0.1;
            //   const max = Number(indexValue) + 0.1;

            //   this.yAxis[1].setExtremes(min, max, true, false);
            // } else {
            //   for (let i = 0; i < arrPr.length; i++) {
            //     let next = arrPr[i + 1];

            //     if (typeof next === "undefined") {
            //       next = arrPr[0];
            //       arrSub.push(
            //         Math.abs(Math.round((arrPr[i] - next) * 10) / 10)
            //       );
            //     }
            //   }
            //   minSub = minNumber(arrSub);
              // if (price_min > indexValue) {
              //   tick = 0.1;
              //   price_min = indexValue - tick;
              //   price_max += tick;
              //   barwidth = 0.05;
              // } else {
              //   if (price_max < indexValue) {
              //     tick = 0.5;
              //     price_max = indexValue + tick;
              //     price_min -= tick;
              //     barwidth = 0.05;
              //   } else {
              //     if (price_max < 50) {
              //       tick = 0.1;
              //       barwidth = 0.05;
              //       price_min -= tick;
              //       price_max += tick;
              //     } else {
              //       if (minSub < 0.5) {
              //         tick = 0.1;
              //         barwidth = 0.05;
              //         price_min -= tick;
              //         price_max += tick;
              //       } else {
              //         tick = 1;
              //         barwidth = 0.2;
              //         price_min -= tick;
              //         price_max += tick;
              //       }
              //     }
              //   }
              // }

              // let sub = price_max - price_min;

              // if (sub > 0) {
              //   let countTick = Math.round(sub / tick);

              //   if (countTick > 20) {
              //     let tempTick = Math.round(countTick / 15);
              //     tick = 0.5;
              //     barwidth = 0.05;
              //     price_min -= tick;
              //     price_max += tick;
              //   }
              // }

  //             // eslint-disable-next-line array-callback-return
  //             this.series[0].points.map((e) => {
  //               e.update({
  //                 pointWidth: barwidth,
  //               });
  //             });
  //             let tickPosition: any = [];
  //             for (let i = price_min; i <= price_max; i += tick) {
  //               tickPosition.push(i);
  //             }
  //             const exist = tickPosition.find(
  //               (e: number) => e < Number(price_max.toFixed(1))
  //             );

  //             if (!exist) {
  //               tickPosition.push(price_max);
  //             }

  //             this.yAxis[1].update({
  //               tickPositions: tickPosition.map(
  //                 (item: any) => Math.round(item * 10) / 10
  //               ),
  //             });
  //           }
  //           this.redraw();
  //         },
  //       },
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     title: {
  //       text: "",
  //     },
  //     xAxis: {
  //       type: "datetime",
  //       dateTimeLabelFormats: {
  //         hour: "%H h",
  //       },
  //       labels: {
  //         useHTML: true,
  //         style: {
  //           color: "#a5a5a5",
  //           fontSize: "6pt",
  //         },
  //         align: "center",
  //         y: 15,
  //       },
  //       lineWidth: 0,
  //       lineColor: "#5f5f5f",
  //       tickWidth: 0,
  //       tickInterval: 3600000,
  //       gridLineWidth: 1,
  //       gridLineColor: "#6d6d6d1f",
  //       height: 140,
  //     },
  //     yAxis: [
  //       {
  //         title: {
  //           text: "",
  //         },
  //         gridLineWidth: 0,
  //         opposite: true,
  //         lineWidth: 0,
  //         lineColor: "#5f5f5f",
  //         labels: {
  //           enabled: false,
  //         },
  //         height: 140,
  //       },
  //       {
  //         title: {
  //           text: "",
  //         },
  //         endOnTick: true,
  //         lineWidth: 0,
  //         lineColor: "#5f5f5f",
  //         labels: {
  //           style: {
  //             fontSize: "9px",
  //             color: "#a5a5a5",
  //           },
  //           distance: 10,
  //           y: 2,
  //         },
  //         gridLineWidth: 1,
  //         gridLineColor: "#6d6d6d1f",
  //         plotLines: [
  //           {
  //             color: "#FFFF00",
  //             width: 1,
  //             value: indexValue,
  //             zIndex: 10,
  //           },
  //         ],
  //         height: 140,
  //       },
  //     ],
  //     time: {
  //       useUTC: false,
  //     },
  //     tooltip: {
  //       shared: true,
  //       shadow: false,
  //       backgroundColor: "#ffffffc9",
  //       borderColor: "#07d800",
  //       borderRadius: 5,
  //       borderWidth: 1,
  //       padding: 6,
  //       useHTML: true,
  //       formatter: function () {
  //         const index: any = this.points?.map((e: any, ind) => {
  //           if (ind === 1) {
  //             if (e.y >= indexValue) {
  //               e.series.chart.tooltip.options.borderColor = "#07d800";
  //             } else {
  //               e.series.chart.tooltip.options.borderColor = "red";
  //             }
  //             return { x: e.x, y: e.y };
  //           }
  //           return "";
  //         });

  //         const hour: any = new Date(Number(index[1].x)).getHours();
  //         const minutes =
  //           new Date(Number(index[1].x)).getMinutes().toString().length === 1
  //             ? "0" + new Date(Number(index[1].x)).getMinutes()
  //             : new Date(Number(index[1].x)).getMinutes();

  //         return `<span style="color:#000">Thời gian: <b style="font-size:12px;font-weight:600;color:#000" class="font-bold text-sm">${
  //           hour + ":" + minutes
  //         }</b></span><br/><span style="color:#000">Index:  <b style="font-size:12px;color:#000" class="font-bold text-sm">${
  //           index[1].y
  //         }</b></span><br/><span style="color:#000">Khối lượng: <b style="font-size:12px;color:#000" class="font-bold text-sm">${formatNumber(
  //           this.y
  //         )} </b></span>`;
  //       },
  //       positioner: function (labelWidth, labelHeight, point) {
  //         var tooltipX, tooltipY;
  //         // Calculate tooltip X position
  //         if (point.plotX + labelWidth > this.chart.plotWidth) {
  //           tooltipX = point.plotX - labelWidth + this.chart.plotLeft - 10;
  //         } else if (point.plotX - labelWidth < 0) {
  //           tooltipX = point.plotX + this.chart.plotLeft + 10;
  //         } else {
  //           tooltipX = point.plotX + this.chart.plotLeft - labelWidth / 2;
  //         }
  //         // Calculate tooltip Y position
  //         if (point.plotY + labelHeight > this.chart.plotHeight) {
  //           tooltipY = point.plotY - labelHeight + this.chart.plotTop - 10;
  //         } else if (point.plotY - labelHeight < 0) {
  //           tooltipY = point.plotY + this.chart.plotTop + 10;
  //         } else {
  //           tooltipY = point.plotY + this.chart.plotTop - labelHeight - 10;
  //         }

  //         return {
  //           x: tooltipX,
  //           y: tooltipY,
  //         };
  //       },
  //     },
  //     legend: {
  //       enabled: false,
  //     },
  //     plotOptions: {
  //       spline: {
  //         color: "#00FF00",
  //         lineWidth: 1.5,
  //         zones: [
  //           {
  //             value: indexValue,
  //             color: "red",
  //           },
  //           {
  //             color: "#00FF00",
  //           },
  //         ],
  //       },
  //       column: {
  //         color: "#5F9DFE",
  //         borderWidth: 0,
  //         borderRadius: 0,
  //       },
  //     },
  //     series: series,
  //   });
  // }, [arrPr, dataChartOption, dataCol, dataSpline, indexValue]);
  return (
    <div className="chart__for__time">
      <figure className="highcharts-figure">
        <div id={`container__chart__time`}></div>
      </figure>
    </div>
  );
};

export default ChartOption;
