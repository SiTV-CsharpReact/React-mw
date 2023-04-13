import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
// import { Navbar, Nav, Form, FormControl, NavItem } from 'react-bootstrap';
import SettingTable from "./SettingTable";
import DateTime from "./DateTime";

import LineChart from "../../images/line-chart-32.png"
import { useAppDispatch } from "../../store/configureStore";
import { fetchTableBONDAsync, fetchTableHNX30Async, fetchTableHNXAsync } from "../tableMarketwatch/tableSlice";
import ListMenuBar from "./ListMenuBar";
import { AppContext } from "../../Context/AppContext";
type Props ={
  windowHeight:number,
  heightOrderForm:number
  expand:number,
  heightPriceBoard:number  
  setExpand(expand: number): void;
  setHeightPriceBoard(heightPriceBoard: number): void
}
const showExpand =(value:Props)=>{
  if (value.expand === 27) {
    value.setExpand(67);
    value.setHeightPriceBoard(value.heightPriceBoard-40);
    console.log(value.heightPriceBoard)
  } else if (value.expand === 67) {
    value.setHeightPriceBoard(value.heightPriceBoard-107);
    value.setExpand(157);
  } else {
    value.setHeightPriceBoard(value.windowHeight - value.heightOrderForm-40 );
    value.setExpand(27);
  }
  
}
const MenuBarMW = () => {
  const height = useContext(AppContext)
  console.log(height)
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between h-30 bg-headerMenuTableMarket relative">
      <div className="flex ">
      <ListMenuBar/>
        {height.expand === 157 ?<div>  <Tooltip title="Ẩn đồ thị">
            <span
              id="spExpand"
              className="imgExpand"
              onClick={() => showExpand(height)}
            ></span>
          </Tooltip></div>:<div>
          <Tooltip title="Hiện đồ thị">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => showExpand(height)}
            ></span>
          </Tooltip>
        </div>}
        
        {/* <div>
          <Tooltip title="Hiện đồ thị">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => showExpand(height)}
            ></span>
          </Tooltip>
        </div> */}
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
