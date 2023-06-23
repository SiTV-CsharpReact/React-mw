import React, { useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const MoneyHistory = () => {
  const [valueStart, setValueStart] = useState<any>(new Date());
  const [valueEnd, setValueEnd] = useState<any>(new Date());
  const exportToExcel = () => {
    const table: any = document.getElementById("tableId");
    const rows: any = Array.from(table.getElementsByTagName("tr"));

    const data = rows.map((row: any) => {
      const cells = Array.from(row.getElementsByTagName("td"));
      return cells.map((cell: any) => cell.innerText);
    });

    const columns = Array.from(table.getElementsByTagName("th")).map(
      (cell: any) => cell.innerText
    );

    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const table: any = document.getElementById("tableId");
    const { width, height } = table.getBoundingClientRect();

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const aspectRatio = width / height;

      const pdfWidth = doc.internal.pageSize.getWidth() - 20; // Độ rộng tài liệu PDF với lề là 10
      const pdfHeight = pdfWidth / aspectRatio;

      doc.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);

      doc.save("data.pdf");
    });
  };
  return (
    <LayoutPage PageTitle="Lịch sử chuyển tiền" content="Lịch sử chuyển tiền">
      <div className="hidden message">
        <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
        <p>
          Quý khách vui lòng đăng ký dịch vụ Eztransfer theo hướng dẫn &nbsp;
          <a
            target="_blank"
            href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
            rel="noreferrer"
          >
            tại đây
          </a>
          .
        </p>
      </div>
      <div>
        <div className="flex justify-end mt-7 pr-[40px] gap-4 text-[12px]">
          <div className="flex gap-[2px] items-center">
            <label htmlFor="" className="text-[8pt] font-bold">
              Từ ngày
            </label>
            <DatePicker
              onChange={setValueStart}
              format="dd/MM/yy"
              value={valueStart}
              className="text-[13px] rounded-sm outline-none h-[28px] w-[122px]"
            />
          </div>
          <div className="flex gap-[2px] items-center">
            <label htmlFor="" className="text-[8pt] font-bold">
              Đến ngày
            </label>
            <DatePicker
              onChange={setValueEnd}
              format="dd/MM/yy"
              value={valueEnd}
              className="text-[13px] rounded-sm outline-none h-[28px] w-[122px]"
            />
          </div>
          <div>
            <button className="h-[28px] border border-[#2371AF] px-3 rounded-md hover:bg-[#2371AF] hover:text-white transition-all">
              Cập nhật
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportToExcel}>
              <img
                src="/xls.webp"
                alt=""
                className="w-[25px] h-[30px] object-cover"
              />
            </button>
            <button onClick={generatePDF}>
              <img src="/pdf.avif" alt="" className="w-[30px] h-[28px]" />
            </button>
          </div>
        </div>
        <div>
          <table className="w-full mt-[6px]" id="tableId">
            <colgroup>
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
            </colgroup>
            <tr className="text-xs border border-[#ddd] bg-[#F3F3F3]">
              <th className="border-r border-[#ddd] px-[10px] py-[7px]">STT</th>
              <th className="border-r border-[#ddd]">Tên người nhận</th>
              <th className="border-r border-[#ddd]">Số tiền</th>
              <th className="border-r border-[#ddd]">Tài khoản nhận</th>
              <th className="border-r border-[#ddd]">Ngân hàng nhận</th>
              <th className="border-r border-[#ddd]">Tình trạng</th>
              <th className="border-r border-[#ddd]">Ngày hiệu lực</th>
              <th className="border-r border-[#ddd]">Hủy </th>
              <th>Thông báo</th>
            </tr>
            {/* <tr className="text-xs">
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr> */}
          </table>
        </div>
        <div className="text-center text-[10pt] mt-3">
          <span>
            Quý khách có thể tra cứu dữ liệu lịch sử chuyển tiền từ 07/01/2018.
            Để tra cứu dữ liệu lịch sử chuyển tiền trước 07/01/2018 vui lòng
            liên hệ FPTS
          </span>
        </div>
      </div>
    </LayoutPage>
  );
};

export default MoneyHistory;
