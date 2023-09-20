import React, { ChangeEvent, useState } from "react";
import SearchStockCode from "../../SearchStockCode/SearchStockCode";
import { ICompany } from "../../../models/root";

const SearchComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [popup, setPopup] = useState<boolean>(false);
  const [stockCode, setStockCode] = useState<ICompany>({
    Code: "",
    Exchange: 0,
    ScripName: "",
    Basic_Price: 0,
    Ceiling_Price: 0,
    Floor_Price: 0,
    Stock_Type2: 0,
    ScripNameEN: "",
    ID: "",
  });
  return (
    <div className="pu-grtitle">
      <div className="pu-div-search">
        <div className="ms-sel-ctn">
          <input
            type="text"
            placeholder="Nhập mã Chứng khoán"
            autoComplete="nofill"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value.toUpperCase())
            }
            onClick={() => setPopup(true)}
            className="cursor-pointer"
            value={input}
          />
        </div>
        <div className="ms-trigger">
          <i className="fa fa-search"></i>
        </div>
        <SearchStockCode
          input={input}
          setInput={setInput}
          popup={popup}
          setPopup={setPopup}
          setStockCode={setStockCode}
        />
      </div>
      <div className="inline-block pu-div-title">
        <h2 className="pu-title">
          {stockCode.Code
            ? `${stockCode.Code} - ${
                stockCode.Exchange === 1
                  ? "HSX"
                  : stockCode.Exchange === 2
                  ? "HNX"
                  : "UPCOM"
              } - ${stockCode.ScripName}`
            : ""}
        </h2>
      </div>
    </div>
  );
};

export default SearchComponent;
