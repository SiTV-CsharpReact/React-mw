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
    getOTP,
    setsttOrderForm,
  } from "./SendOrderSlice";
  import { hideEmail, hidePhoneNumber } from "./util/util";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { setsttFormOTP } from './SendOrderSlice';
  var arrErrorOTP = [-123456, 181104, 181105, 181106, 181107, 181109, 181110];


const FormGetOTP = () => {
    const dispatch = useAppDispatch();
    const sttFormOTP = useAppSelector((state) => state.SendOrder.formOTP);
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
  const [countdownValue, setCountdownValue] = useState("");
  const [showResend, setShowResend] = useState(false);
  // otp
  const [otp, setOtp] = useState("");
  const [sttInputotp, setSttInputOtp] = useState(false);
  const OTP = useAppSelector((state) => state.SendOrder.OTP);
  const sendGetOTP = ()=>{
    setSttInputOtp(true)
    dispatch(getOTP());
  }
  const msg = useAppSelector((state) => state.SendOrder.OTP);
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
  return (
    <Modal  open={sttFormOTP} onClose={() => dispatch(setsttFormOTP(false))}>
          <Box
        sx={{
          minWidth: 550,
        //   height: 220,
          maxWidth: 705,
          minHeight: 230,
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
            onClick={() => dispatch(setsttFormOTP(false))}
          ></Avatar>
        </Box>
        <Box padding="15px 25px 10px">
          <Box
            sx={{
              minWidth: 550,
              border: "none",
            //   height: 160,
              maxWidth: 650,
              boxShadow: "0px 5px 20px 0px #d2dae3",
              minHeight: 165,
            }}
          >
            <Box padding="6.5px">
        
              <Box paddingTop="12px" textAlign="center">
                <Typography fontSize="13px">
                  Để đảm bảo an toàn, FPTS áp dụng việc xác thực OTP để thay thế
                  cho mật khẩu giao dịch khi đặt lệnh. Mã OTP sẽ được gửi đến số
                  điện thoại{" "}
                  <Typography component="span" color="#3773aa">
                    {Atransaction === 2
                      ? hidePhoneNumber(Phone)
                      : Atransaction === 3
                      ? hideEmail(Email)
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

             {sttInputotp &&    <Box className="inputs d-flex flex-row pt-2.5 justify-content-center opt-popup-input">
                  <Box className="otp">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      inputStyle="inputStyle"
                      numInputs={6}
                      renderInput={(props) => <input {...props} />}
                    />
                  </Box>
                </Box>}   
          
                <Box textAlign="center">
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
                      onClick={()=>sendGetOTP()}
                    >
                       Nhận mã OTP
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
  )
}

export default FormGetOTP