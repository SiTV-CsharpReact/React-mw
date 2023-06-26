import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import axios from "axios";
const MoneyTransferForm = () => {
  const [getTemplate, setGetTemplate] = useState<Array<string>>([]);
  useEffect(() => {
    const fetchDataTemplate = async () => {
      try {
        const response = await axios.get("http://localhost:3000/TableTemplate");
        setGetTemplate(response.data);
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    fetchDataTemplate();
  }, []);
  return (
    <>
      <LayoutPage PageTitle="Mẫu Chuyển Tiền" content="Mẫu chuyển tiền">
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
          <div className="mt-[20px] border">
            <table className="w-full">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[35%]" />
                <col className="w-[11%]" />
                <col className="w-[23%]" />
                <col className="w-[26%]" />
              </colgroup>
              <thead className="border-b bg-[#EDEDED]">
                <tr>
                  <th className="text-xs font-bold border-r h-[50px]">STT</th>
                  <th className="text-xs font-bold border-r h-[50px]">
                    Tên mẫu
                  </th>
                  <th className="text-xs font-bold border-r h-[50px]">
                    Tài khoản <br /> thụ hưởng
                  </th>
                  <th className="text-xs font-bold border-r h-[50px]">
                    Tên người <br /> thụ hưởng
                  </th>
                  <th className="text-xs font-bold border-r h-[50px]">
                    Ngân hàng <br /> thụ hưởng
                  </th>
                </tr>
              </thead>
              <tbody>
                {getTemplate?.length > 0 &&
                  getTemplate.map((item: any, index: number = 0) => (
                    <tr
                      className="border-b hover:bg-[#eeffee]"
                      key={item.TBLID}
                    >
                      <td className="text-xs leading-[24px] px-1 border-r">
                        {index + 1}
                      </td>
                      <td className="text-xs leading-[24px] px-1 border-r">
                        {item.TEMPLATENAME}
                      </td>
                      <td className="text-xs leading-[24px] px-1 border-r">
                        {item.ACCOUNTRCV}
                      </td>
                      <td className="text-xs leading-[24px] px-1 border-r">
                        {item.ACCOUNTRCVNAME}
                      </td>
                      <td className="text-xs leading-[24px] px-1 border-r">
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
              Cập nhật Danh sách Mẫu chuyển tiền
            </a>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default MoneyTransferForm;
