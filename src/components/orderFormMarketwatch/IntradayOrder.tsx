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
  console.log(data.filter((e : any) => e.ABUYSELL.toUpperCase() === "S"));
  
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
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" , fontSize:"Arial" }}  className='py-1 !text-[13px]'>{item.ADATETIME}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.ASTOCKCODE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>Lệnh thường	</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.ABUYSELL.toUpperCase() === "S" ? "Bán" : "Mua" }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.AORDERTYPE_VN}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.AQUANTITY}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'> { item.APRICE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.AEXCHANGE}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.AORDERSTATUS_VN }</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.ATRADINGACCOUNT}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}  className='py-1 !text-[13px]'>{ item.AORIGORDERID}</th>
              <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}>{ item.AORIGORDERID}</th>
                <th  style={{ color: item.ABUYSELL.toUpperCase() === "S" ? "#9c0A0A" : "#2371AF" , border:"1px solid #dedede" }}>{ item.AMESSAGE_VN}</th>
            </tr>
            })}
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IntradayOrder