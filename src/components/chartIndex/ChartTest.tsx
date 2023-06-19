import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { formatNumber } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchChartIndexAsync } from "./chartIndexSlice";

type TProps = {
  name: string;
  san: string;
};
const ChartTest: React.FC<TProps> = ({ name, san }: TProps) => {
  const dispatch = useAppDispatch();
  const { dataChartIndex } = useAppSelector((state) => state.chartIndex);
  const [dataChart, setDataChart] = useState([]);
  const [indexValue, setIndexValue] = useState(0);
  const [indexVol, setIndexVol] = useState(0);

  useEffect(() => {
    dispatch(fetchChartIndexAsync());
  }, [dispatch]);

  const data: any = React.useMemo(() => {
    if (san === "HSX") {
      return dataChartIndex.HSX;
    } else {
      return dataChartIndex.HNX;
    }
  }, [dataChartIndex.HNX, dataChartIndex.HSX, san]);
  useEffect(() => {
    if (san === "HSX") {
      const hsx = dataChartIndex.HSX;
      const data =
        name === "VNXALL"
          ? hsx?.DataFull.VNXALL
          : name === "VNI"
          ? hsx?.DataFull.VNIndex
          : name === "VNSML"
          ? hsx?.DataFull.VNSML
          : name === "VN30"
          ? hsx?.DataFull.VN30
          : name === "VN100"
          ? hsx?.DataFull.VN100
          : name === "VNMID"
          ? hsx?.DataFull.VNMID
          : [];
      const value: any = data?.map((item: any) => [
        item.Data.TimeJS,
        item.Data.Index,
        item.Data.Vol,
      ]);
      data?.map((item: any, index: number) => {
        if (index === 0) {
          const v = item?.Data.Index;
          setIndexValue(v);
        }
        return "";
      });

      setDataChart(value);
      // const checkKey = Object.hasOwn(hsx?.DataFull, id);
      // console.log(hsx?.DataFull.VNXALL);
    }
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
      const value: any = data?.map((item: any) => [
        item.Data.TimeJS,
        item.Data.Index,
        item.Data.Vol,
      ]);
      data?.map((item: any, index: number) => {
        if (index === 0) {
          const v = item?.Data.Index;
          setIndexValue(v);
        }
        return "";
      });
      setDataChart(value);
      // data?.map((item: any, index: number) => {
      //   if (item?.Data.Index >= indexValue) {
      //     setColor("#00c010");
      //   } else {
      //     setColor("pink");
      //   }
      // });
      // for (let i = 1; i < data?.length; i++) {
      //   if (indexValue > data?.Data[i]?.Index) {
      //     setColor("#00c010");
      //   }
      // }
    }
  }, [data?.DataFull, dataChartIndex,  name, san]);

  useEffect(() => {
    const gradient: any = [0, 0, 50, 380];
    const series: any[] = [
      {
        name: "",
        type: "spline",
        data: dataChart,
        color: '#00c010',
      },
    ];

    Highcharts.chart(`container-${name}`, {
      chart: {
        zooming: {
          type: "xy",
        },
        polar: true,
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
        backgroundColor: "#000",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: [
        {
          type: "datetime",
          labels: {
            rotation: 0,
            style: {
              color: "#969696",
              fontSize: "9px",
            },
          },
          dateTimeLabelFormats: {
            hour: "%H h",
          },
          gridLineWidth: 2,
          gridLineColor: "#35353550",
          lineWidth: 0,
          tickWidth: 0,
          minPadding: 0,
          maxPadding: 0,
            // min: Date.UTC(2023, 0, 1, 2),
            // max: Date.UTC(2023, 0, 1, 8),
          tickInterval: 3600000,
          minRange: 3600000,
          height: 60,
          //   offset: 15
        },
      ],
      time: {
        useUTC: false,
      },
      yAxis: [
        {
          endOnTick: true,
          title: {
            text: null,
          },
          labels: {
            enabled: false,
          },
          gridLineWidth: 0,
          tickAmount: 10,
          plotLines: [
            {
              color: "#939000",
              width: 1,
              value: indexValue,
            },
          ],
          height: 60,
          // min: Date.UTC(2023, 0, 1, 2),
        },
      ],
      tooltip: {
        positioner: function (labelWidth, labelHeight, point) {
          const tooltipX = point.plotX;
          const tooltipY = point.plotY;
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
        style: {
          width: 150,
          fontSize: "11px",
          fontWeight: "500",
        },
        formatter: function () {
          console.log(this);
          const hour: any = new Date(Number(this.key)).getHours();
          const minutes =
            new Date(Number(this.key)).getMinutes().toString().length === 1
              ? "0" + new Date(Number(this.key)).getMinutes()
              : new Date(Number(this.key)).getMinutes();

          return `<span>Thời gian: <b>${
            hour + ":" + minutes
          }</b></span><br/><span>INDEX: <b>${
            this.y
          }</b></span><br/><span>Khối lượng: </span>`;
        },
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
      },
      plotOptions: {
        // area: {
        //   lineWidth: 1,
        //   color: "red",
        // },
        spline: {
          color: "#00c010",
          lineWidth: 1,
        },
        series: {
          states: {
            hover: {
              enabled: true,
            },
          },
          marker: {
            enabled: false,
          },
        },
      },
      series: series,
    });
    return () => {
      // chart.destroy();
    };
  }, [dataChart, indexValue, name]);
  return (
    <figure className="highcharts-figure">
      <div id={`container-${name}`}></div>
    </figure>
  );
};

export default React.memo(ChartTest);
