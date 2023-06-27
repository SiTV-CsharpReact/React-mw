import { useEffect } from "react";
import "./style.AssetReport.scss";
import TableAssetValue from "./TableAssetValue";
import TableAssetReport from "./TableAssetReport";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { fetchAssetReport } from "./AssetReportSlice";
import ChartAssetReport from "./ChartAssetReport";
import TitlePage from "../../../pages/Layout/TitlePage";
import LayoutPage from "../../Layout/LayoutPage";

const AssetReport2 = () => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(fetchAssetReport());
  }, [dispatch]);
  return (
    <div className={`${mode}-bg`}>
      <LayoutPage content="Báo cáo tài sản"
        PageTitle="Báo cáo tài sản"
      > 
       <div className="contentActionPading">
            <div className="HeaderBaoCao">
              <div className="HeaderBaoCaoLeft">
                <p>
                Dữ liệu cập nhật gần nhất: <span> 17:51</span> - <span> 19/06/2023</span>

                </p>
              </div>
              <div className="HeaderBaoCaoRigth">
                
              </div>
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
      </LayoutPage>
    </div>
  );
};

export default AssetReport2;
