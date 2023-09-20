import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import "./SearchStyle.scss";
import { ICompany } from "../../models/root";
import { fetchDataDetailPopupAsync } from "../tablePopupMarketwatch/dataTablePopupDetailSlice";
import { showDetailStock } from "../popupTableMarketwatch/popupTableSlice";

type TProps = {
  input: string;
  popup: boolean;
  setInput: (str: string) => void;
  setPopup: (type: boolean) => void;
  setStockCode: (item: ICompany) => void
};

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
const SearchStockCode: React.FC<TProps> = ({
  input,
  popup,
  setInput,
  setPopup,
  setStockCode
}) => {
  const dispatch = useAppDispatch();
  const { dataCompanyTotal } = useAppSelector((state) => state.company);
  const handleAddStockCode = (item: ICompany) => {
    const floor = item.Exchange === 1 ? "HSX" : "HNX";
    setPopup(false);
    setInput("");
    setStockCode(item);
    dispatch(fetchDataDetailPopupAsync({ floor, stockCode: item.Code }));
     dispatch(showDetailStock({ visible: true, code: item.Code }));
  };

  return (
    <React.Fragment>
      {popup && (
        <div className={`form-search `}>
          <ul>
            {renderListStockCode(dataCompanyTotal, input).map((item, index) => {
              const name = `${item.Code} - ${
                item.Exchange === 1
                  ? "HOSE"
                  : item.Exchange === 2
                  ? "HNX.NY"
                  : "HNX.UPCOM"
              } - ${item.ScripName}`;
              return <li key={index} onClick={() => handleAddStockCode(item)}>{getHighlightedText(name, input)}</li>;
            })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};
export default React.memo(SearchStockCode);
