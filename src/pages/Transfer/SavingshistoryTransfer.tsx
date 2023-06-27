import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";
const SavingshistoryTransfer = () => {
  const { t } = useTranslation(["home"]);
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
  const [focused, setFocused] = useState<any>(false);
  const [focused1, setFocused1] = useState<any>(false);
  const [dataSavingshistory, setDataSavingshistory] = useState<any>([]);
  const [dataDetailHistory, setDataDetailHistory] = useState<any>([]);
  const [dataDetailHistoryType2, setDataDetailHistoryType2] = useState<any>([]);
  var sumAinitAmount = 0;
  var sumAamount = 0;
  var sumAvailIntereset = 0;
  var sumTax = 0;
  var sumInterestAfterTax = 0;
  var sumPaymentAmount = 0;

  const [values, setValues] = useState<any>({
    valueBeginningDateFrom: new Date(),
    valueMaturityDateFrom: new Date(),
    valueBeginningDateTo: null,
    valueMaturityDateTo: null,
    valueProduct: "ALL",
    valueStatus: "ALL",
    modalPrincipalAndInterest: false,
    modalLoanRenewal: false,
    query: "",
  });
  const handleSetValue = (key: any, value: any) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  // const handleShowModal = (atermId: any) => {
  //   setShowModal(!showModal);
  //   setQuery(atermId);
  // };
  const handleFocused = () => {
    setFocused(!focused);
  };
  const handleFocused1 = () => {
    setFocused1(!focused1);
  };

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const promiseSavingHistory = axios.get(
        `http://localhost:3000/DataSavingshistory`
      );
      const promiseDetailHistory = axios.get(
        `http://localhost:3000/DataGetDetailHistory?id=${values.query}`
      );
      const promiseDetailHistoryType2 = axios.get(
        `http://localhost:3000/DataSavingshistoryType2?id=${values.query}`
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
  }, [values.query]);

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

  return (
    <>
      <LayoutPage
        PageTitle={t("home:Transfer.DanhSachHopDongChoVay")}
        content={t("home:Transfer.DanhSachHopDongChoVay")}
      >
        <div className="hidden message">
          <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
          <p>
            Quý khách vui lòng đăng ký dịch vụ Eztransfer theo hướng dẫn &nbsp;
            <a
              target="_blank"
              href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
              rel="noreferrer"
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
              values.modalPrincipalAndInterest
                ? "opacity-100 visible bg-black bg-opacity-20"
                : "opacity-0 invisible"
            }`}
            onClick={() => {
              setValues({
                ...values,
                modalPrincipalAndInterest: false,
                modalLoanRenewal: false,
              });
            }}
          >
            <div
              className={`${
                values.modalLoanRenewal ? "w-[40%]" : "w-[86%]"
              } z-30 m-auto relative bg-white text-center rounded-lg`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <button
                className="absolute w-[28px] h-[28px] flex items-center justify-center rounded-full text-white right-0 translate-x-3 -translate-y-3 bg-[#4C4C4C] text-[20px]"
                onClick={() => {
                  setValues({
                    ...values,
                    modalPrincipalAndInterest: false,
                    modalLoanRenewal: false,
                  });
                }}
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
              <div className="flex items-center justify-center uppercase h-[50px] bg-[#034C91] rounded-t-lg text-white text-[24px] font-medium">
                {t("home:Transfer.LichSuChiTiets")}: 123
              </div>
              <div className="p-4">
                <div className="flex items-center border-b border-gray-400 text-[13px] font-bold">
                  <span
                    className={`${
                      values.modalLoanRenewal
                        ? "border-transparent"
                        : "border-blue-400"
                    } cursor-pointer text-[#212529] flex-1 py-[12px] text-center border-b-[1px] `}
                    onClick={() => {
                      setValues({ ...values, modalLoanRenewal: false });
                    }}
                  >
                    {t("home:Transfer.LichSuThanhToanTienGocVaLai")}
                  </span>
                  <span
                    className={`${
                      values.modalLoanRenewal
                        ? "border-blue-400"
                        : "border-transparent"
                    } cursor-pointer text-[#212529] text-center border-b-[1px] flex-1 py-[12px] `}
                    onClick={() => {
                      setValues({ ...values, modalLoanRenewal: true });
                    }}
                  >
                    {t("home:Transfer.LichSuGiaHanTienChoVay")}
                  </span>
                </div>
                <div
                  className={`${
                    values.modalLoanRenewal ? "hidden" : "block"
                  } mt-2`}
                >
                  <table className="w-full">
                    <thead className="w-full border">
                      <tr className="text-xs font-bold bg-[#EDEDED] ">
                        <th
                          className="border-r px-2 border-[#DDDDDD]"
                          rowSpan={2}
                        >
                          {t("home:Transfer.STT")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.NgayBatDau")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.NgayDaoHan")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.SoTienChoVay")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.NgayThanhToan")}
                        </th>
                        <th
                          className="border-r border-[#DDDDDD] py-2"
                          rowSpan={2}
                        >
                          {t("home:Transfer.SoNgayChoVayThuc")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.SoTienTinhLai")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.LaiSuat/NamThucTe")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.TienLaiTruocThue")}
                        </th>
                        <th
                          className="border-r px-2 border-[#DDDDDD]"
                          rowSpan={2}
                        >
                          {t("home:Transfer.Thue")}
                        </th>
                        <th
                          className="border-r border-[#DDDDDD]"
                          rowSpan={1}
                          colSpan={2}
                        >
                          {t("home:Transfer.SoTienThanhToan")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.LoaiGD")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.NguoiYeuCau")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.SoTienGocConLai")}
                        </th>
                        <th className="border-r border-[#DDDDDD]" rowSpan={2}>
                          {t("home:Transfer.TrangThai")}
                        </th>
                      </tr>
                      <tr className="text-xs font-bold bg-[#EDEDED] border-t border-[#DDDDDD]">
                        <th className="border-r border-[#DDDDDD]">
                          {t("home:Transfer.TienGoc")}
                        </th>
                        <th className="px-0 border-r border-[#DDDDDD]">
                          {t("home:Transfer.TienLaiSauThue")}
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
                                <td className="py-[2px] border-r border-[#DDDDDD]">
                                  {index + 1}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.createDate}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.maturityDate}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.amount.toLocaleString()}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.paymentDate}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.availDay} {t("home:Transfer.Ngay")}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.amountCalInterst.toLocaleString()}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.availRate}%
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.availIntereset}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.tax}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.paymentAmount || "-"}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.interestAfterTax}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {t("home:Transfer.DaoHan")}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.placeBy}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {item.availAmount.toLocaleString()}
                                </td>
                                <td className="px-2 whitespace-nowrap border-r border-[#DDDDDD]">
                                  {t("home:Transfer.DaPheDuyet")}
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
                          {t("home:Transfer.Tong")}
                        </td>
                        <td className="border-r px-2 whitespace-nowrap border-[#DDDDDD]">
                          {sumAvailIntereset.toLocaleString()}
                        </td>
                        <td className="border-r px-2 whitespace-nowrap border-[#DDDDDD]">
                          {sumTax.toLocaleString()}
                        </td>
                        <td className="border-r px-2 whitespace-nowrap border-[#DDDDDD]">
                          {sumPaymentAmount.toLocaleString() || 0}
                        </td>
                        <td className="border-r px-2 whitespace-nowrap border-[#DDDDDD]">
                          {sumInterestAfterTax.toLocaleString()}
                        </td>
                        <td colSpan={4}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className={`${
                    values.modalLoanRenewal ? "block" : "hidden"
                  } mt-2`}
                >
                  <table className="w-full">
                    <thead className="w-full border ">
                      <tr className="text-xs font-bold bg-[#EDEDED]">
                        <th className="border-r border-[#DDDDDD] py-2">
                          {t("home:Transfer.LanGiaHan")}
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          {t("home:Transfer.NgayBatDau")}
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          {t("home:Transfer.NgayDaoHan")}
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          {t("home:Transfer.SoTienChoVay")}
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          {t("home:Transfer.KyHan")}
                        </th>
                        <th className="border-r border-[#DDDDDD]">
                          {t("home:Transfer.LaiSuat/Nam")}
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
                                <td className="px-2 border-r border-[#DDDDDD]">
                                  {dataDetailHistoryType2.length - index - 1 ===
                                  0
                                    ? "Gửi mới"
                                    : dataDetailHistoryType2.length - index - 1}
                                </td>
                                <td className="px-2 border-r border-[#DDDDDD]">
                                  {item.effectiveDate}
                                </td>
                                <td className="px-2 border-r border-[#DDDDDD]">
                                  {item.maturityDate}
                                </td>
                                <td className="px-2 border-r border-[#DDDDDD]">
                                  {item.amount.toLocaleString()}
                                </td>
                                <td className="px-2 border-r border-[#DDDDDD]">
                                  {item.term} {t("home:Transfer.Ngay")}
                                </td>
                                <td className="px-2 border-r border-[#DDDDDD]">
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
                <div className="z-10 grid items-center grid-cols-4 gap-2">
                  <span className="col-span-1 font-bold">
                    {t("home:Transfer.SanPham")}
                  </span>
                  <div className="col-span-3">
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
                        value={values.valueProduct}
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
                              handleSetValue("valueProduct", item.name);
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
                <div className="grid items-center grid-cols-4 gap-2">
                  <span className="col-span-1 font-bold">
                    {t("home:Transfer.TinhTrang")}
                  </span>
                  <div className="col-span-3">
                    <div
                      className={`w-[160px] flex relative items-center border h-[28px] rounded-[4px] ${
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
                        value={values.valueStatus}
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
                              handleSetValue("valueStatus", item.name);
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
                <div className="grid grid-cols-10 items-center gap-[11px]">
                  <span className="col-span-4 font-bold">
                    {t("home:Transfer.NgayBatDauTuNgay")}
                  </span>
                  <div className="col-span-6">
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={(date: any) => {
                          handleSetValue("valueBeginningDateFrom", date);
                        }}
                        value={values.valueBeginningDateFrom}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid items-center grid-cols-10 gap-2">
                  <span className="col-span-4 font-bold">
                    {t("home:Transfer.NgayDaoHanTuNgay")}
                  </span>
                  <div className="col-span-6">
                    <div
                      className={`w-[160px] ml-[1px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={(date: any) => {
                          handleSetValue("valueMaturityDateFrom", date);
                        }}
                        value={values.valueMaturityDateFrom}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm !border-none outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    {t("home:Transfer.DenNgay")}
                  </span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={(date: any) => {
                          handleSetValue("valueBeginningDateTo", date);
                        }}
                        value={values.valueBeginningDateTo}
                        format="dd/MM/yy"
                        className="w-full text-[13px] rounded-sm !border-none outline-none h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    {t("home:Transfer.DenNgay")}
                  </span>
                  <div>
                    <div
                      className={`w-[160px] flex items-center h-[28px] rounded-[4px] `}
                    >
                      <DatePicker
                        onChange={(date: any) => {
                          handleSetValue("valueMaturityDateTo", date);
                        }}
                        value={values.valueMaturityDateTo}
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
                    {t("home:Transfer.CapNhat")}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 mb-6 border">
              <table className="w-full" id="tableId">
                <thead className="border-b bg-[#F3F3F3]">
                  <tr>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px] px-1">
                      {t("home:Transfer.STT")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.MaHDChoVay")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.SanPham")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.TenGoiNho")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.SoTienChoVayBanDau")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.SoTienChoVayHienTai")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.KyHan")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.LaiSuat/NamHienTai")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.PhuongThucDaoHan")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.NgayTao")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.NgayBatDau")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.NgayHieuLuc")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.TinhTrang")}
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
                            setValues({
                              ...values,
                              modalPrincipalAndInterest: true,
                              modalLoanRenewal: false,
                              query: item.atermId,
                            });
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
                            {t("home:Transfer.TienChoFPTSVay")}
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
                            {item.aterm} {t("home:Transfer.Ngay")}
                          </td>
                          <td className="text-xs leading-[22px] text-right px-1 border-r pl-10">
                            {item.arate}%
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {t("home:Transfer.LaiNhapGoc")}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {moment(item.acreatedate).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {moment(item.aeffectiveDate).format("DD/MM/YYYY")}
                          </td>
                          <td className="text-xs leading-[22px] px-1 border-r"></td>
                          <td className="text-xs leading-[22px] px-1 border-r text-center">
                            {t("home:Transfer.CoHieuLuc")}
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="bg-[#F3F3F3] text-[9pt]">
                    <td
                      className="text-xs leading-[22px] px-1 font-semibold text-center"
                      colSpan={4}
                    >
                      {t("home:Transfer.Tong")}
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
