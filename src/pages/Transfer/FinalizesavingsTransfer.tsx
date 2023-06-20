
import LayoutPage from "../Layout/LayoutPage";
import "./helper/style.scss";
const FinalizesavingsTransfer = () => {
  return (
    <> 
    <LayoutPage   PageTitle="Tất toán tiền cho vay"> 
  
        <div className="message">
          <p>Xin lỗi, Quý khách chưa đăng ký dịch vụ này!</p>
          <p>
            {" "}
            Quý khách vui lòng đăng ký dịch vụ Eztransfer theo hướng dẫn  &nbsp;
            <a
              target="_blank"
              href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/thay-doi-thong-tin-khach-hang/thay-doi-thong-tin-truc-tuyen/dang-ky-chuyen-tien/"
            >
              {" "}
              tại đây
            </a>
            .
          </p>
        </div>
         

      </LayoutPage>
      </>
  );
};
export default FinalizesavingsTransfer;
