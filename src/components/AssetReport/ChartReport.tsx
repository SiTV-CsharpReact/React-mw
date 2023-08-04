import React, { useEffect, useMemo, useRef, useState } from "react";
import Highcharts from "highcharts";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { formatNumber } from "../../utils/util";
import { fetchAssetReport } from "./AssetReportSlice";
import HighchartsReact from "highcharts-react-official";

type IDate = {
  date: number;
};
const ChartReport: React.FC<IDate> = ({ date }: IDate) => {
  // const { mode } = useAppSelector((state) => state.settingColorMode);
  const { assetReport } = useAppSelector((state) => state.assetReport);
  const [data, setData] = useState<any>([]);
  const [xAxis, setXAxis] = useState<any>([]);
  const chartRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAssetReport());
  }, [dispatch]);
  const changeOption: number = date === 0 ? 20 : 89;

  const arrLine: any = useMemo(() => {
    let arr: any = [];
    let myArr: any = assetReport.Table2?.map((item: any) => item).reverse();

    for (let i = 1; i < myArr?.length; i++) {
      let data =
        myArr[i - 1].ANAV === 0
          ? 0
          : ((myArr[i].ANAV -
              myArr[i].ANAV_IN +
              myArr[i].ANAV_DE -
              myArr[i - 1].ANAV) /
              myArr[i - 1].ANAV) *
            100;

      arr.push(Number(data.toFixed(2)));
    }
    return arr.reverse();
  }, [assetReport.Table2]);

  useEffect(() => {
    const series: any = [
      {
        name: "NAV",
        type: "column",
        color: "#70ad47",
        data: assetReport.Table2?.map((item: any) => item.ANAV)
          .slice(0, changeOption)
          .reverse(),
        yAxis: 0,
      },
      {
        name: "Biến động",
        type: "line",
        yAxis: 1,
        color: "#595959",
        data: arrLine
          ?.map((item: any) => item)
          .slice(0, changeOption)
          .reverse(),
        maker: {
          symbol: "circle",
        },
      },
    ];

    const chart = Highcharts.chart("container-asset_report", {
      boost: {
        enabled: true,
        allowForce: true,
      },
      chart: {
        type: "line",
        backgroundColor: "#ececec",
        spacingRight: 20,
        spacingLeft: changeOption === 89 ? 9 : 10,
        events: {
          load: function () {
            //cách tính bước nhảy, min, max
            const yAxis = this.yAxis[0];
            const yExtremes = yAxis.getExtremes();
            const lengthStep =
              Math.round(yExtremes.dataMin * 0.9).toString().length - 2;
            const step = 10 ** lengthStep;
            const newMin = Math.floor((yExtremes.dataMin * 0.95) / step) * step;
            const newMax = Math.ceil(yExtremes.dataMax / step) * step;
            yAxis.setExtremes(newMin, newMax, true, false);
            console.log({ newMin, newMax, yExtremes, step, lengthStep });

            this.yAxis[1].update(
              {
                tickAmount: date === 0 ? 5 : 4,
              },
              false
            );
            yAxis.update(
              {
                tickAmount: date === 0 ? 5 : 4,
              },
              false
            );

            // //cập nhật maker in linechart
            this.series[1].points.forEach((point: any) => {
              point.update(
                {
                  color: point.y >= 0 ? "#548235" : "#c00000",
                },
                false // chặn ko cho chart vẽ lại khi giá trị mới đc cập nhật
              );
            });
            this.redraw();
          },
        },
        height: 300,
        // width: 1850
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        categories: assetReport.Table2?.map((item: any) => item.ADATE)
          .slice(0, changeOption)
          .reverse(),
        // crosshair: true,
        labels: {
          style: {
            fontSize: "11px",
            color: "#000000",
            fontFamily:
              '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
          },
          y: changeOption === 89 ? 16 : 19,
        },
        lineWidth: 1,
        lineColor: "#ccd6eb",
        height: changeOption === 89 ? 177 : 220,
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
          gridLineWidth: 1,
          height: changeOption === 89 ? 177 : 220,
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
            },
            formatter: function () {
              return this.value + " %";
            },
          },
          height: changeOption === 89 ? 177 : 220,
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
        // symbolWidth: 12, // set the width of the legend symbol
        // symbolHeight: 12, // set the height of the legend symbol
        symbolRadius: 0,
        squareSymbol: true,
        // x: -10,
        y: 7,
        // itemMarginTop: 10,
        // itemMarginBottom: -10,
        // itemDistance: 20,
        itemStyle: {
          fontWeight: "bold",
          fontSize: "12px",
          color: "#333333",
          fontFamily:
            '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          groupPadding: 0.2,
          borderWidth: 1,
          borderColor: "#fff",
          borderRadius: 0,
          states: {
            hover: {
              color: "rgb(137,198,96)",
            },
          },
        },
        series: {
          marker: {
            enabled: true,
          },
        },
      },
      series: series,
    });
    return () => {
      chart.destroy();
    };
  }, [arrLine, assetReport.Table2, changeOption, date]);

  return (
    <figure className="highcharts-figure my-3">
      <div id="container-asset_report"></div>
    </figure>
  );
};

export default React.memo(ChartReport);
