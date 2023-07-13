import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./TablePopup.scss";
import { showDetailStock } from "../popupTableMarketwatch/popupTableSlice";

import { fetchChartOptionAsync } from "./chartOptionSlice";
import TableWrapPopup from "./TableWrapPopup";
import { fetchDataSearchPopupAsync } from "./dataTablePopupDetailSlice";
import { Company } from "../../models/root";
import SearchStockCode from "../SearchStockCode/SearchStockCode";
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
const TablePopupMarketwatch = () => {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [ValueInput, setValueInput] = useState("");
  const [stockCode, setStockCode] = useState<Company> (
   { Code: "",
   Exchange: 0,
   ScripName: "",
   Basic_Price: 0,
   Ceiling_Price: 0,
   Floor_Price: 0,
   Stock_Type2: 0,
   ScripNameEN: "",
   ID: "",}
  );
  const { code } = useAppSelector((state) => state.popupTable);
  const handleChange = (e: any) => {
    setValueInput(e.toUpperCase());
    setShowPopup(true);
  };
  const [position, setPosition] = useState({
    x: (window.innerWidth - 1230) / 2, // - đi witdh tablle chia 2
    y: (window.innerHeight - 721 - 40) / 2,
  });
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };
  const handelClick = () => {
    setShowPopup(!showPopup);
  };
  const AddStockCode = (CodeCk:string)=>{
    dispatch(showDetailStock({ visible: true, code:CodeCk }))
  }
  useEffect(() => {
    // dispatch(fetchDataSearchPopupAsync(""));
    dispatch(fetchChartOptionAsync({ stockCode: code }));
  }, [code, dispatch]);
  // Kiểm tra và đặt lại giá trị cho dataMouse.maF và dataMouseBuy.maB nếu selectedCode tồn tại
  return (
    <Draggable handle=".pu-header" position={position} onDrag={handleDrag}>
      <div className="pu-window text-[#B9B9B9]">
        <div className="pu-header">
          <div className="flex pu-grtitle">
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
                      onChange={(e) =>handleChange(e.target.value)}
                      onClick={handelClick}
                      className="cursor-pointer"
                      value={ValueInput}
                    />
                  </div>
                  <div className="ms-trigger">
                    <div className="fa fa-search top-[2px] absolute left-[2px]" />
                  </div>
                </div>
              </div>
              <div className="inline-block pu-div-title">
                <h2 className="pu-title"> 
                {stockCode.Code ? 
                 `${stockCode.Code} - ${stockCode.Exchange === 1 ? "HSX" :stockCode.Exchange === 2? "HNX" : "UPCOM" } - ${stockCode.ScripName}`
                :  `${code}` } 
                {/* : `${dataItemHNX.length !== 0
                  ? dataItemHNX[0]?.Info[0][1]
                  : dataItemHSX[0]?.Info[0][1]}{" "}
                - ${getCompanyNameByCode(dataItemHNX[0]?.Info[0][1])}  `    }
                  */}
                 
                </h2>
              </div>
            </div>
            {/*  */}
            <SearchStockCode 
            valueInput={ValueInput} 
            setShowPoup={setShowPopup}  
            showPopup={showPopup}
            ChangeFunction={setStockCode}
            SearchStockCode= {AddStockCode}  
            setValueInput ={setValueInput}
            border={true}
             />

            {/* vd */}
          </div>
          <div className="pu-div-button">
            <i
              className="fa fa-refresh fa-lg !text-sm"
              title="Cập nhật lại dữ liệu"
            />
            <span
              className="pu-close"
              title="Đóng cửa sổ"
              onClick={() =>
                dispatch(showDetailStock({ visible: false, code: "" }))
              }
            >
              <i className="fa fa-times fa-lg !text-sm" />
            </span>
          </div>
        </div>
        <TableWrapPopup />
      </div>
    </Draggable>
  );
};
export default React.memo(TablePopupMarketwatch);
