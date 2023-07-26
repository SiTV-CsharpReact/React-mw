import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { formatNumber } from "../../utils/util";
import { useAppSelector } from "../../store/configureStore";
import { drawChart, maxNumber, minNumber } from "../chartIndex/util/app.chart";
const ChartPopup = () => {
  const { isLoading, dataChartOption, status } = useAppSelector(
    (state) => state.chartOption
  );
  const { dataTableKLTTG } = useAppSelector((state) => state.dataPopupDetail);
  const { floor } = useAppSelector((state) => state.menuBar);

  const data = React.useMemo(() => {
    if (dataTableKLTTG?.Body?.length > 0) {
      const arr = drawChart(dataTableKLTTG)
        .map((item: any) => ({
          ...item,
          MQ: floor === "HSX" ? item.MQ * 10 : item.MQ,
        }))
        .sort((a: any, b: any) => a.MP - b.MP);
      return arr;
    }
    return [];
  }, [dataTableKLTTG, floor]);

  useEffect(() => {
    const series: any = [
      {
        data: data.map((item: any) => [item.MP, item.MQ]),
        color: "#008000",
        pointWidth: 20,
      },
    ];

    const gradient: any = [0, 0, 50, 500];
    Highcharts.chart("container", {
      chart: {
        type: "column",
        height: 160,
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
            const arrPr: any = data?.map((item: any) => item.MP);
            let min, max, tick, minSub;
            let barwidth: number;
            min = minNumber(arrPr);
            max = maxNumber(arrPr);
            let arrSub: any = [];
            for (let i = 0; i < arrPr.length; i++) {
              let next = arrPr[i + 1];
              if (typeof next === "undefined") {
                next = arrPr[0];
              }
              const sub = Math.abs(Math.round((arrPr[0] - next) * 100) / 100);
              if (sub > 0) {
                arrSub.push(sub);
              }
            }
            console.log({ arrPr });

            minSub = minNumber(arrSub);
            const sub = max - min;
            if (max < 50) {
              tick = minSub;
              barwidth = 0.02;
              min -= barwidth;
              max += barwidth;
            } else if (max > 100) {
              tick = minSub < 0.5 && minSub !== 0 ? minSub : 0.5;
              barwidth = 0.05;
              min -= barwidth;
              max += barwidth;
            } else if (minSub < 0.5) {
              tick = 0.1;
              barwidth = 0.05;
              min -= barwidth;
              max += barwidth;
            } else {
              tick = 1;
              barwidth = 0.2;
              min -= barwidth;
              max += barwidth;
            }
            this.xAxis[0].setExtremes(min, max, true, false);
            // for (let i = 0; i < arrPr.length - 1; i++) {
            //   const value = Number((arrPr[i + 1] - arrPr[i]).toFixed(2));
            //   if (value === tick) {
            //     this.xAxis[0].update({
            //       tickInterval: tick,
            //     });
            //   }
            // }

            const yAxis = this.yAxis[0];
            const yExtremes = yAxis.getExtremes();
            const lengthStep =
              Math.round(yExtremes.dataMin * 0.9).toString().length - 2;
            const step = 10 ** lengthStep;
            const newMin = Math.floor((yExtremes.dataMin * 0.95) / step) * step;
            const newMax = Math.ceil(yExtremes.dataMax / step) * step;

            yAxis.setExtremes(newMin, newMax, true, false);

            this.series.forEach((e) => {
              e.update({
                pointWidth: barwidth >= 0.05 ? 10 : barwidth >= 0.02 ? 14 : 10,
                type: "column",
              });
            });
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
        labels: {
          rotation: 0,
          useHTML: true,
          style: {
            color: "#a5a5a5",
            fontSize: "6pt",
          },
          formatter: function () {
            const value: any = this.value;
            return Highcharts.numberFormat(value, 2, ".", "");
          },
        },
        lineWidth: 0,
        lineColor: "#5f5f5f",
        tickWidth: 0,
        offset: -10,
        height: 130,
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          style: {
            fontSize: "6pt",
            color: "#a5a5a5",
          },
          distance: 8,
          formatter: function () {
            const value: any = this.value;
            if (value === 500000) {
              const scale = Math.floor(Math.log10(value)) / 10;
              return scale + "M";
            } else {
              if (value >= 1000000) {
                return value / 1000000 + "M";
              } else if (value >= 1000) {
                return value / 1000 + "K";
              } else if (value >= 500) {
                return (value / 1000).toFixed(1).replace(/\.0$/, "") + "M";
              } else {
                return value;
              }
            }
          },
        },
        lineWidth: 0,
        lineColor: "#5f5f5f",
        gridLineWidth: 1,
        gridLineColor: "#6d6d6d1f",
        height: 130,
      },
      tooltip: {
        shadow: false,
        backgroundColor: "#ffffffc9",
        borderColor: "#edc240",
        borderRadius: 5,
        borderWidth: 2,
        padding: 6,
        shared: true,
        shape: "square",
        style: {
          fontSize: "12px",
          fontWeight: "500",
        },
        formatter: function () {
          return `<span style="font-size: '5pt';">Giá: <b>${Number(
            this.key
          )}</b></span></br>
            <span style="font-size: '5pt';">Khối lượng: <b>${formatNumber(
              this.y
            )}</b></span>`;
        },
        useHTML: true,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.17,
          borderWidth: 0,
          borderRadius: 0,
          states: {
            hover: {
              color: "#92db33ce",
            },
          },
        },
        series: {
          marker: {
            enabled: false,
          },
        },
      },
      series: series,
    });
  }, [data]);
  return (
    <div className="pu-div-chart-rt">
      <figure className="highcharts-figure">
        <div id="container"></div>
      </figure>
    </div>
  );
};

export default ChartPopup;
