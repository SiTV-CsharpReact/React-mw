import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "flowbite";
import React from "react";
// import { AiOutlineLoading3Quarters, AiFillCloseCircle, AiOutlineKey, AiOutlineUnorderedList } from 'react-icons/ai';
import { Tooltip } from "@mui/material";
import TableTotalMonney from "./TableTotalMonney";
import "./styleOrderForm.scss";
import IconNext from "../../images/icon-next.png";
import {
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
  setKey,
  setDecrementCounterPrice,
} from "../tableMarketwatch/orderComanSlice";
import { GetStockBalance, GetStockBalanceMarpro, fetchClientBalence, getClientBalance, setStatusKQ } from "./ClientBalance";
import { SendOrder_Marpro, setsttOrderForm } from "./SendOrderSlice";
import { fetchPermission } from "../header/ProfileAccountSlice";
import { checkFee } from "./util/util";
import iconlistKQ from "../../images/menu-list-icon.png"
type Props = {
  windowHeight: number;
  heightOrderForm: number;
  expand: number;
  heightPriceBoard: number;
  setExpand(expand: number): void;
  setHeightPriceBoard(heightPriceBoard: number): void;
};
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
const OrderMarketW = () => {
  const { t } = useTranslation(["home"]);
  const dispatch = useAppDispatch();
  // color mua ban
  const { dataShow } = useAppSelector((state) => state.dataShow);
  // check trạng thái tk margin, thường
  const statusAccount = useAppSelector((state) => state.ProfileAccount.statusAccount);
  // tổng tiền đặt lệnh của marpro // tổng hạn mức còn lại // check trạng thái kí quỹ 
  const {totalMonney, totalHMCL,statusKQ} = useAppSelector((state) => state.clientBalance);
  // lấy Thông tin của mã đặt
  const { SanT, maCode, price, TCT, TranC, key, san,quantityMax,priceInput} = useAppSelector(state => state.orderComan );
  // lấy ra phí
  const {vFeeRate_TP,vFeeUP,vFeeUP_CCQ,vFeeLISTED_CP,vFeeLISTED_ETF,vFeeHSX_CCQ,vFeeHSX_CP,vFeeHSX_CQ,vFeeHSX_ETF} = useAppSelector((state) => state.ProfileAccount);  
 // set phí 
  const [fee, setFee] = useState(0);
 // trang thai mua ban 
  const [color, setColor] = useState(true);
  // input Khối lượng 
  const inputQuantity = useRef<HTMLInputElement | null>(null);
  // input Giá 
  const inputPrice = useRef<HTMLInputElement | null>(null);
  // input mã ck
  const inputStock = useRef<HTMLInputElement | null>(null);
  // gửi lệnh
  const submit = useAppSelector(state => state.SendOrder.submit );

  useEffect(() => {
    dispatch(fetchClientBalence())
    dispatch(fetchPermission())
    }, [dispatch]);
 
  const [valueInputPrice, setValueInputPrice] = useState<number | null>(TranC !==0 ?  TranC: 1);
  console.log(valueInputPrice)
  const [statusPrice, setStatusPrice] = useState(0);
  const [valueInputKl, setValueInputKl] = useState<number>(0);
  const [QuantityMax, setQuantityMax] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  // ghi lenh cho gui
  const [order, setOrder] = useState(true);

  const [inputValue, setInputValue] = useState("");
  // console.log(inputValue)
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
   // thêm mã chứng khoán
   const AddStockCode = (CodeCk: Company) => {
    let san = CodeCk?.Exchange === 1 ? "HOSE":CodeCk?.Exchange ===2 ? "HNX.NY":"HNX.UPCOM";
    setFee(checkFee(CodeCk?.Exchange,CodeCk?.Stock_Type2,vFeeRate_TP,vFeeUP,vFeeUP_CCQ,vFeeLISTED_CP,vFeeLISTED_ETF,vFeeHSX_CP,vFeeHSX_CCQ,vFeeHSX_ETF,vFeeHSX_CQ));
    let data = {
      key: key,
      dataOrder: { ...CodeCk, Exchange: san,Fee:fee },
    };
    setStatusPrice(0);
    setInputValue(CodeCk.Code);
    dispatch(setDataOrder(data));
    dispatch(setValueOrder(CodeCk.Code));
    setValueInputPrice(0);
    inputQuantity.current?.focus();
  };
  useEffect(() => {
    key === "M" ? setColor(true) : setColor(false);
  }, [key]);
  const [popup, setPopup] = useState(false);
  const incrementCounter = () => {
    if(valueInputKl === QuantityMax) return ;
    else setValueInputKl(valueInputKl + 100);
  };

  const decrementCounter = () => {
    if (valueInputKl===0) return ;
    else setValueInputKl(valueInputKl - 100);
 
  };
  const incrementCounterPrice = () => {
    let numberPrice = (valueInputPrice  ? valueInputPrice : 0) + 1;
    setValueInputPrice(numberPrice);
    isChangePrice(numberPrice);
  };

  const decrementCounterPrice = () => {
    let numberPrice = (valueInputPrice  ? valueInputPrice : 0) + 1;
    setValueInputPrice(numberPrice);
    isChangePrice(numberPrice);
  };
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


  const switchBuySell =(status:boolean)=>{
     setColor(status)
     ResetForm()
     setQuantityMax(0);
     dispatch(setKey(status?"M":"B"))
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
      inputStock.current?.focus();
      return false;
    }
    try {
      await validationSchemaKl.validate({ txtSymbol: valueInputKl });
    } catch (error) {
      alert("Chưa nhập Khối lượng");
      inputQuantity.current?.focus();
      return;
    }
    try {
      await validationSchemaPrice.validate({
        txtSymbol: valueInputPrice  || price,
      });
    } catch (error) {
      alert("Chưa nhập Giá");
      inputPrice.current?.focus();
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
 
  const handelPopup = () => {
    setPopup(!popup);
  };
  useEffect(() => {
    
    setInputValue(maCode);
    setValueInputPrice(0);
  }, [maCode]);
  // tính số lượng tối đa
  const vMarRate= 0;
  let MaxQtty = 0
  let g_HoldingCash = 0;
  useEffect(() => {
 // tinh kl tối đa 
    if (TranC > 0) {
      if (key === "B"){
        return setQuantityMax(quantityMax);
        
      }
      if(statusAccount === 1){
       if (totalMonney>0) MaxQtty = parseInt(((totalMonney - g_HoldingCash) / (TranC * (1 + fee))).toString())
       else MaxQtty = 0;
      }
      else if(statusAccount=== 2){
        if(totalMonney < totalHMCL){
          MaxQtty = totalMonney/((1-(vMarRate/100)+ fee) *TranC); 
        }
        if(totalHMCL >= totalMonney ){
          MaxQtty = totalMonney/  ((1+ fee) *TranC);
        }
      }
     else if(statusAccount=== 3){
      if(totalMonney < totalHMCL){
        MaxQtty = totalMonney/((1-(vMarRate/100)+ fee) *TranC); 
      }
      if(totalHMCL >= totalMonney ){
        MaxQtty = totalMonney/  ((1+ fee) *TranC);
      }
     }
      MaxQtty = parseInt(MaxQtty.toString())
      if(MaxQtty >= 100){
        if (san === "HOSE")  MaxQtty -= MaxQtty % 100
        if (san === "HNX.NY")  MaxQtty -= MaxQtty % 100
        if (san === "HNX.UPCOM")  MaxQtty -= MaxQtty % 100
      }
      setQuantityMax(MaxQtty);
    }
  }, [TranC, totalMonney]);
  // làm lại
  const ResetForm = () => {
    dispatch(ResetStockCode());
    setValueInputPrice(0);
    setQuantityMax(0);
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
        { statusAccount===3 && <Protal popup={popup} handelClosed={() => setPopup(!popup)}></Protal>}
        <div className="pb-5 panel-bottom">
          <div
            className={`inline-block BGTB w-full ${order ? "" : "relative"}`}
          >
            {color ? (
              <TableTotalMonney status={order} priceMoney={totalMonney } />
            ) : (
              <StockBalance status={order} />
            )}
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
                      onClick={() => switchBuySell(true)}
                    >
                      {t("home:Order.ORDER_MUA")}
                    </div>
                    <div
                      id="tabSell"
                      className={`tabSell normal-case ${color ? "" : "active"}`}
                      // className="normal-case tabSell "
                      onClick={() => switchBuySell(false)}
                    >
                      {t("home:Order.ORDER_BAN")}
                    </div>
                    </div>
                    { statusAccount !== 1 && color  && 
                    (<div className="flex w-[80%]">
                    <input
                      style={{ border: "1px solid #dedede" }}
                      value="TIỀN MẶT"
                      type="button"                 
                      onClick={()=> dispatch(setStatusKQ(false))}
                      placeholder="TIỀN MẶT"
                      className={`btn-tab ${statusKQ ? "" : "active"} ${statusAccount === 2 ? "":"hidden"} `}
                    />
                    <input
                      style={{ border: "1px solid #dedede" }}
                      value="KÝ QUỸ"
                      type="button"
                      onClick={()=> dispatch(setStatusKQ(true))}
                      disabled={statusAccount === 3? true :false}
                      placeholder="KÍ QUỸ"
                      className={`btn-tab ${statusKQ ? "active" : ""} ${color ? "" : "hidden"}`}
                    />
                    <img
                      onClick={handelPopup}
                      className={`h-[28px] pl-2 cursor-pointer ${color ? "" : "hidden"}`}
                      src={iconlistKQ}
                      alt="/menu-list-icon.png "
                    />
                    </div>)}
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
                    
                      <div className={`text-center ${san ?"":"pt-5"}` }>
                      <span className="!text-[13px] !text-[#333]">
                            {san}
                          </span>
                      </div>
                     
                      <div
                        className="ms-ctn form-control border-[#cccccc] rounded-md

                  "
                        id="txtSymbolBase"
                      >
                      
                          
                        <div className="relative ms-sel-ctn">
                        
                          {statusAccount ===3 &&   <span className="absolute top-[-20px] right-[3px] !text-[12px] !text-[#333]">
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
                          </span>}
                        
                          <input
                            type="text"
                            className="form-control relative ui-autocomplete-input size-input p-[2px] w-[100%] mr-[14px] rounded-md pl-[8px]"
                            placeholder={`${t("home:Order.ORDER_MCK")}`}
                            id="txtSymbol"
                            ref={inputStock}
                            // onFocus={() => setShowResults(true)}
                            // onBlur={() => setShowResults(false)}
                            onChange={handelInputChange}
                            name="txtSymbol"
                            value={inputValue ? inputValue : maCode}
                            // onKeyDown={(e) => handleKeyDownInput(e)} // Thêm sự kiện onKeyDown cho ô input
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
                        <span className="cursor-pointer" onClick={()=>setValueInputKl(QuantityMax)}>
                          {QuantityMax
                            ? formatNumberMarket(Math.floor(QuantityMax))
                            : ""}
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
                        ref={inputQuantity}
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
                            ref={inputPrice}
                            //  value={(dataTable?.ma && dataTable?.price) || (dataBuy?.ma && dataBuy?.price) || ""}
                            onChange={handelInputChangePrice}
                            step={100}
                            value={valueInputPrice ? valueInputPrice : " "}

                            // value={dataTable.price ? dataTable.price : (dataBuy.price ? dataBuy.price : valueInputPrice)}
                          />
                        </div>
                      </div>
                      <div id="divAutoPrice"></div>
                      <div className="spinner right-[3px]  " id="spinnerPrice ">
                        <button
                          type="button"
                          id="btnUpPrice"
                          onClick={() => incrementCounterPrice()}
                          className="up button-spinner relative  text-[#d3d3d3]"
                        >
                          ›
                        </button>
                        <button
                          type="button"
                          id="btnDownPrice"
                          onClick={() => decrementCounterPrice()}
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
                        // id={
                        //   statusPrice === 1 ||
                        //   Number(valueInputPrice) <= 0 ||
                        //   valueInputKl <= 0 ||
                        //   !maCode
                        //     ? "btnBuySend"
                        //     : ""
                        // }
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
                  <button className="refresh" id="btnReset" onClick={ResetForm}>
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
      {/* <iframe id="dvIframeChart" src={`/chart/blank?${(new Date()).getMilliseconds()}`} ></iframe> */}
    </>
  );
};

export default React.memo(OrderMarketW);
