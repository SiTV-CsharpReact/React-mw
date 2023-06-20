import { Box, Button, Typography, Tooltip, Popover } from "@mui/material";
import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import menuImage from "../../images/menu.png";
import avatarImage from "../../images/avatar_ano.png";
import { useTranslation } from "react-i18next";
import useDarkMode from "./useDarkMode";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { changeModeTheme } from "./DarkModeSlice";
// import { changeTheme } from "./DarkModeSlice";
const ProfileAccount: any = () => {
  const { i18n } = useTranslation(["home", "report"]);
  const { t } = useTranslation(["home"]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAccount, setOpenAccount] = useState(false);
  // const mode = "light";
  // const { toogleSwitch, mode } = useDarkMode();
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const dispatch = useAppDispatch();

  const openPopupAccount = Boolean(anchorEl);
  const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (lng: "EN" | "VN") => {
    i18n.changeLanguage(lng);
  };

  const changeTheme = (theme: string) => {
    dispatch(changeModeTheme(theme));
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
          <ArrowDropDownIcon sx={{ color: "#2371af", marginLeft: "-3px" }} />
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
        <Box className={`account-info ${mode}-header`}>
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
                  className={`${mode}-text`}
                >
                 VŨ THÀNH ĐÔ
                </Typography>

                <a
                  className={`bg-[#339cdf] ezfu-btn-profile ${mode}-text`}
                  href="https://accounts.fpts.com.vn"
                  target="_blank"
                >
                  {t("home:base.PROFILE_TTCTK")}
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
              className={`${mode}-text`}
            >
              <li>
                <i className="fa fa-user"></i>Chuyên viên quản lý tài khoản
              </li>
            </a>
            <a
              href="https://accounts.fpts.com.vn/account/changePassword"
              target="_blank"
              style={{ color: "black" }}
              className={`${mode}-text`}
            >
              <li>
                {/* <FontAwesomeIcon icon={faKey}  className="icon_account"/> */}
                <i className="fa fa-key"></i>
                {t("home:base.PROFILE_TDMK")}
              </li>
            </a>
            <a
              href="https://accounts.fpts.com.vn/rsa"
              target="_blank"
              style={{ color: "black" }}
              className={`${mode}-text`}
            >
              <li>
                {/* <FontAwesomeIcon icon={faLock} className="icon_account" /> */}
                <i className="fa fa-lock"></i>
                {t("home:base.PROFILE_QTTKEN")}
              </li>
            </a>
            <a
              href="https://accounts.fpts.com.vn/account/activities"
              target="_blank"
              style={{ color: "black" }}
              className={`${mode}-text`}
            >
              <li>
                {/* <FontAwesomeIcon icon={faHistory}  className="icon_account"/> */}
                <i className="fa fa-history"></i>
                {t("home:base.PROFILE_HDGD")}
              </li>
            </a>
            <a
              href="https://accounts.fpts.com.vn/OptionsPassword"
              target="_blank"
              style={{ color: "black" }}
              className={`${mode}-text`}
            >
              <li>
                {/* <FontAwesomeIcon icon={faUnlockAlt}  className="icon_account"/> */}
                <i className="fa fa-unlock-alt"></i>
                {t("home:base.PROFILE_CDMKGG")}
              </li>
            </a>
            <a
              href="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/cau-hoi-thuong-gap/"
              target="_blank"
              style={{ color: "black" }}
              className={`${mode}-text`}
            >
              <li>
                {/* <FontAwesomeIcon icon={faQuestionCircle}  className="icon_account"/> */}
                <i className="fa fa-question-circle"></i>
                {t("home:base.PROFILE_HDXC")}
              </li>
            </a>
            <a
              href="https://accounts.fpts.com.vn/account/Comment"
              target="_blank"
              style={{ color: "black" }}
              className={`${mode}-text`}
            >
              <li>
                {/* <FontAwesomeIcon icon={faPenSquare}  className="icon_account"/> */}
                <i className="fa fa-pencil-square-o"></i>
                {t("home:base.PROFILE_GY")}
              </li>
            </a>
            <li className={`ezfu-language ${mode}-text`}>
              {/* <FontAwesomeIcon icon={faLanguage}  className="icon_account"/> */}
              <i className="fa fa-language"></i>
              <span>   {t("home:base.PROFILE_HTNN")}:</span>
              <span
                className={`px-3 text-textLanguage ${mode}-text`}
                onClick={() => changeLanguage("VN")}
              >
                Tiếng Việt
              </span>
              <span>|</span>
              <span
                className={`px-3 text-textLanguage ${mode}-text`}
                onClick={() => changeLanguage("EN")}
              >
                English
              </span>
            </li>
            <li className={`ezfu-language ${mode}-text`}>
              {/* <FontAwesomeIcon icon={faLanguage}  className="icon_account"/> */}
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <span>  {t("home:base.PROFILE_GD")}</span>
              <span
                className="px-3 text-textLanguage absolute left-[200px]"
                // onClick={() => changeLanguage("VN")}
              >
                <span className="mx-1" onClick={() => changeTheme("light")}>
                  <i className="fa fa-sun-o" aria-hidden="true"></i>
                </span>
                <span className="mx-1" onClick={() => changeTheme("dark")}>
                  <i className="fa fa-moon-o" aria-hidden="true"></i>
                </span>
                <span className="mx-1" onClick={() => changeTheme("green")}>
                  <i className="fa fa-meh-o" aria-hidden="true"></i>
                </span>
              </span>
              {/* <span>|</span> */}
            </li>
            <a
              href="/LogOut"
              style={{ color: "black" }}
              id="idLogOut"
              className={`${mode}-text`}
            >
              <li>
                <i className="fa fa-sign-out"></i>
                {/* <FontAwesomeIcon icon={faSignOut}  className="icon_account"/> */}
                {t("home:base.PROFILE_T")}
              </li>
            </a>
          </ul>
        </Box>
      </Popover>
    </Box>
  );
};

export default React.memo(ProfileAccount)
