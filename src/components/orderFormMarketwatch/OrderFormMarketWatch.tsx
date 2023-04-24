import { memo, useContext, useState } from "react";
import "flowbite";
import React from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel, styled } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import TableTotalMonney from "./TableTotalMonney";
import './styleOrderForm.scss'
import IconNext from "../../images/icon-next.png";
import { RootState, useAppDispatch, useAppSelector } from "../../store/configureStore";
import { decrement, increment } from "./counterSlice";
import StockBalance from "./StockBalance";
import RecordPending from "./RecordPending";
import { AppContext } from "../../Context/AppContext";
import { useSelector } from "react-redux";
type Props ={
  windowHeight:number,
  heightOrderForm:number
  expand:number,
  heightPriceBoard:number  
  setExpand(expand: number): void;
  setHeightPriceBoard(heightPriceBoard: number): void
}
const OrderMarketW = () => {
  const height = useContext(AppContext)
  const hideShowOrderForm = useSelector(
    (state: RootState) => state.layoutmarketwatch.orderForm
  );
  console.log(hideShowOrderForm)
  console.log(height)
  // color mua ban
  const [color, setColor] = useState(true);
  // ghi lenh cho gui
  const [order, setOrder] = useState(true);
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

  const handleClick2 = (event: React.MouseEvent<HTMLDivElement>) => {
    height.setHeightPriceBoard(height.windowHeight-40)
    console.log(height)
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseLanguage2 = () => {
    height.setHeightPriceBoard(height.windowHeight-height.heightOrderFormFix -40)
    console.log(height)
    setAnchorEl2(null);

  };
  const toggleOrder = () => {
    setOrder(!order);
  };
  //  const showBuy =() => setColor(true);
  //  const showSell =() => setColor(false);
  return (
    <div className="bg-white text-black" id="tablepricelist">
     

      {/* đặt lệnh */}
      <div className={`panel-bottom pb-5` } style={{height:height.heightOrderForm-40}} >
      <div className={`inline-block BGTB w-full ${order ? "":"relative"}`} >
      {color ?    <TableTotalMonney status={order} /> : <StockBalance status={order}/>}
        {/* <TableTotalMonney />
        <StockBalance/> */}
        {/* <div className="bottom-left pt-2 p-[20px] mr-[-30px] w-[48%] bg-[#dfeeff] mt-[20px] mb-[30px]  MBR pb-[6px]"> */}
        <div className={`bottom-left float-left min-w-[680px] pt-1.5 pb-1 px-2 ${order ? "w-[48%]":"ml-[25px] w-[44%]"}  MBR ${color ? 'bg-[#dfeeff]' :'bg-[#FCE0E1]'}`}>
          <div className="flex justify-between "> 
            <div className="btnSwitchBS">
              <div className="group-buysell flex w-1/5">
                <div
                  id="tabBuy"
                  className={`tabBuy ${color ? 'active' :''}`}
                  // className="tabBuy bg-[#0055ba]"
                  onClick={()=> setColor(true)}
                >
                  MUA
                </div>
                <div
                  id="tabSell"
                  className={`tabSell normal-case ${color ? '' :'active'}`}
                  // className="tabSell normal-case "
                  onClick={()=> setColor(false)}
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
        <input type="checkbox" id="ckGhiLenhChoGui" 
        onClick={toggleOrder}
        />
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
                      className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] mr-[14px] rounded-md pl-[8px]  "
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
                  className="form-control OrderFormQuantity  size-input text-right w-[100%] p-[1px] pr-[25px] rounded-md"
                  placeholder="Khối lượng"
                  role="presentation"
                />
                <div className="spinner  right-[3px]" id="spinnerQuantity">
                  <button
                    type="button"
                    id="btnUpQty"
                    // onClick={() => dispatch(decrement(1))}
                    className="up button-spinner relative  text-[#d3d3d3] rounded-md"
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
              {color? <button
                id="btnBuySend"
                className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] ml-[10px]  text-13px rounded-md text-white w-4/5"
              >
                GỬI
              </button>:<button
                id="btnBuySend"
                className="btn btnBuyGui btnSaveTemplate bg-[#d71920] ml-[10px]  text-13px rounded-md text-white w-4/5"
              >
                GỬI
              </button>}
              {/* <input
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
              </button> */}

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
        {order? <></>:  <div className="bottom-center"><img src={IconNext}></img></div>}
        {order? <></>:  <RecordPending/>}
      
      </div>
      </div>
      
        {/* <div id="draggableH" className="ui-draggable ui-draggable-handle" style={{ top: anchorEl2 ? "431px" : "263.469px",background : "transparent" }} ></div>   */}
          </div>
    
  );
};

export default OrderMarketW;
