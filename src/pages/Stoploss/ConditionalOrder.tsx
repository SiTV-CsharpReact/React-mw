import React from "react";
import LayoutPage from "../Layout/LayoutPage";
import { Link } from "react-router-dom";

const ConditionalOrder = () => {
  return (
    <>
      <LayoutPage
        PageTitle="Đặt lệnh điều kiện"
        content="Đặt lệnh điều kiện"
        Icon={true}
        TitleHover="Hướng dẫn sử dụng EzStoploss"
        LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/"
      >
        <div>
          <div className="ConditionalOrder_main">
            <div className="ConditionalOrder_Title">
              <h3>
                <strong>
                  Cập nhật{" "}
                  <a href="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/huong-dan-su-dung-dich-vu-dat-lenh-dieu-kien-ezstoploss/">
                    tính năng mới
                  </a>
                  : kích hoạt lệnh điều kiện{" "}
                  <a href="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/huong-dan-su-dung-dich-vu-dat-lenh-dieu-kien-ezstoploss/">
                    ngay trong phiên
                  </a>
                </strong>
              </h3>
            </div>
            <div>
              <div className="boxdivCondi borderDiv">
                <div className="">
                  <form action="" className="formCondi">
                    <div className="fromGrupCondi fromGrupCondi_actionDK">
                      <div className="tetsagydhsad">
                       
                        <label htmlFor=""> <br /> </label>
                      </div>
                      <div className="fromGrupCondi_action ">
                        <div>
                          <select name="" id="">
                            <option value="">Đặt lệnh </option>
                            <option value="">Mua </option>
                            <option value=""> Bán </option>
                          </select>
                        </div>
                        <div>
                          <input type="text" placeholder="Chứng khoán" />
                        </div>
                      </div>
                    </div>
                    <div className="fromGrupCondi fromGrupCondi_actionDK">
                      <div className="tetsagydhsad">
                       
                        <label htmlFor=""> <br /> </label>
                      </div>
                      <div className="fromGrupCondi_action">
                        <div>
                          <select disabled className="disableActivon" name="" id="">
                            <option value="" selected>
                              Không
                            </option>
                            <option value="">Mua </option>
                            <option value=""> Bán </option>
                          </select>
                        </div>
                        <div  className="fromGrupCondi_action_input">
                          <input type="text" placeholder="Số lượng" />
                        </div>
                      </div>
                    </div>
                    <div className="fromGrupCondi fromGrupCondi_actionDK"  style={{background: "#84C35B"}}>
                      <div className="tetsagydhsad"> 
                        <label htmlFor="">ĐK kích hoạt: Khi giá khớp gần nhất </label>
                        <br />
                      </div>
                      <div className="fromGrupCondi_action " id="fromGrupCondi_actionDK">
                        <div>
                          <select name="" id="">
                            <option value="" selected>
                              Chọn DK
                            </option>
                            <option value=""> =l </option>
                            <option value=""> l= </option>
                          </select>
                        </div>
                        <div className="fromGrupCondi_action_input">
                          <input type="text" placeholder="Giá DK" />  
                          {/* icon  */}
                        </div>
                        <div className="priceStartUnit"> 
                        <span style={{ fontSize: "0.8em" }}>(x1000)</span>
                        </div>
                      </div>
                    </div>
                    <div className="fromGrupCondi fromGrupCondi_actionDK"  style={{background: "#F47E34"}}>
                      <div className="tetsagydhsad"> 

                        <label htmlFor=""> Lệnh thực hiện</label>
                      </div>
                      <div className="fromGrupCondi_action" id="fromGrupCondi_actionDK">
                        <div>
                          <select name="" id="">
                            <option value="" selected>
                                    Loại Giá 
                            </option>
                          
                          </select>
                        </div>
                        <div>
                          <input type="text" placeholder="Giá t.hiện" />
                        </div>
                        <div className="priceStartUnit">  <span style={{ fontSize: "0.8em" }}>(x1000)</span></div>
                      </div>
                    </div>
                    <div className="fromGrupCondi fromGrupCondi_actionDK">
                      <div className="tetsagydhsad">
                     
                        <label htmlFor=""> <br /></label>
                      </div>
                      <div className="fromGrupCondi_action">
                        <div>
                            <button className="btn" id="btn-cn" style={{height:"24px"}}>Ghi </button>
                        </div>
                        <div>
                        <button className="btn" id="btn-cn" style={{height:"24px"}}>Làm lại  </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="boxdivCondi ConditionalOrder_table">
                <table>
                  <thead>
                    <tr className="RHeader">
                      <td>Mua/Bán</td>
                      <td>Ký quỹ</td>
                      <td>Mã HĐ</td>
                      <td>Mã CK</td>
                      <td>Số lượng</td>
                      <td>ĐK kích hoạt</td>
                      <td>
                        Giá kích hoạt{" "}
                        <span style={{ fontSize: "0.8em" }}>(x1000)</span>
                      </td>
                      <td style={{ display: "none" }}>Loại lệnh</td>
                      <td>
                        Giá <span style={{ fontSize: "0.8em" }}>(x1000)</span>
                      </td>
                      <td style={{ display: "none" }}>Sàn</td>
                      <td>Trạng thái</td>
                      <td>Hủy</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className=" boxdivCondi borderDiv">
                <div className="from_sumit from_sumit_condi">
                  <div>
                    <label htmlFor=""> Xác nhận lệnh</label>
                  </div>
                  <div>
                    <span className="iconKey">
                      <i className="fa fa-key"></i>{" "}
                    </span>{" "}
                    <input type="text" placeholder="Mật khâu giao dịch " />
                  </div>
                  <div>
                    <button className="btn " id="btn-cn">
                      Gửi lệnh
                    </button>
                  </div>
                </div>
              </div>
              <div className="boxdivCondi solenhDieuKien">
                <a href="">
                  {" "}
                  Sổ lệnh điều kiện
                  <i className="fa fa-thin fa-arrow-up-right-from-square"></i>
                </a>
              </div>
              <div className="boxdivCondi borderDiv divCongBo">
                <h4>
                  {" "}
                  <strong>CÔNG BỐ RỦI RO VỀ LỆNH ĐIỀU KIỆN</strong>
                </h4>
                <p>
                  Sử dụng lệnh điều kiện luôn tiềm ẩn các rủi ro của phương thức
                  giao dịch điện tử, bao gồm nhưng không giới hạn ở việc dữ liệu
                  giá không đầy đủ hoặc chậm trễ, không theo kịp biến động thực
                  tế của thị trường. Khi đặt lệnh điều kiện, Khách hàng đã hiểu
                  rõ những rủi ro này và đồng ý miễn trừ mọi trách nhiệm của
                  FPTS về những thiệt hại (nếu có).
                </p>
              </div>
              <div className="boxdivCondi borderDiv divCongBo">
                <h4>
                  {" "}
                  <strong>
                    GHI CHÚ{" "}
                    <span style={{ paddingTop: "10px" }}>
                      <i className="fa fa-caret-up text-iconghichu mt-[-5px]"></i>{" "}
                    </span>
                  </strong>
                </h4>
                <div>
                  - Ứng dụng của lệnh:
                  <ul style={{ paddingLeft: "25px", listStyleType: "circle" }}>
                    <li>
                      {" "}
                      <span style={{ color: "red" }}>Bán</span> chốt lãi
                    </li>
                    <li>
                      {" "}
                      <span style={{ color: "red" }}>Bán</span> cắt lỗ
                    </li>
                    <li>
                      {" "}
                      <span style={{ color: "blue" }}>Mua</span> ở mức giá kỳ
                      vọng
                    </li>
                  </ul>
                </div>
                <div>
                  <p>
                    {" "}
                    - Lệnh được kích hoạt khi giá khớp gần nhất thỏa mãn điều
                    kiện của lệnh. Khi lệnh được kích hoạt, nếu số dư của khách
                    hàng không đủ thì lệnh sẽ bị từ chối và không còn hiệu lực
                    kích hoạt.
                  </p>
                  <p>
                    - Loại <strong> "Giá TT" - Giá thị trường</strong>: Khi lệnh
                    được kích hoạt, tùy theo Sàn và đợt giao dịch ở thời điểm
                    đó, hệ thống sẽ tự động gửi lệnh với giá ATO/MP/MTL/ATC.
                  </p>
                  <p>
                    - Lệnh chỉ có thể kích hoạt 01 (một) lần và chỉ trong thời
                    gian 3 tháng kể từ ngày đặt lệnh.
                  </p>
                  <p>
                    - Điều kiện kích hoạt và giá lệnh đặt sẽ không được tự động
                    điều chỉnh nếu chứng khoán có thực hiện quyền. Vì thế Quý
                    khách cần theo dõi sát lịch thực hiện quyền trước và sau khi
                    đặt lệnh.
                  </p>
                  <p>
                    <span>- FPTS</span> sẽ thông báo bằng E-Mail mỗi khi Lệnh
                    được kích hoạt hoặc khi Mã chứng khoán của Lệnh điều kiện
                    phát sinh Quyền.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};

export default ConditionalOrder;
