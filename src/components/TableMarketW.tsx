import { useState } from "react";

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

  return (
    <div>
      <div className=" flex justify-end mr-[70px]">
        <div className="group  py-1 px-2  ">
          <span className=" text-sm hover-text-blue ">
            {" "}
            Lệnh chờ khớp
          </span>
        </div>
        <div className="group  py-1 px-2  ">
          <span className=" text-sm hover-text-blue ">
            KQ khớp lệnh trong phiên
          </span>
        </div>
        <div className="group  py-1 px-2  ">
          <span className=" text-sm hover-text-blue ">
            Lệnh trong ngày
          </span>
        </div>
      </div>
      <div className="flex BGTB">
        <div className="bottom__sdTien mr-[2%]  mt-[20px] SDTM ">
          <div className="bottom__sdTien__title bg-[#b3b3b3] h-[25px] ">
            <span className="pl-[9px] pr-[9px] text-[#0055ba]">Số dư tiền</span>
            <i
              title="Cập nhật số dư tiền"
              className="glyphicon glyphicon-refresh"
              id="spnRefreshDataCookieTien"
            ></i>
          </div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between text-sm	">
            <span className="">Số dư tiền mặt:</span>
            <span className="font-bold">-2,200,000</span>
          </div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between text-sm	">
            <span className="">Tiền ứng trước</span>

            <span className="font-bold">0</span>
          </div>
          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between text-sm	">
            <span className="">Tiền cho FPTS vay</span>

            <span className="tt-t font-bold">0</span>
          </div>

          <div className="bottom__sdTien__title  h-[25px] pl-[9px] pr-[9px]  flex justify-between	text-sm	">
            <span className="">Số dư có thể giao dịch:</span>
            <span className="font-bold">-2,200,000</span>
          </div>
        </div>
        <div className="bottom-left pt-2 pb-2 pl-6 pr-6 mr-[-30px] w-[700px] bg-[#dfeeff] mt-[20px] mb-[30px]  MBR">
          <div className="flex justify-between ">
            <div className="btnSwitchBS">
              <div className="group-buysell flex">
                <div
                  id="tabBuy"
                  className="tabBuy active bg-[#0055ba] cursor-default border-black p-[6px] text-[#fff]"
                >
                  MUA
                </div>
                <div
                  id="tabSell"
                  className="tabSell normal-case p-[6px] bg-[#b3b3b3] text-[#fff]"
                >
                  BÁN
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer mr-[10px] text-sm tttt"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Ghi lệnh chờ gửi:
                </label>
              </div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
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
                  className="ms-ctn form-control border-[#cccccc] rounded-lg "
                  id="txtSymbolBase"
                >
                  <div className="ms-sel-ctn">
                    <input
                      type="text"
                      className="form-control ui-autocomplete-input w-[120px] rounded-lg p-[2px] tttt

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
              <div className="container-spinner fix-margin">
                <input
                  type="text"
                  className="form-control OrderFormQuantity  text-right w-[130px] rounded-md p-[2px] tttt

                  "
                  placeholder="Khối lượng"
                  role="presentation"
                />
                <div
                  className="spinner block absolute right-[3px]"
                  id="spinnerQuantity"
                >
                  <button
                    type="button"
                    id="btnUpQty"
                    onClick={() => incrementCounter()}
                    className="up button-spinner origin-top relative text-[#d3d3d3] rounded-md 

                    "
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    id="btnDownQty"
                    onClick={() => decrementCounter()}
                    className="down button-spinner origin-top relative text-[#d3d3d3]"
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
                          className="spnThamChieu text-[#f26f21] pl-[30px]  text-xs"
                          id="spnRefPrice"
                        >
                          0
                        </span>
                      </td>
                      <td>
                        <span
                          className="spnSan text-[#f26f21] pl-[30px]  text-xs"
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
                      className="form-control ui-autocomplete-input w-[150px] rounded-md p-[2px] tttt"
                      placeholder="Giá"
                      id="txtPrice"
                    />
                  </div>
                </div>
                <div id="divAutoPrice"></div>
                <div
                  className="spinner  absolute right-[3px]"
                  id="spinnerPrice "
                >
                  <button
                    type="button"
                    id="btnUpPrice"
                    onClick={() => decrementCounter1()}
                    className="up button-spinner origin-top relative text-[#d3d3d3]"
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    id="btnDownPrice"
                    onClick={() => decrementCounter1()}
                    className="down button-spinner origin-top relative text-[#d3d3d3]"
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
                className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] rounded-lg pl-12 pr-12 pb-[5px] mt-[5px] ml-[15px] text-white"
              >
                Gửi
              </button>

              {/* <input id="btnBuySend" type="button" className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] rounded-lg pl-10 pr-10 mt-[7px] ml-[15px]" value="Gửi"  /> */}
            </div>
            <div className="divReset">
              <div className="h-[14px]"></div>
              <button
                id="btnReset"
                className="btn btnBuyGui btnSaveTemplate bg-white rounded-lg pl-2 pr-2 mt-[7px] pb-[6px] ml-[15px] pd-[5px] flex justify-between tttt"
              >
                <img
                  className="w-[15px] mt-[9px] mr-[10px]"
                  src="http://priceboard3.fpts.com.vn/images/EzFuture-05.png"
                  alt=""
                />
                <span className="mt-[3px] text-sm">Làm lại</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableMarketW;
