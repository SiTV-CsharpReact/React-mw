import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import LoadingComponent from '../layout/LoaddingComponent';
import { DataHNX } from '../models/modelTableHNX';
import { formatNumber, formatNumberMarket, setColorMarket, tinhGiaTC} from "../utils/util";
import HeaderMarketW from './headerMarketwat/HeaderMarket';
import "../styles/MW.css";
const VN30MarketWatch = () => {
    const [loading,setLoading] = useState(true);
  const [products, setProducts] = useState<[] | null>(null);
  useEffect(() => {
    axios.get(`http://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=VN30`)
    .then(res=>setProducts(res.data))
    .catch(error=>{
      console.log(error);
    })
    .finally(()=> setLoading(false));
}, []);
console.log(products)
if (loading) return <div className="h-420">Loading...</div>
   const test= products;
  return (
    <div className='h-420 overflow-auto' id="indexMarketW">
     <HeaderMarketW/>
    <table className="w-full ">
    <colgroup>
        <col className="col-symbol" />
        <col className="show-on-mobile col-price" />
        <col className="show-on-mobile col-price" />
        <col className="show-on-mobile col-price" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol col-vol-sm" />
        <col className="col-diff" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-vol-total" />
        <col className="col-price-open" />
        <col className="col-price-high" />
        <col className="col-price-short" />
        <col className="col-vol-foreign-buy" />
        <col className="col-vol-foreign-sell" />
        <col className="col-vol-still" />
        </colgroup>
  <tbody>
  {products?.map((dataTable:any) =>(
      <tr key={dataTable.RowID}>
        
        <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}> {dataTable.Info[0][1]}</td>
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