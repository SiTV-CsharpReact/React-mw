import React, { useState } from "react";
import ChartOption from "./ChartOption";
import ChartOptionHistory from "./ChartOptionHistory";

const ChartWithOption = () => {
  const [active, setActive] = useState<String>("a1d");
  return (
    <div className="pu-content-chart">
      <div className="content-bt-time">
        <div
          className={`bt-zoom ${active === "a1d" ? "active" : ""}`}
          onClick={() => setActive("a1d")}
        >
          <a id="a1d">
            <span>1d</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${active === "a1w" ? "active" : ""}`}
          onClick={() => setActive("a1w")}
        >
          <a id="a1w">
            <span>1w</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${active === "a3m" ? "active" : ""}`}
          onClick={() => setActive("a3m")}
        >
          <a id="a3m">
            <span>3m</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${active === "a6m" ? "active" : ""}`}
          onClick={() => setActive("a6m")}
        >
          <a id="a6m">
            <span>6m</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${active === "a1y" ? "active" : ""}`}
          onClick={() => setActive("a1y")}
        >
          <a id="a1y">
            <span>1y</span>
          </a>
        </div>
        <div
          className={`bt-zoom ${active === "a2y" ? "active" : ""}`}
          onClick={() => setActive("a2y")}
        >
          <a id="a2y">
            <span>2y</span>
          </a>
        </div>
      </div>
      {active === "a1d" ? <ChartOption /> : <ChartOptionHistory />}
    </div>
  );
};

export default ChartWithOption;
