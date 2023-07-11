import React, { useEffect } from "react";
import NewsPopup from "./NewsPopup";
import ChartWithOption from "./ChartWithOption";
import ChartPopup from "./ChartPopup";
import TableGDLLPopup from "./TableGDLLPopup";
import TableGDTTPopup from "./TableGDTTPopup";
import TableKLTTGPopup from "./TableKLTTGPopup";
import TableReportingPopup from "./TableReportingPopup";
import TableBasicPopup from "./TableBasicPopup";
import TableDetailPopup from "./TableDetailPopup";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  fetchDataDetailPopupAsync,
  fetchDataTableKLTTGAsync,
} from "./dataTablePopupDetailSlice";

const TableWrapPopup = () => {
  const { code } = useAppSelector((state) => state.popupTable);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDataTableKLTTGAsync(code));

    dispatch(fetchDataDetailPopupAsync(code));
  }, [code, dispatch]);
  return (
    <>
      <div>
        <TableDetailPopup />
      </div>
      <div className="flex pu-info mt-[5px]">
        <div className="pu-basic w-[409px] mx-1">
          <TableBasicPopup />
          <TableReportingPopup />
        </div>
        <div className="pu-hrz-realtime w-[391px] mx-1">
          <div
            className="pu-vertical pu-div-realtime"
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
          <ChartWithOption />
          <NewsPopup />
        </div>
      </div>
    </>
  );
};

export default TableWrapPopup;
