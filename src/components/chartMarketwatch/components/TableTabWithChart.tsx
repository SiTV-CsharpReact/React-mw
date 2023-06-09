import React, { useEffect } from "react";
import Highcharts from "highcharts";
import { formatNumber } from "../../../utils/util";

const TableTabWithChart = () => {
  useEffect(() => {
    const series: any = [
      {
        name: "Year 1990",
        data: [631, 727, 3202, 721, 26, 100, 200],
        color: "#c2c2c2",
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 726, 31, 992, 102],
        color: "#c2c2c2",
      },
    ];
    const chart = Highcharts.chart("container", {
      accessibility: {
        enabled: false,
      },
      chart: {
        type: "bar",
        backgroundColor: "#000000",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        lineWidth: 1,
        gridLineColor: "#404040",
        labels: {
          style: {
            color: "#fff",
          },
        },
      },
      yAxis: [
        {
          title: {
            text: null,
          },
          labels: {
            style: {
              color: "#fff",
            },
          },
          endOnTick: true,
          lineWidth: 1,
          lineColor: "#404040",
          gridLineColor: "#404040",
        },
        {
          title: {
            text: null,
          },
          endOnTick: true,
          lineWidth: 1,
          lineColor: "#404040",
          gridLineColor: "#404040",
          opposite: true,
        },
      ],
      tooltip: {
        backgroundColor: "#000",
        style: {
          color: "#c5c5c5",
          opacity: 0.7,
          fontSize: "13px",
          fontWeight: "500",
        },
        padding: 8,
        borderRadius: 4,
        formatter: function () {
          console.log(this);

          return `<span>Khối lượng: ${formatNumber(
            this.y
          )}</span><br/><span>Giá: ${this.key}</span>`;
        },
        useHTML: true,
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderWidth: 1,
          borderRadius: 0,
          borderColor: "#a8a8a8",
          pointPadding: 0.02,
          dataLabels: {
            enabled: false,
          },
          states: {
            hover: {
              borderColor: "#979797",
              brightness: 0,
            },
            inactive: {
              opacity: 1,
            },
          },
          groupPadding: 0,
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
    <div>
      <figure className="highcharts-figure">
        <div id="container"></div>
      </figure>
    </div>
  );
};

export default TableTabWithChart;
