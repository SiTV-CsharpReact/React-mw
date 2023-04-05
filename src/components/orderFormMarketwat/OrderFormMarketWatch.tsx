import { memo, useState } from "react";
import "flowbite";
import React from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel, styled } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import TableTotalMonney from "./TableTotalMonney";

import './styleOrderForm.css'
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { decrement, increment } from "./counterSlice";
const OrderMarketW = () => {
  //const dispatch = useAppDispatch();
  //const {data} = useAppSelector(state => state.counter);
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  };
  const [counter1, setCounter1] = useState(0);

  const incrementCounter1 = () => {
    setCounter(counter + 1);
  };

  const decrementCounter1 = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  };
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const openPopupLanguage2 = Boolean(anchorEl2);
  const setHeight = (value:number) =>{
    return value /10 *5.7
  }
  const setHeightTable = (value:number) =>{
      return (value /10) * 4.3 - 46
  }

  const handleClick2 = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl2(event.currentTarget);
   const tableMarketWatch=   document.querySelectorAll<HTMLElement>(".table_market")
   for (let j = 0; j < tableMarketWatch.length; j++) {
     const elementChange = tableMarketWatch[j];
   if(tableMarketWatch[j]) elementChange.style.height="790px"
     // In ra danh sách các lớp của phần tử
  }
   //if(tableHNX) tableHNX.style.height="730px"
  };
  const handleCloseLanguage2 = () => {
    setAnchorEl2(null);
    const tableMarketWatch=   document.querySelectorAll<HTMLElement>(".table_market")
   for (let j = 0; j < tableMarketWatch.length; j++) {
     const elementChange = tableMarketWatch[j];
   if(tableMarketWatch[j]) elementChange.style.height="420px"
     // In ra danh sách các lớp của phần tử
  }
  };
  const [open2, setOpen2] = useState(false);
 

  return (
    <div className="bg-white text-black" id="tablepricelist">
     
      <div className="flex justify-between" >
        <div className=""></div>
        <div className=""></div>
        

      <div onClick={ handleClick2} id="divArrowBottomDown" style={{ display: !anchorEl2 ? "block" : "none" }}>
     < ArrowDropDownIcon className=" text-iconShowOrder" sx={{fontSize:45, marginBottom:"-20px",marginTop:"-20px"}}/>
        </div>
        
        <div style={{ display: !anchorEl2 ? "block" : "none" }} className="mt-1">
      <div className="panel__bottom__link flex justify-end mr-[40px]">
        
        <div className="group   px-2  ">
          <span className=" size-input hover-text-blue-L "> Lệnh chờ khớp</span>
        </div>
        <div className="group   px-2  ">
          <span className=" size-input hover-text-blue-L ">
            KQ khớp lệnh trong phiên
          </span>
        </div>
        <div className="group   px-2  ">
          <span className=" size-input hover-text-blue-L ">Lệnh trong ngày</span>
        </div>
      </div>
      </div>
      </div>
      <div style={{ display: !anchorEl2 ? "block" : "none" ,}} >
      <div className="inline-block BGTB w-full" >
        <TableTotalMonney/>
        {/* <div className="bottom-left pt-2 p-[20px] mr-[-30px] w-[48%] bg-[#dfeeff] mt-[20px] mb-[30px]  MBR pb-[6px]"> */}
        <div className="bottom-left float-left  mt-[18px] pt-1.5 pb-1 px-2 w-[48%]  MBR bg-[#dfeeff]">
          <div className="flex justify-between "> 
            <div className="btnSwitchBS">
              <div className="group-buysell flex w-1/5">
                <div
                  id="tabBuy"
                  className="tabBuy active bg-[#0055ba]"
                >
                  MUA
                </div>
                <div
                  id="tabSell"
                  className="tabSell normal-case "
                >
                  BÁN
                </div>
              </div>
            </div>
            <div className="btn__switchGroup text-right w-4/5">
              <div className="groupSwitch">
                <span>
                  Ghi lệnh chờ gửi: 
                </span>
                <label className="switch" id="switchLabelLCG">
        <input type="checkbox" id="ckGhiLenhChoGui" />
        <span className="slider round">
          <span className="on">Bật</span>
          <span className="off">Tắt</span>
        </span>
      </label>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-1">
            <div className="flex w-[90%] panelDatLenhThuong">
            <div className="inpStock pr-[15px] w-1/4">
              <div id="divStock">
                <span id="spnDivStock " className="p-[20px]"></span>
                <span className="spnClTLV hidden">
                  TLV:
                  <span className="spanTLV" id="spnTLV">
                    0
                  </span>
                  %
                </span>
                <input
                  className="form-control hidden"
                  type="text"
                  id="txtContactNo"
                ></input>
                <div
                  className="ms-ctn form-control border-[#cccccc] rounded-md

                  "
                  id="txtSymbolBase"
                >
                  <div className="ms-sel-ctn">
                    <input
                      type="text"
                      className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] mr-[14px] rounded-md pl-[8px]
                      p-[1px]
                       tttt

                      "
                      placeholder="Mã CK"
                      id="txtSymbol"
                      name="txtSymbol"
                      data-old=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="inpBalance text-center w-1/4">
              <div id="divMaxOrder ">
                <span className=" text-xs " id="fillMaxOrder">
                  Tối đa: <span id="spnMaxOrder"> 0</span>
                </span>
              </div>
              <div className="container-spinner fix-margin ">
                <input
                  type="text"
                  className="form-control OrderFormQuantity  size-input p-[2px] text-right w-[100%] p-[1px] pr-[25px] rounded-md

                  tttt 

                  "
                  placeholder="Khối lượng"
                  role="presentation"
                />
                <div className="spinner  right-[3px]" id="spinnerQuantity">
                  <button
                    type="button"
                    id="btnUpQty"
                    // onClick={() => dispatch(decrement(1))}
                    className="up button-spinner relative  text-[#d3d3d3] rounded-md 

                    "
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    id="btnDownQty"
                    // onClick={() => dispatch(increment(1))}
                    className="down button-spinner relative text-[#d3d3d3]"
                  >
                    ‹
                  </button>
                </div>
              </div>
            </div>
            <div className="divPrice pl-[15px] w-1/4">
              <div className="fix-position">
                <table className="mb-[-2px] w-full">
                  <tbody>
                    <tr>
                      <td>
                        <span
                          className="spnTran text-[#ef3eff] pl-[10px]  text-xs"
                          id="spnCeilPrice"
                        >
                          0
                        </span>
                      </td>
                      <td>
                        <span
                          className="spnThamChieu text-[#f26f21] pl-[15px]  text-xs"
                          id="spnRefPrice"
                        >
                          0
                        </span>
                      </td>
                      <td>
                        <span
                          className="spnSan text-[#00b8ff] pl-[15px]  text-xs"
                          id="spnFloorPrice"
                        >
                          0
                        </span>
                      </td>
                      <td>
                        <span
                          className="spnNum text-black pl-[15px] text-xs"
                          id="spnNum"
                        >
                          x1000
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="container-spinner fix-margin">
                <div className="ms-ctn form-control " id="txtPriceBase">
                  <div className="ms-sel-ctn">
                    <input
                      type="text"
                      className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] rounded-md p-[1px] tttt pl-[9px] "
                      placeholder="Giá"
                      id="txtPrice"
                    />
                  </div>
                </div>
                <div id="divAutoPrice"></div>
                <div className="spinner right-[3px]  " id="spinnerPrice ">
                  <button
                    type="button"
                    id="btnUpPrice"
                    onClick={() => incrementCounter1()}
                    className="up button-spinner relative  text-[#d3d3d3]"
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    id="btnDownPrice"
                    onClick={() => decrementCounter1()}
                    className="down button-spinner relative text-[#d3d3d3]"
                  >
                    ‹
                  </button>
                </div>
              </div>
            </div>
            <div className="tab-Buy w-1/4">
              <div className="h-[17px]"></div>
              <input
                id="btnBuySave"
                type="button"
                className="btn btnBuyGhi btnSaveTemplate hidden "
                value="Ghi"
              />
              <button
                id="btnBuySend"
                className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] ml-[10px]  text-13px rounded-md text-white w-4/5"
              >
                GỬI
              </button>

              {/* <input id="btnBuySend" type="button" className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] rounded-lg pl-10 pr-10 mt-[7px] ml-[15px]" value="Gửi"  /> */}
            </div>
          
          

              
            </div>
            <div className="divReset w-[10%]">
              <div className="h-[14px]"></div>
              <button className="refresh" id="btnReset">
                <img
                  className="mt-[2px] mr-[8px] ml-[10px] "
                  src="http://priceboard3.fpts.com.vn/images/EzFuture-05.png"
                />
                <span className="text-13px">Làm lại</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div  onClick={handleCloseLanguage2} id="divArrowBottomUp" style={{ display: anchorEl2 ? "block" : "none" }}>
            <span id="spnTitlePanelBottom" className="text-spnTitlePanelBottom cursor-pointer	text-xl font-normal	">ĐẶT LỆNH</span>
            <ArrowDropUpIcon className="text-5xl text-iconShowOrder  text-[#b3b3b3]" sx={{fontSize:45}}/>
            {/* <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root icon-spnTitlePanelBottom " focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropUpIcon"><path d="m7 14 5-5 5 5z"></path></svg> */}
        </div>
        <div id="draggableH" className="ui-draggable ui-draggable-handle" style={{ top: anchorEl2 ? "431px" : "263.469px",background : "transparent" }} ></div>  
          </div>
    
  );
};

export default OrderMarketW;
