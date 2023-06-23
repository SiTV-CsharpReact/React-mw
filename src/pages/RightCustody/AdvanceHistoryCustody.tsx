import LayoutPage from "../Layout/LayoutPage";
import FromAction from "../FromAction/FromAction";
import InputDateAction from "../FromAction/InputDateAction";
import React, { useState } from "react";
import { getDateTime } from "../helper/DateTime";
import InputAction from "../FromAction/InputAction";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
type TypeValue = {
  Sohopdong: any;
  tuNgay: any;
  denNgay: any;
};
const AdvanceHistoryCustody = () => {
  let { tuNgay, denNgay } = getDateTime();
  const [data, setData] = useState<TypeValue>({
    tuNgay: "",
    denNgay: "",
    Sohopdong: "",
  });
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  const SoHopDong = (e: any) => {
    setData({ ...data, Sohopdong: e });
  };
  return (
    <LayoutPage
      content="Lịch sử ứng trước tiền cổ tức "
      Icon={true}
      LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/ung-truoc-tien-truc-tuyen/"
      Title="Hướng dẫn sử dụng EzAdvance"
      PageTitle="Lịch sử ứng trước tiền cổ tức "
    >
      <div>
        <div className="HeaderPage">
          <div>
            <FromAction data={data}>
              <label htmlFor=""> Ngày hợp đồng</label>
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
              <InputAction Title="Số hợp đồng " ChangeFuncion={SoHopDong} />
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
                <th scope="col">Ngày hợp đồng</th>
                <th scope="col">Số hợp đồng</th>
                <th scope="col">Số tiền ứng trước</th>
                <th scope="col">Phí ứng trước </th>
                <th scope="col">Số tiền nhận được</th>
                <th scope="col">Mã quyền</th>
                <th scope="col">Kênh ứng trước</th>
                <th scope="col">Trạng thái</th>
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
      </div>
    </LayoutPage>
  );
};
export default AdvanceHistoryCustody;
