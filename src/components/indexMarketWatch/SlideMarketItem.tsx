import React from "react";
import { iconColorMenuMarket, setColorMenuMarket } from "../../utils/util";
import ChartIndex from "../chartIndex/ChartIndex";
import ChartTest from "../chartIndex/ChartTest";

type Props = {
  id: string[];
  name: string;
  valueChange: string;
  valueChangePercent: string;
  valueIndexChange: string;
  visible: boolean;
  valueTotalSharesAOM: string;
  valueTotalValuesAOM: string;
  valueUp: string;
  valueCeiling: string;
  valueDown: string;
  valueFloor: string;
  valueNoChange: string;
  status: string;
  san: string;
  dataChartIndex: any;
};

const SlideMarketItem: React.FC<Props> = ({
  id,
  name,
  valueChange,
  valueIndexChange,
  valueChangePercent,
  visible,
  valueCeiling,
  valueDown,
  valueFloor,
  valueTotalSharesAOM,
  valueTotalValuesAOM,
  valueUp,
  valueNoChange,
  status,
  san,
  dataChartIndex,
}: Props) => {
  return (
    <>
      <li className="dvChart bg-black">
        <div>
          <p className="text-sm text-center bg-black whitespace-nowrap">
            <span id="" className="mar_">
              {name}:
            </span>
            <span
              id={id[1]}
              className={`${setColorMenuMarket(valueChange)} px-0.5`}
            >
              {valueIndexChange}
            </span>
            <span
              id={id[0]}
              className={`${iconColorMenuMarket(valueChange)} px-0.5`}
            ></span>
            <span
              id={id[2]}
              className={`${setColorMenuMarket(valueChange)} px-0.5`}
            >
              {valueChange}
            </span>
            <span
              id=""
              className={`${setColorMenuMarket(valueChange)} px-0.5 bg-black`}
            >
              <span
                id={id[3]}
                className={`${setColorMenuMarket(valueChange)} px-0.5 bg-black`}
              >
                {valueChangePercent}
              </span>
              %
            </span>
          </p>
          {!visible && (
            <>
              <p className="text-xs text-center bg-black whitespace-nowrap">
                <span className="mar_ spQtty">KL:</span>
                <span id={id[4]} className="bg-black mar_ txtIndex">
                  {valueTotalSharesAOM}
                </span>
                <span className="bg-black mar_ spValue">GT:</span>
                <span id={id[5]} className="bg-black mar_ txtIndex">
                  {valueTotalValuesAOM}
                </span>
                <span className="bg-black mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center bg-black whitespace-nowrap">
                <span className="bg-black arrowUp" />
                <span id={id[6]} className="bg-black maru txtIndex">
                  {valueUp}
                </span>
                <span className="bg-black marc txtIndex">
                  (
                  <span className="bg-black marc" id={id[7]}>
                    {valueCeiling}
                  </span>
                  )
                </span>
                <span className="bg-black square" />
                <span id={id[8]} className="bg-black marn txtIndex">
                  {valueNoChange}
                </span>
                <span className="bg-black arrowDown" />
                <span id={id[9]} className="mard txtIndex">
                  {valueDown}
                </span>
                <span className="bg-black marf txtIndex">
                  (
                  <span className="bg-black marf" id={id[10]}>
                    {valueFloor}
                  </span>
                  )
                </span>
                <span
                  className="bg-black HO_MarketStat txtIndex"
                  id={`${id[11] !== undefined ? id[11] : ""}`}
                >
                  {status}
                </span>
              </p>
            </>
          )}
          {/* <ChartIndex /> */}
          <ChartTest name={name} san={san} dataChartIndex={dataChartIndex} />
        </div>
      </li>
    </>
  );
};

export default React.memo(SlideMarketItem);
