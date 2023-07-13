import React, { useState, useRef, useEffect } from "react";
import { getDataTable } from "../tableMarketwatch/tableTestSlice";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../store/configureStore";
import { fetchCompanyAsync } from "../companyMarketwatch/companyMarketwatchSlice";
import { Company } from "../../models/root";

const CompleteStock = (props: any) => {
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

  const { isLoading, data, status, row, name } = useAppSelector(
    (state: RootState) => state.categories
  );
  const  {dataCompanyTotal}  = useAppSelector((state:RootState) =>state.company)
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [isActiveShowALL, setActiveShowALl] = useState(false);
  const [Value, setValue] = useState("");
  const [testdata, setData] = useState(companies);
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const CallApi = async (data: any) => {
    // api add mã in  danh mục
    let resilt = await dispatch(getDataTable(data));
  };
  const HandelChangeInput = (e: any) => {
    // tim kiếm
    setValue(e.value);

    setActiveShowALl(false);
    if (e.value == "") {
      setShow(false);
    } else {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setSearchTerm(e.value);
        setShow(true);
      }, 10);
    }
  };
  const AddMaCate = (e: any) => {
    //  add mã
    setShow(false);
    setValue("");
    let ListCode = data?.Data.find((elemnet: any) => elemnet.Name == name);
    let bqueryy: any = ListCode?.List.concat(`,${e.trim()}`);
    let result = ListCode?.List.includes(e.trim());
    if (result) {
      // khi mã đã có  trong list 
      console.log("result", result);
    }
    let dataSerr = {
      Floor: "danh-muc",
      Query: bqueryy,
      RowPined: row
    };
    CallApi(dataSerr);
  };
  const hanDeAllData = () => {
    // get all data
    setShow(true);
    setActiveShowALl(true);
  };
  const hanDelPoUp = () => {
    setShow(false);
    setActiveShowALl(false);
  };
  //  chữ tìm kiếm màu đỏ
  const getHighlightedText = (text: string, highlight: string) => {
    const input = Value.toLowerCase();
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

  // dã lọc song
  const searchResults = dataCompanyTotal.filter((item) =>{
    let name  =`${item.Code} "-" ${item.Exchange === 1 ? "HSX" :item.Exchange === 2? "HNX" : "UPCOM" } "-" ${item.ScripName}`
      const NameTo =   name.toLowerCase().startsWith(searchTerm.toLowerCase())
      return  NameTo
  } 
  );
  if(isLoading == 1){
    return  <div> Loading ...</div>
  }
  return (
    <div
      className={`input_complete form-control relative ${
        props.width ? props.width : ""
      }`}
      id="addSymbol"
    >
      <div className="ms-sel-ctn">
        <input
          type="text"
          placeholder="Thêm mã vào danh mục"
          autoComplete="off"
          role="presentation"
          id="txtF1"
          value={Value.toLocaleUpperCase()}
          onChange={(e) => HandelChangeInput(e.target)}
          onClick={() => setActiveShowALl(false)}
        />
      </div>
      <div className="ms-trigger" onClick={hanDeAllData}>
        <label htmlFor="" className="getAll">
          <i className="fa fa-caret-down fa-iconALl"> </i>
        </label>
      </div>
      {show && searchResults.length> 0 ? (
        <>
          <div
            className={`ms-trigger-ico showALLData ${
              props.width ? "w-[307px] right-0 !left-auto" : ""
            }`}
          >
            <div className={`menuShowAllData ${props.width ? "" : ""}`}>
              {isActiveShowALL  && searchResults.length> 0
                ? dataCompanyTotal.length > 0 ?
               dataCompanyTotal?.map((e:Company) => {
                      return <div onClick={() => AddMaCate(e.Code)}>
                          {e.Code} - {e.Exchange === 1 ? "HSX" :e.Exchange === 2? "HNX" : "UPCOM" } - {e.ScripName}

                      </div>;
                    })
                  : "" 
              : searchResults.length > 0
                ? searchResults.map((item) => {
                  let name  =`${item.Code} - ${item.Exchange === 1 ? "HSX" :item.Exchange === 2? "HNX" : "UPCOM" } - ${item.ScripName}`
                    return (
                      <div onClick={() => AddMaCate(item.Code)}>
                        {getHighlightedText(name, searchTerm)}
                      </div>
                    );
                  })
                : ""} 
            </div>
          </div>
          <label
            htmlFor=""
            className="poupGetAllData"
            onClick={hanDelPoUp}
          ></label>
        </>
      ) : (
        " "
      )}
    </div>
  );
};

export default CompleteStock;
