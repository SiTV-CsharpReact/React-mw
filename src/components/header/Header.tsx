import { Box, Tooltip, Button } from "@mui/material";
import "./styleHeader.css";
import "./styleHeader.scss";
import ListMenu from "./listMenu";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import exchangeImage from "../../images/exchange1.png";
import "font-awesome/css/font-awesome.min.css";
import ListService from "./ListService";
import NotiHeader from "./NotiHeader";
import ProfileAccount from "./ProfileAccount";
import useDarkMode from "./useDarkMode";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { setStatusChart } from "../menuBarMW/menuSlice";
import React from "react";
import { statusChartMarketwatch } from "../chartMarketwatch/chartMarketwatchSlice";
import { getActiveMenu } from "./helper/activMenu";
const Header = () => { 
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.settingColorMode);
    const HangdleAction = ()=>{
      dispatch(statusChartMarketwatch({visible:false,code:""}))
      localStorage.setItem("activeMenuHeader","" );
      getActiveMenu();
    }
  return (
    <Box
      component="header"
      className={`fpts-header ${mode}-header`}
      id="header-fpts"
    >
      <div className="header-left">
        <Link to="/" className={`text-fontLogo font-bold italic ${mode}-text`}
          onClick={HangdleAction}>
          <span>Ez</span>
          <span className="text-colorTextLogo">Trade</span>
        </Link>
      </div>
      <ListMenu />
      <Box className="header-right" display="flex">
        <Box>
          <Tooltip title="Giao dịch chứng khoán phát sinh">
            {/* <span className="  uppercase text-sm"> */}
            <Button
              style={{
                padding: "0px !important",
                minWidth: 30,
                marginBottom: 4,
                marginRight: 2,
              }}
            >
              <a href="/">
                <img
                  width={19}
                  height={19}
                  src={exchangeImage}
                  alt="Giao dịch chứng khoán phát sinh"
                />
              </a>
            </Button>
          </Tooltip>
        </Box>
        <ListService />
        <NotiHeader />
        <ProfileAccount />
      </Box>
    </Box>
  );
};

export default React.memo(Header);
