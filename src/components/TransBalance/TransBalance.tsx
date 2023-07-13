import React, { useState } from "react";
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

const TransBalance = () => {
  const [short, setShort] = useState(false);

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
  const handelShort = () => {
    setShort(!short);
  };
  return (
    <div>
      <TitlePage content="Báo cáo tổng hợp số dư giao dịch" />
      <div className="body__content__report">
        <div className="asset__report__TONGTT__tbl2__tbody">
          <span id="showNoteText4">
            TỔNG GIÁ TRỊ THỊ TRƯỜNG
            <i className="fa fa-info-circle"></i>
            <label id="totalGTTTvaTien">4,924,131</label>
          </span>
        </div>
        <div className="float-right pr-5 flex" style={{ marginTop: "-50px" }}>
          <span id="buttonRutGon">Xem rút gọn</span>
          <div style={{ marginTop: "3px" }}>
            <img
              className="cursor-pointer float-left"
              onClick={handleExportToExcel}
              src={excell}
              alt="excel"
              style={{ width: "25px", height: "25px" }}
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
            <TableTransReport/>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between mt-5 ml-8 mr-5">
        <h3 className="text-[16px] text-[#000000] font-bold">
          TỔNG GIÁ TRỊ THỊ TRƯỜNG{" "}
          <i className="fa fa-info-circle text-[#717171]"></i> : 4,809,120
        </h3>
        <div className="flex items-center gap-[15px] ">
          <button
            onClick={handelShort}
            style={{ border: "1px solid #DEDEDE" }}
            className="px-[15px] py-[5px] !text-[#000000] rounded-[4px] bg-[#ECECEC]"
          >
            {short ? "Xem đầy đủ" : " Xem rút gọn"}
          </button>

          <form className="flex gap-2">
            <img
              className="cursor-pointer "
              onClick={handleExportToExcel}
              src={excell}
              alt="excel"
            />
            <img
              className="cursor-pointer "
              onClick={handleExportToPDF}
              src={pfd}
              alt="pfd"
            />
          </form>
        </div>
      </div>

      <div className="flex gap-4">
        <TotalGD />
        <TableAsset short={short} />
      </div>
      <div>
        <NoteBottom />
      </div> */}
    </div>
  );
};

export default TransBalance;
