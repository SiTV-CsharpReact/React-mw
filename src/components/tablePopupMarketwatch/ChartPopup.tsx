import { useEffect } from "react";
import Highcharts from "highcharts";
import { formatNumber } from "../../utils/util";
const ChartPopup = () => {
  useEffect(() => {
    const series: any = [
      {
        name: "",
        data: [
          3842800, 3742800, 2842800, 1742800, 3222800, 2742800, 1822800,
          1042800, 1942800, 1142800, 1098200,
        ],
        color: "#008000",
      },
    ];
    const xAxis: any = [
      49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6,
    ];
    const gradient: any = [0, 0, 50, 500];
    const chart = Highcharts.chart("Chartcontainer", {
      chart: {
        type: "column",
        // zoomType: "xy",
        height: 160,
        // width: 225,
        polar: true,
        backgroundColor: "#505050",
        plotBackgroundColor: {
          linearGradient: gradient,
          stops: [
            [0, "#080808"],
            [1, "#917c05"],
          ],
        },
        // plotBorderColor: "#333333",
        // plotBorderWidth: 1,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: xAxis,
        labels: {
          rotation: 0,
          style: {
            color: "#969696",
            fontSize: "9px",
          },
        },
        height: 120,
        lineWidth: 0,
        offset: -10,
        // crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        labels: {
          style: {
            fontSize: "9px",
            color: "#969696",
          },
          distance: 8,
        },
        height: 120,
        endOnTick: true,
        maxPadding: 0.01,
        // minorGridLineWidth: 0,
        minorTickInterval: 5,
        tickAmount: 5,
        // lineWidth: 0,
        // lineColor: "#333333",
        //vien ke ngang truc oy
        // gridLineColor: "#777777",
        gridLineWidth: 0,
      },
      tooltip: {
        backgroundColor: "#ffffffc9",
        borderColor: "#edc240",
        borderRadius: 5,
        borderWidth: 2,
        padding: 6,
        style: {
          fontSize: "12px",
          fontWeight: "500",
        },
        formatter: function () {
          return `<span>Giá: <b>${formatNumber(
            this.y
          )}</b></span><br/><span>Khối lượng: <b>${this.key}</b></span>`;
        },
        useHTML: true,
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
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
    return () => {
      chart.destroy();
    };
  }, []);
  return (
    <div className="w-full bg-[#333333]">
      <figure className="highcharts-figure">
        <div id="Chartcontainer"></div>
      </figure>
    </div>
  );
};

export default ChartPopup;
