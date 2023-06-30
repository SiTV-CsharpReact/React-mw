import React, { useEffect, useRef, useState } from 'react'
import PdfandExcel from './PdfandExcel'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useReactToPrint } from 'react-to-print';

const IntradayOrder = () => {
  const componentPDF = useRef<any>()
  const { t } = useTranslation(["home"]);
  const [data, setData] = useState([])
   const dataInterday = async() => {
      const resultData = await axios.get("http://localhost:5000/Data")
      const data = resultData.data.Table
      setData(data)
      console.log("resultData",data)
    }
  useEffect(() => {
    dataInterday()
  }, [])
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

  const handleExportToPDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Export PDF",
    onAfterPrint: () => alert("Export is successfully"),
  })
  return (
    <div>
      <div className='flex justify-end mr-[9px]'>
      <div>
          <div className="flex items-end gap-[14px] mt-1.5">
          <button className="p-1 pr-1 cursor-pointer  w-[70.5px] h-[30px] rounded-[4px] text-white text-[12px]  uppercase bg-[#0055ba]">
            {t("home:base.CapNhat")}
          </button>
          <form className="flex gap-[7px] mr-8">
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
      </div>
      <div  ref={componentPDF}  className='mx-4 mt-1.5'>
        <table id='table-id'>
          <thead className='!bg-[#F3F3F3]'>
            <tr style={{border:"1px solid #dedede"}} className='border !bg-[#F3F3F3] '>
            <th style={{border:"1px solid #dedede"}} className='align-top  h-[23px] xl:w-[114.8px] 2xl:w-[153px] !p-0 font-bold text-black border shadow-sm text-md'>{t("home:base.Time")} 	</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[84.91px] 2xl:w-[113px] h-[23px] !p-0 px-1 font-bold text-black border shadow-sm'>{t("home:Order.ORDER_MCK")} 	</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[129.6px] 2xl:w-[172px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.LoaiGD")}</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[106.7px] 2xl:w-[141px] h-[23px] !p-0 font-bold text-black border shadow-sm !px-1'>{t("home:Order.ORDER_LD")}	</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[111.2px] 2xl:w-[148px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.LoaiLenh")}	</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[101px] 2xl:w-[134px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.SoLuong")}</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[54px] 2xl:w-[72px] h-[23px] !p-0 !px-2 font-bold text-black border shadow-sm'>{t("home:base.Gia")}</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[125px] 2xl:w-[166px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.SanGD")}</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[122px] 2xl:w-[162px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.TinhTrang")}</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[168.5px] 2xl:w-[224px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.PhuongThucDatLenh")}	</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[104.5px] 2xl:w-[138.5px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.SHL0")}	</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[62px] 2xl:w-[82.5px] h-[23px] !p-0 px-1 font-bold text-black border shadow-sm'>{t("home:base.SHL")}</th>
            <th style={{border:"1px solid #dedede"}} className='align-top xl:w-[126.28px] 2xl:w-[168px] h-[23px] !p-0 font-bold text-black border shadow-sm'>{t("home:base.ThongBao")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => {
              return  <tr  style={{border:"1px solid #dedede"}} className='p-2 hover:bg-[#EEFFEE]' key={index}>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-2 !font-extralight'>{item.ADATETIME}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !font-[Arial] !text-left pl-1 !font-extralight'>{ item.ASTOCKCODE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1 !font-extralight'>Lệnh thường</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1  !font-extralight'>{ item.ABUYSELL.toUpperCase() === "S" ? "Bán" : "Mua" }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1  !font-extralight'>{ item.AORDERTYPE_VN}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-right pr-1 !font-extralight'>{ item.AQUANTITY}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-right pr-1 !font-extralight'> { item.APRICE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.AEXCHANGE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.AORDERSTATUS_VN }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{item.ATRADINGACCOUNT.charAt(0).toUpperCase() + item.ATRADINGACCOUNT.slice(1).toLowerCase()}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left !pl-1 !font-extralight'>{ item.AORIGORDERID}</th>
              <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }} className='py-1 !text-[13px] !text-left !pl-1 w-[70px] !font-extralight'>{ item.AORIGORDERID}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }} className='py-1 !text-[13px] !text-left !pl-1 !font-extralight'>{ item.AMESSAGE_VN}</th>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(IntradayOrder)