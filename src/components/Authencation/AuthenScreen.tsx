import "./authenStyle.scss";
import LogoNg from "./../../images/logo_ngang.png";
import AvatarLogin from "./../../images/avatar_ano.png";
import LogoApple from "./../../images/logo-appstore.png";
import LogoGoglePlay from "./../../images/icon-googleplay.png";
import Address from "./../../images/icon-local.png";
import PhoneVolum from "./../../images/icon-phonef_03.png";
import EmailIcon from "./../../images/icon-mail.png";
import { useState } from "react";
import agent from "../../api/agent";
import { setCookieToken } from "../../api/authen";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { LoginUser, getToken } from "./AuthencationSlice";
import { useAppDispatch } from "../../store/configureStore";
import { useForm  ,SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type FormInputs = {
  LoginName: string  ;
  Password: string ;
};
type valueDate = {
  users :string,
  pass : string
}
type valueMessage = {
  masegeUser:number,
  masegePass:number
}

const AuthenCationScreen = () => {
  document.title ="Đăng Nhập "
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPass,setShowpass] = useState(false)
  const [message,setMessage] = useState<valueMessage>({masegeUser: 0,masegePass: 0})
  const [user,Setuser] = useState<valueDate> ({users : "058C", pass: ""})
  const schema = yup.object().shape({
    LoginName: yup.string().required("vui lòng nhập tài khoản "),
    Password: yup.string().required("Vui lòng nhập mật khẩu "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors  },
  } = useForm<FormInputs> ({
    resolver: yupResolver(schema),
  });
  const onSubmit : SubmitHandler<FormInputs> =(data)=>{
    setMessage({masegeUser:0, masegePass:0})
    let newData = new FormData()
    newData.append("LoginName" , data.LoginName)
    newData.append("Password" , data.Password)
    console.log("data", data)
    dispatch(LoginUser(newData))
  }
  const Login = async (e: any) => {

    const tokenAbc =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbiI6IjA1ZTcxMzE0LTczNjMtNDM1My1iODdlLTUwZTIxNzg2ZTUxNCIsIlNlZXNpb24iOiJQWkErVndMbklJUkNRNExxV2VtUm5nPT0iLCJuYmYiOjE2ODg2OTYzNjcsImV4cCI6MTY4ODk1NTU2NywiaWF0IjoxNjg4Njk2MzY3LCJpc3MiOiJFekFjY291bnQifQ._708VlJC_NB4G1Hr7NO6Q9k4NcmCbYVXj_W2yiqTpyU";
    const token = setCookieToken(tokenAbc);
    if (token === true) {
      dispatch(getToken());
      return navigate("/");
    } else {
      return navigate("/login");
    }
  };
  return (
    <>
      <button onClick={(e)=>Login(e)}> Click </button>
      <div className="logo_ng">
        <img src={LogoNg} alt="" />
      </div>
      <div className="fpts-menu">
        <ul>
          <li>
            <a
              className="fpts-menu-item fpts-eztrade"
              href="?href=eztrade&s=70"
            >
              EzTrade - giao dịch chứng khoán cơ sở{" "}
            </a>
          </li>
          <li>
            <a
              className="fpts-menu-item fpts-ezfutures"
              href="?href=ezfutures&s=70"
            >
              EzFutures - giao dịch chứng khoán phái sinh{" "}
            </a>
          </li>
          <li>
            <a
              className="fpts-menu-item fpts-eztransfer"
              href="?href=eztransfer&s=70"
            >
              EzTransfer - Chuyển tiền trực tuyến{" "}
            </a>
          </li>
          <li>
            <a
              className="fpts-menu-item fpts-liveprice"
              href="?href=liveprice&s=70"
            >
              LivePrice - Bảng giá chứng khoán
            </a>
          </li>
        </ul>
      </div>
      <div className="Form ">
        <div className="center table-bordered nav-login text-center fpts-login">
          <div>
            <img src={AvatarLogin} className="img-circle" />
          </div>
          <div className="">
            <form
              autoComplete="off"
              id="frmLogin"
              onSubmit={handleSubmit(onSubmit)}
              // onSubmit={(e)=> Login(e)}
            >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.users}
                  placeholder="Số tài khoản (VD 058C123456)"
                  autoComplete="off"
                  {...register("LoginName" , {
                    onChange :(e)=> { Setuser({...user ,users: e.target.value})}
                  })}
                />
                {message?.masegeUser == 2 ? <p className="errorMessage">Tài khoản không chính xác ! </p>  : ""} 
                <div className="txtPassword">
                  <input
                    type={showPass ? "text" :"password"}
                    className="form-control"
                    defaultValue=""
                    placeholder="Mật khẩu"
                    autoComplete="off"
                    {...register("Password",{
                      onChange :(e)=> {
                         setMessage({...message,masegePass : 0})
                         Setuser({...user,pass: e.target.value})
                    }
                    })}
                  />

                  {!showPass ? <i className="fa fa-eye-slash"  onClick={()=>setShowpass(!showPass)} /> :
                  <i className="fa fa-eye"   onClick={()=>setShowpass(!showPass)}/> }
                </div>
                { message?.masegePass == 2 ?  <p  className="errorMessage">Mật khẩu không chính xác </p> : "" } 
                <button
                    disabled={user.users === "" || user.pass === "" ?  true : false}
                  type="submit"
                  className= {user.users === "" || user.pass === "" ? "btn btn-primary btn-block fpts-btn-login idDisable"  : "btn btn-primary btn-block fpts-btn-login" }
                  id= "btnSubmit"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
          <div className="fpts-support">
            <a href="/forgotpassword" target="_blank">
              Quên mật khẩu
            </a>
            &nbsp;|&nbsp;
            <a target="_blank" href="/help">
              Trợ giúp
            </a>
          </div>
          <div className="introEzOpen">
            <span className="fpts-introEzOpen">
              Quý khách chưa có tài khoản?{" "}
              <a href="http://ezopen.fpts.com.vn" target="_blank">
                {" "}
                Mở tài khoản
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="DownLoadApp fpts-support-mobile">
        <p>TẢI VÀ CÀI ĐẶT ỨNG DỤNG TRÊN MOBILE</p>
        <div className="fpts-images">
          <a
            target="_blank"
            href="https://apps.apple.com/us/app/ezmobiletrading/id1441633170?l=vi&ls=1"
          >
            <img src={LogoApple} />
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.fpts.ezmobilev2"
          >
            <img src={LogoGoglePlay} />
          </a>
        </div>
      </div>
      <div className="fpts-caption">
        <ul>
          <li>
            <a
              href="http://www.fpts.com.vn/FileStore/File/2013/07/31/BAN%20CONG%20BO%20RUI%20RO%20-%20FPTS%2001%208%202013.pdf"
              target="_blank"
            >
              CÔNG BỐ RỦI RO
            </a>
          </li>
          <li>
            <a
              href="http://www.fpts.com.vn/media/1574/dieu-khoan-su-dung-website-fptsfile.pdf"
              target="_blank"
            >
              ĐIỀU KHOẢN SỬ DỤNG
            </a>
          </li>
          <li>
            <a href="https://accounts.fpts.com.vn/help?s=14">
              CÂU HỎI THƯỜNG GẶP
            </a>
          </li>
        </ul>
      </div>
      <div className="fpts-footer">
        <div className="adresCty">
          <div className="">
            <p className="fpts-title">Trụ sở Hà Nội</p>
            <div>
              <ul>
                <li>
                  {" "}
                  <img src={Address} alt="" />{" "}
                  <span>
                    Số 52 Đường Lạc Long Quân, Phường Bưởi, Quận Tây Hồ, TP.Hà
                    Nội
                  </span>
                </li>
                <li>
                  <img src={PhoneVolum} alt="" /> <span> 1900 4466</span>
                </li>

                <li>
                  {" "}
                  <img src={EmailIcon} alt="" />{" "}
                  <span> fptsecurities@fpts.com.vn</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <p className="fpts-title">Chi nhánh Tp.Hồ Chí Minh</p>
            <div>
              <ul>
                <li>
                  {" "}
                  <img src={Address} alt="" />{" "}
                  <span>
                    S136-138 Lê Thị Hồng Gấm, Phường Nguyễn Thái Bình, Quận 1,
                    TP.Hồ Chí Minh
                  </span>
                </li>
                <li>
                  <img src={PhoneVolum} alt="" /> <span> 1900 4466</span>
                </li>

                <li>
                  {" "}
                  <img src={EmailIcon} alt="" />{" "}
                  <span> fptsecurities@fpts.com.vn</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <p className="fpts-title">Chi nhánh Đà Nẵng</p>
            <div>
              <ul>
                <li>
                  {" "}
                  <img src={Address} alt="" />{" "}
                  <span>
                    Số 100 Quang Trung, phường Thạch Thang, quận Hải Châu, TP.Đà
                    Nẵng
                  </span>
                </li>
                <li>
                  <img src={PhoneVolum} alt="" /> <span> 1900 4466</span>
                </li>

                <li>
                  {" "}
                  <img src={EmailIcon} alt="" />{" "}
                  <span> fptsecurities@fpts.com.vn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthenCationScreen;
