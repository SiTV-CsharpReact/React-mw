import React from "react";
import { RootState, useAppSelector } from "../../store/configureStore";
import "./SearchStyle.scss"
import { Company } from "../../models/root";
type Props = {
  showPopup?: boolean;
  setShowPoup?: any;
  ChangeFunction?: any;
  valueInput: string;
  setValueInput: any;
  border ? : boolean
  SearchStockCode: any;
};
const SearchStockCode = ({
  showPopup,
  setShowPoup,
  ChangeFunction,
  valueInput,
  SearchStockCode,
  setValueInput,
  border 
}: Props) => {
  const { dataCompanyTotal } = useAppSelector(
    (state: RootState) => state.company
  );
  //  chữ tìm kiếm màu đỏ
  const getHighlightedText = (text: string, highlight: string) => {
    const input = valueInput.toLowerCase();
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
    // };
  };
  // lọc Chữ
  const searchResults =
    dataCompanyTotal &&
    dataCompanyTotal.filter((item:Company) => {
      let name = `${item.Code} "-" ${
        item.Exchange === 1 ? "HSX" : item.Exchange === 2 ? "HNX" : "UPCOM"
      } "-" ${item.ScripName}`;
      const NameTo = name.toLowerCase().startsWith(valueInput.toLowerCase());
      return NameTo;
    });
  const AddStockCode = (stockCode: Company) => {
    setShowPoup(!showPopup);
    ChangeFunction(stockCode);
    SearchStockCode(stockCode);
    setValueInput("");
  };
  return (
    <>
      {showPopup ? (
        <div
          style={{ overflowY: "scroll" }}
          className= {` ${border ?  "" : "NoneBoder" } menuSearch  w-[500px]  overflow-hidden shadow-2xl left-[25%] top-[36px] z-50 h-[310px] bg-[#FBFBFB] rounded-sm absolute `}
        >
          <ul >
            {dataCompanyTotal && dataCompanyTotal.length > 0
              ? searchResults.map((item: Company, index: number) => {
               
                  let name = `${item.Code} - ${
                    item.Exchange === 1
                      ? "HSX"
                      : item.Exchange === 2
                      ? "HNX"
                      : "UPCOM"
                  } - ${item.ScripName}`;
                  return (
                    <>
                      <li className={border ? "liboder" : "LinoneBorder"} key={index} onClick={() => AddStockCode(item)}>
                        {getHighlightedText(name, valueInput)}
                      </li>
                    </>
                  );
                })
              : ""}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default React.memo(SearchStockCode);
