import React, { useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import FromAction from "../FromAction/FromAction";
import InputDateAction from "../FromAction/InputDateAction";
import { getDateTime } from "../helper/DateTime";
import { Link } from "react-router-dom";
type TypeValue = {
  SanGD: any;
  MaCK: any;
  TTlenh: any;
  tuNgay: any;
  denNgay: any;
  TTXX: any;
};
const OverViewCustody = () => {
  const [data, setData] = useState<TypeValue>({
    SanGD: "",
    MaCK: "",
    TTlenh: "",
    tuNgay: "",
    denNgay: "",
    TTXX: "",
  });
  let { tuNgay, denNgay } = getDateTime();
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  return (
    <>
      <LayoutPage
        PageTitle="Thực hiện quyền"
        Icon={true}
        content="Thực hiện quyền"
        TitleHover="Hướng dẫn sử dụng EzRightsExercise"
        LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/thuc-hien-quyen/"
      >
        <div>
          <FromAction data={data}>
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
        <div className="contentActionGD">
          <div className="contentActionPading">
          <div className="table1">
            <label htmlFor="" className="TitleTable">
              
              Quyền tiền và quyền cổ phiếu
            </label>
            <label htmlFor="" className="TitleTable">
                <Link to="/rightscustody/AdvanceOrderForm" className="Linkassss"> <span> Ứng trước quyền nhận cổ tức bằng tiền</span></Link>

            </label>
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
          </div>
          <div className="table2">
            <label htmlFor="" className="TitleTable">
              Quyền mua
            </label>
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
          </div>
          <div className="table3">
            <label htmlFor="" className="TitleTable">
              Quyền bỏ phiếu
            </label>
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
          </div>
          <p> Báo cáo này thể hiện lịch sử quyền đã phân bổ từ ngày 05/01/2018 trở về sau. Để tra cứu dữ liệu lịch sử các quyền đã phân bổ trước 05/01/2018, quý khách vui lòng liên hệ FPTS.</p>
        </div>
        </div>
      </LayoutPage>
    </>
  );
};

export default OverViewCustody;
