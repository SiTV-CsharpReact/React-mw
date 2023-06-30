import React, { useEffect, useRef, useState} from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import axios from "axios";
import _ from "lodash";
import { uniqBy, filter, sortBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/configureStore";
import {useReactToPrint} from "react-to-print";
type Props = {
  value: number;
}
const PendingOrders: React.FC<Props> = (value) => {
  // console.log(value.value)
  const { t } = useTranslation(["home"]);
  const componentPDF = useRef<any>()
  const [data, setData] = useState([]);
  const [dataAfter, setDataAfter] = useState({
    dataCoppy: [],
    dataValue: [],
    dataFiter: "",
    dataMap: "",
    sortData: "",
  });
  const { dataApiPendingOder } = useAppSelector((state) => state.dataApiPendingOder)
  console.log("data day ne", dataApiPendingOder)

  const fetchDataValue = async () => {
    try {
      const response = await axios.get("http://localhost:3006/items");

      const jsonData = response.data;
      const uniqueData = uniqBy(jsonData, "ASTOCKCODE");
      console.log("response", uniqueData);
      // console.log("uniqueData",uniqueData)
      setDataAfter((prevState: any) => ({
        ...prevState,
        dataValue: uniqueData,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data, "data ne")

  const hanDelSubmit = () => {
    // let filteredData: any = [...dataAfter.dataCoppy];
    let filteredData: any = [...dataAfter.dataValue];
    if (dataAfter.dataFiter) {
      filteredData = filteredData.filter(
        (item: any) => item.AEXCHANGE.toUpperCase() === dataAfter.dataFiter
      );
    }
    if (dataAfter.dataMap) {
      filteredData = filteredData.filter(
        (item: any) => item.ASTOCKCODE.toUpperCase() === dataAfter.dataMap
      );
    }
    if (dataAfter.sortData === "asc") {
      const array = filteredData.sort((a: any, b: any) =>
        a.AEXCHANGE.toUpperCase() > b.AEXCHANGE.toUpperCase() ? -1 : 1
      );
      setData(array);
    } else {
      const array = filteredData.sort((a: any, b: any) =>
        a.AEXCHANGE.toUpperCase() < b.AEXCHANGE.toUpperCase() ? -1 : 1
      );
      setData(array);
    }
  };
  useEffect(() => {
    fetchDataValue();
    // value.value === 1
  }, [dataApiPendingOder]);

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
  return (
    <div>
      <div className="grid grid-cols-2 mt-1 ">
        <div className="pl-[29.3px]" style={{ color: "#333333" , lineHeight: 1.42 }}>
          <p>
            <span className="text-[13px]   font-semibold text-[#333333]">
              {t("home:Order.ORDER_NOT")}
            </span>
            {t("home:Order.ORDER_NOT0")}
          </p>
          <p className="pl-[7px] pt-[1px]">  (1) {t("home:Order.ORDER_NOT1")} </p>
          <p className="pl-[7px] mt-[-1px]">
            (2){t("home:Order.ORDER_NOT2")}
          </p>
        </div>

        <div className="pl-[18px] flex items-center !gap-[7px] ">
          <div className=" mt-[4px]">
            <label
              className="block pl-1.5 mb-[5px] text-[11px] leading-3 !font-bold text-black"
              htmlFor=""
            >
              {t("home:base.SanGD")}
            </label>

            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  dataFiter: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="border hohohoho !p-0 leading-1 w-[85.09px] xl:w-[93px] 2xl:w-[128.94px] !text-[12px] border-inherit rounded-[4px] !pl-2  text-start shadow-sm h-[28px]"
              name=""
              id="sanGD"
            >
              <option className="text-[12px] pb-2" value="">
                {/* {t("home:Order.OPTIONS_TC")} */}
                Tất cả
              </option>
              <option style={{padding: "0px 2px 1px"}} value="HNX.LISTED" className="text-[12px] pb-2">
                HNX.LISTED
              </option>
              <option style={{padding: "0px 2px 1px"}} value="HSX" className="text-[12px] pb-2">
                HSX
              </option>
            </select>
          </div>

          <div className=" mt-[4px]">
            <label
              className="block pl-1.5 mb-[5px] text-[11px] leading-3 font-bold text-black"
              htmlFor=""
            >
              {t("home:Order.ORDER_MCK")}
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  dataMap: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555",minHeight:"1.2em" }}
              className="!p-0 !pl-2  hohohoho w-[85.09px] xl:w-[93px] 2xl:w-[128.94px] !text-[12px] border rounded-[4px]  shadow-sm h-[28px] "
              name=""
              id=""
            >
              <option className="text-[12px] pb-2" value="">
                {/* {t("home:Order.OPTIONS_TC")} */}
                Tất cả
              </option>
              {dataAfter.dataValue.map((items: any, index: number) => (
                <option
                  key={index}
                  className="text-[12px] pb-2"
                  value={items.ASTOCKCODE}
                >
                  {items.ASTOCKCODE}
                </option>
              ))}
            </select>
          </div>

          <div className=" mt-[4px]">
            <label
              className="block pl-1 mb-[5px] text-[11px] leading-3 font-semibold text-black"
              htmlFor=""
            >
              {t("home:Order.ORDER_SXT")}
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  sortData: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="!p-0 !pr-10 hohohoho !pl-2 w-[89.09px] xl:w-[114.67px] 2xl:w-[160.45px] !text-[12px] border rounded-[4px] border-inherit shadow-sm h-[28px] "
              name=""
              id=""
            >
              <option className="text-[12px] pb-2" value="">
                {t("home:Order.OPTIONS_TC")}
              </option>
              <option className="text-[12px] pb-2" value="desc">
                {t("home:Order.ORDER_MCK")}
              </option>
              <option className="text-[12px] pb-2" value="asc">
                {t("home:Order.OPTIONS_SL")}
              </option>
            </select>
          </div>

          <div className=" mt-[4px]">
            <label
              className="block pl-1.5 mb-[5px] text-[11px] leading-3 !font-bold text-black"
              htmlFor=""
            >
              {t("home:Order.ORDER_TSX")}
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  sortData: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="!p-0 hohohoho !pl-2 !text-[12px] border  w-[89.09px] xl:w-[117px] 2xl:w-[164.17px] rounded-[4px] border-inherit shadow-sm h-[28px]"
              name=""
              id=""
            >
              <option className="text-[12px] text-gray-500" value="asc">
                {t("home:base.TangDan")}
              </option>
              <option className="text-[12px] pb-0 text-gray-500" value="desc">
                {t("home:base.GiamDan")}
              </option>
            </select>
          </div>

          <button
            onClick={hanDelSubmit}
            className=" w-[87.09px] ml-[5px] xl:w-[99.08px] 2xl:w-[140.92px] h-[30px] cursor-pointer mt-5  rounded-[4px] text-white text-[12px] font-medium uppercase bg-[#0055ba]"
          >
            {t("home:base.CapNhat")}
          </button>
          <div className="pl-[4.5px] flex gap-[5px] mt-4 ">
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
          </div>
        </div>
       
      </div>
      <div  className="mt-[1.5px] ml-[30px] mr-[30px]">
        <div ref={componentPDF} style={{width:"100%"}}>
            <table id="table-id">
          <thead className="!bg-[#F3F3F3] ">
            <tr className=""> 
              <th 
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[67px] 2xl:w-[90px]  !h-[40px] !text-[12px] "
              >
                <span className="text-[12px]  !font-bold text-black"> {t("home:Order.ORDER_SUA")}</span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] box-content	 xl:w-[66.72px] 2xl:w-[91.22px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px] relative top-[-2px]  block !font-bold text-black">{t("home:Order.ORDER_HUY")}</span>
              <input className="rounded-sm relative top-[-1px]  w-[13px] h-[13px]" type="checkbox" />
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[89px] 2xl:w-[118.03px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px]  !font-bold text-black">{t("home:Order.ORDER_MCK")}  </span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3]  !h-[40px] !text-[12px] w-[108px] 2xl:w-[146.06px] !p-0 "
              >
                <span className="text-[12px ]  !font-bold text-black">{t("home:Order.ORDER_LD")} </span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[102px] 2xl:w-[137.8px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.LoaiGD")}  </span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[95.61px] 2xl:w-[128.91px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black"> {t("home:base.base_KLC")} </span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3]  xl:w-[88.7px] !h-[40px] !text-[12px] 2xl:w-[119.58px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.base_KLD")}  </span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[61.56px] 2xl:w-[83px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px ] !font-bold text-black">{t("home:base.Gia")}  </span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[164px] 2xl:w-[220px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.TinhTrangLenh")}</span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[107px]  !h-[40px] !text-[12px] 2xl:w-[145.09px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.base_DG")}</span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3]  !h-[40px] !text-[12px] 2xl:w-[132px]  xl:w-[97.49px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black"> {t("home:base.SanGD")}</span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[135px] 2xl:w-[182px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px ] !font-bold text-black">{t("home:base.base_SHL")}</span>
              </th>
              <th
                style={{ border: "1px solid #dedede", color: "#555" }}
                className="bg-[#F3F3F3] xl:w-[190px] 2xl:w-[255px] !h-[40px] !text-[12px] !p-0 "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.base_TGDL")}</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td style={{ border: "1px solid #dedede", color: "#555" }}></td>
                  <td
                    style={{ border: "1px solid #dedede", color: "#555" }}
                    className="text-center "
                  >
                    <p className=" bg-[#F3F3F3] border mx-auto border-black w-[40px] rounded-sm ">
                      {t("home:Order.ORDER_HUY")} Hủy
                    </p>
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {item.ASTOCKCODE}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.AORDERTYPE}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.APRODUCTTYPE_VN}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.AQUANTITY}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.AQUANTITY}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.APRICE}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.AORDERSTATUS_VN}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.AMESSAGE_VN}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.AEXCHANGE}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.APLACEDBY}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #dedede", color: "#555" }}
                  >
                    {" "}
                    {item.ADATETIME}{" "}
                  </td>
                </tr>
              );
            })}
            <tr style={{ border: "1px solid #dedede" }} className="bg-[rgb(251,246,213)]">
              <td style={{ border: "1px solid #dedede" }}></td>
              <td className="p-0 text-center" style={{ border: "1px solid #dedede",lineHeight:"1.2em" ,verticalAlign: "text-top" }}>
                {/* <p style={{background:"rgba(240, 240, 240)",border:"1px rgb(0, 0, 0)"}} className="py-[1px] !border !border-[rgba(0,0,0)] px-[6px] mx-auto my-[1px] text-center text-gray-600   rounded-sm cursor-pointer  "> Hủy </p> */}
           <button  style={{verticalAlign: "text-top"}} className=" w-[37.24px] text-[12px] text-[#333333] h-[22px] py-[2px] px-[6px] m-[3px] cursor-pointer leading-[1.2em] !bg-[#F0F0F0] !border  !border-[#555555]  hover:bg-[#555555] rounded-[2.6px]">Hủy</button>
              </td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
              <td style={{ border: "1px solid #dedede" }}></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default React.memo(PendingOrders);
