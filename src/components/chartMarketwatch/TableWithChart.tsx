import React, { useEffect, useState } from "react";
import FooterChart from "../footerMarketwatch/FooterChart";
import ImageBuySell from "../../images/ppc-optimization-32.png";
import ImageHandShake from "../../images/handshake-32.png";
import { formatNumber, setColorMarket } from "../../utils/util";
import ImagePriceBoard from "../../images/calendar-7-32.png";
import axios from "axios";
import { useAppSelector } from "../../store/configureStore";
import { Data } from "./config/interface.config";

const TableWithChart = () => {
  const stockCode = useAppSelector((state) => state.chart.code);
  const [dataChart, setDataChart] = useState<Data[]>([]);
  const symbolNew = stockCode === "" ? "FTS" : stockCode;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Data[]>(
        `http://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${stockCode}`
      );
      setDataChart(response.data);
    };
    fetchData();
  }, [stockCode]);
  return (
    <div className="chart-layout-right float-right w-[350px]  ">
      <div className="mt-content">
        <table className="no-index">
          {dataChart?.map((dataTable: any, index: number) => (
            <tbody key={index}>
              <tr className="no-border">
                <td colSpan={4} className="h-40">
                  <span className="text-xl">{dataTable?.Info[0][1]}</span>
                  <span className="text-xl">
                    <span className="px-1"></span>
                    {dataTable?.Info[11][1]}
                  </span>
                  <span
                    className={`px-1 ${setColorMarket(
                      dataTable?.Info[1][1],
                      dataTable?.Info[31][1],
                      dataTable?.Info[2][1],
                      dataTable?.Info[3][1]
                    )}`}
                  >
                    {dataTable?.Info[13][1]}
                  </span>
                  <span
                    className={`px-1 ${setColorMarket(
                      dataTable?.Info[1][1],
                      dataTable?.Info[31][1],
                      dataTable?.Info[2][1],
                      dataTable?.Info[3][1]
                    )}`}
                  >
                    (
                    {(
                      (dataTable?.Info[13][1] / dataTable?.Info[1][1]) *
                      100
                    ).toFixed(1)}
                    )%
                  </span>
                </td>
              </tr>
              <tr className="no-border">
                <td>
                  <span>K.Lượng</span>
                </td>
                <td>
                  <span className="value-kl">
                    <span
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "transparent",
                        border: "none !important",
                        padding: 0,
                      }}
                    >
                      {formatNumber(dataTable?.Info[21][1])}
                    </span>
                  </span>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr className="no-border">
                <td>
                  <span>Trần</span>
                </td>
                <td>
                  <span className="value-kl">
                    <span
                      className="text-textTableMarketTran"
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "transparent",
                        border: "none !important",
                        padding: 0,
                      }}
                    >
                      {dataTable?.Info[2][1]}
                    </span>
                  </span>
                </td>
                <td>
                  <span>Mở cửa</span>
                </td>
                <td>
                  <span>{dataTable.Info[22][1]}</span>
                </td>
              </tr>
              <tr className="no-border">
                <td>
                  <span>T.chiếu</span>
                </td>
                <td>
                  <span className="value-kl">
                    <span
                      className="text-textTableMarketTC"
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "transparent",
                        border: "none !important",
                        padding: 0,
                      }}
                    >
                      {dataTable.Info[1][1]}
                    </span>
                  </span>
                </td>
                <td>Cao nhất</td>
                <td>
                  <span>{dataTable.Info[23][1]}</span>
                </td>
              </tr>
              <tr className="no-border">
                <td>
                  <span>Sàn</span>
                </td>
                <td>
                  <span className="value-kl">
                    <span
                      className="text-textTableMarketSan"
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "transparent",
                        border: "none !important",
                        padding: 0,
                      }}
                    >
                      {dataTable.Info[3][1]}
                    </span>
                  </span>
                </td>
                <td>Thấp nhất</td>
                <td>
                  <span>{dataTable.Info[24][1]}</span>
                </td>
              </tr>
              <tr className="no-border">
                <td>
                  <span>NN Mua</span>
                </td>
                <td>
                  <span className="value-kl">
                    <span
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "transparent",
                        border: "none !important",
                        padding: 0,
                      }}
                    >
                      {formatNumber(dataTable.Info[26][1])}
                    </span>
                  </span>
                </td>
                <td>NN Bán</td>
                <td>
                  <span>{formatNumber(dataTable.Info[27][1])}</span>
                </td>
              </tr>
              <tr className="header">
                <td colSpan={2} className="">
                  TOP MUA
                </td>
                <td colSpan={2}>TOP BÁN</td>
              </tr>
              <tr>
                <td className="text-center">KL</td>
                <td className="text-center">Giá</td>
                <td className="text-center">Giá</td>
                <td className="text-center">KL</td>
              </tr>
              <tr className="top1">
                <td
                  className={`${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[10][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[11][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[14][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[15][1]}
                </td>
              </tr>
              <tr className="top2">
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[8][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[7][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[16][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[17][1]}
                </td>
              </tr>
              <tr className="top3">
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[6][1]}
                </td>
                <td
                  className={` ${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[5][1]}
                </td>
                <td
                  className={`${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[18][1]}
                </td>
                <td
                  className={`${setColorMarket(
                    dataTable?.Info[1][1],
                    dataTable?.Info[31][1],
                    dataTable?.Info[2][1],
                    dataTable?.Info[3][1]
                  )} text-center`}
                >
                  {dataTable?.Info[19][1]}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <FooterChart />
      </div>
      <div className="mt-menu-tab" style={{ width: "40px", float: "right" }}>
        <ul className="ul-menu-tab">
          <li title="Danh mục">
            <img
              src={ImagePriceBoard}
              height={24}
              width={24}
              alt="Tab danh mục"
            />
          </li>
          <li title="Top Mua/Bán" className="active">
            <img
              src={ImageBuySell}
              height={24}
              width={24}
              alt="Tab Top Mua/Bán"
            />
          </li>
          <li title="Khớp lệnh">
            <img
              src={ImageHandShake}
              height={24}
              width={24}
              alt="Tab Khớp lệnh"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableWithChart;
