import { useEffect } from "react";
import "./style.AssetReport.scss";
import TableAssetValue from "./TableAssetValue";
import TableAssetReport from "./TableAssetReport";
import { useAppDispatch } from "../../store/configureStore";
import { fetchAssetReport } from "./AssetReportSlice";
import ChartAssetReport from "./ChartAssetReport";

const AssetReport = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAssetReport());
  }, [dispatch]);

  return (
    <>
      <div className="body__navigation">
        <div className="w-full bg-[#dedede]">
          <ul className="flex ml-[127px] mb-0 mt-0 navigation">
            <li className="py-[10px] pr-[10px] pl-0">
              <a href="/report/AssetReport2" className="text-[#007db7] text-sm">
                Báo cáo tài sản
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="body__content">
        <div className="body__content__asset_report">
          <div className="body__content__header"></div>
          <div className="report__tabcondition_BCTS">
            <TableAssetValue />
            <TableAssetReport />
          </div>
          <ChartAssetReport />
        </div>
      </div>
    </>
  );
};

export default AssetReport;
