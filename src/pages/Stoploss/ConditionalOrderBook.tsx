import React, { useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import FromAction from "../FromAction/FromAction";
import InputAction from "../FromAction/InputAction";
import InputDateAction from "../FromAction/InputDateAction";
import SelectAction from "../FromAction/SelectAction";
import { TinhTranglenh, getDateTime } from "../helper/DateTime";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
type TypeValue = {
  SanGD: any;
  MaCK: any;
  TTlenh: any;
  tuNgay: any;
  denNgay: any;
  TTXX: any;
};
const ConditionalOrderBook = () => {
  const [data, setData] = useState<TypeValue>({
    SanGD: "",
    MaCK: "",
    TTlenh: "",
    tuNgay: "",
    denNgay: "",
    TTXX: "",
  });
  let { tuNgay, denNgay } = getDateTime();
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
      <LayoutPage
        Icon={true}
        PageTitle="Sổ lệnh điều kiện"
        content="Sổ lệnh điều kiện"
        TitleHover="Hướng dẫn sử dụng EzStoploss"
        LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/"
      >
        <div className="HeaderPage">
          <div>
            <FromAction data={data}>
              <InputAction Title="Mã CK" ChangeFuncion={ChangeMaCK} />
              <InputDateAction
                Title="Từ Ngày "
                ChangeFuncion={ChangeTuNgay}
                date={tuNgay}
              />
              <InputDateAction
                Title="Đến Ngày"
                ChangeFuncion={ChangeDenNgay}
                date={denNgay}
              />
              <SelectAction
                Title="Tình trạng lệnh "
                Options={TinhTranglenh}
                ChangeFuncion={ChangeTTlenh}
              />
            </FromAction>
          </div>
          <div className="fileExcelPDF">
            <ExcelPdfAction />
          </div>
        </div>
        <div className="contentActionGD">
          <div className="contentActionPading">
            <table className="TablePage">
              <thead>
                <tr>
                  <th>Mua/Bán</th>
                  <th>Loại ký quỹ</th>
                  <th>Số hợp đồng</th>
                  <th>Mã</th>
                  <th>Khối lượng</th>
                  <th>Giá đặt</th>
                  <th>
                    ĐK kích hoạt:
                    <br />
                    Khi giá khớp gần nhất
                  </th>
                  <th>Ngày đặt</th>
                  <th>Ngày kích hoạt</th>
                  <th>Tình trạng</th>
                  <th>Thông báo</th>
                  <th>
                    Chi tiết lệnh <br /> đã kích hoạt
                  </th>
                  <th>Lịch THQ</th>
                  <th>Hủy</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <p>
              {" "}
              Báo cáo chỉ hiển thị dữ liệu của 90 ngày gần nhất. Nếu Khách hàng
              có nhu cầu xem chi tiết các giao dịch trước đó, vui lòng liên hệ
              FPTS để được cung cấp.
            </p>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};

export default ConditionalOrderBook;
