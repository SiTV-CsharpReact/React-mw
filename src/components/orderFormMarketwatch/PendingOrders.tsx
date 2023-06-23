import React, { useEffect, useState } from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import axios from "axios";
import _ from "lodash";
import { uniqBy, filter, sortBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/configureStore";
type Props = {
  value: number;
}
const PendingOrders: React.FC<Props> = (value) => {
  // console.log(value.value)
  const { t } = useTranslation(["home"]);
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
  console.log(data, "data ne")

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

  const handleExportToPDF = () => {
    // const table = document.getElementById('table-id');
    //   const doc: any = new jsPDF('p', 'pt');
    //   doc.addFont('Helvetica', 'Helvetica', 'normal')
    //   doc.setFont('Helvetica')
    //   if (table) {
    //     doc.autoTable({
    //     html: table,
    //     startX: 20,
    //     styles: {
    //       size:10,
    //       fontSize: 4,
    //       cellPadding: 6,
    //       fillColor: 'gray',
    //        font: 'Helvetica', lowercase: true,
    //     },
    //      tableWidth: 'auto',
    //      margin: { top: 20 },
    //   });
    // }
    // doc.save('filename.pdf');
  };
  // console.log(data)
  return (
    <div>
      <div className="flex gap-[160px] pl-8 mt-2 ">
        <div style={{ color: "#555" }}>
          <p>
            <span className="text-[14px]  leading-3 font-semibold text-[#333333]">
              {t("home:Order.ORDER_NOT")}
            </span>
            {t("home:Order.ORDER_NOT0")}
          </p>
          <p>  (1) {t("home:Order.ORDER_NOT1")} </p>
          <p>
            (2){t("home:Order.ORDER_NOT2")}
          </p>
        </div>

        <div className="flex items-center gap-3.5 ">
          <div className="">
            <label
              className="block mb-2 text-[11px] leading-3 !font-bold text-black"
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
              className="border !p-0 leading-1 w-[131.09px] !text-[12px] border-inherit rounded-[4px] !pl-2  text-start shadow-sm h-[28px]"
              name=""
              id="sanGD"
            >
              <option className="text-[12px] pb-2" value="">
                {t("home:Order.OPTIONS_TC")}
              </option>
              <option style={{padding: "0px 2px 1px"}} value="HNX.LISTED" className="text-[12px] pb-2">
                HNX.LISTED
              </option>
              <option style={{padding: "0px 2px 1px"}} value="HSX" className="text-[12px] pb-2">
                HSX
              </option>
            </select>
          </div>

          <div>
            <label
              className="block mb-2 text-[11px] leading-3 font-bold text-black"
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
              className="!p-0 !pl-2  w-[85.06px] !text-[12px] border rounded-[4px]  shadow-sm h-[28px] "
              name=""
              id=""
            >
              <option className="text-[12px] pb-2" value="">
                {t("home:Order.OPTIONS_TC")}
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

          <div className="">
            <label
              className="block mb-2 text-[11px] leading-3 font-semibold text-black"
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
              className="!p-0 !pr-10 !pl-3 w-[106.22px] !text-[12px] border rounded-[4px] border-inherit shadow-sm h-[28px] "
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

          <div>
            <label
              className="block mb-2 text-[11px] leading-3 !font-bold text-black"
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
              className="!p-0  !pl-2 !text-[12px] border  w-[108.7px] rounded-[4px] border-inherit shadow-sm h-[28px]"
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
            className=" w-[90.63px] h-[30px] cursor-pointer mt-5  rounded-[4px] text-white text-[12px] font-medium uppercase bg-[#0055ba]"
          >
            {t("home:base.CapNhat")}
          </button>
          <form className="flex gap-2 mt-5 mr-8">
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
      <div className="mt-2 ml-8 mr-8">
        <table id="table-id">
          <thead className="!bg-[#F3F3F3]">
            <tr>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3]  "
              >
                <span className="text-[12px]  !font-bold text-black"> {t("home:Order.ORDER_SUA")}</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] !w-[58px]"
              >
                <span className="text-[12px]  block !font-bold text-black">{t("home:Order.ORDER_HUY")}</span>
                <input className="rounded-sm" type="checkbox" />
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] w-[80px] "
              >
                <span className="text-[12px]  !font-bold text-black">{t("home:Order.ORDER_MCK")}  </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" , width:"88px" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px ]  !font-bold text-black">{t("home:Order.ORDER_LD")} </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] w-[115px] "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.LoaiGD")}  </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px] !font-bold text-black"> {t("home:base.base_KLC")} </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.base_KLD")}  </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] w-[65px]"
              >
                <span className="text-[12px ] !font-bold text-black">{t("home:base.Gia")}  </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] w-[140px]"
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.TinhTrangLenh")}</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.base_DG")}</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px] !font-bold text-black"> {t("home:base.SanGD")}</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] w-[125px]"
              >
                <span className="text-[12px ] !font-bold text-black">{t("home:base.base_SHL")}</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] w-[163px]"
              >
                <span className="text-[12px] !font-bold text-black">{t("home:base.base_TGDL")}</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", color: "#555" }}></td>
                  <td
                    style={{ border: "1px solid #ccc", color: "#555" }}
                    className="text-center "
                  >
                    <p className=" bg-[#F3F3F3] border mx-auto border-black w-[40px] rounded-sm ">
                      {t("home:Order.ORDER_HUY")} Hủy
                    </p>
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {item.ASTOCKCODE}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.AORDERTYPE}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.APRODUCTTYPE_VN}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.AQUANTITY}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.AQUANTITY}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.APRICE}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.AORDERSTATUS_VN}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.AMESSAGE_VN}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.AEXCHANGE}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.APLACEDBY}{" "}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #ccc", color: "#555" }}
                  >
                    {" "}
                    {item.ADATETIME}{" "}
                  </td>
                </tr>
              );
            })}
            <tr style={{ border: "1px solid #ccc" }} className="bg-[rgb(251,246,213)]">
              <td style={{ border: "1px solid #ccc" }}></td>
              <td className="text-center " style={{ border: "1px solid #ccc" }}>
                <p className="p-[.5px] px-[4px] mx-auto my-[1px] text-center text-gray-600 bg-white border border-gray-700 rounded-sm cursor-pointer w-fit "> Hủy </p>
              </td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
              <td style={{ border: "1px solid #ccc" }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(PendingOrders);
