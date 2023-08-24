import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "flowbite";
import React from "react";
// import { AiOutlineLoading3Quarters, AiFillCloseCircle, AiOutlineKey, AiOutlineUnorderedList } from 'react-icons/ai';
import { FormControlLabel, Tooltip, styled } from "@mui/material";
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
import * as yup from "yup";
import {
  formatNumber,
  formatNumberMarket,
} from "../../utils/util";
import Protal from "./Portol";
import { useTranslation } from "react-i18next";
import SearchStockCode from "../SearchStockCode/SearchStockCode";
import { Company } from "../../models/root";
import {
  setDataOrder,
  setValueOrder,
  ResetStockCode,
} from "../tableMarketwatch/orderComanSlice";
import SignalRComponent from "../chartIndex/connectSignalr";
import { setStatusKQ } from "./ClientBalance";
import ConfirmOrder from "./ConfirmOrder";
import TableConfirmOrder from "./TableConfirmOrder";
import { SendOrder_Marpro, setsttOrderForm } from "./SendOrderSlice";
import { createPortal } from 'react-dom';
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
  const { dataShow } = useAppSelector((state) => state.dataShow);
  const statusKQ = useAppSelector((state) => state.clientBalance.statusKQ);
  const statusEztrade = useAppSelector((state) => state.ProfileAccount.EzTrade);
  const { SanT, maCode, price, TCT, TranC, key, san } = useAppSelector(state => state.orderComan );
  const submit = useAppSelector(state => state.SendOrder.submit );
  const [valueInputPrice, setValueInputPrice] = useState<number | null>(0);
  const [statusPrice, setStatusPrice] = useState(0);
  const [valueInputKl, setValueInputKl] = useState<number>(0);
  const [TotalMoney, setTotalMoney] = useState<number>(7860601494);
  const [QuantityMax, setQuantityMax] = useState<number>(0);

  const [gdSuccess, setGdSuccess] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState("");

  // ghi lenh cho gui
  const [order, setOrder] = useState(true);

  const dispatch = useAppDispatch();
  //const {data} = useAppSelector(state => state.counter);

  const [inputValue, setInputValue] = useState("");
  console.log(inputValue)
  const [color, setColor] = useState(true);
  // lấy ra chi tiết 1 mã code
  const [stockCode, setStockCode] = useState<Company>({
    Code: "",
    Exchange: 0,
    ScripName: "",
    Basic_Price: 0,
    Ceiling_Price: 0,
    Floor_Price: 0,
    Stock_Type2: 0,
    ScripNameEN: "",
    ID: "",
  });
  // popup
  // console.log(" SanT, maCode, price, TCT, TranC, key,san" , SanT, maCode, price, TCT, TranC, key,san)
  useEffect(() => {
    key === "M" ? setColor(true) : setColor(false);
  }, [key]);
  const [popup, setPopup] = useState(false);
  const incrementCounter = () => {
    setValueInputKl(valueInputKl + 100);
  };

  const decrementCounter = () => {
    setValueInputKl(valueInputKl - 100);
  };
  const incrementCounter1 = () => {
    let numberPrice = (valueInputPrice ? valueInputPrice : 0) + 1;
    setValueInputPrice(numberPrice);
    isChangePrice(numberPrice);
  };

  const decrementCounter1 = () => {
    if (valueInputPrice !== 0) {
      let numberPrice = (valueInputPrice ? valueInputPrice : 0) - 1;
      setValueInputPrice(numberPrice);
      isChangePrice(numberPrice);
    }
  };
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const openPopupLanguage2 = Boolean(anchorEl2);
  const toggleOrder = () => {
    setOrder(!order);
  };
  let timeOutString = useRef<number | any>(null);

  const handelInputChangePrice = (e: any) => {
    const value = Number(e.target.value);
    setValueInputPrice(value);
    if (timeOutString?.current) {
      clearTimeout(timeOutString?.current);
    }
    if (value) {
      timeOutString.current = setTimeout(() => {
        isChangePrice(value);
      }, 1000);
    }
  };
  // kiểm tra giá

  const isChangePrice = (value: number) => {
    // SanT, maCode, price, TCT, TranC, key,san
    if (SanT >= 0 && TranC >= 0) {
      // k cho người dùng nhập giá lớn hơn giá trần và nhỏ hơn giá sàn
      if (value > TranC || value < SanT) {
        //   let mesage = `Quý khách vui lòng nhập trong khoảng ${SanT} - ${ TranC}`
        //   toast.error(mesage, {
        //     position: toast.POSITION.BOTTOM_RIGHT,
        // });
        setStatusPrice(1);
      } else {
        setStatusPrice(2);
      }
    }
  };

  const handelInputChangeKl = (e: any) => {
    const value = e.target.value;
    setValueInputKl(value.toUpperCase());
  };


  const validationSchema = yup.object().shape({
    txtSymbol: yup
      .string()
      .required(`${t("home:menu.CHECK_VLN")} ${t("home:Order.ORDER_MCK")} `),
  });
  const validationSchemaPrice = yup.object().shape({
    txtSymbol: yup
      .number()
      .min(1)
      .required(`"${t("home:menu.CHECK_VLN")} ${t("home:Order.ORDER_MCK")}"`),
  });
  const validationSchemaKl = yup.object().shape({
    txtSymbol: yup
      .number()
      .min(1)
      .required(`"${t("home:menu.CHECK_VLN")} ${t("home:Order.ORDER_MKL")}"`),
  });
  const CFOM = {
    "Password2": "",
    "UniqueRandomString": "20230817-151403126-058C222210",
    "OrderInfo": [
        {
            "ClientRowID": "20230817-151351547-058C222210",
            "Exchange": "HNX.NY",
            "StockCode": "AAV",
            "Quantity": 100,
            "Price": 5600,
            "PriceType": "LO",
            "BuySell": "BUY",
            "TLV": "0",
            "MarginContractNo": "",
            "Type": "MARPRO",
            "Rate": 0,
            "VerRequest": "W-058C222210-1692285231546"
        }
    ]
}
  const handleClick = async (e: any) => {
    dispatch(SendOrder_Marpro(CFOM))
    e.preventDefault();
    try {
      await validationSchema.validate({
        txtSymbol: inputValue || san || maCode ,
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
        txtSymbol: valueInputPrice  || price,
      });
    } catch (error) {
      alert("Chưa nhập Giá");
      return;
    }
    dispatch(setsttOrderForm(true));
    console.log(submit)
  };
  // tìm kiếm mã chứng khoán
  const handelInputChange = (e: any) => {
    const value = e.target.value;
    setStockCode({ ...stockCode, Code: value });
    if (value === "") {
      setInputValue(value.toUpperCase());
      setShowResults(false);
      dispatch(setValueOrder(value));
    } else {
      setShowResults(true);
      setInputValue(value.toUpperCase());
    }
  };
  // thêm mã chứng khoán
  const AddStockCode = (CodeCk: Company) => {
    let san = CodeCk?.Exchange == 1 ? "HSX" : "HNX";
    let data = {
      key: key,
      dataOrder: { ...CodeCk, Exchange: san },
    };
    setStatusPrice(0);
    setInputValue(CodeCk.Code);
    dispatch(setDataOrder(data));
    dispatch(setValueOrder(CodeCk.Code));
    setValueInputPrice(0);
  };
  const handelPopup = () => {
    setPopup(!popup);
  };
  useEffect(() => {
    setInputValue(maCode);
    setValueInputPrice(0);
  }, [maCode]);
  // tính số lượng tối đa
  useEffect(() => {
    if (TranC > 0) {
      setQuantityMax(TotalMoney / TranC);
    }
  }, [TranC, TotalMoney]);
  // làm lại
  const ResetFrom = () => {
    dispatch(ResetStockCode());
    setValueInputPrice(0);
    setInputValue("");
  };
  const priceSm = `Mã CK có giá trần tính SM là ${formatNumber(
    dataShow.giaTranSm
  )}`;
  // TranC7,860,601,494
  return (
    <>
      <div className="text-black bg-white" id="tablepricelist">
     
        {/* đặt lệnh */}
        <Protal popup={popup} handelClosed={() => setPopup(!popup)}></Protal>
        <div className="pb-5 panel-bottom">
          <div
            className={`inline-block BGTB w-full ${order ? "" : "relative"}`}
          >
            {color ? (
              <TableTotalMonney status={order} priceMoney={TotalMoney} />
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
        
                  <div className="flex w-full">
                    <div className="flex w-[20%] group-buysell  ">
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
                    </div>
                    
                    <input
                      style={{ border: "1px solid #dedede" }}
                      value="TIỀN MẶT"
                      type="button"                 
                      onClick={()=> dispatch(setStatusKQ(false))}
                      placeholder="TIỀN MẶT"
                      className={`btn-tab ${statusKQ ? "" : "active"} ${statusEztrade===0 ?"hidden":""}`}
                    />
                    <input
                      style={{ border: "1px solid #dedede" }}
                      value="KÝ QUỸ"
                      type="button"
                      onClick={()=> dispatch(setStatusKQ(true))}
                      disabled={statusEztrade === 0? true :false}
                      placeholder="KÍ QUỸ"
                      className={`btn-tab ${statusKQ ? "active" : ""} ${color ? "" : "hidden"}`}
                    />
                    <img
                      onClick={handelPopup}
                      className={`h-[28px] pl-2 cursor-pointer ${color ? "" : "hidden"}`}
                      src="/menu-list-icon.png"
                      alt="/menu-list-icon.png "
                    />
                  </div>
           
                <div className="w-[30%] text-right btn__switchGroup">
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
                          <span className="absolute top-[-20px] left-[3px] !text-[12px] !text-[#333]">
                            {san}
                          </span>
                          <span className="absolute top-[-20px] right-[3px] !text-[12px] !text-[#333]">
                            TLV:{dataShow.TLV ? dataShow.TLV : 0}%
                            <Tooltip title={priceSm}>
                              <i
                                className="fa fa-info-circle absolute"
                                aria-hidden="true"
                                style={{
                                  fontSize: " 13px",
                                  marginLeft: " 2px",
                                  color: "#717171",
                                }}
                              ></i>
                            </Tooltip>
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
                            value={inputValue ? inputValue : maCode}
                            autoComplete="off"
                          />

                          <SearchStockCode
                            valueInput={inputValue}
                            setShowPoup={setShowResults}
                            showPopup={showResults}
                            ChangeFunction={setStockCode}
                            SearchStockCode={AddStockCode}
                            setValueInput={setInputValue}
                            border={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4 text-center inpBalance">
                    <div id="divMaxOrder ">
                      <span className="text-xs " id="fillMaxOrder">
                        Tối đa:{" "}
                        <span id="spnMaxOrder">
                          {QuantityMax
                            ? formatNumberMarket(Math.floor(QuantityMax))
                            : 0}
                        </span>
                      </span>
                    </div>
                    <div className="container-spinner fix-margin ">
                      <input
                        style={{
                          border:
                            valueInputKl > QuantityMax || valueInputKl < 0
                              ? "red 1px solid"
                              : "",
                        }}
                        onChange={handelInputChangeKl}
                        type="text"
                        className="form-control OrderFormQuantity  size-input text-right w-[100%] p-[1px] pr-[25px] rounded-md"
                        placeholder={`${t("home:Order.OPTIONS_KL")}`}
                        role="presentation"
                        value={valueInputKl ? formatNumber(valueInputKl) : ""}
                      />
                      <div
                        className="spinner  right-[3px]"
                        id="spinnerQuantity"
                      >
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
                                onClick={() => setValueInputPrice(TranC)}
                              >
                                {TranC / 1000}
                              </span>
                            </td>
                            <td className="border-none">
                              <span
                                className="spnThamChieu cursor-pointer text-[#f26f21] pl-[15px]  text-xs"
                                id="spnRefPrice"
                                onClick={() => setValueInputPrice(TCT)}
                              >
                                {TCT / 1000}
                              </span>
                            </td>
                            <td className="border-none">
                              <span
                                className="spnSan cursor-pointer text-[#00b8ff] pl-[15px]  text-xs"
                                id="spnFloorPrice"
                                onClick={() => setValueInputPrice(SanT)}
                              >
                                {SanT / 1000}
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
                            style={{
                              border: statusPrice === 1 ? "red 1px solid" : "",
                            }}
                            type="number"
                            className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] rounded-md tttt pl-[9px]"
                            placeholder={`${t("home:base.Gia")}`}
                            id="txtPrice"
                            //  value={(dataTable?.ma && dataTable?.price) || (dataBuy?.ma && dataBuy?.price) || ""}
                            onChange={handelInputChangePrice}
                            step={100}
                            value={valueInputPrice ? valueInputPrice/1000 : " "}

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
                        disabled={
                          statusPrice === 1 ||
                          Number(valueInputPrice) <= 0 ||
                          valueInputKl <= 0 ||
                          !maCode
                            ? true
                            : false
                        }
                        onClick={handleClick}
                        id={
                          statusPrice === 1 ||
                          Number(valueInputPrice) <= 0 ||
                          valueInputKl <= 0 ||
                          !maCode
                            ? "btnBuySend"
                            : ""
                        }
                        className="btn btnBuyGui btnSaveTemplate bg-[#0055ba] ml-[10px]  
                        text-13px rounded-md text-white w-4/5"
                      >
                        {t("home:Order.ORDER_GUI")}
                      </button>
                    ) : (
                      <button
                        disabled={
                          statusPrice === 1 ||
                          Number(valueInputPrice) <= 0 ||
                          valueInputKl <= 0 ||
                          !maCode
                            ? true
                            : false
                        }
                        onClick={handleClick}
                        id={
                          statusPrice === 1 ||
                          Number(valueInputPrice) <= 0 ||
                          valueInputKl <= 0 ||
                          !maCode
                            ? "btnBuySend"
                            : ""
                        }
                        className="btn btnBuyBan btnSaveTemplate bg-[#d71920] ml-[10px]  text-13px rounded-md text-white w-4/5"
                      >
                        {t("home:Order.ORDER_GUI")}
                      </button>
                    )}
                  </div>
                
                </div>
                <div className="divReset w-[10%]">
                  <div className="h-[14px]"></div>
                  <button className="refresh" id="btnReset" onClick={ResetFrom}>
                    <img
                      className="mt-[2px] mr-[8px] ml-[10px] "
                      src="http://priceboard3.fpts.com.vn/images/EzFuture-05.png"
                      alt=""
                    />
                    <span className="text-13px">
                      {" "}
                      {t("home:Order.ORDER_LL")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {order ? (
              <></>
            ) : (
              <div className="bottom-center">
                <img src={IconNext} alt=""></img>
              </div>
            )}
            {order ? <></> : <RecordPending />}
          </div>
        </div>

        {/* <div id="draggableH" className="ui-draggable ui-draggable-handle" style={{ top: anchorEl2 ? "431px" : "263.469px",background : "transparent" }} ></div>   */}
      </div>
      <ToastContainer />
      <iframe id="dvIframeChart" src={`/chart/blank?${(new Date()).getMilliseconds()}`} ></iframe>
    </>
  );
};

export default React.memo(OrderMarketW);
