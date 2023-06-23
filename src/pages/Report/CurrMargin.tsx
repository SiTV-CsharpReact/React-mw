import { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import LayoutPage from "../Layout/LayoutPage";
import PopupPage from "../Layout/PopupLayout";

const CurrMargin = () => {
  const [activePoupPage, setActivePopuOPage] = useState(false);
  return (
    <>
      <LayoutPage content="sô dư tiền" PageTitle="sô dư tiền">
        <div className="contentAction">
          <div className="HeaderPage">
            <div>
              <FromAction></FromAction>
            </div>
            <div className="fileExcelPDF">
              <ExcelPdfAction />
            </div>
          </div>
          <div className="ContentCurrMargin">
            <table
              id="id__curr__margin__tbl"
              style={{
                borderCollapse: "collapse",
                textAlign: "center",
                margin: "0 auto",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan={7}
                    className="dvVND"
                    style={{
                      textAlign: "right",
                      display: "none",
                      border: "1px solid #dedede",
                    }}
                  >
                    Đơn vị: VNĐ
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Số dư tiền ban đầu
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tiền cho FPTS vay
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid rgb(222, 222, 222)",
                      backgroundColor: "rgb(243, 243, 243)",
                      whiteSpace: "nowrap",
                      display: "none",
                    }}
                  >
                    Tiền ứng trước
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Sức mua bẩy từ CK còn lại
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tiền đang chuyển
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tiền đặt mua CK đang chờ khớp
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Phí chưa thanh toán
                  </th>
                  <th
                    scope="col"
                    style={{
                      border: "1px solid #dedede",
                      backgroundColor: "#f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Số dư có thể giao dịch
                  </th>
                </tr>
              </thead>
              <tbody id="curr__margin__tbl__tbody">
                <tr className="B">
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    0
                  </td>
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    0
                  </td>
                  <td
                    className="R"
                    style={{
                      border: "1px solid rgb(222, 222, 222)",
                      display: "none",
                    }}
                  >
                    0
                  </td>
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    0
                  </td>
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    0
                  </td>
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    0
                  </td>
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    {/* showChitiet */}
                    <a onClick={() => setActivePopuOPage(!activePoupPage)}>0</a>
                  </td>
                  <td className="R" style={{ border: "1px solid #dedede" }}>
                    0
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <PopupPage active={activePoupPage} Function={setActivePopuOPage}>
          <div className="dieukhoan-boxes-content">
            <div className="intro-dieukhoan-boxes">
              <span>Chi tiết  </span>
              <span id="close__Modal" className="close">
                ×
              </span>
            </div>
            <div className="dieukhoan-body-boxes">
              <table
                className="table_utct"
                cellSpacing={0}
                id="ContentPlaceHolderBody_gvwAdvance"
              >
                <thead>
                  <tr>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Loại phí</th>
                  </tr>
                </thead>
                <tbody id="right__form__CurrMargin"></tbody>
              </table>
            </div>
          </div>
        </PopupPage>
      </LayoutPage>
    </>
  );
};
export default CurrMargin;
