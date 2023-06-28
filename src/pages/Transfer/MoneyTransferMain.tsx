import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
const MoneyTransferMain = () => {
  const { t } = useTranslation(["home"]);
  const [balanceDetail, setBalanceDetail] = useState<any>({});
  const [getTemplate, setGetTemplate] = useState<Array<string>>([]);
  const [value, setValue] = useState<any>({
    valueMoney: "",
    showModel: false,
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
          "http://localhost:3000/TableGetBalanceDetail"
        );
        const templatePromise = axios.get(
          "http://localhost:3000/TableTemplate"
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
  //Handle show model
  const handleShowModel = () => {
    setValue({
      ...value,
      showModel: !value.showModel,
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
            } flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full transition-all`}
          >
            <div
              className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20"
              onClick={handleShowModel}
            ></div>
            <div
              className={`absolute ${
                value.showModel ? "opacity-100 visible" : "opacity-0 invisible"
              } p-4 transition-fallAnimation w-[800px] pb-6 bg-white`}
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
          {/* -----------------------------Screen-----------------------------*/}
          <div className="w-[840px] mx-auto my-[5px]">
            <div className="flex justify-end pr-1 italic leading-[25px] items-center text-[10px] text-[#212529]">
              {t("home:Transfer.DonVi")}: VNĐ
            </div>
            {/*-----------------------------------------Table Show Money------------------------------------------*/}
            <div className="text-xs border border-borderTransfer">
              <table className="w-full">
                <thead className="bg-[#F3F3F3]">
                  <tr className="border-b border-borderTransfer">
                    <th className="font-bold leading-4 border-r border-borderTransfer h-[58px]">
                      {t("home:Transfer.SoDuTienMat")}
                      <br />
                      <span className="text-[11pt]">A</span>
                    </th>
                    <th className="leading-4 border-r border-borderTransfer">
                      {t("home:Transfer.TienUngTruoc")}
                      <br />
                      <span className="text-[11pt]">B</span>
                    </th>
                    <th className="leading-4 w-[36%]">
                      {t("home:Transfer.SoDuCoTheRut")}
                      <br />
                      <span className="text-[11pt]">C = A + B</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[#ae1a1a] font-bold">
                    <td className="py-[3px] text-center border-r border-borderTransfer">
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
            <div className="mt-3 border border-[#CCCCCC] p-[6px] pb-3 shadow-[0_1px_5px_rgba(0,0,0,.2)]">
              <div className="flex gap-1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 201 202"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M198.83 98.17L102.83 2.16998C102.271 1.60993 101.558 1.22846 100.781 1.07386C100.005 0.919258 99.2001 0.998476 98.4688 1.30149C97.7375 1.6045 97.1126 2.11767 96.6731 2.77605C96.2336 3.43442 95.9994 4.20839 96 4.99998V49H12C8.8174 49 5.76515 50.2643 3.51472 52.5147C1.26428 54.7651 0 57.8174 0 61V141C0 144.183 1.26428 147.235 3.51472 149.485C5.76515 151.736 8.8174 153 12 153H96V197C95.9992 197.792 96.2335 198.566 96.6732 199.225C97.1129 199.884 97.7383 200.397 98.47 200.7C99.2013 201.003 100.006 201.081 100.782 200.927C101.558 200.772 102.271 200.39 102.83 199.83L198.83 103.83C199.202 103.458 199.497 103.017 199.698 102.532C199.9 102.046 200.003 101.526 200.003 101C200.003 100.474 199.9 99.9538 199.698 99.4682C199.497 98.9826 199.202 98.5415 198.83 98.17ZM104 187.34V149C104 147.939 103.579 146.922 102.828 146.172C102.078 145.421 101.061 145 100 145H12C10.9391 145 9.92172 144.579 9.17157 143.828C8.42143 143.078 8 142.061 8 141V61C8 59.9391 8.42143 58.9217 9.17157 58.1715C9.92172 57.4214 10.9391 57 12 57H100C101.061 57 102.078 56.5786 102.828 55.8284C103.579 55.0783 104 54.0608 104 53V14.66L190.34 101L104 187.34Z"
                    fill="black"
                  />
                </svg>

                <span className="text-xs">
                  {t("home:Transfer.Title_CHUYENTIEN_H")}
                </span>
              </div>
              <div className="mt-[30px]">
                <div className="w-[700px] mx-auto flex flex-col gap-[2px] pl-[30px]">
                  <div className="grid items-center grid-cols-10">
                    <label
                      htmlFor="money"
                      className="col-span-4 text-xs font-bold"
                    >
                      {t("home:Transfer.SoTien")}
                    </label>
                    <div className="flex col-span-6 gap-1">
                      <input
                        type="text"
                        name="money"
                        autoComplete="off"
                        value={value.valueMoney}
                        onChange={handleInputChange}
                        className="w-[250px] transition-all text-[12px] text-right border h-[32px] rounded-[4px] px-3 outline-none focus:border-blue-300 focus:shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                        // oninput="validateInput(this)"
                      />
                      <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                        VND <span className="font-bold text-red-400">(*)</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid items-center grid-cols-5">
                    <label htmlFor="" className="col-span-2 text-xs font-bold">
                      {t("home:Transfer.NgayHieuLuc")}
                    </label>
                    <div className="flex col-span-3 gap-1">
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
                  <div className="grid grid-cols-5">
                    <div className="col-span-2"></div>
                    <div className="col-span-3 gap-1">
                      <button
                        className="w-[250px] bg-[#3278B3] text-white h-[34px] text-center text-xs rounded-md"
                        onClick={handleShowModel}
                      >
                        {t("home:Transfer.ChonMauChuyenTien")}
                      </button>
                      <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap"></div>
                    </div>
                  </div>
                  {/* Phi chuyen tien*/}
                  <div
                    className={`${value.valueSTK !== "" ? "block" : "hidden"}`}
                  >
                    <div className="mt-5 ">
                      <h3 className="text-[9pt] font-bold uppercase">
                        {t("home:Transfer.NguoiThuHuong")}
                      </h3>
                      <div className="grid items-center grid-cols-5 mt-2">
                        <label htmlFor="" className="col-span-2 pl-3 text-xs">
                          {t("home:Transfer.SoTaiKhoan")}
                        </label>
                        <div className="flex col-span-3 gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-8 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.valueSTK}
                            disabled
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-red-400">(*)</span>
                          </div>
                        </div>
                      </div>
                      <div className=" items-center grid grid-cols-5 mt-[2px] ">
                        <label htmlFor="" className="col-span-2 pl-3 text-xs">
                          {t("home:Transfer.TenNguoiThuHuong")}
                        </label>
                        <div className="flex col-span-3 gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-8 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.beneficiaryName}
                            disabled
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 ">
                      <h3 className="text-[9pt] font-bold uppercase">
                        {" "}
                        {t("home:Transfer.NganHangNguoiThuHuong")}
                      </h3>
                      <div className="grid items-center grid-cols-5 mt-2">
                        <label htmlFor="" className="col-span-2 pl-3 text-xs">
                          {t("home:Transfer.NganHangThuHuong")}
                        </label>
                        <div className="flex col-span-3 gap-1">
                          <input
                            type="text"
                            className="w-[320px] px-4 border h-8 col-3 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.beneficiaryBank}
                            disabled
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-red-400">(*)</span>
                          </div>
                        </div>
                      </div>
                      <div className=" items-center mt-[2px] grid grid-cols-5">
                        <label htmlFor="" className="col-span-2 pl-3 text-xs">
                          {t("home:Transfer.Tinh_ThanhPho")}
                        </label>
                        <div className="flex col-span-3 gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-8 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.city}
                            disabled
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-red-400">(*)</span>
                          </div>
                        </div>
                      </div>
                      <div className=" items-center grid grid-cols-5 mt-[2px] ">
                        <label htmlFor="" className="col-span-2 pl-3 text-xs">
                          {t("home:Transfer.ChiNhanhNganHang")}
                        </label>
                        <div className="flex col-span-3 gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-8 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.branch}
                            disabled
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-red-400">(*)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 ">
                      <h3 className="text-[9pt] font-bold uppercase">
                        {t("home:Transfer.NoiDungChuyenTien")}{" "}
                        <span className="font-bold text-red-400">(*)</span>
                      </h3>
                      <div className="grid items-center grid-cols-5 mt-2 ">
                        <label
                          htmlFor=""
                          className="col-span-2 pl-3 text-xs"
                        ></label>
                        <div className="flex col-span-3 gap-1">
                          <textarea
                            typeof="text"
                            cols={30}
                            rows={1}
                            className="w-[400px] px-3 py-1 border outline-none text-gray-700 rounded-[4px] transition-all text-xs bg-white focus:border-blue-300 focus:shadow-[0px_0px_0px_4px_rgba(200,237,255,0.5)]"
                            onChange={(e: any) => {
                              setValue({
                                ...value,
                                content: e.target.value,
                              });
                            }}
                          />
                          <div className="flex gap-1 font-bold w-10 my-auto text-[12px] whitespace-nowrap cursor-pointer">
                            <span className="font-bold text-red-400">(*)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid items-center grid-cols-5 mt-8 mb-6">
                      <h3 className="text-[9pt] col-span-2 font-bold flex-1">
                        {t("home:Transfer.PhiChuyenTien")}
                      </h3>
                      <div className="flex items-center flex-1 col-span-3 gap-3">
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
              <div className="flex gap-1 mt-3 mb-[14px]">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 201 202"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M198.83 98.17L102.83 2.16998C102.271 1.60993 101.558 1.22846 100.781 1.07386C100.005 0.919258 99.2001 0.998476 98.4688 1.30149C97.7375 1.6045 97.1126 2.11767 96.6731 2.77605C96.2336 3.43442 95.9994 4.20839 96 4.99998V49H12C8.8174 49 5.76515 50.2643 3.51472 52.5147C1.26428 54.7651 0 57.8174 0 61V141C0 144.183 1.26428 147.235 3.51472 149.485C5.76515 151.736 8.8174 153 12 153H96V197C95.9992 197.792 96.2335 198.566 96.6732 199.225C97.1129 199.884 97.7383 200.397 98.47 200.7C99.2013 201.003 100.006 201.081 100.782 200.927C101.558 200.772 102.271 200.39 102.83 199.83L198.83 103.83C199.202 103.458 199.497 103.017 199.698 102.532C199.9 102.046 200.003 101.526 200.003 101C200.003 100.474 199.9 99.9538 199.698 99.4682C199.497 98.9826 199.202 98.5415 198.83 98.17ZM104 187.34V149C104 147.939 103.579 146.922 102.828 146.172C102.078 145.421 101.061 145 100 145H12C10.9391 145 9.92172 144.579 9.17157 143.828C8.42143 143.078 8 142.061 8 141V61C8 59.9391 8.42143 58.9217 9.17157 58.1715C9.92172 57.4214 10.9391 57 12 57H100C101.061 57 102.078 56.5786 102.828 55.8284C103.579 55.0783 104 54.0608 104 53V14.66L190.34 101L104 187.34Z"
                    fill="black"
                  />
                </svg>

                <span className="text-xs">
                  {t("home:Transfer.TITLE_CHUYENTIEN_F_LEFT")}{" "}
                  <span className="font-bold">
                    {t("home:Transfer.TITLE_CHUYENTIEN_F_RIGHT")}
                  </span>
                </span>
              </div>

              <div className="border border-borderTransfer w-[800px] mx-auto py-[5px] px-[15px] flex flex-col gap-1">
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
            <div className="mt-[15px] mb-2 flex justify-center gap-1">
              <button className="rounded-[5px] w-[80px] h-[34px] border text-[12px] border-[#2371AF] leading-[18px] hover:bg-[#2371AF] hover:text-white transition-all">
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
