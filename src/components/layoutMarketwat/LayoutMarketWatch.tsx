import React, { ReactElement } from 'react'
import HeaderMarketW from '../headerMarketwat/HeaderMarket'
import MenuMarketWatch from '../indexMarketWat/MenuMarketWatch'
import MenuBarMW from '../menuBarMW/MenuBarMW'
import OrderMarketW from '../orderFormMarketwat/OrderFormMarketWatch'
type Props ={
    content:ReactElement;
}
const LayoutMarketWatch  = (prop:Props) => {
  return (
    <div>
        <MenuMarketWatch/>
        <MenuBarMW/>
       {prop.content}
        <OrderMarketW/>
    </div>
  )
}

export default LayoutMarketWatch