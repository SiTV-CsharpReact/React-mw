import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchChartIndexAsync } from "./chartIndexSlice";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { drawChart } from "./util/app.chart";
import { chartIndex } from "../../models/chartIndex";
import axios from "axios";

const gradient: any = [0, 0, 50, 500];
// const xAxis: any = [
//   '09 h', '10 h', '11 h','12 h', '13 h', '14 h', '15 h'
// ];
const xAxis: any = [
  0, // Vị trí 0 tương ứng với 09h
  1, // Vị trí 1 tương ứng với 10h
  2, // Vị trí 2 tương ứng với 11h
  3, // Vị trí 3 tương ứng với 12h
  4, // Vị trí 4 tương ứng với 13h
  5, // Vị trí 5 tương ứng với 14h
  6, // Vị trí 6 tương ứng với 15h
];

const options: Highcharts.Options = {
  chart: {
    height: 95,
    backgroundColor: "#000",
    plotBackgroundColor: {
      linearGradient: gradient,
      stops: [
        [0, "#080808"],
        [1, "#917c05"],
      ],
    },
  },
  credits: {
    enabled: false,
  },
  title: {
    text: "",
  },

  yAxis: {
    min: 0,
    height: 80,
    gridLineWidth: 1,
    labels: {
      enabled: false, // Tắt hiển thị giá trị bên trục y
    },
    title: {
      text: "",
    },
    maxPadding: 0,
    gridLineColor: "#222012",
  },
  xAxis: {
    categories: xAxis,
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
    height: 60,
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
      data: [1, 2, 3, 7, 8, 9, 10, 23, 37, 80, 90],
      color: "#00ff00",
      marker: {
        enabled: false,
      },
    },
  ],
};

// const chartStyle = {
//   height: '150px', // Chiều cao tùy chỉnh
//   width: '100px', // Chiều rộng tùy chỉnh
// };
const ChartIndex = (props: HighchartsReact.Props) => {
  const dispatch = useAppDispatch();
  const { isLoading, dataChartIndex, status } = useAppSelector(
    (state) => state.chartIndex
  );
  useEffect(() => {
    dispatch(fetchChartIndexAsync());
  }, []);
  const dataChart = drawChart(dataChartIndex);
  // console.log(dataChartIndex)
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      // style={chartStyle}
      {...props}
    />
  );
};

export default React.memo(ChartIndex);
