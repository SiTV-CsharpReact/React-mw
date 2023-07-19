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
  formatNumberPhanTram,
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
  const { SanT, maCode, price, TCT, TranC, key, san } = useAppSelector(
    (state: RootState) => state.orderComan
  );
  const [valueInputPrice, setValueInputPrice] = useState<number | null>(0);
  const [statusPrice, setStatusPrice] = useState(0);
  const [valueInputKl, setValueInputKl] = useState<number>(0);
  const [TotalMoney, setTotalMoney] = useState<number>(7860601494);
  const [QuantityMax, setQuantityMax] = useState<number>(0);

  const [gdSuccess, setGdSuccess] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState("");

  // ghi lenh cho gui
  const [order, setOrder] = useState(true);

  const dispatch = useAppDispatch();
  //const {data} = useAppSelector(state => state.counter);

  const [inputValue, setInputValue] = useState("");
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
    key == "M" ? setColor(true) : setColor(false);
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

  const handelSuccess = (e: any) => {
    e.preventDefault();
    if (!success) {
      alert("Quý khách chưa nhập mật khẩu giao dịch ");
    } else {
      setGdSuccess(true);
      setTimeout(() => {
        setSubmit(false);
        setInputValue("");
        setValueInputPrice(0);
        setValueInputKl(0);
      }, 3000);
    }
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
  const handleClick = async (e: any) => {
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
    setSubmit(!submit);
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
                              border: statusPrice == 1 ? "red 1px solid" : "",
                            }}
                            type="number"
                            className="form-control ui-autocomplete-input size-input p-[2px] w-[100%] rounded-md tttt pl-[9px]"
                            placeholder={`${t("home:base.Gia")}`}
                            id="txtPrice"
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
                          statusPrice == 1 ||
                          Number(valueInputPrice) <= 0 ||
                          valueInputKl <= 0 ||
                          !maCode
                            ? true
                            : false
                        }
                        onClick={handleClick}
                        id={
                          statusPrice == 1 ||
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
                          statusPrice == 1 ||
                          Number(valueInputPrice) <= 0 ||
                          valueInputKl <= 0 ||
                          !maCode
                            ? true
                            : false
                        }
                        onClick={handleClick}
                        id={
                          statusPrice == 1 ||
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
                  {submit && (
                    <div className="bg-white-500 w-[660px] bottom-[60px] z-50 shadow-2xl  left-[27%] absolute  h-[205px] bg-white rounded-md">
                      <div
                        style={{ background: color ? "#034E94" : "red" }}
                        className=" text-white pt-2 relative text-xl h-[40px] text-center items-center"
                      >
                        <h1 className="text-[18px]">XÁC NHẬN LỆNH</h1>
                        <p onClick={() => setSubmit(!submit)}>
                          <img
                            className="absolute cursor-pointer  top-[-13px] right-[-10px] text-4xl text-gray-500"
                            src="http://eztrade4.fpts.com.vn/images/EzFuture-09.png"
                            alt=""
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
                                {maCode}
                              </td>
                              <td className="text-center border-r border border-[#dedede]">
                                {valueInputKl}
                              </td>
                              <td className="text-center border-r border border-[#dedede]">

                               {valueInputPrice}
                              </td>
                              <td>
                                {gdSuccess && (
                                  <span className="text-[13px] text-[#0FB44B] pl-2">
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
                          style={{
                            border: color
                              ? "1px solid #034E94"
                              : "1px solid #red",
                            background: color ? " #034E94" : "red",
                          }}
                          onClick={handelSuccess}
                          className="p-1 pl-6 pr-6 text-white w-[115px] rounded-2xl"
                        >
                          {color ? "MUA" : "BÁN"}
                        </button>
                        <button
                          onClick={() => setSubmit(false)}
                          className="!text-[13px]   text-[#3773AA] "
                        >
                          {" "}
                          <span className="pr-3 text-xl text-red-500 ">
                            X
                          </span>{" "}
                          <span className="relative top-[-3px]">
                            {" "}
                            Đóng lại{" "}
                          </span>
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
    </>
  );
};

export default React.memo(OrderMarketW);
