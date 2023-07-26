import React, { createContext, useCallback, useMemo, useState } from "react";
// import TitlePage from '../../layout/TitlePage'
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import TotalGD from "./TotalGD";
import NoteBottom from "./NoteBottom";
import { useTranslation } from "react-i18next";
import TitlePage from "../../pages/Layout/TitlePage";
import "./TransBalance.scss";
import TableTransValue from "./TableTransValue";
import TableTransReport from "./TableTransReport";
import LayoutPage from "../../pages/Layout/LayoutPage";
import { formatNumber } from "../../utils/util";

export const MyContext = createContext({} as any);

const TransBalance = () => {
  const [short, setShort] = useState(false);
  const [valueDNVKQAndTotalMoney, setValueDNVKQAndTotalMoney] = useState({
    valueDNVKQ: 0,
    valueTotalMoney: 0,
  });
  const [valueGTTT, setValueGTTT] = useState(0);

  const { t } = useTranslation(["report"]);
  const handleExportToExcel = (e: any) => {
    e.preventDefault();

    const table = document.getElementById("table-id");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.xlsx";
    link.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(url);
  };

  const handleExportToPDF = () => {
    const table = document.getElementById("table-id");
    const doc: any = new jsPDF("p", "pt");
    doc.addFont("Helvetica", "Helvetica", "normal");
    doc.setFont("Helvetica");
    if (table) {
      doc.autoTable({
        html: table,
        startX: 20,
        styles: {
          size: 10,
          fontSize: 4,
          cellPadding: 6,
          fillColor: "gray",
          font: "Helvetica",
          lowercase: true,
        },
        tableWidth: "auto",
        margin: { top: 20 },
      });
    }
    doc.save("filename.pdf");
  };

  const valueTGTTT = useMemo(() => {
    return formatNumber(
      valueDNVKQAndTotalMoney.valueDNVKQ +
        valueDNVKQAndTotalMoney.valueTotalMoney +
        valueGTTT
    );
  }, [
    valueDNVKQAndTotalMoney.valueDNVKQ,
    valueDNVKQAndTotalMoney.valueTotalMoney,
    valueGTTT,
  ]);

  return (
    <MyContext.Provider value={{ setValueGTTT, setValueDNVKQAndTotalMoney}}>
      <LayoutPage
        content="Báo cáo tổng hợp số dư tài khoản"
        PageTitle="Báo cáo tổng hợp số dư tài khoản"
      >
        <div className="body__content__report">
          <div className="asset__report__TONGTT__tbl2__tbody">
            <span id="showNoteText4">
              TỔNG GIÁ TRỊ THỊ TRƯỜNG <i className="fa fa-info-circle"></i> :{" "}
              <label id="totalGTTTvaTien">{valueTGTTT}</label>
            </span>
          </div>
          <div className="float-right pr-5 flex" style={{ marginTop: "-50px" }}>
            <span id="buttonRutGon" onClick={() => setShort(!short)}>
              Xem rút gọn
            </span>
            <div style={{ marginTop: "3px" }}>
              <img
                className="cursor-pointer float-left"
                onClick={handleExportToExcel}
                src={excell}
                alt="excel"
                style={{ width: "25px", height: "25px", marginRight: "3px" }}
              />
              &nbsp;{" "}
              <img
                className="cursor-pointer float-right"
                onClick={handleExportToPDF}
                src={pfd}
                alt="pfd"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          </div>
          <div className="body__content__asset__report__2">
            <div className="report__tabcondition_BCTS">
              <TableTransValue />
              <TableTransReport short={short}/>
            </div>
            <div id="divTextNote" className="my-0 mx-5 !w-auto">
              <b className="not-italic text-hoverKL"> Ghi chú:</b>
              <ul className="mb-3">
                <li>
                  1. Dữ liệu trong báo cáo này phụ thuộc vào nhiều nguồn dữ liệu
                  và có thể không đảm bảo được cập nhật liên tục.
                  <a
                    href="/report/upload/CongThucTinhToanBCTS.pdf"
                    target="_blank"
                    className="!underline text-black font-bold"
                  >
                    {" "}
                    Báo cáo chỉ mang tính chất tham khảo và không có ý nghĩa
                    quyết định đầu tư.
                  </a>
                </li>
                <li>
                  2. Số liệu được tạm tính trong phiên giao dịch và sẽ được cập
                  nhật lại sau khi FPTS hạch toán và tính toán lại vào cuối
                  ngày.
                </li>
                <li>
                  3. Lãi/lỗ dự kiến được tạm tính dựa trên chênh lệch giá thị
                  trường và giá trung bình do FPTS tính toán. Trong đó, Giá
                  trung bình được tạm tính trong phiên dựa trên quan điểm và
                  công thức FPTS đưa ra và chỉ mang tính chất tham khảo. Quý
                  khách có thể tham khảo cách tính Giá trung bình của FPTS{" "}
                  <a
                    href="/report/upload/CongThucTinhToanBCTS.pdf"
                    target="_blank"
                    className="underline text-normalText"
                  >
                    tại đây
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LayoutPage>
    </MyContext.Provider>
  );
};

export default TransBalance;
