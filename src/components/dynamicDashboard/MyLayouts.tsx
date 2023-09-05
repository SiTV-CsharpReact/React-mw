import React, { useState, useRef } from "react";
import {
  IJsonModel,
  Model,
  TabNode,
  Layout,
} from "flexlayout-react";
import OrderFormMarketWatch from "../orderFormMarketwatch/OrderFormMarketWatch";
import TablePrice from "./TablePrice";
import PendingOrders from "../orderFormMarketwatch/PendingOrders";
import "./dynamic.scss";
import TableTotalMonney from "../orderFormMarketwatch/TableTotalMonney";
import TablePriceNew from "./TablePriceNew";
import IntradayOrder from "../orderFormMarketwatch/IntradayOrder";
import TradingResult from "../orderFormMarketwatch/TradingResult";
import AssetReport from "../AssetReport/AssetReport";
import TransBalance from "../TransBalance/TransBalance";
import ReportNAV from "../../pages/Report/ReportNAV";

type Tab = {
  id: string;
  name: string;
  component: string;
};

type MyLayoutState = {
  layoutFile: string | null;
  model: Model | null;
  json?: string | undefined;
  adding: boolean;
  fontSize: string;
  realtimeResize: boolean;
  tabs: Tab[];
  showDropMenu: boolean;
};

const json: IJsonModel = {
  global: { tabEnableFloat: true },
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
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "Bảng giá cũ",
            component: "tableprice",
          },
        ],
      },
    ],
  },
};

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
}

interface MenuItemProps {
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  iconClass: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, iconClass }) => (
  <div
    className="px-3 py-1 cursor-pointer hover:bg-invert hover:text-color-highlight"
    role="menuitem"
    tabIndex={-1}
    data-headlessui-state
  >
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-1">
        <span
          onMouseDown={(event) => onClick(event)}
          onTouchStart={(event) => onClick(event)}
        >
          {label}
        </span>
      </div>
      <span className={`w-3 h-3 rounded-full ${iconClass}`} />
    </div>
  </div>
);

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => (
  <div role="none">
    <div
      className="bg-invert text-color-tertiary font-medium px-3 py-1.5 mb-1"
      role="none"
    >
      {title}
    </div>
    <div className="space-y" role="none">
      {items.map((item) => (
        <MenuItem key={item.label} {...item} />
      ))}
    </div>
  </div>
);

