import React, { useState, useRef } from "react";
import { getDataTable } from "../tableMarketwatch/tableSlice";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../store/configureStore";

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
      }, 1000);
    }
  };
  const AddMaCate = (e: any) => {
    //  add mã
    setShow(false);
    setValue("");
    const valueMa = e.split("-"); // chuỗi đầu cần lấy
    let a = data?.Data.find((e: any) => e.Row == row);

    let bqueryy: any = a?.List.concat(`,${valueMa[0]}`).trim();
    let result = a?.List.includes(valueMa[0].trim());
    if (result) {
      console.log("result", result);
    }
    let dataSerr = {
      Floor: "danh-muc",
      Query: bqueryy,
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
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ color: "red" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  // dã lọc song
  const searchResults = testdata.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {show && searchResults.length > 0 ? (
        <>
          <div
            className={`ms-trigger-ico showALLData ${
              props.width ? "w-[307px] right-0 !left-auto" : ""
            }`}
          >
            <div className={`menuShowAllData ${props.width ? "" : ""}`}>
              {isActiveShowALL
                ? testdata
                  ? testdata.map((e) => {
                      return <div onClick={() => AddMaCate(e)}>{e}</div>;
                    })
                  : ""
                : searchResults.length > 0
                ? searchResults.map((e) => {
                    return (
                      <div onClick={() => AddMaCate(e)}>
                        {getHighlightedText(e, searchTerm)}
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
