import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";
import "./menuBar.scss";
import {
  useAppSelector,
  RootState,
  useAppDispatch,
} from "../../store/configureStore";
import { getDataTable } from "../tableMarketwatch/tableSlice";
const companies: string[] = [
  "AAV - HNX.NY - Công ty Cổ phần AAV Group",
  "ADC - HNX.NY - Công ty Cổ phần Mỹ thuật và Truyền Thông",
  "ALT - HNX.NY - Công ty Cổ phần Văn hóa Tân Bình",
  "AMC - HNX.NY - Công ty Cổ phần Khoáng Sản Á Châu",
  "AME - HNX.NY - Công ty Cổ phần Alphanam E&C",
  "AMV - HNX.NY - Công ty Cổ phần Sản xuất kinh doanh dược và trang thiết bị Y tế Việt Mỹ",
  "API - HNX.NY - Công ty Cổ phần Đầu tư Châu Á - Thái Bình Dương",
  "APS - HNX.NY - Công ty Cổ phần Chứng khoán Châu Á Thái Bình Dương",
  "ARM - HNX.NY - Công ty Cổ phần Xuất nhập khẩu Hàng không",
  "BRM - HNX.NY - Công ty Cổ phần Xuất nhập khẩu Hàng không",
];
const DropDown = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isLoading, data, status, row, name } = useAppSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useAppDispatch();
  function getSuggestions(value: string): string[] {
    return companies.filter((company) =>
        company.toLowerCase().startsWith(value.trim().toLowerCase())
      );
  }
  // nhận mảng lúc đầu
  function renderSuggestion(suggestion: string): JSX.Element {
    const suggestionElements: JSX.Element[] = [];
    const words = suggestion.split(" ");
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.toLowerCase().startsWith(value.trim().toLowerCase())) {
        const startIndex = word
          .toLowerCase()
          .indexOf(value.trim().toLowerCase());
        const endIndex = startIndex + value.length;
        const highlightedPart = word.substring(startIndex, endIndex);
     
        const restPart = word.substring(endIndex);
        suggestionElements.push(
          <span key={i}>
            <span style={{ color: "red", fontWeight: "bold" }}>
              {highlightedPart}
            </span>
            {restPart}
          </span>
        );
      } else {
        suggestionElements.push(<span key={i}>{word} </span>);
      }
    }

    return <span>{suggestionElements}</span>;
  }
  async function handleSuggestionSelected(
    _: React.FormEvent<any>,
    { suggestionValue }: { suggestionValue: string }
  ) {
    setValue("");
    const valueMa = suggestionValue.split("-");
    let a = data?.Data.find((e) => e.Row == row);
    let bqueryy: any = a?.List.concat(`,${valueMa[0]}`).trim();
    let dataSerr = {
      Floor: "danh-muc",
      Query: bqueryy,
    };
    CallApi(dataSerr)
  }
  // show all data
  // call api 
  const CallApi = async (data:any)=>{ 
    console.log("vô đây", data)
    let resilt = await dispatch(getDataTable(data));
  }
  const HandelGetAlldata = () => {
    setShowSuggestions(!showSuggestions);
  };
  const HandelClick = (e:any)=>{
    const valueMa = e.split("-");
    let a = data?.Data.find((e) => e.Row == row);
    let bqueryy: any = a?.List.concat(`,${valueMa[0]}`).trim();
    let dataSerr = {
      Floor: "danh-muc",
      Query: bqueryy,
    };
    CallApi(dataSerr)
    setShowSuggestions(false);
    setValue('')
  }
  return (
    <div className="dropDown">
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          setValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={handleSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        // shouldRenderSuggestions = false
        inputProps={{
          placeholder: "Thêm mã vào danh mục",
          value: value,
          onChange: (_, { newValue, method }) => {
            setValue(newValue.toUpperCase());
          },
          onClick: (_, ) => {
            setShowSuggestions(false)
          },
          
        }}
        highlightFirstSuggestion={true}
      />
      <div className="ms-trigger" onClick={HandelGetAlldata}>
        <label htmlFor="" className="getAll">
          <i className="fa fa-caret-down fa-iconALl"> </i>
        </label>
      </div>
      {showSuggestions ?
      <div className="showALLData">
            <ul className="menuShowAllData">
              {companies ? companies.map((e)=>{
                return <li onClick={()=>HandelClick(e)}> {e} </li>
              })
            : "" }
            </ul>
      </div>
    : ""}
    {showSuggestions ?
      <label htmlFor=""className="poupGetAllData" onClick={()=>setShowSuggestions(false)}> </label> : ""}
   
    </div>
  );
};

export default DropDown;
