import AuthenCationScreen from "../components/Authencation/AuthenScreen";
import "./layoutStyle.scss"
import HoaKy from "./../images/icon-EN.png"
const LayoutAthentication = () => {
  return (
    <>
      <section className="container fts-heaer">
        <div className="headerAuth">
          <div className="fts-left" >
            <span> HOTLINE: </span> <a href=""> 1900 6446</a>
          </div>
          <div className="fts-Rigth">
              <a className="fpts-language" href="">   <img src={HoaKy} alt="" /></a>
          </div>
        </div>
      </section>
      <section className="mainAu">
      {/* <iframe src="http://accounts3.fpts.com.vn/Login?href=eztransfer" title="Login Iframe" /> */}
        <AuthenCationScreen />
      </section>
      <section>
        <div className="footer  ">© 2018 Công ty Cổ phần Chứng khoán FPT</div>
      </section>
    </>
  );
};
export default LayoutAthentication;
