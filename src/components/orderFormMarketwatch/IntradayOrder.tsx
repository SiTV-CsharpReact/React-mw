import React, { useEffect, useState } from 'react'
import PdfandExcel from './PdfandExcel'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

const IntradayOrder = () => {
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
  return (
    <div>
      <div className='flex justify-end'>
      <PdfandExcel/>
      </div>
      <div  className='mx-4 mt-2'>
        <table>
          <thead>
            <tr style={{border:"1px solid #dedede"}} className='border bg-[#f3f3f3} py-1'>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm text-md'>{t("home:base.Time")} 	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm '>{t("home:Order.ORDER_MCK")} 	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.LoaiGD")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:Order.ORDER_LD")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.LoaiLenh")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SoLuong")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.Gia")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SanGD")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.TinhTrang")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.PhuongThucDatLenh")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SHL0")}	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.SHL")}</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>{t("home:base.ThongBao")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => {
              return  <tr  style={{border:"1px solid #dedede"}} className='p-2' key={index}>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-2 !font-extralight'>{item.ADATETIME}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !font-[Arial] !text-left pl-1 !font-extralight'>{ item.ASTOCKCODE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1 !font-extralight'>Lệnh thường</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1  !font-extralight'>{ item.ABUYSELL.toUpperCase() === "S" ? "Bán" : "Mua" }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1  !font-extralight'>{ item.AORDERTYPE_VN}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-right pr-1 !font-extralight'>{ item.AQUANTITY}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-right pr-1 !font-extralight'> { item.APRICE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.AEXCHANGE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.AORDERSTATUS_VN }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1 !font-extralight'>{ item.ATRADINGACCOUNT}</th>
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