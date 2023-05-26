import React from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
const TradingResult = () => {
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
  return (
    <div>
      <div className="flex items-center gap-3 mt-2 justify-end">
        <button className="p-1 cursor-pointer  pl-5 pr-5 rounded-md text-white text-[13px] font-medium uppercase bg-[#0055ba]">
          Cập nhật
        </button>
        <form className="flex gap-2  mr-8">
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

      <div className=" flex mx-auto ml-5 mr-5 gap-3 mt-2">
        {/* buy */}
        <div className="border border-gray-300 w-1/2">
          <div className="flex relative  border border-gray-300 gap-1 h-[30px] items-center bg-[#2371AF] ">
            <p className="text-center mx-auto font-semibold text-white">MUA</p>
            <i className="fa absolute fa-info-circle left-[52.5%] top-2  text-white"></i>
          </div>

          <table>
            <thead>
              <tr>
                <th className="border border-gray-300">Mã CK </th>
                <th className="border border-gray-300 w-1/6">Khối lượng</th>
                <th className="border border-gray-300">Giá</th>
                <th className="border border-gray-300 w-1/6">Thành tiền</th>
                <th className="border border-gray-300">SHL</th>
                <th className="border border-gray-300">Giờ khớp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border font-bold text-center border-gray-300">
                  Tổng
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* sell */}
        <div className="border border-gray-300 w-1/2">
          <div className="flex relative gap-1 mx-auto  h-[30px] items-center bg-[#9C0A0A] ">
            <p className=" font-semibold  mx-auto text-white">BÁN </p>
            <i className="fa absolute fa-info-circle left-[52.5%] top-2  text-white"></i>
          </div>

          <table>
            <thead>
              <tr>
                <th className="border border-gray-300">Mã CK </th>
                <th className="border border-gray-300 w-1/6">Khối lượng</th>
                <th className="border border-gray-300">Giá</th>
                <th className="border border-gray-300 w-1/6">Thành tiền</th>
                <th className="border border-gray-300">SHL</th>
                <th className="border border-gray-300">Giờ khớp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border font-bold text-center border-gray-300">
                  Tổng
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradingResult;
