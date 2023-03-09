import {
  IconButton,
  Menu,
  MenuItem,
  styled,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import "./style.css";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import ListMenu from "./listMenu";
import { Link } from "react-router-dom";
// import "../../styles/sidebar.css";
import "../../styles/header.css";
import Button from "@mui/material/Button";

import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { display } from "@mui/system";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 52,
  height: 30,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
    width: 26,
    height: 26,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#034e95"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const BoxIcon = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  // borderColor: '#034e95',//This will not override the default color of the border.
  border: 1,
  borderStyle: "solid",
  borderColor: theme.palette.mode === "dark" ? "#fff" : "#034e95",
  // border: '1px solid background.default',
  borderRadius: "5px",
  alignItems: "center",
  boxSizing: "border-box",
  marginRight: "15px",
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const openPopupLanguage = Boolean(anchorEl);
  const openPopupLanguage1 = Boolean(anchorEl1);
  const openPopupLanguage2 = Boolean(anchorEl2);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseLanguage = () => {
    setAnchorEl(null);
  };
  const handleCloseLanguage1 = () => {
    setAnchorEl1(null);
  };
  const handleCloseLanguage2 = () => {
    setAnchorEl2(null);
  };
  const { i18n } = useTranslation(["home", "report"]);
  const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const changeLanguage = (lng: "EN" | "VI") => {
    i18n.changeLanguage(lng);
    handleCloseLanguage();
  };

  return (
    <Box
      sx={{
        // bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff",
        padding: "0px 18px 0px 15px",
        display: "flex",
        zIndex: 100,
        width: "100%",
      }}
      className="header-fpts justify-between"
    >
      <div className="flex">
        <Link to="/" className="text-2xl font-bold italic">
          <span>Ez</span>
          <span className="text-colorTextLogo">Trade</span>
        </Link>

        <ListMenu />
      </div>
      <div></div>
      <Box className="header-right" display="flex">
        <div className="group inline-block py-1  px-4">
          <span className="  uppercase text-sm">
            <a href="/">
              <img
                className="mt-[8px]"
                src="https://eztrade.fpts.com.vn/images/headerEzAcc/exchange1.png"
                alt="Giao dịch chứng khoán phát sinh"
              />
            </a>
          </span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block"></ul>
        </div>
        <Box>
          <Tooltip title="Truy cập dịch vụ">
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <img className="pt-[3px]" width={22} src="https://eztrade.fpts.com.vn/images/menu.png" alt="" />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openPopupLanguage}
            onClose={handleCloseLanguage}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box>
                <div className="grid">
                  <a className="ahihi1 p-3 listmenu-item text-xs	" href="">
                    Giao dịch CK cơ sở
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="">
                    Giao dịch CK phát sinh
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="">
                    Đặt lệnh điều kiện
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="">
                    Thực hiện quyền
                  </a>
                  <a className="pl-4 pt-3 hover:text-[#034e95] text-xs	" href="">
                    Lưu ký chứng khoán
                  </a>
                </div>
              </Box>
              <Box>
                <div className="grid">
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Ứng trước cổ tức
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Cầm cố chứng khoán
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Quản lí hợp đồng quỹ
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Quản lí tài sản
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Tra cứu phí lưu ký
                  </a>
                  <a className="pl-4 pt-3 hover:text-[#034e95] text-xs	 " href="#">
                    Tra cứu chính quyền
                  </a>
                </div>
              </Box>
              <Box>
                <div className="grid">
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Chuyền tiền ngân hàng
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Chuyền tiền quỹ CKPS
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Bảng giá chứng khoán
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Bảng giá HNXPro
                  </a>
                  <a className="p-3 listmenu-item text-xs	" href="#">
                    Biểu đồ kĩ thuật
                  </a>
                  <a className="pl-4 pt-3 hover:text-[#034e95] text-xs	" href="#">
                    Thông tin doanh nghiệp
                  </a>
                </div>
              </Box>
            </Box>
          </Menu>
        </Box>

        <Box>
          <Tooltip title="Thông báo">
            <IconButton
              id="basic-button"
              aria-controls={open1 ? "basic-menu1" : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? "true" : undefined}
              onClick={handleClick1}
            >
              <NotificationsIcon sx={{ color: "#2371af" }} />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu1"
            anchorEl={anchorEl1}
            open={openPopupLanguage1}
            onClose={handleCloseLanguage1}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Box sx={{ display: "flex"}}>
              <Box>
                <Typography padding={1}>Thông báo</Typography>
              </Box>
              <Box>
                <Typography padding={1}>
                  <div className="flex justify-center">
                    <p className="mr-[20px]">Bật tắt thông báo</p>
                    <div>
                      <input
                        className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </div>
                </Typography>
              </Box>
            </Box>
          </Menu>
        </Box>
        <Box>
          <Tooltip title="Thông tin chủ tài khoản">
            <IconButton
              id="basic-button"
              aria-controls={open2 ? "basic-menu2" : undefined}
              aria-haspopup="true"
              aria-expanded={open2 ? "true" : undefined}
              onClick={handleClick2}
            >
              <Typography sx={{ color: "#2371af" }}>058C044534</Typography>
              <ArrowDropDownIcon sx={{ color: "#2371af" }} />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu2"
            anchorEl={anchorEl2}
            open={openPopupLanguage2}
            onClose={handleCloseLanguage2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{}}
          >
            <Box sx={{ display: "flex", padding: "8px" }}>
              <img
                width={100}
                className="rounded-full pr-2"
                src="https://eztrade.fpts.com.vn/Content/images/avatar_ano.png"
                alt=""
              />
              <Box>
                <Typography paddingTop={2}>Nguyễn Xuân Hiệp</Typography>
                <button className="bg-[#339cdf] btnTTTK">
                  Thông tin chủ tài khoản
                </button>
              </Box>
            </Box>
            <Box>
              <div className="grid">
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Chuyên Viên Quản lý tài khoản
                </a>
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Thay đổi mật khẩu
                </a>
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Quản trị Token
                </a>
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Hoạt động gần đây
                </a>
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Cài đặt mặt khẩu giao dịch
                </a>
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Hướng dẫn xóa cache
                </a>
                <a className="p-3 listmenu-item text-xs	" href="#">
                  Hỗ trợ ngôn ngữ
                </a>
                <a className="pl-4 pt-3 hover:text-[#034e95] text-xs	" href="#">
                  Thoát
                </a>
              </div>
            </Box>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
