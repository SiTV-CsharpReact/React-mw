import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
const SavingshistoryTransfer = () => {
  const dataSanPham = [
    {
      id: 1,
      name: "ALL",
    },
    {
      id: 2,
      name: "Tất cho FPTS vay",
    },
    {
      id: 3,
      name: "Tiền gửi ngân hàng",
    },
  ];
  const dataTinhtrang = [
    {
      id: 1,
      name: "ALL",
    },
    {
      id: 2,
      name: "Có hiệu lực",
    },
    {
      id: 1,
      name: "Đã tất toán",
    },
    {
      id: 1,
      name: "Hết hiệu lực",
    },
  ];
  const [valueStart1, setValueStart1] = useState<any>(new Date());
  const [valueStart2, setValueStart2] = useState<any>(new Date());
  const [valueEnd1, setValueEnd1] = useState<any>(null);
  const [valueEnd2, setValueEnd2] = useState<any>(null);
  const [focused, setFocused] = useState<any>(false);
  const [focused1, setFocused1] = useState<any>(false);
  const [valueButton, setValueButton] = useState<any>("ALL");
  const [valueButton1, setValueButton1] = useState<any>("ALL");
  const [showModal, setShowModal] = useState<any>(false);
  const [showModal1, setShowModal1] = useState<any>(false);
  const [dataSavingshistory, setDataSavingshistory] = useState<any>([]);
  const [dataDetailHistory, setDataDetailHistory] = useState<any>([]);
  const [dataDetailHistoryType2, setDataDetailHistoryType2] = useState<any>([]);
  const [query, setQuery] = useState<any>("");
  var sumAinitAmount = 0;
  var sumAamount = 0;
  var sumAvailIntereset = 0;
  var sumTax = 0;
  var sumInterestAfterTax = 0;
  var sumPaymentAmount = 0;
  const handleShowModal = (atermId: any) => {
    setShowModal(!showModal);
    setQuery(atermId);
  };
  const handleFocused = () => {
    setFocused(!focused);
  };
  const handleValue = (value: any) => {
    setValueButton(value);
  };
  const handleFocused1 = () => {
    setFocused1(!focused1);
  };
  const handleValue1 = (value: any) => {
    setValueButton1(value);
  };

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const promiseSavingHistory = axios.get(
        `http://localhost:3000/DataSavingshistory`
      );
      const promiseDetailHistory = axios.get(
        `http://localhost:3000/DataGetDetailHistory?id=${query}`
      );
      const promiseDetailHistoryType2 = axios.get(
        `http://localhost:3000/DataSavingshistoryType2?id=${query}`
      );
      const [savingHistoryRes, detailHistoryRes, detailHistoryType2Res] =
        await Promise.all([
          promiseSavingHistory,
          promiseDetailHistory,
          promiseDetailHistoryType2,
        ]);
      setDataSavingshistory(savingHistoryRes.data);
      setDataDetailHistory(detailHistoryRes.data);
      setDataDetailHistoryType2(detailHistoryType2Res.data);
    };
    fetchData();
  }, [query]);

  const exportToExcel = () => {
    const table: any = document.getElementById("tableId");
    const rows = Array.from(table.getElementsByTagName("tr"));

    const data = rows.map((row: any) => {
      const cells = Array.from(row.getElementsByTagName("td"));
      return cells.map((cell: any) => cell.innerText);
    });

    const columns = Array.from(table.getElementsByTagName("th")).map(
      (cell: any) => cell.innerText
    );

    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    XLSX.writeFile(workbook, "data.xlsx");
  };
  console.log(showModal1);

  return (
    <>
      <LayoutPage
        PageTitle="Danh sách hợp đồng cho vay"
        content="Danh sách hợp đồng cho vay"
      >
        <div className="hidden message">
          <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
          <p>
            Quý khách vui lòng đăng ký dịch vụ Eztransfer theo hướng dẫn &nbsp;
            <a
              target="_blank"
              href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
            >
              tại đây
            </a>
            .
          </p>
        </div>
        <div className="relative w-[100%] z-50 MainPage overflow-x-hidden">
          {/*------------------Modal------------------*/}
          <div
            className={`fixed py-10 flex items-center top-0 bottom-0 left-0 right-0 z-50 overflow-y-auto  overflow-x-hidden transition-all ${
              showModal
                ? "opacity-100 visible bg-black bg-opacity-20"
                : "opacity-0 invisible"
            }`}
            onClick={handleShowModal}
          >
            <div
              className={`${
                showModal1 ? "w-[40%]" : "w-[86%]"
              } z-30 m-auto relative bg-white text-center rounded-lg`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <button
                className="absolute w-[28px] h-[28px] flex items-center justify-center rounded-full text-white right-0 translate-x-3 -translate-y-3 bg-[#4C4C4C] text-[20px]"
                onClick={handleShowModal}
              >
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.54338 11.8333L0.376709 10.6666L5.04338 5.99996L0.376709 1.33329L1.54338 0.166626L6.21004 4.83329L10.8767 0.166626L12.0434 1.33329L7.37671 5.99996L12.0434 10.6666L10.8767 11.8333L6.21004 7.16663L1.54338 11.8333Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="flex items-center justify-center h-[50px] bg-[#034C91] rounded-t-lg text-white text-[24px] font-medium">
                LỊCH SỬ CHI TIẾT: 123
              </div>
              <div className="p-4">
                <div className="flex items-center border-b border-gray-400 text-[13px] font-bold">
                  <span
                    className={`${
                      showModal1 ? "border-transparent" : "border-blue-400"
                    } cursor-pointer text-[#212529] flex-1 py-[12px] text-center border-b-[1px] `}
                    onClick={() => {
                      setShowModal1(false);
                    }}
                  >
                    Lịch sử thanh toán tiền gốc và lãi
                  </span>
                  <span
                    className={`${
                      showModal1 ? "border-blue-400" : "border-transparent"
                    } cursor-pointer text-[#212529] text-center border-b-[1px] flex-1 py-[12px] `}
                    onClick={() => {
                      setShowModal1(true);
                    }}
                  >
                    Lịch sử gia hạn tiền cho vay
                  </span>
                </div>
                <div className={`${showModal1 ? "hidden" : "block"} mt-2`}>
                  <table className="w-full">
                    <thead className="w-full border">
                      <tr className="text-xs font-bold bg-[#EDEDED] ">
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          STT
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Ngày <br /> bắt đầu
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Ngày đáo <br /> hạn
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Số tiền <br /> cho vay
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Ngày thanh <br /> toán
                        </th>
                        <th
                          className="border-r border-[#DDDDDD] py-2"
                          rowSpan={2}
                        >
                          Số ngày <br /> cho vay <br /> thực
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Số tiền <br /> tính lãi
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Lãi <br /> suất/năm <br /> thực tế
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Tiền lãi <br /> trước <br /> thuế
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Thuế
                        </th>
                        <th
                          className="border-r border-[#DDDDDD]"
                          rowSpan={1}
                          colSpan={2}
                        >
                          Số tiền thanh toán
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Loại giao <br /> dịch
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Người <br /> yêu cầu
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Số tiền <br /> gốc còn <br /> lại
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          Trạng thái
                        </th>
                      </tr>
                      <tr className="text-xs font-bold bg-[#EDEDED] border-t border-[#DDDDDD]">
                        <th className="border-r border-[#DDDDDD]">Tiền gốc</th>
                        <th className="px-0 border-r border-[#DDDDDD]">
                          Tiền lãi sau thuế
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full border">
                      {dataDetailHistory.length > 0 &&
                        dataDetailHistory.map(
                          (item: any, index: number = 0) => {
                            sumAvailIntereset += item.availIntereset;
                            sumTax += item.tax;
                            sumInterestAfterTax += item.interestAfterTax;
                            sumPaymentAmount += item.paymentAmount;
                            return (
                              <tr
                                className="text-xs text-center hover:bg-[#EEFFEE] border-b border-[#DDDDDD]"
                                key={index}
                              >
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {index + 1}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.createDate}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.maturityDate}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.amount.toLocaleString()}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.paymentDate}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.availDay} ngày
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.amountCalInterst.toLocaleString()}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.availRate}%
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.availIntereset}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.tax}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.paymentAmount || "-"}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.interestAfterTax}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  Đáo hạn
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.placeBy}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.availAmount.toLocaleString()}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  Đã phê duyệt
                                </td>
                              </tr>
                            );
                          }
                        )}
                      <tr className="text-xs font-bold text-center bg-[#EDEDED]">
                        <td
                          colSpan={8}
                          className="py-1 border-r border-[#DDDDDD]"
                        >
                          Tổng
                        </td>
                        <td className="border-r border-[#DDDDDD]">
                          {sumAvailIntereset.toLocaleString()}
                        </td>
                        <td className="border-r border-[#DDDDDD]">
                          {sumTax.toLocaleString()}
                        </td>
                        <td className="border-r border-[#DDDDDD]">
                          {sumPaymentAmount.toLocaleString() || 0}
                        </td>
                        <td className="border-r border-[#DDDDDD]">
                          {sumInterestAfterTax.toLocaleString()}
                        </td>
                        <td colSpan={4}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={`${showModal1 ? "block" : "hidden"} mt-2`}>
                  <table className="w-full">
                    <thead className="w-full border ">
                      <tr className="text-xs font-bold bg-[#EDEDED]">
                        <th className="border-r border-[#DDDDDD] py-2">
                          Lần gia hạn
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          Ngày bắt đầu
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          Ngày đáo hạn
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          Số tiền cho vay
                        </th>
                        <th className="border-r border-[#DDDDDD]">Kỳ hạn</th>
                        <th className="border-r border-[#DDDDDD]">
                          Lãi xuất/ năm
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full border">
                      {dataDetailHistoryType2.length > 0 &&
                        dataDetailHistoryType2.map(
                          (
                            item: any,
                            index: any = dataDetailHistoryType2.length
                          ) => {
                            return (
                              <tr className="text-xs border-b border-[#DDDDDD] text-center hover:bg-[#EEFFEE]">
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {dataDetailHistoryType2.length - index - 1 ===
                                  0
                                    ? "Gửi mới"
                                    : dataDetailHistoryType2.length - index - 1}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.effectiveDate}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.maturityDate}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.amount.toLocaleString()}
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.term} ngày
                                </td>
                                <td className="py-[6px] border-r border-[#DDDDDD]">
                                  {item.rate}%
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/*------------------Screen------------------*/}
          <div className="mt-[30px]">
            <div className="flex justify-end gap-4 items-start text-[8pt] mr-[2%]">
              <div className="flex flex-col gap-1">
                <div className="z-10 flex items-center gap-2">
                  <span className="font-bold">Sản phẩm</span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center relative border h-[28px] rounded-[4px] ${
                        focused
                          ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                          : ""
                      }`}
                      onClick={handleFocused}
                    >
                      <input
                        type="text"
                        className="rounded-[4px] text-xs !border-none h-full w-full px-2 outline-none cursor-pointer"
                        onBlur={() => {
                          setFocused(false);
                        }}
                        value={valueButton}
                        readOnly
                      />
                      <span className="absolute right-2">
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 7.44697L0 1.6132L1.4 0.251984L6 4.72455L10.6 0.251984L12 1.6132L6 7.44697Z"
                            fill="#192132"
                          />
                        </svg>
                      </span>
                    </div>
                    {focused === true && (
                      <div className="absolute flex flex-col w-[160px] bg-white border shadow-xl py-[2px] rounded-lg">
                        {dataSanPham?.map((item, index) => (
                          <span
                            className="hover:bg-[#1E90FF] py-[4px] px-3 hover:text-white cursor-pointer"
                            onMouseDown={() => {
                              handleValue(item.name);
                            }}
                            key={index}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Tình trạng</span>
                  <div>
                    <div
                      className={`w-[160px] flex relative items-center pr-1 border h-[28px] rounded-[4px] ${
                        focused1
                          ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                          : ""
                      }`}
                      onClick={handleFocused1}
                    >
                      <input
                        type="text"
                        className="rounded-[4px] text-xs !border-none h-full w-full px-2 outline-none cursor-pointer"
                        onBlur={() => {
                          setFocused1(false);
                        }}
                        value={valueButton1}
                        readOnly
                      />
                      <span className="absolute right-2">
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 7.44697L0 1.6132L1.4 0.251984L6 4.72455L10.6 0.251984L12 1.6132L6 7.44697Z"
                            fill="#192132"
                          />
                        </svg>
                      </span>
                    </div>
                    {focused1 === true && (
                      <div className="absolute flex flex-col w-[160px] bg-white border shadow-xl py-[2px] rounded-lg">
                        {dataTinhtrang?.map((item, index) => (
                          <span
                            className="hover:bg-[#1E90FF] py-[4px] px-3 hover:text-white cursor-pointer"
                            onMouseDown={() => {
                              handleValue1(item.name);
                            }}
                            key={index}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-[11px]">
                  <span className="font-bold">Ngày bắt đầu từ ngày</span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={setValueStart1}
                        value={valueStart1}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm !border-none outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Ngày đáo hạn từ ngày</span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={setValueStart2}
                        value={valueStart2}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm !border-none outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Đến ngày</span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={setValueEnd1}
                        value={valueEnd1}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm !border-none outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Đến ngày</span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={setValueEnd2}
                        value={valueEnd2}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm !border-none outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-2">
                  <button onClick={exportToExcel}>
                    <img
                      src="/xls.webp"
                      alt=""
                      className="w-[25px] h-[30px] object-cover"
                    />
                  </button>
                  <div>
                    <div
                      className={`opacity-0 flex items-center pr-1 border h-7 rounded-[4px] `}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-20 h-[28px] border border-[#2371AF] rounded-md text-black transition-all hover:bg-[#2371AF] hover:text-white">
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 mb-6 border">
              <table className="w-full" id="tableId">
                <thead className="border-b bg-[#F3F3F3]">
                  <tr>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px] px-1">
                      STT
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Mã HĐ cho vay
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Sản phẩm
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Tên gợi nhớ
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Số tiền cho vay <br /> ban đầu
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Số tiền cho vay <br /> hiện tại
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Kỳ hạn
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Lãi <br /> suất/năm <br /> hiện tại
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Phương thức đáo hạn
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Ngày tạo
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Ngày bắt đầu
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Ngày hết hiệu lực
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      Tình trạng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSavingshistory.length > 0 &&
                    dataSavingshistory.map((item: any, index: number = 0) => {
                      sumAinitAmount = sumAinitAmount + item.ainitAmount;
                      sumAamount = sumAamount + item.aamount;
                      return (
                        <tr
                          className="border-b hover:bg-[#EEFFEE]"
                          onClick={() => {
                            handleShowModal(item.atermId);
                          }}
                          key={item.atermId}
                        >
                          <td className="text-xs leading-[22px] px-1 border-r text-center py-[1px]">
                            {index + 1}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {item.atermId}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            Tiền cho FPTS vay
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {item.adesc}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-right pl-6">
                            {item.ainitAmount.toLocaleString()}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-right pl-6">
                            {item.aamount.toLocaleString()}
                          </td>
                          <td className="text-xs text-right leading-[22px] px-1 border-r pl-3">
                            {item.aterm} ngày
                          </td>
                          <td className="text-xs leading-[22px] text-right px-1 border-r pl-10">
                            {item.arate}%
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            Lãi nhập gốc
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {moment(item.acreatedate).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {moment(item.aeffectiveDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r"></td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            Có hiệu lực
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="bg-[#F3F3F3] text-[9pt]">
                    <td
                      className="text-xs leading-[22px] px-1 font-semibold text-center"
                      colSpan={4}
                    >
                      Tổng
                    </td>
                    <td className="px-1 border-x border-[#ddd] font-semibold text-end">
                      {sumAinitAmount.toLocaleString()}
                    </td>
                    <td className="px-1 border-x border-[#ddd] font-semibold text-end">
                      {sumAamount.toLocaleString()}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default SavingshistoryTransfer;
