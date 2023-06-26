import { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import InputDateAction from "../FromAction/InputDateAction";
import SelectAction from "../FromAction/SelectAction";
import LayoutPage from "../Layout/LayoutPage";
import { getDateTime, DefaultSelect } from "../helper/DateTime";
type ValueData = {
  tuNgay: any;
  denNgay: any;
  loaiGD: any;
};
const ReportCW = () => {
  const { tuNgay, denNgay } = getDateTime();
  const [data, setdata] = useState<ValueData>({
    tuNgay: "",
    denNgay: "",
    loaiGD: "",
  });
  const ChangeTuNgay = (e: any) => {
    setdata({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setdata({ ...data, denNgay: e });
  };
  const ChangeLoaiGD = (e: any) => {
    setdata({ ...data, loaiGD: e });
  };
  return (
    <>
      <LayoutPage
        content="Tra cứu tình trạng chứng quyền"
        PageTitle="Tra cứu tình trạng chứng quyền"
      >
        <div className="contentAction">
          <div className="HeaderPage">
            <div>
              <FromAction>
                <InputDateAction Title="Đáo hạn Từ ngày" date={tuNgay} />
                <InputDateAction Title="Đến ngày" date={denNgay} />
                <SelectAction Title="Mã QC" Options={DefaultSelect} />
              </FromAction>
            </div>
            <div className="fileExcelPDF">
              {" "}
              <ExcelPdfAction />
            </div>
          </div>
          <div className="contentActionPading">
            <div id="divGridCW" className="report__cw__tbl">
              {/*-----*/}
              {/*-------grid 1----------*/}
              <h4 className="cw-group-header">I. Chứng quyền chưa hết hạn</h4>
              <div>
                <table
                  cellSpacing={0}
                  id="id__report__cw__tbl1"
                  style={{
                    borderCollapse: "collapse",
                    textAlign: "center",
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        STT
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mã chứng quyền
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Loại CQ
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Loại Chứng khoán
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng CQ
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Ngày đáo hạn
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Tỷ lệ CĐ
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Giá thực hiện
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Giá thị trường của TSCS
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Trạng thái CQ
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Tình trạng thanh toán
                      </th>
                      <th
                        scope="col"
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Giá trị nội tại
                      </th>
                    </tr>
                  </thead>
                  <tbody id="id__report__cw__tbl1__tbody"></tbody>
                </table>
              </div>
              {/*-------/grid 1----------*/}
              <p style={{ height: 30 }} />
              {/*-------grid 2----------*/}
              <h4 className="cw-group-header">
                II. Chứng quyền đã hết hạn / Hủy niêm yết{" "}
              </h4>
              <div>
                <table
                  cellSpacing={0}
                  id="id__report__cw__tbl2"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Mã chứng quyền</th>
                      <th scope="col">Loại CQ</th>
                      <th scope="col">Số lượng CQ</th>
                      <th scope="col">Ngày đáo hạn</th>
                      <th scope="col">Tỷ lệ CĐ</th>
                      <th scope="col">Giá thực hiện</th>
                      <th scope="col">Giá thanh toán</th>
                      <th scope="col">Trạng thái CQ</th>
                      <th scope="col">Tình trạng thanh toán</th>
                      <th scope="col">Số tiền thanh toán</th>
                      <th scope="col">Thuế</th>
                    </tr>
                  </thead>
                  <tbody id="id__report__cw__tbl2__tbody"></tbody>
                </table>
              </div>
              {/*-------/grid 2----------*/}
              <div id="divNotes" style={{ marginTop: 50, textAlign: "left" }}>
                <p className="Title" style={{ fontStyle: "italic" }}>
                  Lưu ý:
                </p>
                <p className="Content" style={{ paddingLeft: 10 }}>
                  Chứng khoán chờ giao dịch thể hiện số lượng chứng khoán đã
                  được lưu ký thành công và đang chờ đến ngày niêm yết (niêm yết
                  lần đầu hoặc niêm yết bổ sung).
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default ReportCW;
