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
  console.log(balanceDetail);
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
              onClick={handleShowModel}
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
                className={`mt-[30px] ${
                  value.valueSTK !== "" ? "pl-[98px] " : "pl-[100px]"
                }`}
              >
                <div className="w-[700px] flex flex-col gap-[2px]">
                  {/*-------------SoTien-------------------*/}
                  <div className="flex items-center gap-[5px]">
                    <p
                      className={`${
                        value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
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
                        value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
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
                        value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                      } px-[5px]`}
                    ></div>
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
                    {/*------------Nguoi THu Huong---------------*/}
                    <div className="mt-5">
                      <h3 className="text-[9pt] font-bold uppercase px-[5px] py-[3px]">
                        {t("home:Transfer.NguoiThuHuong")}
                      </h3>
                      <div className=" items-center flex gap-[5px]">
                        <div
                          className={`${
                            value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.SoTaiKhoan")}
                          </label>
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-8 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.valueSTK}
                            disabled
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
                            value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.TenNguoiThuHuong")}
                          </label>
                        </p>
                        <div className="flex gap-1">
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
                    {/*------------Ngan Hang Nguoi THu Huong---------------*/}
                    <div className="mt-[23px]">
                      <h3 className="text-[9pt] font-bold uppercase px-[5px] py-[3px]">
                        {" "}
                        {t("home:Transfer.NganHangNguoiThuHuong")}
                      </h3>
                      <div className="flex gap-[5px] items-center">
                        <p
                          className={`${
                            value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.NganHangThuHuong")}
                          </label>
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className="w-[320px] px-4 border h-[30px] col-3 text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.beneficiaryBank}
                            disabled
                          />
                          <div className="items-center w-10 my-auto text-[12px] whitespace-nowrap">
                            <span className="font-bold text-[#FF0000]">
                              (*)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=" items-center mt-[2px] flex gap-[5px]">
                        <p
                          className={`${
                            value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs">
                            {t("home:Transfer.Tinh_ThanhPho")}
                          </label>
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-[30px] text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.city}
                            disabled
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
                            value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs ">
                            {t("home:Transfer.ChiNhanhNganHang")}
                          </label>
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            className="w-[250px] px-4 border h-[30px] text-gray-700 rounded-[4px] text-xs bg-[#E9ECEF]"
                            value={value.branch}
                            disabled
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
                            value.valueSTK !== "" ? "w-[193px]" : "w-[234px]"
                          } px-[5px] pl-[13px]`}
                        >
                          <label htmlFor="" className="text-xs"></label>
                        </p>
                        <div className="flex items-start gap-1">
                          <textarea
                            typeof="text"
                            cols={30}
                            rows={1}
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
                      <p className="text-[9pt] font-bold uppercase w-[193px] px-[5px] py-[3px]">
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
