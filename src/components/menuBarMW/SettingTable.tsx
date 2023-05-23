import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,Tooltip, Typography, IconButton, Box } from '@mui/material'
import React, { useState } from 'react'
import "./menuBar.scss"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import settingSlice, { addTable } from './settingSlice';
// const useStyles = makeStyles(() => ({
//   paper: { minWidth: "500px" },
// }));


const SettingTable = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
   const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [iChecked, setIChecked] = useState<boolean>(false)


  const handleCheckboxChange = (e :any) => {
    const newVal = e.target as HTMLInputElement
    let data = {
      name: newVal.name
    }
    // console.log(data);
    
    // setIsChecked(newValue);
    dispatch(addTable(data));
  }

  const handleCheckbox = (e :any) => {
    const newVal = e.target as HTMLInputElement
    let data = {
      name: newVal.name
    }
    // console.log(data);
    // setIsChecked(newValue);
    dispatch(addTable(data));
  }
  
  return (
    <div className="btn-setting">
    <Tooltip title="Thiết lập Giao diện">
      {/* <Button  className="imgCustom" variant="outlined" >
</Button> */}
      <span
        id="btCustom"
        className="imgCustom"
        data-toggle="modal"
        data-target="#mdCustom"
        onClick={handleClickOpen}
      />
    </Tooltip>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1000px", 
            overflowY:'unset' // Set your width here
          },
        },
      }}
    >
 
      <DialogTitle  id="alert-dialog-title" className='text-center border-b border-[#e5e5e5] flex justify-between' sx={{padding:'10px 15px'}} >
      <Box className='iconcustom'></Box>
      <Typography sx={{paddingTop:"8px",fontSize:18,fontWeight:500}}>Thiết lập Giao diện</Typography>
        {/* {"Thiết lập Giao diện"} */}
        <Tooltip title="Đóng">
          <IconButton
           onClick={handleClose}>
          <CloseIcon/>
          </IconButton>
       
        </Tooltip>
   
      </DialogTitle>
      <DialogContent sx={{width:1050,maxWidth:"100%",padding:'0px 5px!important',overflowY:'unset'}}>
        <DialogContentText id="alert-dialog-description">
          <div className="text-black modal-body">
            <div
              className="item-settings index-settings"
              id="index-settings"
            >
              <div className="settings-content">
                <div className="settings-header">
                  <div className="content">
                    <span className="imgChart" />
                    <label className="lbText text-16px">Lựa chọn chỉ số</label>
                  </div>
                </div>
                <div className="pt-2 settings-body">
                  <div className="row">
                    <div
                      className="text-right"
                      style={{ width: "100px", paddingLeft: "20px" }}
                    >
                      HOSE :{" "}
                    </div>
                    <div className="w-5/6 px-4">
                      <div className="row">
                      <div className="col">
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VNXALL"
                              id="cbChartVNXALL"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="cbChartVNXALL">VNXALL</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VNI"
                                id="cbChartVNI"
                                checked={iChecked}
                              onChange={handleCheckbox}
                            />
                            <label htmlFor="cbChartVNI">VNI</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VN30"
                              id="cbChartVN30"
                            />
                            <label htmlFor="cbChartVN30">VN30</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VN100"
                              id="cbChartVN100"
                            />
                            <label htmlFor="cbChartVN100">VN100</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VNALL"
                              id="cbChartVNALL"
                            />
                            <label htmlFor="cbChartVNALL">VNALL</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VNMID"
                              id="cbChartVNMID"
                            />
                            <label htmlFor="cbChartVNMID">VNMID</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="VNSML"
                              id="cbChartVNSML"
                            />
                            <label htmlFor="cbChartVNSML">VNSML</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="text-right"
                      style={{ width: "100px", }}
                    >
                      HNX.NY :{" "}
                    </div>
                    <div className="w-5/6 px-4">
                      <div className="row">
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNX"
                              id="cbChartHNX"
                            />
                            <label htmlFor="cbChartHNX">HNX</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNX30"
                              id="cbChartHNX30"
                            />
                            <label htmlFor="cbChartHNX30">HNX30</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNXLCAP"
                              id="cbChartHNXLCAP"
                            />
                            <label htmlFor="cbChartHNXLCAP">
                              HNXLCAP
                            </label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNXSMCAP"
                              id="cbChartHNXSMCAP"
                            />
                            <label htmlFor="cbChartHNXSMCAP">
                              HNXSMCAP
                            </label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNXFIN"
                              id="cbChartHNXFIN"
                            />
                            <label htmlFor="cbChartHNXFIN">HNXFIN</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNXMAN"
                              id="cbChartHNXMAN"
                            />
                            <label htmlFor="cbChartHNXMAN">HNXMAN</label>
                          </div>
                        </div>
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="HNXCON"
                              id="cbChartHNXCON"
                            />
                            <label htmlFor="cbChartHNXCON">HNXCON</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="text-right"
                      style={{ width: "100px" }}
                    >
                      HNX.UPCOM :{" "}
                    </div>
                    <div className="w-5/6 px-4">
                      <div className="row">
                        <div className="col" >
                          <div className="clsAllIndex">
                            <input
                              type="checkbox"
                              className="cbCheck priceboard2"
                              name="UPCOM"
                              id="cbChartUPCOM"
                            />
                            <label htmlFor="cbChartUPCOM">UPCOM</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="item-settings priceboard-settings"
              id="priceboard-settings"
            >
              <div className="settings-content">
                <div className="settings-header">
                  <div className="content">
                    <span className="imgTable" />
                    <label className="lbText text-16px">
                      Lựa chọn cột thông tin
                    </label>
                  </div>
                </div>
                <div className="settings-body ">
                  <div className="row pt-1.5 w-5/6" >
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                    
                          id="cbcol4"
                        />
                        <label htmlFor="cbcol4">Dư mua - KL4</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                      
                          id="cbcol20"
                        />
                        <label htmlFor="cbcol20">Dư bán - KL4</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                        
                          id="cbcol25"
                        />
                        <label htmlFor="cbcol25">Trung bình</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                 
                          id="cbcol28"
                        />
                        <label htmlFor="cbcol28">Room còn lại</label>
                      </div>
                    </div>
                    <div className="col" >
                     
                    </div>
                  </div>
                  <div className="w-5/6 row">
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                      
                          id="cbcol22"
                        />
                        <label htmlFor="cbcol22">Mở cửa</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                       
                          id="cbcol23"
                        />
                        <label htmlFor="cbcol23">Cao nhất</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                         
                          id="cbcol24"
                        />
                        <label htmlFor="cbcol24">Thấp nhất</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                         
                          id="cbcol26"
                        />
                        <label htmlFor="cbcol26">NN mua</label>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="clsAllIndex">
                        <input
                          type="checkbox"
                          className="cbCheck priceboard2"
                     
                          id="cbcol27"
                        />
                        <label htmlFor="cbcol27">NN bán</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="item-settings smart-symbole-settings"
              id="smart-symbole-settings"
            >
              <div className="settings-content">
                <div className="settings-header">
                  <div className="content">
                    <span className="imgTable" />
                    <label className="lbText text-16px">
                      Tính năng thêm mã thông minh
                    </label>
                    <label
                      className="switch"
                      title="Tắt tính năng thêm mã thông minh"
                    >
                      <input
                        type="checkbox"
                        
                        id="SymbolSmartOnOFF"
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </div>
                <div className="settings-body">
                  <div className="row w5/6">
                    <div className="col max-w-[16%!important]">
                      <b
                        style={{
                          marginLeft: "30px",
                          height: "18px",
                          display: "inline-block",
                          verticalAlign: "bottom",
                          marginTop: "3px",
                        }}
                      >
                        Vị trí thêm mã mới:
                      </b>
                    </div>
                    <div className="col max-w-[16%!important]">
                      <div style={{ marginLeft: "17px" }}>
                        <div className="clsAllIndex">
                          <input
                            type="radio"
                            className="cbRadio priceboard2"
                            name="smart_symbol"
                            id="up"
                            style={{
                              verticalAlign: "sub",
                              margin: "4px 4px 0 4px",
                              lineHeight: "normal !important",
                            }}
                          />
                          <label htmlFor="up">Đầu danh mục</label>
                        </div>
                      </div>
                    </div>
                    <div className="col max-w-[16%]">
                      <div style={{ marginLeft: "9px" }}>
                        <div className="clsAllIndex">
                          <input
                            type="radio"
                            className="cbRadio priceboard2"
                            name="smart_symbol"
                            id="down"
                            style={{
                              verticalAlign: "sub",
                              margin: "4px 4px 0 4px",
                              lineHeight: "normal !important",
                            }}
                          />
                          <label htmlFor="down">Cuối danh mục</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="item-settings prior-textbox-settings"
              id="prior-textbox-settings"
            >
              <div className="settings-content">
                <div className="settings-header">
                  <div className="content">
                    <span className="imgTable" />
                    <label className="lbText text-16px">
                      Lựa chọn nhập thông tin Giá / Khối lượng trước
                    </label>
                  </div>
                </div>
                <div className="settings-body">
                  <div className="row w5/6">
                    <div className="col max-w-[16%!important]">
                      <b
                        style={{
                          marginLeft: "30px",
                          height: "18px",
                          display: "inline-block",
                          verticalAlign: "bottom",
                          marginTop: "3px",
                        }}
                      >
                        Ưu tiên:
                      </b>
                    </div>
                    <div className="col max-w-[16%!important]">
                      <div style={{ marginLeft: "17px" }}>
                        <div className="clsAllIndex">
                          <input
                            type="radio"
                            className="cbRadio priceboard2"
                            name="prior_textbox"
                            id="priceF"
                            style={{
                              verticalAlign: "sub",
                              margin: "4px 4px 0 4px",
                              lineHeight: "normal !important",
                            }}
                          />
                          <label htmlFor="priceF">Nhập Giá trước</label>
                        </div>
                      </div>
                    </div>
                    <div className="col max-w-[25%!important]">
                      <div style={{ marginLeft: "9px" }}>
                        <div className="clsAllIndex">
                          <input
                            type="radio"
                            className="cbRadio priceboard2"
                            name="prior_textbox"
                            id="qtyF"
                            style={{
                              verticalAlign: "sub",
                              margin: "4px 4px 0 4px",
                              lineHeight: "normal !important",
                            }}
                          />
                          <label htmlFor="qtyF">
                            Nhập Khối lượng trước
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-settings border-b border-[#e5e5e5]">
              <div className="row">
                <div className="col-md-12">
                  <button
                    id="btnResetChart"
                    className="px-3.5 rounded-sm py-1.5 text-white bg-[#22b14c] hover:bg-[#2371AF] "
                    type="button"
                    style={{ marginLeft: "30px" }}
                  >
                    Thiết lập mặc định
                  </button>
                  {/* <p className="sp-reset-chart">
                    Vui lòng chọn Lưu để hoàn tất thiết lập
                  </p> */}
                  <p />
                  <div />
                </div>
                <div className="item-settings">
                  <div className="row">
                    <div className="col-md-12">
                      <p />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent:'center',paddingBottom:'30px' }}>
              <button
                    id="btnResetChart"
                    className="px-7 rounded-sm py-0.5 text-white bg-[#717171] hover:bg-[#2371AF] shadow-lg"
                    type="button"
                
                    onClick={handleClose}
                  >
                    Lưu
                  </button>
                  <button
                    id="btnResetChart"
                    className="px-7 rounded-sm py-0.5 text-white bg-[#717171] hover:bg-[#2371AF] shadow-lg"
                    type="button"
                    style={{ marginLeft: "30px" }}
                    onClick={handleClose}
                  >
                   Đóng
                  </button>
        {/* <Button onClick={handleClose}>Lưu</Button>
        <Button onClick={handleClose} autoFocus>
          Đóng
        </Button> */}
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default React.memo(SettingTable)