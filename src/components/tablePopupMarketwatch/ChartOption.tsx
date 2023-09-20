import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { _getDateTs } from "../chartIndex/util/app.chart";
import useChartConfig from "./config/useChartConfig";
import { useContextTablePopup } from "./context/TablePopupMarketWatchContext";
import * as Highcharts from 'highcharts';

const ChartOption = () => {
  const { dataChartOption } = useAppSelector((state) => state.chartOption);
  const { option, select } = useContextTablePopup();

  const { dataDetailPopup } = useAppSelector((state) => state.dataPopupDetail);
  const [indexValue, setIndexValue] = useState<number>(0);
  const { options } = useChartConfig(
    dataChartOption,
    option,
    indexValue,
    select
  );

  useEffect(() => {
    dataDetailPopup?.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      return item.Info?.map((e: any, ind: number) => {
        if (ind === 1) {
          setIndexValue(e[1]);
        }
      });
    });
  }, [dataDetailPopup]);

  useEffect(() => {
    Highcharts.chart("container__chart__time", options);
  }, [options]);

  return (
    <div className="chart__for__time">
      <figure className="highcharts-figure">
        <div id={`container__chart__time`}></div>
      </figure>
    </div>
  );
};

export default ChartOption;
