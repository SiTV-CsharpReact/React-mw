import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import "./SearchStyle.scss";
import { Company } from "../../models/root";
import { fetchCompanyAsync } from "../companyMarketwatch/companyMarketwatchSlice";
import { Autocomplete } from "@mui/material";
type Props = {
  indexStockCode?:number;
  setIndexStockCode?:any;
  showPopup?: boolean;
  setShowPoup?: any;
  ChangeFunction?: any;
  valueInput: string;
  setValueInput?: any;
  border?: boolean;
  SearchStockCode: any;
};
const SearchStockCode = ({
  indexStockCode,
  setIndexStockCode,
  showPopup,
  setShowPoup,
  ChangeFunction,
  valueInput,
  SearchStockCode,
  setValueInput,
  border,
}: Props) => {

  const dispatch = useAppDispatch();
  const { dataCompanyTotal } = useAppSelector((state) => state.company);
  const HanDleConpany = useCallback(async () => {
    await dispatch(fetchCompanyAsync());
  }, []);
  useEffect(() => {
    HanDleConpany();
    // document.addEventListener('keydown',handleKey,true)
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(1);
  const handleKey = (e:any) =>{
    if (e.key === "ArrowUp" && hoveredIndex > 0) {
      // Bấm phím mũi tên lên và không ở đầu danh sách
      setSelectedIndex(hoveredIndex - 1);
    } else if (e.key === "ArrowDown" && hoveredIndex < searchResults.length - 1) {
      // Bấm phím mũi tên xuống và không ở cuối danh sách
      setSelectedIndex(hoveredIndex + 1);
    }
  }
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
    dataCompanyTotal.filter((item: Company) => {
      let name = `${item.Code} "-" ${
        item.Exchange === 1
          ? "HOSE"
          : item.Exchange === 2
          ? "HNX.NY"
          : "HNX.UPCOM"
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
  // const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
  //   console.log(e);
  //   if (e.key === "ArrowUp" && index > 0) {
  //     // Bấm phím mũi tên lên và không ở đầu danh sách
  //     setSelectedIndex(index - 1);
  //   } else if (e.key === "ArrowDown" && index < searchResults.length - 1) {
  //     // Bấm phím mũi tên xuống và không ở cuối danh sách
  //     setSelectedIndex(index + 1);
  //   }
  // };
  console.log(searchResults.length);
  return (
    <>
      {showPopup ? (
        <div
          className={` ${
            border ? "NoneBoder" : ""
          } menuSearch  w-[350px]  shadow-2xl left-[25%] top-[36px] z-50 ${
            searchResults.length > 9 ? "h-[212px] overflow-y-auto" : ""
          } bg-[#FBFBFB] rounded-sm absolute `}
        >
          <ul>
            {dataCompanyTotal && dataCompanyTotal.length > 0 ? (
              searchResults.length > 0 ? (
                searchResults.map((item: Company, index: number) => {
                  let name = `${item.Code} - ${
                    item.Exchange === 1
                      ? "HOSE"
                      : item.Exchange === 2
                      ? "HNX.NY"
                      : "HNX.UPCOM"
                  } - ${item.ScripName}`;
                  const isItemSelected = index === indexStockCode;
                  const isItemHovered = index === indexStockCode;

                  return (
                    <li
                      className={border ? "liboder" : "LinoneBorder"}
                      key={index}
                      onClick={() => AddStockCode(item)}
                      tabIndex={0}
                      // onKeyDown={(e) => handleKeyDown(e, index)} // Xử lý sự kiện keyDown
                      onMouseEnter={() => setIndexStockCode(index)} // Xử lý hover chuột
                      // onMouseLeave={() => setHoveredIndex(-1)} // Khi chuột rời khỏi item
                      style={{
                        backgroundColor:
                          isItemSelected || isItemHovered
                            ? "#63A9E066"
                            : "transparent",
                      }}
                    >
                      {getHighlightedText(name, valueInput)}
                    </li>
                  );
                })
              ) : (
                <li> Mã chứng khoán không tồn tại !</li>
              )
            ) : (
              ""
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default React.memo(SearchStockCode);
   {/* <ul >
            {dataCompanyTotal && dataCompanyTotal.length > 0
              ? searchResults.length > 0 ? searchResults.map((item: Company, index: number) => {
               
                  let name = `${item.Code} - ${
                    item.Exchange === 1
                      ? "HOSE"
                      : item.Exchange === 2
                      ? "HNX.NY"
                      : "HNX.UPCOM"
                  } - ${item.ScripName}`;
                  const isItemSelected = index === selectedIndex;

                  return (
                   
                      <li className={border ? "liboder" : "LinoneBorder"}
                       key={index}
                        onClick={() => AddStockCode(item)}
                        tabIndex={0}
                        // style={{
                        //   backgroundColor: isItemSelected || index === hoveredIndex ? "#E5E7EB" : "transparent",
                        // }}
                        >
                        {getHighlightedText(name, valueInput)}
                      </li>
                 
                  );
                }) : <li>  Mã chứng khoán không tồn tại !</li>
              : ""}
          </ul> */}