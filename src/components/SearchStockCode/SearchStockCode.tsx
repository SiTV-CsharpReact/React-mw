import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import "./SearchStyle.scss";
import { ICompany } from "../../models/root";
import { fetchDataDetailPopupAsync } from "../tablePopupMarketwatch/dataTablePopupDetailSlice";

type Props = {
  value: string;
  popup: boolean;
  border: boolean;
  setStockCode: (data: ICompany) => void;
  setValue: (value: string) => void;
  setPopup: (type: boolean) => void;
};

//  chữ tìm kiếm màu đỏ
const getHighlightedText = (text: string, keyword: string) => {
  const input = keyword.toLowerCase();
  const startIndex = text.toLowerCase().indexOf(input);
  const endIndex = startIndex + input.length;

  if (startIndex === -1) {
    return text;
  }
  return (
    <>
      {text.substring(0, startIndex)}
      <span className="font-semibold text-[#FF0000]">
        {text.substring(startIndex, endIndex)}
      </span>
      {text.substring(endIndex)}
    </>
  );
};

const renderListStockCode = (dataCompanyTotal: ICompany[], keyword: string) => {
  if (keyword === "") {
    return dataCompanyTotal;
  } else {
    return dataCompanyTotal.filter((item) => item.Code.startsWith(keyword));
  }
};

const SearchStockCode: React.FC<Props> = React.memo(
  ({ value, popup, setValue, setPopup, setStockCode, border }) => {
    const dispatch = useAppDispatch();
    const { dataCompanyTotal } = useAppSelector((state) => state.company);
    console.log({ value });

    const handleAddStockCode = (item: ICompany) => {
      const floor = item.Exchange === 1 ? "HSX" : "HNX";
      setStockCode(item);
      setPopup(false);
      setValue("");
      dispatch(fetchDataDetailPopupAsync({ floor, stockCode: item.Code }));
    };

    return (
      <React.Fragment>
        {popup && (
          <div
            className={`form-search ${
              renderListStockCode(dataCompanyTotal, value).length === 0
                ? "hidden"
                : ""
            }`}
          >
            <ul>
              {renderListStockCode(dataCompanyTotal, value).map(
                (item, index) => {
                  const name = `${item.Code} - ${
                    item.Exchange === 1
                      ? "HOSE"
                      : item.Exchange === 2
                      ? "HNX.NY"
                      : "HNX.UPCOM"
                  } - ${item.ScripName}`;
                  return (
                    <li key={index} onClick={() => handleAddStockCode(item)}>
                      {getHighlightedText(name, value)}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
);
export default SearchStockCode;
