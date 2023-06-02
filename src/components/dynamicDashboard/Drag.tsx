import React, { useRef } from "react";
import { Layout, Model, TabNode, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import "./dynamic.scss";
import Box from "./Box";
import OrderFormMarketWatch from "../orderFormMarketwatch/OrderFormMarketWatch";
import PendingOrders from "../orderFormMarketwatch/PendingOrders";
import MenuBar from "../menuBarMW/MenuBar";
import ListMenuBar from "../menuBarMW/ListMenuBar";
import BoxTest from "./TablePrice";
import FlexLayout from "flexlayout-react";

var json: IJsonModel = {
  global: { tabEnableFloat: true },
  borders: [
    {
        type: "border",
        location: "left",
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Navigation",
                component: "grid",
                id: "#24"
            }
        ]
    }
],
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
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "Bảng giá",
            component: "tableprice",
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "Lệnh chờ khớp",
            component: "pendingorder",
          },
        ],
      },
    ],
  },
};
const model = Model.fromJson(json);

const Drag = () => {
  let layoutRef = React.createRef();
  const ref = useRef(null);
  const handleNewTabClick = () => {
    console.log("oke");
  };
  // const [currentModel, setCurrentModel] = useState(model);
  const factory = (node: TabNode) => {
    var component = node.getComponent();
    let config = node.getConfig();
    console.log(node, component);
    if (component === "orderform") {
      return <OrderFormMarketWatch />;
    }
    if (component === "tableprice") {
      return <BoxTest />;
    }
    if (component === "pendingorder") {
      return <PendingOrders value={1} />;
    }
  };

  return (
    <main id="main-wrapper" className="relative w-full main-wrappers">
      {/* <div>
        <button onClick={add(false)}>add</button>
			  <button onClick={add(true)}>add2</button>
        <button onClick={handleNewTabClick}>Add</button>
        <pre>{JSON.stringify(Object.keys(ref.current||{}).sort())}</pre>
      </div> */}
      <div className="custom-layout-page">
        <div className="relative flex items-center justify-between bg-secondary h-7">
          <div className="flex items-center h-6 layout-tabs text-13">
            <div className="flex items-center group tab">
              <div
                className="layout-name group-hover:text-color-highlight"
                title="Văn Sĩ"
              >
                Văn Sĩ
              </div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="ml-2 text-base cursor-pointer hover:text-color-highlight"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
              </svg>
            </div>
            {/* <div className="flex items-center group tab">
              <div
                className="layout-name group-hover:text-color-highlight"
                title="Thêm bảng"
              >
                Thêm bảng
              </div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="ml-2 text-base cursor-pointer hover:text-color-highlight"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
              </svg>
            </div>
            <div className="flex items-center group tab">
              <div
                className="layout-name group-hover:text-color-highlight"
                title="Thêm bảng"
              >
                Thêm bảng
              </div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="ml-2 text-base cursor-pointer hover:text-color-highlight"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
              </svg>
            </div>
            <div className="flex items-center active group tab">
              <div
                className="layout-name group-hover:text-color-highlight"
                title="Thêm bảng"
              >
                Thêm bảng
              </div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="ml-2 text-base cursor-pointer hover:text-color-highlight"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
              </svg>
            </div> */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              className="w-8 h-full p-1 mx-1 text-sm rounded cursor-pointer bg-invert hover:text-color-highlight"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
            </svg>
          </div>
          <div className="flex items-center justify-end w-56 h-full pr-3 space-x-5 rounded-t bg-explain">
            <div className="list-widgets-container" data-headlessui-state>
              <div
                className="mt-2 dropdown-button md:mt-0 hover:text-color-highlight"
                id="headlessui-menu-button-8"
                aria-haspopup="true"
                aria-expanded="false"
                data-headlessui-state
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="cursor-pointer hover:text-color-highlight"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
                </svg>
              </div>
            </div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 576 512"
              className="cursor-pointer hover:text-color-highlight"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 448 512"
              className="cursor-pointer hover:text-color-highlight"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z" />
            </svg>
          </div>
        </div>
        <div className="layout-wrapper">
          <Layout 
          model={model} 
          factory={factory} 
        //   onTabDrag={this.onTabDrag}
          />
        </div>
      </div>
    </main>
  );
};

export default Drag;
