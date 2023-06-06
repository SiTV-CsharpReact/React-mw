import React from "react";

interface TPropsColoumn {
  checked: boolean;
  name: string;
  handleChange: any;
  htmlFor: string;
  id: string;
  labelName?: string;
}

interface TPropsSetting {
  checked?: boolean;
  input: boolean;
  labelTitle: string;
  labelCol: string;
  handleChange: any;
  checked_1: boolean;
  checked_2: boolean;
}

export const ColCompoent: React.FC<TPropsColoumn> = ({
  checked,
  name,
  handleChange,
  htmlFor,
  id,
  labelName,
}: TPropsColoumn) => {
  return (
    <div className="col">
      <div className="clsAllIndex">
        <input
          type="checkbox"
          className="cbCheck priceboard2"
          name={name}
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={htmlFor}>{labelName ? labelName : name}</label>
      </div>
    </div>
  );
};

export const SettingBodyComponent: React.FC<TPropsSetting> = ({
  checked,
  checked_1,
  checked_2,
  handleChange,
  // id,
  input,
  labelTitle,
  labelCol,
}: TPropsSetting) => {
  return (
    <div
      className="item-settings smart-symbole-settings"
      id="smart-symbole-settings"
    >
      <div className="settings-content">
        <div className="settings-header">
          {input ? (
            <div className="content">
              <span className="imgTable" />
              <label className="lbText text-16px">{labelTitle}</label>
              <label className="switch" title={labelTitle}>
                <input type="checkbox" id="SymbolSmartOnOFF" />
                <span className="slider round" />
              </label>
            </div>
          ) : (
            <div className="content">
              <span className="imgTable" />
              <label className="lbText text-16px">{labelTitle}</label>
            </div>
          )}
        </div>
        <div className="settings-body">
          <div className="row w5/6">
            <div className="col !max-w-[16%]">
              <b
                style={{
                  marginLeft: "30px",
                  height: "18px",
                  display: "inline-block",
                  verticalAlign: "bottom",
                  marginTop: "3px",
                }}
              >
                {labelCol}
              </b>
            </div>
            <div className="col !max-w-[16%]">
              <div style={{ marginLeft: "17px" }}>
                <div className="clsAllIndex">
                  <input
                    type="radio"
                    className="cbRadio priceboard2"
                    name={input ? "smart_symbol_up" : "prior_textbox_priceF"}
                    id={input ? "up" : "priceF"}
                    style={{
                      verticalAlign: "sub",
                      margin: "4px 4px 0 4px",
                      lineHeight: "normal !important",
                    }}
                    checked={checked_1}
                    onChange={handleChange}
                  />
                  <label htmlFor={input ? "up" : "priceF"}>
                    {input ? "Đầu danh mục" : "Nhập Giá trước"}
                  </label>
                </div>
              </div>
            </div>
            <div className={input ? "col max-w-[16%]" : "col !max-w-[25%]"}>
              <div style={{ marginLeft: "9px" }}>
                <div className="clsAllIndex">
                  <input
                    type="radio"
                    className="cbRadio priceboard2"
                    name={input ? "smart_symbol_down" : "prior_textbox_qtyF"}
                    id={input ? "down" : "qtyF"}
                    checked={checked_2}
                    onChange={handleChange}
                    style={{
                      verticalAlign: "sub",
                      margin: "4px 4px 0 4px",
                      lineHeight: "normal !important",
                    }}
                  />
                  <label htmlFor={input ? "down" : "qtyF"}>
                    {input ? "Cuối danh mục" : "Nhập Khối lượng trước"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
