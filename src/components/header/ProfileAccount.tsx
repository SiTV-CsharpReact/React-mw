import { Box, Button, Typography,Tooltip,Popover } from '@mui/material';
import React, { useState } from 'react'
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import menuImage from "../../images/menu.png";
import avatarImage from "../../images/avatar_ano.png";
const ProfileAccount = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openAccount, setOpenAccount] = useState(false);
    const openPopupAccount = Boolean(anchorEl);
    const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleCloseAccount = () => {
        setAnchorEl(null);
      };
  return (
    <Box>
    <Tooltip title="Thông tin tài khoản">
      <Button
        id="basic-button"
        aria-controls={openAccount ? "basic-menu2" : undefined}
        aria-haspopup="true"
        aria-expanded={openAccount ? "true" : undefined}
        onClick={handleClickAccount}
        style={{ padding: "0px !important", marginBottom: 1 }}
      >
        <Box className="text-11pt text-[#2371af]">058C222210</Box>
        <Box
          id="selectSrvdiv"
          className="gb_srv"
          style={{ display: anchorEl ? "block" : "none" }}
        ></Box>
        <ArrowDropDownIcon sx={{ color: "#2371af",marginLeft:"-3px" }} />
      </Button>
    </Tooltip>
    <Popover
      id="basic-menu2"
      anchorEl={anchorEl}
      open={openPopupAccount}
      onClose={handleCloseAccount}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        style: { width: "287px" },
      }}
    >
      <Box className="account-info">
        <Box sx={{ display: "flex" }}>
          <Box>
            <img
              width={100}
              className="rounded-full img-circle"
              src={avatarImage}
              alt=""
            />
          </Box>

          <Box>
            <Box
              paddingTop={1.5}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                component="span"
                style={{ fontSize: 13, paddingTop: 5, paddingBottom: 5 }}
              >
                TẠ VĂN SĨ
              </Typography>

              <a
                className="bg-[#339cdf] ezfu-btn-profile"
                href="https://accounts.fpts.com.vn"
                target="_blank"
              >
                Thông tin chủ tài khoản
              </a>
            </Box>
          </Box>
        </Box>
        <ul>
          {/* faKey,faLock,faHistory,faUnlockAlt,faQuestionCircle,faPencilSquare,faLanguage,faSignOut */}
          <a
            href="https://accounts.fpts.com.vn/AccountManager"
            target="_blank"
            style={{ color: "black", display: "none" }}
            id="accountManager"
          >
            <li>
              <i className="fa fa-user"></i>Chuyên viên quản lý tài khoản
            </li>
          </a>
          <a
            href="https://accounts.fpts.com.vn/account/changePassword"
            target="_blank"
            style={{ color: "black" }}
          >
            <li>
              {/* <FontAwesomeIcon icon={faKey}  className="icon_account"/> */}
              <i className="fa fa-key"></i>
              Thay đổi mật khẩu
            </li>
          </a>
          <a
            href="https://accounts.fpts.com.vn/rsa"
            target="_blank"
            style={{ color: "black" }}
          >
            <li>
              {/* <FontAwesomeIcon icon={faLock} className="icon_account" /> */}
              <i className="fa fa-lock"></i>
              Quản trị Token
            </li>
          </a>
          <a
            href="https://accounts.fpts.com.vn/account/activities"
            target="_blank"
            style={{ color: "black" }}
          >
            <li>
              {/* <FontAwesomeIcon icon={faHistory}  className="icon_account"/> */}
              <i className="fa fa-history"></i>
              Hoạt động gần đây
            </li>
          </a>
          <a
            href="https://accounts.fpts.com.vn/OptionsPassword"
            target="_blank"
            style={{ color: "black" }}
          >
            <li>
              {/* <FontAwesomeIcon icon={faUnlockAlt}  className="icon_account"/> */}
              <i className="fa fa-unlock-alt"></i>
              Cài đặt mật khẩu giao dịch
            </li>
          </a>
          <a
            href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/cau-hoi-thuong-gap/"
            target="_blank"
            style={{ color: "black" }}
          >
            <li>
              {/* <FontAwesomeIcon icon={faQuestionCircle}  className="icon_account"/> */}
              <i className="fa fa-question-circle"></i>
              Hướng dẫn xóa cache
            </li>
          </a>
          <a
            href="https://accounts.fpts.com.vn/account/Comment"
            target="_blank"
            style={{ color: "black" }}
          >
            <li>
              {/* <FontAwesomeIcon icon={faPenSquare}  className="icon_account"/> */}
              <i className="fa fa-pencil-square-o"></i>
              Góp ý
            </li>
          </a>
          <li className="ezfu-language">
            {/* <FontAwesomeIcon icon={faLanguage}  className="icon_account"/> */}
            <i className="fa fa-language"></i>
            <span>Hỗ trợ ngôn ngữ:</span>
            <a href="/" className="px-3 text-textLanguage">
              Tiếng Việt
            </a>
            <span>|</span>
            <a href="/" className="px-3 text-textLanguage">
              English
            </a>
          </li>
          <a href="/LogOut" style={{ color: "black" }} id="idLogOut">
            <li>
              <i className="fa fa-sign-out"></i>
              {/* <FontAwesomeIcon icon={faSignOut}  className="icon_account"/> */}
              Thoát
            </li>
          </a>
        </ul>
      </Box>
    </Popover>
  </Box>
  )
}

export default ProfileAccount