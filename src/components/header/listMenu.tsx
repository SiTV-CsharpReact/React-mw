import React from "react";
import "./style.css";
const listMenu = () => {
  return (
    <div className="flex">
      <div className="group inline-block py-2 px-2 border-r border-borderListMenu ">
        <span className="uppercase size hover-text-blue "> Lịch sử GD </span>
        <ul className="absolute hidden text-gray-700 pt-2 group-hover:block boxShadow ">
          <li className="ahihi ">
            <a className=" listmenu-item text-xs " href="#">
              Lịch sử đặt lệnh
            </a>
          </li>
          <li>
            <a className="listmenu-item text-xs " href="#">
              Lịch sử khớp lệnh
            </a>
          </li>
          <li>
            <a className="rounded-b listmenu-item text-xs  " href="#">
              Lệnh chờ khớp thanh toán
            </a>
          </li>
        </ul>
      </div>
      <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
        <span className="  uppercase text-sm hover-text-blue"> GD tiền </span>
        <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block ">
          <li className="ahihi">
            <a className="listmenu-item text-xs " href="#">
              Chuyển tiền
            </a>
          </li>
          <li>
            <a className=" listmenu-item text-xs " href="#">
              Chuyển tiền ký quỹ CK phái sinh
            </a>
          </li>
          <li>
            <a className=" listmenu-item text-xs " href="#">
              GD tiền
            </a>
          </li>
          <li>
            <a className="listmenu-item text-xs " href="#">
              Lịch sử chuyển tiền
            </a>
          </li>
          <li>
            <a className=" listmenu-item text-xs " href="#">
              Tiền cho vay - EzSaving
            </a>
          </li>
          <li>
            <a className=" listmenu-item text-xs " href="#">
              Tất toán tiền cho vay
            </a>
          </li>
          <li>
            <a className="listmenu-item text-xs " href="#">
              Danh sách hợp đồng cho vay
            </a>
          </li>
          <li>
            <a className=" listmenu-item text-xs " href="#">
              Ứng trước tiền cổ tức
            </a>
          </li>
          <li>
            <a className="rounded-b listmenu-item text-xs " href="#">
              Lịch sử ứng trước tiền cổ tức
            </a>
          </li>
        </ul>
      </div>
      <div className="group inline-block py-2 px-2 border-r border-borderListMenu">
        <span className="  uppercase  size  hover-text-blue">
          {" "}
          GD đặc biệt
        </span>
        <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block">
          <li>
            <a className="rounded-t listmenu-item text-xs " href="#">
              Lịch sử bán CK lô lẻ
            </a>
          </li>
          <li className="ahihi">
            <a className="listmenu-item text-xs " href="#">
              Thực hiện quyền
            </a>
          </li>
          <li>
            <a className=" listmenu-item text-xs  " href="#">
              Đặt lệnh điều kiện
            </a>
          </li>
          <li>
            <a className="listmenu-item text-xs " href="#">
              Sổ lệnh điều kiện
            </a>
          </li>
          <li>
            <a className="rounded-b listmenu-item text-xs " href="#">
              Lưu ký trực tuyến
            </a>
          </li>
        </ul>
      </div>
      <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
        <span className="  uppercase size hover-text-blue">
          {" "}
          Quản lý tk{" "}
        </span>
        <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
          <li className="ahihi">
            <a className=" listmenu-item  text-xs" href="#">
              Báo cáo tổng hợp số dư giao dịch
            </a>
          </li>
          <li>
            <a className="listmenu-item  text-xs" href="#">
              Báo cáo tài sản
            </a>
          </li>
          <li>
            <a className=" listmenu-item  text-xs" href="#">
              Báo cáo biến động tài sản ròng
            </a>
          </li>
          <li>
            <a className=" listmenu-item  text-xs" href="#">
              Báo cáo lãi lỗ thực hiện
            </a>
          </li>
          <li>
            <a className="listmenu-item  text-xs" href="#">
              Báo cáo tổng hợp giao dịch theo mã chứng khoán
            </a>
          </li>
          <li>
            <a className=" listmenu-item  text-xs" href="#">
              Số dư chứng khoán
            </a>
          </li>
          <li>
            <a className=" listmenu-item  text-xs" href="#">
              Số dư tiền
            </a>
          </li>
          <li>
            <a className="listmenu-item  text-xs" href="#">
              Sao kê chứng khoán
            </a>
          </li>
          <li>
            <a className=" listmenu-item  text-xs" href="#">
              Sao kê tiền
            </a>
          </li>
          <li>
            <a className=" listmenu-item  text-xs" href="#">
              Tra cứu phí lưu ký
            </a>
          </li>
          <li>
            <a className="listmenu-item  text-xs" href="#">
              Tra cứu tình trạng chứng quyền
            </a>
          </li>
          <li>
            <a className=" rounded-b listmenu-item  text-xs" href="#">
              Tra cứu biểu phí
            </a>
          </li>
        </ul>
      </div>
      <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
        <span className="  uppercase size hover-text-blue">
          QUẢN LÝ KÝ QUỸ{" "}
        </span>
        <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
          <li className="ahihi">
            <a className="listmenu-item  text-xs" href="#">
              Tra cứu lãi vay
            </a>
          </li>
          <li>
            <a className="listmenu-item  text-xs" href="#">
              Tra cứu chi tiết tài khoản ký quỹ
            </a>
          </li>
          <li>
            <a className=" rounded-b listmenu-item  text-xs" href="#">
              Sao kê tiền vay ký quỹ
            </a>
          </li>
        </ul>
      </div>
      <div className="group inline-block py-2  px-2 border-r border-borderListMenu">
        <span className="  uppercase  size hover-text-blue">
          Tư vấn đầu tư
        </span>
        <ul className="absolute hidden text-gray-700 pt-2 group-hover:block"></ul>
      </div>
      <div className="group inline-block py-2  px-2">
        <span className="  uppercase  size hover-text-blue">Hỗ trợ</span>
        <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
          <li className="ahihi ">
            <a className="listmenu-item  text-xs" href="#">
              Sản phẩm dịch vụ trực tuyến
            </a>
          </li>
          <li>
            <a className="listmenu-item  text-xs" href="#">
              Hướng dẫn nhà đầu tư
            </a>
          </li>
          <li>
            <a className=" rounded-b listmenu-item  text-xs" href="#">
              Sản phẩm dịch vụ cho tổ chức
            </a>
          </li>
          <li>
            <a className=" rounded-b listmenu-item  text-xs" href="#">
              Hướng dẫn sử dụng dịch vụ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default listMenu;
