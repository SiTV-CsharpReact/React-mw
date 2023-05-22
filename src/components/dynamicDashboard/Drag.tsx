import React, { useRef } from 'react'
import {Layout, Model, TabNode, IJsonModel} from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import './dynamic.scss'
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
                        name: "One",
                        component: "button",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Two",
                        component: "button",
                    }
                ]
            },
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Three",
                        component: "button",
                    }
                ]
            }
        ]
    }
};
const model = Model.fromJson(json);
const Drag = () => {
    const ref = useRef(null);
    
    const factory = (node: TabNode) => {
        var component = node.getComponent();
        if (component === "button") {
          return <button>{node.getName()}</button>;
        }
      }
    
      return (
        <main id="main-wrapper" className='main-wrappers relative w-full'>
             <div>
			  {/* <button onClick={add(false)}>add</button>
			  <button onClick={add(true)}>add2</button> */}

        <pre>{JSON.stringify(Object.keys(ref.current||{}).sort())}</pre>
			</div>
        <div className='custom-layout-page'>
        <div>
           <Layout
          model={model}
          factory={factory} />
        </div>
        </div>
        </main>
        
      );
}

export default Drag