import { memo, useContext, useEffect, useState } from "react";
import "flowbite";
import React from "react";
import Switch from "@mui/material/Switch";
// import { AiOutlineLoading3Quarters, AiFillCloseCircle, AiOutlineKey, AiOutlineUnorderedList } from 'react-icons/ai';
import { FormControlLabel, styled } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TableTotalMonney from "./TableTotalMonney";
import "./styleOrderForm.scss";
import IconNext from "../../images/icon-next.png";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
import StockBalance from "./StockBalance";
import RecordPending from "./RecordPending";
import { AppContext } from "../../Context/AppContext";
import { useSelector } from "react-redux";
import axios from "axios";
import * as yup from "yup";
import { formatNumber } from "../../utils/util";
import Protal from "./Portol";
import { useTranslation } from "react-i18next";
type Props = {
  windowHeight: number;
  heightOrderForm: number;
  expand: number;
  heightPriceBoard: number;
  setExpand(expand: number): void;
  setHeightPriceBoard(heightPriceBoard: number): void;
};
const OrderMarketW = () => {
  const { t } = useTranslation(["home"]);
  // color mua ban
  const [color, setColor] = useState(true);
  const [valueInput, setValueInput] = useState<string>("");
  const [valueInputPrice, setValueInputPrice] = useState<number>(0);
  const [valueInputKl, setValueInputKl] = useState<number>(0);
  const [gdSuccess, setGdSuccess] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [dataCheck, setDataCheck] = useState(false);
  const [success, setSuccess] = useState("");
  // ghi lenh cho gui
  const [order, setOrder] = useState(true);
  //const dispatch = useAppDispatch();
  //const {data} = useAppSelector(state => state.counter);
  const [counter, setCounter] = useState(0);
  const { dataTable } = useAppSelector((state) => state.dataTable);
  const { dataBuy } = useAppSelector((state) => state.dataBuy);
  const { dataShow } = useAppSelector((state) => state.dataShow);

  // popup
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    if (dataTable.key && dataTable) {
      setColor(false);
    }
  }, [dataTable,dataBuy]);

  useEffect(() => {
    if (dataBuy.key && dataBuy) {
      setColor(true);
    }
  }, [dataBuy,dataTable]);

  const incrementCounter = () => {
    setValueInputKl(valueInputKl + 100);
  };

  const decrementCounter = () => {
    if (valueInputKl !== 0) {
      setValueInputKl(valueInputKl - 100);
    }
  };
  const incrementCounter1 = () => {
    setValueInputPrice(valueInputPrice + 1);
  };

  const decrementCounter1 = () => {
    if (valueInputPrice !== 0) {
      setValueInputPrice(valueInputPrice - 1);
    }
  };
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const openPopupLanguage2 = Boolean(anchorEl2);

  // const handleClick2 = (event: React.MouseEvent<HTMLDivElement>) => {
  //   height.setHeightPriceBoard(height.windowHeight-40)
  //   console.log(height)
  //   setAnchorEl2(event.currentTarget);
  // };
  // const handleCloseLanguage2 = () => {
  //   height.setHeightPriceBoard(height.windowHeight-height.heightOrderFormFix -40)
  //   console.log(height)
  //   setAnchorEl2(null);

  // };
  const toggleOrder = () => {
    setOrder(!order);
  };

  const dataOrder: string[] = [
    "AAV - HNX.NY - Công ty Cổ phần AAV Group",
    "ADC - HNX.NY - Công ty Cổ phần Mỹ thuật và Truyền Thông",
    "ALT - HNX.NY - Công ty Cổ phần Văn hóa Tân Bình",
    "AMC - HNX.NY - Công ty Cổ phần Khoáng Sản Á Châu",
    "AME - HNX.NY - Công ty Cổ phần Alphanam E&C",
    "AMV - HNX.NY - Công ty Cổ phần Sản xuất kinh doanh dược và trang thiết bị Y tế Việt Mỹ",
    "API - HNX.NY - Công ty Cổ phần Đầu tư Châu Á - Thái Bình Dương",
    "APS - HNX.NY - Công ty Cổ phần Chứng khoán Châu Á Thái Bình Dương",
    "ARM - HNX.NY - Công ty Cổ phần Xuất nhập khẩu Hàng không",
  ];

  const handelInputChangePrice = (e: any) => {
    const value = e.target.value;
    setValueInputPrice(value.toUpperCase());
  };
  const handelInputChangeKl = (e: any) => {
    const value = e.target.value;
    setValueInputKl(value.toUpperCase());
  };

  // const handelCheck = () => {
  //   const item : any = dataOrder.map((item,index) => item.split("-"));
  //   setValueInput(item[0][0])
  //   console.log("item",item[0])
  // }
  const handelSuccess = (e: any) => {
    e.preventDefault();
    if (!success) {
      alert("Quý khách chưa nhập mật khẩu giao dịch ");
    } else {
      setGdSuccess(true);
      setTimeout(() => {
        setSubmit(false);
        setValueInput("");
        setValueInputPrice(0);
        setValueInputKl(0);
      }, 3000);
    }
  };
  const validationSchema = yup.object().shape({
    txtSymbol: yup.string().required( `${t("home:menu.CHECK_VLN")} ${t("home:Order.ORDER_MCK")} ` ),
  });
  const validationSchemaPrice = yup.object().shape({
    txtSymbol: yup.number().min(1).required( `"${t("home:menu.CHECK_VLN")} ${t("home:Order.ORDER_MCK")}"`),
  });
  const validationSchemaKl = yup.object().shape({
    txtSymbol: yup.number().min(1).required( `"${t("home:menu.CHECK_VLN")} ${t("home:Order.ORDER_MKL")}"`),
  });
  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      await validationSchema.validate({
        txtSymbol: valueInput || dataShow.San || dataTable.ma || dataBuy.ma,
      });
    } catch (error: any) {
      alert("Chưa nhập Mã chứng khoán");
      return false;
    }
    try {
      await validationSchemaKl.validate({ txtSymbol: valueInputKl });
    } catch (error) {
      alert("Chưa nhập Khối lượng");
      return;
    }
    try {
      await validationSchemaPrice.validate({
        txtSymbol: valueInputPrice || dataBuy.price || dataTable.price,
      });
    } catch (error) {
      alert("Chưa nhập Giá");
      return;
    }
    setSubmit(!submit);
  };

  const handelInputChange = (e: any) => {
    const value = e.target.value;
    setValueInput(value.toUpperCase());
    const results: any = dataOrder.filter((item) =>
      item.toUpperCase().includes(value)
    );
    setSearchResults(results);
    setShowResults(value !== "");
  };
  const handelPopup = () => {
    setPopup(!popup);
  };
  return (
    <div className="text-black bg-white" id="tablepricelist">
      {/* đặt lệnh */}
      <Protal popup={popup} handelClosed={() => setPopup(!popup)}></Protal>
      <div className="pb-5 panel-bottom">
        <div className={`inline-block BGTB w-full ${order ? "" : "relative"}`}>
          {color ? (
            <TableTotalMonney status={order} />
          ) : (
            <StockBalance status={order} />
          )}
          {/* <TableTotalMonney />
        <StockBalance/> */}
          {/* <div className="bottom-left pt-2 p-[20px] mr-[-30px] w-[48%] bg-[#dfeeff] mt-[20px] mb-[30px]  MBR pb-[6px]"> */}
          <div
            className={`bottom-left float-left min-w-[680px] pt-1.5 pb-1 px-2 ${
              order ? "w-[48%]" : "ml-[25px] w-[44%]"
            }  MBR ${color ? "bg-[#dfeeff]" : "bg-[#FCE0E1]"}`}
          >
            <div className="relative flex justify-between">
              <div className="btnSwitchBS">
                <div className="flex group-buysell">
                  <div
                    id="tabBuy"
                    className={`tabBuy ${color ? "active" : ""}`}
                    // className="tabBuy bg-[#0055ba]"
                    onClick={() => setColor(true)}
                  >
                    {t("home:Order.ORDER_MUA")}
                  </div>
                  <div
                    id="tabSell"
                    className={`tabSell normal-case ${color ? "" : "active"}`}
                    // className="normal-case tabSell "
                    onClick={() => setColor(false)}
                  >
                    {t("home:Order.ORDER_BAN")} 
                  </div>

                  <input
                    style={{ border: "1px solid #dedede" }}
                    value="KÝ QUỸ"
                    type="button"
                    disabled
                    placeholder="KÍ QUỸ"
                    className="!bg-[#F3F9FF] uppercase ml-[70px] form-control tttt w-[184px] h-[32px] text-[#565656] hover:bg-borderBodyTableMarket"
                  />
                  <img
                    onClick={handelPopup}
                    className="h-[28px] pl-2 cursor-pointer"
                    src="/menu-list-icon.png"
                    alt="/menu-list-icon.png "
                  />
                </div>
              </div>
              <div className="w-4/5 text-right btn__switchGroup">
                <div className="groupSwitch">
                  <span>{t("home:Order.ORDER_RPO")}</span>
                  <label className="switch" id="switchLabelLCG">
                    <input
                      type="checkbox"
                      id="ckGhiLenhChoGui"
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
                    {/* <span className="spnClTLV">
                      TLV:
                      <span className="spanTLV" id="spnTLV">
                        { dataShow.TLV ? dataShow.TLV : 0}
                      </span>
                      %
                    </span>  */}
                    <input
                      className="hidden form-control"
                      type="text"
                      id="txtContactNo"
                    ></input>
                    <div
                      className="ms-ctn form-control border-[#cccccc] rounded-md

                  "
                      id="txtSymbolBase"
                    >
                      <div className="relative ms-sel-ctn">
                        {/* <input
                      type="text"
                      className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] mr-[14px] rounded-md pl-[8px]  "
                      placeholder="Mã CK"
                      id="txtSymbol"
                      name="txtSymbol"
                      data-old=""
                    /> */}
                        <span className="absolute top-[-20px] left-[3px] !text-[12px] !text-[#333]">
                          {dataShow.San === "HNX.LISTED" ? "HNX" : dataShow.San}
                        </span>
                        <span className="absolute top-[-20px] right-[3px] !text-[12px] !text-[#333]">
                          TLV:{dataShow.TLV ? dataShow.TLV : 0}%
                        </span>
                        <input
                          type="text"
                          className="form-control relative ui-autocomplete-input size-input p-[2px] w-[100%] mr-[14px] rounded-md pl-[8px]"
                          placeholder={`${t("home:Order.ORDER_MCK")}`}
                          id="txtSymbol"
                          // onFocus={() => setShowResults(true)}
                          // onBlur={() => setShowResults(false)}
                          onChange={handelInputChange}
                          name="txtSymbol"
                          value={
                            dataTable.ma
                              ? dataTable.ma
                              : (dataBuy.ma ? dataBuy.ma : valueInput) ||
                                dataShow.ma
                          }
                        />
                        {showResults && valueInput && (
                          <div style={{
                            overflow: "auto", boxShadow: "rgba(0, 0, 0, 0.176) 0px 6px 12px 0px", outlineColor: "rgb(85, 85, 85)"
                            ,border:"1px rgba(0, 0, 0, 0.15)"
                          }} className="w-[451px] absolute pl-3 bg-white rounded-md shadow-xl ">
                            <ul className="h-[212px]">
                              {searchResults.map((item: any, index) => (
                                <li
                                  onClick={() => {
                                    let result = item.split("-");
                                    setValueInput(result[0]);
                                    setSearchResults([]);
                                    setShowResults(false)
                                  }}
                                  className="my-2 cursor-pointer hover:bg-[#63a9e066]"
                                  key={index}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 text-center inpBalance">
                  <div id="divMaxOrder ">
                    <span className="text-xs " id="fillMaxOrder">
                      Tối đa: <span id="spnMaxOrder"> 0</span>
                    </span>
                  </div>
                  <div className="container-spinner fix-margin ">
                    <input
                      onChange={handelInputChangeKl}
                      type="text"
                      className="form-control OrderFormQuantity  size-input text-right w-[100%] p-[1px] pr-[25px] rounded-md"
                      placeholder={`${t("home:Order.OPTIONS_KL")}`}
                      role="presentation"
                      value={valueInputKl ? formatNumber(valueInputKl) : ""}
                    />
                    <div className="spinner  right-[3px]" id="spinnerQuantity">
                      <button
                        type="button"
                        id="btnUpQty"
                        onClick={() => incrementCounter()}
                        className="up button-spinner relative  text-[#d3d3d3] rounded-md"
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
                <div className="divPrice pl-[15px] w-1/4">
                  <div className="fix-position">
                    <table className="mb-[-2px] w-full">
                      <tbody>
                        <tr>
                          <td className="border-none">
                            <span
                              className="spnTran cursor-pointer text-[#ef3eff] pl-[10px]  text-xs"
                              id="spnCeilPrice"
                            >
                              {dataTable.TranC
                                ? dataTable.TranC
                                : dataBuy.TranC
                                ? dataBuy.TranC
                                : 0}
                            </span>
                          </td>
                          <td className="border-none">
                            <span
                              className="spnThamChieu cursor-pointer text-[#f26f21] pl-[15px]  text-xs"
                              id="spnRefPrice"
                            >
                              {dataTable.TCT
                                ? dataTable.TCT
                                : dataBuy.TCT
                                ? dataBuy.TCT
                                : 0}
                            </span>
                          </td>
                          <td className="border-none">
                            <span
                              className="spnSan cursor-pointer text-[#00b8ff] pl-[15px]  text-xs"
                              id="spnFloorPrice"
                            >
                              {dataTable.SanT
                                ? dataTable.SanT
                                : dataBuy.SanT
                                ? dataBuy.SanT
                                : 0}
                            </span>
                          </td>
                          <td className="border-none">
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
                          type="number"
                          className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] rounded-md tttt pl-[9px]"
                          placeholder={`${t("home:base.Gia")}`}
                          id="txtPrice"
                          //  value={(dataTable?.ma && dataTable?.price) || (dataBuy?.ma && dataBuy?.price) || ""}
                          onChange={handelInputChangePrice}
                          step={100}
                          value={
                            dataTable.price
                              ? dataTable.price
                              : dataBuy.price
                              ? dataBuy.price
                              : valueInputPrice || ""
                          }

                          // value={dataTable.price ? dataTable.price : (dataBuy.price ? dataBuy.price : valueInputPrice)}
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
                <div className="w-1/4 tab-Buy">
                  <div className="h-[17px]"></div>
                  {color ? (
                    <button
                      onClick={handleClick}
                      id="btnBuySend"
                      className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] ml-[10px]  text-13px rounded-md text-white w-4/5"
                    >
                   {t("home:Order.ORDER_GUI")} 
                    </button>
                  ) : (
                    <button
                      id="btnBuySend"
                      className="btn btnBuyGui btnSaveTemplate bg-[#d71920] ml-[10px]  text-13px rounded-md text-white w-4/5"
                    >
                    {t("home:Order.ORDER_GUI")} 
                    </button>
                  )}
                  {/* <input
                id="btnBuySave"
                type="button"
                className="hidden btn btnBuyGhi btnSaveTemplate "
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
                {submit && (
                  <div className="bg-white-500 w-[660px] bottom-[60px] shadow-2xl  left-[27%] absolute  h-[205px] bg-white rounded-md">
                    <div className="bg-[#034E94] text-white pt-2 relative text-xl h-[40px] text-center items-center">
                      <h1 className="text-[18px]">XÁC NHẬN LỆNH</h1>
                      <p onClick={() => setSubmit(!submit)}>
                        <img
                          className="absolute cursor-pointer  top-[-13px] right-[-10px] text-4xl text-gray-500"
                          src="http://eztrade4.fpts.com.vn/images/EzFuture-09.png"
                        />
                      </p>
                    </div>
                    <div className="mx-auto w-[620px] mt-5 bg-white">
                      <table className="border border-[#dedede]">
                        <thead>
                          <tr className=" bg-[#EEEEEE] border border-[#dedede]">
                            <th className="text-center  font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                            {t("home:Order.ORDER_BAN")}
                            </th>
                            <th className="text-center font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                            {t("home:Order.ORDER_MCK")}
                            </th>
                            <th className="text-center font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                            {t("home:Order.OPTIONS_KL")}  
                            </th>
                            <th className="text-center font-extralight !text-[#000000] w-[110px] text-sm border-r border border-[#dedede]">
                            {t("home:base.Gia")}  
                            </th>
                            <th className="text-center font-extralight !text-[#000000] w-[240px] text-sm border-r border border-[#dedede]">
                            {t("home:base.ThongBao")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-[#dedede]">
                            <td className="text-center border-r border border-[#dedede]">
                            {t("home:Order.ORDER_MUA")}
                            </td>
                            <td className="text-center border-r border border-[#dedede]">
                              {valueInput ||
                                dataTable.ma ||
                                dataBuy.ma ||
                                dataShow.ma}
                            </td>
                            <td className="text-center border-r border border-[#dedede]">
                              {valueInputKl}
                            </td>
                            <td className="text-center border-r border border-[#dedede]">
                              {valueInputPrice ||
                                dataTable.price ||
                                dataBuy.price}
                            </td>
                            <td>
                              {gdSuccess && (
                                <span className="text-[13px] text-[#0FB44B] pl-2">
                                  {" "}
                                  {t("home:Order.ORDER_TC")}
                                </span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <form className="flex items-center mt-5 gap-6 w-[570px] relative mx-auto">
                      <p className="!text-[13px] text-[#3773AA]">
                        Xác nhận lệnh{" "}
                      </p>
                      {/* <AiOutlineKey className='absolute my-1 border-gray-400 rounded-sm text-2xl left-[96.5px] h-[27px] border' /> */}
                      <div className="border border-[#d6d6d6] w-[195px] rounded-sm h-fit flex items-center">
                        <i
                          style={{
                            borderRight: "1px solid #d6d6d6",
                            paddingRight: "2px",
                          }}
                          className="fa fa-key !pr-5  my-1 px-3 rounded-sm text-2xl p-1  w-[20px] shadow-2xl border-r pl-1 h-fit"
                        ></i>
                        <input
                          value={success}
                          onChange={(e) => setSuccess(e.target.value)}
                          placeholder="mật khẩu giao dịch "
                          type="password"
                          className=" !text-sm !pl-[-7px] rounded-sm border-none w-[145px] focus_none"
                        />
                      </div>

                      <button
                        style={{ border: "1px solid #92ddad" }}
                        onClick={handelSuccess}
                        className="p-1 pl-6 pr-6 text-white bg-[#0FB44B] rounded-2xl"
                      >
                        GỬI LỆNH
                      </button>
                      <button
                        onClick={() => setSubmit(false)}
                        className="!text-[13px]   text-[#3773AA] "
                      >
                        {" "}
                        <span className="pr-3 text-xl text-red-500 ">
                          X
                        </span>{" "}
                        <span className="relative top-[-3px]"> Đóng lại </span>
                      </button>
                    </form>
                    <hr className="mt-2 border w-[620px] block mx-auto " />
                    <p className="!text-[13px] pt-2 !font-extralight  !text-[#7B7B7C]  tracking-[.5px]  pl-7">
                      Để sử dụng mật khẩu giao dịch một lần cho cả phiên đăng
                      nhập, Quý khách cài đặt{" "}
                      <span className="text-[#337AB7] underline">
                        {" "}
                        tại đây{" "}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="divReset w-[10%]">
                <div className="h-[14px]"></div>
                <button className="refresh" id="btnReset">
                  <img
                    className="mt-[2px] mr-[8px] ml-[10px] "
                    src="http://priceboard3.fpts.com.vn/images/EzFuture-05.png"
                  />
                  <span className="text-13px"> {t("home:Order.ORDER_LL")}</span>
                </button>
              </div>
            </div>
          </div>
          {order ? (
            <></>
          ) : (
            <div className="bottom-center">
              <img src={IconNext}></img>
            </div>
          )}
          {order ? <></> : <RecordPending />}
        </div>
      </div>

      {/* <div id="draggableH" className="ui-draggable ui-draggable-handle" style={{ top: anchorEl2 ? "431px" : "263.469px",background : "transparent" }} ></div>   */}
    </div>
  );
};

export default React.memo(OrderMarketW);
