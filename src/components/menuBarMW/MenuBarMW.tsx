import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
// import { Navbar, Nav, Form, FormControl, NavItem } from 'react-bootstrap';
import SettingTable from "./SettingTable";
import DateTime from "./DateTime";

import LineChart from "../../images/line-chart-32.png"
import { RootState, useAppDispatch } from "../../store/configureStore";
import { fetchTableBONDAsync, fetchTableHNX30Async, fetchTableHNXAsync } from "../tableMarketwatch/tableSlice";
import ListMenuBar from "./ListMenuBar";
import { AppContext } from "../../Context/AppContext";
import DanhMuc from "./DanhMuc";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "./menuSlice";
import { setHeightExpand } from "../layoutMarketwatch/LayoutMarketWatchSLice";
type Props ={
  windowHeight:number,
  heightOrderForm:number
  expand:number,
  heightPriceBoard:number  
  setExpand(expand: number): void;
  setHeightPriceBoard(heightPriceBoard: number): void
}
// const showExpand =(value:Props)=>{
//   if (value.expand === 27) {
//     value.setExpand(67);
//     //value.setHeightPriceBoard(value.heightPriceBoard-40);
//     console.log(value.heightPriceBoard)
//   } else if (value.expand === 67) {
//     //value.setHeightPriceBoard(value.heightPriceBoard-107);
//     value.setExpand(157);
//   } else {
//     //value.setHeightPriceBoard(value.windowHeight - value.heightOrderForm-40 );
//     value.setExpand(27);
//   }
  
// }
const MenuBarMW = () => {
 
  //const height = useContext(AppContext);
  const dispatch = useAppDispatch();
  const heightIndex = useSelector(   (state: RootState) => state.layoutmarketwatch.heightExpand);
  //console.log(heightIndex)
  const showChart = () => {
    dispatch(setVisible(false));
  };
  return (
    <div className="flex justify-between h-30 bg-headerMenuTableMarket relative">
      <div className="flex ">
      <ListMenuBar/>
      <DanhMuc/>
      
        {heightIndex === 169 ?
        <div><Tooltip title="Ẩn đồ thị">
            <span
              id="spExpand"
              className="imgExpand"
              onClick={() => dispatch(setHeightExpand(27))}
            ></span>
          </Tooltip></div>
          :heightIndex === 67 ?
          <div>
          <Tooltip title="Hiện đồ thị">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => dispatch(setHeightExpand(169))}
            ></span>
          </Tooltip>
        </div>
          :<div>
          <Tooltip title="Hiện thị index">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => dispatch(setHeightExpand(67))}
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
            <button className="btn btn-sm btn-chart" onClick={showChart}>
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
