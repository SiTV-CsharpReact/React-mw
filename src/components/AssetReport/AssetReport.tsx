import { useEffect } from "react";
import "./style.AssetReport.scss";
import TableAssetValue from "./TableAssetValue";
import TableAssetReport from "./TableAssetReport";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAssetReport } from "./AssetReportSlice";
import ChartAssetReport from "./ChartAssetReport";


const AssetReport = () => {
  const mode = "light";
  // const { mode } = useDarkMode();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAssetReport());
  }, [dispatch]);

  return (
    <div className={`${mode}-bg`}>
      <div className="body__navigation">
        <div className={`w-full bg-[#dedede] ${mode}-bg`}>
          <ul className="flex ml-[127px] mb-0 mt-0 navigation">
            <li className="py-[10px] pr-[10px] pl-0">
              <a
                href="/report/AssetReport2"
                className={`${mode}-text text-[#007db7] text-sm`}
              >
                Báo cáo tài sản
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`body__content ${mode}-bg`}>
        <div className={`body__content__asset_report `}>
          <div className="body__content__header"></div>
          <div className="report__tabcondition_BCTS">
            <TableAssetValue />
            <TableAssetReport />
          </div>
          <ChartAssetReport />
        </div>
      </div>
    </div>
  );
};

export default AssetReport;
