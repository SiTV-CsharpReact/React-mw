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
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import ListMenu from "./listMenu";
import { Link } from "react-router-dom";
// import "../../styles/sidebar.css";
import "../../styles/header.css";

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
  const openPopupLanguage = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLanguage = () => {
    setAnchorEl(null);
  };
  const { i18n } = useTranslation(["home", "report"]);
  const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
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
        width:'100%'
      }}
   
      className="header-fpts justify-between"
    >
      <div className="flex">
        <Link to="/" className="text-2xl font-bold italic" >
        <span>
          Ez
        </span>
        <span className="text-colorTextLogo">
          Trade
        </span></Link>
       
        <ListMenu/>
      </div>
        <div></div> 
      <Box className="header-right" display="flex">
      
        {/* <Box>
          <Tooltip title="Ngôn ngữ">
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <GTranslateIcon style={{ color: "#034e95", fontSize: "20px" }} />
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
            <MenuItem onClick={() => changeLanguage("VI")}>
             
              <Typography paddingLeft={1}>Tiếng việt</Typography>
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("EN")} value="Tiếng Anh">
            
              <Typography paddingLeft={1}>Tiếng anh</Typography>
            </MenuItem>
          </Menu>
        </Box> */}
        <Box>
      
        </Box>
   <Box>
   <Tooltip title="Giao dịch chứng khoán phái sinh ">
   <IconButton>
         
             
             </IconButton>
          </Tooltip>

   <Tooltip title="Danh sách">
   <IconButton>
         
             
             </IconButton>
          </Tooltip>
        
   </Box>
     
     
      </Box>
    </Box>
  );
};

export default Header;
