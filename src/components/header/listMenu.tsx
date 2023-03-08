import React from 'react'

const listMenu = () => {
  
  return (
      <div className='flex'>
        <div className="group inline-block py-1 px-4 border-r border-borderListMenu " >
          <span className="uppercase text-sm hover-text-blue ">  Lịch sử GD </span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block boxShadow">
             <li >
              <a className=" listmenu-item " href="#">Lịch sử đặt lệnh</a>
            </li>
            <li >
              <a className="listmenu-item " href="#">Lịch sử khớp lệnh</a>
            </li>
            <li >
              <a className="rounded-b listmenu-item " href="#">Lệnh chờ khớp thanh toán</a>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-1  px-4 border-r border-borderListMenu">
          <span className="  uppercase text-sm hover-text-blue">   GD tiền </span>
          <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block ">
         
            <li >
              <a className="listmenu-item" href="#">Chuyển tiền</a>
            </li>
            <li >
              <a className=" listmenu-item " href="#">Chuyển tiền ký quỹ CK phái sinh</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">GD tiền</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Lịch sử chuyển tiền</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Tiền cho vay - EzSaving</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Tất toán tiền cho vay</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Danh sách hợp đồng cho vay</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Ứng trước tiền cổ tức</a>
            </li>
            <li >
              <a className="rounded-b listmenu-item" href="#">Lịch sử ứng trước tiền cổ tức</a>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-1  px-4 border-r border-borderListMenu">
          <span className="  uppercase  text-sm hover-text-blue">    GD đặc biệt</span>
          <ul className="absolute hidden text-gray-700 pt-2 boxShadow group-hover:block">
            <li >
              <a className="rounded-t listmenu-item" href="#">Lịch sử bán CK lô lẻ</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Thực hiện quyền</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Đặt lệnh điều kiện</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Sổ lệnh điều kiện</a>
            </li>
            <li >
              <a className="rounded-b listmenu-item" href="#">Lưu ký trực tuyến</a>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-1  px-4 border-r border-borderListMenu">
          <span className="  uppercase text-sm hover-text-blue">  Quản lý tk </span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
            <li >
              <a className=" listmenu-item" href="#">Báo cáo tổng hợp số dư giao dịch</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Báo cáo tài sản</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Báo cáo biến động tài sản ròng</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Báo cáo lãi lỗ thực hiện</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Báo cáo tổng hợp giao dịch theo mã chứng khoán</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Số dư chứng khoán</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Số dư tiền</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Sao kê chứng khoán</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Sao kê tiền</a>
            </li>
            <li >
              <a className=" listmenu-item" href="#">Tra cứu phí lưu ký</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Tra cứu tình trạng chứng quyền</a>
            </li>
            <li >
              <a className=" rounded-b listmenu-item" href="#">Tra cứu biểu phí</a>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-1  px-4">
          <span className="  uppercase text-sm hover-text-blue">QUẢN LÝ KÝ QUỸ </span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block">
            <li >
              <a className="listmenu-item" href="#">Tra cứu lãi vay</a>
            </li>
            <li >
              <a className="listmenu-item" href="#">Tra cứu chi tiết tài khoản ký quỹ</a>
            </li>
            <li >
              <a className=" rounded-b listmenu-item" href="#">Sao kê tiền vay ký quỹ</a>
            </li>
          </ul>
        </div>
      </div>  
  )
}

export default listMenu