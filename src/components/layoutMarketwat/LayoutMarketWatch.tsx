import React, { ReactElement } from 'react'
import HeaderMarketW from '../headerMarketwat/HeaderMarket'
import MenuMarketWatch from '../indexMarketWat/MenuMarketWatch'
import MenuBarMW from '../menuBarMW/MenuBarMW'
import OrderMarketW from '../orderFormMarketwat/OrderFormMarketWatch'
import TableMarketWatch from '../tableMarketwat/TableMarketWatch'
import { useParams } from 'react-router-dom'
import { stocks } from '../../models/marketwacthTable'
import TableGDTTMarketWatch from '../tableMarketwat/TableGDTTMarketWatch'
import HSXMarketWatch from '../tableMarketwat/TableHSXMarketWatch'
import TableThongKeMarketWatch from '../tableMarketwat/TableThongKeMarketWatch'
import MenuTest from '../menuBarMW/MenuTest'
import ListMenuTest from '../menuBarMW/ListMenuTest'
type Props ={
    content:ReactElement;
}
function RenderTable() {
  const params = useParams<{ id: string }>()
  const paramstock  = stocks.find(
    paramstock => paramstock.id === params.id
  )
    const paramTable = paramstock?.id
    switch(paramTable){
      case "thoa-thuan-hnx":
      case "thoa-thuan-hsx":
      case "thoa-thuan-upcom":
      return <TableGDTTMarketWatch/>
      case "HNX":
      case "HNX30":
      case "BOND":
      case "UPCOM":
      return <TableMarketWatch/>
      case "VNI":
      case "VN30":
      case "VNXALL":   
      case "VN100":
      case "VNALL":
      case "VNMID":
      case "VNSML":
      return <HSXMarketWatch/>
      case "thong-ke-index":
      case "thong-ke-gia":
      case "thong-ke-dat lenh":   
      case "giao-dich-khop-lenh-ndtnn":
      case "giao-dich-thoa-thuan-ndtnn":
      return <TableThongKeMarketWatch/>
    default: 
      break;
    }

  
  
}
const LayoutMarketWatch  = () => {
  // const params = useParams<{ id: string }>()
  // const paramstock  = stocks.find(
  //   paramstock => paramstock.id === params.id
  // )
 
  //   const paramTable = paramstock?.id
  return (
    <div>
       <div className=" bg-BGTableMarket text-white panel-horizontally" >
        <div id="panel-top" className="panel-top bg-black" style={{height: '516.99px'}}>
     
        <MenuMarketWatch />
      <MenuBarMW/>  
     
    <div className="h-420 overflow-auto relative z-10 table_market" id="tableHNX">
        {/* {switch(paramstock)
        
        } */}
       {RenderTable()}
        </div>
        <OrderMarketW/>
        </div>
        </div>
    </div>
  )
}

export default LayoutMarketWatch