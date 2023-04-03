import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const ListMenu = () => {
  return (
    // <div className="pl-2.5 flex">
    //   <div className="group inline-block py-2 px-2 border-r border-borderListMenu ">
    //     <span className="uppercase size hover-text-blue "> Lịch sử GD </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50 boxShadow ">
    //       <li className="border-bottom-menu ">
    //         <a className=" listmenu-item size-li " href="#">
    //           Lịch sử đặt lệnh
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item size-li " href="#">
    //           Lịch sử khớp lệnh
    //         </a>
    //       </li>
    //       <li>
    //         <a className="rounded-b listmenu-item size-li  " href="#">
    //           Lệnh chờ khớp thanh toán
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase size hover-text-blue"> GD tiền </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block z-50 ">
    //       <li className="border-bottom-menu">
    //         <a className="listmenu-item size-li " href="#">
    //           Chuyển tiền
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item size-li " href="#">
    //           Chuyển tiền ký quỹ CK phái sinh
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item size-li " href="#">
    //           GD tiền
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item size-li " href="#">
    //           Lịch sử chuyển tiền
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item size-li" href="#">
    //           Tiền cho vay - EzSaving
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item size-li " href="#">
    //           Tất toán tiền cho vay
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item size-li " href="#">
    //           Danh sách hợp đồng cho vay
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item size-li " href="#">
    //           Ứng trước tiền cổ tức
    //         </a>
    //       </li>
    //       <li>
    //         <a className="rounded-b listmenu-item size-li " href="#">
    //           Lịch sử ứng trước tiền cổ tức
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2 px-2 border-r border-borderListMenu">
    //     <span className="  uppercase  size  hover-text-blue"> GD đặc biệt</span>
    //     <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block z-50">
    //       <li>
    //         <a className="rounded-t listmenu-item size-li " href="#">
    //           Lịch sử bán CK lô lẻ
    //         </a>
    //       </li>
    //       <li className="border-bottom-menu">
    //         <a className="listmenu-item size-li " href="#">
    //           Thực hiện quyền
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item size-li  " href="#">
    //           Đặt lệnh điều kiện
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item size-li " href="#">
    //           Sổ lệnh điều kiện
    //         </a>
    //       </li>
    //       <li>
    //         <a className="rounded-b listmenu-item size-li " href="#">
    //           Lưu ký trực tuyến
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase size hover-text-blue"> Quản lý tk </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50 ">
    //       <li className="border-bottom-menu">
    //         <a className=" listmenu-item  size-li" href="#">
    //           Báo cáo tổng hợp số dư giao dịch
    //         </a>
    //       </li>
    //       <li>
    //         <Link to="/report-bcts" className="listmenu-item  size-li">
    //           Báo cáo tài sản
    //         </Link>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item  size-li" href="#">
    //           Báo cáo biến động tài sản ròng
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item  size-li" href="#">
    //           Báo cáo lãi lỗ thực hiện
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item  size-li" href="#">
    //           Báo cáo tổng hợp giao dịch theo mã chứng khoán
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item  size-li" href="#">
    //           Số dư chứng khoán
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item  size-li" href="#">
    //           Số dư tiền
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item  size-li" href="#">
    //           Sao kê chứng khoán
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item  size-li" href="#">
    //           Sao kê tiền
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" listmenu-item  size-li" href="#">
    //           Tra cứu phí lưu ký
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item size-li" href="#">
    //           Tra cứu tình trạng chứng quyền
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" rounded-b listmenu-item  size-li" href="#">
    //           Tra cứu biểu phí
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
    //     <span className="  uppercase  size hover-text-blue">
    //       QUẢN LÝ KÝ QUỸ{" "}
    //     </span>
    //     <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
    //       <li className="border-bottom-menu">
    //         <a className="listmenu-item  size-li" href="#">
    //           Tra cứu lãi vay
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item  size-li" href="#">
    //           Tra cứu chi tiết tài khoản ký quỹ
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" rounded-b listmenu-item  size-li" href="#">
    //           Sao kê tiền vay ký quỹ
    //         </a>
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
    //         <a className="listmenu-item  size-li" href="#">
    //           Sản phẩm dịch vụ trực tuyến
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item  size-li" href="#">
    //           Hướng dẫn nhà đầu tư
    //         </a>
    //       </li>
    //       <li>
    //         <a className="listmenu-item  size-li" href="#">
    //           Sản phẩm dịch vụ cho tổ chức
    //         </a>
    //       </li>
    //       <li>
    //         <a className=" rounded-b listmenu-item  size-li" href="#">
    //           Hướng dẫn sử dụng dịch vụ
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <div className="header-center">
    <ul>
      <li className="ezfu-hover-giaodichchungkhoan">
        <a>Lịch sử GD</a>
        <ul>
          <li>
            <a target="_blank" href="/report/ClientActivityRange">Lịch sử đặt lệnh</a>
          </li>
          <li>
            <a target="_blank" href="/report/TradeLog">Lịch sử khớp lệnh</a>
          </li>
          <li>
            <a target="_blank" href="/report/PendingSettlement">Lệnh khớp chờ t.toán</a>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-chuyentien">
        <a>GD tiền</a>
        <ul>
          <li>
            <a target="_blank" href="/transfer">Chuyển tiền</a>
          </li>
          <li>
            <a target="_blank" href="/transfer/template">Mẫu chuyển tiền</a>
          </li>
          <li>
            <a target="_blank" href="/transfer/home/transferds">Chuyển tiền ký quỹ CK phái sinh</a>
          </li>
          <li>
            <a target="_blank" href="/transfer/history">Lịch sử chuyển tiền</a>
          </li>
          <li>
            <a target="_blank" href="/transfer/ordersavings" className="Foreign-Hide">Tiền cho vay - EzSaving  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/transfer/finalizesavings" className="Foreign-Hide">Tất toán tiền cho vay  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/transfer/savingshistory" className="Foreign-Hide">Danh sách hợp đồng cho vay  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/report/AdvReport" className="MarPro-Hide" style={{display: 'none'}}>Lịch sử ứng trước tiền bán CK</a>
          </li>
          <li>
            <a target="_blank" href="/rightscustody/AdvanceOrderForm">Ứng trước tiền cổ tức</a>
          </li>
          <li>
            <a target="_blank" href="/rightscustody/AdvanceHistory">Lịch sử ứng trước tiền cổ tức</a>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-giaodichdacbiet">
        <a>GD đặc biệt</a>
        <ul>
          <li>
            <a target="_blank" href="/oddlot/History">Lịch sử bán CK lô lẻ</a>
          </li>
          <li>
            <a target="_blank" href="/rightscustody/OverView">Thực hiện quyền</a>
          </li>
          <li>
            <a target="_blank" href="/stoploss/orderform">Đặt lệnh điều kiện</a>
          </li>
          <li>
            <a target="_blank" href="/stoploss/history">Sổ lệnh điều kiện</a>
          </li>
          <li>
            <a target="_blank" href="/rightscustody/CustodyOrderForm">Lưu ký trực tuyến</a>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-quanlytaikhoan">
        <a>Quản lý TK</a>
        <ul>
          <li>
            <a target="_blank" href="/report/ReportTransBalance">Báo cáo tổng hợp số dư giao dịch  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/report/AssetReport2">Báo cáo tài sản   <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/report/ReportNAV">Báo cáo biến động tài sản ròng  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/report/reportprofitloss">Báo cáo lãi lỗ thực hiện  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/report/ReportTransSummary">Báo cáo tổng hợp giao dịch theo mã chứng khoán  <input type="image" src="../../report/images/new.png" height={16} width={28} /></a>
          </li>
          <li>
            <a target="_blank" href="/report/StockDetails">Số dư chứng khoán</a>
          </li>
          <li>
            <a target="_blank" href="/report/CurrMargin">Số dư tiền</a>
          </li>
          <li>
            <a target="_blank" href="/report/StockSettlement">Sao kê chứng khoán</a>
          </li>
          <li>
            <a target="_blank" href="/report/CashSettlement">Sao kê tiền</a>
          </li>
          <li>
            <a target="_blank" href="/rightscustody/DepositoryHistory">Tra cứu phí lưu ký</a>
          </li>
          <li>
            <a target="_blank" href="/report/ReportCW">Tra cứu tình trạng chứng quyền</a>
          </li>
          <li>
            <a target="_blank" href="/report/ListFee">Tra cứu biểu phí</a>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-quanlytaikhoanMarMor MarMor-Show" style={{display: 'none'}}>
        <a>Quản lý ký quỹ</a>
        <ul>
          <li>
            <a target="_blank" href="/margin/Mortgage">Cầm cố chứng khoán</a>
          </li>
          <li>
            <a target="_blank" href="/margin/Report">Tra cứu tham số - HĐ Ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/Payment">Trả tiền HĐ Ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/ReportPayment">Tra cứu trả tiền HĐ Ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/Extend">Gia hạn hợp đồng Ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/Quota">Đề nghị thay đổi hạn mức</a>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-quanlytaikhoanMarPro MarPro-Show" style={{display: 'list-item'}}>
        <a>Quản lý ký quỹ</a>
        <ul>
          <li>
            <a target="_blank" href="/margin/InterestMP">Tra cứu lãi vay ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/DetailReport">Tra cứu chi tiết tài khoản ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/CashSettlementMP">Sao kê tiền vay ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/ParameterMP">Tra cứu tham số ký quỹ</a>
          </li>
          <li>
            <a target="_blank" href="/margin/QuotaMP">Đề nghị thay đổi hạn mức</a>
          </li>
        </ul>
      </li>
      <li className="ezfu-hover-tuvandautu">
        <a target="_blank" href="https://ezadvisorselect.fpts.com.vn/">Tư vấn Đầu tư</a>
      </li>
      <li className="eezfu-hover-giaodichdacbiet">
        <a>Hỗ trợ</a>
        <ul>
          <li>
            <a target="_blank" href="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/mo-tai-khoan-giao-dich-chung-khoan/">Sản phẩm dịch vụ trực tuyến</a>
          </li>
          <li>
            <a target="_blank" href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/cau-hoi-thuong-gap/">Hướng dẫn Nhà đầu tư</a>
          </li>
          <li>
            <a target="_blank" href="http://www.fpts.com.vn/san-pham-dich-vu/tu-van-doanh-nghiep/">Sản phẩm dịch vụ cho Tổ chức</a>
          </li>
          <li>
            <a target="_blank" href="http://fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/marketwatch-va-do-thi-tren-eztrade-new/">Hướng dẫn sử dụng dịch vụ</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  );
};

export default ListMenu;
