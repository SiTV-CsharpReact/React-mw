import React from "react";
import { iconColorMenuMarket, setColorMenuMarket } from "../../utils/util";
import ChartIndex from "../chartIndex/ChartIndex";
import { IPropsSlideMarket } from "./interface/slidemarket.config";

const SlideMarketItem: React.FC<any> = ({ data }) => {
  return (
    <>
      {data.type && (
        <li className="dvChart ">
          <div>
            <p className="text-sm text-center whitespace-nowrap">
              <span id="" className="mar_">
                {data.name}:
              </span>
              <span
                id={data.id[1]}
                className={`${setColorMenuMarket(data.valueChange)} px-0.5`}
              >
                {data.valueIndexChange}
              </span>
              <span
                id={data.id[0]}
                className={`${iconColorMenuMarket(data.valueChange)} px-0.5`}
              ></span>
              <span
                id={data.id[2]}
                className={`${setColorMenuMarket(data.valueChange)} px-0.5`}
              >
                {data.valueChange}
              </span>
              <span
                id=""
                className={`${setColorMenuMarket(data.valueChange)} px-0.5 `}
              >
                <span
                  id={data.id[3]}
                  className={`${setColorMenuMarket(data.valueChange)} px-0.5 `}
                >
                  {data.valueChangePercent}
                </span>
                %
              </span>
            </p>
            {!data.visible && (
              <>
                <p className="text-xs text-center whitespace-nowrap">
                  <span className="mar_ spQtty">KL:</span>
                  <span id={data.id[4]} className="mar_ txtIndex">
                    {data.valueTotalSharesAOM}
                  </span>
                  <span className="mar_ spValue">GT:</span>
                  <span id={data.id[5]} className="mar_ txtIndex">
                    {data.valueTotalValuesAOM}
                  </span>
                  <span className="mar_ spUnit">tỷ</span>
                </p>
                <p className="text-xs text-center whitespace-nowrap">
                  <span className="arrowUp" />
                  <span id={data.id[6]} className="maru txtIndex">
                    {data.valueUp}
                  </span>
                  <span className="marc txtIndex">
                    (
                    <span className="marc" id={data.id[7]}>
                      {data.valueCeiling}
                    </span>
                    )
                  </span>
                  <span className="square" />
                  <span id={data.id[8]} className="marn txtIndex">
                    {data.valueNoChange}
                  </span>
                  <span className="arrowDown" />
                  <span id={data.id[9]} className="mard txtIndex">
                    {data.valueDown}
                  </span>
                  <span className="marf txtIndex">
                    (
                    <span className="marf" id={data.id[10]}>
                      {data.valueFloor}
                    </span>
                    )
                  </span>
                  <span
                    className={`${
                      data.san === "HSX"
                        ? "HO_MarketStat"
                        : data.san === "HNX"
                        ? "HA_MarketStat"
                        : "UPC_MarketStat"
                    } txtIndex`}
                    id={`${data.id[11] !== undefined ? data.id[11] : ""}`}
                  >
                    {data.status}
                  </span>
                </p>
              </>
            )}
            <ChartIndex name={data.name} san={data.san} />
          </div>
        </li>
      )}
    </>
  );
};

export default React.memo(SlideMarketItem);
