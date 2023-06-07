import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/configureStore";
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
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
const TablePopupMarketwatch = () => {
  const dispatch = useAppDispatch();
  const stockDetail = useSelector((state: RootState) => state.popupTable.code);
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
                    />
                  </div>
                  <div className="ms-trigger">
                    <div className="fa fa-search" />
                  </div>
                </div>
              </div>
              <div className="inline-block pu-div-title">
                <h2 className="pu-title">
                  {/* x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)} */}
                  {stockDetail} - HOSE - Tổng Công ty Cổ phần Bảo hiểm Ngân hàng
                  Đầu tư và Phát triển Việt Nam
                </h2>
              </div>
            </div>
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
          <TableDetailPopup />
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
              <TableKLTTGPopup />
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
