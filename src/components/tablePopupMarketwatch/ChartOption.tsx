import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchChartOptionAsync } from "./chartOptionSlice";
// import { HighchartsProvider } from "react-jsx-highcharts";
import { DataStockCode } from "../../models/stockCode";
const ChartOption: React.FC<DataStockCode> = (data) => {
  const dispatch = useAppDispatch();
  const { isLoading, dataChartOption, status } = useAppSelector(
    (state) => state.chartOption
  );

  useEffect(() => {
    dispatch(fetchChartOptionAsync({ stockCode: data.stockCode }));
  }, []);
  const linear = [
    { x: 0, y: 0 },
    { x: 0, y: 50 },
    { x: 50, y: 200 },
    { x: 500, y: 200 },
  ];
  const options: Highcharts.Options = {
    chart: {
      height: 160,
      backgroundColor: "#333333",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    yAxis: {
      min: 0,
      height: 160,
      gridLineWidth: 1,
      labels: {
        enabled: false,
      },
      title: {
        text: "",
      },
      maxPadding: 0,
      gridLineColor: "#222012",
    },
    xAxis: {
      type: "datetime",
      tickInterval: 3600 * 1000,
      gridLineWidth: 1,
      gridLineColor: "#222012",
      startOnTick: true,
      labels: {
        rotation: 0,
        style: {
          color: "#969696",
          fontSize: "8px",
        },
      },
      height: 120,
      tickWidth: 0,
      maxPadding: 0,
      minPadding: 0,
    },
    legend: {
      symbolPadding: 0,
      symbolWidth: 0,
      symbolHeight: 0,
      squareSymbol: false,
    },
    plotOptions: {
      line: {
        states: {
          hover: { enabled: false },
        },
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "",
        type: "line",
        data: dataChartOption,
        color: "#00ff00",
        marker: {
          enabled: false,
        },
      },
    ],
  };

  const chartComponentRef = useRef<any>(null);

  return (
    <>
      {/* <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsReact options={options} ref={chartComponentRef} />
      </HighchartsProvider> */}
    </>
  );
};

export default React.memo(ChartOption);
