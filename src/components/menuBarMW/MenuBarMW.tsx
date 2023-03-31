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
const MenuBarMW = () => {
  const [open, setOpen] = React.useState(false);
  const [stockData, setStockData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div className="flex justify-between h-30 bg-headerMenuTableMarket relative">
      <div className="flex ">
        <div className="group bg-activeListMarketWatch inline-block py-1 px-1   border-r border-black rounded-t cursor-pointer">
          <span className="uppercase text-13px ">HNX </span>
          <ul className="absolute hidden text-black pt-1.5 group-hover:block z-40">
            <li>
              <NavLink
                to="/"
                
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                HNX
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketwatch-hnx30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                HNX30
              </NavLink>
            </li>
            <li>
              <Link
                to="/"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                BOND
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  border-b border-bdListMarketWatch text-white rounded-b"
              >
                Giao dịch thỏa thuận
              </Link>
            </li>
          </ul>
        </div>

        <div className="group inline-block py-1 px-1  border-r border-black bg-hoverKL rounded-t cursor-pointer">
          {/* <span className="  uppercase text-13px ">HOSE</span> */}
          <span className="  uppercase text-13px ">HOSE</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <NavLink
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VN30
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                BOND
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
              Giao dịch thỏa thuận
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-1 px-1  border-r border-black bg-hoverKL rounded-t cursor-pointer">
          <span className="  uppercase text-13px ">UPCOM</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
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
        <div className="group inline-block py-1 px-1  border-r border-black bg-hoverKL rounded-t cursor-pointer">
          <span className="text-13px ">Ngành</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
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
        <div className="group inline-block py-1 px-1  border-r border-black bg-hoverKL rounded-t cursor-pointer">
          <span className="text-13px ">Thống kê</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
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
        <div className="group inline-block py-1 px-1  border-r border-black bg-hoverKL rounded-t cursor-pointer">
          <span className="text-13px ">Chứng quyền</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
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
        <div className="group inline-block py-1 px-1  border-r border-black bg-hoverKL rounded-t cursor-pointer">
          <span className="text-13px ">Danh mục</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
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
