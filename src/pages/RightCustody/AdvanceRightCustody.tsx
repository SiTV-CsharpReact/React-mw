import { useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import FromAction from "../FromAction/FromAction";

const AdvanceRightCustody = () => {
  const [data, setData] = useState(null);
  return (
    <LayoutPage
      content="Ứng trước tiền cổ tức "
      Icon={true}
      LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/ung-truoc-tien-truc-tuyen/"
      TitleHover="Hướng dẫn sử dụng EzAdvance"
     PageTitle = "Ứng trước tiền cổ tức "
    >
      <div>
        <div>
          <FromAction data={data}></FromAction>
        </div>
        <div className="contentActionGD">
          <table className="TablePage">
          <thead>
                    <tr>
                        <th scope="col">Mã quyền</th>
                        <th scope="col">Ngày <br/>(dự kiến)<br/>phân bổ</th>
                        <th scope="col">Quyền được nhận <br/>(đã trừ Thuế TNCN)</th>
                        <th scope="col">Số tiền đã<br/>ứng trước</th>
                        <th scope="col">Số tiền ƯT<br/>đang chờ xử lý</th>
                        <th scope="col">Số tiền có thể<br/>ƯT tối đa</th>
                        <th scope="col">Số tiền có thể <br/>được nhận tối đa</th>
                        <th scope="col">Số tiền yêu cầu<br/>ứng trước </th>
                        <th scope="col">Phí ứng trước </th>
                        <th scope="col">Số tiền <br/>được nhận</th>
                        <th scope="col">Số ngày <br/>ứng trước</th>
                        <th className="Hide" hidden scope="col">Hidden</th>
                    </tr>
                </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </LayoutPage>
  );
};
export default AdvanceRightCustody;
