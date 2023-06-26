import { useState } from "react";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import InputDateAction from "../FromAction/InputDateAction";
import LayoutPage from "../Layout/LayoutPage";
import { LoaiGD, getDateTime } from "../helper/DateTime";
import SelectAction from "../FromAction/SelectAction";

type ValueData = {
  tuNgay: any;
  denNgay: any;
  loaiGD: any;
};
const CashSettlement = () => {
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
      <LayoutPage content="Sao kê tiền" PageTitle="Sao kê tiền">
        <div className="contentAction">
          <div className="HeaderPage">
            <div>
              <FromAction data={data}>
                <SelectAction Title="Loại giao dịch" Options={LoaiGD}  ChangeFuncion={ChangeLoaiGD}/>
                <InputDateAction
                  Title="Từ ngày "
                  date={tuNgay}
                  ChangeFuncion={ChangeTuNgay}
                />
                <InputDateAction
                  Title="Đến ngày "
                  date={denNgay}
                  ChangeFuncion={ChangeDenNgay}
                />
              </FromAction>
            </div>
            <div className="fileExcelPDF">
              <ExcelPdfAction />
            </div>
          </div>
          <div className="contentCashlement">
            <div className="cash__settlement__tbl">
              <table
                id="id__cash__settlement__tbl"
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
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                        width: "10%",
                      }}
                      scope="col"
                    >
                      Ngày
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                        width: "10%",
                      }}
                      scope="col"
                    >
                      Phát sinh tăng
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                        width: "10%",
                      }}
                      scope="col"
                    >
                      Phát sinh giảm
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                        width: "10%",
                      }}
                      scope="col"
                    >
                      Số dư có thể giao dịch
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                        width: "60%",
                      }}
                      scope="col"
                    >
                      Nội dung phát sinh
                    </th>
                    <th
                      style={{
                        border: "1px solid #dedede",
                        backgroundColor: "#f3f3f3",
                        whiteSpace: "nowrap",
                        display: "none",
                        // width: "60%"
                      }}
                      className="Hide"
                      scope="col"
                    >
                      GRP
                    </th>
                  </tr>
                </thead>
                <tbody id="cash__settlement__tbl__tbody">
                  <tr>
                    <td
                      className="L Bold"
                      style={{
                        border: "1px solid #dedede",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                      colSpan={9}
                    >
                      Số dư đầu kỳ
                    </td>
                  </tr>
                  <tr>
                    <td className="L" style={{ border: "1px solid #dedede" }} />
                    <td className="R" style={{ border: "1px solid #dedede" }} />
                    <td className="R" style={{ border: "1px solid #dedede" }} />
                    <td
                      className="R BR Bold"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: "bold",
                      }}
                    >
                      0
                    </td>
                    <td className="L" style={{ border: "1px solid #dedede" }}>
                      {" "}
                    </td>
                    <td
                      className="Hide"
                      style={{ border: "1px solid #dedede", display: "none" }}
                    >
                      1
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="L Bold"
                      style={{
                        border: "1px solid #dedede",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                      colSpan={9}
                    >
                      Chi tiết
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="L Bold"
                      style={{
                        border: "1px solid #dedede",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                      colSpan={9}
                    >
                      Số dư cuối kỳ
                    </td>
                  </tr>
                  <tr>
                    <td className="L" style={{ border: "1px solid #dedede" }} />
                    <td className="R" style={{ border: "1px solid #dedede" }} />
                    <td className="R" style={{ border: "1px solid #dedede" }} />
                    <td
                      className="R BR Bold"
                      style={{
                        border: "1px solid #dedede",
                        fontWeight: "bold",
                      }}
                    >
                      0
                    </td>
                    <td className="L" style={{ border: "1px solid #dedede" }}>
                      {" "}
                    </td>
                    <td
                      className="Hide"
                      style={{ border: "1px solid #dedede", display: "none" }}
                    >
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                className="L"
                style={{
                  float: "left",
                  marginTop: "10pt",
                  marginLeft: "4pt",
                  width: 1000,
                }}
              >
                <span style={{ fontFamily: "Arial", fontSize: "10pt" }}>
                  Báo cáo chỉ hiển thị dữ liệu của 180 ngày gần nhất. Nếu Khách
                  hàng có nhu cầu xem chi tiết các giao dịch trước đó, vui lòng
                  liên hệ FPTS để được cung cấp.
                </span>
              </p>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default CashSettlement;
