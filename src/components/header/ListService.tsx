import { Box, IconButton,Tooltip,Popover } from '@mui/material'
import React, { useState } from 'react'
import menuImage from "../../images/menu.png";
const ListService = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const openPopupListService = Boolean(anchorEl);
      const handleCloseLanguage = () => {
        setAnchorEl(null);
      };
  return (
    <Box>
    <Tooltip title="Truy cập dịch vụ">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ marginBottom: 5 ,marginRight:2}}
      >
        <img className="" width={22} src={menuImage} alt="" />
        <Box
          id="selectSrvdiv"
          className="gb_srvService "
          style={{ display: anchorEl ? "block" : "none" }}
        ></Box>
      </IconButton>
    </Tooltip>
    <Popover
      id="basic-menu"
      anchorEl={anchorEl}
      open={openPopupListService}
      onClose={handleCloseLanguage}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: 100,
      }}
    >
      <Box className="ezfu-ServiceBox">
        <div className="fptstriangle"></div>
        <div className="flex service__col">
          <div className="px-4 w-2/6 list_menu_right">
            <ul>
              <li className="forgiaodichchungkhoan">
                <a
                  href="https://eztrade.fpts.com.vn"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Giao dịch CK cơ sở
                </a>
              </li>
              <li>
                <a
                  href="https://ezfutures.fpts.com.vn"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Giao dịch CK phái sinh
                </a>
              </li>
              <li className="fordattruoclenhmuaban">
                <a
                  href="/stoploss/orderform"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Đặt lệnh điều kiện
                </a>
              </li>
              <li className="forthuchienquyen">
                <a
                  href="/rightscustody/OverView"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Thực hiện quyền
                </a>
              </li>
              <li className="forluukytructuyen">
                <a
                  href="/rightscustody/CustodyOrderForm"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Lưu ký chứng khoán
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 w-2/6 list_menu_right">
            <ul>
              <li className="no_logo">
                <a
                  href="/rightscustody/AdvanceOrderForm"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Ứng trước cổ tức
                </a>
              </li>
              <li className="forgiaodichchungkhoan">
                <a
                  href="/margin/Mortgage"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Cầm cố chứng khoán
                </a>
              </li>
              <li className="forquanlygiaodichkyquy">
                <a
                  href="/margin/Report"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Quản lý HĐ Ký quỹ
                </a>
              </li>
              <li className="forgiaodichchungkhoan">
                <a
                  href="/report/AssetReport2"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Quản lý tài sản
                </a>
              </li>
              <li className="forluukytructuyen">
                <a
                  href="/rightscustody/DepositoryHistory"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Tra cứu phí lưu ký
                </a>
              </li>
              <li className="forgiaodichchungkhoan">
                <a
                  href="/report/ReportCW"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Tra cứu chứng quyền
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 w-2/6 list_menu_right">
            <ul>
              <li className="forchuyentien">
                <a
                  href="/transfer"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Chuyển tiền ngân hàng
                </a>
              </li>
              <li className="forchuyentien">
                <a
                  href="/transfer/home/transferds"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Chuyển tiền ký quỹ CKPS
                </a>
              </li>
              <li>
                <a
                  href="https://liveprice.fpts.com.vn"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Bảng giá chứng khoán
                </a>
              </li>
              <li>
                <a
                  href="https://liveprice.fpts.com.vn/hnxpro"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Bảng giá HNXPro
                </a>
              </li>
              <li>
                <a
                  href="https://ezfutures.fpts.com.vn/chart3"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Biểu đồ kĩ thuật
                </a>
              </li>
              <li className="forthongtindoanhnghiep">
                <a
                  href="http://ezsearch.fpts.com.vn/Services/"
                  target="_blank"
                  style={{ color: "black" }}
                >
                  Thông tin doanh nghiệp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Box>
    </Popover>
  </Box>
  )
}

export default React.memo(ListService)