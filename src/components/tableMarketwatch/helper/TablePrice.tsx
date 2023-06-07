const TablePrices = () => {
  return (
    <>
      <table
        id="tbHIST_INDEX"
        className="table table-PT table-bordered table-priceboard"
      >
        <thead style={{}}>
          <tr>
            <th className="hbrb" rowSpan={2}>
              Ngày Giá 
            </th>
            <th className="hbrb" rowSpan={2}>
              Mã
            </th>
            <th className="hbrb" rowSpan={2}>
              TC
            </th>
            <th className="hbrb" rowSpan={2}>
              Trần
            </th>
            <th className="hbrb" rowSpan={2}>
              Sàn
            </th>
            <th className="hbrb" rowSpan={2}>
              Mở Cửa
            </th>
            <th className="hbrb" rowSpan={2}>
              Đóng cửa
            </th>
            <th className="hbrb" rowSpan={2}>
              Cao nhất
            </th>
            <th className="hbrb" rowSpan={2}>
              Thấp nhất
            </th>
            <th className="hbrb" rowSpan={2}>
              Trung bình
            </th>
            <th className="hbrb" colSpan={2}>
              Thay đổi giá
            </th>
            <th className="hbrb" colSpan={3}>
              Khối lượng giao dịch
            </th>
            <th className="hbrb" colSpan={3}>
              Giá trị giao dịch (Triệu VNĐ)
            </th>
          </tr>
          <tr>
            <th className="hb_b">+/-</th>
            <th className="hbrb">%</th>

            <th className="hb_b">Khớp lệnh </th>
            <th className="hbrb">Thỏa thuận</th>
            <th className="hbrb">Tổng cộng </th>

            <th className="hb_b">Khớp lệnh </th>
            <th className="hbrb">Thỏa thuận</th>
            <th className="hbrb">Tổng cộng </th>
          </tr>
        </thead>
        <tbody>{/*Content*/}</tbody>
      </table>
    </>
  );
};
export default TablePrices;
