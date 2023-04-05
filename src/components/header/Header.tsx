import {
  Box,
  Tooltip,
  Button
} from "@mui/material";
import "./styleHeader.css";
import ListMenu from "./listMenu";
import { Link } from "react-router-dom";
// import "../../styles/sidebar.css";
import "../../styles/header.css";
import exchangeImage from "../../images/exchange1.png";
import "font-awesome/css/font-awesome.min.css";
import ListService from "./ListService";
import NotiHeader from "./NotiHeader";
import ProfileAccount from "./ProfileAccount";
const Header = () => {
  return (
    <Box component="header" className="fpts-header" id="header-fpts">
      <div className="header-left">
        <Link to="/" className="text-fontLogo font-bold italic">
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
                marginRight:2
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
        <ListService/>
      <NotiHeader/>
      <ProfileAccount/> 
      </Box>
    
    </Box>
  );
};

export default Header;
