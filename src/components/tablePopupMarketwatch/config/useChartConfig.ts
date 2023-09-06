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
  const [dataCol, setDataCol] = useState<number[][]>([]);
  const [dataSpline, setDataSpline] = useState<number[][]>([]);
  console.log({ dataCol, dataSpline });

  useEffect(() => {
    if (dataChartOption.length !== 0) {
      if (option === "gw_realtime") {
        const dataColoumnReal: number[][] = drawChartOption(
          dataChartOption,
          select
        ).map((item: any) => [_getDateTs(item[0]), item[5]]);
        const dataIndexReal: number[][] = drawChartOption(
          dataChartOption,
          select
        ).map((item: any) => [_getDateTs(item[0]), item[4]]);
        setDataCol(dataColoumnReal);
        setDataSpline(dataIndexReal);
      } else {
        const dataColoumn: number[][] = drawChartOption(
          dataChartOption,
          select
        ).map((item: any) => [_getDateTs(item[0]), item[5]]);
        const dataIndex: number[][] = drawChartOption(
          dataChartOption,
          select
        ).map((item: any) => [_getDateTs(item[0]), item[4]]);
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
      type: "column",
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
          // xAxis.setExtremes(xmin, xmax, true, false);
          switch (select) {
            case "1D":
              // const xmin = _getDateTs(xminTmp);

              // const xmax = _getDateTs(xmaxTmp);

              xAxis.setExtremes(xmin, xmax, true, false);

              break;
            case "1W":
              xAxis.update({
                labels: {
                  formatter: function () {
                    const date = new Date(this.value);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    return `${day}/${month}`;
                  },
                },
                tickInterval: 86400000,
              });

              break;
            case "3M":
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
                // startOnTick: true,
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
                    const date = new Date(this.value);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    return `${
                      month.toString().length === 1 ? `0${month}` : month
                    }/${year}`;
                  },
                },
                tickInterval: 2 * 365 * 24 * 3600 * 1000,
                // endOnTick: true,
                // startOnTick: true,
                // tickInterval: 30 * 24 * 3600 * 1000
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
            if (option === "a1d") {
              if (e.y >= indexValue) {
                e.series.chart.tooltip.options.borderColor = "#07d800";
              } else {
                e.series.chart.tooltip.options.borderColor = "red";
              }
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
          option !== "gw_realtime" ? formatDate(index[1].x) : hour + ":" + minutes
        }</b></span><br/><span style="color:#000">Index:  <b style="font-size:12px;color:#000" class="font-bold text-sm">${
          index[1].y
        }</b></span><br/><span style="color:#000">Khối lượng: <b style="font-size:12px;color:#000" class="font-bold text-sm"></b></span>`;
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
