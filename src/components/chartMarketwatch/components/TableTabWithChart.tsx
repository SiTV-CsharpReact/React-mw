import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { Data } from "../config/interface.config";
import axios from "axios";
import { fetchDataTableKLTTGAsync } from "../../tablePopupMarketwatch/dataTablePopupDetailSlice";

const classTable = "border border-[#404040] px-[6px] text-[13px] font-normal";

const TableTabWithChart = () => {
  const stockCode = useAppSelector((state) => state.chart.code);
  const symbolNew = stockCode === "" ? "FTS" : stockCode;
  const [dataChart, setDataChart] = useState<Data[]>([]);
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [matchingByPrice, setMatchingByPrice] = useState(false);
  const [dataTable, setDataTable] = useState<any>([]);
  useEffect(() => {
    dispatch(fetchDataTableKLTTGAsync(stockCode));
  }, [stockCode, dispatch]);

  const { dataTableKLTTG } = useAppSelector((state) => state.dataPopupDetail);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Data[]>(
        `http://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${symbolNew}`
      );
      setDataChart(response.data);
    };
    fetchData();
  }, [stockCode, symbolNew]);

  useEffect(() => {
    const transformedData = dataTableKLTTG?.Body?.reduce(
      (result: any, item: any) => {
        const existingItem = result.find((x: any) => x.MP === item.MP);
        if (existingItem) {
          existingItem.MQ += item.MQ;
        } else {
          result.push({ MP: item.MP, MQ: item.MQ });
        }
        return result;
      },
      []
    );

    transformedData?.sort((a: any, b: any) => a.MP - b.MP);
    setDataTable(transformedData);
  }, [dataTableKLTTG]);

  useEffect(() => {
    let data: any = dataTable?.map((item: any) => item.MQ) || [];
    const series: any = [
      {
        name: "Up",
        data: data,
        colorByPoint: true,
        inverted: true,
      },
    ];

    const chart = Highcharts.chart("container", {
      chart: {
        type: "bar",
        backgroundColor: "#000000",
        plotBorderWidth: 0,
        inverted: true,
      },

      title: {
        text: "",
      },
      xAxis: {
        categories: dataTable?.map((item: any) => item.MP) || [],
        labels: {
          rotation: 0,
          useHTML: true,
          style: {
            color: "#ffffff",
            fontSize: "9pt",
          },
        },
        reversed: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        gridLineWidth: 1,
        gridLineColor: "#343434",
        labels: {
          rotation: 0,
          overflow: "justify",
          useHTML: true,
          style: {
            color: "#ffffff",
            fontSize: "9pt",
          },
        },
      },
      legend: {
        reversed: true,
        enabled: false, // Ẩn chú giải
      },
      tooltip: {
        headerFormat: "",
        pointFormatter: function () {
          // Tùy chỉnh thông tin hiển thị khi hover
          return (
            '<span style="color: #000000">Khối lượng: </span><b>' +
            this.y?.toLocaleString() +
            '<br><span style="color: #000000">Giá: </span> <b>' +
            this.category +
            "</b>"
          );
        },
      },
      plotOptions: {
        // series: {
        //   stacking: "normal",
        //   borderWidth: 0,
        //   color: "#089981",
        //   dataLabels: {
        //     enabled: true,
        //     align: "right", // Đặt số ở bên phải
        //     style: {
        //       textOutline: "none", // Xóa viền cho dataLabels
        //       color: "#ffffff", // Màu trắng
        //       // display: "none",
        //       fontSize: "8pt",
        //       fontWeight: "normal",
        //       enabled: true,
        //     },
        //   },
        // },
        bar: {
          borderRadius: "0%",
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            style: {
              textOutline: "none", // Xóa viền cho dataLabels
              color: "#ffffff", // Màu trắng
              // display: "none",
              fontSize: "7pt",
              fontWeight: "normal",
            },
          },
          groupPadding: 0.1,
        },
      },
      colors:
        dataTable?.map((item: any) =>
          item.MP == dataChart[0]?.Info[3][1]
            ? "#66CCFF"
            : item.MP > dataChart[0]?.Info[3][1] &&
              item.MP < dataChart[0]?.Info[1][1]
            ? "#FF0000"
            : item.MP == dataChart[0]?.Info[1][1]
            ? "#F7FF31"
            : item.MP > dataChart[0]?.Info[1][1] &&
              item.MP < dataChart[0]?.Info[2][1]
            ? "#089981"
            : "#FF00FF"
        ) || [],
      credits: {
        enabled: false, // Ẩn chữ Highcharts.com
      },
      series: series,
    });

    return () => {
      chart.destroy();
    };
  }, [dataTable, dataTableKLTTG, dataChart]);

  return (
    <div>
      <div className="relative z-10 flex flex-col justify-center h-[30px] bg-[#404040] w-full">
        <input
          type="text"
          onMouseDown={() => {
            setIsFocus(!isFocus);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          className=" w-full h-full text-[13px] text-center cursor-pointer text-white bg-transparent !border-none !outline-none focus:!border-none focus:!shadow-none"
          value={
            matchingByPrice
              ? " Khớp lệnh theo mức giá"
              : "Khớp lệnh theo thời gian"
          }
          readOnly
        />
        <span className="absolute right-2">
          <svg
            width="9"
            height="5"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 7.44697L0 1.6132L1.4 0.251984L6 4.72455L10.6 0.251984L12 1.6132L6 7.44697Z"
              fill="#fff"
            />
          </svg>
        </span>
        {isFocus && (
          <div className="absolute top-[30px] border-t border-t-borderTransfer bg-[#404040] w-full flex flex-col items-center justify-center">
            <span
              className="w-full py-1 text-center cursor-pointer hover:bg-[#1e90ff]"
              onMouseDown={() => {
                setMatchingByPrice(false);
              }}
            >
              Khớp lệnh theo thời gian
            </span>
            <span
              className="w-full py-1 text-center cursor-pointer hover:bg-[#1e90ff]"
              onMouseDown={() => {
                setMatchingByPrice(true);
              }}
            >
              Khớp lệnh theo mức giá
            </span>
          </div>
        )}
      </div>
      <figure
        className={`${matchingByPrice ? "" : "hidden"}  highcharts-figure`}
      >
        <div id="container" className="overflow-y-auto"></div>
      </figure>
      {!matchingByPrice && (
        <div className="h-[400px] overflow-y-auto">
          <table>
            <thead>
              <tr className={` ${classTable}`}>
                <th className={`py-[11px] ${classTable}`}>Thời gian</th>
                <th className={` ${classTable}`}>Khối lượng</th>
                <th className={` ${classTable}`}>Giá</th>
                <th className={` ${classTable}`}>Tổng KL</th>
              </tr>
            </thead>
            <tbody className={` ${classTable}`}>
              {dataTableKLTTG?.Body?.map((item: any) => item)
                .reverse()
                .map((item: any, index: any) => (
                  <tr
                    className={`${
                      item.MP === dataChart[0]?.Info[3][1]
                        ? "text-[#66CCFF]"
                        : item.MP > dataChart[0]?.Info[3][1] &&
                          item.MP < dataChart[0]?.Info[1][1]
                        ? "text-[#FF0000]"
                        : item.MP == dataChart[0]?.Info[1][1]
                        ? "text-[#F7FF31]"
                        : item.MP > dataChart[0]?.Info[1][1] &&
                          item.MP < dataChart[0]?.Info[2][1]
                        ? "text-[#00FF00]"
                        : "text-[#FF00FF]"
                    } text-end`}
                    key={index}
                  >
                    <td className={` ${classTable} py-[3px]`}>{item.MT}</td>
                    <td className={` ${classTable}`}>
                      {item.MQ.toLocaleString()}
                    </td>
                    <td className={` ${classTable} `}>{item.MP}</td>
                    <td className={` ${classTable}`}>
                      {item.TQ.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default React.memo(TableTabWithChart);
