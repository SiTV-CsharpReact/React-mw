import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { formatNumber } from "../../utils/util";
import "./chartIndex.scss";
import { _getDateTs, minNumber } from "./util/app.chart";

type TProps = {
  name: string;
  san: string;
  dataChartIndex: any;
};
const ChartTest: React.FC<TProps> = ({ name, san, dataChartIndex }: TProps) => {
  const [dataSpline, setDataSpline] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [indexValue, setIndexValue] = useState(0);
  const [timeFirst, setTimeFirst] = useState(0);
  const [timeLast, setTimeLast] = useState<any>();

  useEffect(() => {
    if (san === "HSX") {
      const hsx = dataChartIndex?.HSX;
      const data =
        name === "VNXALL"
          ? hsx?.DataFull.VNXALL
          : name === "VNI"
          ? hsx?.DataFull.VNIndex
          : name === "VNSML"
          ? hsx?.DataFull.VNSML
          : name === "VN30"
          ? hsx?.DataFull.VNALL
          : name === "VNALL"
          ? hsx?.DataFull.VN30
          : name === "VN100"
          ? hsx?.DataFull.VN100
          : name === "VNMID"
          ? hsx?.DataFull.VNMID
          : [];
      const dataTimeIndex: any = data?.map((item: any) => ({
        x: item.Data.TimeJS,
        y: item.Data.Index,
      }));
      setDataSpline(dataTimeIndex);
      data?.map((item: any, index: number) => {
        if (index === 0) {
          const v = item?.Data.Index;
          setIndexValue(v);
          setTimeFirst(item?.Data.TimeJS);
          const today = new Date(timeFirst);
          today.setHours(today.getHours() + 6);
          setTimeLast(today.getTime());
        }

        return "";
      });
      const dataTimeVol: any = data?.map((item: any) => ({
        x: item.Data.TimeJS,
        y: item.Data.Vol,
      }));
      setDataBar(dataTimeVol);
    } else {
      if (san === "HNX") {
        const hnx = dataChartIndex.HNX;
        const data =
          name === "HNX"
            ? hnx?.DataFull.HNXIndex
            : name === "HNX30"
            ? hnx?.DataFull.HNX30
            : name === "HNXLCAP"
            ? hnx?.DataFull.HNXLCap
            : name === "HNXSMCAP"
            ? hnx?.DataFull.HNXMSCap
            : name === "HNXFIN"
            ? hnx?.DataFull.HNXFin
            : name === "HNXMAN"
            ? hnx?.DataFull.HNXMan
            : name === "HNXCON"
            ? hnx?.DataFull.HNXCon
            : name === "UPCOM"
            ? hnx?.DataFull.HNXUpcomIndex
            : [];
        const dataTimeIndex: any = data?.map((item: any) => ({
          x: item.Data.TimeJS,
          y: item.Data.Index,
        }));
        setDataSpline(dataTimeIndex);
        data?.map((item: any, index: number) => {
          if (index === 0) {
            const v = item?.Data.Index;
            setIndexValue(v);
            setTimeFirst(item?.Data.TimeJS);
            const today = new Date(timeFirst);
            today.setHours(today.getHours() + 6);
            setTimeLast(today.getTime());
          }
          return "";
        });
        const dataTimeVol: any = data?.map((item: any) => ({
          x: item.Data.TimeJS,
          y: item.Data.Vol,
        }));
        setDataBar(dataTimeVol);
      }
    }
  }, [dataChartIndex?.HNX, dataChartIndex?.HSX, name, san, timeFirst]);

  useEffect(() => {
    const gradient: any = [0, 0, 50, 380];
    const series: any[] = [
      {
        name: "Bar",
        type: "column",
        yAxis: 0,
        data: dataBar,
        // enableMouseTracking: false,
        state: {
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
        state: {
          hover: {
            enabled: false,
          },
        },
      },
      // {
      //   name: "",
      //   type: "collum",
      //   data: dataChart,
      //   color: '#5F9DFE',
      // },
    ];

    Highcharts.chart(`container-${name}`, {
      chart: {
        marginTop: 8, // Đặt khoảng cách giữa highcharts-plot-background và highcharts-container là 20px
        marginBottom: 15,
        plotBorderWidth: 1,
        plotBorderColor: "#545454",
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
        backgroundColor: "#000",
        width: 205,
        height: 98,
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
            // console.log(this.yAxis[1].series);
            this.redraw();
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
        // width:180,
        dateTimeLabelFormats: {
          hour: "%H h",
        },
        gridLineWidth: 1.5,
        gridLineColor: "#35353550",
        lineWidth: 0,
        tickWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        // min: timeFirst, // Giới hạn trục x từ 9 giờ
        // max: timeLast,
        tickInterval: 3600000,
        // height: 75,
        labels: {
          //       x: 0, // Đưa nhãn trục "9h" vào vị trí bắt đầu từ 0px
          // align: 'left', // Đưa văn bản của nhãn trục vào vị trí bắt đầu từ 0px
          // overflow: 'justify', // Hiển thị nội dung nhãn trục ra khỏi biểu đồ
          useHTML: true,
          style: {
            color: "#a5a5a5",
            fontSize: "8px",
            // rotation: -45,
            // step: 1,
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
          // height: 75,
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
          // height: 75,
        },
      ],
      time: {
        useUTC: false,
      },
      tooltip: {
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
          // zIndex: 10000,
        },
        shared: true,
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
          }</b></span><br/><span style="color:#000">Khối lượng: <b style="font-size:12px;color:#000" class="font-bold text-sm">${formatNumber(this.y)} </b></span>`;
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
      series: series,
    });
  }, [dataBar, dataSpline, indexValue, name, timeFirst, timeLast]);

  return (
    <div className="chart__slide__market">
      <figure className="highcharts-figure">
        <div id={`container-${name}`}></div>
      </figure>
    </div>
  );
};

export default React.memo(ChartTest);
