import React, { useRef } from 'react'
import {Layout, Model, TabNode, IJsonModel} from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import './dynamic.scss';
import Box from './Box';
import OrderFormMarketWatch from '../orderFormMarketwatch/OrderFormMarketWatch';
import TableMarketWatch from '../tableMarketwatch/TableMarketWatch';
import PendingOrders from '../orderFormMarketwatch/PendingOrders';
import MenuBar from '../menuBarMW/MenuBar';
import ListMenuBar from '../menuBarMW/ListMenuBar';
import BoxTest from './BoxTest';
import FlexLayout from "flexlayout-react";

var json : IJsonModel= {
    global: {"tabEnableFloat": true},
    borders: [],
    layout: {
      
        type: "row",
        weight: 150,
        children: [
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Bảng đặt lệnh",
                        component: "orderform",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Bảng giá",
                        component: "tableprice",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Lệnh chờ khớp",
                        component: "pendingorder",
                    }
                ]
            }
        ]
    }
};
const model = Model.fromJson(json);

const Drag = () => {
    let layoutRef = React.createRef();
    const ref = useRef(null);
    const handleNewTabClick =(node:TabNode)=>{
        console.log(node)
    }
    // const [currentModel, setCurrentModel] = useState(model);
    const factory = (node: TabNode) => {
        var component = node.getComponent();
        let config = node.getConfig();
        console.log(node,component)
        if (component==="orderform") {
          return <OrderFormMarketWatch/>;
        }
        if (component==="tableprice") {
            return <BoxTest/> ;
          }
          if (component==="pendingorder") {
            return <PendingOrders/>;
          }
      }
    
      return (
        <main id="main-wrapper" className='main-wrappers relative w-full'>
             <div>
			  {/* <button onClick={add(false)}>add</button>
			  <button onClick={add(true)}>add2</button> */}
  {/* <button onClick={handleNewTabClick}>Add</button> */}
        <pre>{JSON.stringify(Object.keys(ref.current||{}).sort())}</pre>
			</div>
        <div className='custom-layout-page'>
        <div>
           <FlexLayout.Layout
          model={model}
          factory={factory} />
        </div>
        </div>
        </main>
        
      );
}

export default Drag