import React from "react";
import ChartOption from "./ChartOption";

const ChartWithOption = () => {
  return (
    <div className="pu-content-chart">
      <div className="content-bt-time">
        <div className="bt-zoom active">
          <a id="a1d">
            <span>1d</span>
          </a>
        </div>
        <div className="bt-zoom">
          <a id="a1w">
            <span>1w</span>
          </a>
        </div>
        <div className="bt-zoom">
          <a id="a3m">
            <span>3m</span>
          </a>
        </div>
        <div className="bt-zoom">
          <a id="a6m">
            <span>6m</span>
          </a>
        </div>
        <div className="bt-zoom">
          <a id="a1y">
            <span>1y</span>
          </a>
        </div>
        <div className="bt-zoom">
          <a id="a2y">
            <span>2y</span>
          </a>
        </div>
      </div>
      <ChartOption />
    </div>
  );
};

export default ChartWithOption;
