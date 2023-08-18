import {
  Box,
  Button,
  Link,
  Typography,
  Avatar,
  CircularProgress,
  Modal,
  Alert,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import imageCloseRed from "../../images/EzFuture-05.png";
import imageClose from "../../images/EzFuture-09.png";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import green from "@mui/material/colors/green";
import OtpInput from "react-otp-input";
import {
  SendOrder,
  SendOrder_Margin,
  SendOrder_Marpro,
  getOTP,
  setsttOrderForm,
} from "./SendOrderSlice";
import { hidePhoneNumber } from "./util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var arrErrorOTP = [-123456, 181104, 181105, 181106, 181107, 181109, 181110];
const TableConfirmOrder = () => {
  const { t } = useTranslation(["home"]);
  const dispatch = useAppDispatch();
  // get phone number
  const Phone = useAppSelector((state) => state.ProfileAccount.SMS);
  // get sử dụng phone hay number 2 = phone  3 =email
  const Atransaction = useAppSelector(
    (state) => state.ProfileAccount.Atransaction
  );
  // get email
  const Email = useAppSelector((state) => state.ProfileAccount.Email);
  // get trạng thái tk (margin,marginpro,...)
  const sttAccount = useAppSelector(
    (state) => state.ProfileAccount.statusAccount
  );
  const OTP = useAppSelector((state) => state.SendOrder.OTP);
  console.log(OTP);
  // data từ gửi lệnh
  const msg = useAppSelector((state) => state.SendOrder.Response);
  if (arrErrorOTP.includes(msg.Code)) {
    if (msg.Code === -123456 || msg.Code === 181106) {
      if (msg.Code === 181106) {
        dispatch(setsttOrderForm(false));
        toast.error(
          " Tài khoản bị khóa OTP. Vui lòng liên hệ hotline 19006446 (ấn phím 1) để được hỗ trợ.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />;

        //return;
      } else {
        alert(msg.Message);
      }
    } else {
      //debugger;

      if (msg.Code === 181104) {
        alert(
          "Quý khách đã nhập sai OTP quá 5 lần. Vui lòng thực hiện gửi lại mã OTP"
        );
      }
      if (msg.Code === 181105) {
        alert("Mã OTP không đúng, Quý khách vui lòng nhập lại mã OTP");
      }
    }
    if (msg.Code === 181109) {
      //
    } else {
    }
  }

  const [countdownValue, setCountdownValue] = useState("");
  const [showResend, setShowResend] = useState(false);
  useEffect(() => {
    if (msg && msg.Data && msg?.Data.TimeExpire && msg?.Data.TimeServer) {
      const dateTime_Server = new Date(msg.Data.TimeServer.replace("T", " "));
      const dateTime_Expire = new Date(msg.Data.TimeExpire.replace("T", " "));

      const timer_Expire = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff_Expire = Math.floor(
          (dateTime_Expire.getTime() - currentTime) / 1000
        ); // Chênh lệch thời gian tính bằng giây

        if (timeDiff_Expire > 0) {
          const mins = Math.floor(timeDiff_Expire / 60);
          const secs = timeDiff_Expire % 60;
          const pretty = `${(mins < 10 ? "0" : "") + mins}:${
            (secs < 10 ? "0" : "") + secs
          }`;
          setCountdownValue(pretty); // Cập nhật giá trị đến thẻ span
          if (timeDiff_Expire <= 160) {
            setShowResend(true);
          } else {
            setShowResend(false);
          }
        } else {
          clearInterval(timer_Expire);
          // Time expired
          // Dispatch action or handle logic when time expires
          dispatch(setsttOrderForm(false));
        }
      }, 1000);

      return () => {
        clearInterval(timer_Expire);
      };
    }
  }, [msg, dispatch]);
  const handleResend = async () => {
    dispatch(getOTP());
    // Call your API for resending OTP here
    // Example assuming the API call returns a new 'msg' object
    if (OTP && OTP.Data && OTP?.Data.TimeExpire && OTP?.Data.TimeServer) {
      const dateTime_Server = new Date(OTP.Data.TimeServer.replace("T", " "));
      const dateTime_Expire = new Date(OTP.Data.TimeExpire.replace("T", " "));
      const timer_Expire = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff_Expire = Math.floor(
          (dateTime_Expire.getTime() - currentTime) / 1000
        ); // Chênh lệch thời gian tính bằng giây

        if (timeDiff_Expire > 0) {
          const mins = Math.floor(timeDiff_Expire / 60);
          const secs = timeDiff_Expire % 60;
          const pretty = `${(mins < 10 ? "0" : "") + mins}:${
            (secs < 10 ? "0" : "") + secs
          }`;
          setCountdownValue(pretty); // Cập nhật giá trị đến thẻ span
          if (timeDiff_Expire <= 160) {
            setShowResend(true);
          } else {
            setShowResend(false);
          }
        } else {
          clearInterval(timer_Expire);
          // Time expired
          // Dispatch action or handle logic when time expires
          dispatch(setsttOrderForm(false));
        }
      }, 1000);

      return () => {
        clearInterval(timer_Expire);
      };
      // Similar to the existing countdown logic, you can set up a new timer for the new 'msg'
      // ...

      // You can also reset 'showResend' state if needed
      // setShowResend(false);
    }
  };

  // otp
  const [otp, setOtp] = useState("");
  const [statusPopup, setStatusPopup] = useState(true);
  // const timer = useRef<number>();
  const CFOM = {
    Password2: "",
    UniqueRandomString: "20230817-151403126-058C222210",
    OrderInfo: [
      {
        ClientRowID: "20230817-151351547-058C222210",
        Exchange: "HNX.NY",
        StockCode: "AAV",
        Quantity: 100,
        Price: 5600,
        PriceType: "LO",
        BuySell: "BUY",
        TLV: "0",
        MarginContractNo: "",
        Type: "MARPRO",
        Rate: 0,
        VerRequest: "W-058C222210-1692285231546",
      },
    ],
  };
  const handleButtonClick = () => {
    sttAccount === 3
      ? dispatch(SendOrder_Marpro(CFOM))
      : sttAccount === 3
      ? dispatch(SendOrder_Margin())
      : dispatch(SendOrder());
  };
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const buttonSx = {
    ...(success && {
      bgcolor: "#0fb44b",
      border: "1px solid #92ddad",
      color: "#fff",
      borderRadius: 30,
      padding: "3px 22px",
      textTransform: "uppercase",
      "&:hover": {
        bgcolor: "#04a940",
      },
    }),
  };
  // const dispatch =useAppDispatch();

  return (
    <Modal open={statusPopup} onClose={() => dispatch(setsttOrderForm(false))}>
      <Box
        sx={{
          minWidth: 550,
          height: 260,
          maxWidth: 705,
          minHeight: 370,
          top: "75%",
          left: "50%",
          position: "absolute",
          borderRadius: "6px",
          bgcolor: "#fff",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#034e94",
            color: "#fff",
            fontSize: 15,
            padding: "7px 5px",
            textAlign: "center",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <Typography>XÁC THỰC OTP</Typography>
          <Avatar
            sx={{
              position: "absolute",
              top: -14,
              left: "98%",
              width: 26,
              height: 26,
              cursor: "pointer",
            }}
            src={imageClose}
            onClick={() => dispatch(setsttOrderForm(false))}
          ></Avatar>
        </Box>
        <Box padding="15px 25px 10px">
          <Box
            sx={{
              minWidth: 550,
              border: "none",
              height: 260,
              maxWidth: 650,
              boxShadow: "0px 5px 20px 0px #d2dae3",
              minHeight: 305,
            }}
          >
            <Box padding="6.5px">
              <Box>
                <table className="border border-[#dedede]">
                  <thead>
                    <tr className=" bg-[#EEEEEE] border border-[#dedede]">
                      <th className="text-center  font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                        Lệnh đặt
                        {/* {t("home:Order.ORDER_BAN")} */}
                      </th>
                      <th className="text-center font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                        {t("home:Order.ORDER_MCK")}
                      </th>
                      <th className="text-center font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                        {t("home:Order.OPTIONS_KL")}
                      </th>
                      <th className="text-center font-extralight !text-[#000000] w-[110px] text-sm border-r border border-[#dedede]">
                        {t("home:base.Gia")}
                      </th>
                      <th className="text-center font-extralight !text-[#000000] w-[240px] text-sm border-r border border-[#dedede]">
                        {t("home:base.ThongBao")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-[#dedede]">
                      <td className="text-center border-r border border-[#dedede]">
                        {t("home:Order.ORDER_MUA")}
                      </td>
                      <td className="text-center border-r border border-[#dedede]">
                        AAV
                      </td>
                      <td className="text-center border-r border border-[#dedede]">
                        100
                      </td>
                      <td className="text-center border-r border border-[#dedede]">
                        5.6
                      </td>
                      <td>oke</td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Box paddingTop="12px" textAlign="center">
                <Typography fontSize="13px">
                  Để đảm bảo an toàn, FPTS áp dụng việc xác thực OTP để thay thế
                  cho mật khẩu giao dịch khi đặt lệnh. Mã OTP sẽ được gửi đến số
                  điện thoại{" "}
                  <Typography component="span" color="#3773aa">
                    {Atransaction === 2
                      ? hidePhoneNumber(Phone)
                      : Atransaction === 3
                      ? Email
                      : ""}
                  </Typography>
                  .
                </Typography>
                <Typography fontSize="13px">
                  Trường hợp quý khách muốn thay đổi phương thức nhận OTP, vui
                  lòng thực hiện thay đổi thông tin
                  <Link href="http://accounts3.fpts.com.vn">
                    {" "}
                    tại đây
                  </Link> hoặc{" "}
                  <Link href="https://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/lien-he/tru-so-chinh/">
                    Liên hệ FPTS{" "}
                  </Link>
                  <Typography component="span">để được hỗ trợ</Typography>
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box className="divConfirmOtp" paddingTop="4px">
                <Box
                  className="otp-popup-countdown"
                  sx={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
                >
                  <span>{countdownValue}</span>
                </Box>
                <Box className="inputs d-flex flex-row pt-2.5 justify-content-center opt-popup-input">
                  <div className="otp">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      inputStyle="inputStyle"
                      numInputs={6}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                </Box>
                <Box paddingTop="8px" textAlign="center">
                  <Button
                    sx={{ display: "none" }}
                    variant="contained"
                    className="btn px-4 validate otp-popup-otpSubmit hidden"
                    data-view="OF"
                  >
                    Xác nhận
                  </Button>
                  <div className="divSendOTP" style={{ display: "block" }}>
                    <Button
                      variant="contained"
                      onClick={handleButtonClick}
                      sx={buttonSx}
                      disabled={loading}
                    >
                      {success ? "Thanh cong" : "Gửi lệnh "}
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                    <Button
                      variant="text"
                      tabIndex={5}
                      onClick={() => dispatch(setsttOrderForm(false))}
                    >
                      <Avatar
                        src={imageCloseRed}
                        style={{
                          marginLeft: 10,
                          height: 18,
                          width: 18,
                          position: "initial",
                        }}
                      />
                      <Typography
                        paddingLeft="10px"
                        fontSize="14px"
                        textTransform="none"
                      >
                        Đóng lại
                      </Typography>
                    </Button>
                  </div>
                  <Button
                    variant="text"
                    sx={{
                      position: "absolute",
                      left: "80%",
                      top: 315,
                      color: "#337ab7",
                      fontSize: "13px",
                      display: showResend ? "" : "none",
                      textTransform: "none",
                    }}
                    onClick={() => handleResend()}
                  >
                    Gửi lại mã OTP
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(TableConfirmOrder);
//const [otpValues, setOtpValues] = useState<string[]>(
//     Array.from({ length: 6 }, () => "")
//   );
//   const inputRefs = Array.from({ length: 6 }, () =>
//     React.createRef<HTMLInputElement>()
//   );
//   const OTPref = useRef<any[]>([]);
//   const valueInputRef = useRef<any[]>([]);
//   const handleInputChange = (
//     index: number,
//     event: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     console.log(event.target);
//     const input = event.target as HTMLInputElement;
//     const value = input.value;

//     if (value.length === 1) {
//       if (index < otpValues.length - 1) {
//         inputRefs[index + 1].current?.focus(); // Chuyển tới input kế tiếp
//       }
//     }

//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);
//   };

//   //   function handleChange(OTP:string) {
//   //     setOtp(OTP);
//   //   }
//   console.log(otp);
/* {otpValues.map((value, index) => (
                  <input
                  key={index}
                  ref={inputRefs[index]}
                  className="m-2 text-center form-control rounded otp-field"
                  type="text"
                  maxLength={1}
                  name="otp-field[]"
                  autoComplete="off"
                  value={value}
                  onKeyUp={(event) => handleInputChange(index, event)}
                  />
                ))} */
//   if (msg && msg.Data && msg?.Data.TimeExpire && msg?.Data.TimeReSend && msg?.Data.TimeServer) {
//     // Exprire
//     var timeString_Exprire = msg.Data.TimeExpire.replace("T", " ");
//     var arrTime_Exprire = timeString_Exprire.split(" ");
//     var arrTime1_Exprire = arrTime_Exprire[1].split(":");
//     var arrTime2_Exprire = arrTime1_Exprire[0] + ":" + arrTime1_Exprire[1] + ":" + arrTime1_Exprire[2].substring(0, 2);
//     var timeString_Exprire = arrTime_Exprire[0] + " " + arrTime2_Exprire;
//     var dateTime_Exprire = new Date(timeString_Exprire);

//     // Resend
//     var timeString_Resend = msg.Data.TimeReSend.replace("T", " ");
//     var arrTime_Resend = timeString_Resend.split(" ");
//     var arrTime1_Resend = arrTime_Resend[1].split(":");
//     var arrTime2_Resend = arrTime1_Resend[0] + ":" + arrTime1_Resend[1] + ":" + arrTime1_Resend[2].substring(0, 2);
//     var timeString_Resend = arrTime_Resend[0] + " " + arrTime2_Resend;
//     const dateTime_Resend = new Date(timeString_Resend);

//     // Server
//     var timeString_Server = msg.Data.TimeServer.replace("T", " ");
//     var arrTime_Server = timeString_Server.split(" ");
//     var arrTime1_Server = arrTime_Server[1].split(":");
//     var arrTime2_Server = arrTime1_Server[0] + ":" + arrTime1_Server[1] + ":" + arrTime1_Server[2].substring(0, 2);
//     timeString_Server = arrTime_Server[0] + " " + arrTime2_Server;
//     const dateTime_Server = new Date(timeString_Server);

//     // diff
//     const timeDiff_Exprire = (dateTime_Exprire.getTime() - dateTime_Server.getTime()) / 1000; // Chênh lệch thời gian tính bằng giây
//     const timeDiff_Resend = (dateTime_Resend.getTime() - dateTime_Server.getTime()) / 1000; // Chênh lệch thời gian tính bằng giây

//     console.log(timeString_Exprire, timeString_Server, timeDiff_Exprire);

//     startTimer(timeDiff_Exprire, timeDiff_Resend > 0 ? timeDiff_Resend : null);

//   }

//   function startTimer(exprire:any, resend:any) {
//     var timer_Exprire_otp:any =true;
//     var timer_Resend_otp:any;
//     if (exprire) {
//        var  timeInSecs_Exprire_otp = exprire;

//         //var mins = Math.floor(secs / 60);
//         //let lSecs = secs % 60;
//         //var pretty = ((mins < 10) ? "0" : "") + mins + ":" + ((lSecs < 10) ? "0" : "") + lSecs;
//         //$(".countdownOF").text(pretty);
//         if (timer_Exprire_otp) {
//             clearInterval(timer_Exprire_otp);
//         }
//         timer_Exprire_otp = setInterval(function () {
//             var secs = timeInSecs_Exprire_otp;
//             if (secs > 0) {
//                 timeInSecs_Exprire_otp--;
//             }
//             else {
//                 clearInterval(timer_Exprire_otp);
//                 // time expire
//                 const countdownElement = document.querySelector(".otp-popup-countdown") as HTMLElement;
//                 countdownElement.innerHTML = timer_Exprire_otp;
//                 return;
//             }

//             var mins = Math.floor(secs / 60);
//             secs %= 60;
//             var pretty = ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;

//         }, 1000);
//     }

//     if (resend) {
//        var timeInSecs_Resend_otp = parseInt(resend);

//         if (timer_Resend_otp) {
//             clearInterval(timer_Resend_otp);
//         }
//         timer_Resend_otp = setInterval(function () {
//             var secs = timeInSecs_Resend_otp;
//             if (secs > 0) {
//                 timeInSecs_Resend_otp--;
//             }
//             else {
//                 clearInterval(timer_Resend_otp);
//                 // time expire

//             }
//         }, 1000);
//     } else {

//     }
// }
