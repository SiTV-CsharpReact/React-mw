import LayoutPage from "../Layout/LayoutPage";

const ListFee = () => {
  return (
    <>
      <LayoutPage content="Tra cứu biểu phí" PageTitle="Tra cứu biểu phí ">
        <div className="contentAction">
          <div className="report__cw__tbl" style={{marginTop:"25px"}} >
            <table
              cellSpacing={0}
              id="id__list__fee__tbl"
              style={{ width: "60%", borderCollapse: "collapse" ,margin: "auto"}}
            >
              <thead>
                <tr>
                  <th>Phí</th>
                  <th>Loại phí</th>
                  <th>Mức Phí</th>
                </tr>
              </thead>
              <tbody id="id__list__fee__tbl__tbody">
                <tr>
                  <td className="L" rowSpan={2}>
                    Phí GD CKCS
                  </td>
                  <td className="L">Phí GD CKCS - Cổ phiếu</td>
                  <td className="L">Bậc thang: 0.06% ~ 0.13% GTGD</td>
                </tr>
                <tr>
                  <td className="L">Phí GD CKCS - Trái phiếu</td>
                  <td className="L">0.05% GTGD</td>
                </tr>
                <tr>
                  <td className="L" rowSpan={2}>
                    Phí GD CKPS
                  </td>
                  <td className="L">Phí GD HDTL - Chỉ số cổ phiếu</td>
                  <td className="L">
                    {" "}
                    500đ/HĐ (chưa bao gồm phí trả cho Sở GDCK)
                  </td>
                </tr>
                <tr>
                  <td className="L">Phí GD HDTL - Trái phiếu chính phủ</td>
                  <td className="L">
                    {" "}
                    500đ/HĐ (chưa bao gồm phí trả cho Sở GDCK)
                  </td>
                </tr>
                <tr>
                  <td className="L" rowSpan={1}>
                    Phí Hỗ trợ vốn
                  </td>
                  <td className="L">Phí Hỗ trợ vốn</td>
                  <td className="L">0.036% dư nợ/ngày</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};
export default ListFee;
