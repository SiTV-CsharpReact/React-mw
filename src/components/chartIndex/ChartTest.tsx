import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { formatNumber } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchChartIndexAsync } from "./chartIndexSlice";
import './chartIndex.scss'

type TProps = {
  name: string;
  san: string;
};
const ChartTest: React.FC<TProps> = ({ name, san }: TProps) => {
  const dispatch = useAppDispatch();
  const { dataChartIndex } = useAppSelector((state) => state.chartIndex);
  const [dataSpline, setDataSpline] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [indexValue, setIndexValue] = useState(0);
  const [timeFirst, setTimeFirst] = useState(0);
  const [timeLast, setTimeLast] = useState<any>();

  useEffect(() => {
    dispatch(fetchChartIndexAsync());
  }, [dispatch]);

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
  }, [dataChartIndex.HNX, dataChartIndex.HSX, name, san, timeFirst]);

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
        plotBorderColor: '#545454',
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
        backgroundColor: "#000",
        width:205,
        height:98
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
        min: timeFirst, // Giới hạn trục x từ 2 giờ
        max: timeLast,
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
              width: .8,
              value: indexValue,
              zIndex:10
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
          let tooltipX = point.plotX - labelWidth / 2 + 50;
          let tooltipY = point.plotY - labelHeight - 10;
          if (tooltipY < this.chart.plotTop) {
            tooltipY = this.chart.plotTop + 10; // Position the tooltip just above the plot area
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
        borderWidth: "2px",
        padding: 6,
        useHTML: true,
        style: {
          width: 150,
          fontSize: "11px",
          fontWeight: "500",
          zindex:10000
        },
        shared: true,
        formatter: function () {
          const index: any = this.points?.map((e, ind) => {
            if (ind === 1) {
              return { x: e.x, y: e.y };
            }
            return "";
          });
          console.log(index);

          const hour: any = new Date(Number(index[1].x)).getHours();
          const minutes =
            new Date(Number(index[1].x)).getMinutes().toString().length === 1
              ? "0" + new Date(Number(index[1].x)).getMinutes()
              : new Date(Number(index[1].x)).getMinutes();

          return `<span>Thời gian: <b>${
            hour + ":" + minutes
          }</b></span><br/><span>Index: <b>${
            index[1].y
          }</b></span><br/><span>Khối lượng:${formatNumber(this.y)} </span>`;
        },
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        enabled:false
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
        bar:{
          color:"#5F9DFE"
        }
        // bar: {
        //   states: {
        //     hover: {
        //       enabled: true,
        //     },
        //   },
        // },
        // series: {
        //   states: {
        //     hover: {
        //       enabled: true,
        //     },
        //   },
        //   marker: {
        //     enabled: false,
        //   },
        //   zones: [{
        //     color: 'red'
        // }, {
        //     value: indexValue,
        //     color: 'green'
        // }],
        // },
      },
      series: series,
    });
    return () => {
      // chart.destroy();
    };
  }, [dataBar, dataSpline, indexValue, name, timeFirst, timeLast]);
  console.log({ timeFirst, timeLast });

  return (
    <figure className="highcharts-figure">
      <div id={`container-${name}`}></div>
    </figure>
  );
};

export default React.memo(ChartTest);
