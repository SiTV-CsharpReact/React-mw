import React from "react";
import ChartIndexSlide from "../chartIndex/ChartIndexSlide";
import { ISlideMarket } from "./interface/slidemarket.config";
import DivIndexInfo from "./DivIndexInfo";

const SlideMarketItem: React.FC<ISlideMarket> = ({
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
}) => {
  
  return (
    <>
      <li className="dvChart ">
        <div>
        <DivIndexInfo
            name={name}
            valueChange={valueChange}
            valueIndexChange={valueIndexChange}
            valueChangePercent={valueChangePercent}
            visible={visible}
            valueCeiling={valueCeiling}
            valueDown={valueDown}
            valueFloor={valueFloor}
            valueTotalSharesAOM={valueTotalSharesAOM}
            valueTotalValuesAOM={valueTotalValuesAOM}
            valueUp={valueUp}
            valueNoChange={valueNoChange}
            status={status}
            san={san}
            id={id}
          />
        </div>
        <div>
               {/* <ChartIndex /> */}
        <ChartIndexSlide
            name={name}
            san={san}
          />
        </div>
      </li>
    </>
  );
};

export default React.memo(SlideMarketItem);
