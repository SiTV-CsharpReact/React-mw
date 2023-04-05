import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { fetchTableAsync } from './tableSlice';
import { formatNumber, formatNumberMarket, setColorMarket } from '../../utils/util';
import "../../styles/MW.css";
const TableMarketWatch = () => {
    const dispatch = useAppDispatch();
  //const productssss = useAppSelector(productSelectors.selectAll);
 // const { productsLoaded,productParams} = useAppSelector(state => state.table);
  const  products = useAppSelector(state => state.table.table);
 console.log(products)
useEffect(()=>{
    dispatch(fetchTableAsync())
},[dispatch])
  return (
    <table className="w-full tableMW">
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
      {/* <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[9][1])}</td> */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}> oke</td>
       {/* KL1 */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[10][1])}</td>
       {/* Gia Khơp lenh */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[11][1])}</td>
       {/* KL */}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[12][1])}</td>
       {/* +-*/}
      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1],dataTable.Info[11][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>oke</td>
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
  )
}

export default TableMarketWatch