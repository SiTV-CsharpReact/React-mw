import { useEffect } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import { getDataTemplate } from "./TransferSlice";
import { RootState, useAppDispatch } from "../../store/configureStore";
import { useSelector } from "react-redux";
import { transfeTemPlateType } from "./models/transferModels";
import { Link } from "react-router-dom";
const MoneyTransferForm = () => {
  const dispatch = useAppDispatch();
  const { dataTemPlate } = useSelector((state: RootState) => state.transfer);
  console.log(dataTemPlate)
  useEffect(() => {
    dispatch(getDataTemplate());
  }, []);
  return (
    <>
      <LayoutPage PageTitle="Mẫu Chuyển Tiền">
        {dataTemPlate ? (
          <> 
          <table
            cellSpacing={0}
            rules="all"
            border={1}
            className="TablePage tableTransfer"
            id="ContentPlaceHolderBody_gvwReport"
            style={{ borderStyle: "None", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên mẫu</th>
                <th scope="col">
                  Tài khoản
                  <br />
                  thụ hưởng
                </th>
                <th scope="col">
                  Tên người
                  <br />
                  thụ hưởng
                </th>
                <th scope="col">
                  Ngân hàng
                  <br />
                  thụ hưởng
                </th>
                <th
                  scope="col"
                  className="limit-column"
                  style={{ display: "none" }}
                >
                  Ngày tạo
                </th>
                <th
                  scope="col"
                  className="limit-column"
                  style={{ display: "none" }}
                >
                  Ngày sửa
                </th>
                <th
                  scope="col"
                  className="limit-column"
                  style={{ display: "none" }}
                >
                  Sửa
                </th>
                <th
                  scope="col"
                  className="limit-column"
                  style={{ display: "none" }}
                >
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTemPlate
                ? dataTemPlate.map((item: transfeTemPlateType, index: number) => {
                    return (
                      <>
                        <tr
                          data-toggle="tooltip"
                          title="Click đúp để chuyển tiền"
                          className="transfer-template"
                          data-template-id={7}
                          key={index}
                        >
                          <td className="L">{index}</td>
                          <td className="L">
                            {item?.TEMPLATENAME}
                          </td>
                          <td className="L">{item?.ACCOUNTRCV}</td>
                          <td className="L">{item?.ACCOUNTRCVNAME}</td>
                          <td className="L">{item?.BANKRCVNAME}</td>
                     
                        </tr>
                      </>
                    );
                  })
                : ""}
            </tbody>
          </table>
          <div className="message">
                  <Link to="" className="updateLinkTransfer"> Cập nhật Danh sách Mẫu chuyển tiền</Link>
          </div>
          </>
        ) : (
          <div className="message">
            <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
            <p>
              Quý khách vui lòng đăng ký dịch vụ Eztransfer theo hướng dẫn
              &nbsp;
              <a
                target="_blank"
                href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
              >
                tại đây
              </a>
              .
            </p>
          </div>
        )}
      </LayoutPage>
    </>
  );
};
export default MoneyTransferForm;
