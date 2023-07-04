import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/configureStore";
import * as Highcharts from "highcharts";
import {
  _getDateTs,
  drawChart,
  maxNumber,
  minNumber,
} from "../chartIndex/util/app.chart";
import { formatNumber } from "../../utils/util";
const ChartOption: React.FC<any> = (props) => {
  const { isLoading, dataChartOption, status } = useAppSelector(
    (state) => state.chartOption
  );
  const [dataCol, setDataCol] = useState<any>([]);
  const [dataSpline, setDataSpline] = useState<any>([]);
  const [indexValue, setIndexValue] = useState(0);

  useEffect(() => {
    props.dataItem?.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      return item.Info?.map((e: any, ind: number) => {
        if (ind === 1) {
          setIndexValue(e[1]);
        }
      });
    });
  }, [props.dataItem]);

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
      const arrCol = data?.map((item: any) => ({
        x: item?.TimeJS,
        y: item?.Vol,
      }));
      setDataCol(arrCol);
      setDataSpline(arrSpline);
    }
  }, [dataChartOption]);

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

            const myArr: any = Object.values(drawChart(dataChartOption));

            let min, max;
            let arrPr: any = [],
              arrSub: any = [],
              minSub;
            for (let i = 0; i < myArr.length; i++) {
              const price = myArr[i][0];
              const vol = myArr[i][1];
              arrPr.push(price);
              // arrVol.push(vol);
              var next = myArr[i + 1];

              if (typeof next === "undefined") {
                next = myArr[0];
              }
              const sub = Math.abs(Math.round((price - next[0]) * 100) / 100);
              if (sub > 0) {
                arrSub.push(sub);
              }
            }

            min = minNumber(arrPr);
            max = maxNumber(arrPr);
            minSub = minNumber(arrSub);
            let tick, barwidth;
            var sub = max - min;

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
              barwidth = 0.2;
              min -= barwidth;
              max += barwidth;
            } else {
              tick = 1;
            }
            // if (sub > 0) {
            //   let countTick = Math.round(sub / tick);
            //   if (countTick > 15) {
            //     let tempTick = Math.round(countTick / 10);
            //     tick = max < 50 ? 0.1 : 0.5;
            //   }
            const plotLine: any = this.yAxis[1].options.plotLines;
            if (max < plotLine[0].value) {
              max = max + sub;
            }
            console.log({ min, max, tick, sub, arrPr, arrSub });
            this.yAxis[1].update({
              tickInterval: parseFloat(sub.toFixed(1)),
              tickAmount: e.target.yAxis[1].tickAmount,
            });
            this.yAxis[1].setExtremes(min, max, true, false);
            console.log(this.yAxis[1]);
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
        lineWidth: 1,
        lineColor: "#5f5f5f",
        tickWidth: 0,
        tickInterval: 3600000,
        gridLineWidth: 1,
        gridLineColor: "#6d6d6d1f",
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
            style: {
              fontSize: "9px",
              color: "#a5a5a5",
            },
            distance: 10,
            y: 2,
          },
          gridLineWidth: 1,
          gridLineColor: "#6d6d6d1f",
          plotLines: [
            {
              color: "#FFFF00",
              width: 1,
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
              value: indexValue,
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
  }, [dataChartOption, dataCol, dataSpline, indexValue]);
  return (
    <div className="chart__for__time">
      <figure className="highcharts-figure">
        <div id={`container__chart__time`}></div>
      </figure>
    </div>
  );
};

export default React.memo(ChartOption);