const MyLayouts: React.FC = () => {
  const layoutRef = useRef<Layout | null>(null);
  const [sttMenu,setSTTMenu] = useState<boolean>(true);
  const [state, setState] = useState<MyLayoutState>({
    layoutFile: null,
    model: Model.fromJson(json),
    json: undefined,
    adding: false,
    fontSize: "13px",
    realtimeResize: true,
    tabs: [],
    showDropMenu: true,
  });
  const factory = (node: TabNode) => {
    var component = node.getComponent();
    // let config = node.getConfig();
    // console.log(node, component);
    // đặt lệnh
    if (component === "orderform") {
      return <OrderFormMarketWatch types="1" />;
    }
    if (component === "tableprice") {
      return <TablePrice />;
    }
    if (component === "tablepricenew") {
      return <TablePriceNew />;
    }
    if (component === "pendingorder") {
      return <PendingOrders value={1} />;
    }
    if (component === "tradingresult") {
      return <TradingResult />;
    }
    if (component === "intradayorder") {
      return <IntradayOrder />;
    }

    if (component === "totalmonney") {
      return <TableTotalMonney status={true} />;
    }
    // báo cáo 
    if (component === "assetreport") {
        return <AssetReport  />;
      }
      if (component === "reporttransbalance") {
        return <TransBalance  />;
      }
      if (component === "reportNAV") {
        return <ReportNAV  />;
      }
      if (component === "reportprofitloss") {
        return <AssetReport  />;
      }
    return null;
  };
  const handleAddTab = () => {
    const newTabId = `tab${state.tabs.length + 1}`;
    const newTab = {
      id: newTabId,
      name: `Tab ${state.tabs.length + 1}`,
      component: "newcomponent",
    };

    setState((prevState) => ({
      ...prevState,
      tabs: [...prevState.tabs, newTab],
    }));
    createNewLayout();
  };

  const createNewLayout = () => {
    const newLayout: IJsonModel = {
      global: { tabEnableFloat: true },
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
                name: "Tab Mới",
                component: "newcomponent",
                config: {
                  showCloseIcon: false,
                },
              },
            ],
          },
        ],
      },
    };

    const newModel = Model.fromJson(newLayout);
    setState({ ...state, model: newModel });
  };

  const setNameComponent = (componentName: string) => {
    switch (componentName) {
      case "tableprice":
        return "Bảng giá cũ";
      case "orderform":
        return "Bảng đặt lệnh";
      case "totalmonney":
        return "Số dư tiền";
      case "tablepricenew":
        return "Bảng giá mới";
      case "pendingorder":
        return "Lệnh chờ khớp";
      case "tradingresult":
        return "KQ khớp lệnh trong ngày";
      case "intradayorder":
        return "Lệnh trong ngày";
        case "assetreport":
            return "Báo cáo tài sản";
          case "reporttransbalance":
            return "Báo cáo tổng hợp số dư giao dịch";
          case "reportNAV":
            return "Báo cáo biến động tài sản ròng";
      default:
        break;
    }
  };

  const onAddDragMouseDown = (
    mouseEvent: React.MouseEvent | React.TouchEvent<HTMLSpanElement>,
    componentName: string
  ) => {
    mouseEvent.stopPropagation();
    mouseEvent.preventDefault();
    layoutRef.current?.addTabWithDragAndDrop(
      undefined,
      {
        component: componentName,
        name: setNameComponent(componentName),
      },
      onAdded
    );
  };

  const onAdded = () => {
    setState({ ...state, adding: false });
  };

  let contents: React.ReactNode = "loading ...";

  if (state.model !== null) {
    contents = (
      <div className="flex items-center h-6 layout-tabs text-13">
        {state.tabs.map((tab) => (
          <div className="tab" key={tab.id}>
            {tab.name}
          </div>
        ))}
        <div className="tab" onClick={handleAddTab}>
          Thêm tab
        </div>
      </div>
    );
  }
  const menuData = [
    {
      title: "Bảng giá",
      items: [
        {
          label: "Bảng giá cũ",
          onClick: (event: any) => onAddDragMouseDown(event, "tableprice"),
          iconClass: "bg-sell",
        },
        {
          label: "Bảng giá mới",
          onClick: (event: any) => onAddDragMouseDown(event, "tablepricenew"),
          iconClass: "bg-buy",
        },
      ],
    },
    {
      title: "Giao dịch",
      items: [
        {
          label: "Đặt lệnh",
          onClick: (event: any) => onAddDragMouseDown(event, "orderform"),
          iconClass: "bg-sell",
        },
        {
          label: "Lệnh chờ khớp",
          onClick: (event: any) => onAddDragMouseDown(event, "pendingorder"),
          iconClass: "bg-sell",
        },
        {
          label: "KQ khớp lệnh trong ngày",
          onClick: (event: any) => onAddDragMouseDown(event, "tradingresult"),
          iconClass: "bg-sell",
        },
        {
          label: "Lệnh trong ngày",
          onClick: (event: any) => onAddDragMouseDown(event, "intradayorder"),
          iconClass: "bg-sell",
        },
      ],
    },
    {
      title: "Tài sản",
      items: [
        {
          label: "Số dư tiền",
          onClick: (event: any) => onAddDragMouseDown(event, "totalmonney"),
          iconClass: "bg-sell",
        },
      ],
    },
    {
        title: "Báo cáo",
        items: [
          {
            label: "Báo cáo tài sản",
            onClick: (event: any) => onAddDragMouseDown(event, "assetreport"),
            iconClass: "bg-sell",
          },
          {
            label: "Báo cáo tổng hợp số dư giao dịch",
            onClick: (event: any) => onAddDragMouseDown(event, "reporttransbalance"),
            iconClass: "bg-sell",
          },
          {
            label: "Báo cáo biến động tài sản ròng",
            onClick: (event: any) => onAddDragMouseDown(event, "reportNAV"),
            iconClass: "bg-sell",
          },
          {
            label: "Báo cáo tổng hợp giao dịch theo mã chứng khoán",
            onClick: (event: any) => onAddDragMouseDown(event, "reportprofitloss"),
            iconClass: "bg-sell",
          },
        ],
      },
  ];

  return (
    <main id="main-wrapper" className="relative w-full main-wrappers">
      <div className="custom-layout-page">
        <div className="relative flex justify-between items-center bg-secondary h-[28px]">
          {contents}
          <div className="flex items-center justify-end space-x-5 h-[100%] bg-explain w-56 pr-3 rounded-t ">
            <div className="list-widgets-container" data-headlessui-state>
              <div
                className="flex mt-2 dropdown-button md:mt-0 hover:text-color-highlight"
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
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
                    onClick={()=> setSTTMenu(!sttMenu)}
                >
                  <path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
                </svg>

                {/* <button className="toolbar_control" disabled={this.state.adding} style={{ marginLeft: 5 }} title="Add using Layout.addTabWithDragAndDropIndirect" onClick={this.onAddIndirectClick}>Add Indirect</button> */}
              </div>
              <div
                className="dropdown-dynamic-menu"
                style={{
                  display: sttMenu ? "block" : "none",
                }}
              >
                <div
                  className="flex items-center justify-between px-3 py-2 border-b border-invert"
                  role="none"
                >
                  <div className="relative" role="none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 16 16"
                      className="absolute m-auto inset-y-0 left-1.5 cursor-pointer"
                      height="16px"
                      width="16px"
                      xmlns="http://www.w3.org/2000/svg"
                      role="none"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        role="none"
                      />
                    </svg>
                    <input
                      className="input-search-widget"
                      placeholder="Tìm mục theo dõi"
                      role="none"
                    />
                  </div>
                  <div className="flex space-x-3" role="none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 512 512"
                      className="text-base cursor-pointer text-color-highlight hover:text-color-highlight"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      role="none"
                    >
                      <path
                        d="M48 82.7v346.7c0 19.1 15.5 34.7 34.7 34.7h346.7c19.1 0 34.7-15.5 34.7-34.7V82.7c0-19.1-15.5-34.7-34.7-34.7H82.7C63.5 48 48 63.5 48 82.7zm89.3 297.1c-13.1 1.7-24.1-9.3-22.4-22.4 1.1-8.9 8.3-16.1 17.2-17.2 13.1-1.7 24.1 9.3 22.4 22.4-1.1 8.9-8.3 16.1-17.2 17.2zm0-104c-13.1 1.7-24.1-9.3-22.4-22.4 1.1-8.9 8.3-16.1 17.2-17.2 13.1-1.7 24.1 9.3 22.4 22.4-1.1 8.9-8.3 16.1-17.2 17.2zm0-104c-13.1 1.7-24.1-9.3-22.4-22.4 1.1-8.9 8.3-16.1 17.2-17.2 13.1-1.7 24.1 9.3 22.4 22.4-1.1 8.9-8.3 16.1-17.2 17.2zM384.7 374h-180c-7.7 0-14-6.3-14-14s6.3-14 14-14h180c7.7 0 14 6.3 14 14s-6.3 14-14 14zm0-104h-180c-7.7 0-14-6.3-14-14s6.3-14 14-14h180c7.7 0 14 6.3 14 14s-6.3 14-14 14zm0-104h-180c-7.7 0-14-6.3-14-14s6.3-14 14-14h180c7.7 0 14 6.3 14 14s-6.3 14-14 14z"
                        role="none"
                      />
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 512 512"
                      className="text-base cursor-pointer hover:text-color-highlight"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      role="none"
                    >
                      <path
                        d="M457.6 140.2l-82.5-4-4.8-53.8c-1-11.3-11.1-19.2-22.9-18.3L51.5 88.4c-11.8 1-20.3 10.5-19.4 21.7l21.2 235.8c1 11.3 11.2 19.2 22.9 18.3l15-1.2-2.4 45.8c-.6 12.6 9.2 22.8 22.4 23.5L441.3 448c13.2.6 24.1-8.6 24.8-21.2L480 163.5c.6-12.5-9.3-22.7-22.4-23.3zm-354.9 5.3l-7.1 134.8L78.1 305 62 127v-.5-.5c1-5 4.4-9 9.6-9.4l261-21.4c5.2-.4 9.7 3 10.5 7.9 0 .2.3.2.3.4 0 .1.3.2.3.4l2.7 30.8-219-10.5c-13.2-.4-24.1 8.8-24.7 21.3zm334 236.9l-84.8-99.5-37.4 34.3-69.2-80.8-122.7 130.7L133 168v-.4c1-5.4 6.2-9.3 11.9-9l291.2 14c5.8.3 10.3 4.7 10.4 10.2 0 .2.3.3.3.5l-10.1 199.1z"
                        role="none"
                      />
                      <path
                        d="M384 256c17.6 0 32-14.4 32-32s-14.3-32-32-32c-17.6 0-32 14.3-32 32s14.3 32 32 32z"
                        role="none"
                      />
                    </svg>
                  </div>
                </div>

                <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-scroll list-widget">
                  {menuData.map((section) => (
                    <MenuSection key={section.title} {...section} />
                  ))}
                </div>
              </div>
            </div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 576 512"
              className="cursor-pointer hover:text-color-highlight"
              height="16px"
              width="16px"
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
              height="16px"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z" />
            </svg>
          </div>
        </div>
        <div className="layout-wrapper">
          {state.model !== null ? (
            <Layout
              ref={layoutRef}
              model={state.model}
              factory={factory}
              font={{ size: state.fontSize }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
};

export default MyLayouts;
