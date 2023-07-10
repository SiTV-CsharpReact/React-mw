import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ItemDropDown from "../../layout/ItemDropDown";
const MoneyTransferMain = () => {
  const [checkMg, setCheckMg] = useState(true);
  const { t } = useTranslation(["home"]);
  const [balanceDetail, setBalanceDetail] = useState<any>({});
  const [getTemplate, setGetTemplate] = useState<Array<string>>([]);
  const [value, setValue] = useState<any>({
    valueMoney: "",
    showModel: false,
    showModelThucHien: false,
    valueSTK: "",
    beneficiaryName: "",
    beneficiaryBank: "",
    city: "",
    branch: "",
    content: "",
  });

  //fetch data
  useEffect(() => {
    const fetchBalanceDetail = async () => {
      try {
        const balanceDetailPromise = axios.get(
          "http://localhost:8060/TableGetBalanceDetail"
        );
        const templatePromise = axios.get(
          "http://localhost:8060/TableTemplate"
        );
        const [balanceDetailResponse, templateResponse] = await Promise.all([
          balanceDetailPromise,
          templatePromise,
        ]);
        setBalanceDetail(balanceDetailResponse.data[0]);
        setGetTemplate(templateResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBalanceDetail();
  }, []);
  //Handle set value
  const handleSetValue = (item: any) => {
    setValue({
      ...value,
      showModel: !value.showModel,
      valueSTK: item.ACCOUNTRCV,
      beneficiaryName: item.ACCOUNTRCVNAME,
      beneficiaryBank: item.BANKRCVNAME,
      city: item.BRANCHNAME.substring(3),
      branch: item.BRANCHNAME,
    });
  };

  const handleSetValue1 = (name: any, value1: any) => {
    setValue({
      ...value,
      [name]: value1,
    });
  };
  //Handle show model
  const handleShowModel = (name: any) => {
    setValue({
      ...value,
      [name]: !value.name,
    });
  };
  // Kiểm tra nhập số tiền
  const handleInputChange = (event: any) => {
    let inputValue = event.target.value;
    const validChars = /^[0-9][0-9]*$/; // Cho phép số từ 0 đến 9 ở đầu và tiếp theo có thể là bất kỳ số nào

    if (!validChars.test(inputValue)) {
      // Nếu giá trị nhập không hợp lệ, xóa các ký tự không phải số
      inputValue = inputValue.replace(/[^0-9]/g, "");
    }
    const formattedValue = formatNumber(inputValue);

    setValue({
      ...value,
      valueMoney: formattedValue,
    });
  };
  //Chuyển đổi số thành chuỗi có dấu phẩy ngăn cách hàng nghìn
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

  //Button Reset Data
  const resetData = () => {
    setValue({
      valueMoney: "",
      showModel: false,
      valueSTK: "",
      beneficiaryName: "",
      beneficiaryBank: "",
      city: "",
      branch: "",
      content: "",
    });
  };
  const dataPTDH = [
    t("home:Transfer.TuDongTatToan"),
    t("home:Transfer.TuDongGiaHan"),
  ];
  return (
    <>
      <LayoutPage
        LinkPage=""
        Icon={true}
        PageTitle={t("home:Transfer.Chuyentien")}
        content={t("home:Transfer.Chuyentien")}
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
        <div className="">
          {/* -----------------------------showModel-----------------------------*/}
          <div
            className={`absolute ${
              value.showModel ? "opacity-100 visible" : "opacity-0 invisible"
            } flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full z-50 h-full transition-all`}
          >
            <div
              className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50"
              onClick={() => {
                setValue({
                  ...value,
                  showModel: !value.showModel,
                });
              }}
            ></div>
            <div
              className={`absolute ${
                value.showModel ? "opacity-100 visible" : "opacity-0 invisible"
              } p-4 transition-fallAnimation w-[800px] pb-6 bg-white rounded-[4px]`}
            >
              <table className="w-full text-[12px] ">
                <thead className="font-bold border border-[#dddddd] bg-[#f3f3f3]">
                  <tr className="h-[50px]">
                    <th className="border-r border-[#dddddd] leading-4 px-2">
                      NO
                    </th>
                    <th className="border-r border-[#dddddd] leading-4">
                      {t("home:Transfer.TenMau")}
                    </th>
                    <th className="border-r border-[#dddddd] leading-4 py-2">
                      {t("home:Transfer.TaiKhoanThuHuong")}
                    </th>
                    <th className="border-r border-[#dddddd] leading-4">
                      {t("home:Transfer.TenNguoiThuHuong")}
                    </th>
                    <th className="border-r border-[#dddddd] leading-4">
                      {t("home:Transfer.NganHangThuHuong")}
                    </th>
                  </tr>
                </thead>
                <tbody className="border border-[#dddddd]">
                  {getTemplate.length > 0 &&
                    getTemplate.map((item: any, index: any = 0) => (
                      <tr
                        className="border-b border-[#dddddd] hover:bg-[#eeffee] transition-all cursor-pointer"
                        key={index}
                        onClick={() => {
                          handleSetValue(item);
                        }}
                      >
                        <td className="leading-6 border-r border-[#dddddd] px-2">
                          {index + 1}
                        </td>
                        <td className="leading-6 border-r border-[#dddddd] px-2">
                          {item.TEMPLATENAME}
                        </td>
                        <td className="leading-6 border-r border-[#dddddd] px-2">
                          {item.ACCOUNTRCV}
                        </td>
                        <td className="leading-6 border-r border-[#dddddd] px-2">
                          {item.ACCOUNTRCVNAME}
                        </td>
                        <td className="leading-6 border-r border-[#dddddd] px-2">
                          {item.BANKRCVNAME}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="mt-5 text-center">
                <a
                  href="/"
                  className="text-[13px] hover:underline text-[#337ab7] hover:text-[#23527c] "
                >
                  {t("home:Transfer.CapNhatDSMCT")}
                </a>
              </div>
            </div>
          </div>
          {/* -----------------------------showModel Thuc Hien-----------------------------*/}
          <div
            className={`fixed py-10 flex items-center top-0 bottom-0 left-0 right-0 z-50 overflow-y-auto  overflow-x-hidden transition-all ${
              value.showModelThucHien
                ? "opacity-100 visible bg-[#000] !bg-opacity-50"
                : "opacity-0 invisible"
            }`}
            onClick={() => {
              setValue({
                ...value,
                showModelThucHien: !value.showModelThucHien,
              });
            }}
          >
            <div
              className="w-[798px] px-[21px] box-border border border-gray-500 m-auto min-h-[565px] relative z-50 bg-white opacity-100 rounded-[4px]"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="flex gap-[2px] h-[22px] items-center justify-start mt-[17px]">
                <img src="/arrow2.jpg" alt="arrow" />
                <span className="text-[12px]">
                  Với trách nhiệm thuộc về Tôi/Chúng tôi, đề nghị Quý Công ty
                  ghi nợ tài khoản của chúng tôi để thực hiện chuyển tiền theo
                  nội dung sau:
                </span>
              </div>
              {/*---------------Số tiền------------------*/}
              <div className="mt-3 pl-[105px] max-w-max h-[372px]">
                {/*---------------Số tiền------------------*/}
                <div className="flex h-[24px] text-[9pt] font-bold items-center">
                  <span className="w-[197px] px-[5px]">
                    {t("home:Transfer.SoTien")}:
                  </span>
                  <span className="whitespace-nowrap">
                    {value.valueMoney} VND
                  </span>
                </div>
                {/*---------------Ngày hiệu lực------------------*/}
                <div className="flex h-[24px] text-[9pt] font-bold items-center">
                  <span className="w-[197px] px-[5px]">
                    {t("home:Transfer.NgayHieuLuc")}:
                  </span>
                  <span className="whitespace-nowrap">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {/*---------------Người thụ hưởng------------------*/}
                <div className="flex h-[22px] text-[9pt] font-bold items-center">
                  <span className="uppercase">
                    {t("home:Transfer.NguoiThuHuong")}
                  </span>
                </div>
                {/*---------------So Tai Khoan------------------*/}
                <div className="flex h-[24px] text-[9pt] items-center">
                  <span className="w-[197px] px-[15px]">
                    {t("home:Transfer.SoTaiKhoan")}
                  </span>
                  <span className="font-bold whitespace-nowrap">
                    {value.valueSTK}
                  </span>
                </div>
                {/*---------------Ten Nguoi Thu Huong------------------*/}
                <div className="flex h-[24px] text-[9pt] items-center">
                  <span className="w-[197px] px-[15px]">
                    {t("home:Transfer.TenNguoiThuHuong")}
                  </span>
                  <span className="font-bold whitespace-nowrap">
                    {value.beneficiaryName}
                  </span>
                </div>
                {/*---------------Ngan Hang người thụ hưởng------------------*/}
                <div className="flex h-[22px] mt-[22px] text-[9pt] font-bold items-center">
                  <span className="uppercase">
                    {t("home:Transfer.NganHangNguoiThuHuong")}
                  </span>
                </div>
                {/*---------------Ten Ngan Hang------------------*/}
                <div className="flex h-[24px] text-[9pt] items-center">
                  <span className="w-[197px] px-[15px]">Tên ngân hàng</span>
                  <span className="font-bold whitespace-nowrap">
                    {value.beneficiaryBank}
                  </span>
                </div>
                {/*---------------Tinh/ Tpho------------------*/}
                <div className="flex h-[24px] text-[9pt] items-center">
                  <span className="w-[197px] px-[15px]">
                    {t("home:Transfer.Tinh_ThanhPho")}
                  </span>
                  <span className="font-bold whitespace-nowrap">
                    {value.city}
                  </span>
                </div>
                {/*---------------Chi Nhanh Ngan Hang------------------*/}
                <div className="flex h-[24px] text-[9pt] items-center">
                  <span className="w-[197px] px-[15px]">
                    {t("home:Transfer.ChiNhanhNganHang")}
                  </span>
                  <span className="font-bold whitespace-nowrap">
                    {value.branch}
                  </span>
                </div>
                {/*---------------NoiDungChuyenTien------------------*/}
                <div className="font-bold flex h-[24px] mt-[22px] text-[9pt] items-center">
                  <span className="w-[197px] px-[5px]">
                    {t("home:Transfer.NoiDungChuyenTien")}
                  </span>
                  <span className="whitespace-nowrap">{value.content}</span>
                </div>
                {/*---------------PhiChuyenTien------------------*/}
                <div className="font-bold flex h-[24px] mt-[22px] text-[9pt] items-center">
                  <span className="w-[197px] px-[5px] uppercase ">
                    {t("home:Transfer.PhiChuyenTien")}
                  </span>
                  <span className="whitespace-nowrap text-[#FF0000]">
                    {t("home:Transfer.NguoiChuyenChiu")}
                  </span>
                </div>
                {/*---------------Mức phí tạm tính------------------*/}
                <div className=" flex h-[24px] text-[9pt] items-center">
                  <span className="w-[197px] px-[15px]">Mức phí tạm tính</span>
                  <span className="font-bold whitespace-nowrap text-[#FF0000]">
                    11,000 VND
                  </span>
                </div>
              </div>
              {/*---------------Content------------------*/}
              <div className="gap-[2px]">
                <img
                  src="/arrow2.jpg"
                  alt="arrow"
                  className="w-[16px] h-[18px] inline-block"
                />
                <span className="text-[12px] ml-1">
                  Tôi/Chúng tôi cam kết tuyệt đối tuân thủ các quy định trong{" "}
                  <span className="font-bold">
                    Hợp đồng cung cấp và sử dụng dịch vụ giao dịch chứng khoán
                  </span>{" "}
                  ký giữa Tôi/Chúng tôi và FPTS
                </span>
              </div>
              <div className="w-[728px] flex items-center shadow-[0_1px_5px_rgba(0,0,0,.2)] pl-[17px] pr-[24px] mt-[22px] h-[60px] bg-white border border-gray-300 mx-auto">
                <span className="text-[12px] text-[#343a40] whitespace-nowrap">
                  {t("home:Transfer.XacNhanDatLenh")}
                </span>
                <div className="h-[34px] w-[280px] flex ml-[38px]">
                  <div className="flex items-center justify-center w-[38px] border border-r-transparent rounded-l-md border-[#ced4da] bg-[#e9ecef]">
                    <svg
                      width="12"
                      height="12"
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
                    placeholder={t("home:Transfer.NhapMatKhauGiaoDich")}
                    className="w-full h-full pl-2 text-xs transition-all border rounded-r-md border-[#ced4da] outline-none focus:border-[#80bdff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,.25)]"
                  />
                </div>
                <div className="flex gap-1 ml-[45px]">
                  <button className="w-[80px] h-[34px] items-center border text-black border-[#2371AF] hover:bg-[#2371AF] transition-all hover:text-white rounded-[5px] text-[12px]">
                    Thực hiện
                  </button>
                  <button
                    className="w-[80px] h-[34px] items-center border text-black border-[#2371AF] hover:bg-[#2371AF] transition-all hover:text-white rounded-[5px] text-[12px]"
                    onClick={() => {
                      setValue({
                        ...value,
                        showModelThucHien: !value.showModelThucHien,
                      });
                    }}
                  >
                    Quay Lại
                  </button>
                  <button
                    className="w-[80px] h-[34px] items-center border text-black border-[#2371AF] hover:bg-[#2371AF] transition-all hover:text-white rounded-[5px] text-[12px]"
                    onClick={resetData}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* -----------------------------Screen-----------------------------*/}
          <div className="w-[841px] mx-auto my-[4px]">
            <div className="translate-y-[1px] flex justify-end pr-[5px] italic leading-[25px] items-center text-[10px] text-[#212529]">
              {t("home:Transfer.DonVi")}: VNĐ
            </div>
            {/*-----------------------------------------Table Show Money------------------------------------------*/}
            <div className="text-xs -translate-y-[1px]  ">
              <table className="w-full border border-borderTransfer">
                <thead className="bg-[#F3F3F3]">
                  <tr className="border-b border-borderTransfer">
                    <th className="font-bold leading-4 border-r border-borderTransfer h-[58px]">
                      <span>
                        {t("home:Transfer.SoDuTienMat")}
                        <br />
                        <span className="text-[11pt]">A</span>
                      </span>
                    </th>
                    <th className="leading-4 border-r border-borderTransfer">
                      <span>
                        {t("home:Transfer.TienUngTruoc")}
                        <br />
                        <span className="text-[11pt]">B</span>
                      </span>
                    </th>
                    <th className="leading-4 w-[36%]">
                      <span>
                        {t("home:Transfer.SoDuCoTheRut")}
                        <br />
                        <span className="text-[11pt]">C = A + B</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[#ae1a1a] font-bold">
                    <td className="text-center border-r h-[25px] border-borderTransfer">
                      {balanceDetail?.ALEDGERBALANCE?.toLocaleString()}
                    </td>
                    <td className="text-center border-r border-borderTransfer">
                      {" "}
                      {balanceDetail?.AMARGINPRO?.toLocaleString()}
                    </td>
                    <td className="text-center">
                      {balanceDetail?.AVAIL_FSAVING?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*-----------------------------------------Choose Template Money------------------------------------------*/}
            <div className="mt-[8px] border border-[#CCCCCC] pb-[10px] shadow-[0_1px_5px_rgba(0,0,0,.2)]">
              <div className="flex gap-1 p-[6px]">
                <img src="/arrow2.jpg" alt="arrow" />
                <span className="text-xs">
                  {t("home:Transfer.Title_CHUYENTIEN_H")}
                </span>
              </div>
              <div
                className={`${
                  checkMg ? "mt-[28px] !pl-[95px]" : "mt-[30px]"
                }  ${value.valueSTK !== "" ? "pl-[98px] " : "pl-[100px]"}`}
              >
                <div className="w-[100%] flex flex-col gap-[2px]">
                  {/*-------------SoTien-------------------*/}
                  <div className="flex items-center gap-[5px]">
                    <p
                      className={`${
                        checkMg
                          ? "w-[160px]"
                          : value.valueSTK !== ""
                          ? "w-[193px]"
                          : "w-[234px]"
                      } px-[5px]`}
                    >
                      <label htmlFor="money" className="text-xs font-bold ">
                        {t("home:Transfer.SoTien")}
                      </label>
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="money"
                        autoComplete="off"
                        value={value.valueMoney}
                        onChange={handleInputChange}
                        className="w-[250px] transition-all text-[12px] text-right border border-[#ced4da] h-[32px] rounded-[4px] px-3 outline-none focus:border-[#80bdff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,.25)]"
                        // oninput="validateInput(this)"
                      />
                      <div className="items-center w-10 my-auto whitespace-nowrap text-[9pt] font-bold">
                        VND{" "}
                        <span className="font-bold text-[#FF0000]">(*)</span>
                      </div>
                    </div>
                  </div>
                  {/*-------------NgayHieuLuc-------------------*/}
                  <div className="flex items-center gap-[5px]">
                    <p
                      className={`${
                        checkMg
                          ? "w-[160px]"
                          : value.valueSTK !== ""
                          ? "w-[193px]"
                          : "w-[234px]"
                      } px-[5px]`}
                    >
                      <label htmlFor="" className="text-xs font-bold ">
                        {t("home:Transfer.NgayHieuLuc")}
                      </label>
                    </p>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="w-[250px] px-3 border h-[32px] text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                        value={new Date().toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                        disabled
                      />
                      <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap"></div>
                    </div>
                  </div>
                  {/*-------------ButtonChonMauCHuyenTien-------------------*/}
                  <div className="flex gap-[5px]">
                    <div
                      className={`${
                        checkMg
                          ? "w-[160px]"
                          : value.valueSTK !== ""
                          ? "w-[193px]"
                          : "w-[234px]"
                      } px-[5px]`}
                    ></div>
                    <div className="col-span-3 gap-1">
                      <button
                        className="w-[250px] bg-[#3278B3] text-white h-[34px] text-center text-xs rounded-md"
                        onClick={() => {
                          handleShowModel("showModel");
                        }}
                      >
                        {t("home:Transfer.ChonMauChuyenTien")}
                      </button>
                      <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap"></div>
                    </div>
                  </div>
                  {/*	---------Show when has valueSTK----------*/}
                  <div
                    className={`${value.valueSTK !== "" ? "block" : "hidden"}`}
                  >
                    {/*------------Nguoi THu Huong---------------*/}
                    <div className="mt-5">
                      <h3 className="text-[9pt] font-bold uppercase px-[5px] py-[3px]">
                        {t("home:Transfer.NguoiThuHuong")}
                      </h3>
                      <div className=" items-center flex gap-[5px]">
                        <div
                          className={`${
                            checkMg
                              ? "w-[160px]"
                              : value.valueSTK !== ""
                              ? "w-[193px]"
                              : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.SoTaiKhoan")}
                          </label>
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className={`${
                              checkMg ? "" : "bg-[#E9ECEF] "
                            } w-[250px] px-[14px] border h-8 text-gray-700 rounded-[4px] text-xs`}
                            defaultValue={checkMg ? "" : value.valueSTK}
                            disabled={checkMg ? false : true}
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-[#FF0000]">
                              (*)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=" items-center flex gap-[5px] mt-[2px] ">
                        <p
                          className={`${
                            checkMg
                              ? "w-[160px]"
                              : value.valueSTK !== ""
                              ? "w-[193px]"
                              : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.TenNguoiThuHuong")}
                          </label>
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className={`${
                              checkMg ? "" : "bg-[#E9ECEF] "
                            } w-[250px] px-[14px] border h-8 text-gray-700 rounded-[4px] text-xs`}
                            defaultValue={checkMg ? "" : value.beneficiaryName}
                            disabled={checkMg ? false : true}
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap"></div>
                        </div>
                      </div>
                    </div>
                    {/*------------NGÂN HÀNG NGƯỜI THỤ HƯỞNG---------------*/}
                    <div className="mt-[23px]">
                      <h3 className="text-[9pt] font-bold uppercase px-[5px] py-[3px]">
                        {" "}
                        {t("home:Transfer.NganHangNguoiThuHuong")}
                      </h3>
                      {/*------------Ngan Hang Nguoi THu Huong---------------*/}
                      <div className="flex gap-[5px] items-center">
                        <p
                          className={`${
                            checkMg
                              ? "!w-[160px]"
                              : value.valueSTK !== ""
                              ? "w-[193px]"
                              : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label
                            htmlFor=""
                            className="text-xs whitespace-nowrap"
                          >
                            {t("home:Transfer.NganHangThuHuong")}
                          </label>
                        </p>
                        <div className="flex">
                          <div className="flex gap-1">
                            <input
                              type="text"
                              className={`${
                                checkMg ? "" : "bg-[#E9ECEF] "
                              } w-[320px] px-4 border h-[30px] col-3 text-gray-700 rounded-[4px] text-xs `}
                              defaultValue={
                                checkMg ? "" : value.beneficiaryBank
                              }
                              placeholder={checkMg ? "Chọn ngân hàng" : ""}
                              disabled={checkMg ? false : true}
                            />
                            <div className="items-center w-5 my-auto text-[12px] whitespace-nowrap">
                              <span className="font-bold text-[#FF0000]">
                                (*)
                              </span>
                            </div>
                          </div>
                          <div
                            className={`${
                              checkMg ? "block" : "hidden"
                            } flex gap-1 `}
                          >
                            <input
                              type="text"
                              className="w-[200px] px-4 border h-[30px] col-3 text-gray-700 rounded-[4px] text-xs shadow-[0_1px_2px_rgba(0, 0, 0, 0.1)_inset]"
                            />
                            <div className="items-center w-2 my-auto text-[12px] whitespace-nowrap">
                              <svg
                                width="12"
                                height="13"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.0494 15.4605L12.374 11.7852C13.2589 10.6072 13.7366 9.17331 13.735 7.7C13.735 3.93672 10.6732 0.875 6.90996 0.875C3.14668 0.875 0.0849609 3.93672 0.0849609 7.7C0.0849609 11.4633 3.14668 14.525 6.90996 14.525C8.38327 14.5266 9.81713 14.0489 10.9951 13.1641L14.6705 16.8395C14.8566 17.0058 15.0992 17.0945 15.3487 17.0876C15.5981 17.0806 15.8354 16.9784 16.0119 16.8019C16.1883 16.6255 16.2905 16.3881 16.2975 16.1387C16.3045 15.8893 16.2157 15.6466 16.0494 15.4605ZM2.03496 7.7C2.03496 6.73582 2.32087 5.79329 2.85655 4.9916C3.39222 4.18991 4.15359 3.56506 5.04438 3.19609C5.93517 2.82711 6.91537 2.73057 7.86103 2.91867C8.80668 3.10677 9.67533 3.57107 10.3571 4.25285C11.0389 4.93464 11.5032 5.80328 11.6913 6.74893C11.8794 7.69459 11.7829 8.67479 11.4139 9.56558C11.0449 10.4564 10.4201 11.2177 9.61837 11.7534C8.81668 12.2891 7.87414 12.575 6.90996 12.575C5.61751 12.5734 4.37843 12.0593 3.46453 11.1454C2.55062 10.2315 2.03651 8.99245 2.03496 7.7Z"
                                  fill="black"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <ItemDropDown
                        classLabel={`${
                          checkMg
                            ? "w-[160px]"
                            : value.valueSTK !== ""
                            ? "w-[193px]"
                            : "w-[234px]"
                        } px-[5px] pl-[13px]`}
                        label={t("home:Transfer.Tinh_ThanhPho")}
                        value={value.city || t("home:Transfer.Tinh_ThanhPho")}
                        classParent={
                          "flex items-center mt-[2px] flex gap-[5px]"
                        }
                        dataDropDown={dataPTDH}
                        dataTitle={t("home:Transfer.Tinh_ThanhPho")}
                        handleSetValue={handleSetValue1}
                        nameValue={"city"}
                        required={true}
                        classParentDropDown={`${
                          checkMg ? "" : "bg-[#ced4da] "
                        } w-[320px] border h-[30px] text-gray-700 rounded-[4px] text-xs`}
                      >
                        <div
                          className={`${
                            checkMg ? "block" : "hidden"
                          } flex gap-1 ml-2`}
                        >
                          <input
                            type="text"
                            className="w-[200px] px-4 border h-[30px] col-3 text-gray-700 rounded-[4px] text-xs shadow-[0_1px_2px_rgba(0, 0, 0, 0.1)_inset]"
                          />
                          <div className="items-center w-2 my-auto text-[12px] whitespace-nowrap">
                            <svg
                              width="12"
                              height="13"
                              viewBox="0 0 17 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.0494 15.4605L12.374 11.7852C13.2589 10.6072 13.7366 9.17331 13.735 7.7C13.735 3.93672 10.6732 0.875 6.90996 0.875C3.14668 0.875 0.0849609 3.93672 0.0849609 7.7C0.0849609 11.4633 3.14668 14.525 6.90996 14.525C8.38327 14.5266 9.81713 14.0489 10.9951 13.1641L14.6705 16.8395C14.8566 17.0058 15.0992 17.0945 15.3487 17.0876C15.5981 17.0806 15.8354 16.9784 16.0119 16.8019C16.1883 16.6255 16.2905 16.3881 16.2975 16.1387C16.3045 15.8893 16.2157 15.6466 16.0494 15.4605ZM2.03496 7.7C2.03496 6.73582 2.32087 5.79329 2.85655 4.9916C3.39222 4.18991 4.15359 3.56506 5.04438 3.19609C5.93517 2.82711 6.91537 2.73057 7.86103 2.91867C8.80668 3.10677 9.67533 3.57107 10.3571 4.25285C11.0389 4.93464 11.5032 5.80328 11.6913 6.74893C11.8794 7.69459 11.7829 8.67479 11.4139 9.56558C11.0449 10.4564 10.4201 11.2177 9.61837 11.7534C8.81668 12.2891 7.87414 12.575 6.90996 12.575C5.61751 12.5734 4.37843 12.0593 3.46453 11.1454C2.55062 10.2315 2.03651 8.99245 2.03496 7.7Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        </div>
                      </ItemDropDown>
                       <ItemDropDown
                        classLabel={`${
                          checkMg
                            ? "w-[160px]"
                            : value.valueSTK !== ""
                            ? "w-[193px]"
                            : "w-[234px]"
                        } px-[5px] pl-[13px]`}
                        label={t("home:Transfer.Tinh_ThanhPho")}
                        value={value.city || t("home:Transfer.Tinh_ThanhPho")}
                        classParent={
                          "flex items-center mt-[5px] flex gap-[5px]"
                        }
                        dataDropDown={dataPTDH}
                        dataTitle={t("home:Transfer.Tinh_ThanhPho")}
                        handleSetValue={handleSetValue1}
                        nameValue={"city"}
                        required={true}
                        classParentDropDown={`${
                          checkMg ? "" : "bg-[#E9ECEF] "
                        } w-[250px] border h-[30px] text-gray-700 rounded-[4px] text-xs`}
                      ></ItemDropDown>
                      <ItemDropDown
                        classLabel={`${
                          checkMg
                            ? "w-[160px]"
                            : value.valueSTK !== ""
                            ? "w-[193px]"
                            : "w-[234px]"
                        } px-[5px] pl-[13px]`}
                        label={t("home:Transfer.Tinh_ThanhPho")}
                        value={value.city || t("home:Transfer.Tinh_ThanhPho")}
                        classParent={
                          "flex items-center mt-[5px] flex gap-[5px]"
                        }
                        dataDropDown={dataPTDH}
                        dataTitle={t("home:Transfer.Tinh_ThanhPho")}
                        handleSetValue={handleSetValue1}
                        nameValue={"city"}
                        required={true}
                        classParentDropDown={`${
                          checkMg ? "" : "bg-[#E9ECEF] "
                        } w-[250px] border h-[30px] text-gray-700 rounded-[4px] text-xs`}
                      ></ItemDropDown> */}
                      {/*------------Tỉnh/Thành phố---------------*/}
                      <div className=" items-center mt-[2px] flex gap-[5px]">
                        <p
                          className={`${
                            checkMg
                              ? "w-[160px]"
                              : value.valueSTK !== ""
                              ? "w-[193px]"
                              : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs">
                            {t("home:Transfer.Tinh_ThanhPho")}
                          </label>
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className={`${
                              checkMg ? "" : "bg-[#E9ECEF] "
                            } w-[250px] px-4 border h-[30px] text-gray-700 rounded-[4px] text-xs`}
                            placeholder={checkMg ? "Chọn tỉnh/TP" : ""}
                            defaultValue={checkMg ? "" : value.city}
                            disabled={checkMg ? false : true}
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-[#FF0000]">
                              (*)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/*------------Chi nhánh ngân hàng---------------*/}
                      <div className=" items-center flex gap-[5px] mt-[2px] ">
                        <p
                          className={`${
                            checkMg
                              ? "w-[160px]"
                              : value.valueSTK !== ""
                              ? "w-[193px]"
                              : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.ChiNhanhNganHang")}
                          </label>
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className={`${
                              checkMg ? "" : "bg-[#E9ECEF] "
                            } w-[250px] px-4 border h-[30px] text-gray-700 rounded-[4px] text-xs`}
                            placeholder={
                              checkMg ? "Chọn chi nhánh ngân hàng" : ""
                            }
                            defaultValue={checkMg ? "" : value.branch}
                            disabled={checkMg ? false : true}
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-[#FF0000]">
                              (*)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*------------Noi Dung---------------*/}
                    <div className="mt-[23px]">
                      <h3 className="text-[9pt] font-bold uppercase px-[5px] py-[3px]">
                        {t("home:Transfer.NoiDungChuyenTien")}{" "}
                        <span className="font-bold text-[#FF0000]">(*)</span>
                      </h3>
                      <div className=" items-center flex gap-[5px] ">
                        <p
                          className={`${
                            checkMg
                              ? "w-[160px]"
                              : value.valueSTK !== ""
                              ? "w-[193px]"
                              : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs"></label>
                        </p>
                        <div className="flex items-start gap-1">
                          <textarea
                            typeof="text"
                            cols={30}
                            rows={1}
                            value={value.content}
                            className="w-[400px] resize-y min-h-[37px] px-3 py-1 border border-[#ced4da] outline-none overflow-auto text-gray-700 rounded-[4px] transition-all text-xs bg-white focus:border-blue-300 focus:shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                            onChange={(e: any) => {
                              setValue({
                                ...value,
                                content: e.target.value,
                              });
                            }}
                          />
                          <div className="font-bold w-10 text-[12px] whitespace-nowrap">
                            <span className="font-bold text-[#FF0000]">
                              (*)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*------------Phi Chuyen Tien---------------*/}
                    <div className="flex gap-[5px] items-center mt-[30px] mb-6">
                      <p
                        className={`${
                          checkMg ? "w-[160px]" : "w-[193px]"
                        } text-[9pt] font-bold uppercase px-[5px] py-[3px]`}
                      >
                        {t("home:Transfer.PhiChuyenTien")}
                      </p>
                      <div className="flex items-center flex-1 gap-3">
                        <div className="w-[13px] h-[13px] relative flex items-center rounded-full border border-[#005cc8] justify-center">
                          <span className=" w-[7px] h-[7px] rounded-full bg-[#005cc8]"></span>
                        </div>
                        <span className="text-xs font-bold">
                          {t("home:Transfer.NguoiChuyenChiu")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-[7px] mb-[10px] pl-[6px]">
                <img src="/arrow2.jpg" alt="" />
                <span className="text-xs leading-[22px]">
                  {t("home:Transfer.TITLE_CHUYENTIEN_F_LEFT")}{" "}
                  <span className="font-bold leading-[22px]">
                    {t("home:Transfer.TITLE_CHUYENTIEN_F_RIGHT")}
                  </span>
                </span>
              </div>

              <div className="border border-borderTransfer w-[800px] mx-auto pt-[5px] pb-[5px] px-[14px] flex flex-col">
                <span className="font-bold text-[10pt]">
                  {t("home:Transfer.GhiChu")}:
                </span>
                <p className="text-[10pt] leading-5">
                  {t("home:Transfer.TITLE_NOTE")}:
                  <br />- {t("home:Transfer.ITEM_NOTE")}
                  <br />- {t("home:Transfer.ITEM_NOTE_B")}.
                </p>
              </div>
            </div>
            <div className="mt-[15px] mb-2 flex justify-center gap-[3px]">
              <button
                className="rounded-[5px] w-[80px] h-[34px] border text-[12px] border-[#2371AF] leading-[18px] hover:bg-[#2371AF] hover:text-white transition-all"
                onClick={() => {
                  if (!value.valueMoney) {
                    alert("Bạn chưa nhập số lượng tiền cần chuyển!");
                  } else if (!value.content) {
                    alert("Bạn chưa nhập nội dung chuyển tiền!");
                  } else {
                    handleShowModel("showModelThucHien");
                  }
                }}
              >
                {t("home:Transfer.ThucHien")}
              </button>
              <button
                className="rounded-[5px] w-[80px] h-[34px] border text-[12px] border-[#2371AF] leading-[18px] hover:bg-[#2371AF] hover:text-white transition-all"
                onClick={resetData}
              >
                {t("home:Transfer.LamLai")}
              </button>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default MoneyTransferMain;
