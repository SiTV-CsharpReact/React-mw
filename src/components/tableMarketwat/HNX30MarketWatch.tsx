import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ObjectMenuHSX } from '../../models/modelListMenuHSX';
import { checkSTTMarket, formatNumber, formatNumberMarket, setColorMarket, tinhGiaCT, tinhGiaTC } from '../../utils/util';
import FooterMarket from '../footerMarketwat/FooterMarket';
import HeaderMarketW from '../headerMarketwat/HeaderMarket';
import LayoutMarketWatch from '../layoutMarketwat/LayoutMarketWatch'
import MenuMarketWatch from "../indexMarketWat/MenuMarketWatch";
import MenuBarMW from "../menuBarMW/MenuBarMW";
import OrderMarketW from "../orderFormMarketwat/OrderFormMarketWatch";

const HNX30MarketWatch = () => {
  const [products, setProductsHNX] = useState<[] | null>(null);
  const [statusMarket, setStatusMarket] = useState<ObjectMenuHSX | null>(null);
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  //const [connection, setConnection] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
        try {
        
            const responseHNX = await axios.get(`http://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=HNXIndex`);
            const responsesttHNX = await axios.get(`http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`);
            setProductsHNX(responseHNX.data);
            setStatusMarket(responsesttHNX.data);
          } catch (error) {
            console.log(error);
          } 
          // finally {
          //   setLoading(false);
          // }
      }
      fetchData();
   
  }, []);

  const rows = products?.map((dataTable: any) => (
    <tr key={dataTable.RowID} id={`tr${dataTable.RowID}`}>
      <td 
        className={`${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
        id={`${dataTable.RowID}`}
      >
    <input type="checkbox" id={`cb${dataTable.RowID}`}  className="cbTop priceboard"></input>
       <span className="pl-0.5"> {dataTable.RowID}</span>
      </td>
    
      {/* TTham chiếu */}
      <td
        data-sort={dataTable.Info[13][1]}
        id={`${dataTable.RowID}_TC`}
        className=" text-right bg-BGTableHoverMarket text-textTableMarketTC"
      >
        {formatNumber(dataTable.Info[13][1])}
      </td>
      {/* Trần */}
      <td
        data-sort={dataTable.Info[15][1]}
        id={`${dataTable.RowID}_Tran`}
        className=" text-right bg-BGTableHoverMarket text-textTableMarketTran"
      >
        {formatNumber(dataTable.Info[15][1])}
      </td>
      {/* Sàn */}
      <td
        data-sort={dataTable.Info[14][1]}
        id={`${dataTable.RowID}_San`}
        className=" text-right bg-BGTableHoverMarket text-textTableMarketSan"
      >
        {formatNumber(dataTable.Info[14][1])}
      </td>
      {/* G3 Mua*/}
      <td
        data-sort={dataTable.Info[8][1]}
        id={`${dataTable.RowID}_${dataTable.Info[8][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[8][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[8][1])}
      </td>
      {/* KL3 */}
      <td
        data-sort={dataTable.Info[9][1]}
        id={`${dataTable.RowID}_${dataTable.Info[9][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[8][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[9][1])}
      </td>
      {/* G2 */}
      <td
        data-sort={dataTable.Info[4][1]}
        id={`${dataTable.RowID}_${dataTable.Info[4][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[4][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[4][1])}
      </td>
      {/* KL2 */}
      <td
        data-sort={dataTable.Info[5][1]}
        id={`${dataTable.RowID}_${dataTable.Info[5][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[4][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[5][1])}
      </td>
      {/* G1 */}
      <td
        data-sort={dataTable.Info[0][1]}
        id={`${dataTable.RowID}_${dataTable.Info[0][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[0][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
               {checkSTTMarket(formatNumberMarket(dataTable.Info[0][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[1][1]))}
        {/* {formatNumberMarket(dataTable.Info[0][1])} */}
      </td>
      {/* KL1 */}
      <td
        data-sort={dataTable.Info[1][1]}
        id={`${dataTable.RowID}_${dataTable.Info[1][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[0][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[1][1])}
      </td>
      {/* Gia Khơp lenh */}
      <td
        data-sort={dataTable.Info[18][1]}
        id={`${dataTable.RowID}_${dataTable.Info[18][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[18][1])}
      </td>
      {/* KL */}
      <td
        data-sort={dataTable.Info[19][1]}
        id={`${dataTable.RowID}_${dataTable.Info[19][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[19][1])}
      </td>
      {/* +-*/}
      <td
        data-sort={tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}     
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[18][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        <span>
          <div className="price-ot d-block-kl"  id={`${dataTable.RowID}_PT`}>
          {tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}
          </div>
          <div className="price-change d-none-kl" id={`${dataTable.RowID}_CT`}>
          {tinhGiaCT(dataTable.Info[13][1], dataTable.Info[18][1])}
          </div>
        </span>
      
      </td>
      {/* G1 Ban*/}
      <td
        data-sort={dataTable.Info[2][1]}
        id={`${dataTable.RowID}_${dataTable.Info[2][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[2][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {checkSTTMarket(formatNumberMarket(dataTable.Info[2][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[3][1]))}
      </td>
      {/* KL1 */}
      <td
        data-sort={dataTable.Info[3][1]}
        id={`${dataTable.RowID}_${dataTable.Info[3][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[2][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[3][1])}
      </td>
      {/* G2 */}
      <td
        data-sort={dataTable.Info[6][1]}
        id={`${dataTable.RowID}_${dataTable.Info[6][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[6][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[6][1])}
      </td>
      {/* KL2 */}
      <td
        data-sort={dataTable.Info[7][1]}
        id={`${dataTable.RowID}_${dataTable.Info[7][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[6][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[7][1])}
      </td>
      {/* G3 */}
      <td
        data-sort={dataTable.Info[10][1]}
        id={`${dataTable.RowID}_${dataTable.Info[10][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[10][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[10][1])}
      </td>
      {/* KL3 */}
      <td
        data-sort={dataTable.Info[11][1]}
        id={`${dataTable.RowID}_${dataTable.Info[11][0]}`}
        className={` text-right ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[10][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[11][1])}
      </td>
      {/* TKL */}
      <td
        data-sort={dataTable.Info[20][1]}
        id={`${dataTable.RowID}_${dataTable.Info[20][0]}`}
        className=" text-right bg-BGTableHoverMarket "
      >
        {formatNumberMarket(dataTable.Info[20][1])}
      </td>
      <td
        data-sort={dataTable.Info[21][1]}
        id={`${dataTable.RowID}_${dataTable.Info[21][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[21][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[21][1])}
      </td>
      <td
        data-sort={dataTable.Info[22][1]}
        id={`${dataTable.RowID}_${dataTable.Info[22][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[22][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[22][1])}
      </td>
      <td
        data-sort={dataTable.Info[23][1]}
        id={`${dataTable.RowID}_${dataTable.Info[23][0]}`}
        className={` text-right bg-BGTableHoverMarket ${setColorMarket(
          dataTable.Info[13][1],
          dataTable.Info[23][1],
          dataTable.Info[15][1],
          dataTable.Info[14][1]
        )}`}
      >
        {formatNumberMarket(dataTable.Info[23][1])}
      </td>
      <td
        data-sort={dataTable.Info[25][1]}
        id={`${dataTable.RowID}_${dataTable.Info[25][0]}`}
        className=" text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[25][1])}
      </td>
      <td
        data-sort={dataTable.Info[26][1]}
        id={`${dataTable.RowID}_${dataTable.Info[26][0]}`}
        className=" text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[26][1])}
      </td>
      <td
        data-sort={dataTable.Info[27][1]}
        id={`${dataTable.RowID}_${dataTable.Info[27][0]}`}
        className=" text-right bg-BGTableHoverMarket"
      >
        {formatNumberMarket(dataTable.Info[27][1])}
      </td>
    </tr>
  ));
  return (
    <div className=" bg-BGTableMarket text-white" >
          <MenuMarketWatch />
      <MenuBarMW/>  
    <div className="h-420 overflow-auto relative z-10 table_market" id="tableHNX">
        <HeaderMarketW/>
      {/* <iframe id="iframe" src="/hnx/blank?843" ref={iframeRef}></iframe> */}
      {/* <p>{dataRT[0]}</p> */}
 
      <table className="w-full tableMW " id="tableMW_HNX">
    {/* <colgroup><col className="col-symbol" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-total-vol" /><col className="col-over-buy" /><col className="col-over-sell" /><col className="col-ave-price" /><col className="col-high-price" /><col className="col-low-price" /><col className="col-foreign-buy" /><col className="col-foreign-sell" /></colgroup>
     */}
             {/* <colgroup><col className="show-on-mobile col-symbol" /><col className="show-on-mobile col-price" /><col className="show-on-mobile col-price" /><col className="show-on-mobile col-price" /><col className="col-vol col-vol-lg" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol col-vol-sm" /><col className="col-diff" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-vol col-vol-lg" /><col className="col-vol" /><col className="col-vol" /></colgroup> */}
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
          {rows}</tbody>
      </table>
      
      <FooterMarket/>
    
    </div>
    <OrderMarketW/>
    </div>
  )
}

export default HNX30MarketWatch