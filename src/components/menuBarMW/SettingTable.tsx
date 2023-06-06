import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import "./menuBar.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  IIndex,
  INDEX_TYPE,
  paramsMarketwatch,
} from "../indexMarketWatch/marketShowSlice";
import { ColCompoent, SettingBodyComponent } from "./SettingItemTable";

export interface IData {
  key: string;
  value: boolean;
}

const SettingTable = () => {
  const [open, setOpen] = React.useState(false);
  const { INDEX } = useAppSelector((state) => state.settingMarketwatch);
  const [type, setType] = useState<IIndex>(INDEX);
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (t: string) => {
    if (t === "save") {
      dispatch(paramsMarketwatch(type));
      setOpen(false);
      setText("");
    } else {
      setOpen(false);
    }
  };

  const handleSettingDefault = () => {
    setType(INDEX_TYPE);
    setText("setting");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = { ...type, [e.target.name]: e.target.checked };
    if (e.target.name === "smart_symbol_up") {
      query = {
        ...type,
        smart_symbol_down: false,
        smart_symbol_up: true,
      };
    }
    if (e.target.name === "smart_symbol_down") {
      query = {
        ...type,
        smart_symbol_up: false,
        smart_symbol_down: true,
      };
    }
    if (e.target.name === "prior_textbox_priceF") {
      query = {
        ...type,
        prior_textbox_qtyF: false,
        prior_textbox_priceF: true,
      };
    }
    if (e.target.name === "prior_textbox_qtyF") {
      query = {
        ...type,
        prior_textbox_priceF: false,
        prior_textbox_qtyF: true,
      };
    }
    setType(query);
  };
  return (
    <div className="btn-setting">
      <Tooltip title="Thiết lập Giao diện">
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
              overflowY: "unset", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center border-b border-[#e5e5e5] flex justify-between"
          sx={{ padding: "10px 15px" }}
        >
          <Box className="iconcustom"></Box>
          <Typography sx={{ paddingTop: "8px", fontSize: 18, fontWeight: 500 }}>
            Thiết lập Giao diện
          </Typography>
          {/* {"Thiết lập Giao diện"} */}
          <Tooltip title="Đóng">
            <IconButton onClick={() => handleClose("close")}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent
          sx={{
            width: 1050,
            maxWidth: "100%",
            padding: "0px 5px!important",
            overflowY: "unset",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <div className="modal-body text-black">
              <div className="item-settings index-settings" id="index-settings">
                <div className="settings-content">
                  <div className="settings-header">
                    <div className="content">
                      <span className="imgChart" />
                      <label className="lbText text-16px">
                        Lựa chọn chỉ số
                      </label>
                    </div>
                  </div>
                  <div className="settings-body pt-2">
                    <div className="row">
                      <div
                        className="text-right"
                        style={{ width: "100px", paddingLeft: "20px" }}
                      >
                        HOSE :{" "}
                      </div>
                      <div className="w-5/6 px-4">
                        <div className="row">
                          <ColCompoent
                            name="VNXALL"
                            checked={type.VNXALL}
                            handleChange={handleChange}
                            htmlFor="cbChartVNXALL"
                            id="cbChartVNXALL"
                          />
                          <ColCompoent
                            name="VNI"
                            id="cbChartVNI"
                            checked={type.VNI}
                            handleChange={handleChange}
                            htmlFor="cbChartVNI"
                          />
                          <ColCompoent
                            name="VN30"
                            id="cbChartVN30"
                            checked={type.VN30}
                            handleChange={handleChange}
                            htmlFor="cbChartVN30"
                          />
                          <ColCompoent
                            name="VN100"
                            id="cbChartVN100"
                            checked={type.VN100}
                            handleChange={handleChange}
                            htmlFor="cbChartVN100"
                          />
                          <ColCompoent
                            name="VNALL"
                            id="cbChartVNALL"
                            checked={type.VNALL}
                            handleChange={handleChange}
                            htmlFor="cbChartVNALL"
                          />
                          <ColCompoent
                            name="VNMID"
                            id="cbChartVNMID"
                            checked={type.VNMID}
                            handleChange={handleChange}
                            htmlFor="cbChartVNMID"
                          />
                          <ColCompoent
                            name="VNSML"
                            id="cbChartVNSML"
                            checked={type.VNSML}
                            handleChange={handleChange}
                            htmlFor="cbChartVNSML"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-right" style={{ width: "100px" }}>
                        HNX.NY :{" "}
                      </div>
                      <div className="w-5/6 px-4">
                        <div className="row">
                          <ColCompoent
                            name="HNX"
                            id="cbChartHNX"
                            checked={type.HNX}
                            handleChange={handleChange}
                            htmlFor="cbChartHNX"
                          />
                          <ColCompoent
                            name="HNX"
                            id="cbChartHNX"
                            checked={type.HNX}
                            handleChange={handleChange}
                            htmlFor="cbChartHNX"
                          />
                          <ColCompoent
                            name="HNX30"
                            id="cbChartHNX30"
                            checked={type.HNX30}
                            handleChange={handleChange}
                            htmlFor="cbChartHNX30"
                          />
                          <ColCompoent
                            name="HNXLCAP"
                            id="cbChartHNXLCAP"
                            checked={type.HNXLCAP}
                            handleChange={handleChange}
                            htmlFor="cbChartHNXLCAP"
                          />
                          <ColCompoent
                            name="HNXSMCAP"
                            id="cbChartHNXSMCAP"
                            checked={type.HNXSMCAP}
                            handleChange={handleChange}
                            htmlFor="cbChartHNXSMCAP"
                          />
                          <ColCompoent
                            name="HNXFIN"
                            id="cbChartHNXFIN"
                            checked={type.HNXFIN}
                            handleChange={handleChange}
                            htmlFor="cbChartHNXFIN"
                          />
                          <ColCompoent
                            name="HNXMAN"
                            id="cbChartHNXMAN"
                            checked={type.HNXMAN}
                            handleChange={handleChange}
                            htmlFor="cbChartHNXMAN"
                          />
                          <ColCompoent
                            name="HNXCON"
                            id="cbChartHNXCON"
                            checked={type.HNXCON}
                            handleChange={handleChange}
                            htmlFor="cbChartHNXCON"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-right" style={{ width: "100px" }}>
                        HNX.UPCOM :{" "}
                      </div>
                      <div className="w-5/6 px-4">
                        <div className="row">
                          <ColCompoent
                            name="UPCOM"
                            id="cbChartUPCOM"
                            checked={type.UPCOM}
                            handleChange={handleChange}
                            htmlFor="cbChartUPCOM"
                          />
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
                    <div className="row pt-1.5 w-5/6">
                      <ColCompoent
                        id="cbcol4"
                        name="cbcol4"
                        checked={type.cbcol4}
                        handleChange={handleChange}
                        htmlFor="cbcol4"
                        labelName="Dư mua - KL4"
                      />
                      <ColCompoent
                        id="cbcol20"
                        name="cbcol20"
                        checked={type.cbcol20}
                        handleChange={handleChange}
                        htmlFor="cbcol20"
                        labelName="Dư bán - KL4"
                      />
                      <ColCompoent
                        id="cbcol25"
                        name="cbcol25"
                        checked={type.cbcol25}
                        handleChange={handleChange}
                        htmlFor="cbcol25"
                        labelName="Trung bình"
                      />
                      <ColCompoent
                        id="cbcol28"
                        name="cbcol28"
                        checked={type.cbcol28}
                        handleChange={handleChange}
                        htmlFor="cbcol28"
                        labelName="Room còn lại"
                      />
                      <div className="col"></div>
                    </div>
                    <div className="row w-5/6">
                      <ColCompoent
                        id="cbcol22"
                        name="cbcol22"
                        checked={type.cbcol22}
                        handleChange={handleChange}
                        htmlFor="cbcol22"
                        labelName="Mở cửa"
                      />
                      <ColCompoent
                        id="cbcol23"
                        name="cbcol23"
                        checked={type.cbcol23}
                        handleChange={handleChange}
                        htmlFor="cbcol23"
                        labelName="Cao nhất"
                      />
                      <ColCompoent
                        id="cbcol24"
                        name="cbcol24"
                        checked={type.cbcol24}
                        handleChange={handleChange}
                        htmlFor="cbcol24"
                        labelName="Thấp nhất"
                      />
                      <ColCompoent
                        id="cbcol26"
                        name="cbcol26"
                        checked={type.cbcol26}
                        handleChange={handleChange}
                        htmlFor="cbcol26"
                        labelName="NN mua"
                      />
                      <ColCompoent
                        id="cbcol27"
                        name="cbcol27"
                        checked={type.cbcol27}
                        handleChange={handleChange}
                        htmlFor="cbcol27"
                        labelName="NN bán"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SettingBodyComponent
                labelTitle="Tính năng thêm mã thông minh"
                input={true}
                checked_1={type.smart_symbol_up}
                handleChange={handleChange}
                labelCol="Vị trí thêm mã mới:"
                checked_2={type.smart_symbol_down}
              />
              <SettingBodyComponent
                labelTitle="Lựa chọn nhập thông tin Giá / Khối lượng trước"
                input={false}
                checked_1={type.prior_textbox_priceF}
                handleChange={handleChange}
                labelCol="Ưu tiên:"
                checked_2={type.prior_textbox_qtyF}
              />
              <div className="item-settings border-b border-[#e5e5e5]">
                <div className="row">
                  <div className="col-md-12">
                    <button
                      id="btnResetChart"
                      className="px-3.5 rounded-sm py-1.5 text-white bg-[#22b14c] hover:bg-[#2371AF] float-left"
                      type="button"
                      style={{ marginLeft: "30px" }}
                      onClick={handleSettingDefault}
                    >
                      Thiết lập mặc định
                    </button>
                    {text && (
                      <p className="sp-reset-chart">
                        Vui lòng chọn Lưu để hoàn tất thiết lập
                      </p>
                    )}
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
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "30px" }}>
          <button
            id="btnResetChart"
            className="px-7 rounded-sm py-0.5 text-white bg-[#717171] hover:bg-[#2371AF] shadow-lg"
            type="button"
            onClick={() => handleClose("save")}
          >
            Lưu
          </button>
          <button
            id="btnResetChart"
            className="px-7 rounded-sm py-0.5 text-white bg-[#717171] hover:bg-[#2371AF] shadow-lg"
            type="button"
            style={{ marginLeft: "30px" }}
            onClick={() => handleClose("close")}
          >
            Đóng
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(SettingTable);
