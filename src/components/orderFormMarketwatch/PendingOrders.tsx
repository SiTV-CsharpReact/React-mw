import React, { useEffect, useState } from 'react'
import excell from "../../images/excel.png"
import pfd from "../../images/pdf.png"
import * as XLSX from "xlsx";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import axios from 'axios';
import _ from 'lodash';
const PendingOrders = () => {

      const [data, setData] = useState([]);
      const [dataFiter, setDataFiter] = useState('');
      const [dataMap, setDataMapp] = useState('');
      const [sortData, setSortData] = useState('');
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const {data} = await axios.get("http://localhost:5000/items");
            console.log("data", data);
            setData(data)
          } catch (error) {
              console.log("error", error);
          }
        };
        fetchData();
      }, []);
      // const handleRenderList = () => {
      //   if (!dataFiter) return data;
      //   return data.filter((a: any) => a.AEXCHANGE.toUpperCase() === dataFiter)
      // }
      // const handleRenderLis = () => {
      //     if (!dataMap) return data;
      //       return  data.filter((a: any) => a.ASTOCKCODE.toUpperCase() === dataMap)
      // }
          const handleRenderListCombined = (): any => {
            let filteredData: any = data;

            if (dataFiter) {
              filteredData = filteredData.filter((item: any) => item.AEXCHANGE.toUpperCase() === dataFiter);
            }

            if (dataMap) {
              filteredData = filteredData.filter((item: any) => item.ASTOCKCODE.toUpperCase() === dataMap);
            }

            return filteredData;
          };


          const mangDaSapXep: any = handleRenderListCombined();

           
         
        const hanDelSubmit = () => {
         if (sortData === "asc") {
           const array = data.sort((a: any, b: any) =>
             a.AEXCHANGE.toUpperCase() > b.AEXCHANGE.toUpperCase() ? -1 : 1
           )
           console.log("array", array);
           setData(array);
         }
         else {
           const array = data.sort((a: any, b: any) =>
             a.AEXCHANGE.toUpperCase() < b.AEXCHANGE.toUpperCase() ? -1 : 1
           )
           console.log("array", array);
           setData(array);
         }
         
       };
  
      
    const handleExportToExcel = (e:any) => {
      e.preventDefault();
      const table = document.getElementById('table-id');
      const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'filename.xlsx');
   
  };
    const handleExportToPDF = () => {
      console.log("oke")
    // const table = document.getElementById('table-id');
    //   const doc: any = new jsPDF('p', 'pt');
    //   doc.addFont('Helvetica', 'Helvetica', 'normal')
    //   doc.setFont('Helvetica')
    //   if (table) {
    //     doc.autoTable({
    //     html: table,
    //     startX: 20,
    //     styles: {
    //       size:10,
    //       fontSize: 4,
    //       cellPadding: 6,
    //       fillColor: 'gray',
    //        font: 'Helvetica', lowercase: true,
    //     },
    //      tableWidth: 'auto',
    //      margin: { top: 20 },
    //   });
    // }
    // doc.save('filename.pdf');
  };
  return (
    <div>
    <div className='flex justify-between pl-8 mt-2'>
      <div style={{color:'#555'}}>
        <p>
          <span className='text-[14px]  leading-3 font-semibold text-[#333333]'>Lưu ý: </span>
          Khi Quý khách sửa lệnh đối với chứng khoán sàn HOSE, hệ thống sẽ thực hiện lần lượt:
        </p>
        <p>  (1) Hủy phần chưa khớp của lệnh gốc</p>
        <p>  (2) Tạo lệnh mới tương ứng theo yêu cầu sau khi bước (1) hoàn tất</p>
      </div>

      <div className='flex items-center gap-4'>
        <div className=''>
          <label  className='block mb-2 text-[12px]] leading-3 font-semibold text-[#333333]' htmlFor="">Sàn GD</label>
          <select onChange={(e)=>setDataFiter(e.target.value)} style={{border:"1px solid #ccc" ,color:'#555'}} className=' border  border-inherit rounded-md h-[37px]' name="" id="sanGD">
              <option className='text-[12px] pb-2' value="">Tất cả</option>
              <option  value="HNX.LISTED" className='text-[12px] pb-2'>HNX.LISTED</option>
              <option value="HSX"  className='text-[12px] pb-2'>HSX</option>
         </select>
        </div>

        <div>
          <label className='block  mb-2 text-[12px]] leading-3 font-semibold text-[#333333]' htmlFor="">Mã CK</label>
          <select onChange={(e)=>setDataMapp(e.target.value)} style={{border:"1px solid #ccc" ,color:'#555'}} className='  h-[37px] border rounded-md border-inherit' name="" id="">
          <option  className='text-[12px] pb-2' value="">Tất cả</option>
          <option  className='text-[12px] pb-2' value="AAV">AAV</option>
          <option  className='text-[12px] pb-2' value="BAB">BAB</option>
          <option  className='text-[12px] pb-2' value="C69">C69</option>
          <option  className='text-[12px] pb-2' value="BAB">BAB</option>
          <option  className='text-[12px] pb-2' value="AAM">AAM</option>
         </select>
        </div>

        <div>
          <label className='block  mb-2 text-[12px]] leading-3 font-semibold text-[#333333]' htmlFor="">Sắp xếp theo</label>
          <select onChange={(e)=>setSortData(e.target.value)} style={{border:"1px solid #ccc" ,color:'#555'}} className='  h-[37px] border rounded-md border-inherit' name="" id="">
          <option  className='text-[12px] pb-2' value="">Tất cả</option>
          <option  className='text-[12px] pb-2' value="desc">Mã CK</option>
          <option  className='text-[12px] pb-2' value="asc" >Số lượng</option>
         </select>
          </div>
          
        <div>
          <label className='block  mb-2 text-[12px] leading-3 font-semibold text-[#333333]' htmlFor="">T.tự sắp xếp</label>
          <select onChange={(e)=>setSortData(e.target.value)} style={{border:"1px solid #ccc" ,color:'#555'}} className='  h-[37px]  border rounded-md border-inherit' name="" id="">
          <option className='text-[12px] pb-0 text-gray-500' value="">Tất cả</option>
          <option className='text-[12px] pb-0 text-gray-500' value="asc">Tăng dần</option>
          <option className='text-[12px] pb-0 text-gray-500' value="desc">Giảm dần</option>
         </select>
        </div>

        <button onClick={hanDelSubmit} className='p-2 cursor-pointer mt-5 pl-5 pr-5 rounded-md text-white text-[13px] font-medium uppercase bg-[#0055ba]'>
          Cập nhật
        </button>
        <div className='flex gap-2 mt-5 mr-8'>
         <img className='cursor-pointer ' onClick={handleExportToExcel}  src={ excell} alt='excel' />
          <img className='cursor-pointer ' onClick={handleExportToPDF} src={ pfd}  alt='pfd'/>
        </div>
      </div>
      </div>
      <div className='mt-2 ml-8 mr-8'>
        
      <table id='table-id'>
        <thead>
          <tr>
            <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span className='text-[12px]'>Sửa</span>
            </th>
            <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
                <span className='text-[12px] block ' >Hủy</span>
                <input className='rounded-sm' type='checkbox'/>
            </th>
            <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span className='text-[12px]' >Mã CK	</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span className='text-[12px]'>  Lệnh đặt</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>Loại GD	</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span className='text-[12px]'>  KL chờ	</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>KL đặt	</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>Giá	</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>Tình trạng lệnh</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>Diễn giải</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>Sàn GD</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>SHL Tại sàn</span>
            </th>
             <th style={{border:"1px solid #ccc" ,color:'#555'}}  className='bg-[#F3F3F3] '>
              <span  className='text-[12px]'>Thời gian đặt lệnh</span>
            </th>
          </tr>
        </thead>

          <tbody>
             {mangDaSapXep.map((item:any, index:any) => {
        
        return <tr key={index}>
          <td style={{ border: "1px solid #ccc", color: '#555', backgroundColor: "rgba(251,246,213)" }}></td>
              <td style={{ border: "1px solid #ccc", color: '#555',backgroundColor:"rgba(251,246,213)" }}
                className='text-center '>
                <p className=' bg-[#F3F3F3] border mx-auto border-black w-[40px] rounded-sm '>Hủy</p>
                </td> 
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>{ item.ASTOCKCODE}</td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}> { item.AORDERTYPE}</td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}> { item.APRODUCTTYPE_VN} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.AQUANTITY} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.AQUANTITY} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.APRICE} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.AORDERSTATUS_VN} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.AMESSAGE_VN} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.AEXCHANGE} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.APLACEDBY} </td>
              <td className='text-center' style={{border:"1px solid #ccc" ,color:'#555' ,backgroundColor:"rgba(251,246,213)"}}>  { item.ADATETIME} </td>
            </tr>
      })}
          </tbody>
        </table>
      </div>  
     
      
    </div>
      
  )
}

export default PendingOrders