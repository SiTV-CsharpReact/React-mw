import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
const MoneyTransferForm = () => {
  const { t } = useTranslation(["home"]);
  const [getTemplate, setGetTemplate] = useState<Array<string>>([]);
  useEffect(() => {
    const fetchDataTemplate = async () => {
      try {
        const response = await axios.get("http://localhost:8060/TableTemplate");
        setGetTemplate(response.data);
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    fetchDataTemplate();
  }, []);
  return (
    <>
      <LayoutPage
        PageTitle={t("home:Transfer.Mauchuyentien")}
        content={t("home:Transfer.Mauchuyentien")}
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
        <div>
          <div className="mt-[20px] border border-[#dddddd]">
            <table className="w-full">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[35%]" />
                <col className="w-[11%]" />
                <col className="w-[23%]" />
                <col className="w-[26%]" />
              </colgroup>
              <thead className="bg-[#f3f3f3]">
                <tr>
                  <th className="text-xs font-bold border-r border-[#dddddd] h-[50px]">
                    {t("home:Transfer.STT")}
                  </th>
                  <th className="text-xs font-bold border-r border-[#dddddd] h-[50px]">
                    {t("home:Transfer.TenMau")}
                  </th>
                  <th className="text-xs font-bold border-r border-[#dddddd] h-[50px]">
                    {t("home:Transfer.TaiKhoanThuHuong")}
                  </th>
                  <th className="text-xs font-bold border-r border-[#dddddd] h-[50px]">
                    {t("home:Transfer.TenNguoiThuHuong")}
                  </th>
                  <th className="text-xs font-bold border-r border-[#dddddd] h-[50px]">
                    {t("home:Transfer.NganHangThuHuong")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getTemplate?.length > 0 &&
                  getTemplate.map((item: any, index: number = 0) => (
                    <tr
                      className="border-t border-[#dddddd] hover:bg-[#eeffee]"
                      key={item.TBLID}
                    >
                      <td className="text-xs leading-[22px] px-[5px] py-[1px] border-r">
                        {index + 1}
                      </td>
                      <td className="text-xs leading-[22px] px-[5px] py-[1px] border-r">
                        {item.TEMPLATENAME}
                      </td>
                      <td className="text-xs leading-[22px] px-[5px] py-[1px] border-r">
                        {item.ACCOUNTRCV}
                      </td>
                      <td className="text-xs leading-[22px] px-[5px] py-[1px] border-r">
                        {item.ACCOUNTRCVNAME}
                      </td>
                      <td className="text-xs leading-[22px] px-[5px] py-[1px] border-r">
                        {item.BANKRCVNAME}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-center">
            <a
              href="http://accounts3.fpts.com.vn/account/EzTransferReg"
              target="_blank"
              className="text-[13px text-[#337ab7] hover:!underline transition-all"
              rel="noreferrer"
            >
              {t("home:Transfer.CapNhatDSMCT")}
            </a>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default MoneyTransferForm;
