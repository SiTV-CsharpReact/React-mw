import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
const OrdersavingsTransfer = () => {
  const [showModel, setShowModel] = useState(false);
  const [focused1, setFocused1] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [value2, setValue2] = useState("");
  const [focused3, setFocused3] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [value3, setValue3] = useState("");
  const [focused4, setFocused4] = useState(false);
  const [value4, setValue4] = useState("");
  const [balanceDetail, setBalanceDetail] = useState<any>([]);
  const [interestRate, setInterestRate] = useState<any>([]);
  const [dataInterestRate, setDataInterestRate] = useState<any>([]);
  const [isActive, setIsActive] = useState(null);
  const [kyHan, setKyHan] = useState("");
  const [laiS, setLaiS] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [focused, setFocused] = useState(false);
  const [valueMoney, setValueMoney] = useState("");

  const handleShowModel = () => {
    setShowModel(!showModel);
  };
  const handleFocused = () => {
    setFocused(!focused);
  };
  //fetch data from server
  useEffect(() => {
    const fetchBalanceDetail = async () => {
      try {
        const balanceDetailPromise = axios.get(
          "http://localhost:3000/TableGetBalanceDetail"
        );
        const interestRatePromise = axios.get(
          "http://localhost:3000/TableGetInterestRate"
        );
        const datainterestRatePromise = axios.get(
          "http://localhost:3000/DataGetInterestRate"
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
        setBalanceDetail(balanceDetailResponse.data[0]);
        setInterestRate(interestRateResponse.data);
        setDataInterestRate(datainterestRateResponse.data);
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
    setKyHan(item.term + " " + item.timeType);
    setLaiS(item.rate + "%");
  };

  const handleInputChange = (event: any) => {
    let inputValue = event.target.value;
    const validChars = /^[1-9][0-9]*$/; // Chỉ cho phép từ số 1 đến 9 ở đầu và tiếp theo có thể là bất kỳ số nào

    if (!validChars.test(inputValue)) {
      // Nếu giá trị nhập không hợp lệ, xóa các ký tự không phải số
      inputValue = inputValue.replace(/[^1-9]/g, "");
    }
    const formattedValue = formatNumber(inputValue);

    setValueMoney(formattedValue);
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
    setIsShow1(false);
    setIsShow2(false);
    setIsShow3(false);
    setFocused1(false);
    setFocused2(false);
    setFocused3(false);
    setValueMoney("");
    setValue2("");
    setValue3("");
    setValue4("");
    setKyHan("");
    setLaiS("");
    setDateEnd("");
    setIsActive(null);
  };
  return (
    <>
      <LayoutPage
        PageTitle="Tiền cho vay - EzSaving"
        content="Tiền cho vay - EzSaving"
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
              showModel ? "opacity-100 visible" : "opacity-0 invisible"
            } flex items-center justify-center top-0 bottom-0 right-0 left-0 transition-all`}
          >
            <div
              className="absolute w-full h-full bg-black opacity-20"
              onClick={handleShowModel}
            ></div>
            <div
              className={`absolute rounded-sm z-50 ${
                showModel ? "opacity-100 visible" : "opacity-0 invisible"
              } transition-fallAnimation w-[300px] bg-white`}
            >
              <button
                className="absolute right-0 top-0 translate-x-[40%] -translate-y-[40%] overflow-hidden bg-[#4d4d4d] p-[6px] border-none rounded-full outline-none max-w-max max-h-max"
                onClick={handleShowModel}
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
              <div className="p-3 text-white text-center bg-[#034c91] rounded-t-sm font-medium text-[1rem]">
                LÃI SUẤT TẤT TOÁN TRƯỚC HẠN
              </div>
              <div className="py-5 text-xs px-7 ">
                <div className="flex items-center justify-between px-1 py-3 font-bold">
                  <span>Số ngày cho vay thực</span>
                  <span>Lãi suất / năm</span>
                </div>
                {dataInterestRate.length > 0 &&
                  dataInterestRate.map((item: any, index: number = 0) => {
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
                          {item.timeType}
                        </span>
                        <span> {item.rate}%</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* -------------------------------screen------------------------------- */}
          <div className="w-[850px] mx-auto mt-2 pb-5">
            <div className="flex items-center justify-end w-full pr-1">
              <span className="text-[10px] italic">Đơn vị: VNĐ</span>
            </div>
            {/* -------------------------------Table Show Money------------------------------- */}
            <div className="text-[12px] border border-[#CCCCCC]">
              <table className="w-full">
                <thead className="bg-[#F3F3F3]">
                  <tr className="h-[60px] border-b">
                    <th className="font-bold border-r border-[#CCCCCC]">
                      Số dư tiền mặt
                      <br />
                      <span className="text-[11pt]">A</span>
                    </th>
                    <th className="border-r border-[#CCCCCC]">
                      Tiền treo mua
                      <br />
                      <span className="text-[11pt]">B</span>
                    </th>
                    <th className="border-r border-[#CCCCCC]">
                      Tiền đang chuyển
                      <br />
                      <span className="text-[11pt]">C</span>
                    </th>
                    <th className="border-r border-[#CCCCCC]">
                      Phí chưa thanh toán
                      <br />
                      <span className="text-[11pt]">D</span>
                    </th>
                    <th className="">
                      Số tiền có thể cho vay
                      <br />
                      <span className="text-[11pt]">E = A - B -C -D</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[#ae1a1a] font-bold ">
                    <td className="py-1 text-center border-r border-[#CCCCCC]">
                      {balanceDetail?.ALEDGERBALANCE?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-[#CCCCCC]">
                      {balanceDetail?.ACASHADVANCE?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-[#CCCCCC]">
                      {balanceDetail?.ACASHTRANSFER?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-[#CCCCCC]">
                      {balanceDetail?.ADEBT?.toLocaleString()}
                    </td>
                    <td className="text-center">
                      {balanceDetail?.AVAIL_FSAVING?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* -------------------------------Nav tiền cho FPTS vay------------------------------- */}
            <div className="w-full mt-[10px] mb-[5px] text-[13px] font-bold">
              <button className="w-[50%] h-[35px] bg-[#034E94] text-white">
                Tiền cho FPTS vay
              </button>
              <button className="w-[50%] h-[35px] bg-[#E5E5E5] text-[#787878] cursor-not-allowed">
                Tiền gửi Ngân hàng
              </button>
            </div>
            <div className="grid grid-cols-10 text-[12px] gap-4">
              {/* -------------------------------Col-Span-7------------------------------- */}
              <div className="col-span-7 px-4 py-2 border">
                {/* -------------------------------Số tiền cho vay------------------------------- */}
                <div className="flex items-center justify-between">
                  <label htmlFor="money" className="text-xs">
                    Số tiền
                  </label>
                  <div className="flex items-center justify-between h-[32px]">
                    <div
                      className={`w-[255px] relative flex items-center border rounded-[4px] transition-all ${
                        focused
                          ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="money"
                        placeholder="Nhập số tiền"
                        onFocus={handleFocused}
                        onBlur={handleFocused}
                        value={valueMoney}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className="rounded-[4px] !border-none text-[12px] w-full pr-[45px] h-[28px] outline-none"
                      />
                      <span className="absolute text-[1.1em] right-2">VNĐ</span>
                    </div>
                    <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                      <span className="flex items-center text-xl font-bold text-red-400">
                        *
                      </span>
                    </div>
                  </div>
                </div>
                {/* -------------------------------Số tiền cho vay tối thiểu: 1,000,000 VNĐ------------------------------- */}
                <div className="flex items-center justify-between italic">
                  <span>Số tiền cho vay tối thiểu: 1,000,000 VNĐ</span>
                  <div className="flex gap-1 mt-1">
                    <span>Bằng chữ</span>
                    <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap"></div>
                  </div>
                </div>
                {/* -------------------------------Kì hạn------------------------------- */}
                <div className="flex flex-col w-full gap-2 mt-7">
                  {/* -------------------------------Item Kì hạn------------------------------- */}
                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="money" className="text-xs">
                      Kỳ hạn
                    </label>
                    <div className="flex items-center gap-1 h-7">
                      <div>
                        <div
                          className={`w-[255px] relative flex items-center border h-7 rounded-[4px] transition-all ${
                            focused1
                              ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="rounded-[4px] w-full pr-[30px] !border-none text-[12px] h-[28px] outline-none cursor-pointer"
                            readOnly
                            onClick={() => {
                              setIsShow1(!isShow1);
                            }}
                            onFocus={() => {
                              setFocused1(true);
                            }}
                            onBlur={() => {
                              setFocused1(false);
                              setIsShow1(false);
                            }}
                            value={kyHan || "Chọn kỳ hạn"}
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

                        {focused1 === true && isShow1 === true && (
                          <div className="absolute flex flex-col z-40 w-[255px] bg-white border shadow-xl py-[2px] rounded-lg">
                            <span className="py-[4px] px-[12px] cursor-default">
                              Chọn kì hạn
                            </span>
                            {interestRate.length > 0 &&
                              interestRate?.map((item: any, index: number) => (
                                <span
                                  key={index}
                                  className="hover:bg-[#1E90FF] py-[4px] px-[12px] hover:text-white cursor-pointer"
                                  onMouseDown={() => {
                                    handleLaiSuat(item, index);
                                  }}
                                >
                                  {item.term} {item.timeType}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-xl font-bold text-red-400">
                          *
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Phương thức đáo hạn------------------------------- */}
                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="money" className="text-xs">
                      Phương thức đáo hạn
                    </label>
                    <div className="flex items-center gap-1 h-7">
                      <div>
                        <div
                          className={`w-[255px] relative flex items-center border h-7 rounded-[4px] transition-all ${
                            focused2
                              ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="rounded-[4px] text-[12px] h-[28px] !border-none w-full px-2 outline-none cursor-pointer"
                            onClick={() => {
                              setIsShow2(!isShow2);
                            }}
                            readOnly
                            onFocus={() => {
                              setFocused2(true);
                            }}
                            onBlur={() => {
                              setFocused2(false);
                              setIsShow2(false);
                            }}
                            value={value2 || "Chọn phương thức đáo hạn"}
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

                        {focused2 === true && isShow2 === true && (
                          <div className="absolute z-40 flex flex-col w-[255px] bg-white border shadow-xl py-[2px] rounded-lg">
                            <span className="py-[4px] px-3 cursor-default">
                              Chọn phương thức đáo hạn
                            </span>
                            <span
                              className="hover:bg-[#1E90FF] py-[4px] px-3 hover:text-white cursor-pointer"
                              onMouseDown={() => {
                                setValue2("Tự động tất toán");
                              }}
                            >
                              Tự động tất toán
                            </span>
                            <span
                              className="hover:bg-[#1E90FF] py-[4px] px-3 hover:text-white cursor-pointer"
                              onMouseDown={() => {
                                setValue2("Tự động gia hạn");
                              }}
                            >
                              Tự động gia hạn
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-xl font-bold text-red-400">
                          *
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Phương thức gia hạn------------------------------- */}
                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="money" className="text-xs">
                      Phương thức gia hạn
                    </label>
                    <div className="flex items-center gap-1 h-7">
                      <div>
                        <div
                          className={`w-[255px] relative flex items-center border h-7 rounded-[4px] transition-all ${
                            focused3
                              ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="rounded-[4px] text-[12px] h-[28px] !border-none pr-[30px] w-full px-2 outline-none cursor-pointer"
                            onClick={() => {
                              setIsShow3(!isShow3);
                            }}
                            readOnly
                            onFocus={() => {
                              setFocused3(true);
                            }}
                            onBlur={() => {
                              setFocused3(false);
                              setIsShow3(false);
                            }}
                            value={value3 || "Chọn phương thức gia hạn"}
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

                        {focused3 === true && isShow3 === true && (
                          <div className="absolute z-40 flex flex-col w-[255px] bg-white border shadow-xl py-[2px] rounded-lg">
                            <span className="py-[4px] px-3 cursor-default">
                              Chọn phương thức gia hạn
                            </span>
                            <span
                              className="hover:bg-[#1E90FF] py-[4px] px-3 hover:text-white cursor-pointer"
                              onMouseDown={() => {
                                setValue3("Lãi nhập gốc");
                              }}
                            >
                              Lãi nhập gốc
                            </span>
                            <span
                              className="hover:bg-[#1E90FF] py-[4px] px-3 hover:text-white cursor-pointer"
                              onMouseDown={() => {
                                setValue3("Lãi trả về tài khoản");
                              }}
                            >
                              Lãi trả về tài khoản
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-xl font-bold text-red-400">
                          *
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Tên gợi nhớ------------------------------- */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Tên gợi nhớ
                    </label>
                    <div className="flex items-center gap-1 h-7">
                      <div
                        className={`w-[255px] flex items-center border h-7 rounded-[4px] transition-all ${
                          focused4
                            ? "border-blue-300 shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                            : ""
                        }`}
                      >
                        <input
                          type="text"
                          name="money"
                          placeholder="Nhập tên gợi nhớ"
                          onFocus={() => {
                            setFocused4(true);
                          }}
                          onBlur={() => {
                            setFocused4(false);
                          }}
                          value={value4}
                          onChange={(e) => {
                            setValue4(e.target.value);
                          }}
                          autoComplete="off"
                          className="rounded-[4px] text-[12px] h-[28px] !border-none w-full px-2 outline-none"
                        />
                        <span className="text-[1.1em]"></span>
                      </div>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Ngày bắt đầu------------------------------- */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Ngày bắt đầu
                    </label>
                    <div className="flex items-center gap-1 h-[28px]">
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Ngày đáo hạn
                    </label>
                    <div className="flex items-center gap-1 h-[28px]">
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Lãi suất / năm
                    </label>
                    <div className="flex items-center gap-1 h-[28px]">
                      <span className="text-[12px]">{laiS || "0%"}</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Tiền lãi trước thuế dự kiến------------------------------- */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Tiền lãi trước thuế dự kiến
                    </label>
                    <div className="flex items-center gap-1 h-[28px]">
                      <span className="text-[12px]">0 VNĐ</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Thuế dự kiến------------------------------- */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Thuế dự kiến
                    </label>
                    <div className="flex items-center gap-1 h-[28px]">
                      <span className="text-[12px]">0 VNĐ</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------Item Tiền lãi sau thuế dự kiến------------------------------- */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="money" className="text-xs">
                      Tiền lãi sau thuế dự kiến
                    </label>
                    <div className="flex items-center gap-1 h-[28px]">
                      <span className="text-[12px]">0 VNĐ</span>
                      <div className="items-center w-1 my-auto text-[12px] whitespace-nowrap">
                        <span className="flex items-center text-3xl font-bold text-red-400"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 mx-auto mt-6 w-max">
                  <button className="px-[14px] h-[34px] border border-[#2371AF] rounded-md hover:bg-[#2371AF] hover:text-white transition-all">
                    Thực hiện
                  </button>
                  <button
                    className="px-[14px] h-[34px] border border-[#2371AF] rounded-md hover:bg-[#2371AF] hover:text-white transition-all"
                    onClick={handleReset}
                  >
                    Làm lại
                  </button>
                </div>
              </div>
              {/* -------------------------------Col-Span-3------------------------------- */}
              <div className="col-span-3 border py-3 px-3 text-[12px] w-full flex flex-col items-center">
                <span className="text-[13px] font-bold ">
                  Lãi suất theo kỳ hạn
                </span>
                <div className="flex justify-between w-full leading-[22px] py-[10px] text-[12px] font-bold">
                  <span>Kỳ hạn</span>
                  <span>Lãi suất / năm</span>
                </div>
                {interestRate.length > 0 &&
                  interestRate?.map((item: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleLaiSuat(item, index);
                      }}
                      className={`flex justify-between w-full leading-[22px] py-[8px] text-[12px] cursor-pointer hover:bg-[#EEFFEE] px-[4px] ${
                        isActive === index ? "bg-[#EEFFEE]" : ""
                      }`}
                    >
                      <span>
                        {item.term} {item.timeType}
                      </span>
                      <span>{item.rate}%</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* -------------------------------Footer------------------------------- */}
            <div className="flex text-[12px] justify-between mt-1 ">
              <span className="mt-4 text-[13px] italic">
                Ghi chú: Thời gian thực hiện: Từ 0h đến 16h30 các ngày làm việc
              </span>
              <button
                onClick={handleShowModel}
                className="text-blue-500 underline "
              >
                Xem bảng Lãi suất tất toán trước hạn
              </button>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default OrdersavingsTransfer;
