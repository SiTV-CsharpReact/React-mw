import { formatNumberMarket } from "../../../utils/util";

import { useAppSelector } from "../../../store/configureStore";
const TablePrices = () => {
  const { dataTableThongkePrice } = useAppSelector((state) => state.tableTest);
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
        <tbody>
          {dataTableThongkePrice.map((item: any, index: any) => {
            return (
              <tr>
                <td className="hover:bg-[#444444] !text-center">
                  {item?.Data[0][1]}
                </td>
                <td className="hover:bg-[#444444] ">{item?.Data[1][1]}</td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[2][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[3][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[4][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[5][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[6][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[7][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[8][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(parseFloat(item?.Data[9][1]).toFixed(2))}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[10][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(parseFloat(item?.Data[11][1]).toFixed(2))}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[12][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[13][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[14][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[15][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[16][1])}
                </td>
                <td className="hover:bg-[#444444]">
                  {formatNumberMarket(item?.Data[17][1])}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default TablePrices;
