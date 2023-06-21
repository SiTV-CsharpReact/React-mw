import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import FromAction from "../FromAction/FromAction";
import LayoutPage from "../Layout/LayoutPage";

const StockDetails = () => {
  return (
    <>
      <LayoutPage content="Số dư chứng khoán " PageTitle="Số dư chứng khoán ">
        <div>
          <div className="HeaderPage">
            <div>
              <FromAction />
            </div>
            <div className="fileExcelPDF">
              <ExcelPdfAction />
            </div>
          </div>
          <div className="contentAction">
            <div className="contentStockDetail">
              <div id="divGrid">
                <h3 className="title__usually">Thông thường</h3>
                <table
                  cellSpacing={0}
                  id="id__stock__details__tbl1"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    margin: "0 auto",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mã CK
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng đầu ngày
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng đang đặt bán
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng còn lại
                      </th>
                    </tr>
                  </thead>
                  <tbody id="stock__details__tbl1__tbody" />
                </table>
                <div className="P15" />
                <h3 className="title__deposit">Ký quỹ</h3>
                <table
                  cellSpacing={0}
                  id="id__stock__details__tbl2"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    margin: "0 auto",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mã CK
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng đầu ngày
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng đang đặt bán
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng còn lại
                      </th>
                    </tr>
                  </thead>
                  <tbody id="stock__details__tbl2__tbody" />
                </table>
                <h3
                  className="title__deposit__ck"
                  style={{ paddingLeft: "20%" ,paddingTop: "15px", paddingBottom: "15px" ,marginBottom:"0px" }}
                >
                  Trong đó: Chứng khoán là cổ tức bằng cổ phiếu và cổ phiếu
                  thưởng còn lại:
                </h3>
                <table
                  cellSpacing={0}
                  id="id__stock__details__tbl4"
                  style={{
                    width: "60%",
                    borderCollapse: "collapse",
                    margin: "0 auto",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mã CK
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Số lượng đầu ngày
                      </th>
                    </tr>
                  </thead>
                  <tbody id="stock__details__tbl4__tbody" />
                </table>
                <div className="P15" />
                <h3 className="title__another">Khác</h3>
                <table
                  cellSpacing={0}
                  id="id__stock__details__tbl3"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    margin: "0 auto",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Mã CK
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Hạn chế chuyển nhượng
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        CK quyền <br /> chờ về
                      </th>
                      <th
                        style={{
                          border: "1px solid #dedede",
                          backgroundColor: "#f3f3f3",
                          whiteSpace: "nowrap",
                        }}
                      >
                        CK lưu ký chờ giao dịch
                      </th>
                    </tr>
                  </thead>
                  <tbody id="stock__details__tbl3__tbody" />
                </table>
                <div className="P15" />
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    margin: "0 auto",
                    whiteSpace: "normal",
                  }}
                >
                  <b style={{ width: 100 }}>
                    <u>Lưu ý:</u>
                  </b>
                  <span
                    style={{
                      display: "block",
                      paddingLeft: 20,
                      marginTop: 0,
                    }}
                  >
                    <br />- Chứng khoán lưu ký chờ giao dịch thể hiện số lượng
                    chứng khoán đã được lưu ký thành công và đang chờ đến ngày
                    niêm yết (niêm yết lần đầu hoặc niêm yết bổ sung).
                    <br />- Chứng khoán lưu ký chờ giao dịch không thể hiện trên
                    Sao kê chứng khoán và Báo cáo Tài sản của Quý khách.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default StockDetails;
