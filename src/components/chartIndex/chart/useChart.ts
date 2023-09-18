import * as HighCharts from "highcharts";
import { _getDateTs } from "../util/app.chart";
import { IChartIndex, IData } from "../interface/interface.config";

export const useChart = (
  dataSpline: number[][],
  dataBar: number[][],
  indexValue: number
) => {
  const options: HighCharts.Options = {
    boost: {
      enabled: true,
    },
    chart: {
      marginTop: 8,
      marginBottom: 15,
      plotBorderWidth: 1,
      plotBorderColor: "#545454",
      backgroundColor: "#000000",
      plotBackgroundColor: {
        linearGradient: [0, 0, 50, 380] as any,
        stops: [
          [0, "#080808"],
          [1, "#917c05"],
        ],
      },
      width: 205,
      height: 98,
      events: {
        load: function () {
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
          this.update({
            yAxis: {
              plotLines: [
                {
                  value: indexValue,
                  color: "red",
                  width: 1,
                  zIndex: 10,
                },
              ],
            },
          });
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
      dateTimeLabelFormats: {
        hour: "%H h",
      },
      labels: {
        useHTML: true,
        style: {
          color: "#a5a5a5",
          fontSize: "8px",
        },
      },
      offset: -9,
      zIndex: 1,
      gridLineWidth: 1.5,
      gridLineColor: "#35353550",
      lineWidth: 0,
      tickWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      tickInterval: 3600000,
    },
    yAxis: [
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
        // plotLines: [
        //   {
        //     color: "#FFFF00",
        //     width: 1,
        //     value: indexValue,
        //     zIndex: 10,
        //   },
        // ],
      },
      {
        title: {
          text: "",
        },
        labels: {
          enabled: false,
        },
        gridLineWidth: 0,
        opposite: true,
        lineWidth: 0,
      },
    ],
    time: {
      useUTC: false,
    },
    tooltip: {
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
        color: "#00c010",
        states: {
          hover: {
            enabled: true,
            lineWidth: 1.2,
          },
        },
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
      column: {
        color: "#5F9DFE",
      },
    },
    series: [
      {
        name: "Index",
        type: "spline",
        data: dataSpline,
        yAxis: 1,
      },
      {
        name: "Khối lượng",
        type: "column",
        yAxis: 0,
        data: dataBar,
      },
    ],
  };
  return { options };
};

export function getDataChart(data: IChartIndex, name: string) {
  switch (name) {
    case "VNXALL":
      return [
        data.HSX.DataFull.VNXALL.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VNXALL.map(item => convertDataColumn(item))
      ];
    case "VNI":
      return [
        data.HSX.DataFull.VNIndex.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VNIndex.map(item => convertDataColumn(item))
      ];
    case "VNSML":
      return [
        data.HSX.DataFull.VNSML.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VNSML.map(item => convertDataColumn(item))
      ];
    case "VN30":
      return [
        data.HSX.DataFull.VN30.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VN30.map(item => convertDataColumn(item))
      ];
    case "VNALL":
      return [
        data.HSX.DataFull.VNALL.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VNALL.map(item => convertDataColumn(item))
      ];
    case "VN100":
      return [
        data.HSX.DataFull.VN100.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VN100.map(item => convertDataColumn(item))
      ];
    case "VNMID":
      return [
        data.HSX.DataFull.VNMID.map(item => convertDataIndex(item)),
        data.HSX.DataFull.VNMID.map(item => convertDataColumn(item))
      ];
    case "HNX":
      return [
        data.HNX.DataFull.HNXIndex.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXIndex.map(item => convertDataColumn(item))
      ];
    case "HNX30":
      return [
        data.HNX.DataFull.HNX30.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNX30.map(item => convertDataColumn(item))
      ];
    case "HNXLCAP":
      return [
        data.HNX.DataFull.HNXLCap.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXLCap.map(item => convertDataColumn(item))
      ];
    case "HNXSMCAP":
      return [
        data.HNX.DataFull.HNXMSCap.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXMSCap.map(item => convertDataColumn(item))
      ];
    case "HNXFIN":
      return [
        data.HNX.DataFull.HNXFin.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXFin.map(item => convertDataColumn(item))
      ];
    case "HNXMAN":
      return [
        data.HNX.DataFull.HNXMan.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXMan.map(item => convertDataColumn(item))
      ];
    case "HNXCON":
      return [
        data.HNX.DataFull.HNXCon.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXCon.map(item => convertDataColumn(item))
      ];
    case "HNXUPCOM":
      return [
        data.HNX.DataFull.HNXUpcomIndex.map(item => convertDataIndex(item)),
        data.HNX.DataFull.HNXUpcomIndex.map(item => convertDataColumn(item))
      ];
    default:
      return [];
  }
}

export function convertDataIndex(data: IData) {
  return [data.Data.TimeJS, data.Data.Index]
}

export function convertDataColumn(data: IData) {
  return [data.Data.TimeJS, data.Data.Vol]
}

export function getPlotLine(data: IChartIndex, name: string): number {
  switch (name) {
    case "VNXALL":
      return data.HSX.LastIndex.VNXALL;
    case "VNI":
      return data.HSX.LastIndex.VNIndex;
    case "VNSML":
      return data.HSX.LastIndex.VNSML;
    case "VN30":
      return data.HSX.LastIndex.VN30;
    case "VNALL":
      return data.HSX.LastIndex.VNALL;
    case "VN100":
      return data.HSX.LastIndex.VN100;
    case "VNMID":
      return data.HSX.LastIndex.VNMID;
    case "HNX":
      return data.HNX.LastIndex.HNXIndex;
    case "HNX30":
      return data.HNX.LastIndex.HNX30;
    case "HNXLCAP":
      return data.HNX.LastIndex.HNXLCap;
    case "HNXSMCAP":
      return data.HNX.LastIndex.HNXMSCap;
    case "HNXFIN":
      return data.HNX.LastIndex.HNXFin;
    case "HNXMAN":
      return data.HNX.LastIndex.HNXMan;
    case "HNXCON":
      return data.HNX.LastIndex.HNXCon;
    case "HNXUPCOM":
      return data.HNX.LastIndex.HNXUpcomIndex;
    default:
      return 0;
  }
}


