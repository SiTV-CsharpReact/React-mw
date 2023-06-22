import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";

// import type { InteractionItem } from "chart.js";
// import {
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Legend,
//   Tooltip,
// } from "chart.js";
// import {
//   Chart,
//   getDatasetAtEvent,
//   getElementAtEvent,
//   getElementsAtEvent,
// } from "react-chartjs-2";
import { useAppSelector } from "../../store/configureStore";
import { getMax, getMin } from "./utils/service";
import { formatNumber } from "../../utils/util";

const ChartReport: any = (date: any) => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const { assetReport } = useAppSelector((state) => state.assetReport);

  const arrLine: any = useMemo(() => {
    let arr: any = [];
    for (let i = 1; i < assetReport.Table2?.length; i++) {
      let data = 0;

      if (assetReport.Table2[i - 1].ANAV === 0) {
        data = 0;
      } else {
        data =
          ((assetReport.Table2[i].ANAV -
            assetReport.Table2[i].ANAV_IN +
            assetReport.Table2[i].ANAV_DE -
            assetReport.Table2[i - 1].ANAV) /
            assetReport.Table2[i - 1].ANAV) *
          100;
      }
      arr.push(Number(data.toFixed(2)));
    }
    return arr;
  }, [assetReport.Table2]);

  useEffect(() => {
    const series: any = [
      {
        name: "NAV",
        type: "column",
        color: "#70ad47",
        data: assetReport.Table2?.map((item: any) => item.ANAV)
          ?.splice(1, Number(date.date))
          .reverse(),
        yAxis: 0,
      },
      {
        name: "Biến động",
        type: "line",
        yAxis: 1,
        color: "#595959",
        data: arrLine?.map((item: any) => item)?.splice(0, Number(date.date)),
        maker: {
          symbol: "circle",
        },
      },
    ];

    Highcharts.chart("container-asset_report", {
      chart: {
        type: "column",
        backgroundColor: "#ececec",
        events: {
          load: function () {
            const yAxis = this.yAxis[0];
            const yExtremes = yAxis.getExtremes();
            const lengthStep =
              Math.round(yExtremes.dataMin * 0.9).toString().length - 2;
            const step = 10 ** lengthStep;
            const newMin = Math.floor((yExtremes.dataMin * 0.95) / step) * step;
            const newMax = Math.floor(yExtremes.dataMax / step) * step;
            yAxis.setExtremes(newMin, newMax, true, false);
            console.log(this.series[1].points);
            this.series[1].points.forEach((point: any) => {
              point.update({
                color: point.y > 0 ? "#70ad47" : "#c00000",
              });
            });
            this.redraw();
          },
        },
        width: 1830,
        height: 300,
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: assetReport.Table2?.map((item: any) => item.ADATE)
          ?.splice(0, Number(date.date))
          .reverse(),
        crosshair: true,
        labels: {
          style: {
            fontSize: "11px",
            color: "#000000",
            fontFamily:
              '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
          },
        },
        lineWidth: 1,
        lineColor: "#ccd6eb",
      },
      yAxis: [
        {
          title: {
            text: "",
          },
          labels: {
            style: {
              fontWeight: "bold",
              fontSize: "11px",
              color: "#000000",
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
            },
            formatter: function () {
              return Highcharts.numberFormat(this.value as number, 0, "", ",");
            },
          },
          tickAmount: date.date === "20" ? 5 : 4,
          gridLineWidth: 1,
          tickInterval: 150000,
        },
        {
          title: {
            text: "",
          },
          lineWidth: 0,
          gridLineWidth: 0,
          opposite: true,
          labels: {
            style: {
              fontSize: "11px",
              color: "#000000",
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              // x: -20,
            },
            formatter: function () {
              return this.value + "%";
            },
          },
          tickAmount: date.date === "20" ? 5 : 4,
        },
      ],
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: "#fff2cc",
        style: {
          padding: "10px",
        },
        borderColor: "#70ad47",
        formatter: function () {
          const bdPrice: any = this.points?.map((item: any, ind) => {
            if (ind === 1) {
              return item.y;
            }
            return "";
          });

          return `
            <span style="color: rgb(51, 51, 51);font-size: 11px;">
              <span style="font-size: 15px;font-weight: bold;">NAV cuối ngày: ${formatNumber(
                this.y
              )}<span style="text-decoration: underline;">đ</span></span><br/>
              <span style="line-height: 17px;">Phát sinh tăng: 0<span style="text-decoration: underline;">đ</span></span><br/>
              <span style="line-height: 0px;">Phát sinh tăng: 0<span style="text-decoration: underline;">đ</span></span></br>
              <span style="font-size: 15px;font-weight: bold; display: inline-flex;align-items:flex-end; gap: 3px;"> 
                <div style="width: 7px;height:7px;background: ${
                  bdPrice[1] > 0 ? "#70ad47" : "#c00000"
                };border-radius: 50%; margin-bottom:3px;"></div>Biến động tài sản: ${
            bdPrice[1]
          }%</span>
            </span>
          `;
        },
      },
      legend: {
        symbolWidth: 12, // set the width of the legend symbol
        symbolHeight: 12, // set the height of the legend symbol
        symbolRadius: 0,
        // backgroundColor: 'red'
        squareSymbol: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          pointWidth: 42,
          borderRadius: 0,
          states: {
            hover: {
              color: "rgb(137,198,96)",
            },
          },
          // symbolWidth: 20, // set the width of the legend symbol
          // symbolHeight: 20, // set the height of the legend symbol
          // symbolRadius: 5,
        },
        // line: {},
      },
      series: series,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
          },
        ],
      },
    });
  }, [arrLine, assetReport.Table2, date.date]);
  return (
    <figure className="highcharts-figure">
      <div id="container-asset_report"></div>
    </figure>
  );
};

export default ChartReport;
