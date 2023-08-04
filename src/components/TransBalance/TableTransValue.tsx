import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { formatNumber } from "../../utils/util";
import { MyContext } from "./TransBalance";

const TableTransValue: React.FC<any> = (props) => {
  const [data, setData] = useState<any>({});
  const value = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3112/Data`);
      setData(res.data.Data);
      value.setValueDNVKQAndTotalMoney({
        valueDNVKQ: res.data.Data?.RemainingDebt,
        valueTotalMoney:
          res.data.Data?.RemainingCashAmount +
          res.data.Data?.ReceivableCashT0 +
          res.data.Data?.ReceivableCashT1 +
          res.data.Data?.ReceivableCashT2 +
          res.data.Data?.ReceivableCashDevidend +
          res.data.Data?.ReceivableCashOther +
          res.data.Data?.FSaving,
      });
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 10000);
    // return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="report__tabcondition__left"
      id="asset__report__2__tbl1__tbody"
    >
      <div className="fit__table__leftBCTS">
        <table className="w-full bg-transparent">
          <tbody style={{ height: "30px" }}>
            <tr>
              <td>
                <span className="font-bold text-black text-xs">
                  Tiền có thể giao dịch
                </span>
              </td>
              <td>
                <span className="font-bold float-right text-black text-xs">
                  {formatNumber(data?.PurchasingPowerTotal)}
                </span>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr style={{ paddingTop: "10px" }}>
              <td></td>
              <td>
                <input type="button" value={"Mua"} />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Số dư tiền ban đầu
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.CashAmount)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền cho FPTS vay
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.FSaving)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền có thể ứng trước
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.AdvanceAmount)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className="report__text__profile_name__BCTH"
                  id="showNoteText5"
                  data-title="Sức mua bẩy từ chứng khoán của tài khoản MarPro  đã trừ đi Dư nợ và Lãi vay lũy kế"
                >
                  Sức mua từ CK còn lại <i className="fa fa-info-circle"></i>
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.RemainingSecurities_leveragedbuyingpower)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền treo mua chờ khớp
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.PendingBuyCash)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền treo mua đã khớp
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.MatchedBuyCash)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền đang chuyển
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.TransferringAmount)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Phí chờ thu khác
                </span>
              </td>
              <td>
                <span className="float-right">{formatNumber(data?.Fees)}</span>
              </td>
            </tr>
          </tbody>
          <tbody style={{ height: "35px" }}>
            <tr>
              <td>
                <span
                  className="font-bold"
                  id="showNoteText7"
                  data-title="Tiền mặt còn lại + Tiền bán chờ về +  Tiền cổ tức chờ về + Tiền chờ về khác"
                >
                  Tổng tiền <i className="fa fa-info-circle"></i>
                </span>
              </td>
              <td>
                <span className="font-bold float-right">
                  {formatNumber(
                    data?.RemainingCashAmount +
                      data?.ReceivableCashT0 +
                      data?.ReceivableCashT1 +
                      data?.ReceivableCashT2 +
                      data?.ReceivableCashDevidend +
                      data?.ReceivableCashOther +
                      data?.FSaving
                  )}
                </span>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <span
                  className="report__text__profile_name__BCTH"
                  id="showNoteText6"
                  data-title="Số dư tiền ban đầu – Tiền treo mua đã khớp"
                >
                  Tiền mặt còn lại <i className="fa fa-info-circle"></i>
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.RemainingCashAmount)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền gửi, tiền cho vay
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.SavingTotal)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền bán chờ về
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(
                    data?.ReceivableCashT0 +
                      data?.ReceivableCashT1 +
                      data?.ReceivableCashT2
                  )}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className="report__text__profile_name__BCTH"
                  style={{ paddingLeft: "25px" }}
                >
                  T0
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.ReceivableCashT0)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className="report__text__profile_name__BCTH"
                  style={{ paddingLeft: "25px" }}
                >
                  T1
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.ReceivableCashT1)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className="report__text__profile_name__BCTH"
                  style={{ paddingLeft: "25px" }}
                >
                  T2
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.ReceivableCashT2)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền cổ tức chờ về
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.ReceivableCashDevidend)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name__BCTH">
                  Tiền chờ về khác
                </span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(data?.ReceivableCashOther)}
                </span>
              </td>
            </tr>
          </tbody>
          <tbody style={{ height: "35px" }}>
            <tr>
              <td>
                <span className="font-bold">Dư nợ vay ký quỹ</span>
              </td>
              <td>
                <span className="font-bold float-right">
                  {formatNumber(data?.RemainingDebt)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTransValue;
