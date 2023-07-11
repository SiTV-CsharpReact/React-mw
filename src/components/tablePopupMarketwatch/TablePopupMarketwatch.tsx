import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./TablePopup.scss";
import { showDetailStock } from "../popupTableMarketwatch/popupTableSlice";
import axios from "axios";
import { getCompanyNameByCode } from "../../utils/util";
import { fetchChartOptionAsync } from "./chartOptionSlice";
import TableWrapPopup from "./TableWrapPopup";
import { fetchDataSearchPopupAsync } from "./dataTablePopupDetailSlice";

import NewsPopup from "./NewsPopup";
import agent from "../../api/agent";
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
const TablePopupMarketwatch = () => {
  const dispatch = useAppDispatch();
  const [dataKLTTG, setDataKLTTG] = useState([]);
  const [dataResultSearch, setDataResultSearch] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [dataCheck, setDataCheck] = useState("");
  const [dataItemHNX, setDataItemHNX] = useState<any[]>([]);
  const [dataItemHSX, setDataItemHSX] = useState<any[]>([]);
  const { code } = useAppSelector((state) => state.popupTable);
  const { dataTableSearch } = useAppSelector((state) => state.dataPopupDetail);

  useEffect(() => {
    const fethData = async () => {
      const { data } = await axios.get("http://localhost:9999/Data");
      setDataKLTTG(data);
    };
    const fethDataSearch = async () => {
      const { data } = await axios.get("http://localhost:6868/Data");
      console.log("data", data);
      setDataResultSearch(data);
    };
    fethData();
    fethDataSearch();
  }, []);
 
  const handleChange = (e: any) => {
    setDataCheck(e.target.value.toUpperCase());
    setShowPopup(true);
  };
  useEffect(() => {
    const results = dataResultSearch.filter(
      (item: any) => item.Code.toUpperCase().includes(dataCheck)
    );
    setFilteredData(results);
  }, [dataCheck, dataResultSearch]);

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
  
  useEffect(() => {
    dispatch(fetchDataSearchPopupAsync(""));
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
                      onChange={handleChange}
                      onClick={handelClick}
                      className="cursor-pointer"
                      value={dataCheck.toUpperCase()}
                    />
                  </div>
                  <div className="ms-trigger">
                    <div className="fa fa-search top-[2px] absolute left-[2px]" />
                  </div>
                </div>
              </div>
              <div className="inline-block pu-div-title">
                <h2 className="pu-title">
                  {dataItemHNX.length !== 0
                    ? dataItemHNX[0]?.Info[0][1]
                    : dataItemHSX[0]?.Info[0][1]}{" "}
                  - {getCompanyNameByCode(dataItemHNX[0]?.Info[0][1])}
                </h2>
              </div>
            </div>
            {/*  */}
            {showPopup && (
              <div
                style={{ overflowY: "scroll" }}
                className="w-[500px]  overflow-hidden shadow-2xl left-[25%] top-[36px] z-50 h-[310px] bg-[#FBFBFB] rounded-sm absolute"
              >
                {showPopup &&
                  filteredData.map((item: any, index: any) => {
                    let parts = item.Code.split(
                      new RegExp(`(${dataCheck})`, "gi")
                    );
                    return (
                      <div
                        onClick={() => setShowPopup(!showPopup)}
                        className="py-1 cursor-pointer pl-2 border-b hover:bg-[#EEEEEE]"
                        key={index}
                      >
                        <p className="!font-medium">
                          {parts.map((part: any, partIndex: any) => (
                            <span
                              key={partIndex}
                              style={{
                                color:
                                  part.toUpperCase() === dataCheck
                                    ? "#FF0000"
                                    : "inherit",
                                fontWeight:
                                  part.toUpperCase() === dataCheck
                                    ? "bold"
                                    : "medium",
                              }}
                            >
                              {part}
                            </span>
                          ))}
                          <span> - {item.ScripName}</span>
                        </p>
                        <p></p>
                      </div>
                    );
                  })}
              </div>
            )}

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
