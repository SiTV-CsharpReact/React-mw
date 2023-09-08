import React from "react";
import { ISlideMarket } from "../interface/slidemarket.config";
import SlideMarketItem from "../SlideMarketItem";

const SlideItem: React.FC<ISlideMarket> = ({
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
}): React.ReactElement => {
  return (
    <SlideMarketItem
      name={name}
      id={id}
      valueIndexChange={valueIndexChange}
      valueChange={valueChange}
      valueChangePercent={valueChangePercent}
      visible={visible}
      valueTotalSharesAOM={valueTotalSharesAOM}
      valueTotalValuesAOM={valueTotalValuesAOM}
      valueUp={valueUp}
      valueCeiling={valueCeiling}
      valueNoChange={valueNoChange}
      valueDown={valueDown}
      valueFloor={valueFloor}
      status={status}
      san={san}
      dataChartIndex={dataChartIndex}
    />
  );
};

export default SlideItem;
