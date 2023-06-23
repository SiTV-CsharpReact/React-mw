import { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import LayoutPage from "../Layout/LayoutPage";
import { DauKy, CuoiKy } from "../helper/DateTime";
type TypeValue = {
  Dauky: any;
  cuoiky: any;
};
const ReportNAV = () => {
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
        content="Báo cáo biến động tài sản ròng"
        PageTitle="Báo cáo biến động tài sản ròng"
      >
        <div className="contentAction">
          <div className="contentNAV">
            <div className="headerNAV">
              <div className="titleNAV_text">
                <p>
                  Dữ liệu cập nhật gần nhất: <span> 17:59 - 20/06/2023</span>
                </p>
              </div>
              <div className="fromNAV">
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
              </div>
            </div>
            {/* A. Tài sản ròng - NAV (I + II + III)Đơn vị: VNĐ */}
            <div className="taisanRong">
              <div className="title_page">
                <label htmlFor="" >
                  <h1> A. Tài sản ròng - NAV (I + II + III)</h1>
                </label>
                <label htmlFor="">
                  <span>Đơn vị: VNĐ</span>
                </label>
              </div>
              <div className="Table_taisanRong">
                <table
                  className="tableAR"
                  id="id__asset__report__BCTS__tbl"
                  style={{
                    borderCollapse: "collapse",
                    textAlign: "center",
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <thead
                    className=""
                    style={{ backgroundColor: "#e7e6e6 !important" }}
                  >
                    <tr
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#ececec !important",
                      }}
                    >
                      <td
                        style={{
                          border: "1px solid #dedede",
                          width: "35%",
                          color: "#fff",
                        }}
                      ></td>
                      <td
                        style={{
                          border: "1px solid #dedede",
                          width: "10%",
                          color: "#000",
                        }}
                      >
                        <span
                          className="f_12_BCTS"
                          style={{ color: "#000", cursor: "pointer" }}
                          id="showBCBDTSDK"
                        >
                          Đầu kỳ
                          <svg
                            style={{
                              color: "#717171",
                            }}
                            width={18}
                            height={18}
                            fill="currentColor"
                            className="bi bi-box-arrow-up-right  iconExit"
                            viewBox="0 0 18 18"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                            />
                          </svg>
                        </span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #dedede",
                          width: "10%",
                          color: "#000",
                          padding: "5px",
                        }}
                      >
                        <span
                          className="f_12_BCTS"
                          style={{ color: "#000", cursor: "pointer" }}
                          id="showBCBDTSCK"
                        >
                          Cuối kỳ
                          <svg
                            style={{
                              color: "#717171",
                            }}
                            width={18}
                            height={18}
                            fill="currentColor"
                            className="bi bi-box-arrow-up-right  iconExit"
                            viewBox="0 0 18 18"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                            />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  </thead>
                  <tbody id="asset__report__2__tbl1__tbody__TSR">
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ffffff ",
                      }}
                      id="detailBCLLMaCk"
                      className="fst-italic"
                    >
                      <td
                        className="color_textBCTS"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 14,
                          fontStyle: "italic",
                        }}
                      >
                        I. Tiền
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdCash_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdCash_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px",
                        }}
                      >
                        Tiền trong tài khoản
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTTTK_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTTTK_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px",
                        }}
                      >
                        Tiền bán chờ về
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTBCV_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTBCV_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px",
                        }}
                      >
                        Cổ tức bằng tiền chờ về
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdCTBTCV_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdCTBTCV_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px",
                        }}
                      >
                        Tiền chờ về khác
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTCVK_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTCVK_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px",
                        }}
                      >
                        Tiền gửi, tiền cho vay
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTCFV_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdTCFV_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: 700,
                        position: "relative",
                        backgroundColor: "#ffffff !important",
                      }}
                      className="fst-italic"
                    >
                      <td
                        className="color_textBCTS"
                        id="showNoteText2"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 14,
                          fontStyle: "italic",
                        }}
                      >
                        II. Chứng khoán
                        <i
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          style={{ color: "#717171" }}
                        />
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdStock_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdStock_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ffffff !important",
                      }}
                      className="fst-italic"
                    >
                      <td
                        className="color_textBCTS"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 14,
                          fontStyle: "italic",
                        }}
                      >
                        III. Dư nợ vay ký quỹ
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdDNKQ_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdDNKQ_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ececec",
                      }}
                    >
                      <td
                        className="rowAR f_12_BCTS"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#000000",
                        }}
                      >
                        TỔNG
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          color: "#000",
                        }}
                        id="tdNAV_B"
                      >
                        0
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          color: "#000",
                        }}
                        id="tdNAV_E"
                      >
                        0
                      </td>
                    </tr>
                  </tbody>
                  <tbody style={{ display: "block", height: 10 }}></tbody>
                  <tbody style={{ display: "block", height: 23 }}>
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ffffff ",
                      }}
                    >
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          border: "none",
                          padding: "0px ",
                        }}
                      >
                        <span className="color_textBCTS">
                          B. Phát sinh ròng làm thay đổi vốn ban đầu (I + II)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody
                    id="asset__report__2__tbl1__tbody__PSR"
                    style={{ marginTop: 50 }}
                  >
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ececec ",
                      }}
                      id="detailBCLLMaCk"
                    >
                      <td
                        className=""
                        colSpan={2}
                        style={{ border: "1px solid #dedede" }}
                      />
                      <td
                        className="rowAR f_12_BCTS"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                      >
                        Giá trị
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ffffff !important",
                      }}
                      id="detailBCLLMaCk"
                      className="fst-italic"
                    >
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 14,
                          color: "#000",
                          fontStyle: "italic",
                        }}
                      >
                        <span
                          className="color_textBCTS "
                          style={{ cursor: "pointer" }}
                          id="showPST"
                        >
                          I. Phát sinh tiền
                          <svg
                            style={{ color: "#717171", marginBottom: "-1px" }}
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-box-arrow-up-right iconExit"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                            />
                          </svg>
                        </span>
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdPST_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px ",
                        }}
                      >
                        Phát sinh tăng
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdPST_T_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px",
                        }}
                      >
                        Phát sinh giảm
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdPST_G_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ffffff !important",
                      }}
                      id="detailBCLLMaCk"
                      className="fst-italic"
                    >
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 14,
                          fontStyle: "italic",
                        }}
                      >
                        <span
                          className="color_textBCTS"
                          style={{ cursor: "pointer" }}
                          id="showPSCK"
                        >
                          II. Phát sinh chứng khoán
                          <svg
                            style={{ color: "#717171", marginBottom: "-1px" }}
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-box-arrow-up-right iconExit"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                            />
                          </svg>
                        </span>
                      </td>
                      <td
                        className="rowAR"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          fontStyle: "italic",
                        }}
                        id="tdPSCK_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px ",
                        }}
                      >
                        Phát sinh tăng
                      </td>
                      <td
                        className="rowAR"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdPSCK_T_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=""
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#000",
                          paddingLeft: "20px ",
                        }}
                      >
                        Phát sinh giảm
                      </td>
                      <td
                        className="rowAR"
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                        }}
                        id="tdPSCK_G_E"
                      >
                        0
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontWeight: 700,
                        backgroundColor: "#ececec ",
                      }}
                    >
                      <td
                        className="rowAR f_12_BCTS"
                        colSpan={2}
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#000000",
                        }}
                      >
                        TỔNG
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          border: "1px solid #dedede",
                          textAlign: "right",
                          color: "#000",
                        }}
                        id="tdPSVR_E"
                      >
                        0
                      </td>
                    </tr>
                  </tbody>
                  <tbody style={{ display: "block", height: 15 }}></tbody>
                  <tbody id="asset__report__2__tbl1__tbody__BDNAV">
                    <tr style={{ fontWeight: 700, position: "relative" }}>
                      <td
                        className="rowAR color_textBCTS"
                        id="showNoteText3"
                        colSpan={2}
                        style={{
                          border: "none",
                          padding: "0px !important",
                          textAlign: "left",
                          fontWeight: 700,
                          width: "70%",
                          fontSize: 16,
                        }}
                      >
                        C. Biến động NAV
                        <i
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          style={{ color: "#717171" }}
                        />
                      </td>
                      <td
                        className="rowAR "
                        style={{
                          textAlign: "right",
                          border: "none",
                          paddingRight: "0px !important",
                        }}
                        id="tdBDCV_E"
                      >
                        0
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div id="divTextNote" style={{ padding: 0  ,marginBottom: "10px"}}>
                  <b>Ghi chú:</b>
                  <ul style={{ padding: 0, textDecoration: "none" }}>
                    <li>
                      1. Báo cáo chỉ mang tính chất tham khảo, không có ý nghĩa
                      quyết định đầu tư và được tính toán theo phương pháp của
                      FPTS. Quý khách tham khảo cách tính của FPTS
                      <a
                        href="/report/upload/CongThucTinhToanBCTS.pdf"
                        target="_blank"
                        style={{ textDecoration: "underline" }}
                      >
                        
                        tại đây
                      </a>
                    </li>
                    <li>
                      2. Số liệu của quý hiện hành sẽ được cập nhật vào cuối mỗi
                      ngày, sau khi FPTS hạch toán xong các giao dịch phát sinh.
                    </li>
                    <li>
                      3. Phát sinh ròng làm thay đổi vốn ban đầu:
                      <ul style={{ paddingLeft:"20px", textDecoration: "none" }}>
                        <li>
                          - Phát sinh tiền: bao gồm các loại sau (tương ứng với
                          loại phát sinh tăng/giảm)
                          <ul style={{ paddingLeft:"40px", textDecoration: "none" }}>
                            <li>+ Nộp/rút, chuyền tiền</li>
                          </ul>
                        </li>
                        <li>
                          - Phát sinh chứng khoán: bao gồm các loại (tương ứng
                          với loại phát sinh tăng/giảm):
                          <ul style={{ paddingLeft:"40px", textDecoration: "none" }}>
                            <li>+ Lưu ký/Rút lưu ký chứng khoán</li>
                            <li>
                              + Nhận chuyển khoản/Chuyển khoản chứng khoán
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default ReportNAV;
