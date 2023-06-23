import { useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import InputDateAction from "../FromAction/InputDateAction";
import { getDateTime } from "../helper/DateTime";
type TypeValue = {
  MaCK: any;
  tuNgay: any;
  denNgay: any;
};
const RegistrationOnline = () => {
  let { tuNgay, denNgay } = getDateTime();
  const [data, setData] = useState<TypeValue>({
    MaCK: "",
    tuNgay: "",
    denNgay: "",
  });
  const ChangeMaCK = (e: any) => {
    setData({ ...data, MaCK: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  return (
    <>
      <LayoutPage
        content="Lưu ký trực tuyến "
        PageTitle="Lưu ký trực tuyến "
        Icon={true}
        TitleHover="Hướng dẫn sử dụng EzCustody"
        LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/luu-ky-chung-khoan/"
      >
        <div>
          <FromAction data={data}>
            <SelectAction Title="Mã Ck " ChangeFuncion={ChangeMaCK} />
            <InputDateAction
              Title="Từ Ngày"
              date={tuNgay}
              ChangeFuncion={ChangeTuNgay}
            />
            <InputDateAction
              Title="Từ Ngày"
              date={denNgay}
              ChangeFuncion={ChangeDenNgay}
            />
          </FromAction>
          <div className="InformationOnlineResgistion">
            <div className="InformationOnlineResgistion_top">
              <form action="">
                <div className="Resgiston_top">
                  <label htmlFor="">
                    <strong> I. Nhập thông tin chứng khoán lưu ký</strong>
                  </label>
                  <div className="ResgistionItem_top">
                    <div className="Resgistion_froms">
                      {/* input  */}
                      <div className="Resgistion_MCk">
                        <div className="flex_Resgistion">
                          <label htmlFor="">
                            {" "}
                            Mã CK <span className="luuyResgistion">*</span>
                          </label>
                          <input type="text" />
                        </div>
                        <div className="flex_Resgistion">
                          <label htmlFor=""> Sàn Giao Dịch </label>
                          <select disabled name="" id="">
                            <option selected value="">
                              Chọn
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="Resgistion_MCk Resgistion_TCK ">
                        <label htmlFor=""> Ten CK </label>
                        <input type="text" disabled />
                      </div>
                      <div className="Resgistion_MCk">
                        <div className="flex_Resgistion">
                          <label htmlFor="" className="soluongRes">
                            {" "}
                            Số lượng<span className="luuyResgistion">*</span>
                          </label>
                          <input type="text" />
                        </div>
                        <div className="flex_Resgistion"></div>
                      </div>
                    </div>
                    <div className="luuyResgistion">
                      <p>(*): Trường thông tin bắt buộc</p>
                      <p>
                        Lưu ý: Trường hợp một mã chứng khoán có nhiều số chứng
                        nhận sở hữu cổ phần, quý Khách vui lòng liên hệ Phòng
                        Lưu Ký Và Quản lý Cổ <br /> Đông để được hỗ trợ.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="">
                    <strong>
                      II. Quý khách vui lòng chuẩn bị hồ sơ lưu ký và gửi về
                      FPTS để thực hiện lưu ký.
                    </strong>
                  </label>
                  <div className="Resgiston_top">
                    <div className="ResgistionItem_top">
                      <p>Hồ sơ gồm :</p>
                      <ul>
                        <li>
                          1. Sổ/Giấy chứng nhận sở hữu cổ phần: 01 bản gốc
                        </li>
                        <li>
                          2. Phiếu gửi CK: Ký và ghi rõ họ tên 04 bản gốc tại
                          phần "Người gửi" và không chỉnh sửa thêm thông tin
                          (Sau khi Gửi lệnh, Chọn in phiếu gửi chứng khoán). <br /> *
                         <span className="textCMND">  Mẫu 06B/LK phòng khi trường hợp ngày cấp CMND/CCCD/
                          Trading code tại sổ CN SHCP hoặc tại tổ chức phát hành
                          khác với tài khoản GDCK tại FPTS</span>
                        </li>
                        <li>
                          {" "}
                          3. CMND/CCCD/Trading code (còn hiệu lực và mới nhất):
                          01 bản sao.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="">
                    Thời gian thực hiện lưu ký trung bình là ba (03) ngày làm
                    việc kể từ FPTS nhận được hồ sơ lưu ký hợp lệ
                  </label>
                  <div className="from_sumit">
                      <div><label htmlFor=""> Xác nhận lệnh</label></div>
                      <div>
                          <span className="iconKey"><i className="fa fa-key"></i>  </span> <input type="text" placeholder="Mật khâu giao dịch " />
                      </div>
                      <div> 
                        <button className="btn " id="btn-cn">Gửi lệnh</button>
                        <button className="btn " id="btn-cn">Làm lại </button>
                      </div>
                  </div>
                </div>
              </form>
            </div>
            {/* dưới */}
            <div className="InformationOnlineResgistion_bottom">
              <p>Hồ sơ Lưu ký xin gửi về: Phòng Lưu ký và quản lý cổ đông</p>
              <p>Địa chỉ : </p>
              <ul>
                <li>
                  Hà Nội: Số 52 Lạc Long Quân, phường Bưởi, quận Tây Hồ, TP.Hà
                  Nội.
                </li>
                <li>
                  {" "}
                  Đà Nẵng: 100 Quang Trung, phường Thạch Thang, quận Hải Châu,
                  TP.Đà Nẵng.
                </li>
                <li>
                  Hồ Chí Minh: Tầng 3, Tòa nhà 136-138 Lê Thị Hồng Gấm, phường
                  Nguyễn Thái Bình, quận 1, TP.Hồ Chí Minh.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default RegistrationOnline;
