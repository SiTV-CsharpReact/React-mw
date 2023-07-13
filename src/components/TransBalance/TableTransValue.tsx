import React from "react";

const TableTransValue = () => {
  return (
    <div
      className="report__tabcondition__left"
      id="asset__report__2__tbl1__tbody"
    >
      <div className="fit__table__leftBCTS">
        <table className="w-full bg-transparent">
          <tbody style={{ height: "30px" }}>
            <tr>
              <td>
                <span className="font-bold text-black text-xs">
                  Tiền có thể giao dịch
                </span>
              </td>
              <td>
                <span className="font-bold float-right text-black text-xs">
                  {" "}
                  10,149,604,638
                </span>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr style={{ paddingTop: "10px" }}>
              <td></td>
              <td>
                <input type="button" value={"Mua"} />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Số dư tiền ban đầu</span></td>
              <td><span className="float-right">10,065,172,981</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền cho FPTS vay</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền có thể ứng trước</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Sức mua từ CK còn lại{" "}
                <i className="fa fa-info-circle"></i>
              </span></td>
              <td><span className="float-right">83,432,625</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền treo mua chờ khớp </span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền treo mua đã khớp</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền đang chuyển</span></td>
              <td><span className="float-right">-1,000,000</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Phí chờ thu khác</span></td>
              <td><span className="float-right">968</span></td>
            </tr>
          </tbody>
          <tbody style={{height:'30px'}}>
            <tr>
              <td><span className="font-bold">Tổng tiền{" "}
                <i className="fa fa-info-circle"></i>
              </span></td>
              <td><span className="font-bold">10,067,572,981</span></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền mặt còn lại{" "}
                <i className="fa fa-info-circle"></i>
              </span></td>
              <td><span className="float-right">10,065,172,981</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền gửi, tiền cho vay</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền bán chờ về</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH" style={{paddingLeft:'25px'}}>T0</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH" style={{paddingLeft:'25px'}}>T1</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH" style={{paddingLeft:'25px'}}>T2</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền cổ tức chờ về</span></td>
              <td><span className="float-right">2,400,000</span></td>
            </tr>
            <tr>
              <td><span className="report__text__profile_name__BCTH">Tiền chờ về khác</span></td>
              <td><span className="float-right">0</span></td>
            </tr>
          </tbody>
          <tbody style={{height:'30px'}}>
            <tr>
              <td><span className="font-bold">Dư nợ vay ký quỹ</span></td>
              <td><span className="font-bold">0</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTransValue;
