import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../layout/LoaddingComponent';
import { DataHNX } from '../models/modelTableHNX';
import { formatNumber, formatNumberMarket, setColorMarket, tinhGiaTC} from "../utils/util";
const VN30MarketWatch = () => {
    const [loading,setLoading] = useState(true);
  const [products, setProducts] = useState<[] | null>(null);
  useEffect(() => {
    axios.get(`/hsx/data.ashx?s=quote&l=VN30`)
    .then(res=>setProducts(res.data))
    .catch(error=>{
      console.log(error);
    })
    .finally(()=> setLoading(false));
}, []);
console.log(products)
if (loading) return <>Loading...</>
   const test= products;
  return (
    <div className='h-420 overflow-auto'>

    <table className="w-full ">
  <thead>
    <tr>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' rowSpan={2}>Mã</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>TC</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Trần</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Sàn</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' colSpan={6}>Mua</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' colSpan={3}>Khớp lệnh</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' colSpan={6}>Bán</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Tổng KL</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Mở cửa</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Cao nhất</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Thấp nhất</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>NN mua</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>NN bán</th>
      <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket' rowSpan={2}>Room còn lại</th>
    </tr>
    <tr>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G3</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL3</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G2</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL2</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket' >G1</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL1</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket'>Giá</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket'>KL</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket bg-BGTableHoverMarket'>+-</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G1</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL1</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G2</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL2</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>G3</th>
     <th className='border border-borderHeadTableMarket p-2 text-textHeadTableMarket'>KL3</th>
    </tr>
  </thead>
  <tbody>
  {products?.map((dataTable:any) =>(
      <tr key={dataTable.RowID}>
        
        <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}> {dataTable.Info[0][1]}</td>
        {/* <td>   {dataTable.Info.map((items:any) => (
              items.map((item:any) =>(
                console.log(item),
                item[13]
            
              ))
  'border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${`formatNumberMarket()`}'
 
      ))}</td>  */}
         {/* TTham chiếu */}
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTC'>{formatNumber(dataTable.Info[1][1])}</td>   
      {/* Trần */}
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTran'>{formatNumber(dataTable.Info[2][1])}</td>
      {/* Sàn */}
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketSan'>{formatNumber(dataTable.Info[3][1])}</td>
      {/* G3 Mua*/}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[5][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[5][1])}</td>
       {/* KL3 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[5][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[6][1])}</td>
       {/* G2 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[7][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[7][1])}</td>
       {/* KL2 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[7][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[8][1])}</td>
       {/* G1 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[9][1])}</td>
       {/* KL1 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[10][1])}</td>
       {/* Gia Khơp lenh */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[11][1])}</td>
       {/* KL */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[12][1])}</td>
       {/* +-*/}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{tinhGiaTC(dataTable.Info[1][1],dataTable.Info[11][1])}</td>
       {/* G1 Ban*/}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[14][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[14][1])}</td>
       {/* KL1 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[14][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[15][1])}</td>
       {/* G2 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[16][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[16][1])}</td>
       {/* KL2 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[16][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[17][1])}</td>  
       {/* G3 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[18][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[18][1])}</td>
       {/* KL3 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[18][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[19][1])}</td>
       {/* TKL */}
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket '>{formatNumberMarket(dataTable.Info[21][1])}</td> 
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[1][1],dataTable.Info[22][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[22][1])}</td>  
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[1][1],dataTable.Info[23][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[23][1])}</td>
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[24][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[24][1])}</td>
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[26][1])}</td>
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[27][1])}</td>
      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[28][1])}</td>
      </tr>  
    ) 
    )
    
    }
    
  </tbody>
</table>
    </div>
  )
}

export default VN30MarketWatch