import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import ItemDropDown from "../../layout/ItemDropDown";
const OrdersavingsTransfer = () => {
  const { t } = useTranslation(["home"]);
  const [isTrue, setIsTrue] = useState<any>({
    showModal: false,
    focusLendingAmount: false,
    focusTerm: false,
    dropDownTerm: false,
    focusMaturityMethod: false,
    dropDownMaturityMethod: false,
    focusRenewalMethod: false,
    dropDownRenewalMethod: false,
    focusNickname: false,
  });

  const dataPTDH = [
    t("home:Transfer.TuDongTatToan"),
    t("home:Transfer.TuDongGiaHan"),
  ];
  const dataPTGH = [
    t("home:Transfer.LaiNhapGoc"),
    t("home:Transfer.LaiTraVeTK"),
  ];

  const [values, setValue] = useState({
    valueLendingAmount: "",
    valueTerm: "",
    valueMaturityMethod: "",
    valueRenewalMethod: "",
    valueAnnualInterestRate: "",
    valueNickname: "",
  });

  const handleSetValue = (name: any, value: any) => {
    setValue({
      ...values,
      [name]: value,
    });
  };
  const [fetchData, setFetchData] = useState<any>({
    valueBalanceDetail: [],
    valueInterestRate: [],
    valueDataInterestRate: [],
  });
  const [isActive, setIsActive] = useState(null);
  const [dateEnd, setDateEnd] = useState("");

  const handleTrue = (value: any) => {
    setIsTrue((isTrue: any) => ({
      ...isTrue,
      [value]: !isTrue[value],
    }));
  };

  //fetch data from server
  useEffect(() => {
    const fetchBalanceDetail = async () => {
      try {
        const balanceDetailPromise = axios.get(
          "http://localhost:8060/TableGetBalanceDetail"
        );
        const interestRatePromise = axios.get(
          "http://localhost:8060/TableGetInterestRate"
        );
        const datainterestRatePromise = axios.get(
          "http://localhost:8060/DataGetInterestRate"
        );
        const [
          balanceDetailResponse,
          interestRateResponse,
          datainterestRateResponse,
        ] = await Promise.all([
          balanceDetailPromise,
          interestRatePromise,
          datainterestRatePromise,
        ]);
        setFetchData({
          ...values,
          valueBalanceDetail: balanceDetailResponse.data[0],
          valueInterestRate: interestRateResponse.data,
          valueDataInterestRate: datainterestRateResponse.data,
        });
        // setBalanceDetail(balanceDetailResponse.data[0]);
        // setInterestRate(interestRateResponse.data);
        // setDataInterestRate(datainterestRateResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBalanceDetail();
  }, []);

  // handle lai suat
  const handleLaiSuat = (item: any, index: any) => {
    const futureDate = new Date();

    setIsActive(index);
    if (item.iTimeType === 0) {
      futureDate.setDate(futureDate.getDate() + item.term);
      setDateEnd(
        futureDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    } else if (item.iTimeType === 1) {
      futureDate.setDate(futureDate.getDate() + item.term * 7);
      setDateEnd(
        futureDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    } else if (item.iTimeType === 2) {
      futureDate.setMonth(futureDate.getMonth() + item.term);
      setDateEnd(
        futureDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    }
    setValue({
      ...values,
      valueTerm:
        item.term +
        " " +
        (item.timeType === "Ngày"
          ? t("home:Transfer.Ngay")
          : item.timeType === "Tuần"
          ? t("home:Transfer.Tuan")
          : t("home:Transfer.Thang")),
      valueAnnualInterestRate: item.rate + "%",
    });
    // setLaiS(item.rate + "%");
  };

  const handleInputChange = (event: any) => {
    let inputValue = event.target.value;
    const validChars = /^[1-9][0-9]*$/; // Chỉ cho phép từ số 1 đến 9 ở đầu và tiếp theo có thể là bất kỳ số nào

    if (!validChars.test(inputValue)) {
      // Nếu giá trị nhập không hợp lệ, xóa các ký tự không phải số
      inputValue = inputValue.replace(/[^1-9]/g, "");
    }
    const formattedValue = formatNumber(inputValue);

    setValue({ ...values, valueLendingAmount: formattedValue });
  };

  const formatNumber = (numberString: any) => {
    // Chuyển đổi chuỗi số thành mảng các ký tự
    const chars = numberString.split("");

    // Đảo ngược mảng và chèn dấu phẩy sau mỗi 3 ký tự
    const reversedFormatted = chars
      .reverse()
      .reduce((result: any, char: any, index: number) => {
        if (index > 0 && index % 3 === 0) {
          result.push(",");
        }
        result.push(char);
        return result;
      }, []);

    // Đảo ngược lại mảng và kết hợp thành chuỗi
    return reversedFormatted.reverse().join("");
  };
  //Reset Value
  const handleReset = () => {
    setDateEnd("");
    setIsActive(null);
  };

  return (
    <>
      <LayoutPage
        PageTitle={t("home:Transfer.TienChoVayEzSaving")}
        content={t("home:Transfer.TienChoVayEzSaving")}
      >
        <div className="hidden message">
          <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
          <p>
            Quý khách vui lòng đăng ký dịch vụ QUẢN LÝ TIỀN GỬI, TIỀN CHO VAY -
            EzSaving theo hướng dẫn &nbsp;
            <a
              target="_blank"
              href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
            >
              tại đây .
            </a>
          </p>
        </div>
        <div>
          {/* -------------------------------showModel-------------------------------*/}
          <div
            className={`fixed z-50 ${
              isTrue.showModal ? "opacity-100 visible" : "opacity-0 invisible"
            } flex items-center justify-center top-0 bottom-0 right-0 left-0 transition-all`}
          >
            <div
              className="absolute w-full h-full bg-black opacity-20"
              onClick={() => {
                handleTrue("showModal");
              }}
            ></div>
            <div
              className={`absolute rounded-md z-50 ${
                isTrue.showModal ? "opacity-100 visible" : "opacity-0 invisible"
              } transition-fallAnimation w-[300px] bg-white`}
            >
              <button
                className="absolute right-0 top-0 translate-x-[40%] -translate-y-[40%] overflow-hidden bg-[#4d4d4d] p-[6px] border-none rounded-full outline-none max-w-max max-h-max"
                onClick={() => {
                  handleTrue("showModal");
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="p-3 text-white text-center bg-[#034c91] rounded-t-md font-medium text-[1rem] uppercase">
                {t("home:Transfer.LaiSuatTatToanTruocHan")}
              </div>
              <div className="pt-2 pb-5 text-xs px-7">
                <div className="flex items-center justify-between px-1 pt-3 pb-2 font-bold">
                  <span className="">
                    {" "}
                    {t("home:Transfer.SoNgayChoVayThuc")}
                  </span>
                  <span className="w-[46%] text-right">
                    {" "}
                    {t("home:Transfer.LaiSuat/Nam")}
                  </span>
                </div>
                {fetchData.valueDataInterestRate.length > 0 &&
                  fetchData.valueDataInterestRate.map(
                    (item: any, index: number = 0) => {
                      return (
                        <div
                          className={`${
                            index % 2 === 1 ? "" : "bg-[#eeeeee]"
                          } flex items-center justify-between px-1 py-3 `}
                          key={index}
                        >
                          <span>
                            {item.dateFrom !== item.dateTo
                              ? `${item.dateFrom} - ${item.dateTo}`
                              : item.dateFrom}{" "}
                            {item.timeType === "Ngày"
                              ? t("home:Transfer.Ngay")
                              : item.timeType === "Tuần"
                              ? t("home:Transfer.Tuan")
                              : t("home:Transfer.Thang")}
                          </span>
                          <span> {item.rate}%</span>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
          {/* -------------------------------screen------------------------------- */}
          <div className="w-[841px] mx-auto mt-[4px] pb-[14px]">
            <div className="flex items-center h-[25px] justify-end w-full pr-[5px]">
              <span className="text-[10px] text-center italic">
                {t("home:Transfer.DonVi")}: VNĐ
              </span>
            </div>
            {/* -------------------------------Table Show Money------------------------------- */}
            <div className="text-[12px] border border-borderTransfer -translate-y-[1px]">
              <table className="w-full">
                <colgroup>
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                </colgroup>
                <thead className="bg-[#F3F3F3]">
                  <tr className="h-[60px] border-b border-borderTransfer">
                    <th className="font-bold border-r leading-4 h-[58px] border-[#CCCCCC]">
                      {t("home:Transfer.SoDuTienMat")}
                      <br />
                      <span className="text-[11pt]">A</span>
                    </th>
                    <th className="border-r leading-4 border-[#CCCCCC]">
                      {t("home:Transfer.TienTreoMua")}
                      <br />
                      <span className="text-[11pt]">B</span>
                    </th>
                    <th className="border-r leading-4 border-[#CCCCCC]">
                      {t("home:Transfer.TienDangChuyen")}
                      <br />
                      <span className="text-[11pt]">C</span>
                    </th>
                    <th className="border-r leading-4 border-[#CCCCCC]">
                      {t("home:Transfer.PhiChuaThanhToan")}
                      <br />
                      <span className="text-[11pt]">D</span>
                    </th>
                    <th className="leading-4">
                      {t("home:Transfer.SoTienCoTheChoVay")}
                      <br />
                      <span className="text-[11pt]">E = A - B -C -D</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[#ae1a1a] h-[25px] font-bold text-[12px]">
                    <td className="text-center border-r h-[25px] border-[#CCCCCC]">
                      {fetchData.valueBalanceDetail?.ALEDGERBALANCE?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-[#CCCCCC]">
                      {fetchData.valueBalanceDetail?.ACASHADVANCE?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-[#CCCCCC]">
                      {fetchData.valueBalanceDetail?.ACASHTRANSFER?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-[#CCCCCC]">
                      {fetchData.valueBalanceDetail?.ADEBT?.toLocaleString()}
                    </td>
                    <td className="text-center">
                      {fetchData.valueBalanceDetail?.AVAIL_FSAVING?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* -------------------------------Nav tiền cho FPTS vay------------------------------- */}
            <div className="w-full mt-[9px] mb-[5px] text-[13px] font-bold">
              <button className="w-[50%] h-[35px] bg-[#034E94] text-white">
                {t("home:Transfer.TienChoFPTSVay")}
              </button>
              <button className="w-[50%] h-[35px] bg-[#E5E5E5] text-[#787878] cursor-not-allowed">
                {t("home:Transfer.TienGuiNganHang")}
              </button>
            </div>
            <div className="flex gap-[15px] text-[12px]">
              {/* -------------------------------Col-Span-7------------------------------- */}
              <div className="w-[561px] pl-[20px] pt-[5px] pr-[9px] border border-borderTransfer">
                {/* -------------------------------Số tiền cho vay------------------------------- */}
                <div className="flex items-center gap-[4px]">
                  <p className="w-[260px] h-[30px] flex items-center py-[1px]">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.SoTienChoVay")}
                    </label>
                  </p>
                  <div className="flex items-center justify-between gap-[6px] h-7">
                    <div
                      className={`w-[255px] relative flex items-center border border-[#ced4da] rounded-[4px] transition-all ${
                        isTrue.focusLendingAmount
                          ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="money"
                        placeholder={t("home:Transfer.NhapSoTien")}
                        onFocus={() => {
                          handleTrue("focusLendingAmount");
                        }}
                        onBlur={() => {
                          handleTrue("focusLendingAmount");
                        }}
                        value={values.valueLendingAmount}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className="rounded-[4px] !border-none text-[12px] w-full pr-[45px] h-[27px] outline-none"
                      />
                      <span className="absolute text-[1.1em] right-2 text-[#000000]">
                        VNĐ
                      </span>
                    </div>
                    <div className="flex items-center w-1 whitespace-nowrap translate-y-[5px]">
                      <p className="flex items-center text-[21px] font-bold text-[#ff0000]">
                        *
                      </p>
                    </div>
                  </div>
                </div>
                {/* -------------------------------Số tiền cho vay tối thiểu: 1,000,000 VNĐ------------------------------- */}
                <div className="flex items-start justify-between italic h-[57px] pt-[5px]">
                  <span className="text-[0.9em]">
                    <span className="text-[9pt]">
                      {t("home:Transfer.SoTienChoVayToiThieu")}:{" "}
                    </span>
                    1,000,000 VNĐ
                  </span>
                  <div className="flex gap-[6px]">
                    <span className="text-[0.9em]">
                      {t("home:Transfer.BangChu")}
                    </span>
                    <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap"></div>
                  </div>
                </div>
                {/* -------------------------------Kì hạn------------------------------- */}
                <div className="flex flex-col w-full">
                  {/* -------------------------------Item Kì hạn------------------------------- */}
                  <div className="flex items-center justify-between w-full h-7">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.KyHan")}
                    </label>
                    <div className="flex items-center gap-[6px]">
                      <div className="">
                        <div
                          className={`w-[255px] relative flex items-center border border-[#ced4da] h-full rounded-[4px] transition-all ${
                            isTrue.focusTerm
                              ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="rounded-[4px] w-full pr-[30px] !border-none text-[12px] h-[27px] outline-none cursor-pointer"
                            readOnly
                            onClick={() => {
                              handleTrue("dropDownTerm");
                            }}
                            onFocus={() => {
                              setIsTrue({ ...isTrue, focusTerm: true });
                            }}
                            onBlur={() => {
                              setIsTrue({
                                ...isTrue,
                                focusTerm: false,
                                dropDownTerm: false,
                              });
                            }}
                            value={
                              values.valueTerm || t("home:Transfer.ChonKyHan")
                            }
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

                        {isTrue.focusTerm === true &&
                          isTrue.dropDownTerm === true && (
                            <div className="absolute flex flex-col z-40 w-[255px] bg-white border shadow-xl py-[2px] rounded-lg">
                              <span className="py-[4px] px-[12px] cursor-default">
                                {t("home:Transfer.ChonKyHan")}
                              </span>
                              {fetchData.valueInterestRate.length > 0 &&
                                fetchData.valueInterestRate?.map(
                                  (item: any, index: number) => (
                                    <span
                                      key={index}
                                      className="hover:bg-[#1E90FF] py-[4px] px-[12px] hover:text-white cursor-pointer"
                                      onMouseDown={() => {
                                        handleLaiSuat(item, index);
                                      }}
                                    >
                                      {item.term}{" "}
                                      {item.timeType === "Ngày"
                                        ? t("home:Transfer.Ngay")
                                        : item.timeType === "Tuần"
                                        ? t("home:Transfer.Tuan")
                                        : t("home:Transfer.Thang")}
                                    </span>
                                  )
                                )}
                            </div>
                          )}
                      </div>
                      <div className="flex items-center w-1 whitespace-nowrap translate-y-[5px]">
                        <p className="flex items-center text-[21px] font-bold text-[#ff0000]">
                          *
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Phương thức đáo hạn------------------------------- */}
                  <ItemDropDown
                    label={t("home:Transfer.PhuongThucDaoHan")}
                    value={
                      values.valueMaturityMethod ||
                      t("home:Transfer.ChonPhuongThucDaoHan")
                    }
                    classParent={
                      "mt-3 w-full flex items-center justify-between"
                    }
                    dataDropDown={dataPTDH}
                    dataTitle={t("home:Transfer.ChonPhuongThucDaoHan")}
                    handleSetValue={handleSetValue}
                    nameValue={"valueMaturityMethod"}
                    required={true}
                    classParentDropDown={"w-[255px]"}
                  ></ItemDropDown>

                  {/* -------------------------------Item Phương thức gia hạn------------------------------- */}
                  <ItemDropDown
                    label={t("home:Transfer.PhuongThucGiaHan")}
                    value={
                      values.valueRenewalMethod ||
                      t("home:Transfer.ChonPhuongThucGiaHan")
                    }
                    classParent={
                      "mt-3 w-full flex items-center justify-between"
                    }
                    classParentDropDown={"w-[255px]"}
                    dataDropDown={dataPTGH}
                    dataTitle={t("home:Transfer.ChonPhuongThucGiaHan")}
                    handleSetValue={handleSetValue}
                    nameValue={"valueRenewalMethod"}
                    required={true}
                  ></ItemDropDown>

                  {/* -------------------------------Item Tên gợi nhớ------------------------------- */}
                  <div className="flex items-center justify-between mt-3">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.TenGoiNho")}
                    </label>
                    <div className="flex items-center gap-[6px]">
                      <div
                        className={`w-[255px] flex items-center border border-[#ced4da] h-full rounded-[4px] transition-all ${
                          isTrue.focusNickname
                            ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                            : ""
                        }`}
                      >
                        <input
                          type="text"
                          name="money"
                          placeholder={t("home:Transfer.NhapTenGoiNho")}
                          onFocus={() => {
                            setIsTrue({ ...isTrue, focusNickname: true });
                          }}
                          onBlur={() => {
                            setIsTrue({ ...isTrue, focusNickname: false });
                          }}
                          value={isTrue.valueNickname}
                          onChange={(e) => {
                            setValue({
                              ...values,
                              valueNickname: e.target.value,
                            });
                          }}
                          autoComplete="off"
                          className="rounded-[4px] text-[12px] px-[12px] h-[27px] !border-none w-full outline-none"
                        />
                        <span className="text-[1.1em]"></span>
                      </div>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Ngày bắt đầu------------------------------- */}
                  <div className="flex items-center justify-between mt-[10px]">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.NgayBatDau")}
                    </label>
                    <div className="flex items-center gap-1 h-[24px]">
                      <span className="text-[12px]">
                        {new Date().toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Ngày đáo hạn------------------------------- */}
                  <div className="flex items-center justify-between mt-[10px]">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.NgayDaoHan")}
                    </label>
                    <div className="flex items-center gap-1 h-[24px]">
                      <span className="text-[12px]">
                        {dateEnd ||
                          new Date().toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                      </span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Lãi suất / năm------------------------------- */}
                  <div className="flex items-center justify-between mt-[10px]">
                    <p className="flex items-center gap-1">
                      <label htmlFor="money" className="text-xs">
                        {t("home:Transfer.LaiSuat/Nam")}
                      </label>
                      <Tooltip
                        title={`Lãi suất / năm là lãi suất dự kiến dựa trên kỳ hạn mà khách hàng đã chọn. Trong trường hợp khoản tiền cho FPTS vay được tất toán một phần hoặc toàn bộ trước hạn, phần tiền cho vay tất toán trước hạn đó sẽ được hưởng lãi suất trước hạn tương ứng với thời gian cho vay tiền thực tế.`}
                      >
                        <i
                          className="fa fa-info-circle"
                          aria-hidden="true"
                          id="iconPage"
                        ></i>
                      </Tooltip>
                    </p>
                    <div className="flex items-center gap-1 h-[24px]">
                      <span className="text-[12px]">
                        {values.valueAnnualInterestRate || "0%"}
                      </span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Tiền lãi trước thuế dự kiến------------------------------- */}
                  <div className="flex items-center justify-between mt-[10px]">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.TienLaiTruocThueDuKien")}
                    </label>
                    <div className="flex items-center gap-1 h-[24px]">
                      <span className="text-[12px]">0 VNĐ</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Thuế dự kiến------------------------------- */}
                  <div className="flex items-center justify-between mt-[10px]">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.ThueDuKien")}
                    </label>
                    <div className="flex items-center gap-1 h-[24px]">
                      <span className="text-[12px]">0 VNĐ</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Tiền lãi sau thuế dự kiến------------------------------- */}
                  <div className="flex items-center justify-between mt-[10px]">
                    <label htmlFor="money" className="text-xs">
                      {t("home:Transfer.TienLaiSauThueDuKien")}
                    </label>
                    <div className="flex items-center gap-1 h-[24px]">
                      <span className="text-[12px]">0 VNĐ</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-[43px] mx-auto mt-[16px] w-max">
                  <button className="w-[80px] h-[34px] border border-[#2371AF] rounded-md hover:bg-[#2371AF] hover:text-white transition-all">
                    {t("home:Transfer.ThucHien")}
                  </button>
                  <button
                    className="w-[80px] h-[34px] border border-[#2371AF] rounded-md hover:bg-[#2371AF] hover:text-white transition-all"
                    onClick={handleReset}
                  >
                    {t("home:Transfer.LamLai")}
                  </button>
                </div>
              </div>
              {/* -------------------------------Col-Span-3------------------------------- */}
              <div className="w-[266px] border border-borderTransfer pt-[10px] px-[10px] pb-9 text-[12px] flex flex-col items-center">
                <span className="text-[13px] font-bold ">
                  {t("home:Transfer.LaiSuatTheoKyHan")}
                </span>

                <div className="flex justify-between w-full leading-[22px] py-[10px] text-[12px] font-bold">
                  <span> {t("home:Transfer.KyHan")}</span>
                  <span> {t("home:Transfer.LaiSuat/Nam")}</span>
                </div>
                {fetchData.valueInterestRate.length > 0 &&
                  fetchData.valueInterestRate?.map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          handleLaiSuat(item, index);
                        }}
                        className={`flex justify-between w-full leading-[26px] py-[8px] text-[12px] cursor-pointer hover:bg-[#EEFFEE] px-[4px] ${
                          isActive === index ? "bg-[#EEFFEE]" : ""
                        }`}
                      >
                        <span>
                          {item.term}{" "}
                          {item.timeType === "Ngày"
                            ? t("home:Transfer.Ngay")
                            : item.timeType === "Tuần"
                            ? t("home:Transfer.Tuan")
                            : t("home:Transfer.Thang")}
                        </span>
                        <span>{item.rate}%</span>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className="w-full text-right mt-[5px]">
              <span
                onClick={() => {
                  handleTrue("showModal");
                }}
                className="w-full cursor-pointer text-[#0000ff] text-[0.88em] underline"
              >
                {t("home:Transfer.XemBangLaiSuatTatToanTruocHan")}
              </span>
            </div>

            {/* -------------------------------Footer------------------------------- */}
            <div className="flex text-[12px] mt-[18px]">
              <span className="text-[13px] italic">
                {t("home:Transfer.NOTE_FOOT_ORDERSAVING")}
              </span>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default OrdersavingsTransfer;
