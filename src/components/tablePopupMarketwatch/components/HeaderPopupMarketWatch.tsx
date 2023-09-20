import React, { ChangeEvent, useEffect, useState } from "react";
import SearchStockCode from "../../SearchStockCode/SearchStockCode";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { ICompany } from "../../../models/root";
import { fetchDataDetailPopupAsync } from "../dataTablePopupDetailSlice";
import { fetchCompanyAsync } from "../../companyMarketwatch/companyMarketwatchSlice";

interface MyComponentProps {
  children: React.ReactNode; // ReactNode cho phép bạn truyền bất kỳ loại children nào
}

export const FormComponent: React.FC<MyComponentProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompanyAsync());
  }, [dispatch]);
  return <div className="flex pu-grtitle">{children}</div>;
};

export const SearchComponent = () => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.popupTable);
  const { dataCompanyTotal } = useAppSelector((state) => state.company);
  const [value, setValue] = useState<string>("");
  const [popup, setPopup] = useState<boolean>(false);
  const [stockCode, setStockCode] = useState<ICompany | undefined>({
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

  useEffect(() => {
    const name = dataCompanyTotal.find((item) => item.Code === code);
    setStockCode(name);
  }, [code, dataCompanyTotal]);

  return (
    <div className="m-auto">
      <div className="pu-div-search">
        <div
          className="relative ms-ctn form-control"
          style={{ border: "1px solid #ccc" }}
          id="ipSearchCode"
        >
          <div className="ms-sel-ctn">
            <input
              type="text"
              placeholder="Nhập mã Chứng khoán"
              autoComplete="nofill"
              onChange={(e) => setValue(e.target.value.toUpperCase())}
              onClick={() => setPopup(true)}
              className="cursor-pointer"
              value={value}
            />
          </div>
          <div className="ms-trigger">
            <div className="fa fa-search top-[2px] absolute left-[2px]" />
          </div>
          {popup && (
            <SearchStockCode
              value={value}
              setPopup={setPopup}
              popup={popup}
              // handleAddStockCode={handleAddStockCode}
              setStockCode={setStockCode}
              setValue={setValue}
              border={true}
            />
          )}
        </div>
      </div>
      <div className="inline-block pu-div-title">
        <h2 className="pu-title">
          {stockCode?.Code
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
