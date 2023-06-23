import React, { useState } from "react";

import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import InputDateAction from "../FromAction/InputDateAction";
import { SanGD, MaCK, TTlenh, TTXX, getDateTime } from "../helper/DateTime";

import LayoutPage from "../Layout/LayoutPage";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
let { tuNgay, denNgay } = getDateTime();
type TypeValue = {
  LoaiLenh: any;
  MaCK: any;
  tuNgay: any;
  denNgay: any;
};
const HistoryMatching = () => {
  const [data, setData] = useState<TypeValue>({
    LoaiLenh: "",
    MaCK: "",
    tuNgay: "",
    denNgay: "",
  });
  const ChangeLoaiLenh = (e: any) => {
    setData({ ...data, LoaiLenh: e });
  };
  const ChangeMaCK = (e: any) => {
    setData({ ...data, MaCK: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  return (
    <>
      <LayoutPage content="Lịch sử khớp lệnh" PageTitle="Lịch sử khớp lệnh">
      <div className="HeaderPage">
        <div>
          <FromAction data={data}>
            <SelectAction
              Title="Loại Lệnh"
              Options={SanGD}
              ChangeFuncion={ChangeLoaiLenh}
            />
            <SelectAction
              Title="Mã CK"
              Options={MaCK}
              ChangeFuncion={ChangeMaCK}
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
                <th>Ngày</th>
                <th>Mua/Bán</th>
                <th>
                  CK
                  <i
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    title="Bấm vào từng dòng để xem chi tiết lệnh khớp – Bấm vào cả dòng mã đều xổ ra chi tiết"
                  ></i>
                </th>
                <th>KL Khớp</th>
                <th>Giá khớp</th>
                <th>Giá trị</th>
                <th>
                  Thuế TN từ Chuyển <br /> nhượng chứng khoán
                </th>
                <th>
                  Thuế TN từ Đầu tư <br /> vốn
                </th>
                <th>Phí </th>
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
export default HistoryMatching;
