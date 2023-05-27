import React, { useEffect, useState } from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import axios from "axios";
import _ from "lodash";
import { uniqWith, isEqual } from "lodash";

const TradingResult = () => {
  const [selectedData, setSelectedData] = useState(null);

  const [data, setData] = useState<any>([]);
  const [dataSell, setDataSell] = useState<any>([]);

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
    const table = document.getElementById("table-id");
    const doc: any = new jsPDF("p", "pt");
    doc.addFont("Helvetica", "Helvetica", "normal");
    doc.setFont("Helvetica");
    if (table) {
      doc.autoTable({
        html: table,
        startX: 20,
        styles: {
          size: 10,
          fontSize: 4,
          cellPadding: 6,
          fillColor: "gray",
          font: "Helvetica",
          lowercase: true,
        },
        tableWidth: "auto",
        margin: { top: 20 },
      });
    }
    doc.save("filename.pdf");
  };

  // const fetchData = async () => {
  //   const { data } = await axios.get("http://localhost:3005/Data");
  //   const uniqueData = _.uniqBy(data.Table, 'ASTOCKCODE');
  //   setData(uniqueData);
  //   console.log("data", data);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchBuyData = async () => {
    const { data } = await axios.get("http://localhost:3005/Data");
    const buyData = data.Table.filter((items: any) => items.ABUYSELL === "B");
    const uniqueData = _.uniqBy(buyData, "ASTOCKCODE");
    setData(uniqueData);
    console.log("buyData", buyData);
  };
  useEffect(() => {
    fetchBuyData();
  }, []);

     const fetchBuyDataSell = async () => {
    const { data } = await axios.get("http://localhost:3005/Data");
    const sellData = data.Table.filter((items: any) => items.ABUYSELL === "S");
    const uniqueDataSell = _.uniqBy(sellData, "ASTOCKCODE");
    setDataSell(uniqueDataSell);
    console.log("buyData", uniqueDataSell);
  };
  useEffect(() => {
    fetchBuyDataSell();
  }, []);

  const handleRowClick = (data: any) => {
    setSelectedData(data);
  };

  const calculateTotalQuantity = () => {
    if (data && data.length > 0) {
      const totalQuantity = data.reduce((accumulator: any, item: any) => {
        return accumulator + item.AQUANTITY;
      }, 0);
      return totalQuantity.toLocaleString('vi-VN');
    }
    return 0;
  };

  const calculateaTOTALVALUE = () => {
    if (data && data.length > 0) {
      const ATOTALVALUE = data.reduce((accumulator: any, item: any) => {
        return accumulator + item.ATOTALVALUE;
      }, 0);
      return ATOTALVALUE.toLocaleString('vi-VN');
    }
    return 0;
  };

     const calculateTotalQuantitySell = () => {
    if (dataSell && dataSell.length > 0) {
      const totalQuantity = dataSell.reduce((accumulator: any, item: any) => {
        return accumulator + item.AQUANTITY;
      }, 0);
      return totalQuantity.toLocaleString('vi-VN');
    }
    return 0;
  };

  const calculateaTOTALVALUESell = () => {
    if (dataSell && dataSell.length > 0) {
      const ATOTALVALUE = dataSell.reduce((accumulator: any, item: any) => {
        return accumulator + item.ATOTALVALUE;
      }, 0);
      return ATOTALVALUE.toLocaleString('vi-VN');
    }
    return 0;
  };
  return (
    <div className="min-h-[500px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[15px] text-[#2371AF] cursor-pointer underline	pl-5">
            Xem đầy đủ
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button className="p-1 cursor-pointer  pl-5 pr-5 rounded-md text-white text-[13px] font-medium uppercase bg-[#0055ba]">
            Cập nhật
          </button>
          <form className="flex gap-2  mr-8">
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

      <div className=" flex mx-auto ml-5 mr-5 gap-3 mt-2">
        {/* buy */}
        <div className=" h-fit border-gray-300 w-1/2">
          <div className="flex relative   border-gray-300 gap-1 h-[30px] items-center bg-[#2371AF] ">
            <p className="text-center mx-auto font-semibold text-white">MUA</p>
            <i className="fa absolute fa-info-circle left-[52.5%] top-2  text-white"></i>
          </div>

          <table>
            <thead>
              <tr className="bg-[#F3F3F3]">
                <th className="border border-gray-300">Mã CK </th>
                <th className="border border-gray-300 w-[92px]">Khối lượng</th>
                <th className="border border-gray-300">Giá</th>
                <th className="border border-gray-300 w-1/6">Thành tiền</th>
                <th className="border border-gray-300">SHL</th>
                <th className="border border-gray-300">Giờ khớp</th>
              </tr>
            </thead>
            <tbody className="w-fit">
              {data.map((item: any, index: any) => {
                return (
                  <tr  key={index} className="hover:bg-[rgb(238,254,237)]">
                    <td
                      className="border pl-1  font-bold text-[#2371AD] border-gray-300"
                    >
                      {item.ASTOCKCODE}
                    </td>
                    <td className="border  font-bold text-[#2371AD] border-gray-300 text-end pr-2">
                      {item.AQUANTITY}
                    </td>
                    <td className="border font-bold text-[#2371AD] border-gray-300 text-end pr-2">
                      {item.APRICE}
                    </td>
                    <td className="border font-bold  text-[#2371AD] border-gray-300 text-end pr-2">
                      {item.ATOTALVALUE}
                    </td>
                    <td className="border font-bold  text-[#2371AD]  border-gray-300 text-end pr-2">
                      {item.AORDERID}
                    </td>
                    <td className="border  font-bold text-[#2371AD] border-gray-300 text-end  pr-2">
                      {item.AMATCH_TIME}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-[#F3F3F3]">
                <td className=" font-bold border border-gray-300">Tổng</td>
                <td className="border text-end border-gray-300 font-bold">
                  {calculateTotalQuantity()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300 text-end font-bold">
                  {" "}
                  {calculateaTOTALVALUE()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* sell */}
        <div className="  max-h-fit border-gray-300 w-1/2">
          <div className="flex relative gap-1 mx-auto  h-[30px] items-center bg-[#9C0A0A] ">
            <p className=" font-semibold  mx-auto text-white">BÁN </p>
            <i className="fa absolute fa-info-circle left-[52.5%] top-2  text-white"></i>
          </div>

          <table className="">
            <thead>
              <tr className="bg-[#F3F3F3]">
                <th className="border border-gray-300">Mã CK </th>
                <th className="border border-gray-300 w-[92px]">Khối lượng</th>
                <th className="border border-gray-300">Giá</th>
                <th className="border border-gray-300 w-1/6">Thành tiền</th>
                <th className="border border-gray-300">SHL</th>
                <th className="border border-gray-300">Giờ khớp</th>
              </tr>
            </thead>
            <tbody>
              {dataSell.map((item: any, index : any) => {
                return <tr key={index} className="hover:bg-[rgb(238,254,237)]">
                <td className="border  font-bold text-[#9C0A0A] border-gray-300  pl-1">
                      {item.ASTOCKCODE}
                </td>
                <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{item.AQUANTITY}</td>
                <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{item.APRICE}</td>
                <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{item.APRICE}</td>
                <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{item.ATOTALVALUE}</td>
                <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{item.AMATCH_TIME}</td>
              </tr>
              })}
               <tr className="bg-[#F3F3F3]">
                <td className=" font-bold border border-gray-300">Tổng</td>
                <td className="border text-end border-gray-300 font-bold">
                  {calculateTotalQuantitySell()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300 text-end font-bold">
                  {" "}
                  {calculateaTOTALVALUESell()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradingResult;
