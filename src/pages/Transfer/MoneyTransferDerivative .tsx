import { useEffect } from "react";
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
import { getDataHomeTransfer } from "./TransferSlice";
import Lgoass from "./../FromAction/images/arrow2.jpg";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../store/configureStore";
import { formatNumber } from "../../utils/util";
import { getDateTime } from "../helper/DateTime";
const MoneyTransferDerivative = () => {
  const currentDate = new Date();
const day = currentDate.getDate();
const month = (currentDate.getMonth() + 1).toString().padStart(2,"0"); // Tháng được đếm từ 0, nên cần cộng 1
const year = currentDate.getFullYear();
const tuNgay = day+"/"+month+"/"+year
  const dispatch = useAppDispatch();
  const { dataHomeTransfer } = useAppSelector(
    (state: RootState) => state.transfer
  );
  useEffect(() => {
    dispatch(getDataHomeTransfer());
  }, []);
  return (
    <>
      <LayoutPage
        Icon={true}
        Title="Hướng dẫn sử dụng Eztransfer "
        LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/chuyen-tien-truc-tuyen/"
        PageTitle="Chuyển tiền ký quỹ CK phái sinh"
        content="Chuyển tiền ký quỹ CK Phái sinh "
      >
        {!dataHomeTransfer ? (
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
        ) : (
          <div className="contentActionGD">
            <div id="divGridEzTranfer">
              {/*-------grid----------*/}
              <div>
                <table
                  className="tblAdvList table"
                  cellSpacing={0}
                  style={{ width: "100%", borderCollapse: "collapse" }}
                  border={0}
                >
                  <tbody>
                    <tr>
                      <td
                        align="right"
                        className="BIH3"
                        colSpan={5}
                        style={{ textAlign: "right" }}
                      >
                        Đơn vị: VNĐ
                      </td>
                    </tr>
                    <tr>
                      <th className="C" scope="col">
                        Số dư tiền mặt <br />
                        <span style={{ fontSize: "11pt" }}> A</span>
                      </th>
                      <th className="C" scope="col">
                        Tiền ứng trước <br />
                        <span style={{ fontSize: "11pt" }}> B</span>
                      </th>
                      <th
                        className="C ez-transfer-suc-mua"
                        scope="col"
                        style={{ display: "none" }}
                      >
                        Sức mua từ CK còn lại <br />
                        <span style={{ fontSize: "11pt" }}> C</span>
                      </th>
                      <th
                        className="C ez-transfer-han-muc"
                        scope="col"
                        style={{ display: "none" }}
                      >
                        Hạn mức còn lại <br />
                        <span style={{ fontSize: "11pt" }}> D</span>
                      </th>
                      <th scope="col" className="C">
                        Số dư có thể Rút, Chuyển <br />{" "}
                        <span id="transfer_formal" style={{ fontSize: "11pt" }}>
                          C = A + B
                        </span>
                      </th>
                    </tr>
                    <tr className="BOF">
                      <td id="TIENMAT">{formatNumber(dataHomeTransfer?.AVAIL_FSAVING)}</td>
                      <td id="ACASHADVANCE">0</td>
                      <td
                        id="AVAIL_STOCKVAL"
                        className="ez-transfer-suc-mua"
                        style={{ display: "none" }}
                      >
                        81,825,125
                      </td>
                      <td
                        id="REMAININGQUOTA"
                        className="ez-transfer-han-muc"
                        style={{ display: "none" }}
                      >
                        13,070,579,864
                      </td>
                      <td id="AVAIL_TRANSFER">{formatNumber(dataHomeTransfer?.AVAIL_TRANSFER)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table cellSpacing={0} cellPadding={0} id="tblEzTransfer">
                <tbody>
                  <tr className="Hide">
                    <td className="Title">Lệnh chuyển tiền</td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: 5 }}>
                      <div className="NoteEzTransfer">
                        <span className="imgNoteEzTransfer">
                          <img src={Lgoass} />
                        </span>
                        <span className="txtNoteEzTransfer">
                          Với trách nhiệm thuộc về Tôi/Chúng tôi, đề nghị Quý
                          Công ty ghi nợ tài khoản của Tôi/Chúng tôi để thực
                          hiện chuyển tiền theo nội dung sau:
                        </span>
                      </div>
                      <table id="tblEzTransferInner">
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td />
                            <td
                              className="B lblTransferForm"
                              style={{ textTransform: "uppercase" }}
                            >
                              Số tiền
                            </td>
                            <td>
                              <input
                                tabIndex={1}
                                className="TBText w120 R form-control"
                                id="txtQuantity"
                                type="text"
                                maxLength={17}
                                name="txtQuantity"
                                style={{ width: 130 }}
                              />
                              &nbsp;<b className="Symbol">VND</b>{" "}
                              <b className="Red">(*)</b>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr>
                            <td />
                            <td
                              className="B"
                              style={{ textTransform: "uppercase" }}
                            >
                              Ngày hiệu lực
                            </td>
                            <td>
                              <b>
                                <span id="tdDateEffect">{tuNgay}</span>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr>
                            <td />
                            <td className="B">LOẠI GIAO DỊCH</td>
                            <td>
                              <b>
                                <span id="tdTransTypeName">
                                  Nộp tiền vào TK ký quỹ Phái sinh FPTS (từ
                                  CKCS)
                                </span>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr style={{ height: 50 }}>
                            <td />
                            <td
                              className="B"
                              style={{ verticalAlign: "top", paddingTop: 5 }}
                            >
                              NỘI DUNG CHUYỂN TIỀN
                            </td>
                            <td>
                              <span
                                id="tdTransInformation"
                                style={{
                                  width: 290,
                                  float: "left",
                                  fontWeight: 600,
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr>
                            <td />
                            <td className="B">PHÍ CHUYỂN TIỀN</td>
                            <td>
                              <b>
                                Phí chuyển tiền (nếu có) trừ trên số dư TK chứng
                                Khoán cơ sở
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                          <tr>
                            <td colSpan={3} height={10}></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td className="P5">
                      <div className="NoteEzTransfer">
                        <span className="imgNoteEzTransfer">
                          <img src={Lgoass} />
                        </span>
                        <span className="txtNoteEzTransfer">
                          Tôi/Chúng tôi cam kết đã đọc và hiểu rõ các điều khoản
                          trong{" "}
                          <b>
                            Hợp đồng cung cấp và sử dụng dịch vụ giao dịch chứng
                            khoán
                          </b>
                        </span>
                      </div>
                      <div className="stepBox">
                        <b>Ghi chú:</b>
                        <br />
                        Thời gian thực hiện: Từ 0h đến 15h55 các ngày làm việc.
                        <br />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div id="divButton">
                <button
                  id="btn-cn"
                  className="btn btn-default btnReportUpdate"
                >  Thực hiện</button> 
               <button
                 
                 id="btn-cn"
                 className="btn btn-default btnReportUpdate"
               >  Làm lại </button> 
              </div>
            </div>
          </div>
        )}
      </LayoutPage>
    </>
  );
};
export default MoneyTransferDerivative;
