import React from "react";
import { Link } from "react-router-dom";
import "./styleHeader.css";
import { useTranslation } from "react-i18next";
const ListMenu = () => {
  const { t } = useTranslation(["home"]);
  return (
    // <div className="pl-2.5 flex">
    //   <div className="group inline-block py-2 px-2 border-r border-borderListMenu ">
    //     <span className="uppercase size hover-text-blue "> Lịch sử GD </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50 boxShadow ">
    //       <li className="border-bottom-menu ">
    //         <Link className=" listmenu-item size-li " to="#">
    //           Lịch sử đặt lệnh
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item size-li " to="#">
    //           Lịch sử khớp lệnh
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="rounded-b listmenu-item size-li  " to="#">
    //           Lệnh chờ khớp thanh toán
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase size hover-text-blue"> GD tiền </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block z-50 ">
    //       <li className="border-bottom-menu">
    //         <Link className="listmenu-item size-li " to="#">
    //           Chuyển tiền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item size-li " to="#">
    //           Chuyển tiền ký quỹ CK phái sinh
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item size-li " to="#">
    //           GD tiền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item size-li " to="#">
    //           Lịch sử chuyển tiền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item size-li" to="#">
    //           Tiền cho vay - EzSaving
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item size-li " to="#">
    //           Tất toán tiền cho vay
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item size-li " to="#">
    //           Danh sách hợp đồng cho vay
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item size-li " to="#">
    //           Ứng trước tiền cổ tức
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="rounded-b listmenu-item size-li " to="#">
    //           Lịch sử ứng trước tiền cổ tức
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2 px-2 border-r border-borderListMenu">
    //     <span className="  uppercase  size  hover-text-blue"> GD đặc biệt</span>
    //     <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block z-50">
    //       <li>
    //         <Link className="rounded-t listmenu-item size-li " to="#">
    //           Lịch sử bán CK lô lẻ
    //         </Link>
    //       </li>
    //       <li className="border-bottom-menu">
    //         <Link className="listmenu-item size-li " to="#">
    //           Thực hiện quyền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item size-li  " to="#">
    //           Đặt lệnh điều kiện
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item size-li " to="#">
    //           Sổ lệnh điều kiện
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="rounded-b listmenu-item size-li " to="#">
    //           Lưu ký trực tuyến
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase size hover-text-blue"> Quản lý tk </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50 ">
    //       <li className="border-bottom-menu">
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Báo cáo tổng hợp số dư giao dịch
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/report-bcts" className="listmenu-item  size-li">
    //           Báo cáo tài sản
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Báo cáo biến động tài sản ròng
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Báo cáo lãi lỗ thực hiện
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item  size-li" to="#">
    //           Báo cáo tổng hợp giao dịch theo mã chứng khoán
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Số dư chứng khoán
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Số dư tiền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item  size-li" to="#">
    //           Sao kê chứng khoán
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Sao kê tiền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" listmenu-item  size-li" to="#">
    //           Tra cứu phí lưu ký
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item size-li" to="#">
    //           Tra cứu tình trạng chứng quyền
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" rounded-b listmenu-item  size-li" to="#">
    //           Tra cứu biểu phí
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase  size hover-text-blue">
    //       QUẢN LÝ KÝ QUỸ{" "}
    //     </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
    //       <li className="border-bottom-menu">
    //         <Link className="listmenu-item  size-li" to="#">
    //           Tra cứu lãi vay
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item  size-li" to="#">
    //           Tra cứu chi tiết tài khoản ký quỹ
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" rounded-b listmenu-item  size-li" to="#">
    //           Sao kê tiền vay ký quỹ
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase  size hover-text-blue">Tư vấn đầu tư</span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50"></ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2">
    //     <span className="  uppercase  size hover-text-blue">Hỗ trợ</span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
    //       <li className="border-bottom-menu ">
    //         <Link className="listmenu-item  size-li" to="#">
    //           Sản phẩm dịch vụ trực tuyến
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item  size-li" to="#">
    //           Hướng dẫn nhà đầu tư
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className="listmenu-item  size-li" to="#">
    //           Sản phẩm dịch vụ cho tổ chức
    //         </Link>
    //       </li>
    //       <li>
    //         <Link className=" rounded-b listmenu-item  size-li" to="#">
    //           Hướng dẫn sử dụng dịch vụ
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <div className="header-center">
    <ul>
      <li className="ezfu-hover-giaodichchungkhoan">
        <a>{t("home:menu.LichSuGD")}</a>
        <ul>
          <li>
            <Link  to="/report/ClientActivityRange">{t("home:menu.LichSUDL")}</Link>
          </li>
          <li>
            <Link  to="/report/TradeLog">{t("home:menu.LichSUKL")}</Link>
          </li>
          <li>
            <Link  to="/report/PendingSettlement">{t("home:menu.LishSuTT")}</Link>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-chuyentien">
        <a> {t("home:menu.GDTien")}</a>
        <ul>
          <li>
            <Link  to="/transfer">{t("home:menu.Chuyentien")}</Link>
          </li>
          <li>
            <Link  to="/transfer/template">{t("home:menu.Mauchuyentien")}</Link>
          </li>
          <li>
            <Link  to="/transfer/home/transferds">{t("home:menu.ChuyentienPPX")}</Link>
          </li>
          <li>
            <Link  to="/transfer/history">{t("home:menu.LichsuCT")}</Link>
          </li>
          <li>
            <Link  to="/transfer/ordersavings" className="Foreign-Hide">{t("home:menu.TienchoVay")} <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/transfer/finalizesavings" className="Foreign-Hide">{t("home:menu.TatToanTV")}  <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/transfer/savingshistory" className="Foreign-Hide">{t("home:menu.DanhsachHDCV")}  <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/report/AdvReport" className="MarPro-Hide" style={{display: 'none'}}>Lịch sử ứng trước tiền bán CK</Link>
          </li>
          <li>
            <Link  to="/rightscustody/AdvanceOrderForm">{t("home:menu.UTTTC")}</Link>
          </li>
          <li>
            <Link  to="/rightscustody/AdvanceHistory">{t("home:menu.LSUTTTC")}</Link>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-giaodichdacbiet">
        <a>{t("home:menu.GDDacBiet")}</a>
        <ul>
          <li>
            <Link  to="/oddlot/History">Lịch sử bán CK lô lẻ</Link>
          </li>
          <li>
            <Link  to="/rightscustody/OverView">Thực hiện quyền</Link>
          </li>
          <li>
            <Link  to="/stoploss/orderform">Đặt lệnh điều kiện</Link>
          </li>
          <li>
            <Link  to="/stoploss/history">Sổ lệnh điều kiện</Link>
          </li>
          <li>
            <Link  to="/rightscustody/CustodyOrderForm">Lưu ký trực tuyến</Link>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-quanlytaikhoan">
        <a>{t("home:menu.QuanLyTK")}</a>
        <ul>
          <li>
            <Link  to="/report/ReportTransBalance">Báo cáo tổng hợp số dư giao dịch  <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/menu">Báo cáo tài sản   <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/report/ReportNAV">Báo cáo biến động tài sản ròng  <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/report/reportprofitloss">Báo cáo lãi lỗ thực hiện  <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/report/ReportTransSummary">Báo cáo tổng hợp giao dịch theo mã chứng khoán  <input type="image" src="../../report/images/new.png" height={16} width={28} /></Link>
          </li>
          <li>
            <Link  to="/report/StockDetails">Số dư chứng khoán</Link>
          </li>
          <li>
            <Link  to="/report/CurrMargin">Số dư tiền</Link>
          </li>
          <li>
            <Link  to="/report/StockSettlement">Sao kê chứng khoán</Link>
          </li>
          <li>
            <Link  to="/report/CashSettlement">Sao kê tiền</Link>
          </li>
          <li>
            <Link  to="/rightscustody/DepositoryHistory">Tra cứu phí lưu ký</Link>
          </li>
          <li>
            <Link  to="/report/ReportCW">Tra cứu tình trạng chứng quyền</Link>
          </li>
          <li>
            <Link  to="/report/ListFee">Tra cứu biểu phí</Link>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-quanlytaikhoanMarMor MarMor-Show" style={{display: 'none'}}>
        <a>{t('home:menu.QuanLyKQ')}</a>
        <ul>
          <li>
            <Link  to="/margin/Mortgage">Cầm cố chứng khoán</Link>
          </li>
          <li>
            <Link  to="/margin/Report">Tra cứu tham số - HĐ Ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/Payment">Trả tiền HĐ Ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/ReportPayment">Tra cứu trả tiền HĐ Ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/Extend">Gia hạn hợp đồng Ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/Quota">Đề nghị thay đổi hạn mức</Link>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-quanlytaikhoanMarPro MarPro-Show" style={{display: 'list-item'}}>
        <a>{t("home:menu.QuanLyTK")}</a>
        <ul>
          <li>
            <Link  to="/margin/InterestMP">Tra cứu lãi vay ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/DetailReport">Tra cứu chi tiết tài khoản ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/CashSettlementMP">Sao kê tiền vay ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/ParameterMP">Tra cứu tham số ký quỹ</Link>
          </li>
          <li>
            <Link  to="/margin/QuotaMP">Đề nghị thay đổi hạn mức</Link>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-tuvandautu">
        <Link  to="https://ezadvisorselect.fpts.com.vn/">{t("home:menu.TuVanDauTu")}</Link>
      </li>
      <li className="eezfu-hover-giaodichdacbiet">
        <a>{t("home:menu.HoTro")}</a>
        <ul>
          <li>
            <Link  to="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/mo-tai-khoan-giao-dich-chung-khoan/">Sản phẩm dịch vụ trực tuyến</Link>
          </li>
          <li>
            <Link  to="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/cau-hoi-thuong-gap/">Hướng dẫn Nhà đầu tư</Link>
          </li>
          <li>
            <Link  to="http://www.fpts.com.vn/san-pham-dich-vu/tu-van-doanh-nghiep/">Sản phẩm dịch vụ cho Tổ chức</Link>
          </li>
          <li>
            <Link  to="http://fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/marketwatch-va-do-thi-tren-eztrade-new/">Hướng dẫn sử dụng dịch vụ</Link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  );
};

export default ListMenu;
