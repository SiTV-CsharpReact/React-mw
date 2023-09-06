import React, { useState } from "react";
import ChartOption from "./ChartOption";
import ChartOptionHistory from "./ChartOptionHistory";
import { useContextTablePopup } from "./context/TablePopupMarketWatchContext";

const ChartWithOption = () => {
  const { select, setSelect, setOption } = useContextTablePopup();
  const handleClick = (value_1: string, value_2: string): void => {
    setOption(value_1);
    setSelect(value_2);
  };
  return (
    <div className="pu-content-chart">
      <div className="content-bt-time">
        <div className={`bt-zoom ${select === "1D" ? "active" : ""}`} onClick={() => handleClick("gw_realtime","1D")}>
          <a id="a1d">
            <span>1d</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${select === "1W" ? "active" : ""}`}
          onClick={() => handleClick("gw_history","1W")}
        >
          <a id="a1w">
            <span>1w</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${select === "3M" ? "active" : ""}`}
          onClick={() => handleClick("gw_history","3M")}
        >
          <a id="a3m">
            <span>3m</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${select === "6M" ? "active" : ""}`}
          onClick={() => handleClick("gw_history","6M")}
        >
          <a id="a6m">
            <span>6m</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${select === "1Y" ? "active" : ""}`}
          onClick={() => handleClick("gw_history","1Y")}
        >
          <a id="a1y">
            <span>1y</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${select === "2Y" ? "active" : ""}`}
          onClick={() => handleClick("gw_history","2Y")}
        >
          <a id="a2y">
            <span>2y</span>
          </a>
        </div>
      </div>
      <ChartOption />
      {/* {active === "a1d" ? (
        <ChartOption />
      ) : (
        <ChartOptionHistory time={active} />
      )} */}
    </div>
  );
};

export default ChartWithOption;
