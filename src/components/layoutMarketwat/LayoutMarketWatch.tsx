import React, { ReactElement } from 'react'
import HeaderMarketW from '../headerMarketwat/HeaderMarket'
import MenuMarketWatch from '../indexMarketWat/MenuMarketWatch'
import MenuBarMW from '../menuBarMW/MenuBarMW'
import OrderMarketW from '../orderFormMarketwat/OrderFormMarketWatch'
import TableMarketWatch from '../tableMarketwat/TableMarketWatch'
type Props ={
    content:ReactElement;
}
const LayoutMarketWatch  = () => {
  return (
    <div>
       <div className=" bg-BGTableMarket text-white panel-horizontally" >
        <div id="panel-top" className="panel-top bg-black" style={{height: '516.99px'}}>
     
        <MenuMarketWatch />
      <MenuBarMW/>  
    <div className="h-420 overflow-auto relative z-10 table_market" id="tableHNX">
        <HeaderMarketW/>
        <TableMarketWatch/> 
        </div>
        <OrderMarketW/>
        </div>
        </div>
    </div>
  )
}

export default LayoutMarketWatch