import React, { useEffect, useState } from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import axios from "axios";
import _ from "lodash";
import { uniqBy, filter, sortBy } from "lodash";
const PendingOrders = () => {
  const [data, setData] = useState([]);
  const [dataAfter, setDataAfter] = useState({
    dataCoppy: [],
    dataValue: [],
    dataFiter: "",
    dataMap: "",
    sortData: "",
  });
  useEffect(() => {
    fetchDataValue();
  }, []);
  const fetchDataValue = async () => {
    try {
      const response = await axios.get("http://localhost:3005/items");
      console.log("response", response);
      const jsonData = response.data;
      const uniqueData = uniqBy(jsonData, "ASTOCKCODE");
      setDataAfter((prevState: any) => ({
        ...prevState,
        dataValue: uniqueData,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const hanDelSubmit = () => {
    let filteredData: any = [...dataAfter.dataCoppy];
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
      console.log("array", array);
      setData(array);
    } else {
      const array = filteredData.sort((a: any, b: any) =>
        a.AEXCHANGE.toUpperCase() < b.AEXCHANGE.toUpperCase() ? -1 : 1
      );
      console.log("array", array);
      setData(array);
    }
  };

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
  return (
    <div>
      <div className="flex justify-between pl-8 mt-2">
        <div style={{ color: "#555" }}>
          <p>
            <span className="text-[14px]  leading-3 font-semibold text-[#333333]">
              Lưu ý:{" "}
            </span>
            Khi Quý khách sửa lệnh đối với chứng khoán sàn HOSE, hệ thống sẽ
            thực hiện lần lượt:
          </p>
          <p> (1) Hủy phần chưa khớp của lệnh gốc</p>
          <p>
            {" "}
            (2) Tạo lệnh mới tương ứng theo yêu cầu sau khi bước (1) hoàn tất
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="">
            <label
              className="block mb-2 text-[10px]] leading-3 font-semibold text-[#333333]"
              htmlFor=""
            >
              Sàn GD
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  dataFiter: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="border leading-1 border-inherit rounded-md h-[37px]"
              name=""
              id="sanGD"
            >
              <option className="text-[10px] pb-2" value="">
                Tất cả
              </option>
              <option value="HNX.LISTED" className="text-[10px] pb-2">
                HNX.LISTED
              </option>
              <option value="HSX" className="text-[10px] pb-2">
                HSX
              </option>
            </select>
          </div>

          <div>
            <label
              className="block mb-2 text-[12px] leading-3 font-semibold text-[#333333]"
              htmlFor=""
            >
              Mã CK
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  dataMap: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="h-[37px] border rounded-md border-inherit"
              name=""
              id=""
            >
              <option className="text-[10px] pb-2" value="">
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

          <div className="">
            <label
              className="block mb-2 text-[12px] leading-3 font-semibold text-[#333333]"
              htmlFor=""
            >
              Sắp xếp theo
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  sortData: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="h-[37px] border rounded-md border-inherit"
              name=""
              id=""
            >
              <option className="text-[10px] pb-2" value="">
                Tất cả
              </option>
              <option className="text-[10px] pb-2" value="desc">
                Mã CK
              </option>
              <option className="text-[10px] pb-2" value="asc">
                Số lượng
              </option>
            </select>
          </div>

          <div>
            <label
              className="block mb-2 text-[12px] leading-3 font-semibold text-[#333333]"
              htmlFor=""
            >
              Tự sắp xếp
            </label>
            <select
              onChange={(e) =>
                setDataAfter((prevState) => ({
                  ...prevState,
                  sortData: e.target.value,
                }))
              }
              style={{ border: "1px solid #ccc", color: "#555" }}
              className="h-[37px] border rounded-md border-inherit"
              name=""
              id=""
            >
              <option className="text-[10px] text-gray-500" value="asc">
                Tăng dần
              </option>
              <option className="text-[10px] pb-0 text-gray-500" value="desc">
                Giảm dần
              </option>
            </select>
          </div>

          <button
            onClick={hanDelSubmit}
            className="p-2 cursor-pointer mt-5 pl-5 pr-5 rounded-md text-white text-[13px] font-medium uppercase bg-[#0055ba]"
          >
            Cập nhật
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
          <thead>
            <tr>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Sửa</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px] block ">Hủy</span>
                <input className="rounded-sm" type="checkbox" />
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Mã CK </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]"> Lệnh đặt</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Loại GD </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]"> KL chờ </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">KL đặt </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Giá </span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Tình trạng lệnh</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Diễn giải</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Sàn GD</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">SHL Tại sàn</span>
              </th>
              <th
                style={{ border: "1px solid #ccc", color: "#555" }}
                className="bg-[#F3F3F3] "
              >
                <span className="text-[12px]">Thời gian đặt lệnh</span>
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
                      Hủy
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
