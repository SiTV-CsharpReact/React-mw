import React, { useState } from "react";

import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import InputDateAction from "../FromAction/InputDateAction";
import { SanGD, MaCK, TTlenh, TTXX, getDateTime } from "../helper/DateTime";

import LayoutPage from "../Layout/LayoutPage";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
let { tuNgay, denNgay } = getDateTime();
type TypeValue = {
  SanGD: any;
  MaCK: any;
  TTlenh: any;
  tuNgay: any;
  denNgay: any;
  TTXX: any;
};
const HistoryOrder = () => {
  const [data, setData] = useState<TypeValue>({
    SanGD: "",
    MaCK: "",
    TTlenh: "",
    tuNgay: "",
    denNgay: "",
    TTXX: "",
  });
  const ChangeSanGD = (e: any) => {
    setData({ ...data, SanGD: e });
  };
  const ChangeMaCK = (e: any) => {
    setData({ ...data, MaCK: e });
  };
  const ChangeTTlenh = (e: any) => {
    setData({ ...data, TTlenh: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  const ChangeTTSS = (e: any) => {
    setData({ ...data, TTXX: e });
  };
  return (
    <>
      <LayoutPage content="Lịch sử đặt lệnh" PageTitle="Lịch sử đặt lệnh">
        <div className="HeaderPage">
          <div>
            <FromAction data={data}>
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
            <tbody></tbody>
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
