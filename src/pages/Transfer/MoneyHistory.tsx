import React, { useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";
import InputDateTimePicker from "./../../layout/InputDateTimePicker";

const MoneyHistory = () => {
  const { t } = useTranslation(["home"]);

  const [valueDate, setValueDate] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleInputDateChange = (nameDate: any, date: any) => {
    setValueDate({
      ...valueDate,
      [nameDate]: date,
    });
  };
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
    <LayoutPage
      PageTitle={t("home:Transfer.LichSuChuyenTien")}
      content={t("home:Transfer.LichSuChuyenTien")}
    >
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
        <div className="flex justify-end items-center mt-7 pr-[40px] gap-4 text-[12px]">
          <InputDateTimePicker
            onChange={handleInputDateChange}
            value={valueDate.startDate}
            nameDate={"startDate"}
            label={t("home:Transfer.TuNgay")}
            classDiv={"gap-[3px]"}
            classDatePicker={"h-[28px] w-[120px]"}
            classLabel={""}
          ></InputDateTimePicker>
          <InputDateTimePicker
            onChange={handleInputDateChange}
            value={valueDate.endDate}
            nameDate={"endDate"}
            label={t("home:Transfer.DenNgay")}
            classDiv={"gap-[3px]"}
            classDatePicker={"h-[28px] w-[120px]"}
            classLabel={""}
          ></InputDateTimePicker>
          <div>
            <button className="h-[28px] !border-[1px] border-[#2371AF] px-3 w-[80px] rounded-md hover:bg-[#2371AF] hover:text-white transition-all">
              {t("home:Transfer.CapNhat")}
            </button>
          </div>
          <div className="flex items-center gap-2 border p-[1px]">
            <button onClick={exportToExcel}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAGuklEQVR42mL8//8/Awx8/PHywfurL769+sf4j/E/IwMu8P8fAyPTPyaQVkNRCyleJYgwQACxQKi3P17uvr/m+adbIpyyItwSnCx8/xlwmwU2j4WB+fzLwxzM3HCzAAIIZNbl12e33J6tIqQboVnAwyzK8I/h399/jGCjkF2NYtL//zycfF/+fGBk+AsXBAgglpvvrqy/OcNDKUadW//T5w8v/j77z/CfgRD4///fn/9//vz7w86McD5AALGsvTrNRTFMnlHt7qvb//8zMYNVMgA9yIisE8yDifwHmwV0FyNIFRNcGUAAsUjxSsoxqt5+fYebg0uQm/vvv/9///398+/fn39/gQBI/APq+wcigBpBTv7//y/D379/fvNxCvwBKmRC+BEggFgsZbwfPnn85dsnCQERRWn5Xz9/MrOwMTIAQ/b/r9/fGUAuYvrHwPAHqP3PbyD6/ff3339/gKZwc/AosmmwMbP/+/f7P8hHLAABxML4g/Pl5zvM/5k42Tn//WPYd3H17dfXmf9ymKq7mKrbAQ359O3D03fPubg42Fk5udi5hDgE/zKA3MjIyCzKaAoM+19/f/z9//fjyx8AAQBMALP/BPPy8vT28QkECgwMDAICByceNrzPr+Pu6Nfd1BoTHPn/+7zUtery7PwA+w0DDkMrRyscLrTSsujw6QcGCAQCCQkCAzomORURFOnp6AIATACz/wT0+PH29vQMDwwGBgb9/vohGCtTP2uguIzs8OiOqIIgJCL0/Pf8/vwYDRhELUckFyf3+vfb6dvk7+gB/wH6/f0C/wAsHS4XDRT//f8CiOnHH6Bh71nZWViYWf4BQ/nPf0sNbxN1pz8M/248uXb13g02Vi5DWaMoiwQVMS1ggv/+5/vvn79ZWViZmZgYGf4zMTFxc3EBIwoYtwABxPLn1+8v3z9yc3CzMrEBowsoff3JGUYeZkEB0d8v39y8dctYycbfJJYBmH7//mL494+TjTvaJu7br68//nz98uPrr19/Bbj4/vz9D4xpgABi+fb366/fn8UERBkYmD98eXL2wdHrry4BrVRR0vzw4SzD1/d7D+1SkVWTEpbkZxcU4RP6+PXjtz9fOdm4BLgF2UWAYcbOxsb6+cNXoAMBAojlx++v3/9+lxCRBpp449m519+e83Lx/vr5h5uXTV5J8e37j9efXq+ZXhXs5edjFCrBLH3z6fUNFzezMbEDoxKYvGQFZNLcUv7+/Q8MboAAYvnw9QMjExMvFx8rM4e5srspw59fDD+///zy+dvHz6qfZbn3nb509t6Tx//fs6uKqwMD5cv3L8Ck9peR+d+/vz9//2FgZWJmZgYKACmAAGL58eubrKQSOyvX609PgCHJy8zFygxMSOIiXBIMTKx6MpZ//L59/v31y6evf359ZWZjZ2NhE+ES/cMATPm/fjF85+XkYWFk/vPvN9BEgABiYWFilhNV/s/w++D1DZ9/fmBiZGFl4eDnEnfR9nv99uGrL095uQR52Pn5+Xj/AAu1v39ttOxste3+/Pnz9ee3D18/c7CyA7MVkMvCwgYQQCzsrByywnKffn748uvjb2DGY/j68ccnFmYuZia2S8/Pnrt/HJjc/zMy/fr1z0HdzUrdev/FncBUzs8pwM3Ow8POxccFjDRGoH9ZmZkBAoiFk4VHQljyy49PbMD0xcDwG5S7fgrxiTL///vu81tWZpb///7+/v/n+79f3OxcwMx45tHpd58/AnMQ438moHi0RYyFijmwIAH6ESCAWKSE5QV5BXk4eHyN077/+vL1x6dPPz6K8Uj9/Pebi4NXgEf4x48f/3//YWdh5Ofj//Tl089fP4HhwsjIBCojGJm4OTmBEQIsUYBJFyCAWDQVtd59eP+D4xcHO7sgp6gYrzQDA6iwBaZwX8OgP39/Ac369OPL51+fxXgkvvz8oier9/Lzyw+fP39j+PWf4R8/Jy9Q7X9QOcwEEABMALP/BLjbpuTg6Pbz+AgDCQ0IEBEIFBELERkSGxkVGhISEgYGCAsIEBANEwEABv4A+gkHC1Y3W/z79/j8+vD38PT49RMKFP7//P7//gUFBAKI8cW7p0DfAhPIr1+/fnz/8Q0Ivn4DllGgwurPH5BtrKxsbEycbJwcPBwC/Py8vLysLGzAyGZjBZbBQPT3L8Of61dvysoqAwQQi7igFNYSHRilv3///vnz57dv379///bly9fvX79/eP8EmKqAJR8kNbGzA+OSi5uH+/evf8CiASCAGHHVNFjBX1Dp+gfog+8g879///EdyAZ6SUhQRFZWFiDAALGXJKlEV9gbAAAAAElFTkSuQmCC"
                alt=""
                className="w-[25px] h-[25px] object-cover"
              />
            </button>
            <button onClick={generatePDF}>
              <img
                src="data:image/png;base64,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"
                alt=""
                className="w-[25px] h-[25px]"
              />
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
              <th className="border-r border-[#ddd] px-[10px] py-[7px]">
                {t("home:Transfer.STT")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.TenNguoiNhan")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.SoTien")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.TaiKhoanNhan")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.NganHangNhan")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.TinhTrang")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.NgayHieuLuc")}
              </th>
              <th className="border-r border-[#ddd]">
                {t("home:Transfer.Huy")}
              </th>
              <th>{t("home:Transfer.ThongBao")}</th>
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
        <div className="text-center text-[10pt] mt-4">
          <span>{t("home:Transfer.ThongBao_HISTORY_F")}</span>
        </div>
      </div>
    </LayoutPage>
  );
};

export default MoneyHistory;
