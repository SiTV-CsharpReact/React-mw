import React, { useState } from "react";
import ChartReport from "./ChartReport";
import { useAppSelector } from "../../store/configureStore";

const ChartAssetReport = () => {
  const [date, setDate] = useState("20");
  const { mode } = useAppSelector((state) => state.settingColorMode);

  return (
    <div className={`report__tabcondition__right ${mode}-bg`}>
      <div className="report__tabcondition__detail_CK">
        <div></div>
        <div className="text-center">
          <span className={`font-bold text-black  ${mode}-text text-[13px] font-[Arial]`}>
            THỐNG KÊ GIÁ TRỊ TÀI SẢN RÒNG
          </span>
        </div>
        <div className="report__select__date">
          <select
            name=""
            id=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setDate(e.target.value)
            }
          >
            <option value="20">20 ngày</option>
            <option value="89">90 ngày</option>
          </select>
        </div>
      </div>
      <div className="report__tabcondition__detail_CK_header">
        <span className="pt-1 text-black"> NAV (đồng)</span>
        <span className="pt-1 text-black"> Biến động (%)</span>
      </div>
      <div className="report__tabcondition__chart_CK">
        <div className="mt-4">
          <ChartReport date={date} />
        </div>
      </div>
    </div>
  );
};

export default ChartAssetReport;
