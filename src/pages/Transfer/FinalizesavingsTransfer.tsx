import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import InputDateTimePicker from "../../layout/InputDateTimePicker";
import ItemDropDown from "../../layout/ItemDropDown";
const FinalizesavingsTransfer = () => {
  const { t } = useTranslation(["home"]);
  const dataDropdown = [
    "ALL",
    t("home:Transfer.TienChoFPTSVay"),
    t("home:Transfer.TienGuiNganHang"),
  ];

  const [focused, setFocused] = useState<any>(false);
  const [queryGetRateByDay, setQueryGetRateByDay] = useState<any>([]);
  const [querySavingshistory, setQuerySavingshistory] = useState<any>([]);
  var sumAavailamount = 0;

  const [fetchData, setFetchData] = useState<any>({
    dataSavingshistory: [],
    transferGetRateByDay: [],
  });

  const [values, setValue] = useState<any>({
    valueProduct: "ALL",
    valueBeginningDateFrom: new Date(),
    valueBeginningDateTo: null,
    valueMaturityDateFrom: new Date(),
    valueMaturityDateTo: null,
    valueMoneyModal: 0,
  });

  const [isTrue, setIsTrue] = useState<any>({
    fullWithdrawal: false,
    showModal: false,
  });

  const handleSetValue = (name: any, value: any) => {
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleShowModal = (value?: any, value2?: any) => {
    setIsTrue({ ...isTrue, showModal: !isTrue.showModal });
    setQueryGetRateByDay(value);
    setQuerySavingshistory(value2);
  };
  const handleFocused = () => {
    setFocused(!focused);
  };
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const savingHistoryPromise = axios.get(
        "http://localhost:8060/DataSavingshistory"
      );
      const transferGetRateByDayPromise = axios.get(
        `http://localhost:8060/DataTransferGetRateByDay?day=${queryGetRateByDay}`
      );
      const [savingHistoryRes, transferGetRateByDayRes] = await Promise.all([
        savingHistoryPromise,
        transferGetRateByDayPromise,
      ]);

      setFetchData({
        ...fetchData,
        dataSavingshistory: savingHistoryRes.data,
        transferGetRateByDay: transferGetRateByDayRes.data,
      });
    };
    fetchData();
  }, [queryGetRateByDay]);

  const handleInputChange = (event: any) => {
    let inputValue = event.target.value;
    const validChars = /^[0-9][0-9]*$/; // Cho phép số từ 0 đến 9 ở đầu và tiếp theo có thể là bất kỳ số nào

    if (!validChars.test(inputValue)) {
      // Nếu giá trị nhập không hợp lệ, xóa các ký tự không phải số
      inputValue = inputValue.replace(/[^0-9]/g, "");
    }
    const formattedValue = formatNumber(inputValue);

    handleSetValue("valueMoneyModal", formattedValue);
  };
  const formatNumber = (numberString: any) => {
    // Chuyển đổi chuỗi số thành số
    const number = Number(numberString);

    // Kiểm tra nếu số không hợp lệ hoặc NaN, trả về chuỗi rỗng
    if (isNaN(number) || !isFinite(number)) {
      return "";
    }

    // Định dạng số với dấu phẩy ngăn cách hàng nghìn
    return number.toLocaleString();
  };
  return (
    <>
      <LayoutPage
        PageTitle={t("home:Transfer.TatToanTienChoVay")}
        content={t("home:Transfer.TatToanTienChoVay")}
      >
        <div className="hidden message">
          <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
          <p>
            {" "}
            Quý khách vui lòng đăng ký dịch vụ Eztransfer theo hướng dẫn &nbsp;
            <a
              target="_blank"
              href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
            >
              {" "}
              tại đây
            </a>
            .
          </p>
        </div>
        <div className="relative w-[100%] z-50 MainPage overflow-x-hidden">
          {/*------------------Modal------------------*/}
          <div
            className={`fixed py-10 flex items-center top-0 bottom-0 left-0 right-0 z-50 overflow-y-auto  overflow-x-hidden transition-all ${
              isTrue.showModal
                ? "opacity-100 visible bg-black bg-opacity-20"
                : "opacity-0 invisible"
            }`}
            onClick={handleShowModal}
          >
            <div
              className="w-[800px] m-auto min-h-[776px] relative z-50 bg-white opacity-100 rounded-lg"
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
              <div className="flex items-center justify-center h-[50px] bg-[#034C91] rounded-t-lg text-white text-[24px] font-medium uppercase">
                {t("home:Transfer.XacNhanTatToan")}
              </div>
              {fetchData.dataSavingshistory?.length > 0 &&
                fetchData.dataSavingshistory?.map(
                  (item: any, index: number) => {
                    if (querySavingshistory === item.atermId) {
                      return (
                        <div className="px-[112px] mt-4" key={index}>
                          <div className="bg-[#E5E5E5] w-full py-[7px] flex flex-col gap-[20px] px-[15px] text-xs">
                            <div className="flex items-center w-full">
                              <span className="flex-1">
                                {t("home:Transfer.SanPham")}
                              </span>
                              <span className="flex-1">
                                {t("home:Transfer.TienChoFPTSVay")}
                              </span>
                            </div>
                            <div className="flex items-center w-full">
                              <span className="flex-1">
                                {t("home:Transfer.SoTienChoVay")}
                              </span>
                              <span className="flex-1 leading-[22px]">
                                {item.aavailamount.toLocaleString()} VNĐ <br />
                                <span className="italic">
                                  Bằng chữ: Một triệu không trăm linh một nghìn
                                  hai trăm ba mươi hai đồng.
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center w-full">
                              <span className="flex-1">
                                {t("home:Transfer.TenGoiNho")}
                              </span>
                              <span className="flex-1">{item.adesc}</span>
                            </div>
                            <div className="flex items-center w-full">
                              <span className="flex-1">
                                {t("home:Transfer.NgayBatDau")}
                              </span>
                              <span className="flex-1">
                                {moment(item.acreatedate).format("DD/MM/YYYY")}
                              </span>
                            </div>
                            <div className="flex items-center w-full">
                              <span className="flex-1">
                                {t("home:Transfer.NgayDaoHan")}
                              </span>
                              <span className="flex-1">
                                {moment(item.aeffectiveDate).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="w-full px-[15px] mt-2 text-[#007db7]">
                            <div className="flex items-center w-full text-xs">
                              <span className="flex-1">
                                {t("home:Transfer.LoaiTatToan")}
                              </span>
                              <div className="flex-1">
                                <div className="overflow-hidden transition-all relative z-50 text-sm rounded-full h-[28px] bg-[#CCCCCC] text-[#787878] w-[240px]">
                                  <button
                                    className={`${
                                      isTrue.fullWithdrawal === true
                                        ? ""
                                        : "bg-[#034C91] text-white "
                                    } transition-all h-full rounded-full z-40 w-[120px]`}
                                    onClick={() => {
                                      setIsTrue({
                                        ...isTrue,
                                        fullWithdrawal: false,
                                      });
                                    }}
                                  >
                                    {t("home:Transfer.MotPhan")}
                                  </button>
                                  <button
                                    className={`text-center z-40 w-[120px] transition-all rounded-full h-full ${
                                      isTrue.fullWithdrawal === true
                                        ? "bg-[#034C91] text-white "
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setIsTrue({
                                        ...isTrue,
                                        fullWithdrawal: true,
                                      });
                                      handleSetValue(
                                        "valueMoneyModal",
                                        item.aavailamount.toLocaleString()
                                      );
                                    }}
                                  >
                                    {t("home:Transfer.ToanBo")}
                                  </button>
                                </div>
                              </div>
                            </div>
                            {isTrue.fullWithdrawal === true ? (
                              <div className="flex items-center mt-4">
                                <div className="flex-1 text-[#007db7] text-xs">
                                  {t("home:Transfer.XacNhanTatToan")}
                                </div>
                                <div className="flex items-center justify-center flex-1 gap-2 ">
                                  <div
                                    className={`w-full relative flex items-center text-sm border h-[28px] rounded-[4px] bg-[#e9ecef]`}
                                  >
                                    <input
                                      type="text"
                                      name="money"
                                      placeholder="Nhập số tiền"
                                      value={values.valueMoneyModal.toLocaleString()}
                                      className="rounded-[4px] h-full w-full !border-none px-2 outline-none text-[#495057] bg-[#e9ecef] text-xs font-normal"
                                      disabled
                                    />
                                    <span className="absolute right-2">
                                      VNĐ
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-center w-2 h-1 pr-2 opacity-0">
                                    <span className="text-xl font-bold text-center text-red-400 translate-y-1">
                                      *
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center mt-4">
                                <div className="flex-1 text-[#007db7] text-xs">
                                  {t("home:Transfer.XacNhanTatToan")}
                                </div>
                                <div className="flex items-center justify-center flex-1 gap-2 ">
                                  <div
                                    className={`w-full relative flex items-center text-sm border h-[28px] rounded-[4px]`}
                                  >
                                    <input
                                      type="text"
                                      name="money"
                                      placeholder="Nhập số tiền"
                                      value={values.valueMoneyModal}
                                      onChange={handleInputChange}
                                      className="rounded-[4px] h-full w-full !border-none px-2 outline-none text-[#495057] text-xs font-normal"
                                    />
                                    <span className="absolute right-2">
                                      VNĐ
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-center w-2 h-1 pr-2 ">
                                    <span className="text-xl font-bold text-center text-red-400 translate-y-1 ">
                                      *
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="flex text-[12px] text-[#999999] min-h-[55px] items-start mt-1">
                              <div className="flex-1"></div>
                              <div className="flex items-end justify-end flex-1">
                                <span className="italic">
                                  {t("home:Transfer.BangChu")}
                                </span>
                                <div className="flex items-center justify-center w-4 h-full"></div>
                              </div>
                            </div>
                            {fetchData.transferGetRateByDay?.length > 0 &&
                              fetchData.transferGetRateByDay?.map(
                                (item: any, index: any) => {
                                  return (
                                    <div key={index}>
                                      <div className="flex text-[12px] pt-[20px]">
                                        <div className="flex-1">
                                          {t("home:Transfer.SoNgayChoVayThuc")}
                                        </div>
                                        <div className="flex-1">
                                          <span>
                                            {item.day - 1}{" "}
                                            {t("home:Transfer.Ngay")}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex text-[12px] pt-[25px]">
                                        <div className="flex-1">
                                          {t(
                                            "home:Transfer.LaiSuatTatToanTruocHan"
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <span>{item.rate}%</span>
                                        </div>
                                      </div>
                                      <div className="flex text-[12px] pt-[25px]">
                                        <div className="flex-1">
                                          {t("home:Transfer.TienLaiTruocThue")}
                                        </div>
                                        <div className="flex-1">
                                          <span>0 VNĐ</span>
                                        </div>
                                      </div>
                                      <div className="flex text-[12px] pt-[25px]">
                                        <div className="flex-1">
                                          {t("home:Transfer.Thue")}
                                        </div>
                                        <div className="flex-1">
                                          <span>0 VNĐ</span>
                                        </div>
                                      </div>
                                      <div className="flex text-[12px] pt-[25px]">
                                        <div className="flex-1">
                                          {t("home:Transfer.TongTienThucNhan")}
                                        </div>
                                        <div className="flex-1">
                                          <span>
                                            {values.valueMoneyModal.toLocaleString() ||
                                              "0"}{" "}
                                            VNĐ
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                          <div className="w-full border shadow-[0_0_5.5px_1px_#dddddd] mt-[45px] mb-10 h-[42px] text-[13px] pl-5 items-center flex justify-between pr-1">
                            <span>{t("home:Transfer.XacNhanDatLenh")}</span>
                            <div className="border h-[34px] w-[220px] flex rounded-md">
                              <div className="flex items-center justify-center border-r bg-[#e9ecef] px-3">
                                <svg
                                  width="18"
                                  height="16"
                                  viewBox="0 0 22 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.4049 4.8C10.4049 4.13333 10.1715 3.56667 9.70488 3.1C9.23822 2.63333 8.67155 2.4 8.00488 2.4C7.33822 2.4 6.77155 2.63333 6.30488 3.1C5.83822 3.56667 5.60488 4.13333 5.60488 4.8C5.60488 5.15 5.68405 5.49583 5.84238 5.8375C5.50072 5.67917 5.15488 5.6 4.80488 5.6C4.13822 5.6 3.57155 5.83333 3.10488 6.3C2.63822 6.76667 2.40488 7.33333 2.40488 8C2.40488 8.66667 2.63822 9.23333 3.10488 9.7C3.57155 10.1667 4.13822 10.4 4.80488 10.4C5.47155 10.4 6.03822 10.1667 6.50488 9.7C6.97155 9.23333 7.20488 8.66667 7.20488 8C7.20488 7.65 7.12572 7.30417 6.96738 6.9625C7.30905 7.12083 7.65488 7.2 8.00488 7.2C8.67155 7.2 9.23822 6.96667 9.70488 6.5C10.1715 6.03333 10.4049 5.46667 10.4049 4.8ZM21.0424 13.6C21.0424 13.7417 20.8382 14.0167 20.4299 14.425C20.0215 14.8333 19.7465 15.0375 19.6049 15.0375C19.5299 15.0375 19.4111 14.9708 19.2486 14.8375C19.0861 14.7042 18.934 14.5667 18.7924 14.425C18.6507 14.2833 18.4903 14.1167 18.3111 13.925C18.132 13.7333 18.0299 13.625 18.0049 13.6L16.8049 14.8L19.5549 17.55C19.7882 17.7833 19.9049 18.0667 19.9049 18.4C19.9049 18.75 19.7424 19.0875 19.4174 19.4125C19.0924 19.7375 18.7549 19.9 18.4049 19.9C18.0715 19.9 17.7882 19.7833 17.5549 19.55L9.16738 11.1625C7.70072 12.2542 6.17988 12.8 4.60488 12.8C3.24655 12.8 2.1403 12.3729 1.28613 11.5188C0.431966 10.6646 0.00488281 9.55833 0.00488281 8.2C0.00488281 6.86667 0.400716 5.5625 1.19238 4.2875C1.98405 3.0125 3.01738 1.97917 4.29238 1.1875C5.56738 0.395833 6.87155 0 8.20488 0C9.56322 0 10.6695 0.427083 11.5236 1.28125C12.3778 2.13542 12.8049 3.24167 12.8049 4.6C12.8049 6.175 12.259 7.69583 11.1674 9.1625L15.6049 13.6L16.8049 12.4C16.7799 12.375 16.6715 12.2729 16.4799 12.0938C16.2882 11.9146 16.1215 11.7542 15.9799 11.6125C15.8382 11.4708 15.7007 11.3188 15.5674 11.1563C15.434 10.9938 15.3674 10.875 15.3674 10.8C15.3674 10.6583 15.5715 10.3833 15.9799 9.975C16.3882 9.56667 16.6632 9.3625 16.8049 9.3625C16.9132 9.3625 17.009 9.40417 17.0924 9.4875C17.1424 9.5375 17.334 9.72292 17.6674 10.0438C18.0007 10.3646 18.3424 10.6958 18.6924 11.0375C19.0424 11.3792 19.4028 11.7375 19.7736 12.1125C20.1445 12.4875 20.4486 12.8125 20.6861 13.0875C20.9236 13.3625 21.0424 13.5333 21.0424 13.6Z"
                                    fill="#495057"
                                  />
                                </svg>
                              </div>
                              <input
                                type="password"
                                placeholder={t(
                                  "home:Transfer.NhapMatKhauGiaoDich"
                                )}
                                className="w-full pl-2 text-xs transition-all border rounded-r-md border-[#ced4da] outline-none focus:border-[#80bdff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,.25)]"
                              />
                            </div>
                            <div className="flex gap-1">
                              <button className="px-[14px] py-[6px] h-[34px] rounded-md border border-[#2371af] hover:bg-[#2371af] hover:text-white transition-all">
                                {t("home:Transfer.ThucHien")}
                              </button>
                              <button className="px-[14px] py-[6px] h-[34px] rounded-md border border-[#2371af] hover:bg-[#2371af] hover:text-white transition-all">
                                {t("home:Transfer.QuayLai")}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                    }
                  }
                )}
            </div>
          </div>
          {/*------------------Screen------------------*/}
          <div className="mt-[29px]">
            <div className="flex justify-end gap-[20px] items-start text-[8pt] mr-[35px]">
              {/*------------------DropDown Sản phẩm------------------*/}
              <ItemDropDown
                label={t("home:Transfer.SanPham")}
                value={values.valueProduct || "ALL"}
                classParent={"flex items-center gap-2"}
                dataDropDown={dataDropdown}
                handleSetValue={handleSetValue}
                nameValue={"valueProduct"}
                classLabel={"font-bold !text-[8pt]"}
                classParentDropDown={"w-[160px]"}
              ></ItemDropDown>

              {/*------------------Date Start------------------*/}
              <div className="flex flex-col gap-[2px]">
                <InputDateTimePicker
                  onChange={handleSetValue}
                  value={values.valueBeginningDateFrom}
                  nameDate={"valueBeginningDateFrom"}
                  label={t("home:Transfer.NgayBatDauTuNgay")}
                  classDiv={"gap-[10px] justify-between"}
                  classDatePicker={"h-[28px] w-[124px]"}
                  classLabel={""}
                ></InputDateTimePicker>
                <InputDateTimePicker
                  onChange={handleSetValue}
                  value={values.valueMaturityDateFrom}
                  nameDate={"valueMaturityDateFrom"}
                  label={t("home:Transfer.NgayDaoHanTuNgay")}
                  classDiv={"gap-[10px] justify-between"}
                  classDatePicker={"h-[28px] w-[124px]"}
                  classLabel={""}
                ></InputDateTimePicker>
              </div>
              {/*------------------Date End------------------*/}
              <div className="flex flex-col gap-[2px]">
                <InputDateTimePicker
                  onChange={handleSetValue}
                  value={values.valueBeginningDateTo}
                  nameDate={"valueBeginningDateTo"}
                  label={t("home:Transfer.DenNgay")}
                  classDiv={"gap-[10px] justify-between"}
                  classDatePicker={"h-[28px] w-[124px]"}
                  classLabel={""}
                ></InputDateTimePicker>
                <InputDateTimePicker
                  onChange={handleSetValue}
                  value={values.valueMaturityDateTo}
                  nameDate={"valueMaturityDateTo"}
                  label={t("home:Transfer.DenNgay")}
                  classDiv={"gap-[10px] justify-between"}
                  classDatePicker={"h-[28px] w-[124px]"}
                  classLabel={""}
                ></InputDateTimePicker>
              </div>
              {/*------------------Button------------------*/}
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-[2px] h-[28px]">
                  <span className="font-bold"></span>
                  <div>
                    <div
                      className={`opacity-0 flex items-center pr-1 border h-7 rounded-[4px] `}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-20 border border-[#2371AF] rounded-md text-black leading-[26px] transition-all hover:bg-[#2371AF] hover:text-white">
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
            {/*------------------Table------------------*/}
            <div className="mt-2 mb-6 border">
              <table className="w-full">
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
                    <th className="text-xs font-bold whitespace-pre-line border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.SoTienChoVayHienTai")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.KyHan")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.LaiSuat/Nam")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.TienLaiSauThueDuKien")}
                    </th>
                    <th className="text-xs font-bold whitespace-pre-line border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.TienLaiCongDon")}{" "}
                      <Tooltip title="Tiền lãi cộng dồn tính đến thời điểm hiện tại, tính theo lãi suất tất toán đúng hạn">
                        <i
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          id="iconPage"
                        ></i>
                      </Tooltip>
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.NgayBatDau")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.NgayDaoHan")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.PhuongThucDaoHan")}
                    </th>
                    <th className="text-xs font-bold border-r border-[#ddd] h-[50px]">
                      {t("home:Transfer.TatToan")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchData.dataSavingshistory?.length > 0 &&
                    fetchData.dataSavingshistory.map(
                      (item: any, index: number = 0) => {
                        sumAavailamount += item.aavailamount;
                        return (
                          <tr
                            className="border-b hover:bg-[#EEFFEE] text-center"
                            onClick={() => {
                              handleShowModal(item.aterm, item.atermId);
                            }}
                            key={item.atermId}
                          >
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {index + 1}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {item.atermId}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {t("home:Transfer.TienChoFPTSVay")}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {item.adesc}
                            </td>
                            <td className="text-xs text-end leading-[22px] px-1 border-r">
                              {item.aavailamount.toLocaleString()}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r text-right">
                              {item.aterm} {t("home:Transfer.Ngay")}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r text-right">
                              {item.arate}%
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r text-right">
                              {item.interestAfterTaxTmp}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r text-right">
                              {item.interestTmp}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {moment(item.acreatedate).format("DD/MM/YYYY")}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {moment(item.aeffectiveDate).format("DD/MM/YYYY")}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r">
                              {t("home:Transfer.LaiNhapGoc")}
                            </td>
                            <td className="text-xs leading-[22px] px-1 border-r flex items-center justify-center">
                              <button className="h-[27px] w-20 bg-[#2371AF] text-white transition-all hover:bg-white hover:!text-black border border-[#2371AF] rounded-md">
                                {t("home:Transfer.TatToan")}
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  <tr className="bg-[#F3F3F3] text-[9pt]">
                    <td className="text-xs leading-[22px] px-1 font-semibold">
                      {t("home:Transfer.Tong")}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="px-1 border-x border-[#ddd] font-semibold text-end">
                      {sumAavailamount.toLocaleString()}
                    </td>
                    <td></td>
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

            <span className="text-[13px] ml-3 italic">
              {t("home:Transfer.NOTE_FOOT_ORDERSAVING")}
            </span>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default FinalizesavingsTransfer;
