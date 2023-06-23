import React, { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import { RootState, useAppSelector } from "../../../store/configureStore";
import { getMax, getMin } from "./utils/service";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const ChartReport: any = (date: any) => {
  const { mode } = useAppSelector((state:RootState) => state.settingColorMode);
  const { assetReport } = useAppSelector((state:RootState) => state.assetReport);
  // console.log(getMax(assetReport.Table2));
  console.log(date);

  const data = {
    labels: assetReport.Table2?.map((item: any) => item.ADATE)
      ?.splice(0, Number(date.date))
      .reverse(),
    datasets: [
      {
        type: "line" as const,
        label: "Biến động",
        borderColor: "#000000",
        data: assetReport.Table2?.map((item: any) => item.ANAV)
          ?.splice(0, Number(date.date))
          .reverse(),
        pointStyle: "circle",
        borderWidth: 1,
        fill: true,
        pointBorderColor: "#d0ffb0",
        pointBackgroundColor: "red",
        pointRadius: 4,
        pointHoverRadius: 6,

        // pointHitRadius: 10,
        // pointBorderWidth: 4,
      },
      {
        type: "bar" as const,
        label: "NAV",
        backgroundColor: "#70ad47",
        data: assetReport.Table2?.map((item: any) => item.ANAV)
          ?.splice(0, Number(date.date))
          .reverse(),
        borderWidth: 1,
        barThickness: 42,
        // pointStyle: "rectRounded",
      },
    ],
    // responsive: true,
    // maintainAspectRatio: true,
  };

  const options = {
    plugins: {
      tooltip: {
        // usePointStyle: true,
        pointStyle: "cirlce",
        backgroundColor: "#fff2cc" as const,
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#70ad47",
        borderWidth: 1,
        paddind: 10,
        titleFont: {
          size: 15,
          weight: "bold",
        },
        callbacks: {
          title: function (context: any) {
            let title = `NAV cuối ngày: ${context[0].formattedValue}₫`;
            return title;
          },
          beforeBody: function (context: any) {
            // console.log(context);

            const label_1 = `Phát sinh tăng: 0₫ 
Phát sinh tăng: 0₫`;
            return label_1;
          },
          label: (context: any) => {
            let label = "";
            if (context.parsed.y) {
              label = context.parsed.y + "%";
            }
            return label;
          },
          labelPointStyle: function (context: any) {
            // return "circle";
            console.log(context.chart.legend.legendItems[0]);

            context.chart.legend.legendItems[0].pointStyle = "line";
            context.chart.legend.legendItems[0].strokeStyle = "#000";
          },
        },
      },
      legend: {
        // display: false,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: `${mode === "light" ? "#000" : "#fff"}`,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          // suggestedMin: getMin(assetReport.Table2),
          // suggestedMax: getMax(assetReport.Table2),
          suggestedMin: getMin(assetReport.Table2),
          suggestedMax: getMax(assetReport.Table2),
          // forces step size to be 50 units
          stepSize: 200000,
          color: `${mode === "light" ? "#000" : "#fff"}`,
        },
      },
    },
    // series: [
    //   {
    //     type: "column",
    //     name: "NAV",
    //     data: 'chartSeriesData',
    //     color: "#70AD47",
    //     marker: {
    //       symbol: "auto",
    //     },
    //     yAxis: 0,
    //     tooltip: {
    //       pointFormatter: function () {
    //         return `<span style="font-size:14px; font-weight:bold; ">'dasa'</span></br><span>'dsa'<span>$dsa`;
    //       },
    //     },
    //   },
    //   {
    //     color: "#595959",
    //     marker: {
    //       symbol: "circle",
    //       fillColorFun: (pointData: any) => {
    //         return pointData >= 0 ? "#548235" : "#C00000";
    //       },
    //     },
    //     yAxis: 1,
    //     lineWidth: 1,
    //     name: "REPORT_BD",
    //     type: "line",
    //     data: "chartSeriesDataLine",
    //     tooltip: {
    //       valueSuffix: "%",
    //       pointFormatter: function () {
    //         return (
    //           "" +
    //           '<span style="color:' +
    //           "this.color" +
    //           ';">\u25CF ' +
    //           "</span> " +
    //           '<span style="font-size:14px; font-weight:bold;"> ' +
    //           "this.nav" +
    //           ' <span style="text-decoration: underline;"></span>'
    //         );
    //       },
    //     },
    //   },
    // ],
    responsive: true,
  };

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Chart
      ref={chartRef}
      type="bar"
      onClick={onClick}
      options={options}
      data={data}
      width={1900}
      height={"308px"}
      // width={600}
    />
  );
};

export default ChartReport;
