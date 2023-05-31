import React, { useEffect, useState } from 'react'
import PdfandExcel from './PdfandExcel'
import axios from 'axios'

const IntradayOrder = () => {
  const [data, setData] = useState([])
   const dataInterday = async() => {
      const resultData = await axios.get("http://localhost:8080/Data")
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
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm text-md'>Thời gian	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm '>Mã CK	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Loại g.dịch</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Lệnh đặt	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Loại lệnh	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>S.lượng	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Giá</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Sàn g.dịch</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Tình trạng	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>P.thức đặt lệnh	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>SHL gốc	</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>SHL</th>
            <th style={{border:"1px solid #dedede"}} className='font-bold text-black border shadow-sm'>Thông báo</th>
            </tr>
          </thead>


          <tbody>
            {data.map((item: any, index: any) => {
              
              return  <tr  style={{border:"1px solid #dedede"}} className='p-2' key={index}>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" , fontSize:"Arial" }}  className='py-1 !text-[13px] !text-left pl-2'>{item.ADATETIME}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !font-[Arial] !text-left pl-1'>{ item.ASTOCKCODE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1'>Lệnh thường	</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1 '>{ item.ABUYSELL.toUpperCase() === "S" ? "Bán" : "Mua" }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-left pl-1 '>{ item.AORDERTYPE_VN}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]  !text-right pr-1'>{ item.AQUANTITY}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-right pr-1'> { item.APRICE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1'>{ item.AEXCHANGE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1'>{ item.AORDERSTATUS_VN }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left pl-1'>{ item.ATRADINGACCOUNT}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px] !text-left !pl-1'>{ item.AORIGORDERID}</th>
              <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }} className='py-1 !text-[13px] !text-left !pl-1 w-[70px]'>{ item.AORIGORDERID}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }} className='py-1 !text-[13px] !text-left !pl-1'>{ item.AMESSAGE_VN}</th>
            </tr>
            })}
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IntradayOrder