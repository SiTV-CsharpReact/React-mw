import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Form, FormControl, NavItem } from 'react-bootstrap';
import SettingTable from "./SettingTable";
import DateTime from "./DateTime";

import LineChart from "../../images/line-chart-32.png"
import { useAppDispatch } from "../../store/configureStore";
import { fetchTableBONDAsync, fetchTableHNX30Async, fetchTableHNXAsync } from "../tableMarketwat/tableSlice";
import ListMenuBar from "./ListMenuBar";
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
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between h-30 bg-headerMenuTableMarket relative">
      <div className="flex ">
      <ListMenuBar/>
        <div>
          <Tooltip title="Hiện đồ thị">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => callExpand("spExpand", "imgExpandOpen")}
            ></span>
          </Tooltip>
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
