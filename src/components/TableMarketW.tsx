import { useState } from "react";
import "flowbite";
import React from "react";


const TableMarketW = () => {
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
  
  const handleClick2 = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseLanguage2 = () => {
    setAnchorEl2(null);
  };
  const [open2, setOpen2] = useState(false);
  return (
    <div className="">
     
      <div className="flex justify-between">
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>

      <div onClick={ handleClick2} id="divArrowBottomDown" style={{ display: !anchorEl2 ? "block" : "none" }}>
      <svg  id="spanArrowDown"  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root spanArrowDown" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="m7 10 5 5 5-5z"></path></svg>
        </div>
        
        <div style={{ display: !anchorEl2 ? "block" : "none" }}>
      <div className="panel__bottom__link flex justify-end mr-[40px]">
        
        <div className="group   px-2  ">
          <span className=" text-sm hover-text-blue-L "> Lệnh chờ khớp</span>
        </div>
        <div className="group   px-2  ">
          <span className=" text-sm hover-text-blue-L ">
            KQ khớp lệnh trong phiên
          </span>
        </div>
        <div className="group   px-2  ">
          <span className=" text-sm hover-text-blue-L ">Lệnh trong ngày</span>
        </div>
      </div>
      </div>
      </div>
      <div style={{ display: !anchorEl2 ? "block" : "none" }} >
      <div className="flex BGTB" >
        <div className="bottom__sdTien mr-[2%]  mt-[20px] SDTM ">
          <div className="bottom__sdTien__title bg-[#b3b3b3] h-[25px] ">
            <span className="pl-[9px] pr-[9px] text-[#0055ba] uppercase">
              Số dư tiền
            </span>
            <i
              title="Cập nhật số dư tiền"
              className="glyphicon glyphicon-refresh"
              id="spnRefreshDataCookieTien"
            ></i>
          </div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between text-sm	">
            <span className="">Số dư tiền mặt:</span>
            <span className="font-medium">-2,200,000</span>
          </div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between text-sm	">
            <span className="">Tiền ứng trước</span>

            <span className="font-medium">0</span>
          </div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between text-sm	">
            <span className="">Tiền cho FPTS vay</span>

            <span className=" font-medium">0</span>
          </div>
           <div className="tt-t"></div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between	text-sm	">
            <span className="">Số dư có thể giao dịch:</span>
            <span className="font-medium">-2,200,000</span>
          </div>
        </div>
        <div className="bottom-left pt-2 p-[20px] mr-[-30px] w-[48%] bg-[#dfeeff] mt-[20px] mb-[30px]  MBR">
          <div className="flex justify-between ">
            <div className="btnSwitchBS">
              <div className="group-buysell flex">
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
            <div className="flex justify-center">
              <div>
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer  mr-[10px] text-sm "
                  htmlFor="flexSwitchCheckDefault"
                >
                  Ghi lệnh chờ gửi:
                </label>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="row bottom1 mb-4"></div>
            <div className="row bottom2 mt-2"></div>
            <div className="inpStock pr-[15px]">
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
                      className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] mr-[14px] rounded-md pl-[6px]
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
            <div className="inpBalance text-center">
              <div id="divMaxOrder ">
                <span className=" text-xs " id="fillMaxOrder">
                  Tối đa: <span id="spnMaxOrder">0</span>
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
                    onClick={() => incrementCounter()}
                    className="up button-spinner relative  text-[#d3d3d3] rounded-md 

                    "
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    id="btnDownQty"
                    onClick={() => decrementCounter()}
                    className="down button-spinner relative text-[#d3d3d3]"
                  >
                    ‹
                  </button>
                </div>
              </div>
            </div>
            <div className="divPrice pl-[15px]">
              <div className="fix-position">
                <table className="mb-[-2px]">
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
                          className="spnThamChieu text-[#f26f21] pl-[20px]  text-xs"
                          id="spnRefPrice"
                        >
                          0
                        </span>
                      </td>
                      <td>
                        <span
                          className="spnSan text-[#f26f21] pl-[20px]  text-xs"
                          id="spnFloorPrice"
                        >
                          0
                        </span>
                      </td>
                      <td>
                        <span
                          className="spnNum text-black pl-[20px] text-xs"
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
            <div className="tab-Buy">
              <div className="h-[17px]"></div>
              <input
                id="btnBuySave"
                type="button"
                className="btn btnBuyGhi btnSaveTemplate hidden"
                value="Ghi"
              />
              <button
                id="btnBuySend"
                className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] ml-[10px]  size-li rounded-md text-white"
              >
                Gửi
              </button>

              {/* <input id="btnBuySend" type="button" className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] rounded-lg pl-10 pr-10 mt-[7px] ml-[15px]" value="Gửi"  /> */}
            </div>
            <div className="divReset">
              <div className="h-[14px]"></div>

              <button className="refresh" id="btnReset">
                <img
                  className="mt-[4px] mr-[8px] ml-[10px] "
                  src="http://priceboard3.fpts.com.vn/images/EzFuture-05.png"
                />
                <span className="size-li ">Làm lại</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div  onClick={handleCloseLanguage2} id="divArrowBottomUp" style={{ display: anchorEl2 ? "block" : "none" }}>
            <span id="spnTitlePanelBottom" className="text-spnTitlePanelBottom cursor-pointer	text-xl font-normal	">ĐẶT LỆNH</span>
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root icon-spnTitlePanelBottom " focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropUpIcon"><path d="m7 14 5-5 5 5z"></path></svg>
        </div>
    </div>
    
  );
};

export default TableMarketW;
