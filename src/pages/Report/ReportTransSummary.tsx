import { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import LayoutPage from "../Layout/LayoutPage";
import SelectAction from "../FromAction/SelectAction";
import FromAction from "../FromAction/FromAction";
import { DauKy, CuoiKy } from "../helper/DateTime";
type TypeValue = {
  Dauky: any;
  cuoiky: any;
};
const ReportTransSummary = () => {
  const [data, setData] = useState<TypeValue>({ Dauky: "", cuoiky: "" });
  const ChangeDauky = (e: any) => {
    setData({ ...data, Dauky: e });
  };
  const ChangeCuoiKy = (e: any) => {
    setData({ ...data, cuoiky: e });
  };
  return (
    <>
      <LayoutPage
        content="Báo cáo tổng hợp giao dịch theo mã chứng khoán"
        PageTitle="Báo cáo tổng hợp giao dịch theo mã chứng khoán"
      >
        <div className="HeaderPage">
          <div>
            <FromAction data={data}>
              <SelectAction
                Title="Đầu kỳ "
                Options={DauKy}
                ChangeFuncion={ChangeDauky}
              />
              <SelectAction
                Title="Cuối kỳ"
                Options={CuoiKy}
                ChangeFuncion={ChangeCuoiKy}
              />
            </FromAction>
          </div>
          <div className="fileExcelPDF">
            <ExcelPdfAction />
          </div>
        </div>
        <div className="contentAction">
          <div className="contentActionPading">
            {/* nội dung */}
            <div className="title_page">
              <label htmlFor="">
                <p style={{ color: "red" }}>
                  Dữ liệu cập nhật gần nhất: <span> 17:59 - 20/06/2023</span>
                </p>
              </label>
              <label htmlFor="">
                <p style={{ color: "black" }}>Đơn vị: VNĐ</p>
              </label>
            </div>
            <div className="TableSummary">
              {/* table */}
              <table
                className="tableAR"
                id="id__asset__report__BCTHTMCK__tbl"
                style={{
                  borderCollapse: "collapse",
                  textAlign: "center",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <thead className="tHead1 BgTblAR">
                  <tr>
                    <td
                      colSpan={4}
                      className="ARStockRight sorter-false"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        textAlign: "center",
                        color: "#000000",
                      }}
                    >
                      <strong style={{ textTransform: "uppercase" }}>
                        Đầu kỳ
                      </strong>
                    </td>
                    <td
                      colSpan={5}
                      className="ARStockRight text-center sorter-false"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        textAlign: "center",
                        color: "#000000",
                      }}
                    >
                      <strong style={{ textTransform: "uppercase" }}>
                        TRONG KỲ
                      </strong>
                    </td>
                    <td
                      colSpan={3}
                      className="ARStockRight text-center sorter-false"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        textAlign: "center",
                        color: "#000000",
                      }}
                    >
                      <strong style={{ textTransform: "uppercase" }}>
                        Cuối kỳ
                      </strong>
                    </td>
                    <td
                      rowSpan={2}
                      className="ARStockRight text-center sorter-false"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "8%",
                        position: "relative",
                        color: "#000000",
                      }}
                    >
                      <strong id="showNoteText11">
                        CHÊNH LỆCH
                        <i
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          style={{
                            top: 16,
                            position: "absolute",
                            fontSize: 14,
                            marginLeft: 1,
                            color: "#717171",
                          }}
                        />
                      </strong>
                    </td>
                  </tr>
                  <tr className="BgTblAR sorter-false">
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="sorter-false"
                    >
                      Mã CK
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="sorter-false"
                    >
                      Khối lượng
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "6%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="sorter-false"
                    >
                      Giá TT
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5.4%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR1 sorter-false"
                    >
                      Thành tiền
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "6.4%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR2 sorter-false"
                    >
                      Tổng KL Tăng
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "6.4%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR2 sorter-false"
                    >
                      Tổng GT Tăng
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5.8%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR3 sorter-false"
                    >
                      Tổng KL Giảm
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5.8%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR4 sorter-false"
                    >
                      Tổng GT Giảm
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "6.8%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR8 sorter-false"
                    >
                      Cổ tức bằng tiền
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5.8%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR8 sorter-false"
                    >
                      Khối lượng
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5.8%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR8 sorter-false"
                    >
                      Giá TT
                    </td>
                    <td
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                        width: "5.8%",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                      className="tdRowSpanR8 sorter-false"
                    >
                      Thành tiền
                    </td>
                  </tr>
                </thead>
                <tbody id="asset__report__2__tbl1__tbody">
                  <tr
                    className="trTotal bgtblBCTHMCK"
                    style={{ backgroundColor: "#ececec" }}
                  >
                    <td
                      className=""
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ececec",
                      }}
                      colSpan={3}
                    >
                      <span className="trStrTotal">TỔNG</span>
                    </td>
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: 700,
                        backgroundColor: "#ececec",
                      }}
                    >
                      0
                    </td>
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                      }}
                    />
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: 700,
                        backgroundColor: "#ececec",
                      }}
                    >
                      0
                    </td>
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                      }}
                    />
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: 700,
                        backgroundColor: "#ececec",
                      }}
                    >
                      0
                    </td>
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: 700,
                        backgroundColor: "#ececec",
                      }}
                    >
                      0
                    </td>
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                      }}
                    />
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#ececec",
                      }}
                    />
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: 700,
                        backgroundColor: "#ececec",
                      }}
                    >
                      0
                    </td>
                    <td
                      className="R"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: 700,
                        color: "#000",
                        backgroundColor: "#ececec",
                      }}
                    >
                      0
                    </td>
                  </tr>
                </tbody>
                <tfoot id="transSum__report__2__tbl2__tbody"></tfoot>
              </table>
            </div>
            <div id="divTextNote">
              <b>Ghi chú:</b>
              <ul style={{ padding: 0 }}>
                <li>
                  - Báo cáo chỉ mang tính chất tham khảo, không có ý nghĩa quyết
                  định đầu tư và được tính toán theo phương pháp của FPTS (Quý
                  khách tham khảo cách tính của FPTS
                  <a
                    href="/report/upload/CongThucTinhToanBCTS.pdf"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "#0070c0" }}
                  >
                    tại đây
                  </a>
                  )
                </li>
                <li>
                  - Tổng KL tăng, GT tăng trong kỳ đã bao gồm cả giao dịch Mua,
                  Cổ tức bằng cổ phiếu, Thực hiện quyền Mua, Lưu ký, Nhận chuyển
                  khoản chứng khoán.
                </li>
                <li>
                  - Tổng KL giảm, GT giảm trong kỳ đã bao gồm cả giao dịch Bán,
                  Rút lưu ký, Chuyển khoản chứng khoán đi, Đáo hạn chứng quyền.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default ReportTransSummary;
