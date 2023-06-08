import { useEffect } from "react";
import "./style.AssetReport.scss";
import TableAssetValue from "./TableAssetValue";
import TableAssetReport from "./TableAssetReport";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAssetReport } from "./AssetReportSlice";
import ChartAssetReport from "./ChartAssetReport";
import TitlePage from "../../layout/TitlePage";

const AssetReport = () => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAssetReport());
  }, [dispatch]);

  return (
    <div className={`${mode}-bg`}>
      <TitlePage content="Báo cáo tài sản"/>
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
