import React, { useState } from "react";
import ChartReport from "./ChartReport";
import { useAppSelector } from "../../store/configureStore";

const ChartAssetReport = () => {
  const [date, setDate] = useState(0);
  const { mode } = useAppSelector((state) => state.settingColorMode);

  return (
    <div className={`report__tabcondition__right ${mode}-bg`}>
      <div className="report__tabcondition__detail_CK">
        <div></div>
        <div className="text-center">
          <span
            className={`font-bold text-black  ${mode}-text text-[13px] font-[Arial]`}
          >
            THỐNG KÊ GIÁ TRỊ TÀI SẢN RÒNG
          </span>
        </div>
        <div className="report__select__date">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setDate(Number(e.target.value))
            }
          >
            <option value={0}>20 ngày</option>
            <option value={1}>90 ngày</option>
          </select>
        </div>
      </div>
      <div className="report__tabcondition__detail_CK_header">
        <span className="text-black text-13 font-[Arial]">NAV (đồng)</span>
        <span className="text-black text-13 font-[Arial]">Biến động (%)</span>
      </div>
      <div className="report__tabcondition__chart_CK">
        <div>
          <ChartReport date={date} />
        </div>
        <div className="italic text-xs pl-[50px] text-[#000] -mt-[14px]">
          <span>Chú thích:</span>
          <ul className="pl-10 mb-[10px]">
            <li>
              * Ngày giao dịch có phát sinh tăng/giảm làm thay đổi vốn, cụ thể:
              <ul className="pl-10">
                <li>
                  - Phát sinh tăng: Nộp tiền; Lưu ký/Nhận chuyển khoản chứng
                  khoán; Rút tiền từ tài khoản phái sinh về tài khoản cơ sở
                </li>
                <li style={{ lineHeight: "17px" }}>
                  - Phát sinh giảm: Rút/chuyển tiền; Chuyển tiền từ tài khoản cơ
                  sở vào tài khoản phái sinh; Phí rút/chuyển; Rút lưu ký/Chuyển
                  khoản chứng khoán đi
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChartAssetReport;
