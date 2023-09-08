import React from 'react'
import { ISlideMarket } from './interface/slidemarket.config'
import { iconColorMenuMarket, setColorMenuMarket } from '../../utils/util'

const DivIndexInfo: React.FC<ISlideMarket>  = ({name,
  valueChange,
  valueIndexChange,
  valueChangePercent,
  visible,
  valueTotalSharesAOM,
  valueTotalValuesAOM,
  valueUp,
  valueCeiling,
  valueNoChange,
  valueDown,
  valueFloor,
  san,
  status,
  id,}) => {
  return (
    <div>
    <p className="text-sm text-center whitespace-nowrap">
      <span id="" className="mar_">
        {name}:
      </span>
      <span
        id={id[1]}
        className={`${setColorMenuMarket(valueChange)} p-chart`}
      >
        {valueIndexChange}
      </span>
      <span
        id={id[0]}
        className={`${iconColorMenuMarket(valueChange)} p-chart`}
      ></span>
      <span
        id={id[2]}
        className={`${setColorMenuMarket(valueChange)} p-chart`}
      >
        {valueChange}
      </span>
      <span
        id=""
        className={`${setColorMenuMarket(valueChange)}`}
      >
        <span
          id={id[3]}
          className={`${setColorMenuMarket(valueChange)}`}
        >
          {valueChangePercent}
        </span>
        %
      </span>
    </p>
    {!visible && (
      <>
        <p className="text-xs text-center whitespace-nowrap">
          <span className="mar_ spQtty">KL:</span>
          <span id={id[4]} className="mar_ txtIndex">
            {valueTotalSharesAOM}
          </span>
          <span className="mar_ spValue">GT:</span>
          <span id={id[5]} className="mar_ txtIndex">
            {valueTotalValuesAOM}
          </span>
          <span className="mar_ spUnit">tỷ</span>
        </p>
        <p className="text-xs text-center whitespace-nowrap">
          <span className="arrowUp" />
          <span id={id[6]} className="maru txtIndex">
            {valueUp}
          </span>
          <span className="marc txtIndex">
            (
            <span className="marc" id={id[7]}>
              {valueCeiling}
            </span>
            )
          </span>
          <span className="square" />
          <span id={id[8]} className="marn txtIndex">
            {valueNoChange}
          </span>
          <span className="arrowDown" />
          <span id={id[9]} className="mard txtIndex">
            {valueDown}
          </span>
          <span className="marf txtIndex">
            (
            <span className="marf" id={id[10]}>
              {valueFloor}
            </span>
            )
          </span>
          <span
            className={`${
              san === "HSX"
                ? "HO_MarketStat"
                : san === "HNX"
                ? "HA_MarketStat"
                : "UPC_MarketStat"
            } txtIndex`}
            id={`${id[11] !== undefined ? id[11] : ""}`}
          >
            {status}
          </span>
        </p>
      </>
    )}
  </div>
  )
}

export default React.memo(DivIndexInfo)