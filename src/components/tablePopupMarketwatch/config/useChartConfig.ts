import React, { useEffect, useState } from "react";
import * as HighCharts from "highcharts";
import {
  _getDateTs,
  drawChartOption,
  formatDate,
  maxNumber,
  minNumber,
} from "../../chartIndex/util/app.chart";
import { formatNumber } from "../../../utils/util";

type Data = (string | number)[];

const useChartConfig = (
  dataChartOption: Data,
  option: string,
  indexValue: number,
  select: string
) => {
  const [dataCol, setDataCol] = useState<any>([]);
  const [dataSpline, setDataSpline] = useState<any>([]);
  const arrPr: any = React.useMemo(() => {
    if (dataChartOption.length === 0) {
      const min = Number(indexValue) - 0.1;
      const max = Number(indexValue) + 0.1;
      return [min, indexValue, max];
    }
    return dataSpline.map((item: any) => item.y);
  }, [dataChartOption, dataSpline, indexValue]);

  useEffect(() => {
    if (dataChartOption.length !== 0) {
      if (option === "gw_realtime") {
        const dataColoumnReal: any = drawChartOption(
          dataChartOption,
          select
        ).map((item: any) => ({ x: _getDateTs(item[0]), y: item[5] }));
        const dataIndexReal: any = drawChartOption(dataChartOption, select).map(
          (item: any) => ({ x: _getDateTs(item[0]), y: item[4] })
        );
        setDataCol(dataColoumnReal);
        setDataSpline(dataIndexReal);
      } else {
        const dataColoumn: any = drawChartOption(dataChartOption, select).map(
          (item: any) => ({ x: _getDateTs(item[0]), y: item[5] })
        );
        const dataIndex: any = drawChartOption(dataChartOption, select).map(
          (item: any) => ({ x: _getDateTs(item[0]), y: item[4] })
        );
        setDataCol(dataColoumn);
        setDataSpline(dataIndex);
      }
    }
  }, [dataChartOption, option, select]);

  const options: HighCharts.Options = {
    boost: {
      enabled: true,
    },
    chart: {
      height: 160,
      type: "line",
      polar: true,
      backgroundColor: "#303030",
      plotBackgroundColor: {
        linearGradient: [0, 0, 50, 500] as any,
        stops: [
          [0, "#080808"],
          [1, "#917c05"],
        ],
      },
      plotBorderWidth: 1,
      plotBorderColor: "#545454",
      events: {
        load: function () {
          this.yAxis[1].update({
            labels: {
              format: "{value:.1f}",
            },
          });
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

          switch (select) {
            case "1D":
              xAxis.setExtremes(xmin, xmax, true, false);
              let price_min, price_max: number, tick, minSub;
              let barwidth: number;
              let arrSub: any = [];
              price_min = minNumber(arrPr);
              price_max = maxNumber(arrPr);
              if (dataChartOption.length === 0) {
                this.yAxis[1].update({
                  tickPositions: arrPr,
                });
              } else {
                for (let i = 0; i < arrPr.length; i++) {
                  let next = arrPr[i + 1];

                  if (typeof next === "undefined") {
                    next = arrPr[0];
                    arrSub.push(
                      Math.abs(Math.round((arrPr[i] - next) * 10) / 10)
                    );
                  }
                }
                minSub = minNumber(arrSub);
                if (price_min > indexValue) {
                  tick = 0.1;
                  price_min = indexValue - tick;
                  price_max += tick;
                  barwidth = 0.05;
                } else {
                  if (price_max < indexValue) {
                    tick = 0.5;
                    price_max = indexValue + tick;
                    price_min -= tick;
                    barwidth = 0.05;
                  } else {
                    if (price_max < 50) {
                      tick = 0.1;
                      barwidth = 0.05;
                      price_min -= tick;
                      price_max += tick;
                    } else {
                      if (minSub < 0.5) {
                        tick = 0.1;
                        barwidth = 0.05;
                        price_min -= tick;
                        price_max += tick;
                      } else {
                        tick = 1;
                        barwidth = 0.2;
                        price_min -= tick;
                        price_max += tick;
                      }
                    }
                  }
                }
                let sub = price_max - price_min;

                if (sub > 0) {
                  let countTick = Math.round(sub / tick);

                  if (countTick > 20) {
                    let tempTick = Math.round(countTick / 15);
                    tick = 0.5;
                    barwidth = 0.05;
                    price_min -= tick;
                    price_max += tick;
                  }
                }
                let tickPosition: any = [];
                for (let i = price_min; i <= price_max; i += tick) {
                  tickPosition.push(i);
                }

                this.yAxis[1].update({
                  tickPositions: tickPosition.map(
                    (item: any) => Math.round(item * 10) / 10
                  ),
                });
              }
              break;
            case "1W":
              xAxis.update({
                labels: {
                  formatter: function () {
                    const date: any = new Date(this.value);
                    const day: any = date.getDate();
                    const month: any = date.getMonth() + 1;
                    return `${day}/${month}`;
                  },
                },
                tickInterval: 86400000,
              });
              // let price__min, price__max: number, _tick, _minSub;
              // let _barwidth: number;
              // let _arrSub: any = [];
              // price__min = minNumber(arrPr);
              // price__max = maxNumber(arrPr);
              // if (arrPr.length === 0) {
              //   const min = Number(indexValue) - 0.1;
              //   const max = Number(indexValue) + 0.1;

              //   this.yAxis[1].setExtremes(min, max, true, false);
              // } else {
              //   for (let i = 0; i < arrPr.length; i++) {
              //     let next = arrPr[i + 1];

              //     if (typeof next === "undefined") {
              //       next = arrPr[0];
              //       _arrSub.push(
              //         Math.abs(Math.round((arrPr[i] - next) * 10) / 10)
              //       );
              //     }
              //   }
              //   _minSub = minNumber(_arrSub);
              //   if (price__min > indexValue) {
              //     _tick = 0.1;
              //     price__min = indexValue - _tick;
              //     price__max += _tick;
              //     _barwidth = 0.05;
              //   } else {
              //     if (price__max < indexValue) {
              //       _tick = 0.5;
              //       price__max = indexValue + _tick;
              //       price__min -= _tick;
              //       _barwidth = 0.05;
              //     } else {
              //       if (price__max < 50) {
              //         _tick = 0.1;
              //         _barwidth = 0.05;
              //         price__min -= _tick;
              //         price__max += _tick;
              //       } else {
              //         if (_minSub < 0.5) {
              //           _tick = 0.1;
              //           _barwidth = 0.05;
              //           price__min -= _tick;
              //           price__max += _tick;
              //         } else {
              //           _tick = 1;
              //           _barwidth = 0.2;
              //           price__min -= _tick;
              //           price__max += _tick;
              //         }
              //       }
              //     }
              //   }
              //   let sub = price__max - price__min;

              //   if (sub > 0) {
              //     let countTick = Math.round(sub / _tick);

              //     if (countTick > 20) {
              //       let tempTick = Math.round(countTick / 15);
              //       _tick = 0.5;
              //       _barwidth = 0.05;
              //       price__min -= _tick;
              //       price__max += _tick;
              //     }
              //   }
              //   let tickPosition: any = [];
              //   for (let i = price__min; i <= price__max; i += _tick) {
              //     tickPosition.push(i);
              //   }
              //   console.log({ tickPosition });

              //   this.yAxis[1].update({
              //     tickPositions: tickPosition.map(
              //       (item: any) => Math.round(item * 10) / 10
              //     ),
              //   });
              // }
              // this.redraw();
              break;
            case "3M":
              xAxis.update({
                labels: {
                  formatter: function () {
                    const date = new Date(this.value);
                    const day: any = date.getDate();
                    const month: any = date.getMonth() + 1;

                    // if (day === 1 || day === 16) {
                    //   return day + '/' + month;
                    // }
                    return `${day.toString().length === 1 ? `0${day}` : day}/${
                      month.toString().length === 1 ? `0${month}` : month
                    }`;
                  },
                },
                tickInterval: 30 * 24 * 3600 * 1000,
              });
              break;
            case "6M":
              xAxis.update({
                labels: {
                  formatter: function () {
                    const date = new Date(this.value);
                    const day: any = date.getDate();
                    const month: any = date.getMonth() + 1;
                    return `${day.toString().length === 1 ? `0${day}` : day}/${
                      month.toString().length === 1 ? `0${month}` : month
                    }`;
                  },
                },
                tickInterval: 30 * 24 * 3600 * 1000,
              });

              this.yAxis[1].update({
                tickAmount: 6,
              });
              break;
            case "1Y":
              xAxis.update({
                labels: {
                  formatter: function () {
                    const date = new Date(this.value);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    return `${
                      month.toString().length === 1 ? `0${month}` : month
                    }/${year}`;
                  },
                },
                tickInterval: 365 * 24 * 3600 * 1000,
              });
              this.yAxis[1].update({
                tickAmount: 6,
              });
              break;
            case "2Y":
              xAxis.update({
                labels: {
                  formatter: function () {
                    const date: any = new Date(this.value);
                    const year: any = date.getFullYear();
                    const month: any = date.getMonth() + 1;
                    return `${
                      month.toString().length === 1 ? `0${month}` : month
                    }/${year}`;
                  },
                },
                tickInterval: 2 * 365 * 24 * 3600 * 1000,
              });
              this.yAxis[1].update({
                tickAmount: 6,
              });
              break;
            default:
              xAxis.update({
                tickInterval: 3600000,
              });
              xAxis.setExtremes(xmin, xmax, true, false);
              break;
          }
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
          fontSize: "6pt",
        },
        align: "center",
        y: 15,
      },
      lineWidth: 0,
      lineColor: "#5f5f5f",
      tickWidth: 0,
      tickInterval: 3600000,
      gridLineWidth: 1,
      gridLineColor: "#6d6d6d1f",
      height: 140,
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
        height: 140,
      },
      {
        title: {
          text: "",
        },
        lineWidth: 0,
        lineColor: "#5f5f5f",
        alignTicks: false,
        labels: {
          style: {
            fontSize: "9px",
            color: "#a5a5a5",
          },
          distance: 10,
          y: 2,
        },
        gridLineWidth: 1,
        gridLineColor: "#6d6d6d1f",
        plotLines:
          option === "gw_realtime"
            ? [
                {
                  color: "#FFFF00",
                  width: 1,
                  value: indexValue,
                  zIndex: 10,
                },
              ]
            : [],
        height: 140,
      },
    ],
    time: {
      useUTC: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      shadow: false,
      backgroundColor: "#ffffffc9",
      borderColor: "#07d800",
      borderRadius: 5,
      borderWidth: 1,
      padding: 6,
      formatter: function () {
        const index: any = this.points?.map((e: any, ind) => {
          if (ind === 1) {
            if (option === "gw_realtime") {
              if (e.y >= indexValue) {
                e.series.chart.tooltip.options.borderColor = "#07d800";
              } else {
                e.series.chart.tooltip.options.borderColor = "red";
              }
            }
            return { x: e.x, y: e.y };
          }
          return e;
        });
        const hour: any = new Date(Number(index[1].x)).getHours();
        const minutes =
          new Date(Number(index[1].x)).getMinutes().toString().length === 1
            ? "0" + new Date(Number(index[1].x)).getMinutes()
            : new Date(Number(index[1].x)).getMinutes();

        return `<span style="color:#000">Thời gian: <b style="font-size:12px;font-weight:600;color:#000" class="font-bold text-sm">${
          option !== "gw_realtime"
            ? formatDate(index[1].x)
            : hour + ":" + minutes
        }</b></span><br/><span style="color:#000">Index:  <b style="font-size:12px;color:#000" class="font-bold text-sm">${
          index[1].y
        }</b></span><br/><span style="color:#000">Khối lượng: <b style="font-size:12px;color:#000" class="font-bold text-sm">${formatNumber(
          index[0].y
        )}</b></span>`;
      },
      positioner: function (labelWidth, labelHeight, point) {
        var tooltipX, tooltipY;
        // Calculate tooltip X position
        if (point.plotX + labelWidth > this.chart.plotWidth) {
          tooltipX = point.plotX - labelWidth + this.chart.plotLeft - 10;
        } else if (point.plotX - labelWidth < 0) {
          tooltipX = point.plotX + this.chart.plotLeft + 10;
        } else {
          tooltipX = point.plotX + this.chart.plotLeft - labelWidth / 2;
        }
        // Calculate tooltip Y position
        if (point.plotY + labelHeight > this.chart.plotHeight) {
          tooltipY = point.plotY - labelHeight + this.chart.plotTop - 10;
        } else if (point.plotY - labelHeight < 0) {
          tooltipY = point.plotY + this.chart.plotTop + 10;
        } else {
          tooltipY = point.plotY + this.chart.plotTop - labelHeight - 10;
        }

        return {
          x: tooltipX,
          y: tooltipY,
        };
      },
    },
    plotOptions: {
      spline: {
        color: "#00ff00",
        lineWidth: 1.2,
        states: {
          hover: {
            enabled: true,
            lineWidth: 1.2,
          },
        },
        marker: {
          enabled: false,
          states: {
            hover: {
              animation: {
                duration: 500
              },
              enabled: true,
              lineColor: "#00ff0045",
              lineWidth: 4,
              fillColor: "none",
              radius: 6.5
            },
          },
        },
        zones:
          option !== "gw_realtime"
            ? []
            : [
                {
                  value: indexValue,
                  color: "red",
                },
                {
                  color: "#00FF00",
                },
              ],
      },
      column: {
        color: "#5F9DFE",
        borderWidth: 0,
        borderRadius: 0,
        pointWidth: 0.2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
      line: {
        color: "#00ff00",
        lineWidth: 1.5,
        marker: {
          enabled: false,
          states: {
            hover: {
              animation: {
                duration: 500
              },
              enabled: true,
              lineColor: "#00ff0045",
              lineWidth: 4,
              fillColor: "none",
              radius: 6.5
            },
          },
        },
        states: {
          hover: {
            enabled: true,
            lineWidth: 1.2,
          },
        },
      },
    },
    series: [
      {
        name: "Column",
        type: "column",
        yAxis: 0,
        data: dataCol,
      },
      {
        name: "Spline",
        type: option === "gw_realtime" ? "spline" : "line",
        data: dataSpline,
        yAxis: 1,
      },
    ],
  };
  return { options };
};

export default useChartConfig;
