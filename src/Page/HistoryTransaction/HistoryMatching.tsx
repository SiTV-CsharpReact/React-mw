import React, { useState } from "react";
import TitlePage from "../helper/TitlePage";
import FromAction from "../FromAction/FromAction";
import SelectFrom from "../FromAction/SelectAction";
import InputAction from "../FromAction/InputAction";
import { SanGD, MaCK, TTlenh, TTXX, getDateTime } from "../helper/DateTime";
import Footer from "../helper/FooterPage";
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
    denNgay: ""
  });
  const ChangeLoaiLenh = (e:any) => {
    setData({...data,LoaiLenh:e} )
  };
  const ChangeMaCK = (e:any) => {
    setData({...data,MaCK:e} )
  };
  const ChangeTuNgay = (e: any) => {
    setData({...data,tuNgay:e })
  };
  const ChangeDenNgay = (e: any) => {
    setData({...data,denNgay:e })
  };
  return (
    <>
      <div>
        <TitlePage content="Lịch sử khớp lệnh" />
      </div>
      <div>
        <FromAction data={data}>
          <SelectFrom
            Title="Loại Lệnh"
            Options={SanGD}
            ChangeFuncion={ChangeLoaiLenh}
          />
          <SelectFrom Title="Mã CK" Options={MaCK} ChangeFuncion={ChangeMaCK} />
          <InputAction
            Title="Từ Ngày"
            date={tuNgay}
            ChangeFuncion={ChangeTuNgay}
          />
          <InputAction
            Title="Đến Ngày"
            date={denNgay}
            ChangeFuncion={ChangeDenNgay}
          />
        </FromAction>
      </div>
      <div className="content">
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
export default HistoryMatching;
