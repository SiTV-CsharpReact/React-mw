import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "../../store/configureStore";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./TablePopup.scss";
import { showDetailStock } from "../popupTableMarketwatch/popupTableSlice";
import TableDetailPopup from "./TableDetailPopup";
import TableBasicPopup from "./TableBasicPopup";
import TableReportingPopup from "./TableReportingPopup";
import TableGDTTPopup from "./TableGDTTPopup";
import TableGDLLPopup from "./TableGDLLPopup";
import TableKLTTGPopup from "./TableKLTTGPopup";
import ChartPopup from "./ChartPopup";
import axios from "axios";
import { getCompanyNameByCode } from "../../utils/util";
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
const TablePopupMarketwatch = () => {
  const { dataMouse } = useAppSelector(state => state.dataMouse);
  const { dataMouseBuy } = useAppSelector(state => state.dataMouseBuy);
  const dispatch = useAppDispatch();
  const [dataResult, setDataResult] = useState([])
  const [dataResultSearch, setDataResultSearch] = useState([])
  const [showPopup,setShowPopup] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [dataCheck, setDataCheck] = useState("");
  
 

  const stockDetail = useSelector((state: RootState) => state.popupTable.code);
  const fethData = async () => {
    const { data } = await axios.get("http://localhost:9999/Data")
    setDataResult(data)
  }
  const fethDataSearch = async () => {
    const { data } = await axios.get("http://localhost:6868/Data")
    console.log("data", data)
    setDataResultSearch(data)
  }
  useEffect(() => {
    fethData()
    fethDataSearch()
  }, [])
  const handleChange = (e: any) => {
    setDataCheck(e.target.value.toUpperCase());
    setShowPopup(true)
  };
   useEffect(() => {
        const results  = dataResultSearch.filter((item: any) =>
          item.Code.toUpperCase().includes(dataCheck),
          console.log("filteredData",filteredData)
        );
        setFilteredData(results);
    }, [dataCheck]);

  const [position, setPosition] = useState({
    x: -window.innerWidth / 3,
    y: -window.innerHeight / 2 + 40,
  });

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });

    // if (onDrag) {
    //   onDrag(e, ui);
    // }
  };
  // const componentVisible = useSelector(
  //     (state: RootState) => state.chart.visible
  //   );
  // const status = useSelector(((state: RootState) => state.popupTable.visible))
  // console.log(status)
  const handelClick = () => {
    setShowPopup(!showPopup)
    
  }
  return (
    <Draggable handle=".pu-header" position={position} onDrag={handleDrag}>
      <div className="pu-window text-[#B9B9B9]">
        <div className="pu-header">
          <div className="flex pu-grtitle">
            <div className="m-auto">
              <div className="pu-div-search">
                <div
                  className="relative ms-ctn form-control"
                  style={{}}
                  id="ipSearchCode"
                >
                  <div className="ms-sel-ctn">
                    <input
                      type="text"
                      placeholder="Nhập mã Chứng khoán"
                      autoComplete="nofill"
                      onChange={handleChange} 
                      onClick={handelClick}   
                      className="cursor-pointer"
                      value={dataCheck.toUpperCase()}
                    />
                  </div>
                  <div className="ms-trigger">
                    <div className="fa fa-search" />
                  </div>
                </div>
              </div>
              <div className="inline-block pu-div-title">
                <h2 className="pu-title">
                  {dataMouse.maF} - {getCompanyNameByCode(dataMouse.maF)}
                  {/* x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)} */}
                  {/* {dataMouse.maF || dataMouse.maF} - HOSE - Tổng Công ty Cổ phần Bảo hiểm Ngân hàng
                  Đầu tư và Phát triển Việt Nam */}
                </h2>
              </div>
            </div>
            {/*  */}
           {showPopup &&  <div style={{ overflowY: "scroll" }} className="w-[500px] overflow-hidden shadow-2xl left-[25%] top-[36px] z-50 h-[320px] bg-white absolute">

            {showPopup && filteredData.map((item: any, index: any) => {
              return <div  onClick={()=>alert("ok")} className="py-1 pl-2 border-b hover:bg-[darkgrey]" key={index}>
                <p>{item.Code} {item.ScripName}</p>
                <p></p>
              </div>
            })}
            </div>}
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
              onClick={() => dispatch(showDetailStock(""))}
            >
              <i className="fa fa-times fa-lg !text-sm" />
            </span>
          </div>
        </div>

        <div>
          <TableDetailPopup dataResult={ dataResult} />
        </div>
        <div className="flex pu-info">
          <div className="pu-basic w-[409px] mx-1"> 
            <TableBasicPopup />
            <TableReportingPopup />
          </div>
          <div className="pu-hrz-realtime w-[391px] mx-1">
            <div
              className="pu-vertical pu-div-realtime"
              // thêm border khi scroll table với sticky
              onScroll={function (e: any) {
                if (e.currentTarget.scrollTop > 0) {
                  e.target.classList.add("stick");
                } else {
                  e.target.classList.remove("stick");
                }
              }}
            >
              <TableKLTTGPopup dataResult={ dataResult}/>
            </div>

            <div className="w-full pu-div-PT">
              <TableGDTTPopup />
            </div>
            <div className="pu-vertical pu-div-oddlot">
              <TableGDLLPopup />
            </div>
          </div>
          <div className="pu-hrz-chart">
            <ChartPopup />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default React.memo(TablePopupMarketwatch);
