import * as HighCharts from "highcharts";
import { _getDateTs } from "../util/app.chart";
import { IChartIndex, IData } from "../interface/interface.config";
import {
  DataReponseHNX_HSX,
  IDataSS,
} from "../../indexMarketWatch/interface/slidemarket.config";

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
        convertDataIndex(data.HSX?.DataFull.VNXALL || []),
        convertDataColumn(data.HSX?.DataFull.VNXALL || []),
      ];
    case "VNI":
      return [
        convertDataIndex(data.HSX?.DataFull.VNIndex || []),
        convertDataColumn(data.HSX?.DataFull.VNIndex || []),
      ];
    case "VNSML":
      return [
        convertDataIndex(data.HSX?.DataFull.VNSML || []),
        convertDataColumn(data.HSX?.DataFull.VNSML || []),
      ];
    case "VN30":
      return [
        convertDataIndex(data.HSX?.DataFull.VN30 || []),
        convertDataColumn(data.HSX?.DataFull.VN30 || []),
      ];
    case "VNALL":
      return [
        convertDataIndex(data.HSX?.DataFull.VNALL || []),
        convertDataColumn(data.HSX?.DataFull.VNALL || []),
      ];
    case "VN100":
      return [
        convertDataIndex(data.HSX?.DataFull.VN100 || []),
        convertDataColumn(data.HSX?.DataFull.VN100 || []),
      ];
    case "VNMID":
      return [
        convertDataIndex(data.HSX?.DataFull.VNMID || []),
        convertDataColumn(data.HSX?.DataFull.VNMID || []),
      ];
    case "HNX":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXIndex || []),
        convertDataColumn(data.HNX?.DataFull.HNXIndex || []),
      ];
    case "HNX30":
      return [
        convertDataIndex(data.HNX?.DataFull.HNX30 || []),
        convertDataColumn(data.HNX?.DataFull.HNX30 || []),
      ];
    case "HNXLCAP":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXLCap || []),
        convertDataColumn(data.HNX?.DataFull.HNXLCap || []),
      ];
    case "HNXSMCAP":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXMSCap || []),
        convertDataColumn(data.HNX?.DataFull.HNXMSCap || []),
      ];
    case "HNXFIN":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXFin || []),
        convertDataColumn(data.HNX?.DataFull.HNXFin || []),
      ];
    case "HNXMAN":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXMan || []),
        convertDataColumn(data.HNX?.DataFull.HNXMan || []),
      ];
    case "HNXCON":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXCon || []),
        convertDataColumn(data.HNX?.DataFull.HNXCon || []),
      ];
    case "HNXUPCOM":
      return [
        convertDataIndex(data.HNX?.DataFull.HNXUpcomIndex || []),
        convertDataColumn(data.HNX?.DataFull.HNXUpcomIndex || []),
      ];
    default:
      return [];
  }
}

export function updateChart(objJSON: IDataSS, data: IChartIndex) {
  const obj = objJSON.SS;
  if (obj === null) {
    return;
  }
  for (let i = 0; i < obj?.length; i++) {
    const child = obj[i];
    if (child.HSX.VNXALL.length !== 0) {
      data.HSX?.DataFull.VNXALL.concat(child.HSX.VNXALL);
    } else if (child.HSX.VNIndex.length !== 0) {
      data.HSX?.DataFull.VNIndex.concat(child.HSX.VNIndex);
    } else if (child.HSX.VNSML.length !== 0) {
      data.HSX?.DataFull.VNSML.concat(child.HSX.VNSML);
    } else if (child.HSX.VNMID.length !== 0) {
      data.HSX?.DataFull.VNMID.concat(child.HSX.VNMID);
    } else if (child.HSX.VNALL.length !== 0) {
      data.HSX?.DataFull.VNALL.concat(child.HSX.VNALL);
    } else if (child.HSX.VNALL.length !== 0) {
      data.HSX?.DataFull.VNALL.concat(child.HSX.VNALL);
    } else if (child.HSX.VN30.length !== 0) {
      data.HSX?.DataFull.VN30.concat(child.HSX.VN30);
    } else if (child.HSX.VN100.length !== 0) {
      data.HSX?.DataFull.VN100.concat(child.HSX.VN100);
    } else if (child.HNX.HNX30.length !== 0) {
      data.HNX?.DataFull.HNX30.concat(child.HNX.HNX30);
    } else if (child.HNX.HNXCon.length !== 0) {
      data.HNX?.DataFull.HNXCon.concat(child.HNX.HNXCon);
    } else if (child.HNX.HNXFin.length !== 0) {
      data.HNX?.DataFull.HNXFin.concat(child.HNX.HNXFin);
    } else if (child.HNX.HNXIndex.length !== 0) {
      data.HNX?.DataFull.HNXIndex.concat(child.HNX.HNXIndex);
    } else if (child.HNX.HNXLCap.length !== 0) {
      data.HNX?.DataFull.HNXLCap.concat(child.HNX.HNXLCap);
    } else if (child.HNX.HNXMSCap.length !== 0) {
      data.HNX?.DataFull.HNXMSCap.concat(child.HNX.HNXMSCap);
    } else if (child.HNX.HNXUpcomIndex.length !== 0) {
      data.HNX?.DataFull.HNXUpcomIndex.concat(child.HNX.HNXUpcomIndex);
    }
  }
  return data;
}

export function drawChartSlide(lstData: DataReponseHNX_HSX, arr: IChartIndex) {}

export function convertDataIndex(data: IData[]) {
  return data.map((item) => [item.Data.TimeJS, item.Data.Index]);
}

export function convertDataColumn(data: IData[]) {
  return data.map((item) => [item.Data.TimeJS, item.Data.Vol]);
}

export function getPlotLine(data: IChartIndex, name: string): any {
  switch (name) {
    case "VNXALL":
      return data.HSX?.LastIndex.VNXALL;
    case "VNI":
      return data.HSX?.LastIndex.VNIndex;
    case "VNSML":
      return data.HSX?.LastIndex.VNSML;
    case "VN30":
      return data.HSX?.LastIndex.VN30;
    case "VNALL":
      return data.HSX?.LastIndex.VNALL;
    case "VN100":
      return data.HSX?.LastIndex.VN100;
    case "VNMID":
      return data.HSX?.LastIndex.VNMID;
    case "HNX":
      return data.HNX?.LastIndex.HNXIndex;
    case "HNX30":
      return data.HNX?.LastIndex.HNX30;
    case "HNXLCAP":
      return data.HNX?.LastIndex.HNXLCap;
    case "HNXSMCAP":
      return data.HNX?.LastIndex.HNXMSCap;
    case "HNXFIN":
      return data.HNX?.LastIndex.HNXFin;
    case "HNXMAN":
      return data.HNX?.LastIndex.HNXMan;
    case "HNXCON":
      return data.HNX?.LastIndex.HNXCon;
    case "HNXUPCOM":
      return data.HNX?.LastIndex.HNXUpcomIndex;
    default:
      return 0;
  }
}
