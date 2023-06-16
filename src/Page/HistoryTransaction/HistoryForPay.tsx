import React from "react";
import TitlePage from "../helper/TitlePage";
import Footer from "../helper/FooterPage";

const HistoryForpay = () => {
  return (
    <>
      <div>
        <TitlePage content="Lệnh khớp chờ t.toán" />
      </div>

      <div className="content" id="content">
        <div className="body__content__buy">
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
        <div className="body__content__buy">
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

      <div>
        <Footer />
      </div>
    </>
  );
};
export default HistoryForpay;
