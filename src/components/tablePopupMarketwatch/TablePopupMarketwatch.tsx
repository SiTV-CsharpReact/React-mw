import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./TablePopup.scss";
import {
  showDetailStock,
  setLLTG,
} from "../popupTableMarketwatch/popupTableSlice";

import { fetchChartOptionAsync } from "./chartOptionSlice";
import TableWrapPopup from "./TableWrapPopup";
import {
  fetchDataDetailPopupAsync,
  fetchDataTableKLTTGAsync,
} from "./dataTablePopupDetailSlice";
import { ICompany } from "../../models/root";
import SearchStockCode from "../SearchStockCode/SearchStockCode";
import TableContextProvider from "./context/TablePopupMarketWatchContext";
import {
  FormComponent,
  SearchComponent,
} from "./components/HeaderPopupMarketWatch";
import { fetchCompanyAsync } from "../companyMarketwatch/companyMarketwatchSlice";
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
type Bounds = {
  top: any;
  left: any;
  bottom: any;
  right: any;
};

const TablePopupMarketwatch = () => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState({
    x: (window.innerWidth - 1230) / 2, // - đi witdh tablle chia 2
    y: (window.innerHeight - 721 - 40) / 2,
  });

  const [bounds, setBounds] = useState<Bounds>({
    left: null,
    right: null,
    top: null,
    bottom: null,
  });

  // bắt đầu chạy
  const handleStart = (e: any, data: any) => {
    if (data) {
      const right = window.innerWidth - 1231 - 9;
      const bottom = window.innerHeight - 680 - 43;
      setBounds({ left: 0, right: right, top: 0, bottom: bottom });
    }
  };
  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <TableContextProvider>
      <Draggable
        handle=".pu-header"
        position={position}
        bounds={bounds}
        onStart={handleStart}
        onStop={handleStop}
      >
        <div className="pu-window text-[#B9B9B9]">
          <div className="pu-header">
            <FormComponent>
              <SearchComponent />
            </FormComponent>

            <div className="pu-div-button">
              <i
                className="fa fa-refresh fa-lg !text-sm"
                title="Cập nhật lại dữ liệu"
              />
              <span
                className="pu-close"
                title="Đóng cửa sổ"
                onClick={() => {
                  dispatch(showDetailStock({ visible: false, code: "" }));
                  setPosition({
                    x: (window.innerWidth - 1230) / 2, // - đi witdh tablle chia 2
                    y: (window.innerHeight - 721 - 40) / 2,
                  });
                }}
              >
                <i className="fa fa-times fa-lg !text-sm" />
              </span>
            </div>
          </div>
          <TableWrapPopup />
        </div>
      </Draggable>
    </TableContextProvider>
  );
};
export default React.memo(TablePopupMarketwatch);
