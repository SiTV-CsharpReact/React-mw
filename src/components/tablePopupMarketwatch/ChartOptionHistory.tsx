import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import * as Highcharts from "highcharts";
import { _getDateTs, maxNumber, minNumber } from "../chartIndex/util/app.chart";
import { formatNumber } from "../../utils/util";
import { fetchChartOptiongwHistoryAsync } from "./chartOptionSlice";
const ChartOptionHistory = () => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.popupTable);
  const { isLoading, dataChartOption, status } = useAppSelector(
    (state) => state.chartOption
  );
  const { dataDetailPopup } = useAppSelector((state) => state.dataPopupDetail);
  const [dataCol, setDataCol] = useState<any>([]);
  const [dataSpline, setDataSpline] = useState<any>([]);
  const [indexValue, setIndexValue] = useState(0);
  //Fetch data
  useEffect(() => {
    const getAllData = async () => {
      await dispatch(fetchChartOptiongwHistoryAsync({ stockCode: code }));
    };
    getAllData();
  }, []);
  // const arrPr = React.useMemo(() => {
  //   if (dataChartOption.length > 0) {
  //     const uniqueValuesSet = new Set(dataChartOption.map((item) => item[4]));
  //     const uniqueValuesArray = Array.from(uniqueValuesSet);
  //     // uniqueValuesArray.sort((a, b) => a - b);

  //     const minValue = Math.floor(uniqueValuesArray[0]);
  //     const maxValue = Math.ceil(
  //       uniqueValuesArray[uniqueValuesArray.length - 1]
  //     );
  //     const stepSize = (maxValue - minValue) / 4;
  //     console.log(stepSize);
  //     const resultArray = Array.from({ length: 5 }, (_, index) => {
  //       if (index === 0) {
  //         return minValue;
  //       } else if (index === 4) {
  //         return maxValue;
  //       } else {
  //         return minValue + index * stepSize;
  //       }
  //     });

  //     return resultArray;
  //   }
  //   return [];
  // }, [dataChartOption]);

  const arrPr = React.useMemo(() => {
    const last7Values = dataChartOption.slice(-7);
    if (last7Values.length > 0) {
      const uniqueValuesSet = new Set(last7Values.map((item) => item[4]));
      const uniqueValuesArray = Array.from(uniqueValuesSet);
      uniqueValuesArray.sort((a, b) => a - b);
      const minValue = Math.floor(uniqueValuesArray[0]);
      const maxValue = Math.ceil(
        uniqueValuesArray[uniqueValuesArray.length - 1]
      );

      const stepSize = (maxValue - minValue) / 4;
      const resultArray = Array.from({ length: 3 }, (_, index) => {
        if (index === 0) {
          return minValue;
        } else if (index === 4) {
          return maxValue;
        } else {
          return minValue + index * stepSize;
        }
      });
      return resultArray;
    }
    return [];
  }, [dataChartOption]);

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

  useEffect(() => {
    const last7Values = dataChartOption.slice(-7);
    if (last7Values?.length > 0) {
      const data = last7Values?.map((item: any) => ({
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

  // Lấy 7 giá trị cuối cùng

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

    Highcharts.chart(`container__chart__time__history`, {
      chart: {
        height: 160,
        polar: true,
        type: "column",
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
            this.yAxis[1].update({
              labels: {
                format: "{value:.1f}",
              },
            });
            const xAxis = this.xAxis[0];
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 6); // Trừ 6 để lấy 7 ngày gần nhất tính từ ngày hiện tại

            const xminTmp = new Date(
              sevenDaysAgo.getFullYear(),
              sevenDaysAgo.getMonth(),
              sevenDaysAgo.getDate()
            );
            const xmaxTmp = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            );

            const xmin = xminTmp.getTime();
            const xmax = xmaxTmp.getTime();
            xAxis.setExtremes(xmin, xmax, true, false);

            let price_min, price_max: number, tick, minSub;
            let barwidth: number;
            let arrSub: any = [];
            price_min = minNumber(arrPr);
            price_max = maxNumber(arrPr);

            if (arrPr.length === 0) {
              const min = Number(indexValue) - 0.1;
              const max = Number(indexValue) + 0.1;

              this.yAxis[1].setExtremes(min, max, true, false);
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

              // eslint-disable-next-line array-callback-return
              this.series[0].points.map((e) => {
                e.update({
                  pointWidth: barwidth,
                });
              });
              let tickPosition: any = [];
              for (let i = price_min; i <= price_max; i += tick) {
                tickPosition.push(i);
              }
              const exist = tickPosition.find(
                (e: number) => e < Number(price_max.toFixed(1))
              );

              if (!exist) {
                tickPosition.push(price_max);
              }

              this.yAxis[1].update({
                tickPositions: tickPosition.map(
                  (item: any) => Math.round(item * 10) / 10
                ),
              });
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
          day: "%e/%m",
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
        tickInterval: 24 * 3600 * 1000,
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
          height: 140,
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
              color: "#00FF00",
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
  }, [arrPr, dataChartOption, dataCol, dataSpline, indexValue]);
  console.log(dataChartOption);
  return (
    <div className="chart__for__time">
      <figure className="highcharts-figure">
        <div id={`container__chart__time__history`}></div>
      </figure>
    </div>
  );
};

export default ChartOptionHistory;
