import { Button, DialogContentText, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { formatNumberMarket, fStatusMarketHNX, fStatusMarketUPCOM, tinhGiaCT, tinhGiaTC } from "../../utils/util";
import { NavLink } from "react-router-dom";
import { g_CLASS_INDEX } from "../../configs/app.config";
import SettingTable from "./SettingTable";
import DateTime from "./DateTime";
import LineChart from "../../images/line-chart-32.png"
import { useAppDispatch } from "../../store/configureStore";
import { fetchTableBONDAsync, fetchTableHNX30Async, fetchTableHNXAsync } from "../tableMarketwat/tableSlice";
let stateIndex = 0;
const callExpand = (id: string, hideClass: string) => {
  const divIndex = document.getElementById("divIndexChart");
  const spExpand = document.getElementById("spExpand");
  var charts = document.querySelectorAll(".chart3d");
  if (spExpand?.className === "imgExpand") {
    spExpand.className = "imgExpandOpen";
    for (var i = 0; i < charts.length; i++) {
      charts[i].classList.add("hidden");
    }
    if (divIndex) divIndex.style.maxHeight = "";
    stateIndex = 0;
  } else {
    if (stateIndex === 0) {
      if (divIndex) divIndex.style.maxHeight = "67px";
      //divIndex.className = CLASS_EXPAND_OPEN;
    } else if (stateIndex === 1) {
      if (spExpand) spExpand.className = "imgExpand";
      if (divIndex) divIndex.style.maxHeight = "unset";
      for (var i = 0; i < charts.length; i++) {
        charts[i].classList.remove("hidden");
        charts[i].classList.add("block");
      }
      //divIndex.className = CLASS_EXPAND_OPEN;
    }
    stateIndex++;
  }
};


type MenuItem = {
  label: string;
  path: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    label: 'HNX',
    path: '/HNX',
    children: [
      {
        label: 'HNX',
        path: '/HNX',
      },
      {
        label: 'Our History',
        path: '/about/history',
      },
    ],
  },
  {
    label: 'About',
    path: '/about',
    children: [
      {
        label: 'Our Team',
        path: '/about/team',
      },
      {
        label: 'Our History',
        path: '/about/history',
      },
    ],
  },
  {
    label: 'Contact',
    path: '/contact',
    children: [
      {
        label: 'Our Team',
        path: '/about/team',
      },
      {
        label: 'Our History',
        path: '/about/history',
      },
    ],
  },
];

const MenuBarMW = () => {
  const dispatch = useAppDispatch();
  // const [open, setOpen] = React.useState(false);
  // const [stockData, setStockData] = useState([]);
  // const [weatherData, setWeatherData] = useState([]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
   
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex justify-between h-30 bg-headerMenuTableMarket relative">
      <div className="flex ">
        <div className="group list-sub-menu">
        {/* <div className={ `group list-sub-menu isActive ? "active" : ""`}> */}
          <span className="uppercase text-13px ">HNX </span>
          <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
            <li>
              <NavLink
                to="/HNX"
                onClick={() => dispatch(fetchTableHNXAsync())}
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                HNX
              </NavLink>
              {/* <span className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white "
                onClick={() => dispatch(fetchTableHNXAsync())}>HNX</span> */}
            </li>
            <li>
            <NavLink to="/HNX30" className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white "
              >HNX30</NavLink>
            </li>
            <li>
            <NavLink to="/BOND"  className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white "
                onClick={() => dispatch(fetchTableBONDAsync())}>BOND</NavLink>
            </li>
            <li>
              <Link
                to="/thoa-thuan-hnx"
                // onClick={() => dispatch(fetchBasketAsync())}
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white "
              >
                Giao dịch thỏa thuận
              </Link>
            </li>
            {/* <li>
              <span className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white "
                onClick={() => dispatch(fetchTableHSXAsync())}>HSX</span>
            </li>
            <li>
              <span className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white "
                onClick={() => dispatch(fetchTableHNXAsync())}>HNX</span>
            </li> */}
          </ul>
        </div>

        <div className="group list-sub-menu">
          {/* <span className="  uppercase text-13px ">HOSE</span> */}
          <span className="  uppercase text-13px ">HOSE</span>
          <ul className="absolute hidden text-gray-700 group-hover:block z-50 sub-menu ">
            <li>
              <NavLink
                to="/VNI"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VN30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VN30
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/BOND"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                BOND
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/thoa-thuan-hsx"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
              Giao dịch thỏa thuận
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VNXALL"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNXALL
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VN100"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VN100
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VNALL"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNALL
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VNMID"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
              VNMID
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VNSML"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
            VNSML
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="group list-sub-menu">
          <span className="  uppercase text-13px ">UPCOM</span>
          <ul className="absolute hidden text-gray-700 group-hover:block z-50 sub-menu">
            <li>
              <Link
                to="/UPCOM"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                UPCOM
              </Link>
            </li>
            <li>
              <Link
                to="/thoa-thuan-upcom"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                  Giao dịch thỏa thuận
              </Link>
            </li>
          </ul>
        </div>
        <div className="group list-sub-menu">
          <span className="text-13px ">Ngành</span>
          <ul className="absolute hidden text-gray-70 group-hover:block z-50 sub-menu">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group list-sub-menu">
          <span className="text-13px ">Thống kê</span>
          <ul className="absolute hidden text-gray-700 group-hover:block z-50 sub-menu">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group list-sub-menu">
          <span className="text-13px ">Chứng quyền</span>
          <ul className="absolute hidden text-gray-700 group-hover:block z-50 sub-menu">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group list-sub-menu">
          <span className="text-13px ">Danh mục</span>
          <ul className="absolute hidden text-gray-700 group-hover:block z-50  sub-menu">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Tooltip title="Hiện đồ thị">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => callExpand("spExpand", "imgExpandOpen")}
            ></span>
          </Tooltip>
          {/* <Tooltip title="Hiện đồ thị">
          <span id="spExpand" className="imgExpandClose" onClick={()=>callExpand("spExpand","imgExpandOpen")}></span>
        </Tooltip> */}
        </div>
      </div>
      {/* <nav>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {menuItems.map((item: MenuItem, index: number) => (
          <li
            key={index}
            style={{ position: 'relative', display: 'inline-block', margin: '0 1rem' }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="list-sub-menu"
          >
            <Link
              to={item.path}
              style={{ display: 'block', padding: '0.25rem', textDecoration: 'none', color: '#333' }}
            >
              {item.label}
            </Link>
            {item.children && (
              <ul
                style={{
                  display: activeIndex === index ? 'block' : 'none',
                  listStyleType: 'none',
                  margin: 0,
                  padding: 0,
                  backgroundColor: '#f5f5f5',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 1000
                }}
                className="sub-menu"
              >
                {item.children.map((child: MenuItem, childIndex: number) => (
                  <li key={childIndex} style={{ margin: 0 }}>
                    <Link
                      to={child.path}
                      style={{ display: 'block', padding: '0.5rem', textDecoration: 'none', color: '#333' }}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav> */}
      <div className="flex">
        <div>
          <Tooltip title="Đồ thị">
            <button className="btn btn-sm btn-chart">
            <img src={LineChart} width={20} height={20} alt="" />
              {/* <InsertChartIcon style={{ fontSize: 30, marginRight: 10 }} /> */}
            </button>
          </Tooltip>
        </div>
        <SettingTable/>
        <DateTime/>
    
        <div className="px-1">
          <Tooltip title="Hướng dẫn sử dụng">
            <input
              className="imgHelp"
              type="button"
              id="btHelp"
              data-toggle="modal"
              data-target="#mdHelp"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MenuBarMW;
