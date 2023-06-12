import React, { useEffect, useState } from "react";
import { Data } from "../config/interface.config";
import { useAppSelector } from "../../../store/configureStore";
import axios from "axios";
import { formatNumber } from "../../../utils/util";
import FooterChart from "../../footerMarketwatch/FooterChart";

const TableTabWithBuySell = () => {
  const stockCode = useAppSelector((state) => state.chart.code);
  const symbolNew = stockCode === "" ? "FTS" : stockCode;
  const [dataChart, setDataChart] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Data[]>(
        `http://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${symbolNew}`
      );
      setDataChart(response.data);
    };
    fetchData();
  }, [stockCode, symbolNew]);
  return (
    <>
      <table className="no-index">
      {dataChart && dataChart.map((dataTable, index) => (
        <tbody key={index}>
          <tr className="no-border">
            <td colSpan={4} className="h-40">
              <span className="text-xl">{dataTable.Info[0][1]}</span>
              <span className="text-xl">
                <span className="px-1"></span>
                {dataTable.Info[11][1]}
              </span>
              <span className="px-1">0.45</span>
              <span>(1.6%)</span>
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
                  {formatNumber(dataTable.Info[21][1])}
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
                  {dataTable.Info[2][1]}
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="top2">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="top3">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      ))}
    </table>
    <FooterChart />
    </>
  
    
  );
};

export default TableTabWithBuySell;
