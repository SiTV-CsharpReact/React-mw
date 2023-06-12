import React from "react";
import { iconColorMenuMarket, setColorMenuMarket } from "../../utils/util";

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
}: Props) => {
  return (
    <>
      <li className="dvChart">
        <div>
          <p className="text-sm">
            <span id="" className="mar_">
              {name}
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
            <span id="" className={`${setColorMenuMarket(valueChange)} px-0.5`}>
              <span
                id={id[3]}
                className={`${setColorMenuMarket(valueChange)} px-0.5`}
              >
                {valueChangePercent}
              </span>
              %
            </span>
          </p>
          {!visible && (
            <>
              <p className="text-xs text-center">
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
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id={id[6]} className="maru txtIndex">
                  {valueUp}
                </span>
                <span className="marc txtIndex">
                  (<span id={id[7]}>{valueCeiling}</span>)
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
                  (<span id={id[10]}>{valueFloor}</span>)
                </span>
                <span className="HO_MarketStat txtIndex" id={`${id[11] !== undefined ? id[11]:""}`} >{status}</span>
              </p>
            </>
          )}
          <div id="canvasChartVNXALL" className="chart" style={{height: '100px', width: '200px', position: 'relative', padding: '0px'}}><canvas className="flot-base" width={200} height={100} style={{direction: 'ltr', position: 'absolute', left: '0px', top: '0px', width: '200px', height: '100px'}} /><div className="flot-text" style={{position: 'absolute', inset: '0px', fontSize: '8px', color: 'rgb(165, 165, 165)', fontFamily: 'Arial'}}><div className="flot-x-axis flot-x1-axis xAxis x1Axis" style={{position: 'absolute', inset: '0px', display: 'block'}}><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '1px', textAlign: 'center'}}>09 h</div><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '32px', textAlign: 'center'}}>10 h</div><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '62px', textAlign: 'center'}}>11 h</div><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '93px', textAlign: 'center'}}>12 h</div><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '124px', textAlign: 'center'}}>13 h</div><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '154px', textAlign: 'center'}}>14 h</div><div className="flot-tick-label tickLabel" style={{position: 'absolute', maxWidth: '28px', top: '88px', left: '185px', textAlign: 'center'}}>15 h</div></div></div><canvas className="flot-overlay" width={200} height={100} style={{direction: 'ltr', position: 'absolute', left: '0px', top: '0px', width: '200px', height: '100px'}} /></div>
        </div>
      </li>
    </>
  );
};

export default SlideMarketItem;
