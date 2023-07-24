import { OTP, dataOrderlenh, pricetable } from "../../models/stoploss";
import { KeyboardEvent, useRef, useState } from "react";
import {
  useAppSelector,
  RootState,
  useAppDispatch,
} from "../../store/configureStore";
import {
  handleChanginputVale,
  handleDcrementCouter,
  handleIcrementCouter,
  handleRemove,
} from "../Stoploss/stoplossSlice";
const ConditionalOrderTable = () => {
  const { dataOrderlenh } = useAppSelector(
    (state: RootState) => state.stoploss
  );
  const dispatch = useAppDispatch();
  // const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState<any[]>([-1, -1, -1, -1, -1, -1]);
  const OTPref = useRef<any[]>([]);
  const valueInputRef = useRef<any[]>([]);
  // function
  const incrementCounter = (data: pricetable) => {
    dispatch(handleIcrementCouter(data));
  };
  const dicrementCouter = (data: pricetable) => {
    dispatch(handleDcrementCouter(data));
  };
  const RemoveProduct = (key: number) => {
    dispatch(handleRemove(key));
  };
  // sự kiện xóa
  const ChangdleRemove = (
    event: KeyboardEvent<HTMLInputElement>,
    key: number
  ) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      OTPref.current[key - 1].focus();
    }
  };
  //  lấy value input  otp
  const ChangeOTP = ({ key, value }: OTP) => {
    if (key < 6) {
      if (!value) {
        let newOTP = [...OTP];
        newOTP[key] = -1;
        setOTP(newOTP);
        OTPref.current[key].focus();
      } else {
        const codeOTP = Number(value);
        if (!codeOTP) {
          if (codeOTP == 0) {
            let newOTP = [...OTP];
            newOTP[key] = 0;
            setOTP(newOTP);
            OTPref.current[key + 1].focus();
          } else {
            let newOTP = [...OTP];
            newOTP[key] = -1;
            setOTP(newOTP);
            OTPref.current[key].focus();
          }
        } else {
          if (key == 5) {
            OTPref.current[5].blur();
          }
          let newOTP = [...OTP];
          newOTP[key] = codeOTP;
          setOTP(newOTP);
          OTPref.current[key + 1].focus();
        }
      }
    }
  };
  // check validation OTP
  const validateOTP = () => {
    let status = false;
    for (let i = 0; i < OTP.length; i++) {
      if (Number(OTP[0]) < 0) {
        OTPref.current[0].focus();
        status = false;
        break;
      } else if (Number(OTP[1]) < 0) {
        OTPref.current[1].focus();
        status = false;
        break;
      } else if (Number(OTP[2]) < 0) {
        console.log("lỗi ở đây 2 ", OTP);

        OTPref.current[2].focus();
        status = false;
        break;
      } else if (Number(OTP[3]) < 0) {
        OTPref.current[3].focus();
        status = false;
        break;
      } else if (Number(OTP[4]) < 0) {
        OTPref.current[4].focus();
        status = false;
        break;
      } else if (Number(OTP[5]) < 0) {
        OTPref.current[5].focus();
        status = false;
        break;
      } else {
        status = true;
        break;
      }
    }
    return status;
  };

  //  change input table
  const HandleChangeInputValue = (data: any) => {
    const { value, key, code } = data;
    if (!value) {
      // baso do
      // dk value > 0
      dispatch(handleChanginputVale(data));
    } else {
      const result = Number(value);
      if (!result) {
        if (value === 0) {
          dispatch(handleChanginputVale(data));
        }
        // nhap text
        console.log("vui long khong nhap chữ ");
      } else {
        dispatch(handleChanginputVale(data));
        if (code == "quantity") {
          const remainder = value % 100;
          if (remainder != 0) {
            console.log("Không phải bội của 100");
          }
        }
      }
    }
  };
  const validateInputValuetable = () => {
    // dataOrderlenh
    let result = false;
    for (var i = 0; i <= dataOrderlenh.length; i++) {
      if (i < dataOrderlenh.length) {
        const remainder = dataOrderlenh[i].quanytity % 100;
        if (remainder != 0 || dataOrderlenh[i].quanytity <= 0) {
          result = false;
          valueInputRef.current[Number(`${i}0`)].focus();
          valueInputRef.current[Number(`${i}0`)].classList.add("errorMesage");
          break;
        } else {
          valueInputRef.current[Number(`${i}0`)].classList.remove(
            "errorMesage"
          );
        }

        if (dataOrderlenh[i].priceGN <= 0) {
          console.log("Giá kích hoạt không  được nhỏ hơn 0");
          valueInputRef.current[Number(`${i}1`)].focus();
          valueInputRef.current[Number(`${i}1`)].classList.add("errorMesage");
          result = false;
          break;
        } else {
          valueInputRef.current[Number(`${i}1`)].classList.remove(
            "errorMesage"
          );
        }

        if (dataOrderlenh[i].LenhTh == "DAY") {
          if (dataOrderlenh[i].priceLenhTh <= 0) {
            console.log("Giá không được nhỏ hơn 0");

            valueInputRef.current[Number(`${i}2`)].focus();
            valueInputRef.current[Number(`${i}2`)].classList.add("errorMesage");
            result = false;
            break;
          } else {
            valueInputRef.current[Number(`${i}2`)].classList.remove(
              "errorMesage"
            );
          }
        }
      } else {
        console.log("pass submit");
        result = true;
        break;
      }
    }
    return result;
  };
  // submit alll
  const Submit = () => {
    // check otp
    let status = validateOTP();
    if (status) {
      console.log("pass qua");
      // validate input table
      let result = validateInputValuetable();
      if (result) {
        console.log("pass qua bước 2");
      } else {
        console.log("lỗi 2");
      }
    } else {
      console.log("lỗi 1");
    }
  };
  return (
    <>
      <div className="boxdivCondi ConditionalOrder_table">
        <table className="">
          <thead>
            <tr className="RHeader">
              <th>Mua/Bán</th>
              <th>Ký quỹ</th>
              <th>Mã HĐ</th>
              <th>Mã CK</th>
              <th>Số lượng</th>
              <th>ĐK kích hoạt</th>
              <th>
                Giá kích hoạt <span style={{ fontSize: "0.8em" }}>(x1000)</span>
              </th>
              <th style={{ display: "none" }}>Loại lệnh</th>
              <th>
                Giá <span style={{ fontSize: "0.8em" }}>(x1000)</span>
              </th>
              <th style={{ display: "none" }}>Sàn</th>
              <th>Trạng thái</th>
              <th>Hủy</th>
            </tr>
          </thead>
          <tbody>
            {dataOrderlenh.length > 0
              ? dataOrderlenh?.map((item: dataOrderlenh, key: number) => {
                  const priceTh =
                    item.LenhTh == "CEILING"
                      ? "Giá trần"
                      : item.LenhTh == "FLOOR"
                      ? "Giá sàn "
                      : item.LenhTh == "MARKET"
                      ? "Giá TT"
                      : item.LenhTh == "MTL"
                      ? "MTL"
                      : item.LenhTh == "MOK"
                      ? "MOK"
                      : item.LenhTh == "MAK"
                      ? "MAK"
                      : item.LenhTh == "ATC"
                      ? "ATC"
                      : "PLO";
                  return (
                    <tr
                      key={key}
                      className={item?.Loai === "BUY" ? "" : "colorB"}
                    >
                      <td>{item?.Loai === "BUY" ? "Mua" : "Bán"}</td>
                      <td>Không </td>
                      <td className="actionHD"></td>
                      <td className="">{item.stockCode}</td>
                      <td className="actionInput">
                        <div className="ActionCouter">
                          <input
                            style={{
                              border:
                                item?.quanytity <= 0 ? "1px solid red" : "",
                            }}
                            type="text"
                            defaultValue={item?.quanytity}
                            value={item?.quanytity}
                            ref={(el) =>
                              (valueInputRef.current[Number(`${key}0`)] = el)
                            }
                            onChange={(e) =>
                              HandleChangeInputValue({
                                value: e.target.value,
                                key: key,
                                code: "quantity",
                              })
                            }
                          />
                          <button
                            type="button"
                            id="btnUpQ"
                            className="up button-spinner"
                            onClick={() =>
                              incrementCounter({ key: key, value: "quantity" })
                            }
                          >
                            ›
                          </button>
                          <button
                            disabled={item?.quanytity == 0 ? true : false}
                            type="button"
                            id="btnDownQ"
                            className={`down button-spinner ${
                              item?.quanytity == 0 ? "btnActive" : ""
                            }`}
                            onClick={() =>
                              dicrementCouter({ key: key, value: "quantity" })
                            }
                          >
                            ‹
                          </button>
                        </div>
                      </td>
                      <td>{item.dkgn}</td>
                      <td className="priceKH actionInput">
                        <div className="ActionCouter">
                          <input
                            style={{
                              border: item?.priceGN <= 0 ? "1px solid red" : "",
                            }}
                            type="text"
                            value={item?.priceGN / 1000}
                            ref={(el) =>
                              (valueInputRef.current[Number(`${key}1`)] = el)
                            }
                            onChange={(e) =>
                              HandleChangeInputValue({
                                value: e.target.value,
                                key: key,
                                code: "priceGN",
                              })
                            }
                          />
                          <button
                            type="button"
                            id="btnUpQ"
                            className="up button-spinner"
                            onClick={() =>
                              incrementCounter({ key: key, value: "priceGN" })
                            }
                          >
                            ›
                          </button>
                          <button
                            disabled={item?.priceGN == 0 ? true : false}
                            type="button"
                            id="btnDownQ"
                            className={`down button-spinner ${
                              item?.priceGN == 0 ? "btnActive" : ""
                            }`}
                            onClick={() =>
                              dicrementCouter({ key: key, value: "priceGN" })
                            }
                          >
                            ‹
                          </button>
                        </div>
                      </td>
                      <td className="actionInput">
                        {item.LenhTh == "DAY" ? (
                          <div className="ActionCouter">
                            <input
                              ref={(el) =>
                                (valueInputRef.current[Number(`${key}2`)] = el)
                              }
                              style={{
                                border:
                                  item?.priceLenhTh <= 0 ? "1px solid red" : "",
                              }}
                              type="text"
                              value={
                                Math.floor((item?.priceLenhTh / 1000) * 100) /
                                100
                              }
                              onChange={(e) =>
                                HandleChangeInputValue({
                                  value: e.target.value,
                                  key: key,
                                  code: "priceLenhTh",
                                })
                              }
                            />
                            <button
                              type="button"
                              id="btnUpQ"
                              className="up button-spinner"
                              onClick={() =>
                                incrementCounter({
                                  key: key,
                                  value: "priceLenhTh",
                                })
                              }
                            >
                              ›
                            </button>
                            <button
                              disabled={item?.priceLenhTh == 0 ? true : false}
                              type="button"
                              id="btnDownQ"
                              className={`down button-spinner ${
                                item?.priceLenhTh == 0 ? "btnActive" : ""
                              }`}
                              onClick={() =>
                                dicrementCouter({
                                  key: key,
                                  value: "priceLenhTh",
                                })
                              }
                            >
                              ‹
                            </button>
                          </div>
                        ) : (
                          <button disabled className="btn-lenhTh">
                            {priceTh}
                          </button>
                        )}
                      </td>
                      <td> </td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => RemoveProduct(key)}
                        >
                          <i className="fa fa-times fa-trash-o"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      <div className="boxdivCondi borderDiv">
        {dataOrderlenh.length > 0 ? 
        <div className="from_sumit_condi">
          <div className="contenttail">
            <p>
              {" "}
              FPTS áp dụng xác thực OTP để đảm bảo an toàn đặt lệnh trong phiên
              giao dịch của quý khách. Mã OTP sẽ được gửi đến số điện thoại
              <span className="nameAcout"> 038****404</span>
            </p>
            <p>
              Trường hợp quý khách không còn dùng số điện thoại này, vui lòng
              thực hiện thay đổi thông tin <a href=""> tại đây</a> hoặc{" "}
              <a href=""> Liên hệ FPTS</a> để được hỗ trợ.
            </p>
          </div>
          <br />
          <div className="otp">
            {OTP.map((item: any, key: number) => {
              return (
                <input
                  key={key}
                  maxLength={1}
                  ref={(el) => (OTPref.current[key] = el)}
                  type="text"
                  onKeyUp={(e) => ChangdleRemove(e, key)}
                  onChange={(e) =>
                    ChangeOTP({ key: key, value: e.target.value })
                  }
                  value={item < 0 ? "" : item}
                />
              );
            })}
          </div>
          <div>
            <button className="btn " id="btn-cn" onClick={Submit}>
              Xác Nhận
            </button>
          </div>
        </div>
        : ""}
      </div>
    </>
  );
};
export default ConditionalOrderTable;
