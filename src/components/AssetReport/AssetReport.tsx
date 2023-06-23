import { useEffect } from "react";
import "./style.AssetReport.scss";
import TableAssetValue from "./TableAssetValue";
import TableAssetReport from "./TableAssetReport";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAssetReport } from "./AssetReportSlice";
import ChartAssetReport from "./ChartAssetReport";
import TitlePage from "../../pages/Layout/TitlePage";
import LayoutPage from "../../pages/Layout/LayoutPage";
import execlImg from '../../images/excel.png'
import pdfImg from '../../images/pdf.png'


const AssetReport = () => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAssetReport());
  }, [dispatch]);
  return (
    <div className={`${mode}-bg`}>
   
      <LayoutPage 
       content="Báo cáo tài sản"
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
          
              <input type="image" src={execlImg} alt="" className="h-[25px] w-[25px" />
              &nbsp;
              <input type="image" src={pdfImg} alt="" className="h-[25px] w-[25px" />
          
              </div>
            </div>
          </div>

      <div className={`body__content ${mode}-bg`}>
        <div className={`body__content__asset_report `}>
          <div className="report__tabcondition_BCTS">
            <TableAssetValue />
            <TableAssetReport />
          </div>
          <ChartAssetReport />
          <div id="divTextNote">
            <b className="not-italic text-hoverKL"> Ghi chú:</b>
            <ul className="mb-[10px]">
              <li>
                1. Số liệu được cập nhật định kỳ hàng ngày sau khi FPTS hạch
                toán xong các giao dịch, quý khách vui lòng kiểm tra thời điểm
                cập nhật của báo cáo.
              </li>
              <li>
                2. Giá vốn trung bình được tính toán dựa trên công thức và quan
                điểm của FPTS và không có ý nghĩa quyết định đầu tư (Quý khách
                tham khảo cách tính của FPTS{" "}
                <a
                  href="/report/upload/CongThucTinhToanBCTS.pdf"
                  target="_blank"
                  className="underline text-normalText"
                >
                  tại đây
                </a>
                ) Do có nhiều phương pháp xác định tài sản và giá vốn tương ứng,
                Quý khách có thể tự tính toán giá vốn theo các quan điểm khác.
              </li>
              <li>
                3. Giá thị trường là Giá đóng cửa của phiên giao dịch gần nhất
                với thời điểm cập nhật báo cáo tài sản, hoặc giá đóng cửa của
                phiên giao dịch gần nhất có khớp lệnh của mã chứng khoán đó nếu
                trong trường hợp phiên giao dịch gần nhất không có lệnh khớp.
              </li>
              <li>
                4. Việc cập nhật số lượng CK thực hiện quyền chờ về, tiền cổ tức
                chờ về, giá vốn trung bình khi có phát sinh quyền chỉ được cập
                nhật khi FPTS chốt được danh sách thực hiện quyền với TTLK.
              </li>
            </ul>
          </div>
        </div>
      </div>
      </LayoutPage>
    </div>
  );
};

export default AssetReport;
