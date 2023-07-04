import React, { useEffect, useState } from "react";

import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import InputDateAction from "../FromAction/InputDateAction";
import { SanGD, MaCK, TTlenh, TTXX, getDateTime } from "../helper/DateTime";

import LayoutPage from "../Layout/LayoutPage";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import { getDataHisOrder } from "./ResportSlice";
import { RootState, useAppDispatch } from "../../store/configureStore";
import { useSelector } from "react-redux";
let { tuNgay, denNgay } = getDateTime();
type TypeValueType = {
  BuySell: any;
  Exchange: any;
  FromDate: any;
  OrderStatus: any;
  StockCode: any;
  ToDate: any;
};
const HistoryOrder = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<TypeValueType>({
    BuySell: "",
    Exchange: "",
    FromDate : tuNgay,
    OrderStatus: "",
    StockCode: "",
    ToDate: denNgay,

  });
  const ChangeSanGD = (e: any) => {
    setData({ ...data, Exchange: e });
  };
  const ChangeMaCK = (e: any) => {
    setData({ ...data, StockCode: e });
  };
  const ChangeTTlenh = (e: any) => {
    setData({ ...data, OrderStatus: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, FromDate: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, ToDate: e });
  };
  const ChangeTTSS = (e: any) => {
    setData({ ...data, BuySell: e });
  };
const AddSummit = (e :TypeValueType)=>{
  console.log("e",e) // cập nhật 
}

  useEffect(() => {
    dispatch(getDataHisOrder());
  }, [dispatch]);
  const { dataHisOrder } = useSelector((state: RootState) => state.report);
  return (
    <>
      <LayoutPage content="Lịch sử đặt lệnh" PageTitle="Lịch sử đặt lệnh">
        <div className="HeaderPage">
          <div>
            <FromAction data={data} ChangeFuncion={AddSummit} >
              <SelectAction
                Title="Sàn GD"
                Options={SanGD}
                ChangeFuncion={ChangeSanGD}
              />
              <SelectAction
                Title="Mã CK"
                Options={MaCK}
                ChangeFuncion={ChangeMaCK}
              />
              <SelectAction
                Title="Tình trạng lệnh"
                Options={TTlenh}
                ChangeFuncion={ChangeTTlenh}
              />
              <InputDateAction
                Title="Từ Ngày"
                date={tuNgay}
                ChangeFuncion={ChangeTuNgay}
              />
              <InputDateAction
                Title="Đến Ngày"
                date={denNgay}
                ChangeFuncion={ChangeDenNgay}
              />
              <SelectAction
                Title="T.tự sắp xếp"
                Options={TTXX}
                ChangeFuncion={ChangeTTSS}
              />
            </FromAction>
          </div>
          <div className="fileExcelPDF">
            <ExcelPdfAction />
          </div>
        </div>

        <div className="contentActionGD">
          <table className="TablePage">
            <thead>
              <tr>
                <th> Thời gian</th>
                <th>Mã CK</th>
                <th>Loại GD</th>
                <th>M/B</th>
                <th>Loại lệnh</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Sàn GD</th>
                <th>Tình trạng</th>
                <th>P.thức đặt lệnh</th>
                <th>SHL</th>
                <th>Thông báo</th>
              </tr>
            </thead>
            <tbody>
              {dataHisOrder
                ? dataHisOrder.map((element: any, index: number) => {
                    return (
                      <tr>
                        <td>
                          {" "}
                          {(element?.ABACKUPDATE)?.replace(
                            /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
                            "$3/$2/$1 $4:$5:$6"
                          )}
                        </td>
                        <td> {element?.ASTOCKCODE}</td>
                        <td>
                          {" "}
                          {element?.APRODUCTTYPE === "CASH"
                            ? "Lệnh thường"
                            : ""}
                        </td>
                        <td> {element?.ABUYSELL === "B" ? "Bán" : "Mua"}</td>
                        <td> {element?.AORDERTYPE_VN}</td>
                        <td> {element?.AQUANTITY}</td>
                        <td> {element?.APRICE}</td>
                        <td> {element?.AEXCHANGE}</td>
                        <td> {element?.AORDERSTATUS_VN}</td>
                        <td> {element?.ATRADINGACCOUNT}</td>
                        <td> {element?.ATRANID}</td>
                        <td> {element?.AMESSAGE_VN}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
          <p>
            Báo cáo chỉ hiển thị dữ liệu của 180 ngày gần nhất. Nếu Khách hàng
            có nhu cầu xem chi tiết các giao dịch trước đó, vui lòng liên hệ
            FPTS để được cung cấp.
          </p>
        </div>
      </LayoutPage>
    </>
  );
};
export default HistoryOrder;
