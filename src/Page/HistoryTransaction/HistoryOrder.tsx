import React, { useState } from "react";
import TitlePage from "../helper/TitlePage";
import FromAction from "../FromAction/FromAction";
import SelectFrom from "../FromAction/SelectAction";
import InputAction from "../FromAction/InputAction";
import { SanGD, MaCK, TTlenh, TTXX, getDateTime } from "../helper/DateTime";
import Footer from "../helper/FooterPage";
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
    setData({...data,SanGD:e })
  };
  const ChangeMaCK = (e: any) => {
    setData({...data,MaCK:e })
  };
  const ChangeTTlenh = (e: any) => {
    setData({...data,TTlenh:e })
  };
  const ChangeTuNgay = (e: any) => {
    setData({...data,tuNgay:e })
  };
  const ChangeDenNgay = (e: any) => {
    setData({...data,denNgay:e })
  };
  const ChangeTTSS = (e: any) => {
    setData({...data,TTXX:e })
  };
  return (
    <>
      <div>
        <TitlePage content="Lịch sử đặt lệnh" />
      </div>
      <div>
        <FromAction data={data}>
          <SelectFrom
            Title="Sàn GD"
            Options={SanGD}
            ChangeFuncion={ChangeSanGD}
          />
          <SelectFrom Title="Mã CK" Options={MaCK} ChangeFuncion={ChangeMaCK} />
          <SelectFrom
            Title="Tình trạng lệnh"
            Options={TTlenh}
            ChangeFuncion={ChangeTTlenh}
          />
          <InputAction Title="Từ Ngày" date={tuNgay} ChangeFuncion={ChangeTuNgay}/>
          <InputAction Title="Đến Ngày" date={denNgay} ChangeFuncion={ChangeDenNgay} />
          <SelectFrom
            Title="T.tự sắp xếp"
            Options={TTXX}
            ChangeFuncion={ChangeTTSS}
          />
        </FromAction>
      </div>
      <div className="content">
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
          Báo cáo chỉ hiển thị dữ liệu của 180 ngày gần nhất. Nếu Khách hàng có
          nhu cầu xem chi tiết các giao dịch trước đó, vui lòng liên hệ FPTS để
          được cung cấp.
        </p>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};
export default HistoryOrder;
