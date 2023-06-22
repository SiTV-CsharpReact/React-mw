import React, { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import InputDateAction from "../FromAction/InputDateAction";
import LayoutPage from "../Layout/LayoutPage";
import { getDateTime } from "../helper/DateTime";

type ValueData = {
  tuNgay: any;
  denNgay: any;
};
const StockSettlement = () => {
  const { tuNgay, denNgay } = getDateTime();
  const [data, setdata] = useState<ValueData>({ tuNgay: "", denNgay: "" });
  const ChangeTuNgay = (e: any) => {
    setdata({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setdata({ ...data, denNgay: e });
  };
  return (
    <>
      <LayoutPage content="Sao kê chứng  khoán" PageTitle="Sao kê chứng  khoán">
        <div className="contentAction">
          <div className="HeaderPage">
            <div>
              <FromAction data={data}>
                <InputDateAction
                  Title="Từ ngày "
                  date={tuNgay}
                  ChangeFuncion={ChangeTuNgay}
                />
                <InputDateAction
                  Title="Đến ngày "
                  date={denNgay}
                  ChangeFuncion={ChangeDenNgay}
                />
              </FromAction>
            </div>
            <div className="fileExcelPDF">
              <ExcelPdfAction />
            </div>
          </div>
          <div className="contentSetlement">
            <div className="stock__settlement__tbl">
              <table
                id="id__stock__settlement__tbl"
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
                      className="thRowSpanR1"
                      style={{
                        border: "1px solid #dedede",
                        borderBottom: "none",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ position: "relative", top: 10 }}>
                        Ngày
                      </span>
                    </th>
                    <th
                      className="thRowSpanR2"
                      style={{
                        border: "1px solid #dedede",
                        borderBottom: "none",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ position: "relative", top: 10 }}>
                        Tăng/Giảm
                      </span>
                    </th>
                    <th
                      className="thRowSpanR3"
                      style={{
                        border: "1px solid #dedede",
                        borderBottom: "none",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ position: "relative", top: 10 }}>
                        Mã CK
                      </span>
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                      colSpan={5}
                    >
                      Loại CK
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                      rowSpan={2}
                    >
                      Nội dung phát sinh
                    </th>
                  </tr>
                  <tr>
                    <th
                      style={{
                        border: "none",
                        borderRight: "1px solid #dedede",
                        borderLeft: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    />
                    <th
                      style={{
                        border: "none",
                        borderRight: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    />
                    <th
                      style={{
                        border: "none",
                        borderRight: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    />
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Thông thường
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Hạn chế
                      <br /> GD
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Cầm cố <br />
                      NH
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Cầm cố FPTS
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Ký quỹ
                    </th>
                  </tr>
                </thead>
                <tbody id="stock__settlement__tbl__tbody"></tbody>
              </table>
            </div>
            <p
              className="L"
              style={{
                float: "left",
                marginTop: "10pt",
                marginLeft: "4pt",
                width: 1000,
              }}
            >
              <span style={{ fontFamily: "Arial", fontSize: "10pt" }}>
                Báo cáo chỉ hiển thị dữ liệu của 180 ngày gần nhất. Nếu Khách
                hàng có nhu cầu xem chi tiết các giao dịch trước đó, vui lòng
                liên hệ FPTS để được cung cấp.
              </span>
            </p>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default StockSettlement;
