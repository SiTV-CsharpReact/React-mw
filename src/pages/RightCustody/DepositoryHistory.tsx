import { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import InputDateAction from "../FromAction/InputDateAction";
import SelectAction from "../FromAction/SelectAction";
import LayoutPage from "../Layout/LayoutPage";
import { getDateTime, TTrang } from "../helper/DateTime";
type ValueData = {
  tuNgay: any;
  denNgay: any;
  tinhTrang: any;
};
const DepositoryHistory = () => {
  const { tuNgay, denNgay } = getDateTime();
  const [data, setdata] = useState<ValueData>({
    tuNgay: "",
    denNgay: "",
    tinhTrang: "",
  });
  const ChangeTuNgay = (e: any) => {
    setdata({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setdata({ ...data, denNgay: e });
  };
  const ChangeStatus = (e: any) => {
    setdata({ ...data, tinhTrang: e });
  };
  return (
    <>
      <LayoutPage content="Tra cứu phí lưu ký " PageTitle="Tra cưu phí lưu ký ">
        <div className="HeaderPage">
          <div>
            <FromAction>
              <InputDateAction
                Title="Từ Ngày"
                date={tuNgay}
                ChangeFuncion={ChangeTuNgay}
              />
              <InputDateAction
                Title="Đến Ngày "
                date={denNgay}
                ChangeFuncion={ChangeDenNgay}
              />
              <SelectAction
                Title="Tình trạng"
                Options={TTrang}
                ChangeFuncion={ChangeStatus}
              />
            </FromAction>
          </div>
          <div className="fileExcelPDF">
            <ExcelPdfAction />
          </div>
        </div>
        <div className="contentAction">
          <div className="contentActionPading">
            <div className="table__DepositoryHistory">
              <table
                cellSpacing={0}
                id="DepositoryFeeHistory__table"
                style={{
                  borderCollapse: "collapse",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th className="C" scope="col">
                      STT
                    </th>
                    <th className="C" scope="col">
                      Kỳ tính phí
                      <br />
                      của tháng
                    </th>
                    <th className="C" scope="col">
                      Loại Chứng Khoán
                    </th>
                    <th className="C" scope="col">
                      Tổng số Chứng khoán cộng
                      <br />
                      dồn trong kỳ
                    </th>
                    <th className="C" scope="col">
                      Tiền phí
                      <br />
                      của tháng (VND)
                    </th>
                    <th className="C" scope="col">
                      Tình trạng
                    </th>
                    <th className="C" scope="col">
                      Ngày thanh toán
                    </th>
                  </tr>
                </thead>
                <tbody id="DepositoryFeeHistory__tbody" />
              </table>
            </div>
            <div
              id="divNote"
              className="FL MT10"
              style={{ paddingLeft: 10, paddingTop: 10 }}
            >
              1.
              <a
                href="/rightscustody/upload/Huong_dan_cach_tinh_phi_LK.pdf"
                target="_blank"
                style={{
                  color: " #337ab7",
                  textDecoration: "none",
                }}
              >
                Hướng dẫn cách tính phí lưu ký
              </a>
              <br />
              2.
              <b>
                <span style={{ textDecoration: "underline" }}>Ghi chú: </span>
              </b>
              <br />
              <span style={{ marginLeft: 30, fontStyle: "italic" }}>
                (*)CP/CCQ:
                <span style={{ fontStyle: "italic" }}>
                  Cổ phiếu/ Chứng chỉ quỹ/ Chứng quyền có bảo đảm
                </span>
              </span>
              <br />
              <span style={{ marginLeft: 30, fontStyle: "italic" }}>
                (**)TP:
                <span style={{ fontStyle: "italic" }}>
                  Trái phiếu doanh nghiệp/ Công cụ nợ theo quy định tại Luật
                  Quản lý nợ công
                </span>
              </span>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default DepositoryHistory;
