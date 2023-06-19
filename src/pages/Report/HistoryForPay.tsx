import React from "react";
import LayoutPage from "../Layout/LayoutPage";

const HistoryForpay = () => {
  return (
    <>
      <LayoutPage content="Lệnh khớp chờ t.toán" PageTitle="Lệnh khớp chờ t.toán">
        <div className="contentActionGD" id="contentActionGD">
          <div className="body__contentActionGD__buy">
            <h4> LỆNH MUA CHỜ THANH TOÁN</h4>
            <table className="TablePage" id="TablePage">
              <thead>
                <tr>
                  <th className="thTable">Ngày thanh toán</th>
                  <th className="thTable">Giá trị</th>
                  <th className="thTable">Phí </th>
                  <th className="thTable">Thuế </th>
                  <th className="thTable">Số tiền thanh toán</th>
                  <th className="thTable">Chi tiết lệnh khớp</th>
                </tr>
              </thead>
            </table>
          </div>
          {/* ****************** */}
          <div className="body__contentActionGD__buy">
            <h4> LỆNH MUA CHỜ THANH TOÁN</h4>
            <table className="TablePage" id="muatt">
              <thead>
                <tr>
                  <th className="thTable">Ngày thanh toán</th>
                  <th className="thTable">Giá trị</th>
                  <th className="thTable">Phí </th>
                  <th className="thTable">Thuế </th>
                  <th className="thTable">
                    Thuế TN từ Đầu tư <br /> vốn
                  </th>
                  <th className="thTable">Số tiền thanh toán</th>
                  <th>Số tiền đã ứng trước</th>
                  <th>Tiền trả vay ký quỹ</th>
                  <th>Số tiền còn được nhận</th>
                  <th>Chi tiết lệnh khớp</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default HistoryForpay;
