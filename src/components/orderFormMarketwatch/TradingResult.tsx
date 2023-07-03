import React, { useEffect, useState ,useRef} from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import axios from "axios";
import _ from "lodash";
import { uniqWith, isEqual } from "lodash";
import { formatNumber } from "../../utils/util";
import PdfandExcel from "./PdfandExcel";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getDataApi } from "./data";
import {useReactToPrint} from "react-to-print";

const Tbody = (props: any) => {
  const [drop, setDrop] = React.useState(false);
  console.log(
    props.data
      .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
      .slice(1)
  );
  useEffect(() => {
    if (props.drop) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  }, [props.drop]);
  return (
    <>
      <tr className="hover:bg-[#EEFFEE]" onClick={() => setDrop(!drop)}>
        <td className="border  font-bold text-[#2371AF] relative border-gray-300 text-start pl-1  pr-2">
          {props.item.ASTOCKCODE}

          {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
            .length === 1 ? (
            <></>
          ) : (
            <>
              {drop ? (
                <i className="absolute text-down-text fa fa-caret-up text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"></i>
              ) : (
                <i className="absolute text-down-text fa fa-caret-down text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"></i>
              )}
            </>
          )}
        </td>

        <td className="border   font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.AQUANTITY, 0)
          )}
        </td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.APRICE, 0)
          )}
        </td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.ATOTALVALUE, 0)
          )}
        </td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.AORDERID, 0)
          )}
        </td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
          {" "}
          {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
            .length <= 1
            ? props.item.AMATCH_TIME
            : ""}{" "}
        </td>
      </tr>

      {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
        .length >= 2
        ? props.data
          .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
          .map((x: any, index: any) => (
            <tr className="hover:bg-[#EEFFEE]" key={index} style={{ display: `${drop ? "" : "none"}` }}>
              <td className="  font-bold text-[#2371AF] border-gray-300 text-start pl-1  pr-2"></td>
              <td className="border  font-medium text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.AQUANTITY)}
              </td>
              <td className="border  font-medium text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.APRICE)}
              </td>
              <td className="border  font-medium text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.ATOTALVALUE)}
              </td>
              <td className="border  font-medium text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.AORDERID)}
              </td>
              <td className="border  font-medium text-[#2371AF] border-gray-300 text-end  pr-2">
                {x.AMATCH_TIME}
              </td>
            </tr>
          ))
        : props.data
          .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
          .slice(1)
          .map((x: any, index: any) => (
            <tr className="hover:bg-[#EEFFEE]" key={index} style={{ display: `${drop ? "" : "none"}` }}>
              <td className="  font-bold text-[#2371AF] border-gray-300 text-start pl-1  pr-2"></td>
              <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.AQUANTITY)}
              </td>
              <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.APRICE)}
              </td>
              <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.ATOTALVALUE)}
              </td>
              <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
                {formatNumber(x.AORDERID)}
              </td>
              <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">
                {x.AMATCH_TIME}
              </td>
            </tr>
          ))}
    </>
  );
};
const TbodySell = (props: any) => {
  const [dropSell, setDropSell] = React.useState(false);
  console.log(
    props.data
      .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
      .slice(1)
  );
  useEffect(() => {
    if (props.dropSell) {
      setDropSell(true);
    } else {
      setDropSell(false);
    }
  }, [props.dropSell]);
  return (
    <>
      <tr className="hover:bg-[#EEFFEE]" onClick={() => setDropSell(!dropSell)}>
        <td className="border relative  font-bold text-[#9C0A0A] border-gray-300 text-start pl-1  pr-2">
          {formatNumber(props.item.ASTOCKCODE)}
          {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
            .length === 1 ? (
            <></>
          ) : (
            <>
              {dropSell ? (
                <i className="absolute text-down-text fa fa-caret-up text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"></i>
              ) : (
                <i className="absolute text-down-text fa fa-caret-down text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"></i>
              )}
            </>
          )}
        </td>

        <td className="border   font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.AQUANTITY, 0)
          )}
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.APRICE, 0)
          )}
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.ATOTALVALUE, 0)
          )}
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {formatNumber(
            props.data
              .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
              .reduce((a: any, b: any) => a + b.AORDERID, 0)
          )}
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
            .length <= 1
            ? props.item.AMATCH_TIME
            : ""}
        </td>
      </tr>
      {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
        .length >= 2
        ? props.data
          .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
          .map((x: any, index: any) => (
            <tr className="hover:bg-[#EEFFEE]" key={index} style={{ display: `${dropSell ? "" : "none"}` }}>
              <td className="  font-bold text-[#9C0A0A] border-gray-300 text-start pl-1  pr-2"></td>
              <td className="border  font-medium text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.AQUANTITY)}
              </td>
              <td className="border  font-medium text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.APRICE)}
              </td>
              <td className="border  font-medium text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.ATOTALVALUE)}
              </td>
              <td className="border  font-medium text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.AORDERID)}
              </td>
              <td className="border  font-medium text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {x.AMATCH_TIME}
              </td>
            </tr>
          ))
        : props.data
          .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
          .slice(1)
          .map((x: any, index: any) => (
            <tr key={index} style={{ display: `${dropSell ? "" : "none"}` }}>
              <td className="  font-bold text-[#9C0A0A] border-gray-300 text-start pl-1  pr-2"></td>
              <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.AQUANTITY)}
              </td>
              <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.APRICE)}
              </td>
              <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.ATOTALVALUE)}
              </td>
              <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {formatNumber(x.AORDERID)}
              </td>
              <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
                {x.AMATCH_TIME}
              </td>
            </tr>
          ))}
    </>
  );
};
const TradingResult = () => {
  const { t } = useTranslation(["home"]);
  const [dataArr, setDataArr] = useState([]);
  const [drop, setDrop] = useState(false);
  const [dropSell, setDropSell] = useState(false);
  const [dataTotal, setDataTotal] = useState([]);
  const [dataTotalSell, setDataTotalSell] = useState([]);
  const [dataArrSell, setDataArrSell] = useState([]);
  const [data, setData] = useState<any>([]);
  const [dataSell, setDataSell] = useState<any>([]);
  const componentPDF = useRef<any>()
  const { dataApi } = useAppSelector((state) => state.dataApi)
  const handleExportToExcel = (e: any) => {
    e.preventDefault();
    const table = document.getElementById("table-id");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.xlsx";
    link.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(url);
  };
const handleExportToPDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Export PDF",
    onAfterPrint: () => alert("Export is successfully"),
  })
  const fetchBuyData = async () => {
    const buyData = dataApi?.Table?.filter((items: any) => items.ABUYSELL === "B");
    const uniqueData = _.uniqBy(buyData, "ASTOCKCODE");
    setDataTotal(buyData);
    setData(uniqueData);
    setDataArr(buyData);
  };
  const fetchBuyDataSell = async () => {
    const sellData = dataApi?.Table?.filter((items: any) => items.ABUYSELL === "S");
    const uniqueDataSell = _.uniqBy(sellData, "ASTOCKCODE");
    setDataSell(uniqueDataSell);
    setDataTotalSell(sellData);
    setDataArrSell(sellData);
  };
  useEffect(() => {
    fetchBuyData();
    fetchBuyDataSell();
  }, [dataApi, dataApi]);
  const calculateTotalQuantity = () => {
    if (dataTotal && dataTotal.length > 0) {
      const totalQuantity = dataTotal.reduce((accumulator: any, item: any) => {
        return accumulator + item.AQUANTITY;
      }, 0);
      return formatNumber(totalQuantity);
    }
    return 0;
  };

  const calculateaTOTALVALUE = () => {
    if (dataTotal && dataTotal.length > 0) {
      const ATOTALVALUE = dataTotal.reduce((accumulator: any, item: any) => {
        return accumulator + item.ATOTALVALUE;
      }, 0);
      return formatNumber(ATOTALVALUE);
    }
    return 0;
  };

  const calculateTotalQuantitySell = () => {
    if (dataTotalSell && dataTotalSell.length > 0) {
      const totalQuantity = dataTotalSell.reduce(
        (accumulator: any, item: any) => {
          return accumulator + item.AQUANTITY;
        },
        0
      );
      return formatNumber(totalQuantity);
    }
    return 0;
  };

  const calculateaTOTALVALUESell = () => {
    if (dataTotalSell && dataTotalSell.length > 0) {
      const ATOTALVALUE = dataTotalSell.reduce(
        (accumulator: any, item: any) => {
          return accumulator + item.ATOTALVALUE;
        },
        0
      );
      return formatNumber(ATOTALVALUE);
    }
    return 0;
  };
  const handelSetDrop = () => {
    setDrop(!drop);
    setDropSell(!dropSell);
  };
  return (
    <div className="">
      <div className="flex items-center justify-between mr-2">
        <div>
          {data.length > 0 || dataSell.length > 0 ? (
            <p
              onClick={handelSetDrop}
              className="text-[15px] text-[#2371AF] cursor-pointer underline	pl-5"
            >
              {drop ? "Xem rút gọn" : t("home:Order.View_Full")}
            </p>
          ) : (
            <p></p>
          )}
        </div>

        <div>
          <div>
            <div className="flex items-center gap-3 mt-1.5">
              <button className=" pl-2 mb-[1px]   pr-2 mr-[1px] cursor-pointer  w-[81px] h-[30px] rounded-[4px] text-white text-[12px]  uppercase bg-[#0055ba]">
                {t("home:base.CapNhat")}
              </button>
              {/* 2xl:mr-7 */}
              <form className="flex gap-[7px] mr-5  ">
                <img
                  className="cursor-pointer "
                  onClick={handleExportToExcel}
                  src={excell}
                  alt="excel"
                />
                <img
                  className="cursor-pointer "
                  onClick={handleExportToPDF}
                  src={pfd}
                  alt="pfd"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div ref={componentPDF} style={{width:"100%"}}>
        
              
      <div className="flex gap-[10px] mx-auto mt-[2px] ml-5 mr-7 ">
        {/* buy */}
        <div className="w-1/2 border-gray-300 h-fit">
          <div style={{ border: "1px solid #AAAAAA" }} className="flex relative !border-b-0   border-gray-300 gap-1 h-[30px] items-center bg-[#2371AF] ">
            <p className="mx-auto pr-[12px] !text-[12px] font-semibold text-center text-white">
              {t("home:Order.ORDER_MUA")}
            </p>
            <Tooltip title="Nhấn vào từng dòng để xem chi tiết khớp lệnh">
              <i style={{ fontSize: "12px" }} className="fa absolute  fa-info-circle left-[51.6%]   text-white" ></i>
            </Tooltip>
          </div>

          <table>
            <thead style={{ border: "1px solid #AAAAAA" }}>
              <tr className="bg-[#F3F3F3] ">
                <th style={{ width: "12%" }} className="border border-gray-300 !p-0 !h-[22px] !text-[12px]"> {t("home:Order.ORDER_MCK")}  </th>
                <th style={{ width: "12%" }} className="border border-gray-300 !p-0 !h-[22px] !text-[12px]">{t("home:Order.OPTIONS_KL")}</th>
                <th style={{ width: "12%" }} className="border border-gray-300 !p-0 !h-[22px] !text-[12px]">{t("home:base.Gia")}</th>
                <th style={{ width: "15%" }} className="border border-gray-300 !p-0 !h-[22px] !text-[12px]">{t("home:Order.THANHTIEN")}</th>
                <th style={{ width: "12%" }} className="border border-gray-300 !p-0 !h-[22px] !text-[12px]">{t("home:base.SHL")}</th>
                <th style={{ width: "35%" }} className="border border-gray-300 !p-0 !h-[22px] !text-[12px]">{t("home:Order.GKHOP")}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <Tbody drop={drop} data={dataArr} key={item.id} item={item} />
              ))}
              <tr className="bg-[#F3F3F3]">
                <td className="pl-1 font-bold border border-gray-300 ">{t("home:Order.TONG")}</td>
                <td className="font-bold border border-gray-300 text-end">
                  {calculateTotalQuantity() === 0 ? "" : calculateTotalQuantity()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="font-bold border border-gray-300 text-end">
                  {" "}
                  {calculateaTOTALVALUE() === 0 ? "" : calculateaTOTALVALUE()}
                </td>
                <td colSpan={2} className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* sell 2xl:mr-2 */}
        <div className="w-1/2 m-0 border-gray-300 ">
          <div style={{ border: "1px solid #AAAAAA" }} className="flex relative gap-1 !border-b-0 mx-auto  h-[30px] items-center bg-[#9C0A0A] ">
            <p className="mx-auto pr-[12px] font-semibold !text-[12px] text-white ">  {t("home:Order.ORDER_BAN")}  </p>
            <Tooltip title="Nhấn vào từng dòng để xem chi tiết khớp lệnh">
              <i style={{ fontSize: "12px" }} className="fa absolute fa-info-circle left-[51.6%]    text-white"></i>
            </Tooltip>
          </div>

          <table className="">
            <thead>
              <tr className="bg-[#F3F3F3]">
                <th style={{ width: "12%" }} className="border border-gray-300  !p-0  !h-[22px] !text-[12px]"> {t("home:Order.ORDER_MCK")}  </th>
                <th style={{ width: "12%" }} className="border border-gray-300  !p-0  !h-[22px]  !text-[12px]">{t("home:Order.OPTIONS_KL")}</th>
                <th style={{ width: "12%" }} className="border border-gray-300  !p-0 !h-[22px]  !text-[12px]">{t("home:base.Gia")}</th>
                <th style={{ width: "15%" }} className="border border-gray-300  !p-0 !h-[22px]  !text-[12px] ">{t("home:Order.THANHTIEN")}</th>
                <th style={{ width: "12%" }} className="border border-gray-300  !p-0 !h-[22px]  !text-[12px]">{t("home:base.SHL")}</th>
                <th style={{ width: "35%" }} className="border border-gray-300 !p-0  !h-[22px]  !text-[12px]">{t("home:Order.GKHOP")}</th>
              </tr>

            </thead>
            <tbody>
              {dataSell.map((item: any) => (
                <TbodySell
                  dropSell={dropSell}
                  data={dataArrSell}
                  key={item.id}
                  item={item}
                />
              ))}
              <tr className="bg-[#F3F3F3]">
                <td className="pl-1 font-bold border border-gray-300 ">{t("home:Order.TONG")}  </td>
                <td className="font-bold border border-gray-300 text-end">
                  {calculateTotalQuantitySell() === 0 ? "" : calculateTotalQuantitySell()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="font-bold border border-gray-300 text-end">
                  {" "}
                  {calculateaTOTALVALUESell() === 0 ? "" : calculateaTOTALVALUESell()}
                </td>
                <td colSpan={2} className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        </div>
    </div>
  );
};

export default React.memo(TradingResult);
